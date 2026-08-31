// components/preloader/WordsPreloader.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { usePreloader } from './usePreloader'
import './preloader.css'

const wordVariants = {
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
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    y: -60,
    x: -20,
    opacity: 0,
    rotate: -4,
    // NO filter: blur
    transition: {
      duration: 0.22,
      ease: [0.7, 0, 0.84, 0] as const,
    },
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
  const { word, isLastWord, counter, phase } = usePreloader(() => onComplete?.())
  const isExiting = phase === 'exiting'

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

            {/* ── STATIC RADIAL LIGHT AURA (no animate-pulse — GPU expensive on mobile) ── */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] rounded-full pointer-events-none z-[3]"
              style={{
                background: 'radial-gradient(circle, rgba(230,98,119,0.22) 0%, transparent 70%)',
              }}
            />

            {/* ── ULTRA-SLIM WORD DISPLAY WITH PINK DOT ACCENT ── */}
            <div className="absolute inset-0 flex items-center justify-center z-10 overflow-hidden px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={word}
                  variants={wordVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex items-center gap-3 sm:gap-5"
                >
                  {/* Pink Accent Dot */}
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#E66277] shadow-[0_0_10px_#E66277] shrink-0" />

                  {/* Ultra-Slim Word Typography */}
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
                        // drop-shadow kept (not blur — it's composited differently)
                        filter: 'drop-shadow(0 0 16px rgba(230, 98, 119, 0.5))',
                      }),
                    }}
                  >
                    {word}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── HUGE ULTRA-THIN COUNTER (BOTTOM-RIGHT) ── */}
            <motion.div
              className="fixed bottom-6 right-8 sm:bottom-10 sm:right-12 z-[10001] flex items-baseline font-extralight select-none pointer-events-none"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <span className="text-white text-6xl sm:text-8xl lg:text-9xl font-extralight tracking-tight leading-none">
                {counter}
              </span>
              <span className="text-[#E66277] text-2xl sm:text-4xl lg:text-5xl font-light ml-1 sm:ml-2">
                %
              </span>
            </motion.div>

            {/* ── BOTTOM-LEFT LABEL (ping dot replaced with static dot — less composite layers) ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
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
