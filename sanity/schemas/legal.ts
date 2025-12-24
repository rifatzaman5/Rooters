import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'legal',
  title: 'Legal Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'lastUpdated', title: 'Last Updated', type: 'date' }),
    defineField({ name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] })
  ]
})