"use client"

import * as React from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { TestimonialItem } from "@/types/sanity"

interface TestimonialProps {
  testimonials: TestimonialItem[]
}

function clampRating(rating: number | undefined) {
  const r = typeof rating === "number" ? rating : 5
  if (r < 0) return 0
  if (r > 5) return 5
  return Math.floor(r)
}

export default function TestimonialsSection({ testimonials }: TestimonialProps) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null)
  const [page, setPage] = React.useState(0)
  const [pages, setPages] = React.useState(1)

  // Calculate pages based on screen size
  const computePages = React.useCallback(() => {
    const n = testimonials?.length ?? 0
    if (n === 0) {
      setPages(1)
      setPage(0)
      return
    }

    const w = window.innerWidth
    const perView = w < 768 ? 1 : w < 1024 ? 2 : 3
    const totalPages = Math.max(1, Math.ceil(n / perView))
    setPages(totalPages)
    setPage((p) => Math.min(p, totalPages - 1))
  }, [testimonials])

  React.useEffect(() => {
    computePages()
    window.addEventListener("resize", computePages)
    return () => window.removeEventListener("resize", computePages)
  }, [computePages])

  const scrollToPage = (nextPage: number) => {
    const el = scrollerRef.current
    if (!el) return
    const safePage = Math.max(0, Math.min(nextPage, pages - 1))
    
    // Scroll amount is based on container width
    const left = el.clientWidth * safePage
    el.scrollTo({ left, behavior: "smooth" })
    setPage(safePage)
  }

  const prev = () => scrollToPage(page - 1)
  const next = () => scrollToPage(page + 1)

  // Sync scroll position on manual drag
  React.useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = window.requestAnimationFrame(() => {
        const current = Math.round(el.scrollLeft / Math.max(1, el.clientWidth))
        setPage(Math.max(0, Math.min(current, pages - 1)))
      })
    }

    el.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener("scroll", onScroll)
    }
  }, [pages])

  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="relative py-20 md:py-32 bg-muted/30 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-top-left scale-110 -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
              <span className="w-8 h-[2px] bg-primary/50"></span>
              Testimonials
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] text-balance">
              Trusted by your <br className="hidden lg:block"/> Neighbors
            </h2>
          </div>

          {/* Navigation Buttons (Desktop) */}
          <div className="hidden md:flex gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              disabled={page === 0}
              className="h-12 w-12 rounded-full border-primary/20 hover:bg-primary hover:text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              disabled={page === pages - 1}
              className="h-12 w-12 rounded-full border-primary/20 hover:bg-primary hover:text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div
            ref={scrollerRef}
            className="
              flex gap-6
              overflow-x-auto
              scroll-smooth
              snap-x snap-mandatory
              pb-8
              px-1
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {testimonials.map((item) => {
              const rating = clampRating(item.rating)
              return (
                <div
                  key={item._id}
                  className="
                    snap-start
                    min-w-full
                    md:min-w-[calc(50%-12px)]
                    lg:min-w-[calc(33.333%-16px)]
                  "
                >
                  <div className="group h-full flex flex-col justify-between bg-background p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                    <div>
                      {/* Rating & Quote Icon */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-4 h-4",
                                i < rating ? "fill-primary text-primary" : "fill-muted text-muted/30"
                              )}
                            />
                          ))}
                        </div>
                        <Quote className="w-8 h-8 text-primary/10 fill-primary/10" />
                      </div>

                      <p className="text-lg text-foreground font-medium italic mb-6 leading-relaxed">
                        "{item.quote}"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-6 border-t border-border">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {(item.author || "A")[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{item.author}</h4>
                        <p className="text-sm text-muted-foreground">{item.role || "Homeowner"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Dots (Mobile) */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-4">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToPage(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === page ? "w-8 bg-primary" : "w-2 bg-primary/20"
                )}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}