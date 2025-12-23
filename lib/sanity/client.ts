import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/lib/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or using tag-based revalidation
})

// Preview client for draft content
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'published',
})

export const getClient = (preview?: boolean) => {
  if (preview) {
    return previewClient
  }
  return client
}

