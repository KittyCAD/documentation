import { appendFileSync, cpSync, lstatSync, mkdirSync, readFileSync, readlinkSync, realpathSync, readdirSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

async function github(endpoint, token) {
  const response = await fetch(`https://api.github.com${endpoint}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
    signal: AbortSignal.timeout(30_000),
  })
  if (!response.ok) throw new Error(`GitHub ${endpoint}: HTTP ${response.status}`)
  return response.json()
}

export async function resolveRequest({ repository, branch, request }) {
  try {
    if (!branch || branch.startsWith('-')) throw new Error()
    // Validate the literal ref, without Git's @{-1} branch-name expansion.
    execFileSync('git', ['check-ref-format', `refs/heads/${branch}`], { stdio: 'ignore' })
  } catch {
    throw new Error('Enter a branch name in the documentation repository, such as bens-build-logs or codex/my-edit.')
  }
  const ref = await request(`/repos/${repository}/git/ref/heads/${encodeURIComponent(branch)}`)
  if (ref.ref !== `refs/heads/${branch}` || ref.object?.type !== 'commit' ||
      !/^[a-f0-9]{40}$/.test(ref.object.sha)) {
    throw new Error('GitHub did not return an exact documentation branch and commit.')
  }
  return { docs_sha: ref.object.sha }
}

const excluded = (name) => ['.git', '.vercel', 'node_modules', '.next', '.contentlayer'].includes(name) ||
  name === '.env' || name.startsWith('.env.')
const inside = (root, target) => {
  const relative = path.relative(root, target)
  return relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative)
}

export function stageSource({ source, destination, orgId, projectId }) {
  if (!/^team_[a-zA-Z0-9]+$/.test(orgId || '') || !/^prj_[a-zA-Z0-9]+$/.test(projectId || '')) {
    throw new Error('Set the VERCEL_ORG_ID (team_...) and VERCEL_PROJECT_ID (prj_...) Actions variables for the existing website project.')
  }
  source = realpathSync(source)
  mkdirSync(destination, { recursive: true })
  destination = realpathSync(destination)
  if (inside(source, destination) || inside(destination, source)) {
    throw new Error('Stage the preview in a separate directory outside the checkout.')
  }
  // Refuse any parent Git checkout, so the CLI cannot infer a commit author.
  try {
    execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: destination, stdio: 'ignore' })
    throw new Error('The preview staging directory must not be inside a Git repository.')
  } catch (error) {
    if (!error.status) throw error
  }
  if (readdirSync(destination).length) throw new Error('The preview staging directory must be empty.')
  cpSync(source, destination, {
    recursive: true,
    verbatimSymlinks: true,
    filter: (entry) => {
      if (entry !== source && excluded(path.basename(entry))) return false
      if (lstatSync(entry).isSymbolicLink()) {
        const target = realpathSync(entry)
        if (path.isAbsolute(readlinkSync(entry)) || !inside(source, target) ||
            path.relative(source, target).split(path.sep).some(excluded)) {
          throw new Error(`Preview source has an unsafe symlink: ${path.relative(source, entry)}`)
        }
      }
      return true
    },
  })
  mkdirSync(path.join(destination, '.vercel'), { recursive: true })
  writeFileSync(path.join(destination, '.vercel/project.json'), JSON.stringify({ orgId, projectId }))
}

export function previewUrl(value) {
  const url = new URL(value.trim())
  if (url.protocol !== 'https:' || url.username || url.password ||
      !(url.hostname.endsWith('.vercel.app') || url.hostname.endsWith('.vercel.dev.zoo.dev')) ||
      url.pathname !== '/' || url.search || url.hash || url.port) {
    throw new Error('Vercel returned an unexpected preview URL.')
  }
  return url.origin
}

export function previewSummary({ repository, branch, docsSha, websiteSha, url }) {
  const branchPath = branch.split('/').map(encodeURIComponent).join('/')
  return `## Documentation preview\n\n[Open website preview](${previewUrl(url)})\n\n` +
    `[Documentation branch](https://github.com/${repository}/tree/${branchPath})\n\n` +
    `Documentation snapshot: \`${docsSha}\`\n\nWebsite snapshot: \`${websiteSha}\`\n\n` +
    'This is a manual snapshot. Run **Preview documentation** again to preview newer edits.\n'
}

async function main() {
  const env = process.env
  if (process.argv[2] === 'prepare') {
    const outputs = await resolveRequest({
      repository: env.GITHUB_REPOSITORY, branch: env.DOCS_BRANCH,
      request: (endpoint) => github(endpoint, env.GH_TOKEN),
    })
    for (const [key, value] of Object.entries(outputs)) appendFileSync(env.GITHUB_OUTPUT, `${key}=${value}\n`)
  } else if (process.argv[2] === 'stage') {
    stageSource({ source: env.WEBSITE_SOURCE, destination: env.PREVIEW_SOURCE,
      orgId: env.VERCEL_ORG_ID, projectId: env.VERCEL_PROJECT_ID })
  } else if (process.argv[2] === 'publish') {
    const url = previewUrl(readFileSync(env.PREVIEW_URL_FILE, 'utf8'))
    appendFileSync(env.GITHUB_OUTPUT, `preview_url=${url}\n`)
    appendFileSync(env.GITHUB_STEP_SUMMARY, previewSummary({ repository: env.GITHUB_REPOSITORY,
      branch: env.DOCS_BRANCH, docsSha: env.DOCS_SHA, websiteSha: env.WEBSITE_SHA, url }))
  } else {
    throw new Error('Expected prepare, stage, or publish.')
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1 })
}
