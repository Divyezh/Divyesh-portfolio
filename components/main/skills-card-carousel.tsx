'use client'

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  Layers,
  Cpu,
  Database,
  Cloud,
  Code2,
  Terminal,
  Activity
} from 'lucide-react'

export interface SkillCardData {
  id: string
  name: string
  versionTag: string
  category: 'Frontend' | 'Backend' | 'AI & LLM' | 'DevOps'
  categoryCode: string
  role: string
  level: 'Expert' | 'Advanced' | 'Intermediate'
  icon: string
  brandColor: string
  bgGradient: string
  glowColor: string
  borderColor: string
  chips: string[]
  stats: string
  metricLabel: string
  serialNo: string
}

export const SKILL_CARDS: SkillCardData[] = [
  {
    id: 'nextjs',
    name: 'Next.js 14',
    versionTag: 'v14.2 // APP ROUTER',
    category: 'Frontend',
    categoryCode: 'SYS.01 // CORE',
    role: 'Full-Stack React Architecture',
    level: 'Advanced',
    icon: '/assets/next-js-svgrepo-com.svg',
    brandColor: '#FFFFFF',
    bgGradient: 'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.12) 0%, rgba(20,20,24,0.95) 55%, #09090b 100%)',
    glowColor: 'rgba(255, 255, 255, 0.25)',
    borderColor: 'rgba(255, 255, 255, 0.22)',
    chips: ['App Router', 'Server Actions', 'SSR / Edge'],
    stats: 'SUB-SECOND LCP',
    metricLabel: 'PERFORMANCE',
    serialNo: 'DVS-NXT-01'
  },
  {
    id: 'react',
    name: 'React.js',
    versionTag: 'v19.0 // CONCURRENT',
    category: 'Frontend',
    categoryCode: 'FE.02 // CLIENT',
    role: 'Component Architecture & Reactive State',
    level: 'Expert',
    icon: '/assets/react-svgrepo-com.svg',
    brandColor: '#00D8FE',
    bgGradient: 'radial-gradient(circle at 50% 20%, rgba(0,216,254,0.18) 0%, rgba(8,24,38,0.95) 55%, #030d17 100%)',
    glowColor: 'rgba(0, 216, 254, 0.38)',
    borderColor: 'rgba(0, 216, 254, 0.3)',
    chips: ['Concurrent Mode', 'Custom Hooks', 'Virtual DOM'],
    stats: '60 FPS FLUID',
    metricLabel: 'RUN-TIME',
    serialNo: 'DVS-RCT-02'
  },
  {
    id: 'claude',
    name: 'Claude 3.7',
    versionTag: 'ANTHROPIC // AGENTIC',
    category: 'AI & LLM',
    categoryCode: 'AI.03 // COGNITIVE',
    role: 'Reasoning Pipelines & Streaming SSE',
    level: 'Advanced',
    icon: '/assets/claude-ai-icon.svg',
    brandColor: '#D97706',
    bgGradient: 'radial-gradient(circle at 50% 20%, rgba(234,88,12,0.2) 0%, rgba(36,16,10,0.95) 55%, #0f0603 100%)',
    glowColor: 'rgba(234, 88, 12, 0.42)',
    borderColor: 'rgba(249, 115, 22, 0.32)',
    chips: ['Prompt Chaining', 'Tool-Use Calls', 'Real-Time SSE'],
    stats: '45% LATENCY CUT',
    metricLabel: 'STREAM ENGINE',
    serialNo: 'DVS-CLD-03'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    versionTag: 'v5.5 // STRICT MODE',
    category: 'Frontend',
    categoryCode: 'SYS.04 // TYPE-SAFE',
    role: 'Strict Static Typing & Data Contracts',
    level: 'Advanced',
    icon: '/assets/typescript-svgrepo-com.svg',
    brandColor: '#3178C6',
    bgGradient: 'radial-gradient(circle at 50% 20%, rgba(49,120,198,0.2) 0%, rgba(12,28,54,0.95) 55%, #050d1a 100%)',
    glowColor: 'rgba(49, 120, 198, 0.38)',
    borderColor: 'rgba(96, 165, 250, 0.3)',
    chips: ['Strict Generics', 'Zod Schemas', 'Utility Types'],
    stats: '100% TYPE SAFE',
    metricLabel: 'INTEGRITY',
    serialNo: 'DVS-TS-04'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    versionTag: 'v20 LTS // EVENT LOOP',
    category: 'Backend',
    categoryCode: 'BE.05 // RUNTIME',
    role: 'High-Throughput Microservice Runtimes',
    level: 'Advanced',
    icon: '/assets/node-js-icon.svg',
    brandColor: '#22C55E',
    bgGradient: 'radial-gradient(circle at 50% 20%, rgba(34,197,94,0.18) 0%, rgba(8,36,20,0.95) 55%, #03140a 100%)',
    glowColor: 'rgba(34, 197, 94, 0.38)',
    borderColor: 'rgba(74, 222, 128, 0.3)',
    chips: ['Event Loop', 'V8 Engine', 'REST & Sockets'],
    stats: '10K+ RPS',
    metricLabel: 'THROUGHPUT',
    serialNo: 'DVS-ND-05'
  },
  {
    id: 'openai',
    name: 'OpenAI API',
    versionTag: 'GPT-4o // EMBEDDINGS',
    category: 'AI & LLM',
    categoryCode: 'AI.06 // MODELS',
    role: 'Cognitive Vector RAG & Function Calling',
    level: 'Advanced',
    icon: '/assets/openai-icon.svg',
    brandColor: '#10A37F',
    bgGradient: 'radial-gradient(circle at 50% 20%, rgba(16,163,127,0.2) 0%, rgba(8,36,30,0.95) 55%, #031410 100%)',
    glowColor: 'rgba(16, 163, 127, 0.38)',
    borderColor: 'rgba(52, 211, 153, 0.3)',
    chips: ['Function Calling', 'Vector RAG', 'Token Pipelines'],
    stats: 'SEMANTIC ACCURACY',
    metricLabel: 'INFERENCE',
    serialNo: 'DVS-OAI-06'
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    versionTag: 'v3 / v4 // JIT ENGINE',
    category: 'Frontend',
    categoryCode: 'FE.07 // STYLING',
    role: 'Responsive Tokens & Dynamic Micro-Interactions',
    level: 'Expert',
    icon: '/assets/tailwind-css-svgrepo-com.svg',
    brandColor: '#06B6D4',
    bgGradient: 'radial-gradient(circle at 50% 20%, rgba(6,182,212,0.2) 0%, rgba(6,36,44,0.95) 55%, #021217 100%)',
    glowColor: 'rgba(6, 182, 212, 0.38)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    chips: ['Design Tokens', 'Fluid Typography', 'Custom Utility'],
    stats: '0 RUNTIME CSS',
    metricLabel: 'FOOTPRINT',
    serialNo: 'DVS-TW-07'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    versionTag: 'v16 // ACID ENGINE',
    category: 'Backend',
    categoryCode: 'DB.08 // STORAGE',
    role: 'Relational Schemas & High-Volume Persistence',
    level: 'Advanced',
    icon: '/assets/postgresql-logo-svgrepo-com.svg',
    brandColor: '#336791',
    bgGradient: 'radial-gradient(circle at 50% 20%, rgba(51,103,145,0.22) 0%, rgba(12,26,42,0.95) 55%, #050d17 100%)',
    glowColor: 'rgba(51, 103, 145, 0.38)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    chips: ['B-Tree Indexing', 'ACID Protocol', 'Complex Joins'],
    stats: 'STRICT ACID',
    metricLabel: 'RELIABILITY',
    serialNo: 'DVS-PG-08'
  },
  {
    id: 'docker',
    name: 'Docker',
    versionTag: 'OCI // COMPOSE',
    category: 'DevOps',
    categoryCode: 'OPS.09 // CLOUD',
    role: 'Containerized Microservices & Multi-Stage Builds',
    level: 'Intermediate',
    icon: '/assets/docker-icon.svg',
    brandColor: '#0284C7',
    bgGradient: 'radial-gradient(circle at 50% 20%, rgba(2,132,199,0.2) 0%, rgba(8,30,52,0.95) 55%, #030e1a 100%)',
    glowColor: 'rgba(2, 132, 199, 0.38)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    chips: ['Multi-Stage', 'Docker Compose', 'CI Workflows'],
    stats: 'PORTABLE DEPLOY',
    metricLabel: 'INFRA',
    serialNo: 'DVS-DKR-09'
  },
  {
    id: 'prisma',
    name: 'Prisma ORM',
    versionTag: 'v5 // SCHEMA FIRST',
    category: 'Backend',
    categoryCode: 'DB.10 // ORM',
    role: 'Declarative Schemas & Type-Safe Queries',
    level: 'Advanced',
    icon: '/assets/prisma-icon.svg',
    brandColor: '#5A67D8',
    bgGradient: 'radial-gradient(circle at 50% 20%, rgba(90,103,216,0.2) 0%, rgba(22,18,52,0.95) 55%, #090718 100%)',
    glowColor: 'rgba(90, 103, 216, 0.38)',
    borderColor: 'rgba(129, 140, 248, 0.3)',
    chips: ['Type-Safe CRUD', 'Auto Migrations', 'Relation Filters'],
    stats: 'ZERO TYPO BUGS',
    metricLabel: 'DATA LAYER',
    serialNo: 'DVS-PRS-10'
  },
  {
    id: 'framer',
    name: 'Framer Motion',
    versionTag: '60FPS // SPRINGS',
    category: 'Frontend',
    categoryCode: 'FE.11 // MOTION',
    role: 'Physics-Based Choreography & Scroll Physics',
    level: 'Advanced',
    icon: '/assets/framer-black-icon.svg',
    brandColor: '#E11D48',
    bgGradient: 'radial-gradient(circle at 50% 20%, rgba(225,29,72,0.2) 0%, rgba(38,10,22,0.95) 55%, #120309 100%)',
    glowColor: 'rgba(225, 29, 72, 0.38)',
    borderColor: 'rgba(251, 113, 133, 0.3)',
    chips: ['Physics Springs', 'Layout Morph', 'GPU Accelerated'],
    stats: 'HARDWARE ACCEL',
    metricLabel: 'MOTION CHOREO',
    serialNo: 'DVS-FRM-11'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    versionTag: 'ES2024+ // ASYNC',
    category: 'Frontend',
    categoryCode: 'SYS.12 // RUNTIME',
    role: 'Modern Asynchronous JavaScript & Event Engines',
    level: 'Expert',
    icon: '/assets/javascript-programming-language-icon.svg',
    brandColor: '#F59E0B',
    bgGradient: 'radial-gradient(circle at 50% 20%, rgba(245,158,11,0.2) 0%, rgba(38,26,8,0.95) 55%, #120c02 100%)',
    glowColor: 'rgba(245, 158, 11, 0.38)',
    borderColor: 'rgba(251, 191, 36, 0.3)',
    chips: ['Closures & Scopes', 'Async / Await', 'Prototypes'],
    stats: 'ECMA ENGINE',
    metricLabel: 'FOUNDATION',
    serialNo: 'DVS-JS-12'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    versionTag: 'v7 // DOCUMENT BSON',
    category: 'Backend',
    categoryCode: 'DB.13 // NOSQL',
    role: 'Document Stores & Aggregation Pipelines',
    level: 'Intermediate',
    icon: '/assets/mongodb-icon.svg',
    brandColor: '#10B981',
    bgGradient: 'radial-gradient(circle at 50% 20%, rgba(16,185,129,0.2) 0%, rgba(8,36,24,0.95) 55%, #03140c 100%)',
    glowColor: 'rgba(16, 185, 129, 0.38)',
    borderColor: 'rgba(52, 211, 153, 0.3)',
    chips: ['Pipelines', 'BSON Documents', 'Indexing'],
    stats: 'DYNAMIC SCHEMA',
    metricLabel: 'NOSQL SCALE',
    serialNo: 'DVS-MDB-13'
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    versionTag: 'VCS // CI/CD ACTIONS',
    category: 'DevOps',
    categoryCode: 'OPS.14 // VERSION',
    role: 'Distributed Version Control & Automation',
    level: 'Advanced',
    icon: '/assets/git-icon.svg',
    brandColor: '#F05032',
    bgGradient: 'radial-gradient(circle at 50% 20%, rgba(240,80,50,0.2) 0%, rgba(36,14,10,0.95) 55%, #120503 100%)',
    glowColor: 'rgba(240, 80, 50, 0.38)',
    borderColor: 'rgba(251, 113, 133, 0.3)',
    chips: ['Branch Strategies', 'GitHub Actions', 'Code Audits'],
    stats: 'ZERO DRIFT',
    metricLabel: 'VERSION TREE',
    serialNo: 'DVS-GIT-14'
  }
]

