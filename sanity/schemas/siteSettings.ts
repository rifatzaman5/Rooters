import { defineField, defineType } from "sanity"

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "Rooters",
    }),
    defineField({
      name: "brandDescription",
      title: "Brand Description",
      type: "text",
      rows: 3,
      initialValue:
        "Your trusted partner for eco-friendly plumbing and HVAC solutions.",
    }),

    defineField({
      name: "contact",
      title: "Contact Details",
      type: "object",
      fields: [
        defineField({
          name: "phoneDisplay",
          title: "Phone (Display)",
          type: "string",
          initialValue: "+1 (555) 123-4567",
        }),
        defineField({
          name: "phoneHref",
          title: "Phone Link (tel:)",
          type: "string",
          initialValue: "tel:+15551234567",
        }),
        defineField({
          name: "email",
          title: "Email",
          type: "string",
          initialValue: "hello@rooters.com",
        }),
        defineField({
          name: "addressLine1",
          title: "Address Line 1",
          type: "string",
          initialValue: "123 Green Lane",
        }),
        defineField({
          name: "addressLine2",
          title: "Address Line 2",
          type: "string",
          initialValue: "Cityville, ST 12345",
        }),
        defineField({
          name: "emergencyNote",
          title: "Emergency Note",
          type: "string",
          initialValue: "Available 24/7 for emergencies",
        }),
      ],
    }),

    defineField({
      name: "hours",
      title: "Business Hours",
      type: "array",
      of: [
        {
          type: "object",
          name: "hoursItem",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
      initialValue: [
        { label: "Mon - Fri", value: "8am - 6pm" },
        { label: "Sat - Sun", value: "9am - 3pm" },
      ],
    }),

    // ✅ NEW: Service Areas
    defineField({
      name: "serviceAreas",
      title: "Service Areas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "city",
              title: "City",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "region",
              title: "Region/State",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "city", subtitle: "region" },
          },
        },
      ],
    }),

    defineField({
      name: "footerLinks",
      title: "Footer Quick Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "footerLink",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Href", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
      initialValue: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Contact", href: "/contact" },
      ],
    }),

    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "social",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                ],
              },
            }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        },
      ],
    }),

    defineField({
      name: "contactPage",
      title: "Contact Page Content",
      type: "object",
      fields: [
        defineField({
          name: "infoHeading",
          title: "Left Side Heading",
          type: "string",
          initialValue: "Get in Touch",
        }),
        defineField({
          name: "infoText",
          title: "Left Side Text",
          type: "text",
          rows: 3,
          initialValue: "Fill out the form or call us directly.",
        }),
        defineField({ name: "formHeading", title: "Form Heading", type: "string", initialValue: "Send us a message" }),
        defineField({ name: "nameLabel", title: "Name Label", type: "string", initialValue: "Name" }),
        defineField({ name: "phoneLabel", title: "Phone Label", type: "string", initialValue: "Phone" }),
        defineField({ name: "emailLabel", title: "Email Label", type: "string", initialValue: "Email" }),
        defineField({ name: "messageLabel", title: "Message Label", type: "string", initialValue: "Message" }),
        defineField({ name: "namePlaceholder", title: "Name Placeholder", type: "string", initialValue: "John Doe" }),
        defineField({ name: "phonePlaceholder", title: "Phone Placeholder", type: "string", initialValue: "(555) 000-0000" }),
        defineField({ name: "emailPlaceholder", title: "Email Placeholder", type: "string", initialValue: "john@example.com" }),
        defineField({ name: "messagePlaceholder", title: "Message Placeholder", type: "string", initialValue: "How can we help?" }),
        defineField({ name: "submitText", title: "Submit Button Text", type: "string", initialValue: "Send Message" }),
        defineField({
          name: "disclaimer",
          title: "Form Disclaimer",
          type: "string",
          initialValue: "We'll get back to you soon.",
        }),
      ],
    }),

    defineField({
      name: "footerLegal",
      title: "Footer Legal Text",
      type: "string",
      initialValue: "© 2025 Rooters. All rights reserved.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" }
    },
  },
})