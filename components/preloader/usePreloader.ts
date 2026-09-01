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

// 4 words on mobile — reduces total preloader time & stress
const MOBILE_WORDS = ['Hello', 'Hola', 'Bonjour', 'नमस्ते', 'Ciao', 'Hallo', 'Hallå',]

function isMobile() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
}

export function usePreloader(onComplete: () => void) {
  // Stable — captured once on first mount, never re-evaluated
  const mobileRef = useRef(false)
  const wordsRef = useRef<string[]>(ALL_WORDS)
  // Mobile: 450ms per word (100ms fade-in + 250ms display + 100ms fade-out = 450ms total)
  // Desktop: 420ms per word (320ms ease enter + display + 220ms ease exit)
  const wordDurationRef = useRef(420)

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [counter, setCounter] = useState(0)
  const [phase, setPhase] = useState<'cycling' | 'exiting' | 'done'>('cycling')
  const [isMobileState, setIsMobileState] = useState(false)

  // ── One-time device detection on mount ──────────────────
  useEffect(() => {
    const mobile = isMobile()
    mobileRef.current = mobile
    wordsRef.current = mobile ? MOBILE_WORDS : ALL_WORDS
    // Mobile word interval must be >= animIn + animOut
    // Mobile uses 100ms in + 100ms out = 200ms min → use 450ms for breathing room
    wordDurationRef.current = mobile ? 450 : 420
    setIsMobileState(mobile)
  }, [])

  // ── Single RAF loop ─────────────────────────────────────
  useEffect(() => {
    if (phase !== 'cycling') return

    const WORDS = wordsRef.current
    const WD = wordDurationRef.current
    const totalWords = WORDS.length

    let wordIndex = 0
    let lastWordAt = performance.now()
    let rafId: number
    let exiting = false

    // Counter value that maps to a given word index
    // 0 → first word = 0%, last word = 100%
    const counterAtWord = (idx: number) =>
      idx >= totalWords - 1
        ? 100
        : Math.round((idx / (totalWords - 1)) * 99)

    const loop = (now: number) => {
      if (exiting) return

      const elapsed = now - lastWordAt

      if (elapsed >= WD) {
        wordIndex = Math.min(wordIndex + 1, totalWords - 1)
        lastWordAt = now
        setCurrentWordIndex(wordIndex)
        setCounter(counterAtWord(wordIndex))

        if (wordIndex >= totalWords - 1) {
          exiting = true
          // Pause at 100% so user clearly sees it before exit
          setTimeout(() => setPhase('exiting'), 300)
          return
        }
      } else {
        // Smooth counter between word milestones with ease-out
        const from = counterAtWord(wordIndex)
        const to = counterAtWord(Math.min(wordIndex + 1, totalWords - 1))
        const t = Math.min(elapsed / WD, 1)
        const eased = 1 - Math.pow(1 - t, 2)
        setCounter(Math.round(from + (to - from) * eased))
      }

      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Exit complete → unmount ──────────────────────────────
  useEffect(() => {
    if (phase === 'exiting') {
      const t = setTimeout(() => {
        setPhase('done')
        onComplete()
      }, 640)
      return () => clearTimeout(t)
    }
  }, [phase, onComplete])

  return {
    word: wordsRef.current[currentWordIndex] ?? ALL_WORDS[currentWordIndex],
    wordIndex: currentWordIndex,
    isLastWord:
      currentWordIndex >=
      (wordsRef.current.length > 0 ? wordsRef.current.length : ALL_WORDS.length) - 1,
    counter,
    phase,
    isMobile: isMobileState,
  }
}
