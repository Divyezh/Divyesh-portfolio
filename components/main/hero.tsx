import React from "react"
import HeroContent from "../sub/hero-content"

export default function Hero() {
  return (
    <div className="relative flex flex-col h-full w-full" id="about-me">
      
      {/* BLACKHOLE VIDEO BG — with amber fallback glow if missing */}
      <video
        autoPlay muted loop playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        style={{ opacity: 0.6 }}
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>

      {/* PURPLE RADIAL GLOW overlay */}
      <div className="absolute inset-0 -z-[5] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(139,92,246,0.15) 0%, transparent 70%)'
        }}
      />

      {/* BOTTOM GRADIENT FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-48 -z-[5] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #030014)' }}
      />

      <HeroContent />
    </div>
  )
}
