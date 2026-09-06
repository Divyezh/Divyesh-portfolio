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

// Shortened list for mobile & low-end devices
const SHORT_WORDS = ['Hello', 'Bonjour', 'Hola', 'नमस्ते']

function checkReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function checkIsMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
}

function checkIsLowEnd(): boolean {
  if (typeof window === 'undefined') return false
  const cores = navigator.hardwareConcurrency || 8
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 8
  return cores <= 4 || memory < 4
}

export type PreloaderPhase = 'cycling' | 'fading_content' | 'exiting' | 'done'

export function usePreloader(onComplete: () => void) {
  const counterRef = useRef<HTMLSpanElement>(null)
  const currentWordIndexRef = useRef(0)

  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState<PreloaderPhase>('cycling')
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isLowEnd: false,
    reducedMotion: false,
  })

  const wordsRef = useRef<string[]>(ALL_WORDS)

  // ── Device capability check on mount ───────────────────
  useEffect(() => {
    const reducedMotion = checkReducedMotion()
    const mobile = checkIsMobile()
    const lowEnd = checkIsLowEnd()

    const words = reducedMotion
      ? ['Hello']
      : mobile || lowEnd
      ? SHORT_WORDS
      : ALL_WORDS

    wordsRef.current = words
    setDeviceInfo({
      isMobile: mobile,
      isLowEnd: lowEnd,
      reducedMotion,
    })
  }, [])

  // ── RAF animation loop for word cycling & counter ──────
  useEffect(() => {
    if (phase !== 'cycling') return

    const words = wordsRef.current
    const totalWords = words.length
    const { reducedMotion, isMobile, isLowEnd } = deviceInfo

    // Reduced motion: skip cycling, rapid count to 100%
    const wordDuration = reducedMotion ? 350 : isMobile || isLowEnd ? 320 : 320
    const totalDuration = reducedMotion
      ? 350
      : Math.max((totalWords - 1) * wordDuration, 350)

    let rafId: number
    let startTime: number | null = null
    let lastCounterUpdate = 0
    let finished = false

    const loop = (now: number) => {
      if (finished) return

      if (startTime === null) {
        startTime = now
      }

      const elapsed = now - startTime
      const progress = Math.min(elapsed / totalDuration, 1)

      // Throttle counter DOM update to ~15 updates/sec (~66ms) to avoid main-thread saturation
      if (now - lastCounterUpdate >= 66 || progress >= 1) {
        lastCounterUpdate = now
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(progress * 100))
        }
      }

      // Update word index only when changing milestone (cuts React re-renders to only word changes)
      if (!reducedMotion) {
        const targetWordIndex = Math.min(
          Math.floor(elapsed / wordDuration),
          totalWords - 1
        )
        if (targetWordIndex !== currentWordIndexRef.current) {
          currentWordIndexRef.current = targetWordIndex
          setWordIndex(targetWordIndex)
        }
      }

      if (progress >= 1) {
        finished = true
        if (counterRef.current) {
          counterRef.current.textContent = '100'
        }

        // Stagger phases: hold 100% briefly, then fade content, then panel wipe
        const holdTime = reducedMotion ? 80 : 150
        const contentFadeTime = reducedMotion ? 0 : 150

        setTimeout(() => {
          setPhase('fading_content')
          setTimeout(() => {
            setPhase('exiting')
          }, contentFadeTime)
        }, holdTime)

        return
      }

      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [phase, deviceInfo])

  // ── Exit animation complete → unmount ───────────────────
  useEffect(() => {
    if (phase === 'exiting') {
      const exitDuration = deviceInfo.reducedMotion ? 250 : 580
      const timer = setTimeout(() => {
        setPhase('done')
        onComplete()
      }, exitDuration)
      return () => clearTimeout(timer)
    }
  }, [phase, deviceInfo.reducedMotion, onComplete])

  const words = wordsRef.current
  const activeWord = words[wordIndex] ?? words[0] ?? 'Hello'
  const isLastWord = wordIndex >= words.length - 1

  return {
    word: activeWord,
    isLastWord,
    phase,
    counterRef,
    isMobile: deviceInfo.isMobile,
    isLowEnd: deviceInfo.isLowEnd,
    reducedMotion: deviceInfo.reducedMotion,
  }
}
