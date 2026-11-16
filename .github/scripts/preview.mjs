import { appendFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

export async function github(path, token, body) {
  const response = await fetch(`https://api.github.com${path}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(30_000),
  })
  if (!response.ok) {
    throw new Error(`GitHub ${path}: HTTP ${response.status}: ${(await response.text()).slice(0, 300)}`)
  }
  return response.json()
}

export async function resolveRequest({ repository, prNumber, deployAuthor, request }) {
  if (!deployAuthor || !/^[\w-]+$/.test(deployAuthor)) {
    throw new Error('Set the DOCS_PREVIEW_GIT_AUTHOR repository variable to the GitHub username of an automation account linked to the website Vercel team.')
  }
  if (!/^[1-9]\d*$/.test(prNumber)) {
    throw new Error('Enter a pull request number, such as 123.')
  }
  const pr = await request(`/repos/${repository}/pulls/${prNumber}`)
  if (pr.state !== 'open' || pr.head.repo?.full_name.toLowerCase() !== repository.toLowerCase()) {
    throw new Error('Preview requires an open PR with a branch in this documentation repository. Copy fork changes to an internal branch first.')
  }
  if (!/^[a-f0-9]{40}$/.test(pr.head.sha)) {
    throw new Error('GitHub returned an invalid documentation commit.')
  }
  // The automation account authors the website snapshot. The person requesting
  // it needs no Vercel deploy access; their identity stays in the run and commit.
  const user = await request(`/users/${encodeURIComponent(deployAuthor)}`)
  if (!/^[\w-]+$/.test(user.login) || !Number.isSafeInteger(user.id)) {
    throw new Error('GitHub returned an invalid deployment author.')
  }
  return {
    docs_sha: pr.head.sha,
    author_name: user.login,
    author_email: `${user.id}+${user.login}@users.noreply.github.com`,
  }
}

export function previewUrl(value) {
  const url = new URL(value)
  if (url.protocol !== 'https:' || url.username || url.password ||
      !(url.hostname.endsWith('.vercel.app') || url.hostname.endsWith('.vercel.dev.zoo.dev'))) {
    throw new Error('Vercel returned an unexpected preview URL.')
  }
  return url.toString().replace(/\/$/, '')
}

export async function waitForPreview({ repository, sha, request,
  now = Date.now, sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  timeoutMs = 20 * 60 * 1000 }) {
  const deadline = now() + timeoutMs
  while (now() < deadline) {
    const deployments = await request(`/repos/${repository}/deployments?sha=${sha}&environment=Preview&per_page=10`)
    const deployment = deployments.find((item) => item.creator?.login === 'vercel[bot]')
    if (deployment) {
      const [status] = await request(`/repos/${repository}/deployments/${deployment.id}/statuses`)
      if (status?.creator?.login === 'vercel[bot]') {
        if (status.state === 'success') return previewUrl(status.environment_url)
        if (['failure', 'error'].includes(status.state)) {
          throw new Error(`Vercel preview failed: ${status.description || status.state}. Check the website deployment logs.`)
        }
      }
    }
    await sleep(10_000)
  }
  throw new Error('Timed out waiting for Vercel. Check website deployments and confirm DOCS_PREVIEW_GIT_AUTHOR has Vercel team access.')
}

async function main() {
  const env = process.env
  const request = (path, body) => github(path, env.GH_TOKEN, body)
  if (process.argv[2] === 'prepare') {
    const outputs = await resolveRequest({
      repository: env.GITHUB_REPOSITORY, prNumber: env.PR_NUMBER,
      deployAuthor: env.DEPLOY_AUTHOR, request,
    })
    for (const [key, value] of Object.entries(outputs)) {
      appendFileSync(env.GITHUB_OUTPUT, `${key}=${value}\n`)
    }
    return
  }
  if (process.argv[2] !== 'publish') throw new Error('Expected prepare or publish.')
  const website = `${env.GITHUB_REPOSITORY.split('/')[0]}/website`
  const runUrl = `https://github.com/${env.GITHUB_REPOSITORY}/actions/runs/${env.GITHUB_RUN_ID}`
  const branchUrl = `https://github.com/${website}/tree/${env.PREVIEW_BRANCH}`
  appendFileSync(env.GITHUB_STEP_SUMMARY,
    `Documentation snapshot: \`${env.DOCS_SHA}\`\n\n[Website preview branch](${branchUrl})\n\n`)
  try {
    const url = await waitForPreview({ repository: website, sha: env.WEBSITE_SHA,
      request: (path) => github(path, env.WEBSITE_TOKEN) })
    const body = `Website preview: ${url}\n\nDocumentation snapshot: \`${env.DOCS_SHA}\`.\n\nThis preview was requested manually. Run **Preview documentation** again to preview newer edits. [Workflow run](${runUrl}).`
    // Make the link available in the run even if posting the PR comment fails.
    appendFileSync(env.GITHUB_STEP_SUMMARY, `${body}\n`)
    await request(`/repos/${env.GITHUB_REPOSITORY}/issues/${env.PR_NUMBER}/comments`, { body })
  } catch (error) {
    appendFileSync(env.GITHUB_STEP_SUMMARY, `Preview did not finish: ${error.message}\n`)
    throw error
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}
