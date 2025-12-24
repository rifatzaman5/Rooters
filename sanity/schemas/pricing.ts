import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pricing',
  title: 'Pricing Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Simple, Transparent Pricing'
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      initialValue: 'Choose the plan that fits your needs'
    }),
    defineField({
      name: 'plans',
      title: 'Pricing Plans',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Plan Name',
              type: 'string', // e.g., "Basic", "Pro"
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string', // e.g., "99", "Free"
            }),
            defineField({
              name: 'currency',
              title: 'Currency Symbol',
              type: 'string',
              initialValue: '$'
            }),
            defineField({
              name: 'frequency',
              title: 'Frequency',
              type: 'string', // e.g., "/mo", "/year", "one-time"
            }),
            defineField({
              name: 'description',
              title: 'Short Description',
              type: 'string',
            }),
            defineField({
              name: 'isPopular',
              title: 'Mark as Popular',
              type: 'boolean',
              initialValue: false
            }),
            defineField({
              name: 'features',
              title: 'Features List',
              type: 'array',
              of: [{ type: 'string' }]
            }),
            defineField({
              name: 'ctaText',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Get Started'
            }),
            defineField({
              name: 'ctaLink',
              title: 'Button Link',
              type: 'string',
              initialValue: '/contact'
            })
          ]
        }
      ]
    })
  ]
})