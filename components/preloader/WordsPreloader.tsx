// components/preloader/WordsPreloader.tsx
'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePreloader } from './usePreloader'
import './preloader.css'

// ── GPU-only word transition variants (pure translateY + opacity) ──
const wordVariants = {
  initial: {
    y: 18,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    y: -14,
    opacity: 0,
    transition: {
      duration: 0.14,
      ease: [0.7, 0, 0.84, 0] as const,
    },
  },
}

interface WordsPreloaderProps {
  onComplete?: () => void
}

export default function WordsPreloader({ onComplete }: WordsPreloaderProps) {
  const {
    word,
    isLastWord,
    phase,
    counterRef,
    isMobile,
    isLowEnd,
    reducedMotion,
  } = usePreloader(() => onComplete?.())

  const isExiting = phase === 'exiting'
  const isContentFading = phase === 'fading_content' || isExiting

  if (phase === 'done') return null

  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      animate={reducedMotion && isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.25 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        overflow: 'hidden',
        pointerEvents: 'all',
        backgroundColor: reducedMotion ? '#0e070c' : 'transparent',
      }}
    >
      {/* ── DUAL PANEL CURTAIN WIPE (GPU accelerated translateY) ── */}
      {!reducedMotion && (
        <>
          {/* Top Panel: wipes upward */}
          <motion.div
            initial={{ y: '0%' }}
            animate={isExiting ? { y: '-101%' } : { y: '0%' }}
            transition={{
              duration: isMobile ? 0.45 : 0.55,
              ease: [0.76, 0, 0.24, 1] as const,
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '51%',
              backgroundColor: '#0e070c',
              zIndex: 1,
              willChange: 'transform',
            }}
          />

          {/* Bottom Panel: wipes downward */}
          <motion.div
            initial={{ y: '0%' }}
            animate={isExiting ? { y: '101%' } : { y: '0%' }}
            transition={{
              duration: isMobile ? 0.45 : 0.55,
              ease: [0.76, 0, 0.24, 1] as const,
              delay: isMobile ? 0 : 0.02,
            }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '51%',
              backgroundColor: '#0e070c',
              zIndex: 1,
              willChange: 'transform',
            }}
          />
        </>
      )}

      {/* ── CONTENT LAYER (Words, Counter, Indicators) ── */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        animate={isContentFading ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
        style={{ willChange: 'opacity' }}
      >
        {/* Static Radial Glow: rendered once, hidden on mobile/low-end/reduced-motion */}
        {!isMobile && !isLowEnd && !reducedMotion && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(230,98,119,0.18) 0%, transparent 70%)',
            }}
          />
        )}

        {/* Word Display */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={word}
              variants={wordVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex items-center gap-3 sm:gap-5"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Accent Dot */}
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#E66277] shrink-0" />

              {/* Word Typography */}
              <span
                className="preloader-word"
                style={{
                  fontSize: 'clamp(44px, 9vw, 110px)',
                  fontWeight: 200,
                  fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  color: isLastWord ? '#FFC59E' : '#FFFFFF',
                  ...(isLastWord && {
                    background: 'linear-gradient(90deg, #FFC59E, #FF9F9A, #E66277)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }),
                }}
              >
                {word}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Counter (Bottom-Right) - Decoupled from React state via direct DOM ref */}
        <div className="fixed bottom-6 right-8 sm:bottom-10 sm:right-12 z-20 flex items-baseline font-extralight select-none">
          <span
            ref={counterRef}
            className="text-white text-6xl sm:text-8xl lg:text-9xl font-extralight tracking-tight leading-none"
            style={{
              fontVariantNumeric: 'tabular-nums',
              minWidth: '3ch',
              display: 'inline-block',
              textAlign: 'right',
            }}
          >
            0
          </span>
          <span className="text-[#E66277] text-2xl sm:text-4xl lg:text-5xl font-light ml-1 sm:ml-2">
            %
          </span>
        </div>

        {/* Bottom-Left Label */}
        <div className="fixed bottom-8 left-8 sm:bottom-12 sm:left-12 z-20 flex items-center gap-2.5 font-mono text-[11px] sm:text-xs text-slate-400 tracking-[0.22em] uppercase select-none">
          <span className="w-2 h-2 rounded-full bg-[#E66277]" />
          <span>LOADING EXPERIENCE</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
