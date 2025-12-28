import Navbar from '@/components/Navbar'

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          {/* Skeleton loader */}
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded w-3/4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}