import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { urlFor } from "@/lib/sanity/image"
import { ArrowRight } from "lucide-react"
import type { Post } from "@/types/sanity"

interface BlogSectionProps {
  posts: Post[]
  className?: string
  heading?: string
  description?: string
}

function formatDate(dateString?: string) {
  if (!dateString) return ""
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "2-digit" }).format(
    new Date(dateString)
  )
}

export default function BlogSection({
  posts,
  className,
  heading = "Latest Insights",
  description = "Tips, maintenance advice, and plumbing know-how from the Rooters team.",
}: BlogSectionProps) {
  if (!posts?.length) return null

  return (
    <section className={cn("relative py-16 sm:py-20 md:py-24 bg-background overflow-hidden", className)}>
      {/* Simple top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-border/50" />

      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-muted/20" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14 space-y-4">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
            {heading}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post) => (
            <Card
              key={post._id}
              className="group flex flex-col overflow-hidden border-border hover:border-primary/30 transition-all hover:shadow-md"
            >
              <div className="relative h-48 w-full bg-muted overflow-hidden">
                {post.mainImage?.asset ? (
                  <Image
                    src={urlFor(post.mainImage).width(800).height(520).url()}
                    alt={post.mainImage.alt || post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground bg-muted/50">
                    No Image
                  </div>
                )}

                {post.publishedAt && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-background/90 text-foreground backdrop-blur-sm">
                      {formatDate(post.publishedAt)}
                    </Badge>
                  </div>
                )}
              </div>

              <CardHeader className="pb-3">
                <h3 className="text-lg font-bold font-heading line-clamp-2 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
                </h3>
              </CardHeader>

              <CardContent className="flex-grow pb-3">
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{post.excerpt}</p>
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

        {/* View all */}
        <div className="mt-12 sm:mt-14 flex justify-center">
          <Button asChild size="lg" className="h-12 px-8 shadow-sm">
            <Link href="/blog" className="flex items-center gap-2">
              View All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}