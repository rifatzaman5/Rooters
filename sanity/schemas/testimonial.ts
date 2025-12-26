import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial Entry',
  type: 'object', // 👈 This makes it embeddable and hides it from sidebar
  fields: [
    defineField({
      name: 'author',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: 'role',
      title: 'Role / Location',
      type: 'string',
      initialValue: 'Homeowner',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'rating',
      title: 'Stars (1-5)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5)
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'role',
    },
  },
})