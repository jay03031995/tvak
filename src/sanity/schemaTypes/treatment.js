export default {
  name: 'treatment',
  title: 'Treatment',
  type: 'document',
  fields: [
    { name: 'name', title: 'Treatment Name', type: 'string', validation: R => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: R => R.required() },
    {
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['Skin & Glow', 'Acne & Scars', 'Pigmentation', 'Anti-Ageing', 'Hair Restoration', 'Laser & Devices'] }
    },
    { name: 'tagline', title: 'Short Tagline', type: 'string' },
    { name: 'description', title: 'Description', type: 'text', rows: 4 },
    { name: 'image', title: 'Main Image', type: 'image', options: { hotspot: true } },
    {
      name: 'meta', title: 'Key Details', type: 'object',
      fields: [
        { name: 'duration', title: 'Session Duration', type: 'string' },
        { name: 'sessions', title: 'Recommended Sessions', type: 'string' },
        { name: 'recovery', title: 'Recovery Time', type: 'string' },
        { name: 'results', title: 'Results Visible', type: 'string' },
      ]
    },
    {
      name: 'howItWorks', title: 'How It Works', type: 'array',
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
      name: 'benefits', title: 'Benefits', type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'beforeAfter', title: 'Before & After', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'before', title: 'Before Image', type: 'image', options: { hotspot: true } },
          { name: 'after', title: 'After Image', type: 'image', options: { hotspot: true } },
          { name: 'sessions', title: 'Sessions taken', type: 'string' },
          { name: 'label', title: 'Result Label', type: 'string' },
        ]
      }]
    },
    {
      name: 'faqs', title: 'FAQs', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', title: 'Question', type: 'string' },
          { name: 'answer', title: 'Answer', type: 'text' },
        ]
      }]
    },
    {
      name: 'relatedTreatments', title: 'Related Treatments',
      type: 'array', of: [{ type: 'reference', to: [{ type: 'treatment' }] }]
    },
    {
      name: 'relatedConcerns', title: 'Related Concerns',
      type: 'array', of: [{ type: 'reference', to: [{ type: 'concern' }] }]
    },
    { name: 'rating', title: 'Star Rating', type: 'number' },
    { name: 'reviewCount', title: 'Review Count', type: 'number' },
    { name: 'featured', title: 'Featured on Homepage', type: 'boolean' },
    { name: 'order', title: 'Sort Order', type: 'number' },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'image' }
  },
  orderings: [{ title: 'Sort Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }]
}
