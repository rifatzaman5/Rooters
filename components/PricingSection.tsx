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
    <section className={cn("relative py-16 sm:py-20 md:py-32 bg-primary/5 overflow-hidden", className)}>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/70 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/70 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider justify-center">
            <span className="w-8 h-[2px] bg-primary/50"></span>
            {subheading || "Special Offers"}
            <span className="w-8 h-[2px] bg-primary/50"></span>
          </div>

          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] text-balance">
            {heading}
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Limited-time deals designed to help you save on essential repairs, upgrades, and maintenance.
          </p>

          <div className="flex justify-center pt-2">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 bg-background/70 px-4 py-1.5 text-sm font-semibold text-primary">
              <TicketPercent className="w-4 h-4" />
              Claim online & save instantly
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan._key}
              className="relative group rounded-3xl bg-background/85 border-2 border-border/75 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/25"
            >
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary/5 border-2 border-border/60" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary/5 border-2 border-border/60" />

              <div className="relative h-full w-full rounded-[1.35rem] border-[3px] border-dashed border-primary/35 p-6 py-8 flex flex-col text-center">
                <div className="mb-5">
                  {plan.currency && (
                    <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                      {plan.currency}
                    </div>
                  )}

                  <div className="text-5xl md:text-6xl font-extrabold text-primary tracking-tighter leading-[0.9]">
                    {plan.price}
                  </div>

                  {plan.frequency && (
                    <div className="text-sm font-bold text-primary/80 uppercase tracking-wider mt-2">
                      {plan.frequency}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground font-heading leading-tight">
                    {plan.title}
                  </h3>

                  {plan.description && (
                    <p className="text-sm text-muted-foreground font-medium mt-2">
                      {plan.description}
                    </p>
                  )}
                </div>

                <Button
                  asChild
                  size="lg"
                  className="w-full h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold tracking-wide shadow-md shadow-primary/10"
                >
                  <Link href={plan.ctaLink || "/contact"}>
                    {plan.ctaText || "CLAIM COUPON"}
                  </Link>
                </Button>

                {plan.features?.length ? (
                  <div className="mt-6 pt-4 border-t border-dashed border-border/70 text-left">
                    {plan.features.map((line, idx) => (
                      <p key={idx} className="text-[11px] text-muted-foreground leading-snug">
                        {line}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 pt-4 border-t border-dashed border-border/70 text-left">
                    <p className="text-[11px] text-muted-foreground leading-snug">
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