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

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await client.fetch(singlePostQuery, { slug: params.slug })

  if (!post) return <div className="pt-32 text-center">Post not found</div>

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <article className="flex-1 container mx-auto px-4 pt-32 pb-20 max-w-4xl">
        <Button variant="ghost" asChild className="mb-8 pl-0 hover:bg-transparent hover:text-primary">
          <Link href="/blog" className="flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Back to Blog</Link>
        </Button>
        <header className="mb-12 space-y-6">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
             <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
             <span className="w-1 h-1 rounded-full bg-primary/50" />
             <span>By Team</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold">{post.title}</h1>
          {post.mainImage && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl mt-8">
              <Image src={urlFor(post.mainImage).width(1200).height(675).url()} alt={post.title} fill className="object-cover" priority />
            </div>
          )}
        </header>
        <div className="max-w-3xl mx-auto"><CustomPortableText value={post.body} /></div>
      </article>
      <Footer />
    </main>
  )
}