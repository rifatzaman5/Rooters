import { defineField, defineType } from 'sanity'

// Define the content of a single slide to reuse
const slideFields = [
  defineField({
    name: 'heading',
    title: 'Heading',
    type: 'string',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'subheading',
    title: 'Subheading (Badge)',
    type: 'string',
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
    options: { hotspot: true },
    fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
  }),
  // Buttons
  defineField({
    name: 'ctaText',
    title: 'Primary Button Text',
    type: 'string',
    initialValue: 'Get a Quote',
  }),
  defineField({
    name: 'ctaLink',
    title: 'Primary Button Link',
    type: 'string',
    initialValue: '/contact',
  }),
  defineField({
    name: 'secondCtaText',
    title: 'Secondary Button Text',
    type: 'string',
    initialValue: 'Contact Support'
  }),
  defineField({
    name: 'secondCtaLink',
    title: 'Secondary Button Link',
    type: 'string',
    initialValue: '/contact'
  }),
  defineField({
    name: 'socialProofText',
    title: 'Social Proof Text',
    type: 'string',
    initialValue: 'Trusted by 500+ locals'
  }),
]

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
          { title: 'Home (Carousel)', value: 'home' },
          { title: 'Inner Page (Static)', value: 'default' },
        ],
      },
      initialValue: 'home',
      validation: (Rule) => Rule.required(),
    }),

    // --- CAROUSEL SLIDES (Only for Home) ---
    defineField({
      name: 'slides',
      title: 'Carousel Slides',
      type: 'array',
      hidden: ({ parent }) => parent?.variant !== 'home',
      of: [
        {
          type: 'object',
          title: 'Slide',
          fields: slideFields // Uses the fields defined above
        }
      ]
    }),

    // --- STATIC FIELDS (Only for Default/Inner Pages) ---
    // We reuse the defineFields but wrap them to hide on 'home'
    ...slideFields.map(field => ({
      ...field,
      hidden: ({ parent }: any) => parent?.variant === 'home'
    })),
  ],
  preview: {
    select: {
      variant: 'variant',
      // Grab first slide heading if home, or static heading if default
      homeHeading: 'slides.0.heading',
      staticHeading: 'heading',
      media: 'slides.0.image'
    },
    prepare({ variant, homeHeading, staticHeading, media }) {
      const isHome = variant === 'home'
      return {
        title: isHome ? `Home Carousel` : (staticHeading || 'Hero Section'),
        subtitle: isHome ? `${homeHeading} ...` : 'Static Hero',
        media,
      }
    },
  },
})