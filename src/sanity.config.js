'use client'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'tvak-asthi',
  title: 'Tvak & Asthi — CMS',
  projectId: 'l8z1brxo',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Site Settings').child(
              S.document().schemaType('siteSettings').documentId('siteSettings')
            ),
            S.listItem().title('Home Page').child(
              S.document().schemaType('homePage').documentId('homePage')
            ),
            S.listItem().title('About Page').child(
              S.document().schemaType('aboutPage').documentId('aboutPage')
            ),
            S.listItem().title('Contact Page').child(
              S.document().schemaType('contactPage').documentId('contactPage')
            ),
            S.divider(),
            S.documentTypeListItem('treatment').title('Treatments'),
            S.documentTypeListItem('concern').title('Concerns'),
            S.documentTypeListItem('doctor').title('Doctors'),
          ])
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
