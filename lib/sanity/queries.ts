// --- SECTION QUERIES (Helpers) ---

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
    socialProofText,
    slides[] {
      _key,
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
  }
`

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

// --- PAGE QUERIES ---

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
      socialProofText,
      slides[] {
        _key,
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

    testimonialSection {
      heading,
      description,
      mainImage { asset, alt },
      testimonials[] {
        _key,
        author,
        role,
        quote,
        rating
      }
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
    },

    guaranteesSection {
      kicker,
      heading,
      items[] {
        _key,
        title,
        description,
        icon
      },
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink
    }
  }
`

// ✅ UPDATED: pageBySlugQuery now also fetches testimonialSection + guaranteesSection
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

    testimonialSection {
      heading,
      description,
      mainImage { asset, alt },
      testimonials[] {
        _key,
        author,
        role,
        quote,
        rating
      }
    },

    guaranteesSection {
      kicker,
      heading,
      items[] {
        _key,
        title,
        description,
        icon
      },
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink
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
    },

    faq {
      title,
      description,
      items[] { question, answer }
    },

    content {
      heading,
      lastUpdated,
      body
    }
  }
` as const

export const faqPageQuery = `
  *[_type == "page" && slug.current == "faq"][0] {
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

    faq {
      title,
      description,
      items[] {
        question,
        answer
      }
    }
  }
`

export const legalPageQuery = `
  *[_type == "page" && slug.current == $slug][0] {
    title,
    content {
      heading,
      lastUpdated,
      body
    }
  }
`

export const blogPageDataQuery = `
  {
    "page": *[_type == "page" && slug.current == "blog"][0] {
      title,
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
      }
    },
    "posts": *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage
    }
  }
`

export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) { 
    _id, 
    title, 
    slug, 
    publishedAt, 
    excerpt, 
    mainImage 
  }
`

export const singlePostQuery = `
  *[_type == "post" && slug.current == $slug][0] { 
    title, 
    publishedAt, 
    mainImage, 
    body 
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

export const singleServiceQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    title,
    shortDescription,
    mainImage,
    intro,
    highlights,
    benefits[] {
      title,
      description
    },
    serviceFaq[] {
      question,
      answer
    },
    content
  }
`

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