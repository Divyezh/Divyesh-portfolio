'use client'

import React, { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUp, MapPin, Sun, Mail } from "lucide-react"
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6"
import { DivyeshCustomWord } from "@/components/ui/divyesh-typography"

export default function Footer() {
  const [currentTime, setCurrentTime] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateISTTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }
      setCurrentTime(now.toLocaleTimeString("en-US", options))
    }

    updateISTTime()
    const interval = setInterval(updateISTTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  })

  const cardY = useTransform(scrollYProgress, [0, 1], [40, 0])
  const cardScale = useTransform(scrollYProgress, [0, 1], [0.98, 1])
  const cardOpacity = useTransform(scrollYProgress, [0, 0.6], [0.7, 1])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const email = "sonidivyesh2004@gmail.com"

  return (
    <footer
      id="contact"
      ref={containerRef}
      className="relative w-full text-white mt-24 md:mt-36 px-3 sm:px-6 md:px-10 pb-8 md:pb-12 overflow-hidden z-20"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[1000px] h-[350px] bg-purple-600/15 blur-[140px] pointer-events-none -z-10" />

      <motion.div
        style={{
          y: cardY,
          scale: cardScale,
          opacity: cardOpacity,
        }}
        className="max-w-[1400px] mx-auto bg-[#0c0d16]/90 backdrop-blur-2xl rounded-[32px] sm:rounded-[44px] md:rounded-[54px] p-7 sm:p-10 md:p-14 lg:p-16 pb-6 md:pb-8 relative overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.8)] border border-white/[0.08]"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 mb-10 md:mb-14 relative z-10">
          <div className="lg:col-span-4 flex flex-col justify-start">
            <h3 className="text-xl sm:text-2xl md:text-[26px] font-bold text-white leading-snug tracking-tight max-w-[320px]">
              Divyesh is independent full stack developer and creative engineer
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-3.5 max-w-[290px] leading-relaxed">
              Crafting high-performance web applications, generative AI systems, and immersive digital interfaces.
            </p>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 mb-4">
              Explore
            </span>
            <ul className="space-y-2.5 text-sm font-medium text-slate-300">
              <li>
                <a
                  href="#about-me"
                  className="hover:text-purple-300 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>Bio</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-purple-400">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="hover:text-purple-300 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>Skills</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-purple-400">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="#radar"
                  className="hover:text-purple-300 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>Career Radar</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-purple-400">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-purple-300 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>Projects</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-purple-400">↗</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="hover:text-purple-300 transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>Contact</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-purple-400">↗</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 flex flex-col">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 mb-4">
              Connect &amp; Follow
            </span>
            <div className="flex flex-wrap gap-2">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-purple-500/15 border border-white/[0.08] hover:border-purple-500/40 hover:scale-105 transition-all text-xs font-semibold text-slate-200 shadow-sm"
              >
                <Mail className="w-3 h-3 text-purple-400" />
                <span>sonidivyesh2004@gmail.com</span>
              </a>

              <a
                href="https://www.instagram.com/divyesh.gym/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-purple-500/15 border border-white/[0.08] hover:border-purple-500/40 hover:scale-105 transition-all text-xs font-semibold text-slate-200 shadow-sm"
              >
                <FaInstagram className="w-3 h-3 text-[#e1306c]" />
                <span>@divyesh.gym</span>
              </a>

              <a
                href="https://www.linkedin.com/in/divyesh-soni-60a5bb2a6/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-purple-500/15 border border-white/[0.08] hover:border-purple-500/40 hover:scale-105 transition-all text-xs font-semibold text-slate-200 shadow-sm"
              >
                <FaLinkedin className="w-3 h-3 text-[#38bdf8]" />
                <span>@divyesh-soni</span>
              </a>

              <a
                href="https://github.com/Divyezh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-purple-500/15 border border-white/[0.08] hover:border-purple-500/40 hover:scale-105 transition-all text-xs font-semibold text-slate-200 shadow-sm"
              >
                <FaGithub className="w-3 h-3 text-slate-100" />
                <span>@Divyezh</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col justify-between space-y-5">
            <a
              href="tel:+917383502350"
              className="group flex flex-col items-start cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                  Call Divyesh
                </span>
                <span className="w-6 h-6 rounded-full bg-[#ff4d36] text-white inline-flex items-center justify-center text-xs font-bold shadow-[0_0_12px_rgba(255,77,54,0.5)] group-hover:rotate-45 group-hover:scale-110 transition-all duration-300">
                  ↗
                </span>
              </div>
              <span className="text-xs text-slate-400 mt-0.5 group-hover:text-purple-300 transition-colors font-mono">
                +91 73835 02350 &bull; Let&apos;s talk
              </span>
            </a>

            <a
              href="https://github.com/Divyezh"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-start cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                  Courses &amp; Tools
                </span>
                <span className="w-6 h-6 rounded-full bg-white/[0.08] border border-white/20 text-white inline-flex items-center justify-center text-xs font-bold shadow-sm group-hover:bg-purple-600 group-hover:border-purple-500 group-hover:rotate-45 group-hover:scale-110 transition-all duration-300">
                  ↗
                </span>
              </div>
              <span className="text-xs text-slate-400 mt-0.5 group-hover:text-slate-300 transition-colors">
                Creative tools &amp; repositories
              </span>
            </a>
          </div>
        </div>

        <div className="w-full mt-4 md:mt-8 -mb-3 sm:-mb-5 md:-mb-7 flex justify-center items-end relative overflow-visible">
          <DivyeshCustomWord className="w-full" />
        </div>

        <div className="pt-6 sm:pt-8 mt-2 sm:mt-4 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between items-center text-xs font-medium text-slate-400 gap-3 relative z-10">
          <div className="flex items-center gap-2">
            <span>Divyesh &copy; {new Date().getFullYear()}</span>
            <span>&bull;</span>
            <a href="#about-me" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] px-3.5 py-1.5 rounded-full text-[11px] font-mono text-slate-300">
              <MapPin className="w-3 h-3 text-purple-400" />
              <span>Ahmedabad</span>
              <span className="font-semibold text-white">{currentTime || "IST"}</span>
              <span className="flex items-center gap-1 text-amber-400 font-sans">
                <Sun className="w-3 h-3 text-amber-400" /> 28&deg;C
              </span>
            </div>

            <button
              onClick={scrollToTop}
              title="Back to top"
              className="p-2 rounded-full bg-white/[0.04] hover:bg-purple-600 hover:text-white border border-white/[0.08] hover:border-purple-500 text-slate-300 transition-all duration-200 hover:scale-110 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
