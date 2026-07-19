'use client'
import { motion } from "framer-motion"
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion"
import { HiSparkles } from "react-icons/hi"
import Image from "next/image"

export default function HeroContent() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col lg:flex-row items-center justify-between px-10 md:px-20 mt-40 w-full z-20 max-w-[1400px] mx-auto"
    >
      {/* LEFT COLUMN - TEXT */}
      <div className="h-full w-full flex flex-col gap-5 justify-center text-left max-w-[600px] relative z-20">
        {/* WELCOME PILL */}
        <motion.div variants={slideInFromTop} className="Welcome-box py-2 px-4 border border-[#8b5cf6]/30 mb-2 rounded-full flex items-center w-max bg-[#1a103c]/50">
          <HiSparkles className="text-[#b48bed] mr-2" />
          <h1 className="text-[#b48bed] text-sm font-medium">
            Fullstack Developer Portfolio
          </h1>
        </motion.div>

        {/* MAIN HEADLINE */}
        <motion.div variants={slideInFromLeft(0.5)} className="mt-2">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Providing <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">the best</span>
            <br /> project experience.
          </h1>
        </motion.div>

        {/* SUBTITLE */}
        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg md:text-xl text-gray-400 max-w-xl mt-4 leading-relaxed"
        >
          I&apos;m a Full Stack Software Engineer with experience in Website, Mobile, and Software development. Check out my projects and skills.
        </motion.p>

        {/* CTA BUTTON */}
        <motion.a
          variants={slideInFromLeft(1.0)}
          href="#projects"
          className="button-primary mt-6 py-3 px-8 rounded-full text-white font-semibold text-base cursor-pointer w-max bg-gradient-to-r from-purple-600/50 to-blue-600/50 hover:from-purple-500 hover:to-blue-500 transition-all border border-purple-500/30 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
        >
          Learn more
        </motion.a>
      </div>

      {/* RIGHT COLUMN - GRAPHIC */}
      <motion.div 
        variants={slideInFromRight(0.8)} 
        className="w-full h-full flex justify-center items-center mt-32 lg:mt-0 relative min-h-[500px]"
      >
        {/* CONCENTRIC CIRCLES */}
        <div className="absolute w-[250px] h-[250px] border-[1px] border-purple-500/20 rounded-full flex justify-center items-center">
          <div className="absolute w-[400px] h-[400px] border-[1px] border-purple-500/20 rounded-full flex justify-center items-center">
             <div className="absolute w-[550px] h-[550px] border-[1px] border-purple-500/10 rounded-full"></div>
          </div>
        </div>

        {/* CROSSHAIR */}
        <div className="absolute w-[600px] h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
        <div className="absolute h-[600px] w-[1px] bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>

        {/* FLOATING ICONS LAYER 1 */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute w-[400px] h-[400px]">
           <div className="absolute -top-5 left-1/2 -translate-x-1/2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] bg-[#030014] rounded-full p-2 border border-white/10">
             <Image src="/assets/react-svgrepo-com.svg" alt="react" width={40} height={40} />
           </div>
           <div className="absolute bottom-10 right-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] bg-[#030014] rounded-full p-2 border border-white/10">
             <Image src="/assets/typescript-svgrepo-com.svg" alt="ts" width={40} height={40} />
           </div>
           <div className="absolute top-1/2 -left-5 -translate-y-1/2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] bg-[#030014] rounded-full p-2 border border-white/10">
             <Image src="/assets/github-icon.svg" alt="github" width={40} height={40} />
           </div>
        </motion.div>
        
        {/* FLOATING ICONS LAYER 2 */}
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute w-[250px] h-[250px]">
           <div className="absolute top-0 right-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] bg-[#030014] rounded-full p-2 border border-white/10">
             <Image src="/assets/next-js-svgrepo-com.svg" alt="nextjs" width={35} height={35} style={{ filter: 'invert(1)' }} />
           </div>
           <div className="absolute bottom-0 left-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] bg-[#030014] rounded-full p-2 border border-white/10">
             <Image src="/assets/javascript-programming-language-icon.svg" alt="js" width={35} height={35} />
           </div>
        </motion.div>

        {/* FLOATING ICONS LAYER 3 (OUTER) */}
        <motion.div animate={{ rotate: 180 }} transition={{ duration: 60, repeat: Infinity, ease: "linear", repeatType: "mirror" }} className="absolute w-[550px] h-[550px]">
           <div className="absolute bottom-20 left-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] bg-[#030014] rounded-full p-2 border border-white/10">
             <Image src="/assets/html-icon.svg" alt="html" width={30} height={30} />
           </div>
           <div className="absolute top-20 right-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] bg-[#030014] rounded-full p-2 border border-white/10">
             <Image src="/assets/css-icon.svg" alt="css" width={30} height={30} />
           </div>
        </motion.div>

        {/* CENTER ICON */}
        <div className="absolute drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] bg-[#030014] rounded-full p-4 border border-purple-500/40">
           <Image src="/assets/node-js-icon.svg" alt="node" width={60} height={60} />
        </div>
      </motion.div>
    </motion.div>
  )
}
