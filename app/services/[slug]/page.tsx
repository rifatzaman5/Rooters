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
            <h1 className="text-4xl font-bold font-heading mb-4 text-foreground">
              Service Not Found
            </h1>
            <p className="mb-8 text-muted-foreground">
              We couldn't find the service page for <strong>"/{slug}"</strong>.
              It may have been moved or the URL is incorrect.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
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

      {/* HERO */}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
        </div>

        {/* Content */}
        <div className="relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="pt-28 sm:pt-32 md:pt-36 pb-12 md:pb-16">
              <div className="max-w-4xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-md bg-white/10 border border-white/20 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur-sm shadow-sm">
                  <Sparkles className="w-4 h-4" />
                  Professional Service
                </div>

                <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight tracking-tight text-white">
                  {service.title}
                </h1>

                {service.shortDescription && (
                  <p className="mt-4 text-sm sm:text-base md:text-lg text-white/90 max-w-2xl leading-relaxed">
                    {service.shortDescription}
                  </p>
                )}

                {/* CTAs */}
                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="h-11 px-6 shadow-sm"
                  >
                    <Link href="/contact" className="flex items-center gap-2">
                      Get a Free Quote <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-11 px-6 bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-white/30"
                  >
                    <Link href="tel:+15551234567" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Call Now
                    </Link>
                  </Button>
                </div>

                {/* Trust bullets */}
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm text-white/80">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Licensed & Insured
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> Fast Scheduling
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Satisfaction Focused
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </section>

      {/* BODY */}
      <div className="container mx-auto px-4 md:px-6 flex-1">
        <div className="py-12 md:py-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* MAIN CONTENT */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Intro + Highlights */}
              <section className="rounded-lg border border-border bg-card p-6 md:p-7 shadow-sm">
                {service.intro && (
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {service.intro}
                  </p>
                )}

                {service.highlights?.length > 0 && (
                  <div className="mt-6">
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-4">
                      What's Included
                    </h2>

                    <ul className="grid sm:grid-cols-2 gap-3">
                      {service.highlights.map((item: string, idx: number) => (
                        <li
                          key={idx}
                          className="group flex items-start gap-2.5 rounded-lg border border-border bg-background p-3.5 hover:bg-accent transition-colors"
                        >
                          <div className="shrink-0">
                            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                          </div>
                          <span className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">
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
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-5">
                    Why choose us for {service.title}?
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                    {service.benefits.map(
                      (benefit: { title: string; description?: string }, idx: number) => (
                        <div
                          key={idx}
                          className="relative h-full rounded-lg border border-border bg-background p-5 shadow-sm hover:shadow-md transition-shadow"
                        >
                          {/* Top accent */}
                          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary/40 via-primary/15 to-transparent" />

                          <h3 className="text-base font-semibold font-heading mb-2 text-foreground">
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
                <section className="rounded-lg border border-border bg-background p-6 md:p-7 shadow-sm">
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-5">
                    Service Details
                  </h2>

                  <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-a:text-primary">
                    <PortableText value={service.content} />
                  </div>
                </section>
              )}

              {/* Service FAQ */}
              {service.serviceFaq?.length > 0 && (
                <section className="rounded-lg border border-border bg-card p-6 md:p-7 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    <h2 className="font-heading text-xl md:text-2xl font-bold">
                      {service.title} FAQs
                    </h2>
                  </div>

                  <Accordion type="single" collapsible className="w-full space-y-2.5">
                    {service.serviceFaq.map(
                      (item: { question: string; answer: string }, idx: number) => (
                        <AccordionItem
                          key={idx}
                          value={`faq-${idx}`}
                          className="border border-border rounded-lg px-4 md:px-5 bg-background hover:bg-accent transition-colors"
                        >
                          <AccordionTrigger className="text-left py-3.5 md:py-4 text-sm md:text-base font-semibold">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="pb-3.5 md:pb-4 text-sm text-muted-foreground leading-relaxed">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      )
                    )}
                  </Accordion>
                </section>
              )}
            </div>

            {/* STICKY SIDEBAR */}
            <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
              <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
                <h3 className="text-lg font-bold font-heading text-foreground">
                  Need help with {service.title}?
                </h3>

                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Tell us what's going on and we'll recommend the next best step—repair, maintenance, or replacement.
                </p>

                <div className="mt-5 space-y-2.5">
                  <Button
                    asChild
                    size="lg"
                    className="w-full shadow-sm"
                  >
                    <Link href="/contact">Schedule Service</Link>
                  </Button>

                  <Button asChild variant="outline" size="lg" className="w-full">
                    <Link href="tel:+15551234567" className="flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" />
                      Call 24/7 Support
                    </Link>
                  </Button>
                </div>

                <div className="mt-4 text-xs text-muted-foreground">
                  Upfront pricing • No hidden fees • Satisfaction guaranteed
                </div>

                {/* Trust icons */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-lg border border-border bg-accent/50 p-2.5 text-center">
                    <ShieldCheck className="w-4 h-4 text-primary mx-auto" />
                  </div>
                  <div className="rounded-lg border border-border bg-accent/50 p-2.5 text-center">
                    <Clock className="w-4 h-4 text-primary mx-auto" />
                  </div>
                  <div className="rounded-lg border border-border bg-accent/50 p-2.5 text-center">
                    <CheckCircle2 className="w-4 h-4 text-primary mx-auto" />
                  </div>
                </div>
              </div>

              {/* Secondary card */}
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
                <h4 className="font-heading font-bold text-base mb-2">
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