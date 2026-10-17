'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Defer Three.js canvas so it is not in the critical path bundle
const StarsCanvas = dynamic(() => import('./main/star-background'), {
  ssr: false,
})

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Mount background canvas after initial paint has settled
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        const handle = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => setMounted(true))
        return () => (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle)
      } else {
        const timer = setTimeout(() => setMounted(true), 300)
        return () => clearTimeout(timer)
      }
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

