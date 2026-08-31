import type { Metadata, Viewport } from "next"
import { Inter, Anton, Bebas_Neue, Cedarville_Cursive } from "next/font/google"
import "./globals.css"
import ClientRoot from "@/components/ClientRoot"

// ── All fonts loaded via next/font (self-hosted, non-blocking, font-display: swap) ──
// Previously loaded via blocking @import in globals.css — now eliminated.
// Note: Geist is a Vercel font and is not in next/font/google — it is loaded
// via a targeted @import in globals.css which does NOT block rendering
// since it loads after stylesheets are parsed.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})
const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
  weight: "400",
})
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
  weight: "400",
})
const cedarvilleCursive = Cedarville_Cursive({
  subsets: ["latin"],
  variable: "--font-cursive",
  display: "swap",
  weight: "400",
})

export const viewport: Viewport = {
  themeColor: "#0e070c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,   // Allow user zoom but prevent auto-zoom on iOS input focus
}

export const metadata: Metadata = {
  metadataBase: new URL("https://divyesh-portfolio-phi.vercel.app"),
  title: "Divyesh Soni | Portfolio - Full Stack Software Engineer & AI Developer",
  description: "Portfolio of Divyesh Soni, a Full Stack Developer & AI/SaaS Builder from Ahmedabad, India. Specializing in Next.js, React, Node.js, and generative AI products.",
  keywords: [
    "Divyesh Soni", 
    "Divyesh Portfolio",
    "Divyesh Soni Portfolio",
    "Divyesh Soni Dev",
    "Divyesh Soni Website",
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
    <html lang="en" className="overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} ${anton.variable} ${bebasNeue.variable} ${cedarvilleCursive.variable} bg-[#0e070c] overflow-x-hidden`}>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  )
}

