import { defineField, defineType } from "sanity"

const slugOf = (doc: any) => doc?.slug?.current
const isOneOf = (doc: any, slugs: string[]) => slugs.includes(slugOf(doc) || "")

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

    // ✅ NEW: Stats Section (HOME only)
    defineField({
      name: "statsSection",
      title: "Stats Section",
      type: "object",
      options: { collapsible: true, collapsed: true },
      hidden: ({ document }) => slugOf(document) !== "home",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Trusted by Thousands",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "stats",
          title: "Stats",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "value",
                  title: "Value",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "icon",
                  title: "Icon (Lucide)",
                  type: "string",
                  description: "e.g., Users, Star, Award, Shield",
                }),
              ],
              preview: {
                select: { title: "value", subtitle: "label" },
              },
            },
          ],
          validation: (Rule) => Rule.max(4).warning("Best with 3-4 stats"),
        }),
      ],
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

    // ✅ NEW: Process Section (SERVICES only)
    defineField({
      name: "processSection",
      title: "Process/How It Works Section",
      type: "object",
      options: { collapsible: true, collapsed: true },
      hidden: ({ document }) => slugOf(document) !== "services",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "How It Works",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Step Title",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 3,
                }),
                defineField({
                  name: "icon",
                  title: "Icon (Lucide)",
                  type: "string",
                  description: "e.g., Phone, Calendar, Wrench, CheckCircle",
                }),
              ],
              preview: {
                select: { title: "title" },
              },
            },
          ],
          validation: (Rule) => Rule.max(4).warning("Best with 3-4 steps"),
        }),
      ],
    }),

    // Testimonials (HOME + SERVICES)
    defineField({
      name: "testimonialSection",
      title: "Testimonials Section",
      type: "object",
      options: { collapsible: true, collapsed: true },
      hidden: ({ document }) => !isOneOf(document, ["home", "services"]),
      fields: [
        defineField({
          name: "heading",
          title: "Section Heading",
          type: "string",
          initialValue: "Trusted by Local Homeowners",
        }),
        defineField({
          name: "description",
          title: "Section Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "mainImage",
          title: "Feature Image (Optional)",
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
          ],
        }),
        defineField({
          name: "testimonials",
          title: "Client Reviews",
          type: "array",
          of: [{ type: "testimonial" }],
        }),
      ],
    }),

    // Pricing (HOME only)
    defineField({
      name: "pricing",
      title: "Pricing Section",
      type: "pricing",
      options: { collapsible: true, collapsed: true },
      hidden: ({ document }) => slugOf(document) !== "home",
    }),

    // Guarantees (HOME + SERVICES)
    defineField({
      name: "guaranteesSection",
      title: "Guarantees Section",
      type: "object",
      options: { collapsible: true, collapsed: true },
      hidden: ({ document }) => !isOneOf(document, ["home", "services"]),
      fields: [
        defineField({
          name: "kicker",
          title: "Small Top Text",
          type: "string",
          initialValue: "Your Ultimate Satisfaction Assured",
        }),
        defineField({
          name: "heading",
          title: "Main Heading",
          type: "string",
          initialValue: "Ask About Our Hero Guarantees",
        }),
        defineField({
          name: "intro",
          title: "Intro Paragraph",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "highlightWord",
          title: "Heading Highlight Word (Optional)",
          type: "string",
          description: 'Example: "Australians"',
        }),
       
        defineField({
          name: "items",
          title: "Guarantee Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 3,
                }),
                defineField({
                  name: "points",
                  title: "Bullet Points",
                  type: "array",
                  of: [{ type: "string" }],
                }),
                defineField({
                  name: "icon",
                  title: "Icon Name (Lucide)",
                  type: "string",
                  description: "BadgeDollarSign, ShieldCheck, Home, etc.",
                }),
              ],
              preview: {
                select: { title: "title", subtitle: "icon" },
              },
            },
          ],
          validation: (Rule) => Rule.max(4),
        }),
        defineField({
          name: "primaryButtonText",
          title: "Primary Button Text",
          type: "string",
          initialValue: "Financing",
        }),
        defineField({
          name: "primaryButtonLink",
          title: "Primary Button Link",
          type: "string",
          initialValue: "/contact",
        }),
        defineField({
          name: "secondaryButtonText",
          title: "Secondary Button Text",
          type: "string",
          initialValue: "Frequently Asked Questions",
        }),
        defineField({
          name: "secondaryButtonLink",
          title: "Secondary Button Link",
          type: "string",
          initialValue: "/faq",
        }),
      ],
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