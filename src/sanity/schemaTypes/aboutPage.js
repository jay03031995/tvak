export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'hero', title: 'Hero Section', type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'headingLine1', title: 'Heading Line 1', type: 'string' },
        { name: 'headingItalic', title: 'Italic Part', type: 'string' },
        { name: 'subtext', title: 'Subtext', type: 'text' },
      ]
    },
    {
      name: 'stats', title: 'Stats', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', title: 'Value', type: 'string' },
          { name: 'label', title: 'Label', type: 'string' },
        ]
      }]
    },
    {
      name: 'story', title: 'Our Story', type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
      ]
    },
    {
      name: 'values', title: 'Our Values', type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        {
          name: 'items', title: 'Value Cards', type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', title: 'Title', type: 'string' },
              { name: 'description', title: 'Description', type: 'text' },
            ]
          }]
        },
      ]
    },
    {
      name: 'doctor', title: 'Doctor Section',
      type: 'reference', to: [{ type: 'doctor' }]
    },
    {
      name: 'location', title: 'Location Section', type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'mapEmbedUrl', title: 'Google Maps Embed URL', type: 'url' },
      ]
    },
    {
      name: 'seo', title: 'SEO', type: 'object',
      fields: [
        { name: 'title', title: 'Meta Title', type: 'string' },
        { name: 'description', title: 'Meta Description', type: 'text', rows: 2 },
      ]
    },
  ],
  preview: { prepare: () => ({ title: 'About Page' }) }
}
