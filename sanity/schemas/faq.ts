import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', initialValue: 'Frequently Asked Questions' }),
    defineField({ name: 'description', title: 'Intro Description', type: 'text', rows: 3 }),
    defineField({ name: 'items', title: 'Questions', type: 'array', of: [{ type: 'object', fields: [{ name: 'question', title: 'Question', type: 'string' }, { name: 'answer', title: 'Answer', type: 'text', rows: 4 }] }] })
  ]
})