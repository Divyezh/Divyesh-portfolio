// components/preloader/usePreloader.ts
'use client'
import { useState, useEffect, useRef } from 'react'

// ── WORD LIST ─────────────────────────────────────────────
// The exact multilingual "hello" list from dennissnellenberg
// style — cycling through languages to show global reach.
// Customised for Divyesh: ends on his name.
export const PRELOADER_WORDS = [
  'Hello',        // English
  'Bonjour',      // French
  'Ciao',         // Italian
  'Olá',          // Portuguese
  'Hola',         // Spanish
  'Hallo',        // German
  'こんにちは',     // Japanese
  'مرحبا',        // Arabic
  'नमस्ते',        // Hindi
  'Divyesh',      // — ends on his name (amber colored)
]

// ── HOOK ─────────────────────────────────────────────────
export function usePreloader(onComplete: () => void) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [counter, setCounter] = useState(0)
  const [phase, setPhase] = useState<'cycling' | 'exiting' | 'done'>('cycling')
  const wordTimerRef = useRef<NodeJS.Timeout | null>(null)
  const counterRef = useRef<NodeJS.Timeout | null>(null)

  // ── Word cycling ──────────────────────────────────────
  useEffect(() => {
    if (phase !== 'cycling') return

    const wordDuration = 320  // ms per word
    const totalWords = PRELOADER_WORDS.length

    let index = 0
    const cycleWords = () => {
      index++
      if (index >= totalWords) {
        // All words shown — trigger exit phase
        setCurrentWordIndex(totalWords - 1)  // hold on last word (name)
        setTimeout(() => setPhase('exiting'), 300) // Reduced from 600ms
        return
      }
      setCurrentWordIndex(index)
      wordTimerRef.current = setTimeout(cycleWords, wordDuration)
    }

    wordTimerRef.current = setTimeout(cycleWords, wordDuration)

    return () => {
      if (wordTimerRef.current) clearTimeout(wordTimerRef.current)
    }
  }, [phase])

  // ── Counter ───────────────────────────────────────────
  useEffect(() => {
    if (phase === 'done') return

    // Non-linear counter: accelerates toward 100
    // Mimics real loading feel
    const totalDuration = PRELOADER_WORDS.length * 320 + 200  // ~ms
    const startTime = Date.now()

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / totalDuration, 1)
      // Ease: power2.out feel (fast start, slow end → but we want slow start, fast end)
      const easedProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2
      const count = Math.floor(easedProgress * 100)
      setCounter(count)

      if (count < 100) {
        counterRef.current = setTimeout(tick, 16)  // ~60fps
      } else {
        setCounter(100)
      }
    }

    counterRef.current = setTimeout(tick, 16)
    return () => { if (counterRef.current) clearTimeout(counterRef.current) }
  }, [phase])

  // ── Exit complete → unmount ───────────────────────────
  useEffect(() => {
    if (phase === 'exiting') {
      // Wait for panel wipe animation to finish, then unmount
      const exitTimer = setTimeout(() => {
        setPhase('done')
        onComplete()
      }, 700)  // Reduced from 1200ms
      return () => clearTimeout(exitTimer)
    }
  }, [phase, onComplete])

  return {
    word: PRELOADER_WORDS[currentWordIndex],
    wordIndex: currentWordIndex,
    isLastWord: currentWordIndex === PRELOADER_WORDS.length - 1,
    counter,
    phase,
  }
}
