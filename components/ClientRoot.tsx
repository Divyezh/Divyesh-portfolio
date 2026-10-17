'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Defer Three.js canvas so it is not in the critical path bundle (desktop only)
const StarsCanvas = dynamic(() => import('./main/star-background'), {
  ssr: false,
})

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // On mobile devices, avoid loading the heavy Three.js WebGL engine to preserve battery & CPU performance
    const isMobile =
      window.innerWidth < 768 ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isMobile) {
      // Mobile uses lightweight pure CSS styling
      return
    }

    // Desktop: mount background canvas during idle time
    if ('requestIdleCallback' in window) {
      const handle = (
        window as unknown as { requestIdleCallback: (cb: () => void) => number }
      ).requestIdleCallback(() => setMounted(true))
      return () =>
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle)
    } else {
      const timer = setTimeout(() => setMounted(true), 600)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <>
      {mounted && <StarsCanvas />}
      <div className="relative z-10 w-full min-h-screen overflow-x-hidden">
        {children}
      </div>
    </>
  )
}
