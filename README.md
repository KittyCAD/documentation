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
| `content/pages/docs/kcl-samples/**` | `modeling-app/public/kcl-samples/**` |
| `content/kcl-test-outputs/**` | `modeling-app/rust/kcl-lib/tests/outputs/**` |
| `content/pages/docs/cli/manual/zoo*.md` | [`KittyCAD/cli`](https://github.com/KittyCAD/cli), generated with `make gen-md` |

The remaining file in the CLI manual, `index.md`, is handwritten here. The
[API reference](https://zoo.dev/docs/api) is generated separately and is not
stored in this repository.

See [`AGENTS.md`](./AGENTS.md) for generator commands and the exact ownership
rules used by coding agents.

## Live content edit preview

If you have access to our website repository and you'd like to live preview your content in the website as your write/edit it, head over to that repo's README to get instructions on how to set it up.
