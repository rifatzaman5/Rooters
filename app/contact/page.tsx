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

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">
              {form?.infoHeading || 'Get in Touch'}
            </h2>
            <p className="text-muted-foreground">
              {form?.infoText || "Fill out the form or call us directly. We’re here to help."}
            </p>

            <div className="space-y-6">
              {c?.phoneDisplay && (
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Phone</h3>
                    <a className="text-muted-foreground hover:text-primary" href={c.phoneHref || '#'}>
                      {c.phoneDisplay}
                    </a>
                    {c.emergencyNote && (
                      <p className="text-sm text-primary mt-1">{c.emergencyNote}</p>
                    )}
                  </div>
                </div>
              )}

              {c?.email && (
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email</h3>
                    <a className="text-muted-foreground hover:text-primary" href={`mailto:${c.email}`}>
                      {c.email}
                    </a>
                  </div>
                </div>
              )}

              {(c?.addressLine1 || c?.addressLine2) && (
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Office</h3>
                    <p className="text-muted-foreground">
                      {c.addressLine1}
                      {c.addressLine2 ? <><br />{c.addressLine2}</> : null}
                    </p>
                  </div>
                </div>
              )}

              {hours.length > 0 && (
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Hours</h3>
                    <div className="text-muted-foreground space-y-1">
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
          <div className="bg-card p-8 rounded-2xl border shadow-sm">
            <h3 className="text-xl font-bold mb-6">
              {form?.formHeading || 'Send us a message'}
            </h3>

            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{form?.nameLabel || 'Name'}</label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder={form?.namePlaceholder || 'John Doe'}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{form?.phoneLabel || 'Phone'}</label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder={form?.phonePlaceholder || '(555) 000-0000'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{form?.emailLabel || 'Email'}</label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder={form?.emailPlaceholder || 'john@example.com'}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{form?.messageLabel || 'Message'}</label>
                <textarea
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder={form?.messagePlaceholder || 'How can we help?'}
                />
              </div>

              <Button className="w-full h-12 text-lg">
                {form?.submitText || 'Send Message'}
              </Button>

              {form?.disclaimer && (
                <p className="text-xs text-muted-foreground pt-2">{form.disclaimer}</p>
              )}
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}