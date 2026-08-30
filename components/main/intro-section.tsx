'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'

export default function IntroSection() {
  const handleScrollToContent = () => {
    const heroEl = document.getElementById('about-me')
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="intro" 
      className="relative w-full h-screen min-h-[100dvh] bg-[#0e070c] text-white flex flex-col justify-between overflow-hidden pt-16 pb-8 px-6 md:px-16 select-none"
    >
      {/* 1. CORNER BRACKETS (L-SHAPED ACCENT LINES) */}
      <div className="absolute top-20 left-6 md:left-12 w-6 h-6 border-t-2 border-l-2 border-[#FFC59E]/40 pointer-events-none z-20" />
      <div className="absolute top-20 right-6 md:right-12 w-6 h-6 border-t-2 border-r-2 border-[#FFC59E]/40 pointer-events-none z-20" />
      <div className="absolute bottom-6 left-6 md:left-12 w-6 h-6 border-b-2 border-l-2 border-[#FFC59E]/40 pointer-events-none z-20" />
      <div className="absolute bottom-6 right-6 md:right-12 w-6 h-6 border-b-2 border-r-2 border-[#FFC59E]/40 pointer-events-none z-20" />

      {/* 2. TWIN CURVED GLOW SHAPES ("HOURGLASS" SILHOUETTE) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg
          viewBox="0 0 1000 800"
          preserveAspectRatio="none"
          className="w-full h-full opacity-35"
        >
          <defs>
            {/* Left Glow Gradient */}
            <linearGradient id="leftHourglassGlow" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#FFC59E" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#E66277" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0e070c" stopOpacity="0" />
            </linearGradient>

            {/* Right Glow Gradient */}
            <linearGradient id="rightHourglassGlow" x1="100%" y1="0%" x2="0%" y2="50%">
              <stop offset="0%" stopColor="#FFC59E" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#E66277" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0e070c" stopOpacity="0" />
            </linearGradient>

            {/* Soft SVG Blur */}
            <filter id="hourglassBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="35" />
            </filter>
          </defs>

          {/* Left Curved Wedge */}
          <path
            d="M 0,0 Q 440,400 0,800 Z"
            fill="url(#leftHourglassGlow)"
            filter="url(#hourglassBlur)"
          />

          {/* Right Curved Wedge (Mirrored) */}
          <path
            d="M 1000,0 Q 560,400 1000,800 Z"
            fill="url(#rightHourglassGlow)"
            filter="url(#hourglassBlur)"
          />
        </svg>

        {/* Ambient Center Radial Softener */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-[#FFC59E]/10 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* 3. VERTICAL GUIDE LINE & ACCENT DOT */}
      <div className="absolute top-14 left-1/2 -translate-x-1/2 bottom-1/2 w-[1px] bg-gradient-to-b from-[#FFC59E]/40 via-[#E66277]/20 to-transparent pointer-events-none z-10 hidden md:block">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFC59E] shadow-[0_0_8px_#FFC59E]" />
      </div>

      {/* 4. MAIN CONTENT CONTAINER (RESPONSIVE GRID / FLEX) */}
      <div className="relative z-10 my-auto w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 py-8">
        {/* LEFT SIDE — IDENTITY */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center md:items-start text-center md:text-left flex-1"
        >
          {/* Logo Mark / Emblem */}
          <div className="flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#FFC59E]">
              DIVYESH.DEV
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-white leading-none">
            Divyesh Soni
          </h1>
          <p className="text-sm sm:text-base font-mono text-slate-400 mt-2 tracking-wider flex items-center gap-1.5">
            <span className="text-[#FFC59E]">@</span>Divyezh
          </p>
        </motion.div>

        {/* CENTER — ROTATING CIRCULAR BUTTON */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center my-4 md:my-0 shrink-0 z-20"
        >
          <button
            onClick={handleScrollToContent}
            className="group relative w-32 h-32 sm:w-36 sm:h-36 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="Click to start / Scroll down"
          >
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 rounded-full bg-[#E66277]/20 blur-xl group-hover:bg-[#FFC59E]/30 transition-all duration-300" />

            {/* Glass Backdrop */}
            <div className="absolute inset-1 rounded-full bg-[#1a0e16]/80 backdrop-blur-xl border border-[#FFC59E]/30 group-hover:border-[#FFC59E]/60 shadow-[0_0_25px_rgba(255,197,158,0.15)] transition-all duration-300" />

            {/* ROTATING SVG TEXT RING */}
            <div className="absolute inset-0 animate-spin-slow pointer-events-none p-1">
              <svg viewBox="0 0 140 140" className="w-full h-full overflow-visible">
                <path
                  id="circleTextPath"
                  d="M 70, 70 m -52, 0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0"
                  fill="none"
                />
                <text className="fill-[#FFC59E] font-mono text-[9px] font-semibold uppercase tracking-[0.22em]">
                  <textPath href="#circleTextPath" startOffset="0%">
                    LET'S COLLABORATE • CLICK TO START • 
                  </textPath>
                </text>
              </svg>
            </div>

            {/* CENTER INTERACTION ICON */}
            <div className="relative z-10 w-11 h-11 rounded-full bg-[#FFC59E] text-[#0e070c] flex items-center justify-center shadow-lg group-hover:bg-white group-hover:scale-110 transition-all duration-300">
              <ArrowDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </div>
          </button>
        </motion.div>

        {/* RIGHT SIDE — THE VISITOR */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center md:items-end text-center md:text-right flex-1"
        >
          <div className="hidden md:flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md opacity-0">
            <span className="text-xs font-mono">VISITOR</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-white/90 leading-none">
            You
          </h2>
          <p className="text-sm sm:text-base font-mono text-slate-400 mt-2 tracking-wider">
            Future Collaborator
          </p>
        </motion.div>
      </div>

      {/* 5. BOTTOM SUBTITLE / SCROLL HINT */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 flex items-center justify-center gap-2 text-xs font-mono text-slate-400"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#FFC59E]" />
        <span>SELECT AN INTERACTION TO EXPLORE</span>
      </motion.div>
    </section>
  )
}
