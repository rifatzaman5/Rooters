import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { client } from '@/lib/sanity/client'
import { blogPageDataQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { ArrowRight } from 'lucide-react'
import Hero from '@/components/Hero'

export const revalidate = 60

export default async function BlogPage() {
  const { page, posts } = await client.fetch(blogPageDataQuery)

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {page?.hero ? (
        <Hero data={page.hero} />
      ) : (
        <div className="container mx-auto px-4 pt-28 pb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">Latest Insights</h1>
          <p className="text-base sm:text-lg text-muted-foreground">Updates from the team.</p>
        </div>
      )}
      
      <div className="flex-1 container mx-auto px-4 pb-16 pt-8">
        {posts && posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <Card key={post._id} className="group flex flex-col overflow-hidden border-border hover:border-primary/30 transition-all hover:shadow-md">
                <div className="relative h-48 w-full bg-muted overflow-hidden">
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).width(600).height(400).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground bg-muted/50">
                      No Image
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-background/90 text-foreground backdrop-blur-sm">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <h2 className="text-lg font-bold font-heading line-clamp-2 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug.current}`}>
                      {post.title}
                    </Link>
                  </h2>
                </CardHeader>
                
                <CardContent className="flex-grow pb-3">
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardContent>
                
                <CardFooter className="pt-0">
                  <Button variant="link" className="px-0 text-primary font-semibold h-auto" asChild>
                    <Link href={`/blog/${post.slug.current}`} className="flex items-center gap-1">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-muted/20 rounded-lg">
            <p className="text-lg text-muted-foreground">No blog posts found.</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}