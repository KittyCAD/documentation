import {
    defineDocumentType,
    defineNestedType,
    makeSource,
} from '@contentlayer/source-files'

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
            description:
                'The excerpt of the tutorial, for SEO and preview text use.',
            required: true,
        },
        langs: {
            type: 'list',
            of: {
                type: 'enum',
                options: ['go', 'ts', 'py', 'rs'],
            },
            description:
                'The programming languages the tutorial is available in.',
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
            resolve: doc => doc._raw.sourceFileName.replace(/\.mdx?$/, ''),
        },
    },
}))

const Page = defineDocumentType(() => ({
    name: 'Page',
    filePathPattern: `pages/**/*.md*`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            description: 'The title of the page, for SEO and heading use.',
            required: true,
        },
        excerpt: {
            type: 'string',
            description:
                'The excerpt of the page, for SEO and preview text use.',
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
            resolve: doc => doc._raw.sourceFileName.replace(/\.mdx?$/, ''),
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
                options: [
                    'software-engineering',
                    'hardware-engineering',
                ],
            },
            description: 'Subject domain(s) of the primary term.',
            required: true,
        }
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: doc => doc._raw.sourceFileName.replace(/\.mdx?$/, ''),
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
            required: true,
        },
    },
}))

const OgImage = defineNestedType(() => ({
    name: 'OgImage',
    description:
        'The og:image of the blog post, for SEO and preview image use.',
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
        'A blog post. You may use MDX Markdown with any of the following components from the website repo: Token, SamplePreview, InlineLitterbox, TabbedEditor, MarkDownAPITokens, TokenReplacementNote, BasicSnippet',
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
            required: true,
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
            resolve: doc => doc._raw.sourceFileName.replace(/\.mdx?$/, ''),
        },
    },
}))

const ChangeLog = defineDocumentType(() => ({
    name: 'ChangeLog',
    filePathPattern: `changelog/*.md*`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            description:
                'The title of the changelog entry, for SEO and heading use.',
            required: true,
        },
        description: {
            type: 'string',
            description:
                'The description of the changelog entry, for SEO and preview text use.',
            required: true,
        },
        date: {
            type: 'date',
            description: 'The date of the changelog entry.',
            required: true,
        },
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: doc => doc._raw.sourceFileName.replace(/\.mdx?$/, ''),
        },
    },
}))

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Tutorial, ChangeLog, Glossary, BlogPost, Page],
    disableImportAliasWarning: true,
})
