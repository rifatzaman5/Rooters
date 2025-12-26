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

    // 👇 UPDATED TESTIMONIALS SECTION
    defineField({
      name: "testimonialSection",
      title: "Testimonials Section",
      type: "object",
      options: { collapsible: true, collapsed: true },
      hidden: ({ document }) => slugOf(document) !== "home",
      fields: [
        defineField({
          name: "heading",
          title: "Section Heading",
          type: "string",
          initialValue: "The (Almost) 5-Star Insurance Brokerage",
        }),
        defineField({
          name: "description",
          title: "Section Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "mainImage",
          title: "Feature Image (Person Pointing)",
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            }
          ]
        }),
        // 👇 EMBEDDED LIST (Add items directly in Home Page)
        defineField({
          name: "testimonials",
          title: "Client Reviews",
          type: "array",
          of: [{ type: "testimonial" }] // Uses the object defined in testimonial.ts
        })
      ]
    }),
    // 👆 END UPDATE

    defineField({
      name: "pricing",
      title: "Pricing Section",
      type: "pricing",
      options: { collapsible: true, collapsed: true },
      hidden: ({ document }) => slugOf(document) !== "home",
    }),

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
                defineField({ name: "question", title: "Question", type: "string" }),
                defineField({ name: "answer", title: "Answer", type: "text", rows: 4 }),
              ],
            },
          ],
        }),
      ],
    }),

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
        defineField({ name: "body", title: "Content", type: "array", of: [{ type: "block" }] }),
      ],
    }),
    
  ],
})