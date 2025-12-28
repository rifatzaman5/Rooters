"use client"

import * as React from "react"
import Link from "next/link"
import {
  Wrench,
  Droplets,
  Thermometer,
  Wind,
  Zap,
  Hammer,
  ArrowRight,
  Flame,
  Droplet,
  Fan,
  AirVent,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { urlFor } from "@/lib/sanity/image"
import type { ServiceItem } from "@/types/sanity"

type LucideIcon = React.ComponentType<{ className?: string }>

const iconMap: Record<string, LucideIcon> = {
  Wrench,
  Droplets,
  Thermometer,
  Wind,
  Zap,
  Hammer,
  Flame,
  Droplet,
  Fan,
  AirVent,
}

interface ServicesProps {
  services: ServiceItem[]
  limit?: number
  showViewAll?: boolean
  variant?: "tiles" | "cards"
  className?: string
}

export default function ServicesSection({
  services,
  limit,
  showViewAll = false,
  variant = "cards",
  className,
}: ServicesProps) {
  if (!services?.length) return null

  const displayedServices =
    typeof limit === "number" ? services.slice(0, limit) : services

  // Different backgrounds for variants
  const sectionClass = variant === "tiles" ? "bg-background" : "bg-muted/30"

  return (
    <section className={cn("relative py-16 sm:py-20 md:py-24 overflow-hidden", sectionClass, className)}>
      {/* Simple top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-border/50" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 font-semibold text-sm uppercase tracking-wider justify-center text-primary">
            <span className="w-8 h-[2px] bg-primary/50" />
            Our Services
            <span className="w-8 h-[2px] bg-primary/50" />
          </div>

          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
            Explore What We Do Best
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            From emergency repairs to long-term upgrades, Rooters delivers dependable service with clear communication and clean workmanship.
          </p>
        </div>

        {/* VARIANT A: TILES (HOME) */}
        {variant === "tiles" && (
          <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {displayedServices.map((service) => {
              const Icon =
                service.icon && iconMap[service.icon] ? iconMap[service.icon] : Wrench

              return (
                <Link
                  key={service._id}
                  href={`/services/${service.slug.current}`}
                  className={cn(
                    "group rounded-lg p-6 sm:p-7",
                    "transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "hover:shadow-md hover:-translate-y-0.5",
                    "bg-primary text-primary-foreground shadow-sm"
                  )}
                >
                  <div className="flex flex-col items-center text-center gap-3.5">
                    <Icon className="h-10 w-10 sm:h-12 sm:w-12" />
                    <div className="text-sm sm:text-base font-bold uppercase tracking-wide leading-snug">
                      {service.title}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* VARIANT B: CARDS (SERVICES PAGE) */}
        {variant === "cards" && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedServices.map((service) => {
              const Icon =
                service.icon && iconMap[service.icon] ? iconMap[service.icon] : Wrench

              const hasImg = Boolean(service.mainImage)

              return (
                <Link
                  key={service._id}
                  href={`/services/${service.slug.current}`}
                  className={cn(
                    "group rounded-lg border border-border bg-background",
                    "p-5 transition-all duration-200",
                    "hover:border-primary/30 hover:shadow-md",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    {hasImg ? (
                      <img
                        src={urlFor(service.mainImage).width(140).height(140).url()}
                        alt={service.mainImage?.alt || service.title}
                        className="h-12 w-12 rounded-lg object-cover border border-border bg-muted shrink-0"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                        <Icon className="h-6 w-6" />
                      </div>
                    )}

                    <div className="min-w-0">
                      <h3 className="font-heading text-base sm:text-lg font-bold text-foreground leading-tight">
                        {service.title}
                      </h3>
                      {service.shortDescription && (
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {service.shortDescription}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* View All Button */}
        {showViewAll && services.length > (limit || 0) && (
          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="px-8 h-12 text-base shadow-sm"
            >
              <Link href="/services" className="flex items-center gap-2">
                View All Services <ArrowRight className="h-4 h-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}