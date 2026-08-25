'use client'
import dynamic from 'next/dynamic'

// Lazy-load FlowingNavbar to avoid SSR issues with GSAP
const FlowingNavbar = dynamic(() => import('./flowing-navbar'), { ssr: false })

export default function Navbar() {
  return <FlowingNavbar />
}
