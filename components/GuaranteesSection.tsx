"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  BadgeDollarSign,
  ShieldCheck,
  Home,
  SunMoon,
  ThumbsUp,
} from "lucide-react"

type LucideIcon = React.ComponentType<{ className?: string }>

const iconMap: Record<string, LucideIcon> = {
  BadgeDollarSign,
  ShieldCheck,
  Home,
  SunMoon,
  ThumbsUp,
}

export interface GuaranteeItem {
  _key: string
  title: string
  description?: string
  icon?: string
}

export interface GuaranteesSectionData {
  kicker?: string
  heading: string
  items: GuaranteeItem[]
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
}

interface Props {
  data?: GuaranteesSectionData
  className?: string
}

export default function GuaranteesSection({ data, className }: Props) {
  if (!data) return null
  if (!data.heading) return null
  if (!data.items || data.items.length === 0) return null

  const kicker = data.kicker || "Your Ultimate Satisfaction Assured"

  const primaryButtonText = data.primaryButtonText || "Financing"
  const primaryButtonLink = data.primaryButtonLink || "/contact"
  const secondaryButtonText = data.secondaryButtonText || "Frequently Asked Questions"
  const secondaryButtonLink = data.secondaryButtonLink || "/faq"

  return (
    <section className={cn("relative py-16 sm:py-20 md:py-32 bg-background overflow-hidden", className)}>
      {/* light solid background tint to match your system */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-primary/5" />

      {/* subtle dividers like your other sections */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/70 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/70 to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Header (same hierarchy style you use) */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider justify-center">
            <ThumbsUp className="w-4 h-4" />
            {kicker}
          </div>

          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] text-balance">
            {data.heading}
          </h2>
        </div>

        {/* 2x2 layout like your screenshot */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {data.items.slice(0, 4).map((item) => {
            const Icon = item.icon && iconMap[item.icon] ? iconMap[item.icon] : ShieldCheck

            return (
              <div
                key={item._key}
                className="flex gap-5 items-start rounded-2xl border-2 border-border/70 bg-background/70 p-6 sm:p-7"
              >
                {/* Icon circle */}
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Icon className="w-7 h-7" />
                  </div>
                </div>

                {/* Text */}
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-primary leading-tight">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Buttons row */}
        <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryButtonLink}
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold
                       hover:bg-primary/90 transition-colors w-full sm:w-auto"
          >
            {primaryButtonText}
          </Link>

          <Link
            href={secondaryButtonLink}
            className="inline-flex items-center justify-center h-12 px-8 rounded-full border-2 border-primary/25 bg-background text-foreground font-semibold
                       hover:bg-primary/5 transition-colors w-full sm:w-auto"
          >
            {secondaryButtonText}
          </Link>
        </div>
      </div>
    </section>
  )
}