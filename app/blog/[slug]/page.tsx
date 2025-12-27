import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomPortableText from '@/components/CustomPortableText'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { singlePostQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = 60

type Props = {
  params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = await client.fetch(singlePostQuery, { slug })

  if (!post) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 text-center px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">Post not found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find a post with the slug: <br />
            <span className="font-mono bg-muted px-2 py-1 rounded text-sm mt-2 inline-block text-primary">{slug}</span>
          </p>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <article className="flex-1 container mx-auto px-4 pt-28 pb-16 max-w-4xl">
        {/* Back Link */}
        <Button variant="ghost" asChild className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </Button>

        {/* Header */}
        <header className="mb-10 space-y-5">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {post.publishedAt && (
              <span>{new Date(post.publishedAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
            )}
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span>By Rooters Team</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight tracking-tight">
            {post.title}
          </h1>

          {post.mainImage && (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg border border-border mt-6">
              <Image
                src={urlFor(post.mainImage).width(1200).height(675).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          {post.body ? (
            <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-a:text-primary">
              <CustomPortableText value={post.body} />
            </div>
          ) : (
            <p className="text-muted-foreground italic">No content available for this post.</p>
          )}
        </div>
      </article>

      <Footer />
    </main>
  )
}