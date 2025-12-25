import { defineField, defineType } from "sanity"

const slugOf = (doc: any) => doc?.slug?.current

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "hero",
      title: "Hero Section",
      type: "hero",
      options: { collapsible: true, collapsed: true },
    }),

    // ✅ show only on home/about
    defineField({
      name: "aboutUs",
      title: "About Us Section",
      type: "aboutUs",
      options: { collapsible: true, collapsed: true },
      hidden: ({ document }) => {
        const s = slugOf(document)
        return !(s === "home" || s === "about")
      },
    }),

    // ✅ show only on home
    defineField({
      name: "pricing",
      title: "Pricing Section",
      type: "pricing",
      options: { collapsible: true, collapsed: true },
      hidden: ({ document }) => slugOf(document) !== "home",
    }),

    // ✅ show only on faq page
    defineField({
      name: "faq",
      title: "FAQ Section",
      type: "object",
      options: { collapsible: true, collapsed: true },
      hidden: ({ document }) => slugOf(document) !== "faq",
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          initialValue: "Frequently Asked Questions",
        }),
        defineField({
          name: "description",
          title: "Intro Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "items",
          title: "Questions",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "question",
                  title: "Question",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "answer",
                  title: "Answer",
                  type: "text",
                  rows: 4,
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // ✅ show only on privacy/terms pages
    defineField({
      name: "content",
      title: "Legal / Rich Text Content",
      type: "object",
      options: { collapsible: true, collapsed: true },
      hidden: ({ document }) => {
        const s = slugOf(document)
        return !["privacy-policy", "privacy", "terms", "terms-of-service"].includes(s || "")
      },
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "lastUpdated", title: "Last Updated", type: "date" }),
        defineField({
          name: "body",
          title: "Content",
          type: "array",
          of: [{ type: "block" }],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
})