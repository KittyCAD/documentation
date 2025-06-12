import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from '@contentlayer/source-files'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

const Tutorial = defineDocumentType(() => ({
  name: 'Tutorial',
  filePathPattern: `tutorials/*.md*`,
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
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx?$/, ''),
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
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx?$/, ''),
    },
  },
}))

const Glossary = defineDocumentType(() => ({
  name: 'Glossary',
  filePathPattern: `glossary/*.md*`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'Primary term of the glossary entry.',
      required: true,
    },
    excerpt: {
      type: 'string',
      description:
        'The excerpt of the glossary definition, for SEO and preview text use.',
      required: true,
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
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx?$/, ''),
    },
  },
}))

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
    },
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
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx?$/, ''),
    },
  },
}))

const KclDoc = defineDocumentType(() => ({
  name: 'KclDoc',
  filePathPattern: `pages/docs/kcl-std/*.md`,
  contentType: 'markdown',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the docs, for SEO and heading use.',
      required: true,
    },
    subtitle: {
      type: 'string',
      description: 'Subtitle for the doc, used in the page body.',
      required: false,
    },
    excerpt: {
      type: 'string',
      description: 'The excerpt of the docs, for SEO and preview text use.',
      required: true,
    },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
      description: 'The tags of the docs, for SEO and filtering use.',
      required: false,
    },
    layout: {
      type: 'enum',
      options: ['manual'],
      description: 'The layout of the page.',
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.md?$/, ''),
    },
  },
}))

const KclLangDoc = defineDocumentType(() => ({
  name: 'KclLangDoc',
  filePathPattern: `pages/docs/kcl-lang/**/*.md`,
  contentType: 'markdown',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the docs, for SEO and heading use.',
      required: true,
    },
    subtitle: {
      type: 'string',
      description: 'Subtitle for the doc, used in the page body.',
      required: false,
    },
    excerpt: {
      type: 'string',
      description: 'The excerpt of the docs, for SEO and preview text use.',
      required: true,
    },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
      description: 'The tags of the docs, for SEO and filtering use.',
      required: false,
    },
    layout: {
      type: 'enum',
      options: ['manual'],
      description: 'The layout of the page.',
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.md?$/, ''),
    },
  },
}))

const KclType = defineDocumentType(() => ({
  name: 'KclType',
  filePathPattern: `pages/docs/kcl-std/types/*.md`,
  contentType: 'markdown',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the docs, for SEO and heading use.',
      required: true,
    },
    subtitle: {
      type: 'string',
      description: 'Subtitle for the doc, used in the page body.',
      required: false,
    },
    excerpt: {
      type: 'string',
      description: 'The excerpt of the docs, for SEO and preview text use.',
      required: true,
    },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
      description: 'The tags of the docs, for SEO and filtering use.',
      required: false,
    },
    layout: {
      type: 'enum',
      options: ['manual'],
      description: 'The layout of the page.',
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.md?$/, ''),
    },
  },
}))

const CliDoc = defineDocumentType(() => ({
  name: 'CliDoc',
  filePathPattern: `pages/docs/cli/**/*.md`,
  contentType: 'markdown',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the docs, for SEO and heading use.',
      required: true,
    },
    excerpt: {
      type: 'string',
      description: 'The excerpt of the docs, for SEO and preview text use.',
      required: true,
    },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
      description: 'The tags of the docs, for SEO and filtering use.',
      required: false,
    },
    layout: {
      type: 'enum',
      options: ['manual'],
      description: 'The layout of the page.',
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.md?$/, ''),
    },
  },
}))

const KclConst = defineDocumentType(() => ({
  name: 'KclConst',
  filePathPattern: `pages/docs/kcl-std/consts/*.md`,
  contentType: 'markdown',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the docs, for SEO and heading use.',
      required: true,
    },
    subtitle: {
      type: 'string',
      description: 'Subtitle for the doc, used in the page body.',
      required: false,
    },
    excerpt: {
      type: 'string',
      description: 'The excerpt of the docs, for SEO and preview text use.',
      required: true,
    },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
      description: 'The tags of the docs, for SEO and filtering use.',
      required: false,
    },
    layout: {
      type: 'enum',
      options: ['manual'],
      description: 'The layout of the page.',
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.md?$/, ''),
    },
  },
}))

const KclFunction = defineDocumentType(() => ({
  name: 'KclFunction',
  filePathPattern: `pages/docs/kcl-std/functions/*.md`,
  contentType: 'markdown',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the docs, for SEO and heading use.',
      required: true,
    },
    subtitle: {
      type: 'string',
      description: 'Subtitle for the doc, used in the page body.',
      required: false,
    },
    excerpt: {
      type: 'string',
      description: 'The excerpt of the docs, for SEO and preview text use.',
      required: true,
    },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
      description: 'The tags of the docs, for SEO and filtering use.',
      required: false,
    },
    layout: {
      type: 'enum',
      options: ['manual'],
      description: 'The layout of the page.',
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.md?$/, ''),
    },
  },
}))

const KclModule = defineDocumentType(() => ({
  name: 'KclModule',
  filePathPattern: `pages/docs/kcl-std/modules/*.md`,
  contentType: 'markdown',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the docs, for SEO and heading use.',
      required: true,
    },
    subtitle: {
      type: 'string',
      description: 'Subtitle for the doc, used in the page body.',
      required: false,
    },
    excerpt: {
      type: 'string',
      description: 'The excerpt of the docs, for SEO and preview text use.',
      required: true,
    },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
      description: 'The tags of the docs, for SEO and filtering use.',
      required: false,
    },
    layout: {
      type: 'enum',
      options: ['manual'],
      description: 'The layout of the page.',
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.md?$/, ''),
    },
  },
}))

const DesignStudioDoc = defineDocumentType(() => ({
  name: 'DesignStudioDoc',
  filePathPattern: `pages/docs/zoo-design-studio/*.md*`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the docs, for SEO and heading use.',
      required: true,
    },
    excerpt: {
      type: 'string',
      description: 'The excerpt of the docs, for SEO and preview text use.',
      required: true,
    },
    sidebarPosition: {
      type: 'number',
      description:
        'The position of the doc in the sidebar. The lower the number, the higher the position.',
      required: false,
    },
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
  documentTypes: [
    Tutorial,
    Glossary,
    BlogPost,
    DesignStudioDoc,
    ResearchPage,
    Page,
    KclDoc,
    KclLangDoc,
    KclType,
    KclFunction,
    KclConst,
    KclModule,
    CliDoc,
  ],
  disableImportAliasWarning: true,
  contentDirExclude: ['**/README.md', '**/manifest.json'],

  mdx: {
    remarkPlugins: [
      remarkMath, // Parses $...$ and $$...$$.
    ],
    rehypePlugins: [[rehypeKatex, { output: 'htmlAndMathml' }]],
  },
})
