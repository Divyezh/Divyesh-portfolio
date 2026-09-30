'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PortfolioPreloaderProps {
  onComplete: () => void
}

export default function PortfolioPreloader({ onComplete }: PortfolioPreloaderProps) {
  const [isExiting, setIsExiting] = useState(false)
  const counterRef = useRef<HTMLSpanElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Check if user prefers reduced motion or is search engine crawler
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      onComplete()
      return
    }

    const duration = 1200 // 1.2s total smooth duration
    const startTime = performance.now()
    let rafId: number

    const update = (now: number) => {
      const elapsed = now - startTime
      const rawProgress = Math.min(elapsed / duration, 1)

      // Smooth custom ease-out curve (fast start, silky deceleration)
      const progress = 1 - Math.pow(1 - rawProgress, 3)
      const percentage = Math.round(progress * 100)

      if (counterRef.current) {
        counterRef.current.textContent = `${percentage}%`
      }

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress * 100}%`
      }

      if (statusRef.current) {
        if (percentage < 40) {
          statusRef.current.textContent = 'INITIALIZING ARCHITECTURE'
        } else if (percentage < 85) {
          statusRef.current.textContent = 'LOADING CORE ARSENAL'
        } else {
          statusRef.current.textContent = 'EXPERIENCE READY'
        }
      }

      if (rawProgress < 1) {
        rafId = requestAnimationFrame(update)
      } else {
        // Hold briefly at 100% for satisfying visual closure, then trigger exit
        setTimeout(() => {
          setIsExiting(true)
          setTimeout(() => {
            onComplete()
          }, 450)
        }, 120)
      }
    }

    rafId = requestAnimationFrame(update)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-[#050508] flex flex-col items-center justify-center px-6 select-none overflow-hidden touch-none"
        >
          {/* Ambient Royal Indigo Studio Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none" />

          {/* Center Brand Monogram & Name */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Minimalist Diamond Monogram */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-6"
            >
              {/* Outer pulsing diamond */}
              <div className="absolute inset-0 rounded-2xl border border-indigo-500/40 rotate-45 animate-pulse" />
              <div className="absolute inset-1.5 rounded-xl border border-white/20 rotate-45" />

              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white drop-shadow-[0_0_12px_rgba(99,102,241,0.8)]">
                <path
                  d="M4 6L11 12L4 18M20 6L13 12L20 18"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* Monogram Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-[0.28em] uppercase text-white font-sans">
                DIVYESH SONI
              </h1>
              <p className="text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase text-indigo-300/80 mt-1">
                Full Stack &amp; AI Architect
              </p>
            </motion.div>

            {/* High-Precision Progress Bar */}
            <div className="w-56 sm:w-72 mt-8 flex flex-col items-center gap-2.5">
              <div className="relative w-full h-[2px] bg-white/[0.08] rounded-full overflow-hidden">
                <div
                  ref={progressBarRef}
                  className="h-full bg-gradient-to-r from-indigo-500 via-indigo-300 to-white rounded-full shadow-[0_0_12px_rgba(99,102,241,0.9)] transition-all duration-75 will-change-[width]"
                  style={{ width: '0%' }}
                />
              </div>

              {/* Progress Telemetry Readout */}
              <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span ref={statusRef} className="tracking-wider uppercase text-slate-400">
                  INITIALIZING ARCHITECTURE
                </span>
                <span
                  ref={counterRef}
                  className="text-white font-bold tracking-tight text-right ml-2 font-mono"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  0%
                </span>
              </div>
            </div>
          </div>

          {/* Bottom subtle indicator */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[9.5px] font-mono tracking-[0.22em] text-slate-500 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
            <span>PORTFOLIO SYSTEM // 2026</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
