import Link from "next/link"
import { client } from "@/lib/sanity/client"
import { siteSettingsQuery, servicesQuery } from "@/lib/sanity/queries"
import type { SiteSettings, ServiceItem } from "@/types/sanity"
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  ArrowRight,
  Twitter,
  Youtube,
} from "lucide-react"

// Revalidate every minute
export const revalidate = 60

function SocialIcon({ platform }: { platform: string }) {
  const p = platform.toLowerCase()
  if (p.includes("facebook")) return <Facebook className="w-5 h-5" />
  if (p.includes("instagram")) return <Instagram className="w-5 h-5" />
  if (p.includes("linkedin")) return <Linkedin className="w-5 h-5" />
  if (p.includes("twitter") || p.includes("x")) return <Twitter className="w-5 h-5" />
  if (p.includes("youtube")) return <Youtube className="w-5 h-5" />
  return null
}

export default async function Footer() {
  const [settings, services] = await Promise.all([
    client.fetch<SiteSettings | null>(siteSettingsQuery),
    client.fetch<ServiceItem[]>(servicesQuery),
  ])

  const brandName = settings?.brandName || "Rooters"
  const brandDescription =
    settings?.brandDescription ||
    "Your trusted partner for eco-friendly plumbing and HVAC solutions."

  const quickLinks =
    settings?.footerLinks || [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ]

  const contact = settings?.contact
  const socials = settings?.socials || []

  const topServices = (services || [])
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title))
    .slice(0, 6)

  const copyrightText =
    settings?.footerLegal || `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`

  return (
    <footer className="relative overflow-visible bg-background mt-40 sm:mt-28 md:mt-40">
      {/* Footer panel */}
      <div className="relative bg-primary text-primary-foreground rounded-t-3xl">
        {/* CTA (overlapping) - Fixed positioning */}
        <div className="absolute left-0 right-0 -top-36 sm:-top-20 md:-top-40 z-30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-5xl rounded-xl bg-background text-foreground border border-border shadow-xl px-5 py-6 sm:px-7 sm:py-8 md:px-10 md:py-9">
              <div className="flex flex-col items-center text-center gap-4 sm:gap-5">
                <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-3 py-1 rounded-full text-xs font-medium text-primary">
                  Free Consultation
                </div>
                
                <h3 className="font-heading text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight max-w-2xl">
                  Book a free consultation with our experts today
                </h3>

                <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
                  Quick scheduling, transparent pricing, and professional service you can trust.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center h-11 px-6 rounded-md bg-primary text-primary-foreground font-semibold
                               hover:bg-primary/90 transition-colors w-full sm:w-auto shadow-sm"
                  >
                    Contact Us Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>

                  <a
                    href={contact?.phoneHref || "tel:#"}
                    className="inline-flex items-center justify-center h-11 px-6 rounded-md border border-border
                               bg-background hover:bg-accent transition-colors font-semibold w-full sm:w-auto"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {contact?.phoneDisplay || "Call Support"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Space for CTA overlap - responsive padding */}
        <div className="pt-40 sm:pt-36 md:pt-40">
          <div className="container mx-auto px-4 md:px-6">
            {/* Divider */}
            <div className="h-px w-full bg-primary-foreground/10 mb-8 md:mb-10" />

            {/* Main grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-8">
              {/* Brand + Social */}
              <div className="lg:col-span-4 space-y-4">
                <Link href="/" className="flex items-center gap-2.5 w-fit">
                  <div className="h-9 w-9 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-primary-foreground" />
                  </div>
                  <span className="text-xl font-heading font-bold tracking-tight">
                    {brandName}
                  </span>
                </Link>

                <p className="text-primary-foreground/75 leading-relaxed text-sm max-w-sm">
                  {brandDescription}
                </p>

                {socials.length > 0 && (
                  <div className="flex items-center gap-2.5 pt-1">
                    {socials.map((s, idx) => (
                      <a
                        key={idx}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-full bg-primary-foreground/10 border border-primary-foreground/15
                                   flex items-center justify-center text-primary-foreground/80
                                   hover:bg-primary-foreground hover:text-primary transition-all duration-200"
                        aria-label={s.platform}
                      >
                        <SocialIcon platform={s.platform} />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Links */}
              <div className="lg:col-span-2">
                <h4 className="font-bold text-base mb-3.5">Quick Links</h4>
                <ul className="space-y-2.5">
                  {quickLinks.map((l, idx) => (
                    <li key={idx}>
                      <Link
                        href={l.href}
                        className="text-sm text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="lg:col-span-3">
                <h4 className="font-bold text-base mb-3.5">Services</h4>
                <ul className="space-y-2.5">
                  {topServices.map((s) => (
                    <li key={s._id}>
                      <Link
                        href={`/services/${s.slug.current}`}
                        className="text-sm text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="pt-3">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    View All Services <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Contact */}
              <div className="lg:col-span-3">
                <h4 className="font-bold text-base mb-3.5">Contact Details</h4>

                <ul className="space-y-3">
                  {(contact?.addressLine1 || contact?.addressLine2) && (
                    <li className="flex items-start gap-2.5 text-sm text-primary-foreground/75">
                      <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary-foreground/75" />
                      <span>
                        {contact?.addressLine1}
                        {contact?.addressLine2 && (
                          <>
                            <br />
                            {contact.addressLine2}
                          </>
                        )}
                      </span>
                    </li>
                  )}

                  {contact?.email && (
                    <li className="flex items-center gap-2.5 text-sm text-primary-foreground/75">
                      <Mail className="w-4 h-4 shrink-0 text-primary-foreground/75" />
                      <a
                        href={`mailto:${contact.email}`}
                        className="hover:text-primary-foreground transition-colors"
                      >
                        {contact.email}
                      </a>
                    </li>
                  )}

                  {contact?.phoneDisplay && (
                    <li className="flex items-center gap-2.5 text-sm text-primary-foreground/75">
                      <Phone className="w-4 h-4 shrink-0 text-primary-foreground/75" />
                      <a
                        href={contact.phoneHref || "#"}
                        className="font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                      >
                        {contact.phoneDisplay}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-primary-foreground/10" />

            {/* Bottom bar */}
            <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
              <p className="text-primary-foreground/60">{copyrightText}</p>

              <div className="flex items-center gap-5 text-primary-foreground/60">
                <Link href="/terms" className="hover:text-primary-foreground transition-colors">
                  Terms
                </Link>
                <Link href="/privacy" className="hover:text-primary-foreground transition-colors">
                  Privacy
                </Link>
                <Link href="/faq" className="hover:text-primary-foreground transition-colors">
                  FAQ
                </Link>
              </div>
            </div>
          </div>

          <div className="pb-2" />
        </div>
      </div>
    </footer>
  )
}