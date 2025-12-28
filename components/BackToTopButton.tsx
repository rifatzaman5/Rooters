"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ArrowUp } from "lucide-react"

export default function BackToTopButton() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-[60]",
        "h-11 w-11 rounded-full",
        "border border-border bg-background/95 backdrop-blur-sm",
        "text-foreground shadow-md",
        "transition-all duration-300",
        "hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg",
        "active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <ArrowUp className="h-5 w-5 mx-auto" />
    </button>
  )
}