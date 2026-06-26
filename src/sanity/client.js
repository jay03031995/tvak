import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'l8z1brxo',
  dataset: 'production',
  apiVersion: '2024-06-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export function urlFor(source) {
  return builder.image(source)
}

// Fetch helpers
export async function fetchSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`)
}

export async function fetchHomePage() {
  return client.fetch(`*[_type == "homePage"][0]{
    ...,
    treatmentsSection{
      ...,
      featured[]->{name, slug, category, tagline, image, rating, reviewCount}
    },
    concernsSection{
      ...,
      featured[]->{name, slug, category, iconColor, iconBg}
    }
  }`)
}

export async function fetchTreatments() {
  return client.fetch(`*[_type == "treatment"] | order(order asc){
    name, slug, category, tagline, image, rating, reviewCount, featured
  }`)
}

export async function fetchTreatment(slug) {
  return client.fetch(`*[_type == "treatment" && slug.current == $slug][0]{
    ...,
    relatedTreatments[]->{name, slug, category, image},
    relatedConcerns[]->{name, slug, category}
  }`, { slug })
}

export async function fetchConcerns() {
  return client.fetch(`*[_type == "concern"] | order(order asc){
    name, slug, category, iconColor, iconBg
  }`)
}

export async function fetchConcern(slug) {
  return client.fetch(`*[_type == "concern" && slug.current == $slug][0]{
    ...,
    treatments[]->{name, slug, category, image, rating, reviewCount},
    relatedConcerns[]->{name, slug, category, iconColor, iconBg}
  }`, { slug })
}

export async function fetchDoctor() {
  return client.fetch(`*[_type == "doctor"][0]`)
}

export async function fetchAboutPage() {
  return client.fetch(`*[_type == "aboutPage"][0]{..., doctor->{...}}`)
}

export async function fetchContactPage() {
  return client.fetch(`*[_type == "contactPage"][0]`)
}
