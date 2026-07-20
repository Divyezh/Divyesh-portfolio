// components/ClientRoot.tsx — 'use client' wrapper
'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import StarsCanvas from './main/star-background'

// Lazy load preloader — don't block first paint
const WordsPreloader = dynamic(
  () => import('./preloader/WordsPreloader'),
  { ssr: false }
)

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const [showPreloader, setShowPreloader] = useState(true)
  const [preloaderDone, setPreloaderDone] = useState(false)

  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development'
    const seen = sessionStorage.getItem('preloader-done')
    // Always show preloader in development so you can test it easily!
    if (seen === 'true' && !isDev) {
      setShowPreloader(false)
      setPreloaderDone(true)
    }

    // Lock scroll during preloader
    if (showPreloader) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showPreloader])

  const handleDone = () => {
    sessionStorage.setItem('preloader-done', 'true')
    document.body.style.overflow = ''
    setPreloaderDone(true)
    setTimeout(() => setShowPreloader(false), 200)
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader && (
          <WordsPreloader key="preloader" onComplete={handleDone} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: preloaderDone ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <StarsCanvas />
        {children}
      </motion.div>
    </>
  )
}
