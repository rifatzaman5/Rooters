import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import AboutUs from "@/components/AboutUs"
import ServicesSection from "@/components/ServicesSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import PricingSection from "@/components/PricingSection"
import GuaranteesSection from "@/components/GuaranteesSection"
import Footer from "@/components/Footer"
import { client } from "@/lib/sanity/client"
import { homePageQuery, servicesQuery } from "@/lib/sanity/queries"

export const revalidate = 60

export default async function Home() {
  const [pageData, services] = await Promise.all([
    client.fetch(homePageQuery),
    client.fetch(servicesQuery),
  ])

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {pageData?.hero && <Hero data={pageData.hero} />}

      {services && services.length > 0 && (
        <ServicesSection services={services} limit={8} showViewAll={true} variant="tiles" />
      )}

      {pageData?.aboutUs && <AboutUs data={pageData.aboutUs} />}

      {pageData?.pricing && <PricingSection data={pageData.pricing} />}

      {/* ✅ NEW GUARANTEES SECTION */}
      {pageData?.guaranteesSection && <GuaranteesSection data={pageData.guaranteesSection} />}

      {pageData?.testimonialSection && (
        <TestimonialsSection data={pageData.testimonialSection} />
      )}

      <Footer />
    </main>
  )
}