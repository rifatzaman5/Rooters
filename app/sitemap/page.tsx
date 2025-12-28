import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { servicesQuery, postsQuery } from '@/lib/sanity/queries'

export const revalidate = 60

export default async function SitemapPage() {
  const [services, posts] = await Promise.all([
    client.fetch(servicesQuery),
    client.fetch(postsQuery),
  ])

  const mainPages = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Services', href: '/services' },
    { title: 'Contact', href: '/contact' },
    { title: 'Blog', href: '/blog' },
    { title: 'FAQ', href: '/faq' },
  ]

  const legalPages = [
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms' },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Sitemap</h1>
          <p className="text-lg text-muted-foreground">
            Browse all pages on our website
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Main Pages */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-heading border-b border-border pb-2">
              Main Pages
            </h2>
            <ul className="space-y-2">
              {mainPages.map((page) => (
                <li key={page.href}>
                  <Link 
                    href={page.href}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-heading border-b border-border pb-2">
              Services
            </h2>
            <ul className="space-y-2">
              {services.map((service: any) => (
                <li key={service._id}>
                  <Link 
                    href={`/services/${service.slug.current}`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog Posts */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-heading border-b border-border pb-2">
              Blog Posts
            </h2>
            <ul className="space-y-2">
              {posts.slice(0, 10).map((post: any) => (
                <li key={post._id}>
                  <Link 
                    href={`/blog/${post.slug.current}`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
            {posts.length > 10 && (
              <Link 
                href="/blog"
                className="text-primary hover:underline text-sm font-medium"
              >
                View all blog posts →
              </Link>
            )}
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-heading border-b border-border pb-2">
              Legal
            </h2>
            <ul className="space-y-2">
              {legalPages.map((page) => (
                <li key={page.href}>
                  <Link 
                    href={page.href}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}