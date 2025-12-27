"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Phone, ArrowRight, Star, ShieldCheck } from "lucide-react"
import { urlFor } from "@/lib/sanity/image"
import type { HeroSection } from "@/types/sanity"

interface HeroProps {
  data: HeroSection
  className?: string
}

export default function Hero({ data, className }: HeroProps) {
  const { variant } = data

  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)

  const [touchStart, setTouchStart] = React.useState<number | null>(null)
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null)

  const slides = variant === "home" && data.slides?.length ? data.slides : [data]
  const validSlides = slides.filter((s) => s?.heading || s?.image)
  const totalSlides = validSlides.length

  // Nothing to render if no valid slide
  if (!validSlides.length) return null

  const next = React.useCallback(() => {
    if (totalSlides <= 1) return
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prev = React.useCallback(() => {
    if (totalSlides <= 1) return
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  React.useEffect(() => {
    if (totalSlides <= 1 || isPaused) return
    const interval = window.setInterval(() => next(), 6000)
    return () => window.clearInterval(interval)
  }, [totalSlides, isPaused, next])

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0]?.clientX ?? null)
    setIsPaused(true)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0]?.clientX ?? null)
  }

  const onTouchEnd = () => {
    setIsPaused(false)
    if (touchStart === null || touchEnd === null) return

    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance) next()
    if (distance < -minSwipeDistance) prev()
  }

  // --- HOME CAROUSEL ---
  if (variant === "home") {
    return (
      <section
        className={cn("relative w-full bg-background overflow-hidden", className)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: "pan-y" }}
        aria-roledescription="carousel"
      >
        {/* Simple Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-background" />
        </div>

        {/* Track */}
        <div
          className="flex transition-transform duration-700 ease-in-out will-change-transform cursor-grab active:cursor-grabbing"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {validSlides.map((slide: any, index: number) => {
            const isActive = index === currentSlide

            return (
              <div
                key={slide._key || index}
                className="w-full flex-shrink-0"
                style={{ width: "100%" }}
                aria-hidden={!isActive}
              >
                <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24 sm:pt-28 pb-16 lg:pt-32 lg:pb-20">
                  {/* better height control */}
                  <div className="min-h-[calc(78vh-4rem)] lg:min-h-[620px] flex items-center">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
                      
                      {/* TEXT FIRST on mobile */}
                      <div className="flex flex-col gap-6 text-center lg:text-left order-1 lg:order-1 select-none">
                        {slide.subheading && (
                          <div className="inline-flex w-fit mx-auto lg:mx-0 items-center border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary rounded-md">
                            {slide.subheading}
                          </div>
                        )}

                        <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-foreground">
                          {slide.heading}
                        </h1>

                        {slide.paragraph && (
                          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                            {slide.paragraph}
                          </p>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                          {slide.ctaText && slide.ctaLink && (
                            <Button asChild size="lg" className="h-12 px-8 text-base shadow-sm pointer-events-auto">
                              <Link href={slide.ctaLink} className="flex items-center gap-2">
                                {slide.ctaText} <ArrowRight className="w-4 h-4" />
                              </Link>
                            </Button>
                          )}
                          {slide.secondCtaText && slide.secondCtaLink && (
                            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base pointer-events-auto">
                              <Link href={slide.secondCtaLink} className="flex items-center gap-2">
                                <Phone className="w-4 h-4" /> {slide.secondCtaText}
                              </Link>
                            </Button>
                          )}
                        </div>

                        {/* Social proof row */}
                        <div className="flex items-center justify-center lg:justify-start gap-3 text-sm text-muted-foreground pt-1">
                          <div className="flex text-primary">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <span className="font-medium">{slide.socialProofText || "Trusted by local homeowners"}</span>
                        </div>
                      </div>

                      {/* IMAGE SECOND on mobile */}
                      <div className="relative w-full flex justify-center order-2 lg:order-2">
                        <div className="relative aspect-[4/3] lg:aspect-square w-full max-w-[520px] pointer-events-none">
                          <div className="relative w-full h-full rounded-lg overflow-hidden border border-border shadow-xl bg-muted">
                            {slide.image?.asset ? (
                              <img
                                src={urlFor(slide.image).width(1000).height(1000).url()}
                                alt={slide.image.alt || slide.heading}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                                No Image
                              </div>
                            )}
                          </div>

                          <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-background p-3.5 rounded-lg shadow-lg border border-border flex items-center gap-2.5">
                            <div className="bg-primary/10 p-2 rounded text-primary">
                              <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-foreground">Certified Pros</p>
                              <p className="text-xs text-muted-foreground">Guaranteed Work</p>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Indicators */}
        {totalSlides > 1 && (
          <div className="absolute bottom-8 left-0 w-full z-20 pointer-events-none">
            <div className="container mx-auto px-4 flex justify-center lg:justify-start pointer-events-auto">
              <div className="flex gap-2 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm border border-border/50">
                {validSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500 ease-in-out",
                      i === currentSlide ? "w-8 bg-primary" : "w-3 bg-primary/20 hover:bg-primary/40"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    )
  }

  // --- DEFAULT VARIANT (static) ---
  return (
    <section className={cn("relative w-full pt-28 sm:pt-32 pb-20 bg-background overflow-hidden", className)}>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          className={cn(
            "grid gap-12 items-center",
            data.image?.asset ? "lg:grid-cols-2 lg:gap-20" : "max-w-4xl mx-auto text-center"
          )}
        >
          <div className={cn("space-y-6", data.image?.asset ? "text-center lg:text-left" : "text-center")}>
            {data.subheading && (
              <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider justify-center lg:justify-start">
                <span className="w-8 h-[2px] bg-primary/50"></span>
                {data.subheading}
              </div>
            )}

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {data.heading}
            </h1>

            {data.paragraph && (
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {data.paragraph}
              </p>
            )}

            {data.ctaText && data.ctaLink && (
              <div className="pt-2 flex justify-center lg:justify-start">
                <Button asChild size="lg" className="h-12 px-8">
                  <Link href={data.ctaLink} className="flex items-center gap-2">
                    {data.ctaText} <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {data.image?.asset && (
            <div className="relative aspect-video lg:aspect-[5/4] rounded-lg overflow-hidden shadow-xl border border-border bg-muted">
              <img
                src={urlFor(data.image).width(1000).height(800).url()}
                alt={data.image.alt || data.heading}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}