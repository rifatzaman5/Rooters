import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    
    // Hero Section
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
    }),

    // About Us Section
    defineField({
      name: 'aboutUs',
      title: 'About Us Section',
      type: 'aboutUs',
    }),

    // 👇 THIS IS WHAT WAS MISSING 👇
    defineField({
      name: 'pricing',
      title: 'Pricing Section',
      type: 'pricing',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
})