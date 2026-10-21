'use client'

import React, { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

export default function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Multi-layer 3D Parallax Scroll Transforms
  const yBgText = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacityBgText = useTransform(scrollYProgress, [0, 0.8], [0.35, 0.05])
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, -60])
  const scalePortrait = useTransform(scrollYProgress, [0, 1], [1, 0.95])
  const opacityFooter = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[100dvh] flex items-center justify-center overflow-hidden px-4 sm:px-8">

      {/* ─── 1. DECREASED SIZE BG TEXT: "DIVYESH SONI" (REFINED, SUBTLE WATERMARK) ─── */}
      <motion.div
        style={{ y: yBgText, opacity: opacityBgText }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.28, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 flex items-center justify-center overflow-hidden"
      >
        <svg
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid meet"
          className="w-full max-w-[580px] h-auto absolute"
        >
          <defs>
            <linearGradient id="textRefinedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#C7D2FE" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.15" />
            </linearGradient>

            <filter id="softTextShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#050508" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* Decreased font size to 120px with 580px max container */}
          <g filter="url(#softTextShadow)">
            <text
              x="50%"
              y="38%"
              textAnchor="middle"
              dominantBaseline="central"
              fill="url(#textRefinedGrad)"
              fontFamily="'Anton', 'Bebas Neue', 'Impact', sans-serif"
              fontWeight="900"
              fontSize="120"
              letterSpacing="6"
            >
              DIVYESH
            </text>

            <text
              x="50%"
              y="62%"
              textAnchor="middle"
              dominantBaseline="central"
              fill="url(#textRefinedGrad)"
              fontFamily="'Anton', 'Bebas Neue', 'Impact', sans-serif"
              fontWeight="900"
              fontSize="120"
              letterSpacing="6"
            >
              SONI
            </text>
          </g>
        </svg>
      </motion.div>

      {/* ─── 2. LEFT ARCHITECTURAL STACKED HEADLINE (EXACT MOTIF FROM VYRO IMAGE) ─── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex flex-col items-start absolute left-8 sm:left-12 xl:left-20 top-1/2 -translate-y-1/2 z-20 pointer-events-none select-none"
      >
        <div className="flex flex-col tracking-tight leading-[0.92]">
          <span className="text-4xl xl:text-5xl font-extrabold text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] font-sans">
            Soni
          </span>
          <span className="text-4xl xl:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400 font-sans mt-0.5">
            Divyesh
          </span>
          <div className="h-0.5 w-8 bg-indigo-500/60 rounded-full mt-3 mb-2" />
          <span className="text-[10px] font-mono tracking-[0.24em] text-slate-400 uppercase">
            Portfolio // 2026
          </span>
        </div>
      </motion.div>
     {/* ─── 3. RIGHT SUB-HEADLINE COPY (EXACT MOTIF FROM VYRO IMAGE) ─── */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex flex-col items-start absolute right-8 sm:right-12 xl:right-20 top-[26%] z-20 pointer-events-none select-none max-w-[280px]"
      >
        <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Next-generation full-stack architectures redefining how you see, build, and interact with the digital world.
        </p>
      </motion.div>

      {/* ─── 4. CENTER FOREGROUND PORTRAIT (ILLUMINATED BY STUDIO BACKLIGHT) ─── */}
      <motion.div
        style={{ y: yPortrait, scale: scalePortrait }}
        initial={{ opacity: 1, y: 0, scale: 1 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex items-center justify-center h-[50vh] sm:h-[65vh] md:h-[76vh] max-h-[760px] max-w-full my-auto"
      >
        {/* Soft radial white & lavender halo directly backlighting portrait */}
        <div className="absolute w-[240px] h-[240px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] bg-white/20 blur-[90px] rounded-full pointer-events-none -z-10" />

        <Image
          src="/assets/Divyesh.webp"
          alt="Divyesh Soni Portrait"
          width={600}
          height={800}
          priority
          fetchPriority="high"
          unoptimized
          sizes="(max-width: 640px) 260px, (max-width: 1024px) 450px, 600px"
          className="h-full w-auto max-w-full object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
        />
      </motion.div>

      {/* ─── 5. FLOATING SPEC CAPSULE CARD (BOTTOM-RIGHT, FROM VYRO IMAGE) ─── */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: 15 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex absolute bottom-24 md:bottom-28 lg:bottom-32 right-6 sm:right-8 lg:right-16 z-20 pointer-events-auto"
      >
        <a
          href="#skills"
          className="group relative flex items-center gap-3.5 p-3.5 pr-5 rounded-2xl bg-[#090714]/85 border border-white/15 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] hover:border-indigo-400/50 hover:scale-[1.03] transition-all duration-300"
        >
          {/* Circular Tech Icon Frame with Pill Badge */}
          <div className="relative w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 overflow-hidden group-hover:border-indigo-400/40 transition-colors">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <div className="absolute inset-0 bg-indigo-500/10 blur-sm" />
            {/* Pill tag matching $150 in the VYRO screenshot */}
            <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-indigo-600 text-white text-[9px] font-mono font-bold shadow-sm whitespace-nowrap">
              NEW
            </span>
          </div>

          {/* Card Copy */}
          <div className="flex flex-col whitespace-nowrap">
            <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest font-semibold">
              CORE STACK
            </span>
            <span className="text-xs font-bold text-white tracking-tight">
              Full Stack &amp; AI Architect
            </span>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-indigo-300 transition-colors mt-0.5">
              <span>Explore Arsenal</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </a>
      </motion.div>

      {/* ─── 6. BOTTOM FOOTER BAR (FEATURED ROLES & SOCIALS) ─── */}
      <motion.div
        style={{ opacity: opacityFooter }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-3 sm:left-8 md:left-12 right-3 sm:right-8 md:right-12 z-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-2.5 sm:gap-4 md:gap-6 pointer-events-none"
      >
        {/* Left: Featured Work / Roles */}
        <div className="flex flex-col items-start pointer-events-auto max-w-full md:max-w-[70%]">
          <span className="text-[9.5px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-slate-400 whitespace-nowrap">
            TECHNICAL FOCUS
          </span>
          <div className="text-[11px] sm:text-xs md:text-sm font-bold text-white tracking-tight mt-1 flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md whitespace-nowrap">
              Frontend Engineer
            </span>
            <span className="text-indigo-400 font-normal hidden xs:inline">•</span>
            <span className="px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md whitespace-nowrap">
              Next.js 14 &amp; React 19
            </span>
            <span className="text-indigo-400 font-normal hidden xs:inline">•</span>
            <span className="px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md whitespace-nowrap">
              Generative AI Pipelines
            </span>
          </div>
        </div>

        {/* Right: Social Links (Pill Buttons) */}
        <div className="flex flex-col items-start md:items-end md:text-right pointer-events-auto shrink-0">
          <span className="text-[9.5px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-slate-400 whitespace-nowrap">
            SOCIAL MATRIX
          </span>
          <div className="text-[11px] sm:text-xs md:text-sm font-bold text-white tracking-tight mt-1 flex items-center gap-2 whitespace-nowrap">
            <a
              href="https://github.com/Divyezh"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-white/[0.04] border border-white/10 hover:border-indigo-400/40 hover:text-white transition-all shadow-sm whitespace-nowrap"
            >
              GitHub
            </a>
            <span className="text-indigo-400 font-normal">•</span>
            <a
              href="https://www.linkedin.com/in/divyesh-soni-60a5bb2a6/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-white/[0.04] border border-white/10 hover:border-indigo-400/40 hover:text-white transition-all shadow-sm whitespace-nowrap"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
