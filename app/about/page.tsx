import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import AboutUs from '@/components/AboutUs'
import Footer from '@/components/Footer'
import { client } from '@/lib/sanity/client'
import { pageBySlugQuery } from '@/lib/sanity/queries'
import type { HeroSection, AboutUsSection } from '@/types/sanity'

export const revalidate = 60

type AboutPageData = {
  hero: HeroSection | null
  aboutUs: AboutUsSection | null
} | null

export default async function AboutPage() {
  const pageData = await client.fetch<AboutPageData>(pageBySlugQuery, { slug: 'about' })

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {pageData?.hero && <Hero data={pageData.hero} />}

      {pageData?.aboutUs ? (
        <AboutUs data={pageData.aboutUs} />
      ) : (
        <section className="container mx-auto px-4 py-16">
          <h1 className="font-heading text-3xl md:text-4xl font-bold">About</h1>
          <p className="text-muted-foreground mt-3">
            About page content not found. Please create a Page document with slug <span className="font-mono text-primary">about</span> in Sanity.
          </p>
        </section>
      )}

      <Footer />
    </main>
  )
}