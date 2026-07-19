'use client'
import { motion } from "framer-motion"
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion"
import { HiSparkles } from "react-icons/hi"

export default function SkillText() {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center text-center">
      <motion.div
        variants={slideInFromTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="Welcome-box py-2 px-4 border border-purple-core/20 mb-6"
      >
        <HiSparkles className="text-purple-mid mr-2" />
        <span className="Welcome-text text-sm font-medium">Think better with Next.js 14</span>
      </motion.div>

      <motion.h1
        variants={slideInFromLeft(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-white mb-4 mt-6"
      >
        Making apps with modern technologies.
      </motion.h1>

      <motion.p
        variants={slideInFromRight(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-gray-400 text-lg md:text-xl max-w-xl px-4 italic font-serif mt-2"
      >
        Never miss a task, deadline or idea.
      </motion.p>
    </div>
  )
}

