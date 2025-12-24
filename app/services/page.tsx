import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ServicesSection from '@/components/ServicesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import Footer from '@/components/Footer'

import { client } from '@/lib/sanity/client'
import { pageBySlugQuery, servicesQuery, testimonialsQuery } from '@/lib/sanity/queries'

import type { HeroSection } from '@/types/sanity'
import type { ServiceItem, TestimonialItem } from '@/types/sanity'

// keep fresh while developing
export const dynamic = "force-dynamic"
export const revalidate = 60

type ServicesPageData = {
  hero: HeroSection | null
} | null

export default async function ServicesPage() {
  const [pageData, services, testimonials] = await Promise.all([
    client.fetch<ServicesPageData>(pageBySlugQuery, { slug: 'services' }),
    client.fetch<ServiceItem[]>(servicesQuery),
    client.fetch<TestimonialItem[]>(testimonialsQuery),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero for Services landing page */}
      {pageData?.hero && <Hero data={pageData.hero} />}

      {/* All services list */}
      {services?.length ? (
        <ServicesSection services={services} />
      ) : (
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-2xl font-bold">No services found</h2>
          <p className="text-muted-foreground mt-2">
            Add Service documents in Sanity (Content → Services).
          </p>
        </section>
      )}

      {/* Testimonials (optional but good) */}
      {testimonials?.length ? (
        <TestimonialsSection testimonials={testimonials} />
      ) : null}

      <Footer />
    </main>
  )
}