import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { PricingSection } from '@/types/sanity'

interface PricingProps {
  data: PricingSection
  className?: string
}

export default function PricingSection({ data, className }: PricingProps) {
  if (!data || !data.plans) return null

  const { heading, subheading, plans } = data

  return (
    <section className={cn('relative py-20 md:py-32 bg-background', className)}>
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          {subheading && (
            <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
              <span className="w-8 h-[2px] bg-primary/50"></span>
              {subheading}
              <span className="w-8 h-[2px] bg-primary/50"></span>
            </div>
          )}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] text-balance">
            {heading}
          </h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan._key}
              className={cn(
                "relative flex flex-col p-8 rounded-2xl border transition-all duration-300",
                plan.isPopular 
                  ? "border-primary/50 bg-card shadow-2xl shadow-primary/10 lg:scale-105 z-10" 
                  : "border-border bg-background/50 hover:border-primary/20 hover:bg-card hover:shadow-lg"
              )}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-bold px-4 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.title}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-medium text-muted-foreground align-top mt-2">
                    {plan.currency || '$'}
                  </span>
                  <span className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                    {plan.price}
                  </span>
                  {plan.frequency && (
                    <span className="text-sm font-medium text-muted-foreground">
                      {plan.frequency}
                    </span>
                  )}
                </div>
                {plan.description && (
                  <p className="text-muted-foreground mt-4 leading-relaxed">
                    {plan.description}
                  </p>
                )}
              </div>

              {/* Features List */}
              <div className="flex-1 mb-8">
                <ul className="space-y-4">
                  {plan.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <Button 
                asChild 
                size="lg" 
                variant={plan.isPopular ? "default" : "outline"}
                className={cn(
                  "w-full h-12 font-semibold",
                  !plan.isPopular && "hover:bg-primary/5 hover:text-primary border-primary/20"
                )}
              >
                <Link href={plan.ctaLink || '/contact'}>
                  {plan.ctaText || 'Get Started'} 
                  {plan.isPopular && <ArrowRight className="w-4 h-4 ml-2" />}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}