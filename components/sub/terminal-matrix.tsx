'use client'

import React, { useEffect, useRef } from 'react'
import { X, Terminal } from 'lucide-react'

interface TerminalMatrixProps {
  onExit: () => void
}

export default function TerminalMatrix({ onExit }: TerminalMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンDEVYESH<>{}[]/*+~=-#$@!%&|'
    const charArray = chars.split('')
    const fontSize = 13

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 400
      canvas.height = canvas.parentElement?.clientHeight || 340
    }
    resize()

    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * -30))

    const render = () => {
      // Fade out background slightly each frame for trailing effect
      ctx.fillStyle = 'rgba(14, 7, 12, 0.12)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Alternate neon green and cyber pink characters
        const isPink = i % 4 === 0
        const isHead = Math.random() > 0.85

        if (isHead) {
          ctx.fillStyle = '#ffffff'
          ctx.shadowBlur = 8
          ctx.shadowColor = isPink ? '#E66277' : '#00ff88'
        } else if (isPink) {
          ctx.fillStyle = '#E66277'
          ctx.shadowBlur = 4
          ctx.shadowColor = '#E66277'
        } else {
          ctx.fillStyle = '#00ff88'
          ctx.shadowBlur = 3
          ctx.shadowColor = '#00ff88'
        }

        ctx.fillText(char, x, y)
        ctx.shadowBlur = 0

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onExit()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onExit])

  return (
    <div className="relative w-full h-full min-h-[340px] flex flex-col bg-[#0e070c] rounded-xl overflow-hidden border border-[#E66277]/40 shadow-[0_0_30px_rgba(230,98,119,0.3)]">
      {/* Top Banner */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-black/70 border-b border-white/10 z-10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#E66277] animate-pulse" />
          <span className="text-[11px] font-mono font-bold tracking-wider text-green-400">
            MATRIX_KERNEL // OVERRIDE
          </span>
        </div>
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/10 hover:bg-[#E66277]/30 text-xs font-mono text-white/80 hover:text-white transition-colors"
        >
          <X className="w-3 h-3" />
          <span>Exit Matrix (Esc)</span>
        </button>
      </div>

      {/* Canvas */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/60 border border-green-500/20 text-[10px] font-mono text-green-400/80 pointer-events-none">
          SYSTEM STREAM // DIVYESH_AI_CORE
        </div>
      </div>
    </div>
  )
}
