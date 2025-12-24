import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { urlFor } from '@/lib/sanity/image'
import { Shield, Clock, Award, Star, Users, CheckCircle, Zap, ArrowRight } from 'lucide-react'
import type { AboutUsSection } from '@/types/sanity'

interface AboutUsProps {
  data: AboutUsSection
  className?: string
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Clock,
  Award,
  Star,
  Users,
  CheckCircle,
  Zap,
}

export default function AboutUs({ data, className }: AboutUsProps) {
  const { heading, subheading, description, image, features, ctaText, ctaLink } = data

  return (
    <section className={cn('relative w-full py-20 md:py-32 bg-background overflow-hidden', className)}>
      {/* Subtle Background Pattern */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side - Image Composition */}
          <div className="relative group animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Back decorative border */}
            <div className="absolute top-4 left-4 w-full h-full border-2 border-primary/20 rounded-2xl -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
            
            {/* Main Image Container */}
            <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-border bg-muted">
              {image?.asset ? (
                <Image
                  src={urlFor(image).width(800).height(800).url()}
                  alt={image.alt || heading}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Image placeholder</p>
                </div>
              )}
            </div>

            {/* Floating Badge (Optional decorative touch using generic icon) */}
            <div className="absolute -bottom-6 -right-6 lg:bottom-10 lg:-right-10 bg-background p-4 rounded-xl shadow-xl border border-border flex items-center gap-3 animate-in zoom-in delay-300 duration-500">
              <div className="bg-primary/10 p-2.5 rounded-full text-primary">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none">Top Rated</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Service</span>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              {/* Subheading */}
              {subheading && (
                <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                  <span className="w-8 h-[2px] bg-primary/50"></span>
                  {subheading}
                </div>
              )}

              {/* Heading */}
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.15] text-balance">
                {heading}
              </h2>

              {/* Description */}
              {description && (
                <p className="text-lg text-muted-foreground leading-relaxed text-balance">
                  {description}
                </p>
              )}
            </div>

            {/* Features Grid */}
            {features && features.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-5 pt-2">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon ? iconMap[feature.icon] : CheckCircle
                  return (
                    <div
                      key={index}
                      className="group flex flex-col gap-3 p-5 rounded-xl border border-border bg-card/50 hover:bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                          {IconComponent && <IconComponent className="w-5 h-5" />}
                        </div>
                        <h3 className="font-bold text-foreground line-clamp-1">{feature.title}</h3>
                      </div>
                      
                      {feature.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {/* CTA Button */}
            {ctaText && ctaLink && (
              <div className="pt-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="h-12 px-8 text-base shadow-md hover:shadow-lg transition-all"
                >
                  <Link href={ctaLink} className="flex items-center gap-2">
                    {ctaText} <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}