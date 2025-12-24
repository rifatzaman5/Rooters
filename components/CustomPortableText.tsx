import { PortableText } from '@portabletext/react'

// We add ': any' here to stop TypeScript from complaining about strict types
const components: any = {
  block: {
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mb-6 mt-10 font-heading">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mb-4 mt-8 font-heading text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold mb-3 mt-6 font-heading text-foreground">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-xl text-foreground/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
    ),
  },
}

export default function CustomPortableText({ value }: { value: any }) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* The error will be gone now because 'components' is typed as any */}
      <PortableText value={value} components={components} />
    </div>
  )
}