import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'Default (Centered)', value: 'default' },
        ],
      },
      initialValue: 'home',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(100),
      description: 'Main headline for the hero section',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading (Badge)',
      type: 'string',
      description: 'The small pill/badge text above the heading',
    }),
    defineField({
      name: 'paragraph',
      title: 'Paragraph',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    
    // --- PRIMARY BUTTON ---
    defineField({
      name: 'ctaText',
      title: 'Primary Button Text',
      type: 'string', // ✅ Fixed: Added type
      initialValue: 'Get a Quote',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Primary Button Link',
      type: 'string', // ✅ Fixed: Added type
      description: 'URL (e.g., /contact) or Phone (tel:+123...)',
      initialValue: '/contact',
    }),

    // --- SECONDARY BUTTON (New) ---
    defineField({
      name: 'secondCtaText',
      title: 'Secondary Button Text',
      type: 'string', // ✅ Fixed: Added type
      description: 'Optional: Text for the outline button (e.g. "Contact Support")',
      initialValue: 'Contact Support'
    }),
    defineField({
      name: 'secondCtaLink',
      title: 'Secondary Button Link',
      type: 'string', // ✅ Fixed: Added type
      description: 'Optional: Link for the outline button',
      initialValue: '/contact'
    }),

    // --- SOCIAL PROOF (New) ---
    defineField({
      name: 'socialProofText',
      title: 'Social Proof Text',
      type: 'string', // ✅ Fixed: Added type
      description: 'Text shown next to stars (e.g. "Trusted by 500+ locals")',
      initialValue: 'Trusted by 500+ locals'
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'variant',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Hero Section',
        subtitle: subtitle ? `Variant: ${subtitle}` : 'No variant',
        media,
      }
    },
  },
})