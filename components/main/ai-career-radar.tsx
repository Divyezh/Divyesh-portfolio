'use client'
import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import CareerTerminal from "../sub/career-terminal"

export default function AiCareerRadar() {
  return (
    <section
      id="radar"
      className="relative w-full min-h-[100dvh] md:min-h-screen pt-80 pb-8 md:py-28 px-3 sm:px-6 lg:px-12 overflow-hidden bg-[#0e070c] text-white flex flex-col items-center justify-end md:justify-center selection:bg-[#E66277]/30 selection:text-white z-20"
    >
      {/* 1. END-TO-END 2D CHARACTER BACKGROUND IMAGE COVER */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Desktop / Tablet Background Image */}
        <Image
          src="/assets/2d image.png"
          alt="Divyesh AI Character Desktop"
          fill
          priority
          sizes="100vw"
          className="hidden md:block object-cover object-center opacity-100 transition-all duration-700 scale-[1.02]"
        />
        {/* Mobile Background Image (9:16 Vertical Portrait) */}
        <Image
          src="/assets/2d image mobile.png"
          alt="Divyesh AI Character Mobile"
          fill
          priority
          sizes="100vw"
          className="block md:hidden object-cover object-[center_15%] opacity-100 transition-all duration-700"
        />

        {/* Seamless Soft Vignette Gradients Blending into Site Background (#0e070c) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e070c]/60 via-transparent to-[#0e070c]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e070c]/40 via-transparent to-[#0e070c]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0e070c]/40" />

        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#E66277]/15 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/15 blur-[160px] rounded-full" />
      </div>

      {/* 2. MAIN CONTENT GRID (CHARACTER CLEAR ON LEFT, RADAR TERMINAL ON RIGHT NEAR FINGERS) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-end">
        
        {/* RIGHT COLUMN: AI CAREER RADAR TERMINAL (SHIFTED TO THE RIGHT NEAR FINGERS) */}
        <div className="w-full lg:w-auto flex justify-center lg:justify-end relative lg:translate-x-8 xl:translate-x-16">
          
          {/* Animated Connecting Radar Rings & Laser Beam emanating from Fingertips Area */}
          <div className="hidden lg:block absolute -left-10 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-20 h-20 rounded-full border border-[#E66277]/60 bg-[#E66277]/10 blur-sm flex items-center justify-center"
            >
              <div className="w-10 h-10 rounded-full border border-[#FFC59E]/80 bg-[#FFC59E]/20" />
            </motion.div>
          </div>

          {/* Interactive Terminal Window */}
          <div className="w-full flex justify-center lg:justify-end">
            <CareerTerminal />
          </div>
        </div>

      </div>
    </section>
  )
}
