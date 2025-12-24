import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'publishedAt', title: 'Published at', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'mainImage', title: 'Main image', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alternative Text' }] }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, description: 'Short summary', validation: (Rule) => Rule.required().max(200) }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
  ],
})