import Image from 'next/image'
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
  const { 
    variant, 
    heading, 
    subheading, 
    paragraph, 
    image, 
    ctaText, 
    ctaLink,
    secondCtaText,
    secondCtaLink,
    socialProofText
  } = data
  
  const isHome = variant === 'home'

  // --- HOME VARIANT ---
  if (isHome) {
    return (
      <section className={cn('relative w-full overflow-hidden bg-background', className)}>
        
        {/* Background Effect */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          {/* Top Gradient Fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
          {/* Glowing Orbs */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
        </div>

        {/* Main Content Container */}
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          
          <div className="flex flex-col justify-center min-h-[calc(100vh-4rem)] pt-32 pb-16 lg:pt-40 lg:pb-24">
            
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* --- LEFT: Text Content --- */}
              <div className="flex flex-col gap-6 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                
                {/* Pill Badge */}
                {subheading && (
                  <div className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary shadow-sm">
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    {subheading}
                  </div>
                )}

                {/* Main Heading */}
                <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-foreground text-balance">
                  {heading}
                </h1>

                {/* Paragraph */}
                {paragraph && (
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl text-balance">
                    {paragraph}
                  </p>
                )}

                {/* Buttons & Social Proof */}
                <div className="space-y-6 pt-2">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Button 1 (Primary) */}
                    {ctaText && ctaLink && (
                      <Button
                        asChild
                        size="lg"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5"
                      >
                        <Link href={ctaLink} className="flex items-center justify-center gap-2">
                          {ctaText} <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    )}
                    
                    {/* Button 2 (Secondary) - Now Dynamic */}
                    {secondCtaText && secondCtaLink && (
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="h-14 px-8 text-base border-input hover:bg-accent hover:text-accent-foreground"
                      >
                        <Link href={secondCtaLink} className="flex items-center gap-2">
                           <Phone className="w-4 h-4" /> {secondCtaText}
                        </Link>
                      </Button>
                    )}
                  </div>

                  {/* Social Proof - Now Dynamic */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                          <div className="w-full h-full bg-zinc-200" /> 
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col leading-none gap-1">
                      <div className="flex text-primary">
                        {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                      </div>
                      <span className="font-medium">{socialProofText || "Trusted by 500+ locals"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- RIGHT: Hero Image Composition --- */}
              <div className="relative w-full animate-in fade-in zoom-in duration-1000 delay-200 hidden md:block">
                <div className="relative aspect-[4/3] lg:aspect-square w-full">
                  
                  {/* Decorative blobs behind image */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl opacity-60 -z-10" />

                  {/* Main Image */}
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-border/50 shadow-2xl bg-muted">
                    {image?.asset ? (
                      <Image
                        src={urlFor(image).width(1200).height(1200).url()}
                        alt={image.alt || heading}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted/50">
                        Placeholder Image
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -bottom-6 -left-6 bg-background/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-border flex items-center gap-3 animate-bounce-slow">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2.5 rounded-full text-green-600 dark:text-green-400">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Licensed & Insured</p>
                      <p className="text-xs text-muted-foreground">100% Satisfaction Guarantee</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Mobile Image */}
              <div className="md:hidden relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-border">
                 {image?.asset && (
                    <Image
                      src={urlFor(image).width(800).height(600).url()}
                      alt={image.alt || heading}
                      fill
                      className="object-cover"
                      priority
                    />
                 )}
              </div>

            </div>
          </div>
        </div>
      </section>
    )
  }

  // --- DEFAULT VARIANT (About / Services Pages) ---
  return (
    <section className={cn('relative w-full pt-32 pb-20 bg-background overflow-hidden', className)}>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className={cn(
          'grid gap-12 items-center', 
          image?.asset ? 'lg:grid-cols-2 lg:gap-20' : 'max-w-4xl mx-auto text-center'
        )}>
          
          <div className="space-y-6">
            {subheading && (
              <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                <span className="w-8 h-[2px] bg-primary/50"></span>
                {subheading}
              </div>
            )}

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] text-balance">
              {heading}
            </h1>

            {paragraph && (
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
                {paragraph}
              </p>
            )}

            {ctaText && ctaLink && (
              <div className="pt-4">
                <Button asChild size="lg" className="h-12 px-8">
                  <Link href={ctaLink} className="flex items-center gap-2">
                    {ctaText} <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {image?.asset && (
            <div className="relative aspect-video lg:aspect-[5/4] rounded-2xl overflow-hidden shadow-2xl border border-border bg-muted group">
              <Image
                src={urlFor(image).width(1000).height(800).url()}
                alt={image.alt || heading}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}