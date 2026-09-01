// components/preloader/usePreloader.ts
'use client'
import { useState, useEffect, useRef } from 'react'

const ALL_WORDS = [
  'Hello',      // English
  'Bonjour',    // French
  'Ciao',       // Italian
  'Olá',        // Portuguese
  'Hola',       // Spanish
  'Hallo',      // German
  'Hallå',      // Swedish
  'こんにちは',  // Japanese
  'مرحبا',      // Arabic
  'नमस्ते',     // Hindi
]

// Shorter list on mobile — quicker, less jank
const MOBILE_WORDS = ['Hello', 'Hola', 'Bonjour', 'こんにちは', 'नमस्ते']

function isMobile() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
}

export function usePreloader(onComplete: () => void) {
  // Stable device check — captured once on mount, never re-evaluated mid-render
  const mobile = useRef(false)
  const words = useRef<string[]>(ALL_WORDS)
  const wordDuration = useRef(200)

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [counter, setCounter] = useState(0)
  const [phase, setPhase] = useState<'cycling' | 'exiting' | 'done'>('cycling')

  // ── One-time device capability detection ────────────────
  useEffect(() => {
    mobile.current = isMobile()
    words.current = mobile.current ? MOBILE_WORDS : ALL_WORDS
    wordDuration.current = mobile.current ? 160 : 200
  }, [])

  // ── Single RAF loop: advances words + keeps counter in lock-step ──
  useEffect(() => {
    if (phase !== 'cycling') return

    const WORDS = words.current
    const WD = wordDuration.current
    const totalWords = WORDS.length

    let wordIndex = 0
    let lastWordAt = performance.now()

    // Counter target per word — evenly distributed 0→99 across words,
    // 100 is reserved for the moment the last word locks in.
    const counterAtWord = (idx: number) =>
      idx >= totalWords - 1 ? 100 : Math.round((idx / (totalWords - 1)) * 99)

    let rafId: number
    let exiting = false

    const loop = (now: number) => {
      if (exiting) return

      const elapsed = now - lastWordAt

      if (elapsed >= WD) {
        wordIndex = Math.min(wordIndex + 1, totalWords - 1)
        lastWordAt = now

        setCurrentWordIndex(wordIndex)
        setCounter(counterAtWord(wordIndex))

        if (wordIndex >= totalWords - 1 && !exiting) {
          exiting = true
          // Small pause so the user sees 100% + last word before exit
          setTimeout(() => setPhase('exiting'), 200)
          return
        }
      } else {
        // Interpolate counter smoothly between word milestones
        const prevTarget = counterAtWord(wordIndex)
        const nextTarget = counterAtWord(Math.min(wordIndex + 1, totalWords - 1))
        const t = Math.min(elapsed / WD, 1)
        // ease-out so counter slows slightly before next word
        const easedT = 1 - Math.pow(1 - t, 2)
        setCounter(Math.round(prevTarget + (nextTarget - prevTarget) * easedT))
      }

      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(rafId)
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Exit → unmount ───────────────────────────────────────
  useEffect(() => {
    if (phase === 'exiting') {
      const t = setTimeout(() => {
        setPhase('done')
        onComplete()
      }, 620)
      return () => clearTimeout(t)
    }
  }, [phase, onComplete])

  return {
    word: words.current[currentWordIndex] ?? ALL_WORDS[currentWordIndex],
    wordIndex: currentWordIndex,
    isLastWord: currentWordIndex === (words.current.length || ALL_WORDS.length) - 1,
    counter,
    phase,
  }
}
