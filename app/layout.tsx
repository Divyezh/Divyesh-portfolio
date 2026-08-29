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
  metadataBase: new URL("https://divyesh-portfolio-phi.vercel.app"),
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Divyesh Soni | Full Stack Developer",
    description: "Full Stack Software Engineer with experience in Website, Mobile, and Software development. Check out my projects and skills.",
    url: "https://divyesh-portfolio-phi.vercel.app",
    siteName: "Divyesh Soni Portfolio",
    images: [
      {
        url: "/assets/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Divyesh Soni Developer Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divyesh Soni | Full Stack Developer",
    description: "Full Stack Software Engineer with experience in Website, Mobile, and Software development. Check out my projects and skills.",
    images: ["/assets/portfolio.png"],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Divyesh Soni",
    "url": "https://divyesh-portfolio-phi.vercel.app",
    "image": "https://divyesh-portfolio-phi.vercel.app/assets/portfolio.png",
    "sameAs": [
      "https://github.com/Divyezh",
      "https://www.linkedin.com/in/divyesh-soni-60a5bb2a6/"
    ],
    "jobTitle": "Full Stack Software Engineer & AI Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "description": "Full Stack Developer specializing in Next.js, React, Node.js, and generative AI products."
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-[#0e070c] overflow-x-hidden`}>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  )
}

