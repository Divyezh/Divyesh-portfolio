'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShieldAlert, Download, Send, RotateCcw, Sparkles } from 'lucide-react'
import { terminalAudio } from './terminal-audio'

interface TerminalHologramProps {
  onDismiss: () => void
}

export default function TerminalHologram({ onDismiss }: TerminalHologramProps) {
  useEffect(() => {
    terminalAudio.playAlarm()
  }, [])

  const handleDownloadResume = () => {
    terminalAudio.playCommandChirp()
    const link = document.createElement('a')
    link.href = '/Divyesh.pdf'
    link.download = 'Divyesh_Soni_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleConnectForWork = () => {
    terminalAudio.playCommandChirp()
    const contactElem = document.getElementById('contact')
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = 'mailto:sonidivyesh2004@gmail.com'
    }
    onDismiss()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="relative w-full h-full min-h-[350px] p-4 sm:p-5 flex flex-col items-center justify-between bg-gradient-to-b from-[#1c0b15]/95 via-[#120710]/95 to-[#0b040a]/95 rounded-xl border border-red-500/40 shadow-[0_0_50px_rgba(239,68,68,0.3)] overflow-hidden"
    >
      {/* Glitch & Hologram Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(230,98,119,0.3) 0%, transparent 70%), repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 4px)',
        }}
      />

      {/* Top Alert Header */}
      <div className="relative z-10 w-full flex items-center justify-between pb-2 border-b border-red-500/30">
        <div className="flex items-center gap-2 text-red-400">
          <ShieldAlert className="w-4 h-4 animate-bounce text-red-400" />
          <span className="font-mono text-[11px] sm:text-xs font-bold tracking-wider uppercase text-red-300">
            ROOT WIPE REJECTED // ERROR 0xDIVYESH
          </span>
        </div>
        <button
          onClick={onDismiss}
          className="flex items-center gap-1 text-[11px] font-mono text-gray-400 hover:text-white px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Dismiss</span>
        </button>
      </div>

      {/* Middle: Humorous Quote & Animated Hologram of Hero Image */}
      <div className="relative z-10 my-2 sm:my-3 flex flex-col items-center text-center">
        {/* Humorous Banner */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-3 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
        >
          <p className="font-mono text-xs sm:text-sm font-semibold text-rose-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>&ldquo;Nice try! Divyesh&apos;s code is indestructible.&rdquo;</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </p>
        </motion.div>

        {/* Animated Hologram Container */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center my-1">
          {/* Rotating Hologram Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dashed border-[#E66277]/50 pointer-events-none"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 rounded-full border border-dotted border-cyan-400/40 pointer-events-none"
          />

          {/* Holographic Glowing Reticle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#E66277]/20 via-transparent to-cyan-500/20 blur-md pointer-events-none" />

          {/* Hero Image Hologram */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#E66277] shadow-[0_0_30px_rgba(230,98,119,0.6)] bg-black/60">
            <Image
              src="/assets/Divyesh.webp"
              alt="Divyesh Soni Hologram"
              fill
              sizes="128px"
              className="object-cover object-top filter contrast-125 brightness-110"
            />
            {/* Holographic Scanlines Overlay */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60 animate-pulse"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, rgba(230,98,119,0.3) 0px, rgba(230,98,119,0.3) 2px, transparent 2px, transparent 4px)',
              }}
            />
            {/* Holographic Tint */}
            <div className="absolute inset-0 bg-cyan-400/10 mix-blend-color pointer-events-none" />
          </div>

          {/* Status Badge */}
          <div className="absolute -bottom-2 bg-black/90 border border-[#E66277]/80 px-2 py-0.5 rounded-full text-[9px] font-mono text-green-400 font-bold tracking-widest shadow-lg flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
            SHIELD: 100%
          </div>
        </div>

        <p className="mt-2 text-[11px] font-mono text-gray-400 max-w-xs">
          Built with unbreakable architecture, real-time failover, and bug-resistant craftsmanship.
        </p>
      </div>

      {/* Bottom: 2 Prominent Action Buttons */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row items-center gap-2.5 pt-2">
        <button
          onClick={handleDownloadResume}
          className="w-full sm:flex-1 group relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#E66277] to-rose-600 hover:from-rose-600 hover:to-[#E66277] shadow-[0_0_20px_rgba(230,98,119,0.4)] hover:shadow-[0_0_30px_rgba(230,98,119,0.7)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          <span>Download Resume</span>
        </button>

        <button
          onClick={handleConnectForWork}
          className="w-full sm:flex-1 group relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold text-black bg-gradient-to-r from-green-400 via-emerald-300 to-green-400 hover:brightness-110 shadow-[0_0_20px_rgba(74,222,128,0.3)] hover:shadow-[0_0_30px_rgba(74,222,128,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          <span>Connect for work</span>
        </button>
      </div>
    </motion.div>
  )
}
