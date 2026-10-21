'use client'
import React, { useEffect, useState } from "react"
import HeroContent from "../sub/hero-content"
import { motion, useReducedMotion } from "framer-motion"

const DESKTOP_PARTICLE_COUNT = 6

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
    setIsMobile(
      window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
    )
  }, [])

  const showParticles = mounted && !isMobile && !shouldReduceMotion

  return (
    <div className="relative flex flex-col h-[100dvh] min-h-[640px] w-full bg-[#050508] overflow-hidden" id="about-me">
      {/* ─── VYRO INSPIRATION: STUDIO LIGHTING BACKGROUND ─── */}

      {/* 1. TOP-LEFT RICH ROYAL PURPLE / VIOLET ATMOSPHERE */}
      <div className="absolute -top-16 -left-16 w-[550px] sm:w-[720px] h-[550px] sm:h-[680px] bg-[radial-gradient(circle_at_30%_30%,rgba(124,58,237,0.85)_0%,rgba(99,102,241,0.55)_35%,rgba(67,56,202,0.22)_65%,transparent_85%)] blur-[75px] pointer-events-none z-[0]" />

      {/* 2. TOP-CENTER INCANDESCENT WHITE-LAVENDER BACKLIGHT (Exact VYRO studio aura directly behind head) */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] sm:w-[960px] h-[550px] sm:h-[620px] bg-[radial-gradient(ellipse_at_50%_25%,rgba(255,255,255,0.92)_0%,rgba(238,242,255,0.75)_22%,rgba(165,180,252,0.48)_42%,rgba(99,102,241,0.2)_65%,transparent_85%)] blur-[80px] pointer-events-none z-[0]" />

      {/* 3. TOP-RIGHT SOFT INDIGO / VIOLET DIFFUSION */}
      <div className="absolute -top-16 -right-16 w-[450px] sm:w-[620px] h-[500px] bg-[radial-gradient(circle_at_70%_30%,rgba(99,102,241,0.5)_0%,rgba(67,56,202,0.25)_40%,transparent_75%)] blur-[75px] pointer-events-none z-[0]" />

      {/* 4. THE GLOWING 3D U-CRESCENT ARC (Exact Motif from the VYRO reference image) */}
      <div className="absolute top-[16%] sm:top-[13%] left-1/2 -translate-x-1/2 w-[92%] max-w-[860px] pointer-events-none z-[0] flex items-center justify-center">
        <svg viewBox="0 0 1000 600" className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="crescentGradVyro" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818CF8" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#6366F1" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.85" />
            </linearGradient>
            <filter id="crescentGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Smooth U-shaped glowing arc framing the subject */}
          <path
            d="M 140, 180 C 140, 500 860, 500 860, 180"
            fill="none"
            stroke="url(#crescentGradVyro)"
            strokeWidth="32"
            strokeLinecap="round"
            filter="url(#crescentGlowFilter)"
          />
        </svg>
      </div>

      {/* 5. SMOOTH BOTTOM VELVET SHADOW (Keeping top radiant while bottom fades to black) */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 35%, rgba(5,5,8,0.5) 65%, #050508 100%)',
        }}
      />

      {/* 6. SUBTLE NOISE TEXTURE (Desktop only to prevent heavy mobile GPU rasterization) */}
      <div
        className="hidden md:block absolute inset-0 z-[2] opacity-[0.025] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* FLOATING PARTICLES — minimal */}
      {showParticles && (
        <div className="absolute inset-0 z-[0] pointer-events-none">
          {[...Array(DESKTOP_PARTICLE_COUNT)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                y: [null, Math.random() * -100 - 40],
                opacity: [0.1, 0.5, 0.1]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}

      {/* BOTTOM GRADIENT FADE */}
      <div
        className="absolute bottom-0 left-0 right-0 h-36 z-[3] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #050508)' }}
      />

      <div className="relative z-[10] w-full h-full flex flex-col justify-center">
        <HeroContent />
      </div>
    </div>
  )
}
