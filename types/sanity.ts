// Base TypeScript types for Sanity content

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

export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

// Hero Section Type
// Add this new interface for a single slide
export interface HeroSlide {
  _key: string
  heading: string
  subheading?: string
  paragraph?: string
  image?: SanityImage
  ctaText?: string
  ctaLink?: string
  secondCtaText?: string
  secondCtaLink?: string
  socialProofText?: string
}

// Update the HeroSection interface
export interface HeroSection {
  _type: 'hero'
  variant: 'home' | 'default'
  
  // These are the "flat" fields (used for default variant or single slide)
  heading: string
  subheading?: string
  paragraph?: string
  image?: SanityImage
  ctaText?: string
  ctaLink?: string
  secondCtaText?: string
  secondCtaLink?: string
  socialProofText?: string

  // 👇 ADD THIS NEW FIELD
  slides?: HeroSlide[] 
}

export interface AboutUsFeature {
  title: string
  description?: string
  icon?: string
}

export interface AboutUsSection {
  _type: 'aboutUs'
  heading: string
  subheading?: string
  description: string
  image?: SanityImage
  features?: AboutUsFeature[]
  ctaText?: string
  ctaLink?: string
}

export interface ServiceItem {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  icon: string
  mainImage: any
}

// 👇 UPDATED: TestimonialItem uses _key now
export interface TestimonialItem {
  _key: string
  author: string
  role: string
  quote: string
  rating: number
}

// 👇 NEW: Section Data Interface
export interface TestimonialSectionData {
  heading: string
  description: string
  mainImage: any // Sanity Image
  testimonials: TestimonialItem[]
}

// Pricing Types
export interface PricingPlan {
  _key: string
  title: string
  price: string
  currency?: string
  frequency?: string
  description?: string
  isPopular?: boolean
  features?: string[]
  ctaText?: string
  ctaLink?: string
}

export interface PricingSection {
  _type: 'pricing'
  heading: string
  subheading?: string
  plans: PricingPlan[]
}



export interface SiteLink {
  label: string
  href: string
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'linkedin'
  url: string
}

export interface HoursItem {
  label: string
  value: string
}

export interface SiteSettings {
  brandName: string
  brandDescription?: string
  contact?: {
    phoneDisplay?: string
    phoneHref?: string
    email?: string
    addressLine1?: string
    addressLine2?: string
    emergencyNote?: string
  }
  hours?: HoursItem[]
  footerLinks?: SiteLink[]
  socials?: SocialLink[]
  contactPage?: {
    infoHeading?: string
    infoText?: string
    formHeading?: string
    nameLabel?: string
    phoneLabel?: string
    emailLabel?: string
    messageLabel?: string
    namePlaceholder?: string
    phonePlaceholder?: string
    emailPlaceholder?: string
    messagePlaceholder?: string
    submitText?: string
    disclaimer?: string
  }
  footerLegal?: string
}

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  mainImage: any
  excerpt: string
  body: any
}

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqPage {
  title: string
  description?: string
  items: FaqItem[]
}

export interface LegalPage {
  title: string
  lastUpdated?: string
  content: any
}