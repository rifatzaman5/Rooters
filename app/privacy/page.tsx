import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import CustomPortableText from '@/components/CustomPortableText'
import { client } from '@/lib/sanity/client'
import { legalPageQuery } from '@/lib/sanity/queries'

export const revalidate = 60

export default async function PrivacyPage() {
  const data = await client.fetch(legalPageQuery, { slug: 'privacy-policy' })

  if (!data) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 container pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold">Page Not Found</h1>
          <p className="text-muted-foreground mt-2">
            Please create a Page in Sanity with slug <strong>"privacy-policy"</strong>.
          </p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero (optional) */}
      {data?.hero && <Hero data={data.hero} />}

      <div className="flex-1 container mx-auto px-4 pt-28 pb-16 max-w-3xl">
        <div className="border-b border-border pb-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">
            {data.content?.heading || data.title}
          </h1>
          {data.content?.lastUpdated && (
            <p className="text-sm text-muted-foreground">
              Last Updated: {new Date(data.content.lastUpdated).toLocaleDateString()}
            </p>
          )}
        </div>

        {data.content?.body && (
          <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-a:text-primary">
            <CustomPortableText value={data.content.body} />
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}