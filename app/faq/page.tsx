import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { client } from "@/lib/sanity/client"
import { faqPageQuery } from "@/lib/sanity/queries"

export const revalidate = 60

export default async function FaqPage() {
  const data = await client.fetch(faqPageQuery)

  const items = data?.faq?.items || []

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Optional hero */}
      {data?.hero && <Hero data={data.hero} />}

      <div className="flex-1 container mx-auto px-4 md:px-6 pt-24 pb-20 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold">
            {data?.faq?.title || data?.title || "FAQ"}
          </h1>
          {data?.faq?.description && (
            <p className="mt-4 text-lg text-muted-foreground">
              {data.faq.description}
            </p>
          )}
        </div>

        {items.length > 0 ? (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {items.map((item: any, index: number) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left py-6 text-base md:text-lg font-semibold hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                  {item.answer || "Answer coming soon."}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center p-8 bg-muted/30 rounded-xl border border-dashed border-muted-foreground/25">
            <p className="font-semibold text-muted-foreground">
              No FAQs found.
            </p>
            <p className="text-muted-foreground mt-2">
              Make sure the Page with slug <span className="font-mono">faq</span> is published and has FAQ items.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}