"use client"

import * as React from "react"
import Link from "next/link"
import { Wrench, Droplets, Thermometer, Wind, Zap, Hammer, ArrowRight } from "lucide-react"
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
}

interface ServicesProps {
  services: ServiceItem[]
  limit?: number
  showViewAll?: boolean
  variant?: "tiles" | "cards"
}

export default function ServicesSection({
  services,
  limit,
  showViewAll = false,
  variant = "cards",
}: ServicesProps) {
  if (!services?.length) return null

  const displayedServices = typeof limit === "number" ? services.slice(0, limit) : services
  const activeIndex = 0

  return (
    <section className="relative py-16 sm:py-20 md:py-32 bg-primary/5 overflow-hidden">
      {/* Minimal dividers */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/70 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/70 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header (keep your hierarchy) */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider justify-center">
            <span className="w-8 h-[2px] bg-primary/50"></span>
            Our Expertise
            <span className="w-8 h-[2px] bg-primary/50"></span>
          </div>

          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] text-balance">
            Complete Home <br className="hidden sm:block" /> Infrastructure Solutions
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            From emergency repairs to energy-efficient upgrades, we provide professional services backed by our satisfaction guarantee.
          </p>
        </div>

        {/* ==============================
            TILES (HOME)
           ============================== */}
        {variant === "tiles" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto">
            {displayedServices.map((service, idx) => {
              const Icon = service.icon && iconMap[service.icon] ? iconMap[service.icon] : Wrench
              const isActive = idx === activeIndex

              return (
                <Link
                  key={service._id}
                  href={`/services/${service.slug.current}`}
                  className={cn(
                    "group rounded-2xl border-2 transition-all duration-300",
                    "h-[124px] sm:h-[140px] lg:h-[150px]",
                    "flex flex-col items-center justify-center text-center px-4",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    isActive
                      ? "bg-primary text-primary-foreground border-primary/40 shadow-lg shadow-primary/10"
                      : "bg-background/80 border-border/80 hover:bg-primary hover:text-primary-foreground hover:border-primary/35 hover:shadow-lg hover:-translate-y-0.5"
                  )}
                >
                  <div
                    className={cn(
                      "mb-3 flex items-center justify-center h-12 w-12 rounded-xl transition-colors duration-300",
                      isActive
                        ? "bg-primary-foreground/15 text-primary-foreground"
                        : "bg-primary/10 text-primary group-hover:bg-primary-foreground/15 group-hover:text-primary-foreground"
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <div
                    className={cn(
                      "text-sm font-bold uppercase tracking-wide leading-tight",
                      isActive ? "text-primary-foreground" : "text-foreground group-hover:text-primary-foreground"
                    )}
                  >
                    {service.title}
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* ==============================
            CARDS (SERVICES PAGE)
           ============================== */}
        {variant === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-12">
            {displayedServices.map((service, idx) => {
              const Icon = service.icon && iconMap[service.icon] ? iconMap[service.icon] : Wrench
              const isActive = idx === activeIndex

              return (
                <Link
                  key={service._id}
                  href={`/services/${service.slug.current}`}
                  className={cn(
                    "group relative flex flex-col rounded-2xl border-2 overflow-hidden transition-all duration-300",
                    "bg-background/85 shadow-sm",
                    "hover:shadow-xl hover:-translate-y-1 hover:border-primary/35",
                    isActive ? "border-primary/35 ring-2 ring-primary/20" : "border-border/75"
                  )}
                >
                  {/* Image area */}
                  <div className="relative w-full h-52 bg-muted">
                    {service.mainImage ? (
                      <img
                        src={urlFor(service.mainImage).width(900).height(520).url()}
                        alt={service.mainImage?.alt || service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon className="w-16 h-16 text-muted-foreground/40" />
                      </div>
                    )}

                    {/* Floating icon badge */}
                    <div className="absolute -bottom-6 left-6 h-12 w-12 rounded-2xl bg-background border-2 border-border/70 shadow-lg flex items-center justify-center">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-10 pb-7 px-7 flex flex-col flex-1">
                    <h3 className="text-xl font-bold font-heading text-foreground mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                      {service.shortDescription}
                    </p>

                    <div className="mt-auto inline-flex items-center text-sm font-semibold text-primary/90 group-hover:text-primary transition-colors">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* View All Button */}
        {showViewAll && services.length > (limit || 0) && (
          <div className="mt-14 text-center">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 h-12 text-base shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Link href="/services" className="flex items-center gap-2">
                View All Services <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}