'use client'

import React, { useEffect } from 'react'
import StarsCanvas from './main/star-background'

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  useEffect(() => {
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
