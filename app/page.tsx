import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import AboutUs from '@/components/AboutUs'
import ServicesSection from '@/components/ServicesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import PricingSection from '@/components/PricingSection'
import Footer from '@/components/Footer'
import { client } from '@/lib/sanity/client'
import { homePageQuery, servicesQuery, testimonialsQuery } from '@/lib/sanity/queries'

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function Home() {
  // Fetch all data in parallel
  const [pageData, services, testimonials] = await Promise.all([
    client.fetch(homePageQuery),
    client.fetch(servicesQuery),
    client.fetch(testimonialsQuery)
  ])

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      {pageData?.hero && <Hero data={pageData.hero} />}
      
      {/* Services Section */}
      {services && services.length > 0 && (
        <ServicesSection services={services} />
      )}
      
      {/* About Section */}
      {pageData?.aboutUs && <AboutUs data={pageData.aboutUs} />}
      
      {/* Pricing Section */}
      {pageData?.pricing && <PricingSection data={pageData.pricing} />}

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <TestimonialsSection testimonials={testimonials} />
      )}

      <Footer />
    </main>
  );
}