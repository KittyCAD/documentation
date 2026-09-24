import assert from 'node:assert/strict'
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { checkFramedImageAspects } from './check-framed-image-aspects.mjs'

test('rejects a FramedImage ratio that does not match its asset', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'docs-image-aspects-'))
  const asset = path.join(root, 'documentation-assets/example.png')
  const page = path.join(root, 'pages/docs/example.mdx')

  try {
    mkdirSync(path.dirname(asset), { recursive: true })
    mkdirSync(path.dirname(page), { recursive: true })
    copyFileSync(
      path.join(
        import.meta.dirname,
        '../content/documentation-assets/docs/zoo-design-studio/features/data-management/cloud-sync/empty-libraries.png'
      ),
      asset
    )

    writeFileSync(
      page,
      '<FramedImage src="/documentation-assets/example.png" aspect="520 / 60" />'
    )
    assert.match(checkFramedImageAspects(root).errors[0], /differs.*3024 \/ 1906/)

    writeFileSync(
      page,
      '<FramedImage src="/documentation-assets/example.png" aspect="3024 / 1906" frameAspect="520 / 60" />'
    )
    assert.deepEqual(checkFramedImageAspects(root), { checked: 1, errors: [] })
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
