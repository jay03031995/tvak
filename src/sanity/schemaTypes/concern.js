import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'concern',
  title: 'Concern',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Concern Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required() }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['Skin & Face', 'Hair & Scalp', 'Anti-Ageing'] }
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'iconBg', title: 'Icon Background Color (hex, e.g. #FFF0EE)', type: 'string' }),
    defineField({
      name: 'tags', title: 'Sub-types / Tags', type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({
      name: 'approach', title: 'Our Approach — Steps', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'step', title: 'Step Number', type: 'number' }),
          defineField({ name: 'title', title: 'Step Title', type: 'string' }),
          defineField({ name: 'description', title: 'Step Description', type: 'text' }),
        ],
        preview: { select: { title: 'title', subtitle: 'step' } }
      })]
    }),
    defineField({
      name: 'treatments', title: 'Recommended Treatments',
      type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'treatment' }] })]
    }),
    defineField({
      name: 'relatedConcerns', title: 'Related Concerns',
      type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'concern' }] })]
    }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
  ],
  preview: { select: { title: 'name', subtitle: 'category' } },
})
