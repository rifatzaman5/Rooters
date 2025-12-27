"use client"

import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BadgeDollarSign,
  ShieldCheck,
  Home,
  SunMoon,
  ThumbsUp,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import type { GuaranteesSectionData } from "@/types/sanity"

type LucideIcon = React.ComponentType<{ className?: string }>

const iconMap: Record<string, LucideIcon> = {
  BadgeDollarSign,
  ShieldCheck,
  Home,
  SunMoon,
  ThumbsUp,
}

function renderHighlightedHeading(heading: string, highlightWord?: string) {
  const text = (heading || "").trim()
  if (!text) return null

  // Highlight first match of highlightWord if provided
  if (highlightWord) {
    const idx = text.toLowerCase().indexOf(highlightWord.toLowerCase())
    if (idx >= 0) {
      const before = text.slice(0, idx)
      const match = text.slice(idx, idx + highlightWord.length)
      const after = text.slice(idx + highlightWord.length)
      return (
        <>
          {before}
          <span className="text-primary">{match}</span>
          {after}
        </>
      )
    }
  }

  // Fallback: highlight last word
  const parts = text.split(" ").filter(Boolean)
  if (parts.length <= 1) return text
  const last = parts.pop()!
  return (
    <>
      {parts.join(" ")} <span className="text-primary">{last}</span>
    </>
  )
}

function renderStatsHeading(text: string) {
  const phrase = "speaks for itself"
  const lower = text.toLowerCase()
  const idx = lower.indexOf(phrase)

  if (idx < 0) return text

  const before = text.slice(0, idx)
  const match = text.slice(idx, idx + phrase.length)
  const after = text.slice(idx + phrase.length)

  return (
    <>
      {before}
      <span className="text-primary">{match}</span>
      {after}
    </>
  )
}

interface Props {
  data?: GuaranteesSectionData
  className?: string
}

export default function GuaranteesSection({ data, className }: Props) {
  if (!data?.heading) return null
  if (!data.items?.length) return null

  const kicker = data.kicker || "Your Ultimate Satisfaction Assured"
  const intro =
    data.intro ||
    "We prioritize clarity and honesty. Our communication avoids jargon and fine print so you feel confident at every step."
  const statsHeading = data.statsHeading || "Our track record speaks for itself"

  const primaryButtonText = data.primaryButtonText || "Get Quote Now"
  const primaryButtonLink = data.primaryButtonLink || "/contact"
  const secondaryButtonText = data.secondaryButtonText || "Frequently Asked Questions"
  const secondaryButtonLink = data.secondaryButtonLink || "/faq"

  return (
    <section
      className={cn(
        "relative py-16 sm:py-20 md:py-24 bg-muted/20 overflow-hidden",
        className
      )}
    >
      {/* Simple top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-border/50" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/10 px-3.5 py-1.5 rounded-md text-sm font-medium text-primary">
            <ThumbsUp className="w-4 h-4" />
            {kicker}
          </div>

          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
            {renderHighlightedHeading(data.heading, data.highlightWord)}
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {intro}
          </p>
        </div>

        {/* Stats strip (optional) */}
        {data.stats?.length ? (
          <div className="max-w-5xl mx-auto mb-10 sm:mb-12">
            <div className="rounded-lg border border-border bg-background p-6 sm:p-8 shadow-sm">
              <div className="text-center font-bold text-foreground mb-6 text-lg">
                {renderStatsHeading(statsHeading)}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {data.stats.slice(0, 3).map((s) => (
                  <div
                    key={s._key}
                    className="rounded-lg border border-border bg-background/50 p-5 text-center"
                  >
                    <div className="text-3xl sm:text-4xl font-bold text-primary">
                      {s.value}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* 2x2 cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {data.items.slice(0, 4).map((item) => {
            const Icon = item.icon && iconMap[item.icon] ? iconMap[item.icon] : ShieldCheck

            return (
              <div
                key={item._key}
                className="rounded-lg border border-border bg-background p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-primary leading-tight">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    {item.points?.length ? (
                      <ul className="mt-3 space-y-2">
                        {item.points.slice(0, 4).map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Buttons row */}
        <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="h-12 px-8 text-base shadow-sm w-full sm:w-auto">
            <Link href={primaryButtonLink} className="flex items-center gap-2">
              {primaryButtonText} <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base w-full sm:w-auto">
            <Link href={secondaryButtonLink}>
              {secondaryButtonText}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}