import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import ServicesSection from "@/components/ServicesSection"
import ProcessSection from "@/components/ProcessSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import GuaranteesSection from "@/components/GuaranteesSection"
import ServiceAreasSection from "@/components/ServiceAreasSection"
import Footer from "@/components/Footer"

import { client } from "@/lib/sanity/client"
import { pageBySlugQuery, servicesQuery, siteSettingsQuery } from "@/lib/sanity/queries"

import type { HeroSection, ServiceItem, TestimonialSectionData, GuaranteesSectionData, ProcessSectionData } from "@/types/sanity"

export const dynamic = "force-dynamic"
export const revalidate = 60

type ServicesPageData = {
  hero: HeroSection | null
  processSection?: ProcessSectionData | null
  testimonialSection?: TestimonialSectionData | null
  guaranteesSection?: GuaranteesSectionData | null
} | null

export default async function ServicesPage() {
  const [pageData, services, settings] = await Promise.all([
    client.fetch<ServicesPageData>(pageBySlugQuery, { slug: "services" }),
    client.fetch<ServiceItem[]>(servicesQuery),
    client.fetch(siteSettingsQuery),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {pageData?.hero && <Hero data={pageData.hero} />}

      {services?.length ? (
        <ServicesSection services={services} variant="cards" />
      ) : (
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-2xl font-bold">No services found</h2>
          <p className="text-muted-foreground mt-2">
            Add Service documents in Sanity (Content → Services).
          </p>
        </section>
      )}

      {pageData?.processSection && <ProcessSection data={pageData.processSection} />}

      {settings?.serviceAreas && settings.serviceAreas.length > 0 && (
        <ServiceAreasSection areas={settings.serviceAreas} />
      )}

      {pageData?.guaranteesSection && <GuaranteesSection data={pageData.guaranteesSection} />}

      {pageData?.testimonialSection && <TestimonialsSection data={pageData.testimonialSection} />}

      <Footer />
    </main>
  )
}