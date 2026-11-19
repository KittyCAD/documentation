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

## Preview a branch in your browser

You can request a website preview without installing anything locally:

1. Push your edits to a branch in `KittyCAD/documentation`. No pull request is
   needed.
2. Go to [Actions → Preview documentation](https://github.com/KittyCAD/documentation/actions/workflows/preview.yml).
3. Click **Run workflow**, leave **Use workflow from** set to **main**, enter
   your documentation branch name (such as `bens-build-logs` or
   `codex/my-edit`), and click the green **Run workflow** button.
4. Wait for the run to finish, then open the **Open website preview** link in
   the run's summary. Add `/blog` or the path of your edited page to that URL.

Previews are manual snapshots. Saving more edits or opening a PR does not
request a preview; press **Run workflow** again when you want a new one. The
workflow resolves the selected branch to an exact commit when it starts and
combines it with the website's current `main`. Both commit IDs appear in the
summary. An existing preview continues to show the snapshot it was built from.

You need write access to this repository to run the workflow. You do not need
website repository membership or Vercel deployment permissions: a stored Vercel
token authorizes the deployment on your behalf. Fork branches and tags are not
accepted; the branch must exist in this repository.
Opening the preview is a separate permission check: the website's existing
Vercel preview protection still applies. A maintainer may need to grant viewer
access or provide a Vercel shareable link.
If a run fails, check its logs and the website's Vercel deployment logs.

### Maintainer setup

The workflow becomes available after `.github/workflows/preview.yml` is merged
into `main`. Configure these in the documentation repository under
**Settings → Secrets and variables → Actions**:

| Setting | Type | Value |
| --- | --- | --- |
| `VERCEL_TOKEN` | Secret | A Vercel access token scoped to the Zoo team, owned by an account authorized to deploy to `website` |
| `VERCEL_ORG_ID` | Variable | Zoo's Vercel team ID (`team_...`) |
| `VERCEL_PROJECT_ID` | Variable | The existing website project's ID (`prj_...`) |
| `GH_ORG_APP_ID` | Secret | Existing GitHub App ID, also used by the website notification workflow |
| `GH_ORG_APP_PRIVATE_KEY` | Secret | Existing GitHub App private key |

Create the Vercel token in your Vercel account's token settings, select the Zoo
team scope, and choose an expiration date. Store its value only as the Actions
secret, and rotate it before it expires or if its owner's access changes. A
team-scoped token can grant more than preview-only access; the workflow always
requests the Preview target. Find the team and project IDs in Vercel's general
settings or the website's linked `.vercel/project.json` file. Select the existing
website project, which must already have a production deployment.

The GitHub App only needs **Contents: read** on `KittyCAD/website` for this
workflow. It checks out the website and its existing submodules, replaces the
documentation checkout with the selected commit, and stages a source snapshot
outside Git. Git metadata, local `.env` files, credentials, and generated caches
are excluded; symlinks outside the source snapshot are rejected. No website
branches or commits are created. `DOCS_PREVIEW_GIT_AUTHOR` is no longer used,
and no GitHub service account is needed.

The pinned Vercel CLI uploads the snapshot directly and waits for Vercel to
build it using the website project's existing Preview settings. The deployment
token is available only to the upload step; it is not forwarded to the remote
build. Documentation install/build scripts run on Vercel and still have access
to the project's Preview environment variables. Only default Preview variables
apply: this upload has no website Git branch association for branch-specific
variables or domains. No source archives are uploaded to public GitHub artifacts.

Deployment retention follows the Vercel project's settings. The job has a
30-minute timeout; canceling it does not necessarily cancel a build already
submitted to Vercel. This workflow does not merge changes or deploy to production.
