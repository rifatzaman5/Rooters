import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pricing',
  title: 'Discount / Offers Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Offers To Elevate Your Home Comfort'
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading (Small Tag)',
      type: 'string',
      initialValue: 'Elevating Comfort, Maximizing Savings'
    }),
    defineField({
      name: 'plans',
      title: 'Coupons / Offers',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Coupon',
          fields: [
            // Using existing field names but changing titles for clarity
            defineField({
              name: 'currency',
              title: 'Top Text (Orange)',
              type: 'string',
              description: 'e.g. "Before 2PM" or "$"',
            }),
            defineField({
              name: 'price',
              title: 'Middle Text (Big Orange)',
              type: 'string', 
              description: 'The main number or text. e.g. "2PM", "50", "120"',
            }),
            defineField({
              name: 'frequency',
              title: 'Right Side Text (Orange)',
              type: 'string', 
              description: 'e.g. "OFF", "/month" (Optional)',
            }),
            defineField({
              name: 'title',
              title: 'Offer Title (Purple)',
              type: 'string', 
              description: 'e.g. "Same-Day Repair" or "HVAC Repair"',
            }),
            defineField({
              name: 'description',
              title: 'Sub Text',
              type: 'string',
              description: 'e.g. "(over $250)"',
            }),
            defineField({
              name: 'features',
              title: 'Fine Print / Disclaimer',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Small text at the bottom. e.g. "Limit one per household..."'
            }),
            defineField({
              name: 'ctaText',
              title: 'Button Text',
              type: 'string',
              initialValue: 'CLAIM COUPON'
            }),
            defineField({
              name: 'ctaLink',
              title: 'Button Link',
              type: 'string',
              initialValue: '/contact'
            }),
            defineField({
              name: 'isPopular',
              title: 'Highlight this Coupon?',
              type: 'boolean',
              initialValue: false
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'price',
            }
          }
        }
      ]
    })
  ]
})