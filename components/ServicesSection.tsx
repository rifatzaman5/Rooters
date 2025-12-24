import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Wrench, Droplets, Thermometer, Wind, Zap, Hammer, ArrowRight } from 'lucide-react'
import type { ServiceItem } from '@/types/sanity'

// Icon Map
const iconMap: Record<string, any> = {
  Wrench, Droplets, Thermometer, Wind, Zap, Hammer
}

interface ServicesProps {
  services: ServiceItem[]
}

export default function ServicesSection({ services }: ServicesProps) {
  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header - Aligned center for this section */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider justify-center">
            <span className="w-8 h-[2px] bg-primary/50"></span>
            Our Expertise
            <span className="w-8 h-[2px] bg-primary/50"></span>
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] text-balance">
            Complete Home <br className="hidden sm:block"/> Infrastructure Solutions
          </h2>
          
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            From emergency repairs to energy-efficient upgrades, we provide professional services backed by our satisfaction guarantee.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon ? iconMap[service.icon] : Wrench
            
            return (
              <Link 
                key={service._id} 
                href={`/services/${service.slug.current}`}
                className="group relative flex flex-col p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full"
              >
                {/* Icon Box */}
                <div className="mb-6 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
                  {Icon && <Icon className="w-7 h-7" />}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-bold font-heading text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Link Text */}
                <div className="mt-8 pt-6 border-t border-border/50 flex items-center text-sm font-semibold text-primary">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}