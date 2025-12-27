import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Home, Phone } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <section className="flex-1 relative overflow-hidden">
        {/* Subtle background */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-muted/20" />
        <div className="absolute top-0 inset-x-0 h-px bg-border/50" />

        <div className="container mx-auto px-4 md:px-6 pt-28 sm:pt-32 pb-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
              404 Error
            </div>

            <h1 className="mt-5 font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
              Page not found
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              The page you're looking for doesn't exist or may have been moved.
              Use the buttons below to get back on track.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="h-11 px-6 shadow-sm">
                <Link href="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Go Home
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="h-11 px-6">
                <Link href="/contact" className="flex items-center gap-2">
                  Contact Us <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="h-11 px-6">
                <a href="tel:+15551234567" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}