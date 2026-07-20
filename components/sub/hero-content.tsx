'use client'
import { motion } from "framer-motion"
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion"
import { HiSparkles, HiArrowRight, HiDownload } from "react-icons/hi"
import { MousePointer2 } from "lucide-react"
import Image from "next/image"

export default function HeroContent() {
  const codeString = `const developer = {
  name: "Divyesh",
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "AI"
  ]
}`

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 mt-32 w-full z-20 max-w-[1400px] mx-auto min-h-[80vh]"
    >
      {/* LEFT COLUMN - TEXT & UI */}
      <div className="w-full flex flex-col gap-6 justify-center text-left max-w-[650px] relative z-20">

        {/* BADGE */}
        <motion.div
          variants={slideInFromTop}
          className="relative inline-flex items-center px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md w-max overflow-hidden group cursor-default"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          <HiSparkles className="text-purple-400 mr-2 h-4 w-4" />
          <span className="text-purple-200 text-xs font-semibold tracking-wide uppercase">
            Available for Internship
          </span>
        </motion.div>

        {/* MAIN HEADLINE */}
        <motion.div variants={slideInFromLeft(0.4)} className="flex flex-col gap-2 mt-2">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
            Building
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] via-[#8b5cf6] to-[#38bdf8] animate-gradient-x">
              Modern Digital
            </span>
            <br />
            Experiences.
          </h1>
        </motion.div>

        {/* SUBTITLE */}
        <motion.p
          variants={slideInFromLeft(0.6)}
          className="text-base md:text-lg text-[#B3B3C6] max-w-[500px] leading-relaxed font-medium"
        >
          I build high-performance web applications using Next.js, React, TypeScript and AI, creating premium digital experiences focused on speed, scalability and exceptional UI.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          variants={slideInFromLeft(0.8)}
          className="flex flex-wrap items-center gap-4 mt-4"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center px-6 py-3 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] rounded-full hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative flex items-center gap-2">
              View Projects
              <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          <a
            href="/DivyeshDEV.pdf"
            download="Divyesh_Soni_Resume.pdf"
            target="_blank"
            className="group inline-flex items-center justify-center px-6 py-3 font-medium text-white transition-all duration-300 bg-white/5 border border-white/10 rounded-full backdrop-blur-md hover:bg-white/10 hover:border-white/20"
          >
            <span className="flex items-center gap-2">
              <HiDownload className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              Download Resume
            </span>
          </a>
        </motion.div>

        {/* STATS */}
        <motion.div
          variants={slideInFromLeft(1.0)}
          className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10 max-w-[500px]"
        >
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold text-white">2+</span>
            <span className="text-xs font-medium text-[#B3B3C6] uppercase tracking-wider">Projects</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold text-white">4+</span>
            <span className="text-xs font-medium text-[#B3B3C6] uppercase tracking-wider">Technologies</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold text-[#38BDF8]">100%</span>
            <span className="text-xs font-medium text-[#B3B3C6] uppercase tracking-wider">Responsive</span>
          </div>
        </motion.div>



      </div>

      {/* RIGHT COLUMN - GRAPHIC (ORBITAL ANIMATION) */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center mt-32 lg:mt-0 relative min-h-[500px]"
      >
        {/* CONCENTRIC CIRCLES (Enhanced Borders) */}
        <div className="absolute w-[250px] h-[250px] border-[1px] border-purple-500/40 rounded-full flex justify-center items-center">
          <div className="absolute w-[400px] h-[400px] border-[1px] border-purple-500/40 rounded-full flex justify-center items-center">
            <div className="absolute w-[550px] h-[550px] border-[1px] border-purple-500/20 rounded-full"></div>
          </div>
        </div>

        {/* CROSSHAIR */}
        <div className="absolute w-[600px] h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>
        <div className="absolute h-[600px] w-[1px] bg-gradient-to-b from-transparent via-purple-500/40 to-transparent"></div>

        {/* FLOATING ICONS LAYER 1 */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute w-[400px] h-[400px]">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)] backdrop-blur-md bg-white/5 rounded-full p-2 border border-white/20 hover:scale-125 transition-transform duration-300">
            <Image src="/assets/react-svgrepo-com.svg" alt="react" width={40} height={40} />
          </div>
          <div className="absolute bottom-10 right-4 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)] backdrop-blur-md bg-white/5 rounded-full p-2 border border-white/20 hover:scale-125 transition-transform duration-300">
            <Image src="/assets/typescript-svgrepo-com.svg" alt="ts" width={40} height={40} />
          </div>
          <div className="absolute top-1/2 -left-5 -translate-y-1/2 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)] backdrop-blur-md bg-white/5 rounded-full p-2 border border-white/20 hover:scale-125 transition-transform duration-300">
            <Image src="/assets/github-icon.svg" alt="github" width={40} height={40} />
          </div>
        </motion.div>

        {/* FLOATING ICONS LAYER 2 */}
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute w-[250px] h-[250px]">
          <div className="absolute top-0 right-2 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)] backdrop-blur-md bg-white/5 rounded-full p-2 border border-white/20 hover:scale-125 transition-transform duration-300">
            <Image src="/assets/next-js-svgrepo-com.svg" alt="nextjs" width={35} height={35} style={{ filter: 'invert(1)' }} />
          </div>
          <div className="absolute bottom-0 left-2 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)] backdrop-blur-md bg-white/5 rounded-full p-2 border border-white/20 hover:scale-125 transition-transform duration-300">
            <Image src="/assets/javascript-programming-language-icon.svg" alt="js" width={35} height={35} />
          </div>
        </motion.div>

        {/* FLOATING ICONS LAYER 3 (OUTER) */}
        <motion.div animate={{ rotate: 180 }} transition={{ duration: 60, repeat: Infinity, ease: "linear", repeatType: "mirror" }} className="absolute w-[550px] h-[550px]">
          <div className="absolute bottom-20 left-10 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)] backdrop-blur-md bg-white/5 rounded-full p-2 border border-white/20 hover:scale-125 transition-transform duration-300">
            <Image src="/assets/html-icon.svg" alt="html" width={30} height={30} />
          </div>
          <div className="absolute top-20 right-10 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)] backdrop-blur-md bg-white/5 rounded-full p-2 border border-white/20 hover:scale-125 transition-transform duration-300">
            <Image src="/assets/css-icon.svg" alt="css" width={30} height={30} />
          </div>
        </motion.div>

        {/* CENTER ICON WITH GLOW */}
        <div className="absolute flex justify-center items-center">
          <div className="absolute w-32 h-32 bg-purple-500/30 blur-2xl rounded-full animate-pulse" />
          <div className="relative drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] backdrop-blur-xl bg-white/5 rounded-full p-5 border border-purple-500/50 hover:scale-110 transition-transform duration-300">
            <Image src="/assets/node-js-icon.svg" alt="node" width={65} height={65} />
          </div>
        </div>
      </motion.div>

      {/* SCROLL INDICATOR (Bottom Left) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-6 md:left-12 lg:left-20 flex flex-col items-center gap-2 z-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <MousePointer2 className="w-5 h-5 text-gray-400" />
        </motion.div>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
      </motion.div>

    </motion.div>
  )
}
