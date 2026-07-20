// components/preloader/WordsPreloader.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { usePreloader, PRELOADER_WORDS } from './usePreloader'
import './preloader.css'

// ── CURVED PATH MOTION VARIANTS ──────────────────────────
// This is the KEY to the Skiper8 feel.
// Words don't just slide up/down — they travel along a
// CURVED arc. We simulate this using:
//   x: a horizontal offset that creates the curve feel
//   y: vertical travel
//   rotate: slight tilt during travel
//   skewX: stretch during motion (kinetic feel)
//
// The entering word comes from BOTTOM-RIGHT → CENTER
// The exiting word goes from CENTER → TOP-LEFT
// Combined this creates the "rolling along a curve" effect.

const wordVariants = {
  // Word is about to enter — starts bottom-right, off-screen
  initial: {
    y: 80,
    x: 40,
    opacity: 0,
    rotate: 8,
    skewX: '6deg',
    filter: 'blur(4px)',
  },

  // Word is in CENTER — fully visible, settled
  animate: {
    y: 0,
    x: 0,
    opacity: 1,
    rotate: 0,
    skewX: '0deg',
    filter: 'blur(0px)',
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,  // Skiper8 signature easing
    },
  },

  // Word exits — travels up and to the left, curves away
  exit: {
    y: -80,
    x: -40,
    opacity: 0,
    rotate: -8,
    skewX: '-6deg',
    filter: 'blur(4px)',
    transition: {
      duration: 0.38,
      ease: [0.64, 0, 0.78, 0] as const,  // aggressive ease-in on exit
    },
  },
}

// ── PANEL WIPE VARIANTS ───────────────────────────────────
// Two panels sweep UP off the screen after words finish.
// Each panel is full-width, stacked, with a curved bottom.
const panelVariants = {
  visible: { y: '0%' },
  exit: (delay: number) => ({
    y: '-102%',
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1] as const,  // very aggressive ease for cinematic wipe
      delay,
    },
  }),
}

// ── CONTAINER VARIANTS ────────────────────────────────────
const containerVariants = {
  visible: { opacity: 1 },
  exit: {
    opacity: 1,  // container stays visible — panels handle the reveal
    transition: { duration: 0, delay: 1.1 },
  },
}

// ── SITE REVEAL VARIANTS ──────────────────────────────────
// The site content underneath appears after preloader exits
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const siteVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.1 },
  },
}

// ── COMPONENT ─────────────────────────────────────────────
interface WordsPreloaderProps {
  onComplete?: () => void
}

export default function WordsPreloader({ onComplete }: WordsPreloaderProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { word, wordIndex, isLastWord, counter, phase } =
    usePreloader(() => onComplete?.())

  const isExiting = phase === 'exiting'

  return (
    <>
      {/* ── PRELOADER OVERLAY ─────────────────────────── */}
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
              zIndex: 9999,
              overflow: 'hidden',
              pointerEvents: 'all',
            }}
          >
            {/* ── PANEL 1 (top half) ──────────────────── */}
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
                background: '#030014',   /* your portfolio bg color */
                zIndex: 2,
              }}
            />

            {/* ── PANEL 2 (bottom half) ───────────────── */}
            <motion.div
              custom={0.12}
              variants={panelVariants}
              initial="visible"
              animate={isExiting ? 'exit' : 'visible'}
              className="preloader-panel"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '52%',          /* slight overlap at center = no gap */
                background: '#030014',
                zIndex: 2,
              }}
            />

            {/* ── FULL BACKGROUND (behind panels) ───────── */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: '#030014',
              zIndex: 1,
            }} />

            {/* ── WORD DISPLAY ────────────────────────── */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3,
              overflow: 'hidden',
            }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={word}                    // key change triggers anim
                  variants={wordVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="preloader-word"
                  style={{
                    fontSize: 'clamp(48px, 8vw, 96px)',
                    fontWeight: 700,
                    fontFamily: '"Inter", system-ui, sans-serif',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    // Last word (name) gets purple gradient
                    ...(isLastWord
                      ? {
                          background: 'linear-gradient(90deg, #c084fc, #8b5cf6, #6d28d9)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          filter: 'drop-shadow(0 0 15px rgba(139, 92, 246, 0.6))',
                        }
                      : {
                          color: '#ffffff',
                        }),
                  }}
                >
                  {word}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* ── COUNTER (bottom-right) ───────────────── */}
            <motion.div
              className="preloader-counter"
              style={{ zIndex: 4 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {String(counter).padStart(2, '0')}%
            </motion.div>

            {/* ── BOTTOM-LEFT LABEL ───────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{
                position: 'fixed',
                bottom: 32,
                left: 40,
                zIndex: 4,
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 11,
                color: 'rgba(255,255,255,0.25)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Loading Portfolio
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
