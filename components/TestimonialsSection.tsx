"use client"

import * as React from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { urlFor } from "@/lib/sanity/image"
import type { TestimonialSectionData } from "@/types/sanity"

interface TestimonialsSectionProps {
  data?: TestimonialSectionData
}

export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
  // --- STATE ---
  const [desktopPage, setDesktopPage] = React.useState(0)
  const [mobileIndex, setMobileIndex] = React.useState(0)

  const [pauseDesktop, setPauseDesktop] = React.useState(false)
  const [pauseMobile, setPauseMobile] = React.useState(false)

  // --- DATA PREP ---
  const testimonials = data?.testimonials || []
  if (!testimonials.length) return null

  const heading = data?.heading || "The (Almost) 5-Star Experience"
  const description = data?.description || "Trusted by thousands of neighbors."

  // --- DESKTOP LOGIC ---
  const desktopItemsPerPage = 4
  const desktopTotalPages = Math.max(1, Math.ceil(testimonials.length / desktopItemsPerPage))

  const nextDesktop = React.useCallback(() => {
    setDesktopPage((p) => (p + 1) % desktopTotalPages)
  }, [desktopTotalPages])

  const prevDesktop = React.useCallback(() => {
    setDesktopPage((p) => (p - 1 + desktopTotalPages) % desktopTotalPages)
  }, [desktopTotalPages])

  const currentDesktopItems = testimonials.slice(
    desktopPage * desktopItemsPerPage,
    (desktopPage + 1) * desktopItemsPerPage
  )

  // --- AUTO SLIDE (DESKTOP) ---
  React.useEffect(() => {
    if (desktopTotalPages <= 1) return
    if (pauseDesktop) return

    const t = window.setInterval(() => {
      nextDesktop()
    }, 6500)

    return () => window.clearInterval(t)
  }, [desktopTotalPages, pauseDesktop, nextDesktop])

  // --- AUTO SLIDE (MOBILE) ---
  React.useEffect(() => {
    if (testimonials.length <= 1) return
    if (pauseMobile) return

    const t = window.setInterval(() => {
      setMobileIndex((i) => (i + 1) % testimonials.length)
    }, 5500)

    return () => window.clearInterval(t)
  }, [testimonials.length, pauseMobile])

  // --- MOBILE SWIPE (Swiper-like) ---
  const touchStartX = React.useRef<number | null>(null)
  const touchCurrentX = React.useRef<number | null>(null)
  const minSwipe = 50

  const mobilePrev = React.useCallback(() => {
    setMobileIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  const mobileNext = React.useCallback(() => {
    setMobileIndex((i) => (i + 1) % testimonials.length)
  }, [testimonials.length])

  const onTouchStart = (e: React.TouchEvent) => {
    setPauseMobile(true)
    touchStartX.current = e.touches[0]?.clientX ?? null
    touchCurrentX.current = null
  }

  const onTouchMove = (e: React.TouchEvent) => {
    touchCurrentX.current = e.touches[0]?.clientX ?? null
  }

  const onTouchEnd = () => {
    const start = touchStartX.current
    const end = touchCurrentX.current
    setPauseMobile(false)

    touchStartX.current = null
    touchCurrentX.current = null

    if (start == null || end == null) return
    const delta = start - end

    if (delta > minSwipe) mobileNext()
    if (delta < -minSwipe) mobilePrev()
  }

  return (
    <section className="relative py-16 sm:py-20 md:py-32 bg-background overflow-hidden">
      {/* --- Background Decor --- */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-28 -right-28 h-[420px] w-[420px] sm:h-[520px] sm:w-[520px] md:h-[640px] md:w-[640px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-28 -left-28 h-[420px] w-[420px] sm:h-[520px] sm:w-[520px] md:h-[640px] md:w-[640px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-background to-background" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* --- Header --- */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider justify-center">
            <span className="w-8 h-[2px] bg-primary/50"></span>
            Testimonials
            <span className="w-8 h-[2px] bg-primary/50"></span>
          </div>

          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] text-balance">
            {heading}
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            {description}
          </p>

          <div className="flex justify-center gap-2 pt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 sm:w-8 sm:h-8 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>

        {/* =========================================
            DESKTOP VIEW
           ========================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column: Image */}
          <div className="lg:col-span-5 relative flex flex-col justify-center items-center h-full">
            <div className="relative w-full flex flex-col items-center z-10">
              {data?.mainImage ? (
                <img
                  src={urlFor(data.mainImage).width(600).url()}
                  alt={data.mainImage.alt || "Happy Client"}
                  className="w-full max-w-[400px] object-contain drop-shadow-2xl"
                  style={{ maxHeight: "550px" }}
                />
              ) : (
                <div className="w-full h-[400px] bg-muted/20 rounded-2xl flex items-center justify-center text-muted-foreground border-2 border-dashed border-muted">
                  Upload "Main Image"
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Cards + Buttons (Buttons top-right) */}
          <div
            className="lg:col-span-7 flex flex-col gap-6"
            onMouseEnter={() => setPauseDesktop(true)}
            onMouseLeave={() => setPauseDesktop(false)}
          >
            {/* Buttons top-right */}
            {desktopTotalPages > 1 && (
              <div className="flex items-center justify-end gap-3">
                <Button
                  onClick={prevDesktop}
                  size="icon"
                  className="h-11 w-11 rounded-full border border-primary/20 bg-background text-primary hover:bg-primary hover:text-white transition-all"
                  aria-label="Previous testimonials"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  onClick={nextDesktop}
                  size="icon"
                  className="h-11 w-11 rounded-full border border-primary/20 bg-background text-primary hover:bg-primary hover:text-white transition-all"
                  aria-label="Next testimonials"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            )}

            {/* 2x2 Grid */}
            <div className="grid grid-cols-2 gap-6">
              {currentDesktopItems.map((item) => (
                <div
                  key={item._key}
                  className="group relative h-full bg-card border border-border/50 p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1"
                >
                  <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/5 group-hover:text-primary/10 transition-colors" />

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < (item.rating || 5) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted/20"
                        )}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-foreground/80 text-base leading-relaxed mb-6 italic relative z-10">
                    "{item.quote}"
                  </p>

                  {/* Author */}
                  <div className="mt-auto border-t border-border/30 pt-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {item.author?.charAt(0) || "A"}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm">{item.author}</h4>
                      {item.role && <p className="text-xs font-semibold text-primary/80">{item.role}</p>}
                    </div>
                  </div>
                </div>
              ))}

              {/* Keep grid shape */}
              {currentDesktopItems.length < 4 &&
                Array.from({ length: 4 - currentDesktopItems.length }).map((_, i) => (
                  <div key={`empty-${i}`} className="block" />
                ))}
            </div>
          </div>
        </div>

        {/* =========================================
            MOBILE VIEW (Single Card + Dots + Swipe)
           ========================================= */}
        <div
          className="lg:hidden flex flex-col items-center"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="w-full max-w-lg bg-card border border-border/50 p-8 rounded-3xl relative min-h-[300px] flex flex-col shadow-sm">
            <div className="mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl rounded-bl-none flex items-center justify-center mb-4">
                <Quote className="w-5 h-5 text-primary fill-primary" />
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < (testimonials[mobileIndex].rating || 5)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted/20"
                    )}
                  />
                ))}
              </div>

              <p className="text-foreground/80 text-lg leading-relaxed italic">
                "{testimonials[mobileIndex].quote}"
              </p>
            </div>

            <div className="mt-auto border-t border-border/40 pt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {testimonials[mobileIndex].author?.charAt(0) || "A"}
              </div>
              <div>
                <h4 className="font-bold text-foreground text-lg">{testimonials[mobileIndex].author}</h4>
                {testimonials[mobileIndex].role && (
                  <p className="text-sm font-semibold text-primary/80">{testimonials[mobileIndex].role}</p>
                )}
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setMobileIndex(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  index === mobileIndex ? "w-8 bg-primary" : "w-2.5 bg-primary/20 hover:bg-primary/40"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}