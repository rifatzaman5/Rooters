import { client } from "@/lib/sanity/client"
import { singleServiceQuery } from "@/lib/sanity/queries"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { urlFor } from "@/lib/sanity/image"
import { PortableText } from "@portabletext/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  CheckCircle2,
  HelpCircle,
  Phone,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
        <div className="flex-grow flex items-center justify-center bg-primary/5">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-4xl font-bold font-heading mb-4 text-primary">
              Service Not Found
            </h1>
            <p className="mb-8 text-muted-foreground">
              We couldn't find the service page for <strong>"/{slug}"</strong>.
              It may have been moved or the URL is incorrect.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
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

  const heroImg = service?.mainImage
  const heroAlt = service?.mainImage?.alt || service?.title || "Service"

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* =========================
          HERO (Unique / Cleaner)
         ========================= */}
      <section className="relative w-full overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          {heroImg ? (
            <img
              src={urlFor(heroImg).width(2200).height(1200).url()}
              alt={heroAlt}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}

          {/* Overlay */}
      {/* Overlay */}
{/* Overlay */}
<div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/70 to-transparent" />

        </div>

        {/* Content */}
        <div className="relative">
          <div className="container mx-auto px-4 md:px-6">
            {/* padding below fixed navbar */}
            <div className="pt-28 sm:pt-32 md:pt-36 pb-14 md:pb-16 lg:pb-20">
              <div className="max-w-4xl">
                {/* Badge row */}
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 border border-primary/40 px-4 py-1.5 text-sm font-semibold text-primary-foreground/95 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-primary-foreground/90" />
                  Professional Service
                </div>

                <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.05] tracking-tight text-white text-balance">
                  {service.title}
                </h1>

                {service.shortDescription && (
                  <p className="mt-4 text-sm sm:text-base md:text-lg text-white/85 max-w-2xl leading-relaxed text-balance">
                    {service.shortDescription}
                  </p>
                )}

                {/* Hero CTAs */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button asChild size="lg" className="h-12 sm:h-13 px-7 rounded-full shadow-lg shadow-primary/20">
                    <Link href="/contact" className="flex items-center gap-2">
                      Get a Free Quote <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 sm:h-13 px-7 rounded-full bg-white/5 border-white/20 text-white hover:bg-white/10"
                  >
                    <Link href="tel:+15551234567" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Call Now
                    </Link>
                  </Button>
                </div>

                {/* Quick trust bullets */}
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-white/70">
                  <span className="inline-flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-white/70" /> Licensed & Insured
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="w-4 h-4 text-white/70" /> Fast Scheduling
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-white/70" /> Satisfaction Focused
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* subtle divider into page */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      {/* =========================
          BODY (Better for long content)
         ========================= */}
      <div className="container mx-auto px-4 md:px-6 flex-1">
        <div className="py-14 md:py-20">
          {/* Layout: main + sticky sidebar */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* MAIN CONTENT */}
            <div className="lg:col-span-8 space-y-12">
              {/* Intro + Highlights */}
              <section className="rounded-2xl border border-border/70 bg-card/40 p-6 md:p-8">
                {service.intro && (
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {service.intro}
                  </p>
                )}

                {service.highlights?.length > 0 && (
                  <div className="mt-6">
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-4">
                      What’s Included
                    </h2>

                    <ul className="grid sm:grid-cols-2 gap-3">
                      {service.highlights.map((item: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/60 p-4"
                        >
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                          <span className="text-sm sm:text-base text-muted-foreground">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>

              {/* Benefits */}
              {service.benefits?.length > 0 && (
                <section>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                    Why choose us for {service.title}?
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
                    {service.benefits.map(
                      (benefit: { title: string; description?: string }, idx: number) => (
                        <div
                          key={idx}
                          className="h-full rounded-2xl border border-border/70 bg-background p-6 shadow-sm hover:shadow-lg transition-shadow"
                        >
                          <h3 className="text-lg font-semibold font-heading mb-2 text-foreground">
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

              {/* Rich content */}
              {service.content && (
                <section className="rounded-2xl border border-border/70 bg-background p-6 md:p-8">
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                    Service Details
                  </h2>
                  <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none">
                    <PortableText value={service.content} />
                  </div>
                </section>
              )}

              {/* Service FAQ */}
              {service.serviceFaq?.length > 0 && (
                <section className="rounded-2xl border border-border/70 bg-card/40 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-5">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    <h2 className="font-heading text-xl md:text-2xl font-bold">
                      {service.title} FAQs
                    </h2>
                  </div>

                  <Accordion type="single" collapsible className="w-full space-y-3">
                    {service.serviceFaq.map(
                      (item: { question: string; answer: string }, idx: number) => (
                        <AccordionItem
                          key={idx}
                          value={`faq-${idx}`}
                          className="border border-border/70 rounded-xl px-4 md:px-6 bg-background"
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
            </div>

            {/* STICKY SIDEBAR CTA (better conversion) */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <div className="rounded-2xl border border-border/70 bg-background p-6 md:p-7 shadow-sm">
                <h3 className="text-xl font-bold font-heading text-foreground">
                  Need help with {service.title}?
                </h3>

                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Tell us what’s going on and we’ll recommend the next best step—repair, maintenance, or replacement.
                </p>

                <div className="mt-5 space-y-3">
                  <Button asChild size="lg" className="w-full rounded-full shadow-md shadow-primary/20">
                    <Link href="/contact">Schedule Service</Link>
                  </Button>

                  <Button asChild variant="outline" size="lg" className="w-full rounded-full">
                    <Link href="tel:+15551234567">Call 24/7 Support</Link>
                  </Button>
                </div>

                <div className="mt-5 text-xs text-muted-foreground">
                  Upfront pricing • No hidden fees • Satisfaction guaranteed
                </div>
              </div>

              {/* Secondary info card */}
              <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6 md:p-7">
                <h4 className="font-heading font-bold text-lg mb-2">
                  Fast, clean, and professional
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We protect your space, communicate clearly, and focus on long-term reliability—so you feel confident after we leave.
                </p>
              </div>
            </aside>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}