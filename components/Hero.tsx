import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'
import { urlFor } from '@/lib/sanity/image'
import type { HeroSection } from '@/types/sanity'

interface HeroProps {
  data: HeroSection
  className?: string
}

export default function Hero({ data, className }: HeroProps) {
  const { variant, heading, subheading, paragraph, image, ctaText, ctaLink } = data
  const isHome = variant === 'home'

  if (isHome) {
    return (
      <section className={cn('relative w-full min-h-screen', className)}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="space-y-6">
              {/* Subheading */}
              {subheading && (
                <p className="text-accent font-semibold text-lg uppercase tracking-wide">
                  {subheading}
                </p>
              )}
              
              {/* Heading */}
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {heading}
              </h1>
              
              {/* Paragraph */}
              {paragraph && (
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                  {paragraph}
                </p>
              )}
              
              {/* CTA Button */}
              {ctaText && ctaLink && (
                <div className="pt-4">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href={ctaLink} className="flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      {ctaText}
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Right Side - Image */}
            <div className="relative h-[500px] lg:h-[600px] rounded-lg overflow-hidden translate-y-20">
              {image?.asset ? (
                <Image
                  src={urlFor(image).width(1200).height(800).url()}
                  alt={image.alt || heading}
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Image placeholder</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Default variant (centered)
  return (
    <section className={cn('relative w-full min-h-screen flex items-center justify-center', className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20" />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6">
          {heading}
        </h1>
        {paragraph && (
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {paragraph}
          </p>
        )}
        {ctaText && ctaLink && (
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
            <Link href={ctaLink}>{ctaText}</Link>
          </Button>
        )}
      </div>
    </section>
  )
}

