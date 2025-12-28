"use client"

import { cn } from "@/lib/utils"
import { Phone, Calendar, Wrench, CheckCircle, ClipboardCheck, Star } from "lucide-react"
import type { ProcessSectionData } from "@/types/sanity"

type LucideIcon = React.ComponentType<{ className?: string }>

const iconMap: Record<string, LucideIcon> = {
  Phone,
  Calendar,
  Wrench,
  CheckCircle,
  ClipboardCheck,
  Star,
}

interface ProcessSectionProps {
  data?: ProcessSectionData
  className?: string
}

export default function ProcessSection({ data, className }: ProcessSectionProps) {
  if (!data?.steps?.length) return null

  return (
    <section className={cn("relative py-16 sm:py-20 md:py-24 bg-background overflow-hidden", className)}>
      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-border/50" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14 space-y-4">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
            {data.heading}
          </h2>
          {data.description && (
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {data.description}
            </p>
          )}
        </div>

        {/* Steps Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.steps.map((step, index) => {
            const Icon = step.icon && iconMap[step.icon] ? iconMap[step.icon] : CheckCircle

            return (
              <div
                key={step._key}
                className="relative flex flex-col items-center text-center p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
              >
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                {step.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}