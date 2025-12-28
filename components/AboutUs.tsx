"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { urlFor } from "@/lib/sanity/image"
import {
  Shield,
  Clock,
  Award,
  Star,
  Users,
  CheckCircle,
  Zap,
  ArrowRight,
  Trophy,
} from "lucide-react"
import type { AboutUsSection } from "@/types/sanity"

interface AboutUsProps {
  data: AboutUsSection
  className?: string
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Clock,
  Award,
  Star,
  Users,
  CheckCircle,
  Zap,
  Trophy,
}

export default function AboutUs({ data, className }: AboutUsProps) {
  if (!data) return null

  const { heading, subheading, description, image, features, ctaText, ctaLink } = data
  const aboutImg = image?.asset ? image : null

  return (
    <section
      className={cn(
        "relative w-full py-16 sm:py-20 md:py-24 bg-background overflow-hidden",
        className
      )}
    >
      {/* Simple top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-border/50" />

      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-muted/20" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Image Side - LEFT */}
          <div className="lg:col-span-5 relative group order-2 lg:order-1">
            {/* Subtle decorative element */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-2xl -z-10 opacity-50" />
            
            <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden border border-border shadow-lg bg-muted">
              {aboutImg ? (
                <img
                  src={urlFor(aboutImg).width(800).height(1000).url()}
                  alt={aboutImg.alt || heading}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">About Image</p>
                </div>
              )}
            </div>
          </div>

          {/* Content Side - RIGHT */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            {/* Header */}
            <div className="space-y-4">
              {subheading && (
                <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/10 px-3.5 py-1.5 rounded-md text-sm font-medium text-primary">
                  {subheading}
                </div>
              )}

              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
                {heading}
              </h2>

              {description && (
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {description}
                </p>
              )}
            </div>

            {/* Features Grid - 2 Column Layout */}
            {features && features.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
                {features.map((feature, index) => {
                  const IconComponent =
                    feature.icon && iconMap[feature.icon] ? iconMap[feature.icon] : CheckCircle

                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 group"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <div className="flex-1 pt-1">
                        <h3 className="font-bold text-foreground text-base leading-snug mb-1">
                          {feature.title}
                        </h3>
                        {feature.description && (
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* CTA */}
            {ctaText && ctaLink && (
              <div className="pt-2">
                <Button asChild size="lg" className="h-12 px-8 text-base shadow-sm">
                  <Link href={ctaLink} className="flex items-center gap-2">
                    {ctaText} <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}