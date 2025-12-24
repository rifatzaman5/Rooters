// Hero Section Query (Individual)
export const heroQuery = `
  *[_type == "hero" && variant == $variant][0] {
    _type,
    variant,
    heading,
    subheading,
    paragraph,
    image { asset, alt },
    ctaText,
    ctaLink,
    secondCtaText,
    secondCtaLink,
    socialProofText
  }
`

// About Us Section Query
export const aboutUsQuery = `
  *[_type == "aboutUs"][0] {
    _type,
    heading,
    subheading,
    description,
    image { asset, alt },
    features[] { title, description, icon },
    ctaText,
    ctaLink
  }
`

// Home Page Query (Full)
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
      image { asset, alt },
      ctaText,
      ctaLink,
      secondCtaText,
      secondCtaLink,
      socialProofText
    },
    aboutUs {
      _type,
      heading,
      subheading,
      description,
      image { asset, alt },
      features[] { title, description, icon },
      ctaText,
      ctaLink
    },
    pricing {
      heading,
      subheading,
      plans[] {
        _key,
        title,
        price,
        currency,
        frequency,
        description,
        isPopular,
        features,
        ctaText,
        ctaLink
      }
    }
  }
`

export const servicesQuery = `
  *[_type == "service"] {
    _id,
    title,
    slug,
    shortDescription,
    icon,
    mainImage
  }
`

export const testimonialsQuery = `
  *[_type == "testimonial"] {
    _id,
    author,
    role,
    quote,
    rating
  }
`

export const singleServiceQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    title,
    shortDescription,
    mainImage,
    content
  }
`

// Page By Slug Query (Full)
export const pageBySlugQuery = `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    hero {
      _type,
      variant,
      heading,
      subheading,
      paragraph,
      image { asset, alt },
      ctaText,
      ctaLink,
      secondCtaText,
      secondCtaLink,
      socialProofText
    },
    aboutUs {
      _type,
      heading,
      subheading,
      description,
      image { asset, alt },
      features[] { title, description, icon },
      ctaText,
      ctaLink
    },
    pricing {
      heading,
      subheading,
      plans[] {
        _key,
        title,
        price,
        currency,
        frequency,
        description,
        isPopular,
        features,
        ctaText,
        ctaLink
      }
    }
  }
` as const

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    brandName,
    brandDescription,
    contact {
      phoneDisplay,
      phoneHref,
      email,
      addressLine1,
      addressLine2,
      emergencyNote
    },
    hours[] { label, value },
    footerLinks[] { label, href },
    socials[] { platform, url },
    contactPage {
      infoHeading,
      infoText,
      formHeading,
      nameLabel,
      phoneLabel,
      emailLabel,
      messageLabel,
      namePlaceholder,
      phonePlaceholder,
      emailPlaceholder,
      messagePlaceholder,
      submitText,
      disclaimer
    },
    footerLegal
  }
` as const

export const postsQuery = `*[_type == "post"] | order(publishedAt desc) { _id, title, slug, publishedAt, excerpt, mainImage }`
export const singlePostQuery = `*[_type == "post" && slug.current == $slug][0] { title, publishedAt, mainImage, body }`
export const faqQuery = `*[_type == "faq"][0] { title, description, items[] { question, answer } }`
export const legalQuery = `*[_type == "legal" && slug.current == $slug][0] { title, lastUpdated, content }`