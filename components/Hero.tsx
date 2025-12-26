"use client"

import * as React from "react"
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Phone, ArrowRight, Star, ShieldCheck } from 'lucide-react'
import { urlFor } from '@/lib/sanity/image'
import type { HeroSection } from '@/types/sanity'

interface HeroProps {
  data: HeroSection
  className?: string
}

export default function Hero({ data, className }: HeroProps) {
  const { variant } = data
  
  // --- STATE ---
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)
  
  // Touch State
  const [touchStart, setTouchStart] = React.useState<number | null>(null)
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null)

  // --- DATA PREP ---
  const slides = variant === 'home' && data.slides?.length ? data.slides : [data]
  const validSlides = slides.filter(s => s.heading || s.image)
  const totalSlides = validSlides.length

  // --- NAVIGATION FUNCTIONS ---
  const next = React.useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prev = React.useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  // --- AUTO-PLAY LOGIC ---
  React.useEffect(() => {
    if (totalSlides <= 1 || isPaused) return
    
    const interval = setInterval(() => {
      next()
    }, 6000) // 6 seconds

    return () => clearInterval(interval)
  }, [totalSlides, isPaused, next])

  // --- TOUCH HANDLERS (Swipe Logic) ---
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null) // Reset
    setTouchStart(e.targetTouches[0].clientX)
    setIsPaused(true) // Pause auto-play while touching
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    setIsPaused(false) // Resume auto-play
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      next()
    }
    if (isRightSwipe) {
      prev()
    }
  }

  // --- 1. HOME CAROUSEL VARIANT ---
  if (variant === 'home') {
    return (
      <section 
        className={cn('relative w-full bg-background overflow-hidden', className)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        // Touch Listeners added to the main container
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        
        {/* --- STATIC BACKGROUND --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        {/* --- CAROUSEL TRACK --- */}
        <div 
            className="flex transition-transform duration-700 ease-in-out will-change-transform cursor-grab active:cursor-grabbing"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {validSlides.map((slide: any, index: number) => (
            <div 
              key={slide._key || index} 
              className="w-full flex-shrink-0" 
              style={{ width: '100%' }}
            >
              {/* SLIDE CONTENT */}
              <div className="container mx-auto px-4 md:px-6 relative z-10 pt-28 pb-20 lg:pt-36 lg:pb-24 min-h-[calc(100vh-5rem)] flex items-center">
                
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
                  
                  {/* LEFT: Text */}
                  <div className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1 select-none">
                    
                    {/* Badge */}
                    {slide.subheading && (
                      <div className="inline-flex w-fit mx-auto lg:mx-0 items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">
                        {slide.subheading}
                      </div>
                    )}

                    {/* Heading */}
                    <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-foreground text-balance">
                      {slide.heading}
                    </h1>

                    {/* Paragraph */}
                    {slide.paragraph && (
                      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 text-balance">
                        {slide.paragraph}
                      </p>
                    )}

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                      {slide.ctaText && slide.ctaLink && (
                        <Button asChild size="lg" className="h-12 px-8 text-base shadow-md rounded-full pointer-events-auto">
                          <Link href={slide.ctaLink} className="flex items-center gap-2">
                            {slide.ctaText} <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      )}
                      {slide.secondCtaText && slide.secondCtaLink && (
                        <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base rounded-full bg-background/50 pointer-events-auto">
                          <Link href={slide.secondCtaLink} className="flex items-center gap-2">
                            <Phone className="w-4 h-4" /> {slide.secondCtaText}
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* RIGHT: Image */}
                  <div className="relative w-full flex justify-center order-1 lg:order-2">
                     <div className="relative aspect-[4/3] lg:aspect-square w-full max-w-[550px] pointer-events-none">
                        
                        <div className="relative w-full h-full rounded-3xl overflow-hidden border border-border/50 shadow-2xl bg-muted">
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

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-background p-4 rounded-xl shadow-xl border border-border flex items-center gap-3">
                           <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full text-green-600 dark:text-green-400">
                             <ShieldCheck className="w-6 h-6" />
                           </div>
                           <div>
                             <p className="font-bold text-sm">Certified Pros</p>
                             <p className="text-xs text-muted-foreground">Guaranteed Work</p>
                           </div>
                         </div>
                     </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- INDICATORS (Lines) --- */}
        <div className="absolute bottom-8 left-0 w-full z-20 pointer-events-none">
          <div className="container mx-auto px-4 flex justify-center lg:justify-start pointer-events-auto">
             <div className="flex gap-2">
                {validSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500 ease-in-out",
                      i === currentSlide 
                        ? "w-8 bg-primary" 
                        : "w-3 bg-primary/20 hover:bg-primary/40"
                    )}
                  />
                ))}
             </div>
          </div>
        </div>

      </section>
    )
  }

  // --- 2. DEFAULT VARIANT (Static) ---
  return (
    <section className={cn('relative w-full pt-32 pb-20 bg-background overflow-hidden', className)}>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className={cn(
          'grid gap-12 items-center', 
          data.image?.asset ? 'lg:grid-cols-2 lg:gap-20' : 'max-w-4xl mx-auto text-center'
        )}>
          
          <div className="space-y-6">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] text-balance">
              {data.heading}
            </h1>
            {data.paragraph && (
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
                {data.paragraph}
              </p>
            )}
            {data.ctaText && data.ctaLink && (
              <div className="pt-4">
                <Button asChild size="lg" className="h-12 px-8 rounded-full">
                  <Link href={data.ctaLink} className="flex items-center gap-2">
                    {data.ctaText} <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {data.image?.asset && (
            <div className="relative aspect-video lg:aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl border border-border bg-muted">
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