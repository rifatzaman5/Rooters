import { client } from '@/lib/sanity/client'
import { singleServiceQuery } from '@/lib/sanity/queries'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { PortableText } from '@portabletext/react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Refresh data every 60 seconds
export const revalidate = 60

// 1. Update the Props type to expect a Promise
type Props = {
  params: Promise<{ slug: string }>
}

export default async function ServicePage({ params }: Props) {
  // 2. Await the params before accessing the slug
  const { slug } = await params
  
  // Fetch data from Sanity using the awaited slug
  const service = await client.fetch(singleServiceQuery, { slug })

  // 3. Handle "Service Not Found" gracefully
  if (!service) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-muted/20">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-4xl font-bold font-heading mb-4 text-primary">Service Not Found</h1>
            <p className="mb-8 text-muted-foreground">
              We couldn't find the service page for <strong>"/{slug}"</strong>. 
              It may have been moved or the URL is incorrect.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link href="/">Go Home</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  // 4. Render the Service Page
  return (
    <main>
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative h-[400px] lg:h-[500px] w-full mt-16 lg:mt-0">
        {service.mainImage ? (
          <Image
            src={urlFor(service.mainImage).url()}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-slate-900" />
        )}
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="container px-4 text-center">
             <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/50 text-primary text-sm font-bold mb-4 backdrop-blur-sm">
               Professional Service
             </span>
             <h1 className="text-4xl md:text-6xl font-bold text-white font-heading">
               {service.title}
             </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 max-w-4xl">
        {/* Main Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {service.content ? (
            <PortableText value={service.content} />
          ) : (
            <div>
              <p className="lead text-xl text-muted-foreground mb-6">
                {service.shortDescription}
              </p>
              <p>Contact us today to learn more about our professional {service.title} services.</p>
            </div>
          )}
        </div>

        {/* CTA Box */}
        <div className="mt-16 p-8 bg-primary/5 border border-primary/10 rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-4">Need help with {service.title}?</h3>
          <p className="text-muted-foreground mb-6">
            Our experts are ready to assist you 24/7. Get a free quote today.
          </p>
          <Button asChild size="lg" className="shadow-lg shadow-primary/20">
            <Link href="/contact">Schedule Service</Link>
          </Button>
        </div>
      </div>

      <Footer />
    </main>
  )
}