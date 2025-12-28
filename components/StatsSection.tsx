"use client"

import { cn } from "@/lib/utils"
import { Users, Star, Award, Shield, TrendingUp, CheckCircle } from "lucide-react"
import type { StatsSectionData } from "@/types/sanity"

type LucideIcon = React.ComponentType<{ className?: string }>

const iconMap: Record<string, LucideIcon> = {
  Users,
  Star,
  Award,
  Shield,
  TrendingUp,
  CheckCircle,
}

interface StatsSectionProps {
  data?: StatsSectionData
  className?: string
}

export default function StatsSection({ data, className }: StatsSectionProps) {
  if (!data?.stats?.length) return null

  return (
    <section className={cn("relative py-12 md:py-14 bg-primary text-primary-foreground overflow-hidden", className)}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header - more compact */}
        {(data.heading || data.description) && (
          <div className="max-w-3xl mx-auto text-center mb-8">
            {data.heading && (
              <h2 className="font-heading text-xl md:text-2xl font-bold text-primary-foreground mb-2">
                {data.heading}
              </h2>
            )}
            {data.description && (
              <p className="text-sm text-primary-foreground/85">
                {data.description}
              </p>
            )}
          </div>
        )}

        {/* Stats Grid - Horizontal with dividers */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {data.stats.map((stat, index) => {
              const Icon = stat.icon && iconMap[stat.icon] ? iconMap[stat.icon] : Star
              const isNotLast = index < data.stats.length - 1
              const isFirstRow = index < 2

              return (
                <div
                  key={stat._key}
                  className={cn(
                    "flex flex-col items-center justify-center text-center py-6 px-3",
                    isNotLast && "md:border-r border-primary-foreground/15",
                    isFirstRow && "border-b md:border-b-0 border-primary-foreground/15"
                  )}
                >
                  {/* Icon - small and subtle */}
                  <div className="mb-2">
                    <Icon className="w-7 h-7 text-primary-foreground/50" />
                  </div>

                  {/* Value - large and bold */}
                  <div className="text-3xl md:text-4xl font-bold text-primary-foreground leading-none mb-1">
                    {stat.value}
                  </div>

                  {/* Label - small caps */}
                  <div className="text-xs font-medium text-primary-foreground/75 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}