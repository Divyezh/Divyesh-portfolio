// components/preloader/WordsPreloader.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { usePreloader } from './usePreloader'
import './preloader.css'

// ── DESKTOP: full kinetic entry ───────────────────────────
const wordVariantsDesktop = {
  initial: {
    y: 60,
    x: 20,
    opacity: 0,
    rotate: 4,
  },
  animate: {
    y: 0,
    x: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    y: -50,
    x: -15,
    opacity: 0,
    rotate: -3,
    transition: {
      duration: 0.18,
      ease: [0.7, 0, 0.84, 0] as const,
    },
  },
}

// ── MOBILE: lightweight opacity-only fade — no translate/rotate ──
// Translate + rotate force repaints on low-end GPU; pure opacity is composited cheaply
const wordVariantsMobile = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.12, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1, ease: 'easeIn' as const },
  },
}

// ── PANEL WIPE VARIANTS ───────────────────────────────────
const panelVariants = {
  visible: { y: '0%' },
  exit: (delay: number) => ({
    y: '-102%',
    transition: {
      duration: 0.55,
      ease: [0.76, 0, 0.24, 1] as const,
      delay,
    },
  }),
}

const containerVariants = {
  visible: { opacity: 1 },
  exit: {
    opacity: 1,
    transition: { duration: 0, delay: 0.8 },
  },
}

interface WordsPreloaderProps {
  onComplete?: () => void
}

export default function WordsPreloader({ onComplete }: WordsPreloaderProps) {
  const { word, isLastWord, counter, phase, isMobile } = usePreloader(() => onComplete?.())
  const isExiting = phase === 'exiting'

  const wordVariants = isMobile ? wordVariantsMobile : wordVariantsDesktop

  return (
    <>
      <AnimatePresence mode="wait">
        {phase !== 'done' && (
          <motion.div
            key="preloader"
            variants={containerVariants}
            initial="visible"
            animate="visible"
            exit="exit"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              overflow: 'hidden',
              pointerEvents: 'all',
              backgroundColor: '#0e070c',
            }}
          >
            {/* ── TOP & BOTTOM CURVED EXIT PANELS ── */}
            <motion.div
              custom={0}
              variants={panelVariants}
              initial="visible"
              animate={isExiting ? 'exit' : 'visible'}
              className="preloader-panel"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '52%',
                background: '#0e070c',
                zIndex: 2,
              }}
            />

            <motion.div
              custom={0.08}
              variants={panelVariants}
              initial="visible"
              animate={isExiting ? 'exit' : 'visible'}
              className="preloader-panel"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '52%',
                background: '#0e070c',
                zIndex: 2,
              }}
            />

            {/* ── FULL BACKGROUND MASK ── */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: '#0e070c',
              zIndex: 1,
            }} />

            {/* ── RADIAL AURA — static, no pulse (cheap on mobile) ── */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] rounded-full pointer-events-none z-[3]"
              style={{
                background: 'radial-gradient(circle, rgba(230,98,119,0.20) 0%, transparent 70%)',
              }}
            />

            {/* ── WORD DISPLAY ── */}
            <div className="absolute inset-0 flex items-center justify-center z-10 overflow-hidden px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={word}
                  variants={wordVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex items-center gap-3 sm:gap-5"
                  style={{ willChange: 'opacity' }}
                >
                  {/* Pink Accent Dot */}
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#E66277] shadow-[0_0_10px_#E66277] shrink-0" />

                  {/* Word Typography */}
                  <span
                    className="preloader-word"
                    style={{
                      fontSize: 'clamp(44px, 9vw, 110px)',
                      fontWeight: 200,
                      fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      willChange: 'opacity',
                      color: isLastWord ? '#FFC59E' : '#FFFFFF',
                      ...(isLastWord && {
                        background: 'linear-gradient(90deg, #FFC59E, #FF9F9A, #E66277)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 16px rgba(230, 98, 119, 0.5))',
                      }),
                    }}
                  >
                    {word}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── COUNTER (BOTTOM-RIGHT) ── */}
            <motion.div
              className="fixed bottom-6 right-8 sm:bottom-10 sm:right-12 z-[10001] flex items-baseline font-extralight select-none pointer-events-none"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.35 }}
              style={{ willChange: 'transform, opacity' }}
            >
              <span
                className="text-white text-6xl sm:text-8xl lg:text-9xl font-extralight tracking-tight leading-none"
                style={{
                  fontVariantNumeric: 'tabular-nums',
                  minWidth: '3ch',
                  display: 'inline-block',
                  textAlign: 'right',
                }}
              >
                {counter}
              </span>
              <span className="text-[#E66277] text-2xl sm:text-4xl lg:text-5xl font-light ml-1 sm:ml-2">
                %
              </span>
            </motion.div>

            {/* ── BOTTOM-LEFT LABEL ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.35 }}
              className="fixed bottom-8 left-8 sm:bottom-12 sm:left-12 z-[10001] flex items-center gap-2.5 font-mono text-[11px] sm:text-xs text-slate-400 tracking-[0.22em] uppercase select-none pointer-events-none"
            >
              <span className="w-2 h-2 rounded-full bg-[#E66277] shadow-[0_0_8px_#E66277]" />
              <span>LOADING EXPERIENCE</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
