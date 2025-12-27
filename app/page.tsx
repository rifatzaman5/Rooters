import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import AboutUs from "@/components/AboutUs"
import ServicesSection from "@/components/ServicesSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import PricingSection from "@/components/PricingSection"
import GuaranteesSection from "@/components/GuaranteesSection"
import BlogSection from "@/components/BlogSection"
import Footer from "@/components/Footer"

import { client } from "@/lib/sanity/client"
import { homePageQuery, servicesQuery, homePostsQuery } from "@/lib/sanity/queries"

export const revalidate = 60

export default async function Home() {
  const [pageData, services, posts] = await Promise.all([
    client.fetch(homePageQuery),
    client.fetch(servicesQuery),
    client.fetch(homePostsQuery),
  ])

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {pageData?.hero && <Hero data={pageData.hero} />}

  

      {services && services.length > 0 && (
        <ServicesSection services={services} limit={4} showViewAll={true} variant="tiles" />
      )}
       {pageData?.aboutUs && <AboutUs data={pageData.aboutUs} />}

 {pageData?.guaranteesSection && <GuaranteesSection data={pageData.guaranteesSection} />}



       {pageData?.testimonialSection && <TestimonialsSection data={pageData.testimonialSection} />}


      

   
     
     
      {/* {pageData?.pricing && <PricingSection data={pageData.pricing} />} */}

      {posts && posts.length > 0 && <BlogSection posts={posts} />}

      <Footer />
    </main>
  )
}