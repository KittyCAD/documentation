import assert from 'node:assert/strict'
import { execFileSync, spawnSync } from 'node:child_process'
import { existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { previewSummary, previewUrl, resolveRequest, stageSource } from './preview.mjs'

const sha = 'a'.repeat(40)
const repository = 'KittyCAD/documentation'
const settings = { orgId: 'team_example', projectId: 'prj_example' }

test('resolves an exact branch, including slashes, to an immutable commit without a PR or author account', async () => {
  const paths = []
  const result = await resolveRequest({ repository, branch: 'codex/bens-build-logs',
    request: async (endpoint) => {
      paths.push(endpoint)
      return { ref: 'refs/heads/codex/bens-build-logs', object: { type: 'commit', sha } }
    },
  })
  assert.deepEqual(result, { docs_sha: sha })
  assert.deepEqual(paths, ['/repos/KittyCAD/documentation/git/ref/heads/codex%2Fbens-build-logs'])
})

test('rejects invalid ref names before making any GitHub request', async () => {
  for (const branch of ['', '-main', '../main', 'main\n', '@{-1}', 'a..b', 'a:b', 'a b',
    'https://github.com/KittyCAD/documentation/tree/main']) {
    await assert.rejects(resolveRequest({ repository, branch,
      request: () => assert.fail('Invalid input reached GitHub'),
    }), /Enter a branch name/)
  }
})

test('rejects missing branches, partial matches, tags, and invalid commit IDs', async () => {
  await assert.rejects(resolveRequest({ repository, branch: 'missing',
    request: async () => { throw new Error('GitHub: HTTP 404') },
  }), /404/)
  for (const ref of [[], { ref: 'refs/heads/main-extra', object: { type: 'commit', sha } },
    { ref: 'refs/heads/main', object: { type: 'tag', sha } },
    { ref: 'refs/heads/main', object: { type: 'commit', sha: 'bad' } }]) {
    await assert.rejects(resolveRequest({ repository, branch: 'main', request: async () => ref }), /exact documentation branch/)
  }
})

function fixture(t) {
  const root = mkdtempSync(path.join(tmpdir(), 'docs-preview-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const source = path.join(root, 'website')
  const destination = path.join(root, 'upload')
  mkdirSync(source)
  const write = (file, content = 'fixture') => {
    mkdirSync(path.dirname(path.join(source, file)), { recursive: true })
    writeFileSync(path.join(source, file), content)
  }
  return { root, source, destination, write }
}

test('stages content and submodule assets while removing Git metadata, credentials, and caches', (t) => {
  const { source, destination, write } = fixture(t)
  for (const file of ['package.json', 'public/material-properties/example.json',
    'public/litterbox_assets/part.png', 'documentation/content/posts/ben.mdx']) write(file)
  for (const file of ['.git/config', '.vercel/project.json', '.env.local',
    'documentation/.git', 'documentation/.env', 'documentation/.env.production',
    'documentation/node_modules/package/index.js', 'documentation/.contentlayer/generated.json']) write(file)
  mkdirSync(path.join(source, 'documentation/content/pages/docs/cli'), { recursive: true })
  write('documentation/content/pages/docs/cli/index.md')
  symlinkSync('cli', path.join(source, 'documentation/content/pages/docs/cli-alias'))

  stageSource({ source, destination, ...settings })
  assert.equal(readFileSync(path.join(destination, 'documentation/content/posts/ben.mdx'), 'utf8'), 'fixture')
  assert.ok(existsSync(path.join(destination, 'public/material-properties/example.json')))
  assert.ok(existsSync(path.join(destination, 'public/litterbox_assets/part.png')))
  assert.ok(lstatSync(path.join(destination, 'documentation/content/pages/docs/cli-alias')).isSymbolicLink())
  assert.equal(readFileSync(path.join(destination, 'documentation/content/pages/docs/cli-alias/index.md'), 'utf8'), 'fixture')
  for (const file of ['.git', '.env.local', 'documentation/.git', 'documentation/.env',
    'documentation/.env.production', 'documentation/node_modules', 'documentation/.contentlayer']) {
    assert.equal(existsSync(path.join(destination, file)), false, file)
  }
  assert.deepEqual(JSON.parse(readFileSync(path.join(destination, '.vercel/project.json'), 'utf8')), settings)
  assert.notEqual(spawnSync('git', ['rev-parse', '--show-toplevel'], { cwd: destination }).status, 0)
})

test('rejects symlinks that could upload runner secrets or Git credentials', (t) => {
  for (const target of ['../outside.txt', '.env.local', '.git/config']) {
    const { root, source, destination, write } = fixture(t)
    writeFileSync(path.join(root, 'outside.txt'), 'outside secret')
    write('.env.local', 'environment secret')
    write('.git/config', 'Git credential')
    symlinkSync(target, path.join(source, 'innocent.txt'))
    assert.throws(() => stageSource({ source, destination, ...settings }), /unsafe symlink/)
  }
})

test('requires explicit existing project IDs and a staging directory outside any Git repository', (t) => {
  const { root, source, destination } = fixture(t)
  assert.throws(() => stageSource({ source, destination }), /VERCEL_ORG_ID/)
  assert.throws(() => stageSource({ source, destination: path.join(source, 'upload'), ...settings }), /separate directory/)
  const checkout = path.join(root, 'checkout')
  mkdirSync(checkout)
  execFileSync('git', ['init', '-q', checkout])
  assert.throws(() => stageSource({ source, destination: path.join(checkout, 'upload'), ...settings }), /must not be inside a Git repository/)
})

test('accepts a single Vercel URL and rejects unexpected hosts or output injection', () => {
  assert.equal(previewUrl('https://website-123.vercel.app/\n'), 'https://website-123.vercel.app')
  assert.equal(previewUrl('https://website-123.vercel.dev.zoo.dev'), 'https://website-123.vercel.dev.zoo.dev')
  for (const url of ['http://website.vercel.app', 'https://vercel.app.evil.test',
    'https://user:pass@website.vercel.app', 'https://zoo.dev',
    'https://website.vercel.app/?bypass=secret', 'https://website.vercel.app/path',
    'https://website.vercel.app\npreview_url=evil']) {
    assert.throws(() => previewUrl(url))
  }
})

test('publishes a branch link and both exact snapshot commits without requiring a PR', () => {
  const summary = previewSummary({ repository, branch: 'codex/bens-build-logs',
    docsSha: sha, websiteSha: 'b'.repeat(40), url: 'https://website-123.vercel.app' })
  assert.match(summary, /Open website preview.*https:\/\/website-123\.vercel\.app/)
  assert.match(summary, /documentation\/tree\/codex\/bens-build-logs/)
  assert.ok(summary.includes(sha))
  assert.ok(summary.includes('b'.repeat(40)))
  assert.match(summary, /Run \*\*Preview documentation\*\* again/)
})
