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
    "Your trusted partner for eco-friendly plumbing and HVAC solutions. Serving the community with integrity and excellence."

  const quickLinks =
    settings?.footerLinks || [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
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
    <footer className="relative overflow-visible bg-background mt-20 md:mt-24">
      {/* Footer panel (rounded top corners) */}
      <div className="relative bg-primary text-primary-foreground brightness-90 rounded-t-[2.5rem] md:rounded-t-[3rem]">
        {/* CTA (overlapping, fully visible) */}
        <div className="absolute left-0 right-0 -top-24 sm:-top-20 md:-top-28 z-30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-5xl rounded-3xl bg-background text-foreground border border-primary/20 shadow-2xl px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-9">
              <div className="flex flex-col items-center text-center gap-4">
                <h3 className="font-heading text-lg sm:text-2xl md:text-3xl font-bold leading-tight">
                  Book a free consultation with our experts today.
                </h3>

                <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
                  Quick scheduling, transparent pricing, and professional service you can trust.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-primary text-primary-foreground font-semibold
                               hover:bg-primary/90 transition-colors w-full sm:w-auto"
                  >
                    Contact Us Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>

                  <a
                    href={contact?.phoneHref || "tel:#"}
                    className="inline-flex items-center justify-center h-12 px-7 rounded-full border border-border
                               bg-background hover:bg-muted transition-colors font-semibold w-full sm:w-auto"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {contact?.phoneDisplay || "Call Support"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Space so footer content starts below CTA overlap (mobile needs more space) */}
        <div className="pt-44 sm:pt-40 md:pt-28">
          <div className="container mx-auto px-4 md:px-6">
            {/* subtle divider */}
            <div className="h-px w-full bg-primary-foreground/15 mb-10 md:mb-12" />

            {/* Main grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-10">
              {/* Brand + Social */}
              <div className="lg:col-span-4 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary-foreground/15 border border-primary-foreground/20 flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-primary-foreground" />
                  </div>
                  <span className="text-2xl font-heading font-bold tracking-tight">
                    {brandName}
                  </span>
                </div>

                <p className="text-primary-foreground/80 leading-relaxed max-w-sm">
                  {brandDescription}
                </p>

                {socials.length > 0 && (
                  <div className="flex items-center gap-3 pt-1">
                    {socials.map((s, idx) => (
                      <a
                        key={idx}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-full bg-primary-foreground/10 border border-primary-foreground/15
                                   flex items-center justify-center text-primary-foreground/85
                                   hover:bg-primary-foreground hover:text-primary transition-all duration-300"
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
                <h4 className="font-bold text-lg mb-4">About</h4>
                <ul className="space-y-3">
                  {quickLinks.map((l, idx) => (
                    <li key={idx}>
                      <Link
                        href={l.href}
                        className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="lg:col-span-3">
                <h4 className="font-bold text-lg mb-4">Services</h4>
                <ul className="space-y-3">
                  {topServices.map((s) => (
                    <li key={s._id}>
                      <Link
                        href={`/services/${s.slug.current}`}
                        className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    View All Services <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Contact */}
              <div className="lg:col-span-3">
                <h4 className="font-bold text-lg mb-4">Contact Details</h4>

                <ul className="space-y-4">
                  {(contact?.addressLine1 || contact?.addressLine2) && (
                    <li className="flex items-start gap-3 text-primary-foreground/80">
                      <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-primary-foreground" />
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
                    <li className="flex items-center gap-3 text-primary-foreground/80">
                      <Mail className="w-5 h-5 shrink-0 text-primary-foreground" />
                      <a
                        href={`mailto:${contact.email}`}
                        className="hover:text-primary-foreground transition-colors"
                      >
                        {contact.email}
                      </a>
                    </li>
                  )}

                  {contact?.phoneDisplay && (
                    <li className="flex items-center gap-3 text-primary-foreground/80">
                      <Phone className="w-5 h-5 shrink-0 text-primary-foreground" />
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
            <div className="h-px w-full bg-primary-foreground/15" />

            {/* Bottom bar */}
            <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
              <p className="text-primary-foreground/70">{copyrightText}</p>

              <div className="flex items-center gap-6 text-primary-foreground/70">
                <Link href="/privacy-policy" className="hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="hover:text-primary-foreground transition-colors">
                  Terms & Conditions
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