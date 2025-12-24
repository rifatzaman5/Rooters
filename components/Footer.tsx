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
  Youtube
} from "lucide-react"

// Revalidate every minute
export const revalidate = 60

// Simple Icon Mapper
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

  // Show top 5 services, sorted alphabetically
  const topServices = (services || [])
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title))
    .slice(0, 5)

  return (
    <footer className="relative bg-zinc-950 text-white overflow-hidden pt-16 md:pt-20">
      
      {/* --- Ambient Background Glows --- */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none opacity-40" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[128px] pointer-events-none opacity-30" />

      {/* --- Pre-Footer CTA --- */}
      <div className="container mx-auto px-4 md:px-6 mb-16 md:mb-20">
        <div className="relative rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-white/10 p-8 md:p-12 overflow-hidden">
          {/* Decorative pattern on CTA */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-4 max-w-2xl">
              <h3 className="font-heading text-3xl md:text-4xl font-bold leading-tight">
                Emergency? We're here 24/7.
              </h3>
              <p className="text-zinc-400 text-lg">
                Don't let a small leak become a big problem. Get a free quote online or call our emergency hotline now.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
               <Link
                href="/contact"
                className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20"
              >
                Get a Quote <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a
                href={contact?.phoneHref || "tel:#"}
                className="inline-flex items-center justify-center h-14 px-8 rounded-full border border-white/20 hover:bg-white/10 font-semibold transition-all duration-300"
              >
                <Phone className="w-5 h-5 mr-2" /> 
                {contact?.phoneDisplay || "Call Support"}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Footer Content --- */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
                <div className="h-4 w-4 rounded-full bg-white" />
              </div>
              <span className="text-2xl font-heading font-bold tracking-tight">
                {brandName}
              </span>
            </div>
            
            <p className="text-zinc-400 leading-relaxed max-w-sm">
              {brandDescription}
            </p>

            {/* Socials */}
            {socials.length > 0 && (
              <div className="flex items-center gap-3 pt-2">
                {socials.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300"
                    aria-label={s.platform}
                  >
                    <SocialIcon platform={s.platform} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Quick Links (Span 2) */}
          <div className="lg:col-span-2 lg:pl-4">
            <h4 className="font-bold text-lg mb-6 text-white">Company</h4>
            <ul className="space-y-3">
              {quickLinks.map((l, idx) => (
                <li key={idx}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center text-zinc-400 hover:text-primary transition-colors"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-300 mr-0 group-hover:mr-1 opacity-0 group-hover:opacity-100">›</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-lg mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              {topServices.map((s) => (
                <li key={s._id}>
                  <Link
                    href={`/services/${s.slug.current}`}
                    className="group inline-flex items-center text-zinc-400 hover:text-primary transition-colors"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-300 mr-0 group-hover:mr-1 opacity-0 group-hover:opacity-100">›</span>
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 mt-2"
                >
                  View All <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-lg mb-6 text-white">Contact Info</h4>
            <ul className="space-y-4">
              {(contact?.addressLine1 || contact?.addressLine2) && (
                <li className="flex items-start gap-3 text-zinc-400">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    {contact?.addressLine1}
                    {contact?.addressLine2 && <><br />{contact.addressLine2}</>}
                  </span>
                </li>
              )}
              
              {contact?.email && (
                <li className="flex items-center gap-3 text-zinc-400">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                    {contact.email}
                  </a>
                </li>
              )}

              {contact?.phoneDisplay && (
                <li className="pt-2">
                   <div className="text-sm text-zinc-500 mb-1">Support Line</div>
                   <a 
                     href={contact.phoneHref || "#"} 
                     className="text-xl font-bold text-white hover:text-primary transition-colors flex items-center gap-2"
                   >
                     <Phone className="w-5 h-5" />
                     {contact.phoneDisplay}
                   </a>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* --- Copyright --- */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <p>
            {settings?.footerLegal || `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link href="/faq" className="hover:text-zinc-300 transition-colors">Faqs</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}