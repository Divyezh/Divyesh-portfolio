'use client'

import React, { useEffect, useRef } from 'react'

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    // Detect touch/mobile — Lenis on touch devices fights native momentum scroll
    // and adds a JS interpolation layer that causes perceived jank on phones.
    // Native scroll is faster and smoother on mobile, so skip Lenis entirely.
    const isTouchDevice =
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
       navigator.maxTouchPoints > 0 ||
       window.innerWidth < 768)

    if (isTouchDevice) {
      // Let native browser scroll handle it — zero JS overhead on mobile
      return
    }

    let isDestroyed = false
    let rafId: number

    // Dynamically import Lenis only for desktop users
    import('lenis').then(({ default: Lenis }) => {
      if (isDestroyed) return

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
      })

      lenisRef.current = lenis

      function raf(time: number) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)
    })

    return () => {
      isDestroyed = true
      if (rafId) cancelAnimationFrame(rafId)
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
    }
  }, [])

  return <>{children}</>
}
