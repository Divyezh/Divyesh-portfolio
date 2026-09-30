'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { X } from 'lucide-react'

export default function CollaborateSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Scroll Parallax Scale for central node
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
      className="relative w-full min-h-[650px] sm:min-h-screen bg-[#050508] text-white flex flex-col justify-between items-center overflow-hidden py-8 px-4 sm:px-8 select-none"
    >
      {/* ── 3D X STAGE CONTAINER (UNIFIED COORDINATE SPACE FOR SVG & CENTER CIRCLE) ── */}
      <div className="relative w-full max-w-7xl h-[440px] sm:h-[540px] md:h-[600px] my-auto flex items-center justify-center">

        {/* 1. OUTER HUD FRAME BOX */}
        <div className="absolute inset-0 border border-indigo-500/25 pointer-events-none z-10 rounded-sm">
          {/* TOP-LEFT CORNER BRACKET */}
          <div className="absolute -top-[2px] -left-[2px] w-6 h-6 sm:w-10 sm:h-10 border-t-2 border-l-2 border-indigo-400" />
          <div className="absolute top-0 left-0 w-3 h-[1px] bg-indigo-400" />

          {/* TOP-RIGHT CORNER BRACKET */}
          <div className="absolute -top-[2px] -right-[2px] w-6 h-6 sm:w-10 sm:h-10 border-t-2 border-r-2 border-indigo-400" />
          <div className="absolute top-0 right-0 w-3 h-[1px] bg-indigo-400" />

          {/* BOTTOM-LEFT CORNER BRACKET */}
          <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 sm:w-10 sm:h-10 border-b-2 border-l-2 border-indigo-400" />
          <div className="absolute bottom-0 left-0 w-3 h-[1px] bg-indigo-400" />

          {/* BOTTOM-RIGHT CORNER BRACKET */}
          <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 sm:w-10 sm:h-10 border-b-2 border-r-2 border-indigo-400" />
          <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-indigo-400" />
        </div>

        {/* 2. CENTER VERTICAL SHADOW COLUMN & BEAM */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-28 sm:w-40 md:w-52 bg-gradient-to-r from-transparent via-[#050508]/95 to-transparent pointer-events-none z-10 shadow-[0_0_100px_rgba(0,0,0,0.95)]" />
        <div className="absolute top-1/2 bottom-0 left-1/2 -translate-x-1/2 w-16 sm:w-28 bg-gradient-to-b from-indigo-500/30 via-indigo-500/10 to-transparent pointer-events-none z-10 blur-2xl" />

        {/* 3. 3D CONVERGING SVG LASER ARMS & TRIANGLES (VERTEX AT EXACT MIDPOINT 500,300) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <svg
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="slimLaserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C7D2FE" />
                <stop offset="60%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>

              <linearGradient id="thickWedgeGradLeft" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.55" />
                <stop offset="50%" stopColor="#4338CA" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0.05" />
              </linearGradient>

              <linearGradient id="thickWedgeGradRight" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.55" />
                <stop offset="50%" stopColor="#4338CA" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0.05" />
              </linearGradient>

              <filter id="laserGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur1" />
                <feGaussianBlur stdDeviation="12" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* LOWER THICK WEDGE TRIANGLES (MEETING AT 500,300) */}
            <path d="M 500,300 L 0,600 L 0,440 Z" fill="url(#thickWedgeGradLeft)" />
            <line x1="500" y1="300" x2="0" y2="600" stroke="url(#slimLaserGrad)" strokeWidth="8" filter="url(#laserGlowFilter)" />
            <line x1="500" y1="300" x2="0" y2="440" stroke="#6366F1" strokeOpacity="0.45" strokeWidth="2.5" />

            <path d="M 500,300 L 1000,600 L 1000,440 Z" fill="url(#thickWedgeGradRight)" />
            <line x1="500" y1="300" x2="1000" y2="600" stroke="url(#slimLaserGrad)" strokeWidth="8" filter="url(#laserGlowFilter)" />
            <line x1="500" y1="300" x2="1000" y2="440" stroke="#6366F1" strokeOpacity="0.45" strokeWidth="2.5" />

            {/* UPPER SLIM LASER ARMS (MEETING AT 500,300) */}
            <line x1="500" y1="300" x2="0" y2="0" stroke="url(#slimLaserGrad)" strokeWidth="2.5" filter="url(#laserGlowFilter)" />
            <line x1="500" y1="300" x2="0" y2="0" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.85" />

            <line x1="500" y1="300" x2="1000" y2="0" stroke="url(#slimLaserGrad)" strokeWidth="2.5" filter="url(#laserGlowFilter)" />
            <line x1="500" y1="300" x2="1000" y2="0" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.85" />

            {/* Secondary thin perspective guide lines */}
            <line x1="500" y1="300" x2="0" y2="120" stroke="#6366F1" strokeOpacity="0.25" strokeWidth="1" />
            <line x1="500" y1="300" x2="1000" y2="120" stroke="#6366F1" strokeOpacity="0.25" strokeWidth="1" />
          </svg>

          {/* Central Radial Light Bloom centered at 50% 50% */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-indigo-600/30 blur-[110px] rounded-full pointer-events-none" />
        </div>

        {/* 4. LEFT IDENTITY — DIVYESH SONI (ANCHORED LEFT) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-2.5 sm:left-10 md:left-14 top-1/2 -translate-y-1/2 z-20 flex items-center gap-2 sm:gap-4 drop-shadow-[0_10px_25px_rgba(0,0,0,0.95)] pointer-events-auto"
        >
          {/* Monogram Diamond Logo */}
          <div className="w-7 h-7 sm:w-12 sm:h-12 md:w-14 md:h-14 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(99,102,241,0.8)]">
              <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="#6366F1" strokeWidth="4" />
              <polygon points="50,12 88,50 50,88 12,50" fill="none" stroke="#C7D2FE" strokeWidth="1.5" strokeOpacity="0.6" />
              <polygon points="50,20 80,50 50,80 20,50" fill="#6366F1" opacity="0.22" />
              <path d="M 38,35 L 50,50 L 38,65 M 62,35 L 50,50 L 62,65" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Name & Handle */}
          <div className="flex flex-col text-left">
            <h2 className="text-xs sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-white leading-snug whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              Divyesh Soni
            </h2>
            <span className="text-[9px] sm:text-xs font-mono text-indigo-300 tracking-wider whitespace-nowrap mt-0.5">
              @Divyezh
            </span>
          </div>
        </motion.div>

        {/* 5. CENTER CIRCULAR BUTTON NODE WRAPPER */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center pointer-events-auto">
          <motion.div
            style={{ scale: centerBtnScale }}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <button
              onClick={handleStartClick}
              className="group relative w-14 h-14 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none shadow-2xl"
              aria-label="Click to start collaboration"
            >
              {/* Outer Ambient Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-indigo-500/40 blur-xl group-hover:bg-indigo-500/70 transition-all duration-300" />

              {/* Inner Dark Circular Container */}
              <div className="absolute inset-1.5 rounded-full bg-[#050508] border border-indigo-500/80 group-hover:border-indigo-400 shadow-[0_15px_40px_rgba(0,0,0,0.95),_inset_0_2px_4px_rgba(255,255,255,0.2)] transition-all duration-300" />

              {/* ROTATING SVG TEXT PATH */}
              <div className="absolute inset-0 animate-spin-slow pointer-events-none p-0.5">
                <svg viewBox="0 0 160 160" className="w-full h-full overflow-visible">
                  <path
                    id="collabCirclePath3D"
                    d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                    fill="none"
                  />
                  <text className="fill-indigo-300 font-mono text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.22em]">
                    <textPath href="#collabCirclePath3D" startOffset="0%">
                      START HERE ★ TAP TO COLLABORATE ★ 
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* CENTER GLOWING X ICON */}
              <div className="relative z-10 w-5 h-5 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full bg-[#050508] border border-indigo-400 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white shadow-[0_0_15px_rgba(99,102,241,0.6)] transition-all duration-300">
                <X className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:rotate-90" />
              </div>
            </button>
          </motion.div>
        </div>

        {/* 6. RIGHT IDENTITY — YOU (ANCHORED RIGHT) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-2.5 sm:right-10 md:right-14 top-1/2 -translate-y-1/2 z-20 flex flex-col items-end text-right drop-shadow-[0_10px_25px_rgba(0,0,0,0.95)] pointer-events-auto"
        >
          <h2 className="text-xs sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-white leading-snug whitespace-nowrap">
            You
          </h2>
          <span className="text-[9px] sm:text-xs font-mono text-indigo-300 tracking-wider whitespace-nowrap mt-0.5">
            Future Partner
          </span>
        </motion.div>
      </div>

      {/* ── 5. BOTTOM "WALL OF LOVE / TRUSTED BY" BANNER ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-20 flex flex-col items-center justify-center gap-2 mb-2 sm:mb-4 shrink-0"
      >
        {/* Wall of Love Pill Badge */}
        <div className="px-5 py-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/10 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-300 font-semibold">
            Wall of Love &amp; Trust
          </span>
        </div>
      </motion.div>
    </section>
  )
}
