// components/preloader/usePreloader.ts
'use client'
import { useState, useEffect, useRef } from 'react'

export const PRELOADER_WORDS = [
  'Hello',        // English
  'Bonjour',      // French
  'Ciao',         // Italian
  'Olá',          // Portuguese
  'Hola',         // Spanish
  'Hallo',        // German
  'Hallå',        // Swedish
  'こんにちは',     // Japanese
  'مرحبا',        // Arabic
  'नमस्ते',        // Hindi
]

export function usePreloader(onComplete: () => void) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [counter, setCounter] = useState(0)
  const [phase, setPhase] = useState<'cycling' | 'exiting' | 'done'>('cycling')
  const wordTimerRef = useRef<NodeJS.Timeout | null>(null)
  const counterRef = useRef<NodeJS.Timeout | null>(null)

  // ── Word cycling (fast & smooth) ─────────────────────
  useEffect(() => {
    if (phase !== 'cycling') return

    const wordDuration = 200  // fast & smooth ms per word
    const totalWords = PRELOADER_WORDS.length

    let index = 0
    const cycleWords = () => {
      index++
      if (index >= totalWords) {
        setCurrentWordIndex(totalWords - 1)
        setTimeout(() => setPhase('exiting'), 180)
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

  // ── Counter animation (syncs with words up to 100%) ────
  useEffect(() => {
    if (phase === 'done') return

    const totalDuration = PRELOADER_WORDS.length * 200 + 150
    const startTime = Date.now()

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / totalDuration, 1)
      const count = Math.floor(progress * 100)
      setCounter(count)

      if (count < 100) {
        counterRef.current = setTimeout(tick, 16)
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
      const exitTimer = setTimeout(() => {
        setPhase('done')
        onComplete()
      }, 600)
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
