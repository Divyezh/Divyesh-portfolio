'use client'
import { motion } from "framer-motion"
import { HiArrowRight, HiDownload } from "react-icons/hi"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import OrbitingCirclesGlobeDemo from "@/components/ui/orbiting-circles-02"

export default function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 pt-24 pb-8 w-full z-20 max-w-6xl mx-auto text-center"
    >
      {/* STATUS PILL */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/25 bg-purple-500/10 backdrop-blur-md mb-6 hover:border-purple-500/40 transition-colors shadow-[0_0_15px_rgba(139,92,246,0.15)]"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-purple-200 text-xs font-semibold tracking-wide uppercase font-mono">
          Available for Full-Time &amp; Internship Roles
        </span>
      </motion.div>

      {/* DISPLAY HEADLINE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col gap-2 max-w-4xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
          Crafting{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-sky-400">
            Intelligent Web Apps
          </span>{" "}
          &amp; Scalable Systems.
        </h1>
      </motion.div>

      {/* SUBTITLE */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal mt-5 mx-auto"
      >
        Hi, I&apos;m <span className="text-white font-semibold">Divyesh Soni</span>. Full-stack software developer &amp; AI builder specializing in Next.js 14, React, TypeScript, and Generative AI applications.
      </motion.p>

      {/* CTAS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-3.5 mt-7"
      >
        <a
          href="#projects"
          className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] active:scale-[0.98]"
        >
          <span className="flex items-center gap-2">
            Explore Selected Projects
            <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </a>

        <a
          href="/Divyesh.pdf"
          download="Divyesh_Soni_Resume.pdf"
          target="_blank"
          className="group inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white transition-all duration-300 glass-card rounded-full hover:bg-white/10 hover:border-white/20 active:scale-[0.98]"
        >
          <span className="flex items-center gap-2">
            <HiDownload className="w-4 h-4 text-purple-400 group-hover:text-white transition-colors" />
            Resume PDF
          </span>
        </a>

        <div className="flex items-center gap-2 pl-1">
          <a
            href="https://github.com/Divyezh"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass-card text-gray-300 hover:text-white hover:border-purple-500/40 transition-all active:scale-95"
            aria-label="GitHub"
          >
            <FaGithub className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/divyesh-soni-60a5bb2a6/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass-card text-gray-300 hover:text-white hover:border-purple-500/40 transition-all active:scale-95"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-4 h-4" />
          </a>
        </div>
      </motion.div>

      {/* ORBITING CIRCLES GLOBE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.65 }}
        className="w-full max-w-4xl mt-6 flex justify-center items-center relative z-20"
      >
        <OrbitingCirclesGlobeDemo />
      </motion.div>

      {/* STATS MATRIX */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="grid grid-cols-3 gap-6 sm:gap-12 mt-4 pt-6 border-t border-white/10 max-w-xl w-full mx-auto"
      >
        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">4+</span>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Projects</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">15+</span>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Technologies</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-sky-400 tracking-tight">100%</span>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Responsive</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

