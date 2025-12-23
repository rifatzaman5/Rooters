// Base TypeScript types for Sanity content
// These types will be extended as schemas are created

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface SanityReference {
  _type: 'reference'
  _ref: string
  _weak?: boolean
}

// Base document type
export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

// Hero Section Type
export interface HeroSection {
  _type: 'hero'
  variant: 'home' | 'default'
  heading: string
  subheading?: string
  paragraph?: string
  image?: SanityImage
  ctaText?: string
  ctaLink?: string
}

