'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'

export default function CollaborateSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Scroll Trigger Parallax Motion
  const scaleCurves = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 0.88])
  const yLeftText = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [-40, 0, 40])
  const yRightText = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [40, 0, -40])
  const centerBtnScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.85, 1, 0.85])

  const handleStartClick = () => {
    const projectsEl = document.getElementById('projects')
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' })
    } else {
      const contactEl = document.getElementById('contact')
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="collaborate" 
      className="relative w-full h-screen min-h-[100dvh] bg-[#0e070c] text-white flex flex-col justify-between overflow-hidden py-8 px-6 md:px-16 select-none"
    >
      {/* 1. CORNER BRACKETS WITH INWARD TICK MARKS */}
      <div className="absolute top-8 left-6 md:left-12 pointer-events-none z-30">
        <div className="w-8 h-8 border-t-2 border-l-2 border-[#E66277]" />
        <div className="absolute top-0 left-0 w-3 h-[1px] bg-[#E66277]" />
      </div>
      <div className="absolute top-8 right-6 md:right-12 pointer-events-none z-30">
        <div className="w-8 h-8 border-t-2 border-r-2 border-[#E66277]" />
        <div className="absolute top-0 right-0 w-3 h-[1px] bg-[#E66277]" />
      </div>
      <div className="absolute bottom-8 left-6 md:left-12 pointer-events-none z-30">
        <div className="w-8 h-8 border-b-2 border-l-2 border-[#E66277]" />
        <div className="absolute bottom-0 left-0 w-3 h-[1px] bg-[#E66277]" />
      </div>
      <div className="absolute bottom-8 right-6 md:right-12 pointer-events-none z-30">
        <div className="w-8 h-8 border-b-2 border-r-2 border-[#E66277]" />
        <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-[#E66277]" />
      </div>

      {/* 2. CENTER VERTICAL 3D SHADOW TRENCH / COLUMN (CREATES 3D DEPTH ILLUSION) */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-28 sm:w-36 md:w-48 bg-gradient-to-r from-transparent via-[#040103]/95 to-transparent pointer-events-none z-10 shadow-[0_0_80px_rgba(0,0,0,0.9)]" />

      {/* 3. TWIN CURVED GLOW LINES & 3D DIAGONAL GUIDES (SCROLL PARALLAX TRIGGER) */}
      <motion.div
        style={{ scale: scaleCurves }}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      >
        <svg
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            {/* 3D Specular Glowing Rim Gradient */}
            <linearGradient id="glowingRim3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFC59E" />
              <stop offset="35%" stopColor="#E66277" />
              <stop offset="65%" stopColor="#FF8B9E" />
              <stop offset="100%" stopColor="#E66277" />
            </linearGradient>

            {/* Left 3D Wedge Shading */}
            <linearGradient id="left3DSurface" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#E66277" stopOpacity="0.32" />
              <stop offset="60%" stopColor="#AD4161" stopOpacity="0.12" />
              <stop offset="90%" stopColor="#1a0a14" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#040103" stopOpacity="0.9" />
            </linearGradient>

            {/* Right 3D Wedge Shading */}
            <linearGradient id="right3DSurface" x1="100%" y1="50%" x2="0%" y2="50%">
              <stop offset="0%" stopColor="#E66277" stopOpacity="0.32" />
              <stop offset="60%" stopColor="#AD4161" stopOpacity="0.12" />
              <stop offset="90%" stopColor="#1a0a14" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#040103" stopOpacity="0.9" />
            </linearGradient>

            {/* 3D Soft Ambient Shadow */}
            <radialGradient id="trenchShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* Intense Neon Glow Filter */}
            <filter id="neon3DGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="7" result="blur1" />
              <feGaussianBlur stdDeviation="18" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 3D DIAGONAL CORNER PERSPECTIVE LINES */}
          <line x1="0" y1="0" x2="520" y2="400" stroke="#E66277" strokeOpacity="0.35" strokeWidth="1.5" />
          <line x1="0" y1="800" x2="520" y2="400" stroke="#E66277" strokeOpacity="0.35" strokeWidth="1.5" />
          <line x1="1200" y1="0" x2="680" y2="400" stroke="#E66277" strokeOpacity="0.35" strokeWidth="1.5" />
          <line x1="1200" y1="800" x2="680" y2="400" stroke="#E66277" strokeOpacity="0.35" strokeWidth="1.5" />

          {/* LEFT 3D CURVED SURFACE FILL */}
          <path
            d="M 0,0 C 440,140 475,340 515,400 C 475,460 440,660 0,800 Z"
            fill="url(#left3DSurface)"
          />

          {/* LEFT 3D CURVED GLOWING RIM */}
          <path
            d="M 0,0 C 440,140 475,340 515,400 C 475,460 440,660 0,800"
            fill="none"
            stroke="url(#glowingRim3D)"
            strokeWidth="3.5"
            filter="url(#neon3DGlow)"
          />

          {/* RIGHT 3D CURVED SURFACE FILL */}
          <path
            d="M 1200,0 C 760,140 725,340 685,400 C 725,460 760,660 1200,800 Z"
            fill="url(#right3DSurface)"
          />

          {/* RIGHT 3D CURVED GLOWING RIM */}
          <path
            d="M 1200,0 C 760,140 725,340 685,400 C 725,460 760,660 1200,800"
            fill="none"
            stroke="url(#glowingRim3D)"
            strokeWidth="3.5"
            filter="url(#neon3DGlow)"
          />
        </svg>

        {/* Center Trench Ambient Depth Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#E66277]/20 blur-[90px] rounded-full pointer-events-none" />
      </motion.div>

      {/* 4. TOP VERTICAL GUIDE LINE & ACCENT RING DOT */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 h-[34%] w-[1px] bg-gradient-to-b from-[#E66277]/60 via-[#E66277]/30 to-transparent pointer-events-none z-20 hidden md:block">
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border border-[#E66277] bg-[#0e070c] flex items-center justify-center shadow-[0_0_10px_#E66277]">
          <div className="w-1 h-1 rounded-full bg-[#E66277]" />
        </div>
      </div>

      {/* 5. MAIN CONTENT (RESPONSIVE FLEX) */}
      <div className="relative z-20 my-auto w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-4">
        
        {/* LEFT SIDE — IDENTITY */}
        <motion.div
          style={{ y: yLeftText }}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-5 flex-1 justify-center md:justify-start text-center md:text-left drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
        >
          {/* 3D Geometric Logo Monogram */}
          <div className="w-16 h-16 sm:w-22 sm:h-22 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(230,98,119,0.6)]">
              {/* Outer 3D Diamond Frame */}
              <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="#E66277" strokeWidth="4" />
              <polygon points="50,12 88,50 50,88 12,50" fill="none" stroke="#FFC59E" strokeWidth="1.5" strokeOpacity="0.5" />
              {/* Monogram Fill */}
              <polygon points="50,20 80,50 50,80 20,50" fill="#E66277" opacity="0.18" />
              <path d="M 38,35 L 50,50 L 38,65 M 62,35 L 50,50 L 62,65" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Name & Handle */}
          <div className="flex flex-col">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              Divyesh Soni
            </h2>
            <span className="text-sm sm:text-base font-mono text-slate-400 tracking-wider mt-1">
              @Divyezh
            </span>
          </div>
        </motion.div>

        {/* CENTER — ROTATING 3D CIRCULAR BUTTON */}
        <motion.div
          style={{ scale: centerBtnScale }}
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center my-6 md:my-0 shrink-0 z-30"
        >
          <button
            onClick={handleStartClick}
            className="group relative w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="Click to start / Let's collaborate"
          >
            {/* 3D Ambient Glow Ring */}
            <div className="absolute inset-0 rounded-full bg-[#E66277]/30 blur-2xl group-hover:bg-[#E66277]/50 transition-all duration-300" />

            {/* 3D Dark Inner Circle Container */}
            <div className="absolute inset-2 rounded-full bg-[#060205] border border-[#E66277]/60 group-hover:border-[#E66277] shadow-[0_15px_40px_rgba(0,0,0,0.9),_inset_0_2px_4px_rgba(255,255,255,0.15)] transition-all duration-300" />

            {/* ROTATING TEXT RING */}
            <div className="absolute inset-0 animate-spin-slow pointer-events-none p-1">
              <svg viewBox="0 0 160 160" className="w-full h-full overflow-visible">
                <path
                  id="collabCirclePath3D"
                  d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                  fill="none"
                />
                <text className="fill-[#E66277] font-mono text-[8.5px] font-bold uppercase tracking-[0.24em]">
                  <textPath href="#collabCirclePath3D" startOffset="0%">
                    LET'S COLLABORATE ★ CLICK TO START ★ 
                  </textPath>
                </text>
              </svg>
            </div>

            {/* CENTER X / CROSS ICON */}
            <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#060205] border border-[#E66277] text-[#E66277] flex items-center justify-center group-hover:bg-[#E66277] group-hover:text-white shadow-[0_0_15px_rgba(230,98,119,0.4)] transition-all duration-300">
              <X className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:rotate-90" />
            </div>
          </button>
        </motion.div>

        {/* RIGHT SIDE — THE VISITOR */}
        <motion.div
          style={{ y: yRightText }}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center md:items-end text-center md:text-right flex-1 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
        >
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none">
            You
          </h2>
        </motion.div>
      </div>

      {/* 6. BOTTOM SUBTITLE / SPARKLE */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-20 flex items-center justify-center gap-2 text-xs font-mono text-slate-400 tracking-wider"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#E66277]" />
        <span>AVAILABLE FOR FREELANCE &amp; FULL-TIME ROLES</span>
      </motion.div>
    </section>
  )
}
