import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero', title: 'Hero Section', type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'headingLine1', title: 'Heading Line 1', type: 'string' }),
        defineField({ name: 'headingItalic', title: 'Heading — Italic Part', type: 'string' }),
        defineField({ name: 'subtext', title: 'Sub Text', type: 'text', rows: 3 }),
      ]
    }),
    defineField({
      name: 'stats', title: 'Stats Bar', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'value', title: 'Value (e.g. 500+)', type: 'string' }),
          defineField({ name: 'label', title: 'Label', type: 'string' }),
        ],
        preview: { select: { title: 'value', subtitle: 'label' } }
      })]
    }),
    defineField({
      name: 'values', title: 'Our Values Section', type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
        defineField({
          name: 'items', title: 'Value Cards', type: 'array',
          of: [defineArrayMember({
            type: 'object',
            fields: [
              defineField({ name: 'title', title: 'Card Title', type: 'string' }),
              defineField({ name: 'description', title: 'Card Description', type: 'text', rows: 3 }),
            ],
            preview: { select: { title: 'title' } }
          })]
        }),
      ]
    }),
    defineField({
      name: 'doctor', title: 'Doctor (reference)',
      type: 'reference', to: [{ type: 'doctor' }]
    }),
    defineField({
      name: 'seo', title: 'SEO', type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Meta Title', type: 'string' }),
        defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 2 }),
      ]
    }),
  ],
  preview: { prepare: () => ({ title: 'About Page' }) },
})
