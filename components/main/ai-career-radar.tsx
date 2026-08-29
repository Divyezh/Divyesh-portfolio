'use client'
import React from "react"
import { motion } from "framer-motion"
import CareerTerminal from "../sub/career-terminal"
import CareerGlobe from "../sub/career-globe"
import { Sparkles } from "lucide-react"

export default function AiCareerRadar() {
  return (
    <section id="radar" className="relative flex flex-col items-center justify-center py-28 px-4 md:px-8 overflow-hidden min-h-screen max-w-7xl mx-auto w-full z-20">
      {/* AMBIENT RADIAL GLOW */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] left-[-10%] w-[450px] h-[450px] bg-purple-800/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* HEADER */}
      <div className="relative z-20 w-full mb-12 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/25 bg-purple-500/10 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-purple-300 text-xs font-mono font-medium uppercase tracking-wider">
            AI Opportunity Engine
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
        >
          AI Career{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-purple-500">
            Radar &amp; Telemetry
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 max-w-xl text-sm sm:text-base mt-3 text-center"
        >
          Live opportunity scanning and automated skill match telemetry for high-impact software engineering roles.
        </motion.p>
      </div>

      {/* TWO COLUMN INTERACTIVE LAYOUT */}
      <div className="relative z-20 w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">
        {/* LEFT: TERMINAL */}
        <div className="w-full lg:w-[52%] flex justify-center">
          <CareerTerminal />
        </div>

        {/* RIGHT: GLOBE & SCANNER */}
        <div className="w-full lg:w-[48%] flex justify-center">
          <CareerGlobe />
        </div>
      </div>
    </section>
  )
}

