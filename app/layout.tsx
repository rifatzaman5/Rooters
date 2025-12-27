import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import BackToTopButton from "@/components/BackToTopButton"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Rooters Website",
  description: "Professional plumbing services",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${poppins.variable} font-sans`}
      >
        {children}
        <BackToTopButton />
      </body>
    </html>
  )
}