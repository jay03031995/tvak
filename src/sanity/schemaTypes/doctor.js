export default {
  name: 'doctor',
  title: 'Doctor',
  type: 'document',
  fields: [
    { name: 'name', title: 'Full Name', type: 'string', validation: R => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
    { name: 'credentials', title: 'Credentials (e.g. MBBS)', type: 'string' },
    { name: 'title', title: 'Title (e.g. Aesthetic Physician)', type: 'string' },
    { name: 'experience', title: 'Years of Experience', type: 'number' },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
    {
      name: 'bio', title: 'Full Biography', type: 'array',
      of: [{ type: 'block' }]
    },
    { name: 'shortBio', title: 'Short Bio (homepage)', type: 'text', rows: 3 },
    {
      name: 'specialties', title: 'Specialties', type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'education', title: 'Education & Training', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'degree', title: 'Degree / Certification', type: 'string' },
          { name: 'institution', title: 'Institution', type: 'string' },
          { name: 'year', title: 'Year', type: 'string' },
        ]
      }]
    },
    {
      name: 'stats', title: 'Stats', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', title: 'Value (e.g. 5+)', type: 'string' },
          { name: 'label', title: 'Label (e.g. Years Experience)', type: 'string' },
        ]
      }]
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'photo' }
  }
}
