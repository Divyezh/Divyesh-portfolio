'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import CareerTerminal from '../sub/career-terminal'

export default function AiCareerRadar() {
  return (
    <section
      id="radar"
      className="relative w-full min-h-[100dvh] md:min-h-screen py-16 sm:py-24 md:py-28 px-3 sm:px-6 lg:px-12 overflow-hidden bg-[#0e070c] text-white flex flex-col items-center justify-center selection:bg-[#E66277]/30 selection:text-white z-20"
    >
      {/* ─── 1. CLEAN SCI-FI AMBIENT BACKGROUND ─── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Ambient Radial Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#E66277]/12 blur-[160px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/15 blur-[180px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-900/10 blur-[200px] rounded-full" />

        {/* Subtle Cyberpunk Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(230,98,119,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(230,98,119,0.3) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Soft Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e070c] via-transparent to-[#0e070c]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e070c]/70 via-transparent to-[#0e070c]" />
      </div>

      {/* ─── 2. MAIN TWO-COLUMN CONTAINER: HOLOGRAPHIC HERO ON LEFT, TERMINAL ON RIGHT ─── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8 xl:gap-14">
        
        {/* ─── LEFT COLUMN: ANIMATED HOLOGRAPHIC HERO (SCAN LINE MATERIALIZATION LOOP) ─── */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative">
          
          {/* Hologram Stage Container */}
          <div className="relative flex items-center justify-center w-full max-w-[320px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[480px]">
            
            {/* Hologram Projector Emitter Base at bottom */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-64 sm:w-80 h-16 pointer-events-none z-0">
              <div className="absolute inset-0 rounded-[100%] border border-cyan-400/40 bg-gradient-to-t from-cyan-500/20 to-transparent blur-[1px]" />
              <div className="absolute inset-2 rounded-[100%] border border-[#E66277]/50 shadow-[0_0_25px_rgba(230,98,119,0.6)]" />
              <div className="absolute inset-4 rounded-[100%] border border-dashed border-white/40 animate-spin" style={{ animationDuration: '24s' }} />
              {/* Upward Laser Light Cone */}
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-36 bg-gradient-to-t from-cyan-400/15 via-[#E66277]/10 to-transparent blur-xl pointer-events-none" />
            </div>

            {/* Holographic Character Frame with Blue Line Scanner & Appearance Loop */}
            <div className="relative w-full h-[400px] sm:h-[480px] md:h-[540px] flex items-center justify-center z-10 overflow-hidden">
              
              {/* Dual Chromatic Ambient Glows */}
              <div className="absolute inset-0 -translate-x-2 bg-cyan-400/10 blur-2xl rounded-full pointer-events-none" />
              <div className="absolute inset-0 translate-x-2 bg-[#E66277]/15 blur-2xl rounded-full pointer-events-none" />

              {/* 
                THE CONTINUOUS HOLOGRAPHIC LOOP MECHANISM:
                When the blue line goes UP (100% -> 0%): Character becomes visible following the line.
                When the blue line goes DOWN (0% -> 100%): Character disappears following the line.
              */}
              <motion.div
                animate={{
                  clipPath: [
                    'inset(100% 0% 0% 0%)',
                    'inset(0% 0% 0% 0%)',
                    'inset(100% 0% 0% 0%)',
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative w-full h-full flex items-center justify-center will-change-[clip-path]"
              >
                {/* Hero Character Image */}
                <Image
                  src="/assets/Divyesh.webp"
                  alt="Divyesh Soni Holographic Avatar"
                  width={600}
                  height={800}
                  priority
                  className="h-full w-auto object-contain filter contrast-110 drop-shadow-[0_0_35px_rgba(230,98,119,0.4)] select-none pointer-events-none"
                />

                {/* Holographic Scanline Grid Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg, rgba(34,211,238,0.3) 0px, rgba(34,211,238,0.3) 1px, transparent 1px, transparent 4px)',
                  }}
                />

                {/* Hologram Tint Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/15 via-transparent to-[#E66277]/15 pointer-events-none mix-blend-screen opacity-50" />
              </motion.div>

              {/* The Blue Scanning Laser Line Synced with Character Materialization */}
              <motion.div
                animate={{
                  top: ['100%', '0%', '100%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute left-0 right-0 h-[3px] -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee,0_0_40px_#22d3ee] pointer-events-none z-30 will-change-[top]"
              >
                {/* Central Cyan Laser Glow Core */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-16 h-3 bg-cyan-300 blur-sm rounded-full" />
              </motion.div>

            </div>
          </div>
        </div>

        {/* ─── RIGHT COLUMN: INTERACTIVE HOLOGRAPHIC CLI TERMINAL ─── */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end justify-center relative">
          
          {/* Animated Connecting Energy Pulse between Hologram and Terminal (Desktop) */}
          <div className="hidden lg:block absolute -left-12 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-16 h-16 rounded-full border border-[#E66277]/60 bg-[#E66277]/10 blur-sm flex items-center justify-center"
            >
              <div className="w-8 h-8 rounded-full border border-cyan-400/80 bg-cyan-400/20" />
            </motion.div>
          </div>

          {/* Interactive Career Terminal Window */}
          <div className="w-full flex justify-center lg:justify-end">
            <CareerTerminal />
          </div>
        </div>

      </div>
    </section>
  )
}
