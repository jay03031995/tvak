export default {
  name: 'concern',
  title: 'Concern',
  type: 'document',
  fields: [
    { name: 'name', title: 'Concern Name', type: 'string', validation: R => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: R => R.required() },
    {
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['Skin & Face', 'Hair & Scalp', 'Anti-Ageing'] }
    },
    { name: 'description', title: 'Description', type: 'text', rows: 4 },
    { name: 'icon', title: 'Icon (SVG path data)', type: 'string' },
    { name: 'iconColor', title: 'Icon Color (hex)', type: 'string' },
    { name: 'iconBg', title: 'Icon Background Color (hex)', type: 'string' },
    {
      name: 'tags', title: 'Sub-types / Tags', type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'approach', title: 'Our Approach', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'step', title: 'Step Number', type: 'number' },
          { name: 'title', title: 'Step Title', type: 'string' },
          { name: 'description', title: 'Step Description', type: 'text' },
        ]
      }]
    },
    {
      name: 'treatments', title: 'Recommended Treatments',
      type: 'array', of: [{ type: 'reference', to: [{ type: 'treatment' }] }]
    },
    {
      name: 'relatedConcerns', title: 'Related Concerns',
      type: 'array', of: [{ type: 'reference', to: [{ type: 'concern' }] }]
    },
    { name: 'order', title: 'Sort Order', type: 'number' },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category' }
  }
}
