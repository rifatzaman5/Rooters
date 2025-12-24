import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(50),
      description: 'Full name of the client (2-50 characters)',
    }),
    defineField({
      name: 'role',
      title: 'Role/Location',
      type: 'string',
      initialValue: 'Homeowner',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
    }),
    defineField({
      name: 'rating',
      title: 'Stars (1-5)',
      type: 'number',
      initialValue: 5,
    }),
  ],
})