# Zoo docs

Contains source Markdown files for Zoo's documentation. Handwritten pages live
alongside directories mirrored from other repositories.

Did you find a typo? Please make a pull request!

## Source ownership

Edit generated documentation in its authoritative repository. Changes made to
the downstream mirrors in this repository will be overwritten.

| Path in this repository | Authoritative source |
| --- | --- |
| `content/pages/docs/kcl-lang/**` | [`KittyCAD/modeling-app`](https://github.com/KittyCAD/modeling-app) `docs/kcl-lang/**` |
| `content/pages/docs/kcl-std/**` | `modeling-app/rust/kcl-lib/std/**` doc comments, rendered into `modeling-app/docs/kcl-std/**` |
| `content/kcl-test-outputs/**` | `modeling-app/rust/kcl-lib/tests/outputs/**` |
| `content/pages/docs/cli/manual/zoo*.md` | [`KittyCAD/cli`](https://github.com/KittyCAD/cli), generated with `make gen-md` |

The remaining file in the CLI manual, `index.md`, is handwritten here. The
[API reference](https://zoo.dev/docs/api) is generated separately and is not
stored in this repository.

See [`AGENTS.md`](./AGENTS.md) for generator commands and the exact ownership
rules used by coding agents.

## Editorial tags and the New badge

For blog, research, and press posts, use frontmatter `tags` for content categories.
Do not add the `New` tag manually. The website frontend uses the frontmatter `date` to
automatically show a `New` badge for posts published within the last two calendar
months. It checks recency when the page loads, including on preview cards, article
headings, and the `New` tag results page. Refreshing or revisiting the page updates
the badge; no content edits or site rebuilds are needed for it to expire.

## Image frames and aspect ratios

Image frames use the website's page accent by default. To choose a different
accent for an image, set `theme="green"` (or another supported theme) on
`FramedImage`, or `frameColor="var(--green)"` on `ZoomableImage`. The frame,
corner markers, and zoom control use the same accent.

By default, `ZoomableImage` preserves the source image's proportions and draws a
frame around its preview. Use `unframed` when the surrounding component already
provides a frame. Custom thumbnails, including `FramedImage`, keep their own frames.
Provide image `width` and `height` for a stable layout while loading; galleries
use the first image's dimensions to size their previews.

When adding a `FramedImage`, set `aspect` to the source image's width and height
(or an equivalent ratio such as `1 / 1` for a square image). Run
`npm run check:images` to compare these values with the image files. The pull
request build runs the same check and rejects differences above 5%.
Use `frameAspect` when a different frame shape is intentional; the image will
remain undistorted inside that frame.

## Metadata validation

`npm run build` fails with a nonzero exit status for malformed frontmatter,
missing required fields, incompatible field values, unknown metadata fields,
or documents that do not match a content type. Invalid pages must be corrected
instead of being silently omitted from the website. The error output identifies
the affected file and, for YAML syntax errors, the line and column.

Run `npm run test:metadata` to exercise the build against valid and invalid
metadata, including the unclosed `ogImage.url` quote that previously caused Ben's
post to disappear. These regression tests and the full content build run in the
`build` PR check, which is required by the repository's `CI` ruleset for `main`.

## Live content edit preview

If you have access to our website repository and you'd like to live preview your content in the website as your write/edit it, head over to that repo's README to get instructions on how to set it up.

## Preview a pull request in your browser

You can request a website preview without installing anything locally:

1. Open a pull request with your documentation edits. Its branch must be in
   `KittyCAD/documentation`.
2. Go to [Actions → Preview documentation](https://github.com/KittyCAD/documentation/actions/workflows/preview.yml).
3. Click **Run workflow**, leave **Use workflow from** set to **main**, enter
   your pull request number, and click the green **Run workflow** button.
4. Wait for the run to finish. The preview link appears in a comment on your
   pull request and in the workflow run's summary. Open it to review your pages.

Previews are manual snapshots. Saving more edits or opening a PR does not
request a preview; press **Run workflow** again when you want a new one.
Each request uses the PR's current commit and the website's current `main`.
An existing preview continues to show the snapshot it was built from.

You need write access to this repository to run the workflow. You do not need
website repository membership or Vercel deployment permissions: a configured
automation account authors the website snapshot on your behalf.
Opening the preview is a separate permission check: the website's existing
Vercel preview protection still applies. A maintainer may need to grant viewer
access or provide a Vercel shareable link.
If a run fails, check its logs and the website's Vercel deployment logs.

### Maintainer setup

The workflow becomes available after `.github/workflows/preview.yml` is merged
into `main`. It reuses the `GH_ORG_APP_ID` and `GH_ORG_APP_PRIVATE_KEY` secrets
used by the existing website notification workflow. The App must be installed
on `KittyCAD/website` with **Contents: read and write** and
**Deployments: read** permissions. Its token is scoped to `website` for this job.
The documentation repository's Actions token needs permission to comment on PRs.

Set the documentation repository's **Actions variable** `DOCS_PREVIEW_GIT_AUTHOR`
to the GitHub username of an automation account that is linked to a Vercel
account with deployment access to the website team/project. A maintainer must
provision and authorize this account first; the GitHub App token alone does not
satisfy Vercel's commit-author membership check. The workflow fails early if
the variable is missing. It uses the account's GitHub noreply email for the
website commit and records the human requester and workflow run in its message.
The original documentation commits and authors remain unchanged.

No website code changes or additional Vercel secrets are required. The workflow
pushes a new `docs-preview/pr-<number>-<run>-<attempt>` branch to `website`, changing
only its documentation submodule pointer. Vercel's existing Git integration must
allow preview deployments for these branches. The run waits up to 20 minutes for
a successful Vercel preview before posting its URL.

Preview branches can be deleted from `website` when no longer needed; the run
summary links to the branch. Deployment retention follows the Vercel project's
settings. This workflow does not merge documentation or website changes.
