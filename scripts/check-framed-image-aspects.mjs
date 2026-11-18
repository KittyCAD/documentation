import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { imageSize } from 'image-size'

const contentDir = path.resolve(import.meta.dirname, '../content')
const docsDir = path.join(contentDir, 'pages/docs')
const allowedDifference = 1.05

function* mdxFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* mdxFiles(file)
    else if (entry.name.endsWith('.mdx')) yield file
  }
}

export function checkFramedImageAspects(root = contentDir) {
  const errors = []
  let checked = 0

  for (const file of mdxFiles(path.join(root, 'pages/docs'))) {
    const source = readFileSync(file, 'utf8')
    for (const match of source.matchAll(/<FramedImage\b([\s\S]*?)\/>/g)) {
      const tag = match[1]
      const src = tag.match(/\bsrc="([^"]+)"/)?.[1]
      const aspect = tag.match(/\baspect="([^"]+)"/)?.[1]
      const frameAspect = tag.match(/\bframeAspect="([^"]+)"/)?.[1]
      const location = `${path.relative(root, file)}:${source.slice(0, match.index).split('\n').length}`

      if (!src?.startsWith('/') || !aspect) {
        errors.push(`${location}: FramedImage needs a local src and aspect ratio`)
        continue
      }

      const parts = aspect.match(/^\s*(\d+)\s*\/\s*(\d+)\s*$/)
      if (!parts || Number(parts[1]) === 0 || Number(parts[2]) === 0) {
        errors.push(`${location}: invalid aspect ratio "${aspect}"`)
        continue
      }

      if (frameAspect) {
        const frameParts = frameAspect.match(/^\s*(\d+)\s*\/\s*(\d+)\s*$/)
        if (!frameParts || Number(frameParts[1]) === 0 || Number(frameParts[2]) === 0) {
          errors.push(`${location}: invalid frame aspect ratio "${frameAspect}"`)
          continue
        }
      }

      const asset = path.join(root, src.slice(1))
      let dimensions
      try {
        dimensions = imageSize(readFileSync(asset))
      } catch (error) {
        errors.push(`${location}: cannot read ${src}: ${error.message}`)
        continue
      }

      const declared = Number(parts[1]) / Number(parts[2])
      const actual = dimensions.width / dimensions.height
      const difference = Math.max(declared / actual, actual / declared)
      checked++

      if (difference > allowedDifference) {
        errors.push(
          `${location}: aspect="${aspect}" differs from ${src} (${dimensions.width} / ${dimensions.height}) by ${Math.round((difference - 1) * 100)}%`
        )
      }
    }
  }

  return { checked, errors }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { checked, errors } = checkFramedImageAspects()
  if (errors.length) {
    console.error(errors.join('\n'))
    process.exitCode = 1
  } else {
    console.log(`Checked ${checked} docs FramedImage aspect ratios`)
  }
}
