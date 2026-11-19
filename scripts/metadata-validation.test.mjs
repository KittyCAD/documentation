import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'

const repositoryRoot = path.resolve(import.meta.dirname, '..')
const postPath = 'content/posts/bens-build-logs-single-engine-aircraft.mdx'
const validPost = `---
title: "Ben's Build Logs: Single-Engine Aircraft"
excerpt: Follow Ben as he designs a single-engine aircraft.
date: '2026-11-02'
author:
    name: Ben Friedel
ogImage:
    url: '/documentation-assets/bens-build-logs-single-engine-aircraft/build-log-meta-image.jpg'
tags: ['Case Study']
---

Ben's build logs.
`

test('the documentation build rejects invalid metadata instead of omitting pages', { timeout: 120_000 }, async (t) => {
  const root = mkdtempSync(path.join(tmpdir(), 'docs-metadata-'))
  try {
    // Run the real build/config in isolation without modifying source content or
    // the developer's generated output. Reuse the locked, installed dependencies.
    for (const file of ['contentlayer.config.js', 'package.json']) {
      copyFileSync(path.join(repositoryRoot, file), path.join(root, file))
    }
    symlinkSync(path.join(repositoryRoot, 'node_modules'), path.join(root, 'node_modules'), 'dir')
    mkdirSync(path.join(root, 'content/posts'), { recursive: true })

    function build(content) {
      writeFileSync(path.join(root, postPath), content)
      const result = spawnSync('npm', ['run', 'build'], {
        cwd: root,
        encoding: 'utf8',
        timeout: 30_000,
        maxBuffer: 5 * 1024 * 1024,
        env: { ...process.env, NO_COLOR: '1' },
      })
      assert.ifError(result.error)
      assert.equal(result.signal, null, result.stderr)
      return { status: result.status, output: result.stdout + result.stderr }
    }

    await t.test('valid metadata produces the post in the generated blog index', () => {
      const result = build(validPost)
      assert.equal(result.status, 0, result.output)
      const posts = JSON.parse(readFileSync(path.join(root, '.contentlayer/generated/BlogPost/_index.json'), 'utf8'))
      assert.equal(posts.length, 1)
      assert.equal(posts[0].slug, 'bens-build-logs-single-engine-aircraft')
    })

    await t.test('an unclosed ogImage.url quote fails even after a successful cached build', () => {
      const result = build(validPost.replace("build-log-meta-image.jpg'", 'build-log-meta-image.jpg'))
      assert.notEqual(result.status, 0, result.output)
      assert.match(result.output, /bens-build-logs-single-engine-aircraft\.mdx/)
      assert.match(result.output, /Missing closing 'quote/)
    })

    for (const [name, content, diagnostic] of [
      ['missing required title', validPost.replace(/^title:.*\n/m, ''), /Missing required fields/],
      ['invalid author value', validPost.replace('author:\n    name: Ben Friedel', 'author: Ben Friedel'), /name: string/],
      ['incompatible boolean value', validPost.replace("tags: ['Case Study']", "draft: 'not-a-boolean'"), /draft/],
      ['misspelled metadata field', validPost.replace('ogImage:', 'ogimage:'), /extra fields:[\s\S]*ogimage/],
    ]) {
      await t.test(name, () => {
        const result = build(content)
        assert.notEqual(result.status, 0, result.output)
        assert.match(result.output, /bens-build-logs-single-engine-aircraft\.mdx/)
        assert.match(result.output, diagnostic)
      })
    }

    await t.test('correcting the metadata restores a successful build and the post', () => {
      const result = build(validPost)
      assert.equal(result.status, 0, result.output)
      const posts = JSON.parse(readFileSync(path.join(root, '.contentlayer/generated/BlogPost/_index.json'), 'utf8'))
      assert.equal(posts.length, 1)
      assert.equal(posts[0].ogImage.url, '/documentation-assets/bens-build-logs-single-engine-aircraft/build-log-meta-image.jpg')
    })
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
