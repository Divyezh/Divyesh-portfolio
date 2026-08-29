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
        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/25 bg-purple-500/10 mb-4"
      >
        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
        <span className="text-purple-300 text-xs font-mono font-medium uppercase tracking-wider">
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
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-purple-500">
          Scale &amp; Precision
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-slate-400 text-sm sm:text-base max-w-xl px-4 mt-3"
      >
        Full-stack architecture, high-throughput backend services, modern reactive user interfaces, and generative AI pipelines.
      </motion.p>
    </div>
  )
}


