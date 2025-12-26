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

  return (
    <section className={cn("relative w-full py-24 md:py-32 bg-background overflow-hidden", className)}>
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div className="relative group order-2 lg:order-1">
            <div className="absolute top-6 -left-6 w-full h-full border-2 border-primary/10 rounded-[2rem] z-0 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2 hidden md:block" />

            <div className="relative aspect-[4/5] w-full max-w-[600px] mx-auto rounded-[2rem] overflow-hidden shadow-2xl bg-muted z-10">
              {image?.asset ? (
                <img
                  src={urlFor(image).width(800).height(1000).url()}
                  alt={image.alt || heading}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">About Image</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="absolute bottom-8 right-0 md:right-[-2rem] bg-background p-5 rounded-2xl shadow-xl border border-border z-20 flex items-center gap-4 max-w-[240px]">
              <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl leading-none text-foreground">15+ Years</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium mt-1">
                  Of Excellence
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8 order-1 lg:order-2 text-center lg:text-left">
            <div className="space-y-5">
              {subheading && (
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary w-fit mx-auto lg:mx-0">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-40" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  {subheading}
                </div>
              )}

              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight text-balance">
                {heading}
              </h2>

              {description && (
                <p className="text-lg text-muted-foreground leading-relaxed text-balance max-w-2xl mx-auto lg:mx-0">
                  {description}
                </p>
              )}
            </div>

            {features && features.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-5 pt-2 text-left">
                {features.map((feature, index) => {
                  const IconComponent =
                    feature.icon && iconMap[feature.icon] ? iconMap[feature.icon] : CheckCircle

                  return (
                    <div
                      key={index}
                      className="group flex gap-4 p-4 rounded-xl border border-border/70 bg-card/30 hover:bg-card hover:border-primary/20 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        <IconComponent className="w-6 h-6" />
                      </div>

                      <div>
                        <h3 className="font-bold text-foreground text-lg mb-1">{feature.title}</h3>
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

            {ctaText && ctaLink && (
              <div className="pt-4 flex justify-center lg:justify-start">
                <Button asChild size="lg" className="h-14 px-8 text-base shadow-lg rounded-full">
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