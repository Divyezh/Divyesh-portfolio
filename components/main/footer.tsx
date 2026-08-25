'use client'

import React, { useState, useEffect } from "react"
import { Mail, MapPin, Sparkles, ArrowUpRight, Copy, Check, Clock, ArrowUp, Send } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { TextHoverEffect, FooterBackgroundGradient } from "@/components/ui/hover-footer"

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

  const email = "sonidivyesh2004@gmail.com"

  useEffect(() => {
    const updateISTTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }
      setCurrentTime(now.toLocaleTimeString("en-US", options))
    }

    updateISTTime()
    const interval = setInterval(updateISTTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer id="contact" className="relative text-white pt-20 pb-10 px-4 md:px-8 overflow-hidden border-t border-white/[0.08] mt-24 z-20">
      {/* Background Gradient Effect */}
      <FooterBackgroundGradient />

      <div className="max-w-7xl mx-auto z-40 relative">
        {/* CONTACT HERO CALLOUT */}
        <div className="p-8 sm:p-12 rounded-3xl glass-card border border-white/[0.08] mb-16 relative overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.6)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-[120px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/25 bg-purple-500/10 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-purple-300 text-xs font-mono font-medium uppercase tracking-wider">
                  Let&apos;s Build Together
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Have an ambitious idea or an open role?
              </h2>

              <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl">
                I&apos;m currently open to full-time engineering roles, internships, and high-impact web development collaborations.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full">
              {/* Copy Email Button */}
              <button
                onClick={copyEmail}
                className="group relative flex items-center justify-between px-5 py-3.5 rounded-2xl glass-card border border-white/10 hover:border-purple-500/40 transition-all cursor-pointer w-full text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 uppercase font-mono">Email Me Directly</div>
                    <div className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors truncate max-w-[200px] sm:max-w-[240px]">
                      {email}
                    </div>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.04] text-slate-400 group-hover:text-white">
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </div>
              </button>

              {/* Send Mail Link */}
              <a
                href={`mailto:${email}?subject=Project%20Inquiry%20/%20Opportunity`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.4)]"
              >
                <Send className="w-4 h-4" />
                <span>Send Quick Message</span>
              </a>
            </div>
          </div>
        </div>

        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* Brand & Subtitle */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xl font-bold tracking-wider text-white">
                DIVYESH<span className="text-purple-400">.DEV</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Full Stack Software Engineer specializing in Next.js, React, TypeScript, and Generative AI applications.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-1">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>Ahmedabad, IN: <span className="text-white font-medium">{currentTime || "IST"}</span></span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#about-me" className="hover:text-purple-300 transition-colors flex items-center gap-1.5 group">
                  About Me <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-purple-300 transition-colors flex items-center gap-1.5 group">
                  Technical Arsenal <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#radar" className="hover:text-purple-300 transition-colors flex items-center gap-1.5 group">
                  AI Career Radar <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-purple-300 transition-colors flex items-center gap-1.5 group">
                  Featured Projects <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Profiles */}
          <div>
            <h4 className="text-white text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="https://github.com/Divyezh" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors flex items-center gap-2">
                  <FaGithub className="w-4 h-4 text-purple-400" /> GitHub Profile
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/divyesh-soni-60a5bb2a6/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors flex items-center gap-2">
                  <FaLinkedin className="w-4 h-4 text-blue-400" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="/Divyesh.pdf" target="_blank" download="Divyesh_Soni_Resume.pdf" className="hover:text-purple-300 transition-colors flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Download Resume PDF
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              Location &amp; Info
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Ahmedabad, Gujarat, India</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-purple-300 transition-colors truncate">
                  {email}
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 bg-white/[0.04] border border-white/[0.08] hover:text-white hover:border-purple-500/40 transition-colors"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-purple-400" />
                  <span>Back to Top</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-t border-white/[0.08] my-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-3">
          <p>&copy; {new Date().getFullYear()} Divyesh Soni. Crafted with care.</p>
          <p className="flex items-center gap-1 font-mono">
            Next.js 14 • React 19 • Tailwind CSS • Three.js
          </p>
        </div>
      </div>

      {/* Interactive Huge Hover Text Effect */}
      <div className="hidden md:flex h-[22rem] -mt-32 -mb-24 justify-center items-center relative z-10 pointer-events-auto">
        <TextHoverEffect text="DIVYESH" className="z-30" />
      </div>
    </footer>
  )
}

