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

  // Keep the same schema (city + optional region). Allow city to contain comma/newline separated lists.
  const grouped = (() => {
    const order: string[] = []
    const map = new Map<string, string[]>()

    for (const area of areas) {
      const regionKey = area.region?.trim() || "Service Areas"
      if (!map.has(regionKey)) {
        map.set(regionKey, [])
        order.push(regionKey)
      }

      const parts = area.city
        .split(/[,;\n]+/g)
        .map((s) => s.trim())
        .filter(Boolean)

      map.get(regionKey)!.push(...parts)
    }

    return order.map((region) => ({ region, cities: map.get(region)! }))
  })()

  return (
    <section className={cn("relative py-16 sm:py-20 md:py-24 bg-muted/20 overflow-hidden", className)}>
      <div className="absolute top-0 inset-x-0 h-px bg-border/50" />

      <div className="container mx-auto px-4 md:px-6">
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

        {/* Two columns for the region blocks */}
        <div className="max-w-6xl mx-auto grid gap-10 md:gap-12 md:grid-cols-2">
          {grouped.map((group) => (
            <div key={group.region} className="rounded-xl border border-border bg-background/70 backdrop-blur-sm p-6 sm:p-7">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
                <div className="min-w-0 w-full">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                    {group.region}:
                  </h3>

                  {/* Cities list inside each region (also 2 columns on sm+) */}
                  <ul className="mt-5 columns-1 sm:columns-2 gap-8 space-y-2">
                    {group.cities.map((city, idx) => (
                      <li
                        key={`${group.region}-${city}-${idx}`}
                        className="break-inside-avoid flex items-start gap-2 text-sm sm:text-base text-foreground/90"
                      >
                        <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                        <span className="leading-relaxed">{city}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}