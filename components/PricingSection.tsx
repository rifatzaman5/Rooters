"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { TicketPercent } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PricingSection } from "@/types/sanity"

interface PricingProps {
  data: PricingSection
  className?: string
}

export default function PricingSection({ data, className }: PricingProps) {
  if (!data || !data.plans) return null

  const { heading, subheading, plans } = data

  return (
    <section className={cn("relative py-16 sm:py-20 md:py-32 bg-primary/5", className)}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
            <span className="w-8 h-[2px] bg-primary/50"></span>
            {subheading || "Special Offers"}
            <span className="w-8 h-[2px] bg-primary/50"></span>
          </div>

          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1]">
            {heading}
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Limited-time deals designed to help you save on essential repairs, upgrades, and maintenance.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan._key}
              className="relative group bg-background border-2 border-border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Ticket notches */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background border-2 border-border" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background border-2 border-border" />

              <div className="p-6 py-8 flex flex-col text-center">
                {/* Price */}
                <div className="mb-6">
                  {plan.currency && (
                    <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                      {plan.currency}
                    </div>
                  )}

                  <div className="text-6xl md:text-7xl font-extrabold text-primary font-heading tracking-tighter leading-none">
                    {plan.price}
                  </div>

                  {plan.frequency && (
                    <div className="text-sm font-bold text-primary uppercase tracking-wider mt-2">
                      {plan.frequency}
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="w-full h-px border-t-2 border-dashed border-border mb-6" />

                {/* Title & Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground font-heading mb-2">
                    {plan.title}
                  </h3>

                  {plan.description && (
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  size="lg"
                  className="w-full h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold tracking-wide"
                >
                  <Link href={plan.ctaLink || "/contact"}>
                    {plan.ctaText || "CLAIM COUPON"}
                  </Link>
                </Button>

                {/* Features */}
                {plan.features?.length ? (
                  <div className="mt-6 pt-4 border-t border-dashed border-border text-left space-y-1">
                    {plan.features.map((line, idx) => (
                      <p key={idx} className="text-xs text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 pt-4 border-t border-dashed border-border text-left">
                    <p className="text-xs text-muted-foreground">
                      Limited time offer. Terms may apply.
                    </p>
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