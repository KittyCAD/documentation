import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from '@contentlayer/source-files'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

const Author = defineNestedType(() => ({
  name: 'Author',
  fields: {
    name: {
      type: 'string',
      description: 'The name of the author.',
      required: true,
    },
    picture: {
      type: 'string',
      description: 'The picture of the author.',
      required: false,
    },
  },
}))

const OgImage = defineNestedType(() => ({
  name: 'OgImage',
  description: 'The og:image of the blog post, for SEO and preview image use.',
  fields: {
    url: {
      type: 'string',
      description: 'The url of the og:image.',
      required: true,
    },
  },
}))

const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `pages/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the page, for SEO and heading use.',
      required: true,
    },
    excerpt: {
      type: 'string',
      description: 'The excerpt of the page, for SEO and preview text use.',
      required: true,
    },
    layout: {
      type: 'enum',
      options: ['manual'],
      description: 'The layout of the page.',
      required: false,
    }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx?$/, ''),
    },
  },
}))

const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `pages/docs/**/*.md*`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the tutorial, for SEO and heading use.',
      required: true,
    },
    excerpt: {
      type: 'string',
      description: 'The excerpt of the tutorial, for SEO and preview text use.',
      required: true,
    },
    langs: {
      type: 'list',
      of: {
        type: 'enum',
        options: ['go', 'ts', 'py', 'rs'],
      },
      description: 'The programming languages the tutorial is available in.',
      required: false,
    },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
      description: 'The tags of the tutorial, for SEO and filtering use.',
      required: false,
    },
    sidebarPosition: {
      type: 'number',
      description:
        'The position of the doc in the sidebar. The lower the number, the higher the position.',
      required: false,
    },
    subtitle: {
      type: 'string',
      description: 'Subtitle for the doc, used in the page body.',
      required: false,
    },
    layout: {
      type: 'enum',
      options: ['manual'],
      description: 'The layout of the page.',
      required: false,
    },
    synonyms: {
      type: 'list',
      of: {
        type: 'string',
      },
      description: 'Synonyms of the primary term.',
      required: false,
    },
    domains: {
      type: 'list',
      of: {
        type: 'enum',
        options: ['software-engineering', 'hardware-engineering'],
      },
      description: 'Subject domain(s) of the primary term.',
      required: false,
    }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.(?:md|mdx)$/i, ''),
    },
    slugs: {
      type: 'list',
      resolve: (doc) => {
        const paths = doc._raw.sourceFilePath
          .replace('pages/docs/', '')
          .replace(/\.(?:md|mdx)$/i, '')
          .split('/')

        // If we end the array on "index", we remove it.
        if (paths[paths.length - 1] === 'index') {
          paths.pop()
        }
        return paths
      },
    },
  },
}))

const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: `posts/*.md*`,
  contentType: 'mdx',
  description:
    'A blog post. You may use MDX Markdown with any of the following components from the website repo: MarkDownAPITokens, TokenReplacementNote',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the blog post, for SEO and heading use.',
      required: true,
    },
    excerpt: {
      type: 'string',
      description:
        'The excerpt of the blog post, for SEO and preview text use.',
      required: true,
    },
    coverImage: {
      type: 'string',
      description:
        'The cover image of the blog post, for SEO and preview image use.',
      required: false,
    },
    date: {
      type: 'date',
      description: 'The date of the blog post.',
      required: true,
    },
    author: {
      type: 'nested',
      of: Author,
      description: 'The author of the blog post.',
      required: true,
    },
    ogImage: {
      type: 'nested',
      of: OgImage,
      description:
        'The og:image of the blog post, for SEO and preview image use.',
      required: false,
    }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx?$/, ''),
    },
  },
}))

const ResearchPage = defineDocumentType(() => ({
  name: 'ResearchPage',
  filePathPattern: `research/*.md*`,
  contentType: 'mdx',
  description:
    'A research page. You may use MDX Markdown with any of the following components from the website repo: MarkDownAPITokens, TokenReplacementNote',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the research page, for SEO and heading use.',
      required: true,
    },
    shortTitle: {
      type: 'string',
      description: 'The short title of the research page, for navigation use.',
      required: true,
    },
    excerpt: {
      type: 'string',
      description:
        'The excerpt of the research page, for SEO and preview text use.',
      required: true,
    },
    coverImage: {
      type: 'string',
      description:
        'The cover image of the research page, for SEO and preview image use.',
      required: false,
    },
    date: {
      type: 'date',
      description: 'The date of the research page.',
      required: true,
    },
    author: {
      type: 'nested',
      of: Author,
      description: 'The author of the research page.',
      required: true,
    },
    additionalContributors: {
      type: 'string',
      description:
        'Additional contributors to the research page, for attribution purposes.',
      required: false,
    },
    ogImage: {
      type: 'nested',
      of: OgImage,
      description:
        'The og:image of the research page, for SEO and preview image use.',
      required: false,
    }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx?$/, ''),
    },
  },
}))

const PressPage = defineDocumentType(() => ({
  name: 'PressPage',
  filePathPattern: `press/*.md*`,
  contentType: 'mdx',
  description:
    'A press page. You may use MDX Markdown with any of the following components from the website repo: MarkDownAPITokens, TokenReplacementNote',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the press page, for SEO and heading use.',
      required: true,
    },
    subTitle: {
      type: 'string',
      description: 'The subtitle of the press page, for SEO and heading use.',
      required: false,
    },
    shortTitle: {
      type: 'string',
      description: 'The short title of the press page, for navigation use.',
      required: true,
    },
    excerpt: {
      type: 'string',
      description:
        'The excerpt of the press page, for SEO and preview text use.',
      required: true,
    },
    coverImage: {
      type: 'string',
      description:
        'The cover image of the press page, for SEO and preview image use.',
      required: false,
    },
    date: {
      type: 'date',
      description: 'The date of the press page.',
      required: true,
    },
    author: {
      type: 'nested',
      of: Author,
      description: 'The author of the press page.',
      required: true,
    },
    ogImage: {
      type: 'nested',
      of: OgImage,
      description:
        'The og:image of the press page, for SEO and preview image use.',
      required: false,
    }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx?$/, ''),
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',

  // Order of these maters because Page is greedy.
  documentTypes: [BlogPost, Doc, Page, PressPage, ResearchPage],
  disableImportAliasWarning: true,
  contentDirExclude: ['**/README.md', '**/manifest.json'],

  mdx: {
    remarkPlugins: [
      remarkMath, // Parses $...$ and $$...$$.
    ],
    rehypePlugins: [[rehypeKatex, { output: 'htmlAndMathml' }]],
  },
})
