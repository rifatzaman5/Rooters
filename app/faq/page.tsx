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

      <div className="flex-1 container mx-auto px-4 md:px-6 pt-28 pb-16 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-heading font-bold">
            {data?.faq?.title || data?.title || "FAQ"}
          </h1>
          {data?.faq?.description && (
            <p className="mt-3 text-base sm:text-lg text-muted-foreground">
              {data.faq.description}
            </p>
          )}
        </div>

        {items.length > 0 ? (
          <Accordion type="single" collapsible className="w-full space-y-3">
            {items.map((item: any, index: number) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-5 bg-card hover:bg-accent transition-colors"
              >
                <AccordionTrigger className="text-left py-4 text-sm md:text-base font-semibold hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
                  {item.answer || "Answer coming soon."}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center p-8 bg-muted/20 rounded-lg border border-dashed border-border">
            <p className="font-semibold text-foreground">
              No FAQs found.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Make sure the Page with slug <span className="font-mono text-primary">faq</span> is published and has FAQ items.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}