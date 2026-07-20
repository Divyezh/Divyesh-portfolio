'use client'
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import CareerTerminal from "../sub/career-terminal"
import CareerGlobe from "../sub/career-globe"
import { slideInFromTop } from "@/lib/motion"

export default function AiCareerRadar() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section className="relative flex flex-col items-center justify-center py-32 px-6 overflow-hidden min-h-screen bg-[#060611]">
      
      {/* VIGNETTE EFFECT */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ boxShadow: 'inset 0 0 150px 20px #060611' }}
      />

      {/* NOISE TEXTURE */}
      <div 
        className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* AURORA GLOWS */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#7C3AED]/10 blur-[120px] rounded-full pointer-events-none z-[0]" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[60%] bg-[#38BDF8]/10 blur-[120px] rounded-full pointer-events-none z-[0]" />

      {/* FLOATING STARS/PARTICLES */}
      {mounted && (
        <div className="absolute inset-0 z-[0] pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`radar-particle-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                scale: Math.random() * 0.5 + 0.5 
              }}
              animate={{ 
                y: [null, Math.random() * -100 - 50],
                opacity: [0.1, 0.8, 0.1]
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

      {/* HEADER */}
      <div className="relative z-20 w-full max-w-[1200px] mb-12 text-center md:text-left">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInFromTop}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            AI Career Radar
          </h2>
          <p className="text-[#B3B3C6] max-w-2xl text-lg">
            AI is actively scanning the world for the next opportunity where I can create exceptional digital experiences.
          </p>
        </motion.div>
      </div>

      {/* TWO COLUMN LAYOUT */}
      <div className="relative z-20 w-full max-w-[1200px] flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* LEFT: TERMINAL (55%) */}
        <div className="w-full lg:w-[55%] flex justify-center lg:justify-start">
          <CareerTerminal />
        </div>

        {/* RIGHT: GLOBE (45%) */}
        <div className="w-full lg:w-[45%] flex justify-center">
          <CareerGlobe />
        </div>

      </div>
    </section>
  )
}
