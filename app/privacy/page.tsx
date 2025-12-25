import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomPortableText from '@/components/CustomPortableText'
import { client } from '@/lib/sanity/client'
import { legalPageQuery } from '@/lib/sanity/queries'

export const revalidate = 60

export default async function PrivacyPage() {
  // Fetch "Page" document with slug "privacy-policy"
  const data = await client.fetch(legalPageQuery, { slug: 'privacy-policy' })

  if (!data) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 container pt-40 pb-20 text-center">
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
      
      <div className="flex-1 container mx-auto px-4 pt-32 pb-20 max-w-3xl">
        <div className="border-b pb-8 mb-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            {data.content?.heading || data.title}
          </h1>
          {data.content?.lastUpdated && (
            <p className="text-sm text-muted-foreground uppercase tracking-wide">
              Last Updated: {new Date(data.content.lastUpdated).toLocaleDateString()}
            </p>
          )}
        </div>

        {data.content?.body && (
          <CustomPortableText value={data.content.body} />
        )}
      </div>

      <Footer />
    </main>
  )
}