import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero', title: 'Hero Section', type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subtext', title: 'Sub Text', type: 'text', rows: 2 }),
      ]
    }),
    defineField({
      name: 'hours', title: 'Clinic Hours', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'days', title: 'Days (e.g. Mon – Sat)', type: 'string' }),
          defineField({ name: 'time', title: 'Hours (e.g. 10:00 AM – 7:00 PM)', type: 'string' }),
        ],
        preview: { select: { title: 'days', subtitle: 'time' } }
      })]
    }),
    defineField({ name: 'mapEmbedUrl', title: 'Google Maps Embed URL', type: 'url' }),
    defineField({
      name: 'seo', title: 'SEO', type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Meta Title', type: 'string' }),
        defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 2 }),
      ]
    }),
  ],
  preview: { prepare: () => ({ title: 'Contact Page' }) },
})
