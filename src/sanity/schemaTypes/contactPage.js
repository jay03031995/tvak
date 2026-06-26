export default {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    {
      name: 'hero', title: 'Hero Section', type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subtext', title: 'Subtext', type: 'text' },
      ]
    },
    {
      name: 'form', title: 'Contact Form', type: 'object',
      fields: [
        { name: 'heading', title: 'Form Heading', type: 'string' },
        { name: 'subtext', title: 'Form Subtext', type: 'string' },
        { name: 'submitLabel', title: 'Submit Button Label', type: 'string' },
        {
          name: 'fields', title: 'Form Fields', type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'label', title: 'Label', type: 'string' },
              { name: 'placeholder', title: 'Placeholder', type: 'string' },
              { name: 'type', title: 'Field Type', type: 'string', options: { list: ['text', 'email', 'tel', 'textarea', 'select'] } },
              { name: 'required', title: 'Required', type: 'boolean' },
            ]
          }]
        },
      ]
    },
    {
      name: 'info', title: 'Contact Info Cards', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label (e.g. Phone)', type: 'string' },
          { name: 'value', title: 'Value', type: 'string' },
          { name: 'link', title: 'Link (optional)', type: 'string' },
        ]
      }]
    },
    {
      name: 'hours', title: 'Clinic Hours', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'days', title: 'Days', type: 'string' },
          { name: 'time', title: 'Time', type: 'string' },
        ]
      }]
    },
    { name: 'mapEmbedUrl', title: 'Google Maps Embed URL', type: 'url' },
    {
      name: 'seo', title: 'SEO', type: 'object',
      fields: [
        { name: 'title', title: 'Meta Title', type: 'string' },
        { name: 'description', title: 'Meta Description', type: 'text', rows: 2 },
      ]
    },
  ],
  preview: { prepare: () => ({ title: 'Contact Page' }) }
}