export default function SkillsCardCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isReducedMotion = useReducedMotion()

  // State
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [containerWidth, setContainerWidth] = useState<number>(1200)
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0)

  // Motion physics refs (tracked outside React state to prevent 60fps re-render overhead)
  const offsetRef = useRef<number>(0)
  const velocityRef = useRef<number>(0)
  const isDraggingRef = useRef<boolean>(false)
  const dragStartXRef = useRef<number>(0)
  const dragStartOffsetRef = useRef<number>(0)
  const lastPointerTimeRef = useRef<number>(0)
  const lastPointerXRef = useRef<number>(0)
  const targetOffsetRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Card dimensions and geometry
  const cardWidth = 276
  const cardGap = 24
  const stride = cardWidth + cardGap // 300px
  const count = SKILL_CARDS.length // 14
  const totalWidth = count * stride // 4200px

  // Auto-scroll speed: moves RIGHT TO LEFT (offset decreases continuously)
  // Increased from 40 to 88 px/sec for dynamic, snappy flow
  const baseSpeed = 88 // pixels per second

  // Filter cards by category
  const filteredIndices = useMemo(() => {
    if (selectedCategory === 'All') return SKILL_CARDS.map((_, i) => i)
    return SKILL_CARDS.map((card, i) => (card.category === selectedCategory ? i : -1)).filter(i => i !== -1)
  }, [selectedCategory])

  // Measure container width
  useEffect(() => {
    if (!containerRef.current) return
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth)
      }
    }
    updateSize()
    const resizeObserver = new ResizeObserver(updateSize)
    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  // Continuous animation loop (right-to-left smooth movement + drag momentum)
  useEffect(() => {
    let lastTime = performance.now()

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1) // clamp dt to avoid huge jumps
      lastTime = currentTime

      if (!isDraggingRef.current) {
        if (targetOffsetRef.current !== null) {
          // Smooth spring to target offset when navigation button clicked
          const diff = targetOffsetRef.current - offsetRef.current
          if (Math.abs(diff) < 0.5) {
            offsetRef.current = targetOffsetRef.current
            targetOffsetRef.current = null
            velocityRef.current = 0
          } else {
            offsetRef.current += diff * Math.min(10 * dt, 0.25)
          }
        } else if (Math.abs(velocityRef.current) > 1) {
          // Momentum glide on drag release
          offsetRef.current += velocityRef.current * dt
          velocityRef.current *= Math.pow(0.92, dt * 60)
        } else {
          // Automatic right-to-left scrolling
          velocityRef.current = 0
          if (isPlaying && !isHovered && !isReducedMotion) {
            // Negative movement moves content from right to left
            offsetRef.current -= baseSpeed * dt
          }
        }

        // Seamless infinite wrap-around
        if (offsetRef.current < -totalWidth) {
          offsetRef.current += totalWidth
        } else if (offsetRef.current > 0) {
          offsetRef.current -= totalWidth
        }
      }

      // Calculate which card is currently closest to the center
      const centerX = containerWidth / 2
      // Find the card whose center is nearest to centerX
      let nearestIndex = 0
      let minDistance = Infinity

      for (let i = 0; i < count; i++) {
        // Compute position in screen coordinates
        let cardScreenX = ((i * stride + offsetRef.current) % totalWidth + totalWidth) % totalWidth
        // Normalize to be near center
        if (cardScreenX > totalWidth / 2) {
          cardScreenX -= totalWidth
        }
        const cardCenter = cardScreenX + cardWidth / 2
        const dist = Math.abs(cardCenter - centerX)
        if (dist < minDistance) {
          minDistance = dist
          nearestIndex = i
        }
      }

      setActiveCardIndex(prev => (prev !== nearestIndex ? nearestIndex : prev))

      // Direct DOM transformation for silky 60fps/120fps hardware acceleration
      if (containerRef.current) {
        const cardNodes = containerRef.current.querySelectorAll<HTMLElement>('.skill-card-node')
        const dialNode = containerRef.current.querySelector<HTMLElement>('#rotary-dial')

        cardNodes.forEach(card => {
          const originalIndex = parseInt(card.dataset.index || '0', 10)
          // Compute screen position relative to viewport center
          let x = ((originalIndex * stride + offsetRef.current) % totalWidth + totalWidth) % totalWidth
          if (x > totalWidth / 2) {
            x -= totalWidth
          }

          const cardCenterX = x + cardWidth / 2
          const dx = cardCenterX - centerX
          const isMobileViewport = containerWidth < 640
          const maxDistance = isMobileViewport ? Math.max(containerWidth * 0.44, 250) : Math.max(containerWidth * 0.48, 500)
          const u = Math.max(-1.5, Math.min(1.5, dx / maxDistance))

          // Convex Arc & Fanning transformation (matching the user's reference image!)
          // rotZ fans the cards like a hand of cards / roulette
          const rotZ = u * (isMobileViewport ? 9 : 13)
          // transY creates the arch: highest in the center (u=0), sloping down at the sides (u^2)
          const transY = Math.pow(Math.abs(u), 1.7) * (isMobileViewport ? 26 : 36)
          // rotY adds subtle 3D cylindrical perspective curvature
          const rotY = -u * (isMobileViewport ? 10 : 14)
          // scale emphasizes the active centerpiece card
          const scale = Math.max(isMobileViewport ? 0.88 : 0.86, 1 - Math.pow(u, 2) * (isMobileViewport ? 0.1 : 0.08))
          // opacity dims cards only at the far edges
          const opacity = Math.max(0.18, 1 - Math.pow(Math.abs(u), 3) * 0.45)
          const zIndex = Math.round(100 - Math.abs(u) * 20)

          card.style.transform = `translate3d(${x}px, ${transY}px, 0px) rotateZ(${rotZ}deg) rotateY(${rotY}deg) scale(${scale})`
          card.style.zIndex = `${zIndex}`
          card.style.opacity = `${opacity}`
        })

        // Mechanical Dial Rotation: rotates in precise synchronization with card movement!
        if (dialNode) {
          // Complete revolution every full loop of cards
          const dialDeg = (offsetRef.current / totalWidth) * 360
          dialNode.style.transform = `rotate(${dialDeg}deg)`
        }
      }

      animationFrameRef.current = requestAnimationFrame(loop)
    }

    animationFrameRef.current = requestAnimationFrame(loop)
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [containerWidth, count, stride, totalWidth, isPlaying, isHovered, isReducedMotion, baseSpeed])

  // Mouse hover handlers: only active on pointer/mouse devices, never sticky on touchscreens
  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  // Pointer Drag Handlers (Manual control)
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true
    targetOffsetRef.current = null
    dragStartXRef.current = e.clientX
    dragStartOffsetRef.current = offsetRef.current
    lastPointerXRef.current = e.clientX
    lastPointerTimeRef.current = performance.now()
    velocityRef.current = 0
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    } catch {
      // Ignored if unsupported
    }
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return
    const currentX = e.clientX
    const now = performance.now()
    const dt = Math.max(now - lastPointerTimeRef.current, 1)

    const delta = currentX - dragStartXRef.current
    offsetRef.current = dragStartOffsetRef.current + delta

    // Calculate instantaneous drag velocity for momentum throw
    const instantaneousVelocity = ((currentX - lastPointerXRef.current) / dt) * 1000
    velocityRef.current = instantaneousVelocity

    lastPointerXRef.current = currentX
    lastPointerTimeRef.current = now
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setIsHovered(false) // Guarantee auto-scroll resumes immediately after touch release
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      // Ignored if already released
    }
  }

  // Navigation Button Handlers
  const handlePrev = useCallback(() => {
    const currentCard = Math.round(-offsetRef.current / stride)
    targetOffsetRef.current = -(currentCard - 1) * stride
  }, [stride])

  const handleNext = useCallback(() => {
    const currentCard = Math.round(-offsetRef.current / stride)
    targetOffsetRef.current = -(currentCard + 1) * stride
  }, [stride])

  // Category jump handler
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    if (category === 'All') return

    // Find the first card with this category
    const targetIndex = SKILL_CARDS.findIndex(c => c.category === category)
    if (targetIndex !== -1) {
      targetOffsetRef.current = -targetIndex * stride
    }
  }

  const activeCard = SKILL_CARDS[activeCardIndex] || SKILL_CARDS[0]

  return (
    <div className="w-full flex flex-col items-center select-none relative my-6">
      {/* ─── CATEGORY FILTER PILLS ─── */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 z-30 px-4">
        {(['All', 'Frontend', 'Backend', 'AI & LLM', 'DevOps'] as const).map(cat => {
          const isActive = selectedCategory === cat
          return (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border flex items-center gap-1.5 ${
                isActive
                  ? 'bg-black text-white border-white/25 shadow-[0_2px_14px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.25)] scale-105 font-bold'
                  : 'bg-white/[0.04] text-slate-300 border-white/10 hover:border-white/20 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {cat === 'All' && <Layers className="w-3 h-3 text-indigo-400" />}
              {cat === 'Frontend' && <Code2 className="w-3 h-3 text-indigo-400" />}
              {cat === 'Backend' && <Database className="w-3 h-3 text-indigo-400" />}
              {cat === 'AI & LLM' && <Cpu className="w-3 h-3 text-indigo-400" />}
              {cat === 'DevOps' && <Cloud className="w-3 h-3 text-indigo-400" />}
              {cat.toUpperCase()}
            </button>
          )
        })}
      </div>

      {/* ─── THE CURVED 3D CARD CAROUSEL STAGE ─── */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[475px] sm:h-[550px] overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center touch-pan-y"
        style={{ perspective: '1200px', touchAction: 'pan-y' }}
      >
        {/* Soft edge blur vignettes to ensure seamless infinite right-to-left entry/exit */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#050508] via-[#050508]/85 to-transparent z-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#050508] via-[#050508]/85 to-transparent z-40" />

        {/* ─── ROTARY MECHANICAL COMPASS / RADIAL DIAL (from reference image) ─── */}
        <div className="absolute -bottom-52 left-1/2 -translate-x-1/2 w-[540px] h-[540px] sm:w-[720px] sm:h-[720px] pointer-events-none z-10 flex items-center justify-center">
          {/* Rotating outer compass rings */}
          <div
            id="rotary-dial"
            className="absolute inset-0 rounded-full border border-white/[0.08] border-dashed transition-transform duration-75 will-change-transform flex items-center justify-center"
          >
            {/* Inner concentric technical rings */}
            <div className="w-[84%] h-[84%] rounded-full border border-white/[0.05]" />
            <div className="w-[68%] h-[68%] rounded-full border border-dashed border-white/[0.08]" />
            <div className="w-[52%] h-[52%] rounded-full border border-white/[0.06]" />

            {/* Circular text SVG along the arc */}
            <svg
              className="absolute inset-0 w-full h-full text-[10px] font-mono tracking-[0.28em] fill-white/20 uppercase"
              viewBox="0 0 720 720"
            >
              <path
                id="orbitPath"
                d="M 360, 360 m -280, 0 a 280,280 0 1,1 560,0 a 280,280 0 1,1 -560,0"
                fill="none"
              />
              <text>
                <textPath href="#orbitPath" startOffset="0%">
                  • PRODUCTION ARSENAL • SCALABLE ARCHITECTURE • HIGH THROUGHPUT APIS • FULL STACK SYSTEM • AI PIPELINES • CLOUD READY
                </textPath>
              </text>
            </svg>

            {/* Precision degree tick marks */}
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-3 bg-white/15 top-1 origin-bottom"
                style={{
                  transform: `rotate(${i * 15}deg)`,
                  transformOrigin: '50% 360px'
                }}
              />
            ))}
          </div>

          {/* Stationary Center Indicator Peak (from screenshot: ▲ ME / ARSENAL) */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-white/90 mt-1 uppercase bg-[#0b0917] px-2.5 py-0.5 rounded-full border border-white/15 shadow-lg">
              CORE STACK
            </span>
          </div>

          {/* Ambient center spotlight bloom (VYRO royal indigo) */}
          <div className="w-80 h-80 rounded-full bg-indigo-600/15 blur-[95px] pointer-events-none" />
        </div>

        {/* ─── THE 14 SKILL CARDS (Rendered with 3D Convex Arc + Big Logo Symbols) ─── */}
        <div className="absolute inset-0 flex items-center justify-start pointer-events-none">
          {SKILL_CARDS.map((card, index) => {
            const isHighlighted = selectedCategory === 'All' || card.category === selectedCategory
            const isActiveCard = activeCardIndex === index
            const isMobile = containerWidth < 640

            return (
              <div
                key={card.id}
                data-index={index}
                className="skill-card-node absolute top-1/2 -translate-y-1/2 will-change-transform pointer-events-auto transition-filter duration-300"
                style={{
                  width: `${isMobile ? 250 : cardWidth}px`,
                  height: isMobile ? '375px' : '400px',
                  filter: isHighlighted ? 'none' : 'grayscale(80%) opacity(0.35)'
                }}
              >
                {/* ─── THE CARD SURFACE ─── */}
                <div
                  className="relative w-full h-full rounded-[28px] overflow-hidden flex flex-col justify-between p-5 transition-shadow duration-300 group"
                  style={{
                    background: card.bgGradient,
                    border: `1px solid ${isActiveCard ? card.borderColor : 'rgba(255,255,255,0.12)'}`,
                    boxShadow: isActiveCard
                      ? `0 25px 60px -15px ${card.glowColor}, inset 0 1px 1px rgba(255,255,255,0.3)`
                      : `0 15px 35px -10px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.12)`
                  }}
                >
                  {/* Specular glass highlight on top rim */}
                  <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

                  {/* Corner crosshair accents for high-tech collectible feel */}
                  <span className="absolute top-3 left-3 text-[10px] font-mono text-white/20 select-none">+</span>
                  <span className="absolute top-3 right-3 text-[10px] font-mono text-white/20 select-none">+</span>
                  <span className="absolute bottom-3 left-3 text-[10px] font-mono text-white/20 select-none">+</span>
                  <span className="absolute bottom-3 right-3 text-[10px] font-mono text-white/20 select-none">+</span>

                  {/* ─── CARD HEADER ─── */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-white/60 tracking-wider font-semibold">
                        {card.categoryCode}
                      </span>
                      <span className="text-[11px] font-mono font-medium text-white/90">
                        {card.serialNo}
                      </span>
                    </div>

                    {/* Level / Status badge */}
                    <div
                      className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 border"
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        borderColor: card.borderColor,
                        color: card.brandColor
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: card.brandColor }}
                      />
                      {card.level}
                    </div>
                  </div>

                  {/* ─── CARD CENTERPIECE: GIANT LOGO SYMBOL WITH MATCHED COLOR GLOW ─── */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
                    {/* Concentric decorative ring behind symbol (tarot / crest motif from screenshot) */}
                    <div
                      className="relative w-36 h-36 flex items-center justify-center rounded-full border transition-transform duration-500 group-hover:scale-105"
                      style={{
                        borderColor: `${card.borderColor}`,
                        backgroundColor: 'rgba(0,0,0,0.25)'
                      }}
                    >
                      {/* Secondary dashed orbit ring */}
                      <div
                        className="absolute inset-2 rounded-full border border-dashed opacity-40 animate-[spin_30s_linear_infinite]"
                        style={{ borderColor: card.brandColor }}
                      />

                      {/* Brand-matched multi-layer radiant glow */}
                      <div
                        className="absolute inset-0 rounded-full blur-[28px] opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ backgroundColor: card.glowColor }}
                      />

                      {/* The Big Brand Logo Symbol */}
                      <div className="relative w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                        <Image
                          src={card.icon}
                          alt={card.name}
                          width={88}
                          height={88}
                          className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110"
                          priority={index < 4}
                        />
                      </div>
                    </div>

                    {/* Technical Metric Stamp below logo */}
                    <div className="flex items-center gap-2 mt-3 px-2 py-0.5 rounded bg-black/40 border border-white/10 text-[9.5px] font-mono text-white/80">
                      <Activity className="w-2.5 h-2.5 text-white/60" />
                      <span>{card.stats}</span>
                    </div>
                  </div>

                  {/* ─── CARD FOOTER: NAME, ROLE & CHIPS ─── */}
                  <div className="relative z-10 flex flex-col">
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-none group-hover:text-white transition-colors">
                        {card.name}
                      </h4>
                      <span className="text-[10px] font-mono text-white/50">
                        {card.versionTag.split('//')[0].trim()}
                      </span>
                    </div>

                    <p className="text-xs text-white/70 mt-1 mb-2.5 line-clamp-1 font-medium">
                      {card.role}
                    </p>

                    {/* Capability Chip Pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {card.chips.map(chip => (
                        <span
                          key={chip}
                          className="px-2 py-0.5 rounded-md text-[9.5px] font-mono text-white/80 bg-white/[0.08] border border-white/[0.08] backdrop-blur-sm"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    {/* Bottom technical footer bar */}
                    <div className="mt-3 pt-2 border-t border-white/[0.08] flex items-center justify-between text-[9px] font-mono text-white/40">
                      <span>REV.2026 // DEPLOYED</span>
                      <span className="tracking-widest">||| |||| || |</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ─── INTERACTIVE TELEMETRY & CONTROLS TOOLBAR ─── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-4xl px-4 mt-4 z-30">
        {/* Active Card Telemetry Readout */}
        <div className="flex items-center gap-3 bg-[#090714]/85 border border-white/15 backdrop-blur-xl px-4 py-2 rounded-full text-xs font-mono text-slate-300 shadow-md">
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: activeCard.brandColor }} />
          <span className="text-white font-bold">{activeCard.name}</span>
          <span className="text-white/40">|</span>
          <span className="text-slate-400 hidden sm:inline">{activeCard.role}</span>
          <span className="text-white/30 hidden md:inline">•</span>
          <span className="text-indigo-400 font-bold ml-auto">{activeCardIndex + 1} / {count}</span>
        </div>

        {/* Manual Stepping & Playback Controls (VYRO Pill Buttons) */}
        <div className="flex items-center gap-2">
          {/* Previous Card Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous skill card"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-black/90 border border-white/15 text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/[0.08] hover:scale-105 active:scale-95 transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Auto-Scroll Toggle Play/Pause */}
          <button
            onClick={() => setIsPlaying(p => !p)}
            aria-label={isPlaying ? 'Pause automatic movement' : 'Resume automatic movement'}
            className="btn-pill-primary flex items-center gap-2 px-4 py-2 text-xs font-mono select-none"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-indigo-400" />
                <span>AUTO ON</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>PAUSED</span>
              </>
            )}
          </button>

          {/* Next Card Button */}
          <button
            onClick={handleNext}
            aria-label="Next skill card"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-black/90 border border-white/15 text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/[0.08] hover:scale-105 active:scale-95 transition-all shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Manual Drag Prompt Tip */}
      <p className="text-[11px] font-mono text-slate-500 mt-3 text-center">
        ↔ Drag horizontally with mouse or swipe touch to explore • Hover to freeze
      </p>
    </div>
  )
}

