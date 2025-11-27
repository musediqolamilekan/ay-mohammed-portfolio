export default {
    name: 'book',
    title: 'Book',
    type: 'document',
    fields: [
        { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },

        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required()
        },

        { name: 'seq', title: 'Sequence (publication order)', type: 'number' },

        {
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
            description: 'Assign this book to a category (series, standalone, etc.)'
        },

        {
            name: 'cover',
            title: 'Cover image',
            type: 'image',
            options: { hotspot: true }
        },

        {
            name: 'excerpt',
            title: 'Short excerpt',
            type: 'text'
        },

        {
            name: 'description',
            title: 'Description',
            type: 'text'
        },

        {
            name: 'authorNote',
            title: 'Author note',
            type: 'text',
            description: 'Short personal note or comment from the author'
        },

        {
            name: 'contentGuide',
            title: 'Content guide',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [{ title: 'Normal', value: 'normal' }, { title: 'Quote', value: 'blockquote' }],
                    lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Number', value: 'number' }],
                    marks: {
                        decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [{ name: 'href', type: 'url', title: 'URL' }]
                            }
                        ]
                    }
                }
            ],
            description: 'Notes for editors, trigger warnings, or content guidance'
        },

        { name: 'publishedDate', title: 'Published Date', type: 'date' },

        {
            name: 'outOfStock',
            title: 'Out of stock',
            type: 'boolean',
            initialValue: false
        },

        {
            name: 'popularity',
            title: 'Popularity score',
            type: 'number'
        },

        {
            name: 'links',
            title: 'Purchase links',
            type: 'object',
            fields: [
                { name: 'print', title: 'Print (store/amazon)', type: 'url' },
                { name: 'ebook', title: 'E-book', type: 'url' },
                { name: 'audio', title: 'Audiobook', type: 'url' }
            ]
        }
    ],

    preview: {
        select: {
            title: 'title',
            media: 'cover',
            seq: 'seq',
            categoryTitle: 'category.title',
            out: 'outOfStock'
        },
        prepare(selection) {
            const { title, media, seq, categoryTitle, out } = selection;
            return {
                title: title + (seq ? ` — #${seq}` : ''),
                media,
                subtitle: categoryTitle ? `${categoryTitle}${out ? ' • Out' : ''}` : out ? 'Out of stock' : ''
            };
        }
    }
};
