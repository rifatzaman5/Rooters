"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = React.useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  // Close menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsMobileServicesOpen(false)
  }, [pathname])

  const isHomeTop = isHome && !isScrolled

  const navbarClasses = cn(
    "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b",
    isHomeTop && "bg-background/80 backdrop-blur-md border-border/50",
    isScrolled && "bg-background/95 backdrop-blur-md border-border shadow-sm",
    !isHome && "bg-background border-border"
  )

  const textColorClass = "text-foreground"

  const navLinkClass = (href: string) => {
    const isActive =
      pathname === href || (href !== "/" && pathname?.startsWith(href + "/"))

    const base =
      "inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

    const hover = "hover:text-primary hover:bg-accent"
    const activeStyle = "text-primary bg-accent"

    return cn(
      base,
      textColorClass,
      hover,
      isActive && activeStyle
    )
  }

  const triggerClass = cn(
    "bg-transparent hover:text-primary hover:bg-accent focus:text-primary focus:bg-accent"
  )

  const services = [
    {
      title: "Plumbing Repair",
      href: "/services/plumbing-repair",
      description: "24/7 Repairs & Maintenance"
    },
    {
      title: "Heating Systems",
      href: "/services/heating-systems",
      description: "Furnace Install & Eco-Solutions"
    },
    {
      title: "AC & Cooling",
      href: "/services/ac-and-cooling",
      description: "Installation & Emergency Repair"
    },
    {
      title: "Drain Cleaning",
      href: "/services/drain-cleaning",
      description: "Hydro-jetting & Clog Removal"
    }
  ]

  const isActiveMobile = (href: string) =>
    pathname === href || pathname.startsWith(href + "/")

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsMobileServicesOpen(false)
  }

  return (
    <>
      <nav className={navbarClasses}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group relative z-50">
              <div className="h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-primary" />
              </div>
              <span
                className={cn(
                  "font-heading font-bold text-xl tracking-tight",
                  textColorClass
                )}
              >
                Heating and Cooling
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* Services Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={triggerClass}>
                      Services
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <ul className="grid gap-2 p-4 w-[450px] md:w-[500px]">
                        {/* View All Services - Highlighted */}
                        <li className="mb-1">
                          <NavigationMenuLink asChild>
                            <Link
                              href="/services"
                              className="flex items-center justify-between w-full select-none rounded-md bg-primary/5 border border-primary/20 p-3.5 no-underline outline-none transition-all hover:bg-primary/10 hover:border-primary/30 group"
                            >
                              <div>
                                <div className="text-sm font-semibold text-foreground mb-0.5">
                                  View All Services
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  Explore our complete range of solutions
                                </p>
                              </div>
                              <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </NavigationMenuLink>
                        </li>

                        {/* Divider */}
                        <div className="border-t border-border my-1" />

                        {/* Service Items Grid */}
                        <div className="grid grid-cols-2 gap-2">
                          {services.map((service) => (
                            <li key={service.href}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={service.href}
                                  className="block select-none space-y-1 rounded-md p-2.5 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium leading-none">
                                    {service.title}
                                  </div>
                                  <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                                    {service.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </div>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* About */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/about" className={navLinkClass("/about")}>
                        About
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* Blog */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/blog" className={navLinkClass("/blog")}>
                        Blog
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* FAQ */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/faq" className={navLinkClass("/faq")}>
                        FAQ
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* Contact */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/contact" className={navLinkClass("/contact")}>
                        Contact
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <Button asChild size="sm" className="hidden md:inline-flex font-semibold">
                <Link href="tel:+1 818-616-6963">Get a Quote</Link>
              </Button>

              <button
                className="md:hidden p-2 relative z-50"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className={cn(textColorClass, "h-5 w-5")} />
                ) : (
                  <Menu className={cn(textColorClass, "h-5 w-5")} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Mobile Menu Panel */}
          <div className="fixed top-[4.5rem] left-0 right-0 bottom-0 z-40 md:hidden animate-in slide-in-from-top duration-300">
            <div className="bg-background border-r border-border shadow-lg overflow-y-auto h-full">
              <div className="p-5 space-y-1">
                {/* Services Accordion */}
                <div className="border-b border-border pb-2">
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className={cn(
                      "w-full flex items-center justify-between py-2.5 font-semibold text-left transition-colors rounded-md px-2",
                      isActiveMobile("/services") ? "text-primary bg-accent" : "text-foreground hover:text-primary hover:bg-accent"
                    )}
                  >
                    <span>Services</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isMobileServicesOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Services Submenu with Animation */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isMobileServicesOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="pb-2 pt-2 space-y-2">
                      {/* View All Services */}
                      <Link
                        href="/services"
                        onClick={closeMobileMenu}
                        className="flex items-center justify-between w-full rounded-md bg-primary/5 border border-primary/20 p-3 transition-all hover:bg-primary/10 active:scale-[0.98] group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-foreground">
                            View All Services
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Explore complete range
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform flex-shrink-0" />
                      </Link>

                      {/* Service Links */}
                      <div className="space-y-1 pt-1">
                        {services.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            onClick={closeMobileMenu}
                            className="block rounded-md p-2.5 hover:bg-accent active:bg-accent/80 transition-colors"
                          >
                            <div className="text-sm font-medium text-foreground">
                              {service.title}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {service.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Other Links */}
                <Link
                  href="/about"
                  onClick={closeMobileMenu}
                  className={cn(
                    "block py-2.5 px-2 font-semibold transition-colors rounded-md border-b border-border hover:bg-accent",
                    isActiveMobile("/about") ? "text-primary bg-accent" : "text-foreground hover:text-primary"
                  )}
                >
                  About
                </Link>
                <Link
                  href="/blog"
                  onClick={closeMobileMenu}
                  className={cn(
                    "block py-2.5 px-2 font-semibold transition-colors rounded-md border-b border-border hover:bg-accent",
                    isActiveMobile("/blog") ? "text-primary bg-accent" : "text-foreground hover:text-primary"
                  )}
                >
                  Blog
                </Link>
                <Link
                  href="/faq"
                  onClick={closeMobileMenu}
                  className={cn(
                    "block py-2.5 px-2 font-semibold transition-colors rounded-md border-b border-border hover:bg-accent",
                    isActiveMobile("/faq") ? "text-primary bg-accent" : "text-foreground hover:text-primary"
                  )}
                >
                  FAQ
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className={cn(
                    "block py-2.5 px-2 font-semibold transition-colors rounded-md border-b border-border hover:bg-accent",
                    isActiveMobile("/contact") ? "text-primary bg-accent" : "text-foreground hover:text-primary"
                  )}
                >
                  Contact
                </Link>

                {/* Mobile CTA */}
                <div className="pt-4">
                  <Button asChild className="w-full" onClick={closeMobileMenu}>
                    <Link href="tel:+1 818-616-6963">Get a Quote</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}