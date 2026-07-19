import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import StarsCanvas from "@/components/main/star-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Divyesh Soni | Portfolio",
  description: "Frontend Developer & AI/SaaS Builder. Building LLM-first products from Ahmedabad, India.",
  keywords: ["react", "nextjs", "typescript", "ai", "portfolio", "frontend", "framer-motion"],
  authors: [{ name: "Divyesh Soni", url: "https://github.com/Divyezh" }],
  themeColor: "#030014",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}>
        <StarsCanvas />   {/* fixed amber starfield behind everything */}
        {children}
      </body>
    </html>
  )
}
