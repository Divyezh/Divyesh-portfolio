'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Terminal as TerminalIcon,
  Radar,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Download,
  ExternalLink,
  Send,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { terminalAudio } from './terminal-audio'
import TerminalMatrix from './terminal-matrix'
import TerminalGame from './terminal-game'
import TerminalHologram from './terminal-hologram'

interface LogEntry {
  id: string
  command?: string
  content: React.ReactNode
}

export default function CareerTerminal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  // Mode: 'radar' (boot animation) or 'cli' (interactive command line)
  const [mode, setMode] = useState<'radar' | 'cli'>('radar')
  const [activeModal, setActiveModal] = useState<'none' | 'matrix' | 'game' | 'indestructible'>('none')
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Radar Boot Sequence State
  const [step, setStep] = useState(0)

  // CLI State
  const [inputVal, setInputVal] = useState('')
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const terminalBottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Radar step triggers
  useEffect(() => {
    if (!isInView) return

    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 1800),
      setTimeout(() => setStep(4), 2800),
      setTimeout(() => {
        setStep(5)
      }, 4200),
      // Automatically unlock CLI prompt after initial scan
      setTimeout(() => {
        setMode('cli')
      }, 5500),
    ]

    return () => timers.forEach(clearTimeout)
  }, [isInView])

  // Scroll to bottom on new log in CLI
  useEffect(() => {
    if (mode === 'cli') {
      terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs, mode])

  const toggleSound = () => {
    const next = !soundEnabled
    setSoundEnabled(next)
    terminalAudio.enabled = next
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('sonidivyesh2004@gmail.com')
    setCopiedEmail(true)
    terminalAudio.playCommandChirp()
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const triggerDownloadResume = () => {
    terminalAudio.playCommandChirp()
    const link = document.createElement('a')
    link.href = '/Divyesh.pdf'
    link.download = 'Divyesh_Soni_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim()
    if (!cmd) return

    terminalAudio.playCommandChirp()

    // Add to history
    setHistory((prev) => [...prev, cmd])
    setHistoryIndex(-1)
    setInputVal('')

    const lower = cmd.toLowerCase()
    const entryId = Math.random().toString(36).substring(7)

    // Handle commands
    if (lower === 'clear') {
      setLogs([])
      return
    }

    if (lower === 'matrix') {
      setActiveModal('matrix')
      setLogs((prev) => [
        ...prev,
        {
          id: entryId,
          command: cmd,
          content: <span className="text-green-400">Launching Matrix Protocol stream...</span>,
        },
      ])
      return
    }

    if (lower === 'game') {
      setActiveModal('game')
      setLogs((prev) => [
        ...prev,
        {
          id: entryId,
          command: cmd,
          content: <span className="text-[#E66277]">Starting Cyber Bug Hunter arcade game...</span>,
        },
      ])
      return
    }

    if (lower.startsWith('sudo rm -rf') || lower === 'sudo rm -rf /') {
      setActiveModal('indestructible')
      setLogs((prev) => [
        ...prev,
        {
          id: entryId,
          command: cmd,
          content: (
            <div className="text-red-400 font-mono">
              [CRITICAL ALERT] root wipe rejected: &ldquo;Nice try! Divyesh&apos;s code is indestructible.&rdquo;
            </div>
          ),
        },
      ])
      return
    }

    if (lower === 'cat resume.txt' || lower === 'resume') {
      triggerDownloadResume()
      setLogs((prev) => [
        ...prev,
        {
          id: entryId,
          command: cmd,
          content: (
            <div className="space-y-2 font-mono text-xs border border-white/10 rounded-lg p-3 bg-black/40">
              <div className="flex items-center justify-between text-white font-bold pb-1 border-b border-white/10">
                <span>📄 DIVYESH_SONI_RESUME.PDF</span>
                <span className="text-green-400 text-[10px]">DOWNLOADING...</span>
              </div>
              <div className="text-gray-300">
                <div><span className="text-purple-400">ROLE:</span> Full Stack Developer & AI Engineer</div>
                <div><span className="text-purple-400">CORE:</span> Next.js 14, React 19, TypeScript, Node.js, WebRTC</div>
                <div><span className="text-purple-400">AI:</span> Anthropic Claude, OpenAI API, Prompt Engineering</div>
                <div><span className="text-purple-400">LOCATION:</span> Ahmedabad (Open to Remote / Relocation)</div>
              </div>
              <button
                onClick={triggerDownloadResume}
                className="mt-2 flex items-center gap-1.5 px-3 py-1 rounded bg-[#E66277]/20 border border-[#E66277]/50 text-white hover:bg-[#E66277]/40 transition-colors text-[11px]"
              >
                <Download className="w-3 h-3 text-[#E66277]" />
                <span>Download PDF Again</span>
              </button>
            </div>
          ),
        },
      ])
      return
    }

    if (lower === 'skills') {
      setLogs((prev) => [
        ...prev,
        {
          id: entryId,
          command: cmd,
          content: (
            <div className="space-y-2.5 font-mono text-xs">
              <div className="text-gray-400">━━━━━━━━ ACTIVE TECH STACK ━━━━━━━━</div>
              <div>
                <span className="text-cyan-400 font-bold block mb-1">FRONTEND:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Next.js 14', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'].map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-[10px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-green-400 font-bold block mb-1">BACKEND:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'WebRTC', 'REST APIs'].map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-green-500/10 border border-green-500/30 text-green-200 text-[10px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-purple-400 font-bold block mb-1">AI & LLM:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Claude API', 'OpenAI API', 'Gemini API', 'Prompt Chaining', 'SSE Streaming'].map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-200 text-[10px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-amber-400 font-bold block mb-1">DEVOPS & TOOLS:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Git/GitHub', 'Vercel', 'Docker', 'Figma', 'Linux'].map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-200 text-[10px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ),
        },
      ])
      return
    }

    if (lower === 'projects') {
      setLogs((prev) => [
        ...prev,
        {
          id: entryId,
          command: cmd,
          content: (
            <div className="space-y-2 font-mono text-xs">
              <div className="text-gray-400">━━━━━━━━ FEATURED REPOSITORIES ━━━━━━━━</div>
              
              <div className="p-2 rounded bg-white/5 border border-white/10 hover:border-[#E66277]/40 transition-colors">
                <div className="flex items-center justify-between font-bold text-white">
                  <span>1. VIVA Meeting</span>
                  <a
                    href="https://viva-meeting-app.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[10px] text-cyan-400 hover:underline"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
                <p className="text-[11px] text-gray-300 mt-0.5">
                  Native WebRTC P2P mesh video calling platform with zero third-party video SDKs.
                </p>
                <div className="flex gap-1 mt-1 text-[9px] text-[#E66277]">
                  #WebRTC #React19 #Socket.io
                </div>
              </div>

              <div className="p-2 rounded bg-white/5 border border-white/10 hover:border-[#E66277]/40 transition-colors">
                <div className="flex items-center justify-between font-bold text-white">
                  <span>2. VELVET.AI</span>
                  <a
                    href="https://github.com/Divyezh"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[10px] text-cyan-400 hover:underline"
                  >
                    <span>View Code</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
                <p className="text-[11px] text-gray-300 mt-0.5">
                  AI SaaS web generator using Anthropic Claude prompt-chaining with SSE streaming.
                </p>
                <div className="flex gap-1 mt-1 text-[9px] text-[#E66277]">
                  #ClaudeAPI #Nextjs #AI-SaaS
                </div>
              </div>

              <a
                href="#projects"
                className="inline-flex items-center gap-1 text-[11px] text-purple-300 hover:text-white underline mt-1"
              >
                <span>View all full project cards below</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          ),
        },
      ])
      return
    }

    if (lower === 'hire' || lower === 'contact') {
      setLogs((prev) => [
        ...prev,
        {
          id: entryId,
          command: cmd,
          content: (
            <div className="space-y-2 font-mono text-xs border border-green-500/30 rounded-lg p-3 bg-green-500/5">
              <div className="flex items-center gap-2 text-green-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>STATUS: AVAILABLE FOR WORK</span>
              </div>
              <p className="text-gray-300 text-[11px]">
                Seeking Frontend / Full Stack roles (Internship, Full-Time, Remote / On-site).
              </p>
              <div className="flex flex-col gap-1.5 pt-1">
                <div className="flex items-center justify-between bg-black/40 px-2 py-1 rounded border border-white/10">
                  <span className="text-gray-400 text-[11px]">sonidivyesh2004@gmail.com</span>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 text-[10px] text-green-400 hover:text-white"
                  >
                    {copiedEmail ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="flex gap-2 mt-1">
                  <a
                    href="mailto:sonidivyesh2004@gmail.com"
                    className="flex-1 text-center py-1 rounded bg-[#E66277] text-white font-bold text-[10px] hover:bg-rose-600 transition-colors"
                  >
                    Send Email
                  </a>
                  <a
                    href="#contact"
                    className="flex-1 text-center py-1 rounded bg-white/10 text-white font-bold text-[10px] hover:bg-white/20 transition-colors"
                  >
                    Scroll to Form
                  </a>
                </div>
              </div>
            </div>
          ),
        },
      ])
      return
    }

    if (lower === 'whoami' || lower === 'about') {
      setLogs((prev) => [
        ...prev,
        {
          id: entryId,
          command: cmd,
          content: (
            <div className="space-y-1 font-mono text-xs text-gray-300">
              <div><span className="text-purple-400 font-bold">IDENTITY:</span> Divyesh Soni</div>
              <div><span className="text-purple-400 font-bold">DISCIPLINE:</span> Full Stack Developer & Creative Engineer</div>
              <div><span className="text-purple-400 font-bold">SPECIALTY:</span> React 19, Next.js 14, WebRTC low-latency, Generative AI</div>
              <div className="text-[11px] text-gray-400 pt-1">
                Passionate about crafting pixel-perfect, ultra-responsive digital products with bleeding-edge web technologies.
              </div>
            </div>
          ),
        },
      ])
      return
    }

    if (lower === 'help' || lower === '?') {
      setLogs((prev) => [
        ...prev,
        {
          id: entryId,
          command: cmd,
          content: (
            <div className="space-y-1.5 font-mono text-xs">
              <div className="text-[#E66277] font-bold">AVAILABLE COMMANDS:</div>
              <div className="grid grid-cols-1 gap-1 text-[11px] text-gray-300">
                <div><span className="text-green-400 font-bold">skills</span> — categorized active tech stack badges</div>
                <div><span className="text-green-400 font-bold">projects</span> — quick launch best production projects</div>
                <div><span className="text-green-400 font-bold">hire</span> — view availability & connect directly</div>
                <div><span className="text-green-400 font-bold">cat resume.txt</span> — download official resume PDF</div>
                <div><span className="text-green-400 font-bold">game</span> — play retro Cyber Bug Hunter arcade</div>
                <div><span className="text-green-400 font-bold">matrix</span> — launch full cyberpunk digital rain</div>
                <div><span className="text-red-400 font-bold">sudo rm -rf /</span> — [RESTRICTED] system wipe test</div>
                <div><span className="text-green-400 font-bold">whoami</span> — bio & background of Divyesh</div>
                <div><span className="text-green-400 font-bold">clear</span> — clear terminal screen</div>
              </div>
            </div>
          ),
        },
      ])
      return
    }

    // Default unrecognized command
    setLogs((prev) => [
      ...prev,
      {
        id: entryId,
        command: cmd,
        content: (
          <div className="font-mono text-xs text-rose-300/90">
            command not found: &ldquo;{cmd}&rdquo;. Type <button onClick={() => executeCommand('help')} className="underline text-green-400 font-bold">help</button> to see all available commands.
          </div>
        ),
      },
    ])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    terminalAudio.playKeyClick()

    if (e.key === 'Enter') {
      executeCommand(inputVal)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(nextIdx)
        setInputVal(history[nextIdx] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (history.length > 0) {
        const nextIdx = historyIndex + 1
        if (nextIdx >= history.length) {
          setHistoryIndex(-1)
          setInputVal('')
        } else {
          setHistoryIndex(nextIdx)
          setInputVal(history[nextIdx] || '')
        }
      }
    }
  }

  const skillsList = [
    'React', 'Next.js', 'TypeScript', 'Tailwind CSS',
    'Node.js', 'Express.js', 'AI Integration', 'UI Engineering', 'Responsive Design'
  ]

  // Suggestion chips
  const quickChips = [
    'help',
    'skills',
    'projects',
    'hire',
    'cat resume.txt',
    'game',
    'matrix',
    'sudo rm -rf /',
  ]

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full max-w-[340px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[520px] rounded-2xl overflow-hidden border border-[#E66277]/40 bg-[#130812]/95 backdrop-blur-2xl shadow-[0_0_50px_rgba(230,98,119,0.25)] group flex flex-col"
    >
      {/* Noise Texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      {/* Top Bar with Mode Switcher & Window Controls */}
      <div className="relative z-10 flex items-center justify-between px-3.5 py-2.5 border-b border-white/10 bg-black/60 select-none">
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_6px_rgba(234,179,8,0.5)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
          </div>

          <span className="text-[10px] sm:text-[11px] font-mono text-gray-400 pl-1">
            divyesh@neural-os
          </span>
        </div>

        {/* View Switcher Tabs & Audio Toggle */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex items-center rounded-lg bg-white/5 p-0.5 border border-white/10">
            <button
              onClick={() => {
                terminalAudio.playCommandChirp()
                setMode('radar')
              }}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono transition-colors ${
                mode === 'radar'
                  ? 'bg-[#E66277]/30 text-white font-bold border border-[#E66277]/50'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Radar className="w-2.5 h-2.5" />
              <span>Radar</span>
            </button>
            <button
              onClick={() => {
                terminalAudio.playCommandChirp()
                setMode('cli')
                setTimeout(() => inputRef.current?.focus(), 100)
              }}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono transition-colors ${
                mode === 'cli'
                  ? 'bg-[#E66277]/30 text-white font-bold border border-[#E66277]/50'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <TerminalIcon className="w-2.5 h-2.5 text-green-400" />
              <span>CLI</span>
            </button>
          </div>

          {/* Audio Mute/Unmute */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Terminal Audio' : 'Unmute Terminal Audio'}
            className="p-1 rounded bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-3 h-3 text-cyan-400" />
            ) : (
              <VolumeX className="w-3 h-3 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {/* Main Container: Modals (Matrix, Game, Indestructible) OR Normal Views */}
      <div className="relative z-10 h-[320px] sm:h-[360px] md:h-[400px] overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {activeModal === 'matrix' && (
            <TerminalMatrix key="matrix" onExit={() => setActiveModal('none')} />
          )}

          {activeModal === 'game' && (
            <TerminalGame key="game" onExit={() => setActiveModal('none')} />
          )}

          {activeModal === 'indestructible' && (
            <TerminalHologram key="hologram" onDismiss={() => setActiveModal('none')} />
          )}

          {activeModal === 'none' && mode === 'radar' && (
            /* AUTO RADAR SCAN VIEW */
            <motion.div
              key="radar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-3.5 sm:p-5 font-mono text-[11px] sm:text-xs md:text-sm text-gray-300 h-full overflow-y-auto custom-scrollbar flex flex-col gap-1.5 sm:gap-2"
            >
              {step >= 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <span className="text-purple-400">{'>'}</span> Initializing Neural Engine...
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-green-400 ml-4">✓ Success</motion.div>
                </motion.div>
              )}

              {step >= 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <span className="text-purple-400">{'>'}</span> Loading Developer Profile...
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-green-400 ml-4">✓ Success</motion.div>
                  <div className="mt-1"><span className="text-purple-400">{'>'}</span> Connecting Career Radar...</div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-green-400 ml-4">✓ Connected</motion.div>
                </motion.div>
              )}

              {step >= 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <span className="text-purple-400">{'>'}</span> Scanning Opportunities...
                  <div className="flex items-center gap-2 text-purple-300 mt-1 ml-4">
                    <motion.div
                      initial={{ clipPath: 'inset(0 100% 0 0)' }}
                      animate={{ clipPath: 'inset(0 0% 0 0)' }}
                      transition={{ duration: 1, ease: 'linear' }}
                    >
                      ████████████████████████
                    </motion.div>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                      100%
                    </motion.span>
                  </div>
                </motion.div>
              )}

              {step >= 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-gray-400">
                  ━━━━━━━━━━━━━━━━━━━━━━━━━━
                  <div className="text-white font-semibold my-2">MATCHING SKILLS</div>
                  <div className="grid grid-cols-2 gap-1">
                    {skillsList.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-green-400">✓</span> {skill}
                      </motion.div>
                    ))}
                  </div>
                  ━━━━━━━━━━━━━━━━━━━━━━━━━━
                </motion.div>
              )}

              {step >= 5 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="mt-2 border border-green-500/30 bg-green-500/5 rounded-lg p-3 sm:p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-green-400 font-bold text-sm sm:text-base">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span>MATCH FOUND</span>
                    </div>
                    <button
                      onClick={() => {
                        terminalAudio.playCommandChirp()
                        setMode('cli')
                      }}
                      className="px-2 py-0.5 rounded bg-green-400/20 text-green-300 text-[10px] font-mono border border-green-400/40 hover:bg-green-400/30"
                    >
                      ⚡ Open CLI Prompt
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-gray-500 text-[10px]">ROLE</div>
                      <div className="text-white font-semibold">Full Stack Engineer</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-[10px]">AVAILABILITY</div>
                      <div className="text-purple-300 font-semibold">Immediate Joining</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeModal === 'none' && mode === 'cli' && (
            /* INTERACTIVE HOLOGRAPHIC CLI VIEW */
            <motion.div
              key="cli"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => inputRef.current?.focus()}
              className="p-3 sm:p-4 font-mono text-[11px] sm:text-xs text-gray-300 h-full overflow-y-auto custom-scrollbar flex flex-col justify-between cursor-text"
            >
              {/* Output log */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {/* Welcome prompt banner */}
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1 text-gray-300">
                  <div className="flex items-center gap-1.5 text-green-400 font-bold text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#E66277]" />
                    <span>Divyesh Neural Terminal v2.4 Online</span>
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Type a command or tap any shortcut below. Try <span className="text-green-400 font-semibold">help</span>, <span className="text-[#E66277] font-semibold">game</span>, or <span className="text-red-400 font-semibold">sudo rm -rf /</span>
                  </div>
                </div>

                {/* Rendered History Logs */}
                {logs.map((log) => (
                  <div key={log.id} className="space-y-1">
                    {log.command && (
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <span className="text-green-400">divyesh@neural-os:~$</span>
                        <span className="text-white font-bold">{log.command}</span>
                      </div>
                    )}
                    <div className="pl-2 sm:pl-3">{log.content}</div>
                  </div>
                ))}

                {/* Scroll Anchor */}
                <div ref={terminalBottomRef} />
              </div>

              {/* Bottom: Active Input Line + Command Pill Shortcuts */}
              <div className="mt-2 pt-2 border-t border-white/10 flex flex-col gap-2 bg-[#130812]">
                {/* Prompt Line */}
                <div className="flex items-center gap-1.5">
                  <span className="text-green-400 font-bold text-xs">divyesh@neural-os:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="type 'help', 'game', 'skills'..."
                    className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-gray-600 caret-[#E66277]"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                  <button
                    onClick={() => executeCommand(inputVal)}
                    disabled={!inputVal.trim()}
                    className="px-2 py-0.5 rounded bg-[#E66277]/20 border border-[#E66277]/40 text-[#E66277] hover:bg-[#E66277]/40 hover:text-white text-[10px] font-mono transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  >
                    Run
                  </button>
                </div>

                {/* Quick Shortcut Buttons */}
                <div className="flex flex-wrap gap-1 items-center max-h-16 overflow-x-auto no-scrollbar">
                  <span className="text-[10px] text-gray-500 mr-0.5">Quick:</span>
                  {quickChips.map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => executeCommand(cmd)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-all ${
                        cmd === 'sudo rm -rf /'
                          ? 'bg-red-500/10 border-red-500/30 text-red-300 hover:bg-red-500/30 hover:border-red-500'
                          : cmd === 'game'
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/30'
                          : cmd === 'matrix'
                          ? 'bg-green-500/10 border-green-500/30 text-green-300 hover:bg-green-500/30'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-[#E66277]/20 hover:border-[#E66277]/40 hover:text-white'
                      }`}
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Edge Hover Glow */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-[#E66277]/50 rounded-2xl transition-colors duration-500 pointer-events-none" />
    </motion.div>
  )
}
