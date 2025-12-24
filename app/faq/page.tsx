import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { client } from '@/lib/sanity/client'
import { faqQuery } from '@/lib/sanity/queries'
import type { FaqPage } from '@/types/sanity'

export const revalidate = 60

export default async function FaqPage() {
  const data: FaqPage = await client.fetch(faqQuery)
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 pt-32 pb-20 max-w-3xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{data?.title || "FAQ"}</h1>
          {data?.description && <p className="text-xl text-muted-foreground">{data.description}</p>}
        </div>
        {data?.items ? (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {data.items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary py-6">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : <div className="text-center p-8 bg-muted rounded-xl">No FAQs added yet.</div>}
      </div>
      <Footer />
    </main>
  )
}