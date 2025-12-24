import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomPortableText from '@/components/CustomPortableText'
import { client } from '@/lib/sanity/client'
import { legalQuery } from '@/lib/sanity/queries'
import type { LegalPage } from '@/types/sanity'

export const revalidate = 60

export default async function PrivacyPage() {
  const data: LegalPage = await client.fetch(legalQuery, { slug: 'privacy-policy' })
  if (!data) return <div className="pt-32 text-center">Page not found in Sanity (slug: privacy-policy)</div>

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 pt-32 pb-20 max-w-3xl">
        <div className="border-b pb-8 mb-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{data.title}</h1>
          {data.lastUpdated && <p className="text-sm text-muted-foreground">Last Updated: {new Date(data.lastUpdated).toLocaleDateString()}</p>}
        </div>
        <CustomPortableText value={data.content} />
      </div>
      <Footer />
    </main>
  )
}