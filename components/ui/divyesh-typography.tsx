"use client"

import React from "react"
import { motion } from "framer-motion"

export function DivyeshCustomWord({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full select-none overflow-hidden flex flex-col items-center justify-center pt-8 pb-4 ${className}`}
    >
      {/* Subtle ambient backlight glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] max-w-[600px] h-28 bg-indigo-500/15 blur-[80px] rounded-full pointer-events-none" />

      {/* Main aesthetic typography */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="group relative flex flex-col items-center justify-center cursor-default"
      >
        <span
          className="font-bebas text-[15vw] sm:text-[14vw] md:text-[13vw] lg:text-[160px] xl:text-[180px] leading-[0.82] tracking-[0.04em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200/90 to-white/10 drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:tracking-[0.07em] group-hover:from-white group-hover:via-indigo-200 group-hover:to-indigo-400/30 text-center"
        >
          SONI DIVYESH
        </span>

        {/* Minimalist editorial subtitle stamp */}
        <div className="flex items-center gap-3 mt-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-indigo-400" />
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.28em] text-indigo-300 uppercase">
            SOFTWARE ENGINEER &bull; AI DEVELOPER
          </span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-indigo-400" />
        </div>
      </motion.div>
    </div>
  )
}
