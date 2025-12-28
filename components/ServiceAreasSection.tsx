"use client"

import { cn } from "@/lib/utils"
import { MapPin } from "lucide-react"
import type { ServiceArea } from "@/types/sanity"

interface ServiceAreasSectionProps {
  areas?: ServiceArea[]
  className?: string
  heading?: string
  description?: string
}

export default function ServiceAreasSection({
  areas,
  className,
  heading = "Areas We Serve",
  description = "Providing professional service to communities throughout the region.",
}: ServiceAreasSectionProps) {
  if (!areas?.length) return null

  return (
    <section className={cn("relative py-16 sm:py-20 md:py-24 bg-muted/20 overflow-hidden", className)}>
      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-border/50" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/10 px-3.5 py-1.5 rounded-md text-sm font-medium text-primary">
            <MapPin className="w-4 h-4" />
            Service Areas
          </div>

          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
            {heading}
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Areas Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {areas.map((area, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 p-4 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
            >
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground truncate">
                  {area.city}
                </div>
                {area.region && (
                  <div className="text-xs text-muted-foreground truncate">
                    {area.region}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}