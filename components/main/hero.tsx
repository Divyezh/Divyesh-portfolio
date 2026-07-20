'use client'
import React, { useEffect, useState } from "react"
import HeroContent from "../sub/hero-content"
import { motion } from "framer-motion"

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="relative flex flex-col h-full w-full min-h-screen bg-[#060611] overflow-hidden" id="about-me">
      
      {/* VIGNETTE EFFECT */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 150px 20px #060611',
        }}
      />

      {/* NOISE TEXTURE */}
      <div 
        className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* AURORA GLOWS */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#7C3AED]/20 blur-[120px] rounded-full pointer-events-none z-[0]" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-[#38BDF8]/10 blur-[120px] rounded-full pointer-events-none z-[0]" />

      {/* FLOATING STARS/PARTICLES */}
      {mounted && (
        <div className="absolute inset-0 z-[0] pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
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

      {/* BLACKHOLE VIDEO BG (Softened) */}
      <video
        autoPlay muted loop playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 mix-blend-screen opacity-30"
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>

      {/* BOTTOM GRADIENT FADE to match background */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[3] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #060611)' }}
      />

      <div className="relative z-[10] w-full h-full flex flex-col justify-center">
        <HeroContent />
      </div>
    </div>
  )
}
