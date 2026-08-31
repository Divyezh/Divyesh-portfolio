'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Cpu, Zap, Code2, Layers, ArrowRight } from 'lucide-react'

export default function CharacterScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const targetTimeRef = useRef<number>(0)
  const animFrameRef = useRef<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile on mount
  useEffect(() => {
    const mobile =
      window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
    setIsMobile(mobile)
  }, [])

  // Scroll Progress Tracking across sticky 300vh section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Ultra-smooth physics spring for silky horizontal sliding
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.0001,
  })

  // Synchronize Video currentTime with scroll progress — desktop only
  // Mobile: video scrubbing is unreliable and kills performance
  useEffect(() => {
    if (isMobile) return
    const video = videoRef.current
    if (!video) return

    const updateVideoFrame = () => {
      if (video && video.duration && !isNaN(video.duration)) {
        const diff = targetTimeRef.current - video.currentTime
        if (Math.abs(diff) > 0.005) {
          video.currentTime += diff * 0.25 // Smooth lerp
        }
      }
      animFrameRef.current = requestAnimationFrame(updateVideoFrame)
    }

    animFrameRef.current = requestAnimationFrame(updateVideoFrame)

    const unsubscribe = smoothProgress.on('change', (progress) => {
      if (video && video.duration) {
        targetTimeRef.current = Math.min(
          video.duration - 0.04,
          Math.max(0, video.duration * progress)
        )
      }
    })

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      unsubscribe()
    }
  }, [smoothProgress, isMobile])

  // Direct Horizontal Scroll Translation
  const horizontalX = useTransform(smoothProgress, [0, 1], ['0%', '-80%'])
  const progressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[300vh] bg-[#0e070c] text-white z-20 select-none"
    >
      {/* STICKY FULL-SCREEN VIEWPORT CONTAINER */}
      <div className="sticky top-0 h-screen w-screen overflow-hidden flex items-center justify-center">

        {/* 1. FULL-PAGE COVER VIDEO BACKDROP (desktop) / GRADIENT BACKDROP (mobile) */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          {isMobile ? (
            /* Mobile: static gradient — no video download/scrub overhead */
            <div
              className="w-full h-full"
              style={{
                background:
                  'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(230,98,119,0.18) 0%, rgba(14,7,12,0.95) 70%), #0e070c',
              }}
            />
          ) : (
            <video
              ref={videoRef}
              src="/Animating_2D_character_hand_motion_202608301046.mp4"
              muted
              playsInline
              preload="metadata"   // Only load duration/dimensions — not the full file
              className="w-full h-full object-cover object-center"
            />
          )}
          {/* Subtle Ambient Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e070c] via-transparent to-[#0e070c]/60 pointer-events-none" />
        </div>

        {/* 2. DIRECT HORIZONTAL SCROLL CARDS TRACK */}
        <div className="relative z-20 w-full flex items-center overflow-visible">
          <motion.div
            style={{ x: horizontalX }}
            className="flex items-center gap-8 sm:gap-12 px-12 sm:px-24 md:px-32 w-max"
          >
            {/* INTRO TITLE CARD IN HORIZONTAL TRACK */}
            <div className="w-[300px] sm:w-[380px] p-6 sm:p-8 rounded-3xl glass-card border border-[#E66277]/60 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between shrink-0">
              <div>
                <span className="text-xs font-mono font-bold text-[#FFC59E] uppercase tracking-widest flex items-center gap-2 mb-3">
                  <ArrowRight className="w-4 h-4 text-[#E66277]" />
                  HORIZONTAL SCROLL TRACK
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                  Interactive Telemetry
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
                  Scroll down to slide cards horizontally across the backdrop.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-[#E66277] font-bold">
                SCROLL RIGHT →
              </div>
            </div>

            {/* CARD 1: FULL STACK ARCHITECTURE */}
            <div className="w-[320px] sm:w-[420px] lg:w-[480px] p-6 sm:p-8 rounded-3xl glass-card border border-[#E66277]/50 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between shrink-0">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#FFC59E] uppercase tracking-widest flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#E66277]" />
                    FEATURED TECH 01
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E66277]/20 border border-[#E66277]/40 text-[10px] font-mono text-white">
                    ACTIVE
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                  Full-Stack Architecture
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
                  Engineered with Next.js 14, React 19, TypeScript, and server-sent event streaming pipelines for production performance.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>REACTIVE ENGINE</span>
                <span className="text-[#FFC59E]">99.9% UPTIME</span>
              </div>
            </div>

            {/* CARD 2: GENERATIVE AI & CLAUDE */}
            <div className="w-[320px] sm:w-[420px] lg:w-[480px] p-6 sm:p-8 rounded-3xl glass-card border border-[#E66277]/50 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between shrink-0">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#FFC59E] uppercase tracking-widest flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#E66277]" />
                    FEATURED TECH 02
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E66277]/20 border border-[#E66277]/40 text-[10px] font-mono text-white">
                    STREAMING
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                  Generative AI Pipelines
                </h3>
                <p className="text-xs sm:text-sm text-[#E66277]/90 font-mono leading-relaxed">
                  Anthropic Claude &amp; OpenAI API prompt-chaining with real-time SSE token streaming reducing perceived latency by 45%.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>LLM INTEGRATION</span>
                <span className="text-[#FFC59E]">45% LATENCY REDUCTION</span>
              </div>
            </div>

            {/* CARD 3: TYPE-SAFE DATABASE & PRISMA */}
            <div className="w-[320px] sm:w-[420px] lg:w-[480px] p-6 sm:p-8 rounded-3xl glass-card border border-[#E66277]/50 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between shrink-0">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#FFC59E] uppercase tracking-widest flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[#E66277]" />
                    FEATURED TECH 03
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono text-emerald-400">
                    TYPE-SAFE
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                  Prisma &amp; PostgreSQL Tier
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
                  Relational data models, optimized index queries, JWT authentication, and resilient API routing architecture.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>PERSISTENCE LAYER</span>
                <span className="text-[#FFC59E]">ZERO DOWNTIME</span>
              </div>
            </div>

            {/* CARD 4: PRODUCTION SPEED & DEPLOYMENT */}
            <div className="w-[320px] sm:w-[420px] lg:w-[480px] p-6 sm:p-8 rounded-3xl glass-card border border-[#E66277]/50 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col justify-between shrink-0">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#FFC59E] uppercase tracking-widest flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#E66277]" />
                    FEATURED TECH 04
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-[10px] font-mono text-purple-300">
                    READY
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                  Production Speed
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
                  Decoupled modular architecture engineered for maximum performance, clean maintenance, and rapid cloud deployment.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>VERCEL HOSTED</span>
                <span className="text-[#FFC59E]">100% RESPONSIVE</span>
              </div>
            </div>

          </motion.div>
        </div>

        {/* 3. BOTTOM HORIZONTAL PROGRESS SCRUB BAR */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4">
          <div className="w-full h-1.5 rounded-full bg-white/15 overflow-hidden p-0.5 border border-white/20 shadow-lg">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full rounded-full bg-gradient-to-r from-[#FFC59E] via-[#E66277] to-[#AD4161] shadow-[0_0_12px_#E66277]"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
