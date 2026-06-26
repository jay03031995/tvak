export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    { name: 'clinicName', title: 'Clinic Name', type: 'string' },
    { name: 'tagline', title: 'Tagline', type: 'string' },
    { name: 'phone', title: 'Phone Number', type: 'string' },
    { name: 'whatsapp', title: 'WhatsApp Number', type: 'string' },
    {
      name: 'address', title: 'Address', type: 'object',
      fields: [
        { name: 'line1', title: 'Line 1', type: 'string' },
        { name: 'line2', title: 'Line 2', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'state', title: 'State', type: 'string' },
        { name: 'pincode', title: 'Pincode', type: 'string' },
        { name: 'mapsUrl', title: 'Google Maps URL', type: 'url' },
      ]
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
    {
      name: 'social', title: 'Social Links', type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'youtube', title: 'YouTube URL', type: 'url' },
      ]
    },
    {
      name: 'promoBanner', title: 'Promo Banner', type: 'object',
      fields: [
        { name: 'enabled', title: 'Show Banner', type: 'boolean' },
        { name: 'label', title: 'Bold Label', type: 'string' },
        { name: 'text', title: 'Banner Text', type: 'string' },
        { name: 'linkText', title: 'Link Text', type: 'string' },
        { name: 'linkUrl', title: 'Link URL', type: 'string' },
      ]
    },
  ],
  preview: { select: { title: 'clinicName' } }
}
