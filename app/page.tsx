import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import { client } from '@/lib/sanity/client'
import { homePageQuery } from '@/lib/sanity/queries'
import type { HeroSection } from '@/types/sanity'

interface PageData {
  hero: HeroSection | null
}

export default async function Home() {
  // Fetch page data from Sanity (which includes hero)
  const pageData = await client.fetch<PageData | null>(homePageQuery)

  return (
    <main>
      {/* Navbar overlays the hero section */}
      <div className="relative">
        <Navbar variant="overlay" />
        {pageData?.hero && <Hero data={pageData.hero} />}
      </div>
    </main>
  );
}

