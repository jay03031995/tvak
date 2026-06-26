import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'doctor',
  title: 'Doctor',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'credentials', title: 'Credentials (e.g. MBBS)', type: 'string' }),
    defineField({ name: 'title', title: 'Title (e.g. Aesthetic Physician)', type: 'string' }),
    defineField({ name: 'experience', title: 'Years of Experience', type: 'number' }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'shortBio', title: 'Short Bio (used on homepage / about page)', type: 'text', rows: 4 }),
    defineField({
      name: 'bio', title: 'Full Biography (rich text)', type: 'array',
      of: [defineArrayMember({ type: 'block' })]
    }),
    defineField({
      name: 'specialties', title: 'Specialties (one per item)', type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({
      name: 'education', title: 'Education & Training', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'degree', title: 'Degree / Certification', type: 'string' }),
          defineField({ name: 'institution', title: 'Institution / College', type: 'string' }),
          defineField({ name: 'year', title: 'Year (optional)', type: 'string' }),
        ],
        preview: { select: { title: 'degree', subtitle: 'institution' } }
      })]
    }),
    defineField({
      name: 'stats', title: 'Stats Row', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'value', title: 'Value (e.g. 5+)', type: 'string' }),
          defineField({ name: 'label', title: 'Label (e.g. Years Experience)', type: 'string' }),
        ],
        preview: { select: { title: 'value', subtitle: 'label' } }
      })]
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'title', media: 'photo' } },
})
