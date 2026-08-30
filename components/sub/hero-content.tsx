'use client'

import React, { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

export default function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Multi-layer 3D Parallax Scroll Transforms
  const yBgText = useTransform(scrollYProgress, [0, 1], [0, -180])
  const opacityBgText = useTransform(scrollYProgress, [0, 0.8], [1, 0.15])
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, -70])
  const scalePortrait = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const opacityFooter = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[100dvh] flex items-center justify-center overflow-hidden px-4 sm:px-8">
      {/* 1. OVERSIZED 3D BACKGROUND WORDMARK (WITH PARALLAX SCROLL MOTION) */}
      <motion.div
        style={{ y: yBgText, opacity: opacityBgText }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 flex items-center justify-center overflow-hidden"
      >
        <svg
          viewBox="0 0 1000 800"
          preserveAspectRatio="none"
          className="w-full h-full absolute inset-0"
        >
          <defs>
            {/* 3D Specular Shading Gradient */}
            <linearGradient id="text3DGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF9EB1" />
              <stop offset="25%" stopColor="#FF6B86" />
              <stop offset="60%" stopColor="#E66277" />
              <stop offset="100%" stopColor="#8A2338" />
            </linearGradient>

            {/* 3D Inner Lighting Highlights */}
            <linearGradient id="text3DLightHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#FFC59E" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
            </linearGradient>

            {/* Organic 3D Cylinder Curve Warp Filter */}
            <filter id="curved3DWarp" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.005 0.01"
                numOctaves="2"
                result="warpNoise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="warpNoise"
                scale="15"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>

            {/* Deep 3D Shadow Extrusion */}
            <filter id="extrude3DShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#000000" floodOpacity="0.95" />
              <feDropShadow dx="0" dy="30" stdDeviation="40" floodColor="#70182A" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* 3D BACKDROP SHADOW EXTRUSION LAYER */}
          <g filter="url(#extrude3DShadow)">
            {/* TOP LINE: DIVYESH (3D CYLINDER WARP) */}
            <g filter="url(#curved3DWarp)">
              <text
                x="50%"
                y="33%"
                textAnchor="middle"
                dominantBaseline="central"
                fill="url(#text3DGradient)"
                fontFamily="'Anton', 'Bebas Neue', 'Impact', sans-serif"
                fontWeight="900"
                fontSize="315"
                letterSpacing="-10"
              >
                DIVYESH
              </text>
            </g>

            {/* BOTTOM LINE: SONI */}
            <text
              x="50%"
              y="70%"
              textAnchor="middle"
              dominantBaseline="central"
              fill="url(#text3DGradient)"
              fontFamily="'Anton', 'Bebas Neue', 'Impact', sans-serif"
              fontWeight="900"
              fontSize="355"
              letterSpacing="-12"
            >
              SONI
            </text>
          </g>

          {/* 3D LIGHT REFLECTION OVERLAY */}
          <g filter="url(#curved3DWarp)" opacity="0.35" style={{ mixBlendMode: 'overlay' }}>
            <text
              x="50%"
              y="33%"
              textAnchor="middle"
              dominantBaseline="central"
              fill="url(#text3DLightHighlight)"
              fontFamily="'Anton', 'Bebas Neue', 'Impact', sans-serif"
              fontWeight="900"
              fontSize="315"
              letterSpacing="-10"
            >
              DIVYESH
            </text>
            <text
              x="50%"
              y="70%"
              textAnchor="middle"
              dominantBaseline="central"
              fill="url(#text3DLightHighlight)"
              fontFamily="'Anton', 'Bebas Neue', 'Impact', sans-serif"
              fontWeight="900"
              fontSize="355"
              letterSpacing="-12"
            >
              SONI
            </text>
          </g>
        </svg>
      </motion.div>

      {/* 2. CENTERED FOREGROUND PORTRAIT */}
      <motion.div
        style={{ y: yPortrait, scale: scalePortrait }}
        initial={{ opacity: 0, y: 35, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex items-center justify-center h-[70vh] sm:h-[80vh] max-h-[780px] max-w-full my-auto"
      >
        {/* Soft radial ambient glow behind portrait */}
        <div className="absolute w-[300px] h-[300px] sm:w-[480px] sm:h-[480px] bg-[#E66277]/25 blur-[120px] rounded-full pointer-events-none -z-10" />

        <Image
          src="/assets/Divyesh.png"
          alt="Divyesh Soni Portrait"
          width={650}
          height={850}
          priority
          className="h-full w-auto max-w-full object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.95)] filter"
        />
      </motion.div>

      {/* 3. BOTTOM-LEFT LABEL & ROLE BLOCK */}
      <motion.div
        style={{ opacity: opacityFooter }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 md:left-12 z-20 flex flex-col items-start"
      >
        <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-slate-400">
          FEATURED WORK
        </span>
        <div className="text-xs sm:text-sm font-bold text-white tracking-tight mt-0.5 sm:mt-1 flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span>Frontend Developer</span>
          <span className="text-[#E66277] font-normal">•</span>
          <span>React &amp; Next.js</span>
          <span className="text-[#E66277] font-normal">•</span>
          <span>UI/UX Engineer</span>
        </div>
      </motion.div>

      {/* 4. BOTTOM-RIGHT SOCIAL BLOCK */}
      <motion.div
        style={{ opacity: opacityFooter }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 md:right-12 z-20 flex flex-col items-end text-right"
      >
        <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-slate-400">
          Social
        </span>
        <div className="text-xs sm:text-sm font-bold text-white tracking-tight mt-0.5 sm:mt-1 flex items-center gap-1.5 sm:gap-2">
          <a
            href="https://github.com/Divyezh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FF8B9E] transition-colors"
          >
            GitHub
          </a>
          <span className="text-[#E66277] font-normal">•</span>
          <a
            href="https://www.linkedin.com/in/divyesh-soni-60a5bb2a6/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FF8B9E] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </motion.div>
    </div>
  )
}
