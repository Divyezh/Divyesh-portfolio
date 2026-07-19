import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import StarsCanvas from "@/components/main/star-background"

const inter = Inter({ subsets: ["latin"] })

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
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "Divyesh Soni - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divyesh Soni | Full Stack Developer",
    description: "Full Stack Software Engineer with experience in Website, Mobile, and Software development. Check out my projects and skills.",
    images: ["/hero.png"],
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
