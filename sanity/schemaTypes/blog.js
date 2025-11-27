export default {
    name: "blog",
    title: "Blog",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required().min(3).max(200),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title", maxLength: 96 },
            validation: (Rule) => Rule.required(),
        },
        {
            name: "likes",
            title: "Likes",
            type: "number",
            description: "Number of likes (non-negative integer)",
            initialValue: 0,
            validation: (Rule) =>
                Rule.required().integer().min(0).error("Likes must be a non-negative integer"),
        },
        {
            name: "content",
            title: "Content",
            type: "array",
            of: [
                { type: "block" },
                { type: "image", options: { hotspot: true } },
            ],
            description: "Rich content for the post (Portable Text).",
            validation: (Rule) => Rule.required().min(1),
        },
        {
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Alt text",
                    type: "string",
                    description: "Required for accessibility",
                    validation: (Rule) => Rule.required().error("Please provide alt text"),
                },
            ],
        },
        { name: 'publishedDate', title: 'Published Date', type: 'date' },
    ],

    preview: {
        select: {
            title: "title",
            media: "coverImage",
            subtitle: "slug.current",
        },
    },
};
