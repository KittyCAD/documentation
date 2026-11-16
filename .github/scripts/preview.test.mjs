import assert from 'node:assert/strict'
import { test } from 'node:test'
import { previewUrl, resolveRequest, waitForPreview } from './preview.mjs'

const sha = 'a'.repeat(40)
const repository = 'KittyCAD/documentation'
const pr = { state: 'open', head: { repo: { full_name: repository }, sha } }
const resolve = (pull = pr, prNumber = '42', deployAuthor = 'zoo-preview-bot') => resolveRequest({
  repository, prNumber, deployAuthor,
  request: async (path) => path.includes('/pulls/') ? pull : { login: 'zoo-preview-bot', id: 123 },
})

test('captures the exact PR head and authors it with the configured automation account', async () => {
  assert.deepEqual(await resolve(), {
    docs_sha: sha, author_name: 'zoo-preview-bot', author_email: '123+zoo-preview-bot@users.noreply.github.com',
  })
})

test('requires an explicitly configured deployment author rather than the requester', async () => {
  for (const author of ['', 'invalid\nname', 'invalid/name']) {
    await assert.rejects(resolve(pr, '42', author), /DOCS_PREVIEW_GIT_AUTHOR/)
  }
  const paths = []
  await resolveRequest({ repository, prNumber: '42', deployAuthor: 'zoo-preview-bot',
    request: async (path) => {
      paths.push(path)
      return path.includes('/pulls/') ? pr : { login: 'zoo-preview-bot', id: 123 }
    },
  })
  assert.deepEqual(paths, ['/repos/KittyCAD/documentation/pulls/42', '/users/zoo-preview-bot'])
})

test('rejects invalid inputs, closed PRs, forks, and deleted repositories', async () => {
  for (const number of ['0', '-1', '42\n', '42; echo unsafe', 'https://github.com/KittyCAD/documentation/pull/42']) {
    await assert.rejects(resolve(pr, number), /pull request number/)
  }
  await assert.rejects(resolve({ ...pr, state: 'closed' }), /open PR/)
  for (const repo of [null, { full_name: 'someone/documentation' }]) {
    await assert.rejects(resolve({ ...pr, head: { ...pr.head, repo } }), /internal branch/)
  }
})

test('accepts preview hosts and rejects unexpected URLs', () => {
  assert.equal(previewUrl('https://website-123.vercel.app/'), 'https://website-123.vercel.app')
  assert.equal(previewUrl('https://website-123.vercel.dev.zoo.dev'), 'https://website-123.vercel.dev.zoo.dev')
  for (const url of ['http://website.vercel.app', 'https://vercel.app.evil.test',
    'https://user:pass@website.vercel.app', 'https://zoo.dev']) {
    assert.throws(() => previewUrl(url), /unexpected preview URL/)
  }
})

function polling({ states = [], creator = 'vercel[bot]' } = {}) {
  let time = 0
  let polls = 0
  const paths = []
  const result = waitForPreview({ repository: 'KittyCAD/website', sha,
    now: () => time, sleep: async (ms) => { time += ms }, timeoutMs: 30_000,
    request: async (path) => {
      paths.push(path)
      if (path.endsWith('/statuses')) {
        return [{ state: states[polls - 1], creator: { login: creator },
          environment_url: 'https://website-123.vercel.app' }]
      }
      polls++
      return states[polls - 1] ? [{ id: 123, creator: { login: 'vercel[bot]' } }] : []
    },
  })
  return { result, paths }
}

test('waits for creation and success of the exact website snapshot', async () => {
  const { result, paths } = polling({ states: [null, 'pending', 'success'] })
  assert.equal(await result, 'https://website-123.vercel.app')
  assert.ok(paths[0].includes(`sha=${sha}&environment=Preview`))
  assert.ok(paths.includes('/repos/KittyCAD/website/deployments/123/statuses'))
})

test('fails on deployment errors and times out when no trusted success appears', async () => {
  for (const state of ['failure', 'error']) {
    await assert.rejects(polling({ states: [state] }).result, /preview failed/)
  }
  await assert.rejects(polling().result, /Timed out/)
  await assert.rejects(polling({ states: ['success'], creator: 'someone-else' }).result, /Timed out/)
})
