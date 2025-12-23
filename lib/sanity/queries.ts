import type { HeroSection } from '@/types/sanity'

// Hero Section Query
export const heroQuery = `
  *[_type == "hero" && variant == $variant][0] {
    _type,
    variant,
    heading,
    subheading,
    paragraph,
    image {
      asset,
      alt
    },
    ctaText,
    ctaLink
  }
` as const

// Home Page Query (fetches page with hero)
export const homePageQuery = `
  *[_type == "page" && slug.current == "home"][0] {
    _id,
    title,
    slug,
    hero {
      _type,
      variant,
      heading,
      subheading,
      paragraph,
      image {
        asset,
        alt
      },
      ctaText,
      ctaLink
    }
  }
` as const

