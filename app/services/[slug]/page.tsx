import { client } from '@/lib/sanity/client'
import { singleServiceQuery } from '@/lib/sanity/queries'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { PortableText } from '@portabletext/react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle2, HelpCircle } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

// ISR
export const revalidate = 60

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = await client.fetch(singleServiceQuery, { slug })

  if (!service) {
    return (
      <main className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-muted/20">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-4xl font-bold font-heading mb-4 text-primary">
              Service Not Found
            </h1>
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

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* IMPROVED HERO BANNER */}
      <section className="relative w-full overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          {service.mainImage ? (
            <Image
              src={urlFor(service.mainImage).width(1600).height(800).url()}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-slate-900" />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-black/85" />
        </div>

        {/* Content */}
        <div className="relative">
          <div className="container mx-auto px-4 md:px-6">
            {/* pt-32 so hero always nicely below fixed navbar */}
            <div className="pt-32 pb-16 md:pt-36 md:pb-20 lg:pt-40 lg:pb-24">
              <div className="max-w-3xl space-y-4 text-left text-white">
                <span className="inline-flex items-center rounded-full bg-primary/20 border border-primary/50 px-3 py-1 text-xs md:text-sm font-semibold text-primary backdrop-blur-sm">
                  Professional Service
                </span>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-balance">
                  {service.title}
                </h1>

                {service.shortDescription && (
                  <p className="text-sm md:text-lg text-white/85 max-w-2xl text-balance">
                    {service.shortDescription}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <div className="container mx-auto px-4 md:px-6 py-16 lg:py-20 max-w-6xl flex-1">
        {/* INTRO + SIDE CTA */}
        <section className="grid lg:grid-cols-3 gap-10 lg:gap-14 items-start mb-16">
          <div className="lg:col-span-2 space-y-6">
            {service.intro && (
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {service.intro}
              </p>
            )}

            {service.highlights?.length > 0 && (
              <ul className="space-y-3">
                {service.highlights.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="p-6 md:p-7 rounded-2xl border border-border bg-card shadow-sm space-y-4">
            <h3 className="text-xl font-bold font-heading">
              Need help with {service.title}?
            </h3>
            <p className="text-sm text-muted-foreground">
              Our licensed technicians are available 24/7 for emergencies, repairs,
              and new installations.
            </p>
            <div className="space-y-3">
              <Button asChild size="lg" className="w-full shadow-md shadow-primary/20">
                <Link href="/contact">Schedule Service</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link href="tel:+15551234567">Call 24/7 Support</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Upfront pricing • No hidden fees • Satisfaction guaranteed
            </p>
          </aside>
        </section>

        {/* BENEFITS GRID */}
        {service.benefits?.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
              Why choose us for {service.title}?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {service.benefits.map(
                (benefit: { title: string; description?: string }, idx: number) => (
                  <div
                    key={idx}
                    className="h-full rounded-2xl border border-border bg-card p-5 md:p-6 shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-lg font-semibold font-heading mb-2">
                      {benefit.title}
                    </h3>
                    {benefit.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* RICH CONTENT */}
        {service.content && (
          <section className="mb-16">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <PortableText value={service.content} />
            </div>
          </section>
        )}

        {/* SERVICE-SPECIFIC FAQ */}
        {service.serviceFaq?.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5 text-primary" />
              <h2 className="text-xl md:text-2xl font-heading font-bold">
                {service.title} – Frequently Asked Questions
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {service.serviceFaq.map(
                (item: { question: string; answer: string }, idx: number) => (
                  <AccordionItem
                    key={idx}
                    value={`faq-${idx}`}
                    className="border border-border rounded-xl px-4 md:px-6 bg-card"
                  >
                    <AccordionTrigger className="text-left py-4 md:py-5 text-sm md:text-base font-semibold">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 md:pb-5 text-sm text-muted-foreground leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                )
              )}
            </Accordion>
          </section>
        )}

        {/* BOTTOM CTA BOX */}
        <section className="mt-4 p-8 bg-primary/5 border border-primary/10 rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to book {service.title}?
          </h3>
          <p className="text-muted-foreground mb-6">
            Our experts are ready to assist you 24/7. Get a free quote today.
          </p>
          <Button asChild size="lg" className="shadow-lg shadow-primary/20">
            <Link href="/contact">Get a Free Quote</Link>
          </Button>
        </section>
      </div>

      <Footer />
    </main>
  )
}