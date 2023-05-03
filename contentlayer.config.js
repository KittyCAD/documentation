import { makeSource, defineDocumentType } from '@contentlayer/source-files'

const Tutorial = defineDocumentType(() => ({
    name: 'Tutorial',
    filePathPattern: `docs/tutorials/*.md*`,
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
    }
}))

const LegalPage = defineDocumentType(() => ({
    name: 'Legal Page',
    filePathPattern: `legal/*.md*`,
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
    }
}))

const Glossary = defineDocumentType(() => ({
    name: 'Glossary',
    filePathPattern: `docs/glossary/*.md*`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            description: 'Primary term of the glossary entry.',
            required: true,
        },
        excerpt: {
            type: 'string',
            description: 'The excerpt of the glossary definition, for SEO and preview text use.',
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
    },
}))


export default makeSource({
    contentDirPath: '_pages',
    documentTypes: [
        LegalPage,
        Tutorial,
        Glossary,
    ],
})