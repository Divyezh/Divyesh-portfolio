'use client'
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function SkillText() {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center mb-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-4 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
      >
        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
        <span className="text-indigo-300 text-xs font-mono font-medium uppercase tracking-wider">
          Technical Arsenal
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
      >
        Engineered for{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
          Scale &amp; Precision
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-slate-400 text-sm sm:text-base max-w-xl px-4 mt-3 font-normal"
      >
        Full-stack architecture, high-throughput backend services, modern reactive user interfaces, and generative AI pipelines.
      </motion.p>
    </div>
  )
}
