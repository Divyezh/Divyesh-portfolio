import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientRoot from "@/components/ClientRoot"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  themeColor: "#0e070c",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Divyesh Soni | Full Stack Software Engineer & AI Developer",
  description: "Portfolio of Divyesh Soni, a Full Stack Developer & AI/SaaS Builder from Ahmedabad, India. Specializing in Next.js, React, Node.js, and generative AI products.",
  keywords: [
    "Divyesh Soni", 
    "Software Engineer", 
    "Full Stack Developer", 
    "React Developer", 
    "Next.js Developer", 
    "AI Developer", 
    "India", 
    "Ahmedabad", 
    "Portfolio", 
    "Web Developer",
    "JavaScript",
    "TypeScript",
    "Three.js"
  ],
  authors: [{ name: "Divyesh Soni", url: "https://github.com/Divyezh" }],
  openGraph: {
    title: "Divyesh Soni | Full Stack Developer",
    description: "Full Stack Software Engineer with experience in Website, Mobile, and Software development. Check out my projects and skills.",
    url: "https://github.com/Divyezh/Divyesh-portfolio",
    siteName: "Divyesh Soni Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divyesh Soni | Full Stack Developer",
    description: "Full Stack Software Engineer with experience in Website, Mobile, and Software development. Check out my projects and skills.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "googled1a697e54b4ff7a7",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0e070c] overflow-x-hidden`}>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  )
}

