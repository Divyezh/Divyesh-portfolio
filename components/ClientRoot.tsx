// components/ClientRoot.tsx — 'use client' wrapper
'use client'
import React, { useState, useEffect } from 'react'
import StarsCanvas from './main/star-background'

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.body.style.overflow = ''
  }, [])

  return (
    <>
      <StarsCanvas />
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </>
  )
}

