'use client'

import React, { useState, useEffect } from 'react'
import StarsCanvas from './main/star-background'
import WordsPreloader from './preloader/WordsPreloader'

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Instantly bypass preloader for search engine crawlers & SEO auditors
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase()
      if (/bot|crawler|spider|googlebot|bingbot|lighthouse|mediapartners-google|slurp|duckduckbot/i.test(ua)) {
        setIsLoading(false)
        document.body.style.overflow = ''
        return
      }
    }

    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isLoading])

  return (
    <>
      {isLoading && <WordsPreloader onComplete={() => setIsLoading(false)} />}
      <StarsCanvas />
      <div className="relative z-10 w-full min-h-screen overflow-x-hidden">
        {children}
      </div>
    </>
  )
}

