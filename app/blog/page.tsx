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
import Hero from '@/components/Hero'

export const revalidate = 60

export default async function BlogPage() {
  // Fetch Page info AND Posts in one go
  const { page, posts } = await client.fetch(blogPageDataQuery)

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Optional: Use the Hero from Sanity if you filled it out on the Blog page */}
      {page?.hero ? (
        <Hero data={page.hero} />
      ) : (
        <div className="container mx-auto px-4 pt-32 pb-10 text-center">
             <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Latest Insights</h1>
             <p className="text-xl text-muted-foreground">Updates from the team.</p>
        </div>
      )}
      
      <div className="flex-1 container mx-auto px-4 pb-20 pt-10">
        {posts && posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Card key={post._id} className="group flex flex-col overflow-hidden border-border/60 hover:border-primary/50 transition-all hover:shadow-lg">
                <div className="relative h-60 w-full bg-muted overflow-hidden">
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).width(600).height(400).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground bg-muted/50">
                      No Image
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-background/80 text-foreground backdrop-blur-md hover:bg-background">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <h2 className="text-xl font-bold font-heading line-clamp-2 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug.current}`}>
                      {post.title}
                    </Link>
                  </h2>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
                
                <CardFooter className="pt-0">
                  <Button variant="link" className="px-0 text-primary font-semibold" asChild>
                    <Link href={`/blog/${post.slug.current}`}>
                      Read Article &rarr;
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-xl">
            <p className="text-xl text-muted-foreground">No blog posts found.</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}