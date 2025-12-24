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
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const isHomeTop = isHome && !isScrolled

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b",
        isHomeTop
          ? "bg-background/60 backdrop-blur-md border-transparent"
          : "bg-background/95 backdrop-blur-md border-border shadow-sm"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50">
            <div className="h-9 w-9 rounded-full border-2 border-primary flex items-center justify-center bg-primary/10">
              <div className="h-4 w-4 rounded-full bg-primary" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-foreground">
              Rooters
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-primary/10 data-[active]:bg-primary/10">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                      <li className="row-span-4">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-br from-primary/80 to-primary p-6 no-underline outline-none focus:shadow-md"
                            href="/services"
                          >
                            <div className="mt-4 mb-2 text-lg font-medium text-white">
                              Green Energy
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Sustainable solutions for modern infrastructure and eco-friendly plumbing.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/services/plumbing-repair" title="Plumbing Repair">
                        24/7 Repairs & Maintenance
                      </ListItem>
                      <ListItem href="/services/heating-systems" title="Heating Systems">
                        Furnace Install & Eco-Solutions
                      </ListItem>
                      <ListItem href="/services/ac-and-cooling" title="AC & Cooling">
                        Installation & Emergency Repair
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50")}>
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* ADDED BLOG LINK HERE */}
                <NavigationMenuItem>
                  <Link href="/blog" legacyBehavior passHref>
                    <NavigationMenuLink className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50")}>
                      Blog
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50")}>
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <Button asChild className="hidden md:inline-flex shadow-lg shadow-primary/20">
              <Link href="/contact">Get a Quote</Link>
            </Button>

            <button
              className="md:hidden p-2 text-foreground z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col pt-32 px-6 transition-all duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-6 text-lg font-medium">
          <Link href="/services" className="border-b pb-4">Services</Link>
          <Link href="/about" className="border-b pb-4">About</Link>
          <Link href="/blog" className="border-b pb-4">Blog</Link>
          <Link href="/contact" className="border-b pb-4">Contact</Link>
          <Button asChild size="lg" className="mt-4 w-full">
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"