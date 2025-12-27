import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { pageBySlugQuery, siteSettingsQuery } from '@/lib/sanity/queries'
import type { HeroSection, SiteSettings } from '@/types/sanity'

export const revalidate = 60

type ContactPageData = { hero: HeroSection | null } | null

export default async function ContactPage() {
  const [pageData, settings] = await Promise.all([
    client.fetch<ContactPageData>(pageBySlugQuery, { slug: 'contact' }),
    client.fetch<SiteSettings | null>(siteSettingsQuery),
  ])

  const c = settings?.contact
  const hours = settings?.hours || []
  const form = settings?.contactPage

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {pageData?.hero && <Hero data={pageData.hero} />}

      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              {form?.infoHeading || 'Get in Touch'}
            </h2>
            <p className="text-base text-muted-foreground">
              {form?.infoText || "Fill out the form or call us directly. We're here to help."}
            </p>

            <div className="space-y-5">
              {c?.phoneDisplay && (
                <div className="flex gap-3.5">
                  <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-0.5">Phone</h3>
                    <a className="text-sm text-muted-foreground hover:text-primary transition-colors" href={c.phoneHref || '#'}>
                      {c.phoneDisplay}
                    </a>
                    {c.emergencyNote && (
                      <p className="text-xs text-primary mt-1">{c.emergencyNote}</p>
                    )}
                  </div>
                </div>
              )}

              {c?.email && (
                <div className="flex gap-3.5">
                  <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-0.5">Email</h3>
                    <a className="text-sm text-muted-foreground hover:text-primary transition-colors" href={`mailto:${c.email}`}>
                      {c.email}
                    </a>
                  </div>
                </div>
              )}

              {(c?.addressLine1 || c?.addressLine2) && (
                <div className="flex gap-3.5">
                  <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-0.5">Office</h3>
                    <p className="text-sm text-muted-foreground">
                      {c.addressLine1}
                      {c.addressLine2 ? <><br />{c.addressLine2}</> : null}
                    </p>
                  </div>
                </div>
              )}

              {hours.length > 0 && (
                <div className="flex gap-3.5">
                  <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-0.5">Hours</h3>
                    <div className="text-sm text-muted-foreground space-y-0.5">
                      {hours.map((h, i) => (
                        <div key={i}>{h.label}: {h.value}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="bg-card p-6 md:p-7 rounded-lg border border-border shadow-sm">
            <h3 className="text-lg md:text-xl font-bold mb-5">
              {form?.formHeading || 'Send us a message'}
            </h3>

            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{form?.nameLabel || 'Name'}</label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder={form?.namePlaceholder || 'John Doe'}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{form?.phoneLabel || 'Phone'}</label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder={form?.phonePlaceholder || '(555) 000-0000'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{form?.emailLabel || 'Email'}</label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder={form?.emailPlaceholder || 'john@example.com'}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{form?.messageLabel || 'Message'}</label>
                <textarea
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                  placeholder={form?.messagePlaceholder || 'How can we help?'}
                />
              </div>

              <Button className="w-full h-11 shadow-sm">
                {form?.submitText || 'Send Message'}
              </Button>

              {form?.disclaimer && (
                <p className="text-xs text-muted-foreground pt-1">{form.disclaimer}</p>
              )}
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}