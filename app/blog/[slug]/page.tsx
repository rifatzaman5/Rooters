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

// ✅ Fix: Type 'params' as a Promise
type Props = {
  params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: Props) {
  // ✅ Fix: Await the params before accessing the slug
  const { slug } = await params

  // Now fetch data using the resolved slug
  const post = await client.fetch(singlePostQuery, { slug })

  if (!post) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 text-center px-4">
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find a post with the slug: <br />
            <span className="font-mono bg-muted px-2 py-1 rounded text-sm mt-2 inline-block">{slug}</span>
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
      
      <article className="flex-1 container mx-auto px-4 pt-32 pb-20 max-w-4xl">
        {/* Back Link */}
        <Button variant="ghost" asChild className="mb-8 pl-0 hover:bg-transparent hover:text-primary">
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </Button>

        {/* Header */}
        <header className="mb-12 space-y-6">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
             {post.publishedAt && (
               <span>{new Date(post.publishedAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
             )}
             <span className="w-1 h-1 rounded-full bg-primary/50" />
             <span>By Rooters Team</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-balance">
            {post.title}
          </h1>

          {post.mainImage && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-border mt-8">
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
            <CustomPortableText value={post.body} />
          ) : (
            <p className="text-muted-foreground italic">No content available for this post.</p>
          )}
        </div>
      </article>

      <Footer />
    </main>
  )
}