'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Bug, X, Trophy, Sparkles, Zap, RotateCcw } from 'lucide-react'
import { terminalAudio } from './terminal-audio'

interface BugEntity {
  id: number
  name: string
  x: number // percentage 5 - 85
  y: number // percentage 0 - 100
  speed: number
  color: string
}

const BUG_TYPES = [
  { name: 'TypeError', color: '#f87171' },
  { name: '404 Bug', color: '#fbbf24' },
  { name: 'MemoryLeak', color: '#c084fc' },
  { name: 'NullPointer', color: '#38bdf8' },
  { name: 'SyntaxError', color: '#f43f5e' },
  { name: 'MergeConflict', color: '#fb923c' },
]

interface TerminalGameProps {
  onExit: () => void
}

export default function TerminalGame({ onExit }: TerminalGameProps) {
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [combo, setCombo] = useState(1)
  const [lives, setLives] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [bugs, setBugs] = useState<BugEntity[]>([])
  const [turretX, setTurretX] = useState(50) // percentage 10 - 90
  const [lasers, setLasers] = useState<{ id: number; x: number; y: number }[]>([])
  const nextBugId = useRef(1)
  const nextLaserId = useRef(1)
  const containerRef = useRef<HTMLDivElement>(null)

  // Load high score
  useEffect(() => {
    try {
      const saved = localStorage.getItem('divyesh_terminal_highscore')
      if (saved) setHighScore(parseInt(saved, 10))
    } catch {
      // LocalStorage fallback
    }
  }, [])

  // Fire laser from turret
  const fireLaser = useCallback(() => {
    if (gameOver) return
    terminalAudio.playLaser()
    const id = nextLaserId.current++
    setLasers((prev) => [...prev, { id, x: turretX, y: 85 }])
  }, [gameOver, turretX])

  // Zap a bug directly (by click/tap or laser hit)
  const zapBug = useCallback((bugId: number) => {
    terminalAudio.playZap()
    setBugs((prev) => prev.filter((b) => b.id !== bugId))
    setScore((prev) => {
      const next = prev + 10 * combo
      setHighScore((curHigh) => {
        const h = Math.max(curHigh, next)
        try {
          localStorage.setItem('divyesh_terminal_highscore', h.toString())
        } catch {
          // LocalStorage fallback
        }
        return h
      })
      return next
    })
    setCombo((c) => Math.min(5, c + 1))
  }, [combo])

  // Key controls (ArrowLeft, ArrowRight, Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onExit()
      if (gameOver) return
      if (e.key === 'ArrowLeft') {
        setTurretX((x) => Math.max(10, x - 8))
      } else if (e.key === 'ArrowRight') {
        setTurretX((x) => Math.min(90, x + 8))
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        fireLaser()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [fireLaser, gameOver, onExit])

  // Game loop: spawn and move bugs, move lasers
  useEffect(() => {
    if (gameOver) return

    const interval = setInterval(() => {
      // 1. Move bugs down
      setBugs((prevBugs) => {
        const nextBugs: BugEntity[] = []
        for (const bug of prevBugs) {
          const nextY = bug.y + bug.speed
          if (nextY >= 92) {
            // Bug escaped past defense
            setLives((l) => {
              const rem = l - 1
              if (rem <= 0) setGameOver(true)
              return Math.max(0, rem)
            })
            setCombo(1)
          } else {
            nextBugs.push({ ...bug, y: nextY })
          }
        }
        // Spawn chance
        if (nextBugs.length < 5 && Math.random() > 0.6) {
          const type = BUG_TYPES[Math.floor(Math.random() * BUG_TYPES.length)]
          nextBugs.push({
            id: nextBugId.current++,
            name: type.name,
            x: 8 + Math.random() * 80,
            y: 0,
            speed: 1.2 + Math.random() * 1.5,
            color: type.color,
          })
        }
        return nextBugs
      })

      // 2. Move lasers up & collision check
      setLasers((prevLasers) => {
        const survivingLasers: { id: number; x: number; y: number }[] = []
        setBugs((currentBugs) => {
          let updatedBugs = [...currentBugs]
          for (const laser of prevLasers) {
            const nextLaserY = laser.y - 7
            let hit = false
            for (const bug of updatedBugs) {
              if (Math.abs(bug.x - laser.x) < 14 && Math.abs(bug.y - nextLaserY) < 10) {
                hit = true
                zapBug(bug.id)
                updatedBugs = updatedBugs.filter((b) => b.id !== bug.id)
                break
              }
            }
            if (!hit && nextLaserY > 0) {
              survivingLasers.push({ ...laser, y: nextLaserY })
            }
          }
          return updatedBugs
        })
        return survivingLasers
      })
    }, 60)

    return () => clearInterval(interval)
  }, [gameOver, zapBug])

  const restartGame = () => {
    setScore(0)
    setLives(3)
    setCombo(1)
    setBugs([])
    setLasers([])
    setGameOver(false)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[350px] flex flex-col bg-[#0b0509] rounded-xl overflow-hidden border border-[#E66277]/40 shadow-[0_0_30px_rgba(230,98,119,0.25)] select-none"
    >
      {/* Top Header / HUD */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-black/80 border-b border-white/10 z-20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-white">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>SCORE: <span className="text-[#E66277]">{score}</span></span>
          </div>
          <div className="text-[11px] font-mono text-gray-400 hidden sm:block">
            HIGH: <span className="text-white">{highScore}</span>
          </div>
          {combo > 1 && (
            <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold animate-pulse">
              {combo}x COMBO
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 font-mono text-xs">
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < lives ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
          <button
            onClick={onExit}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-[#E66277]/30 text-xs font-mono text-white/80 hover:text-white transition-colors"
          >
            <X className="w-3 h-3" />
            <span>Exit</span>
          </button>
        </div>
      </div>

      {/* Main Play Arena */}
      <div
        className="relative flex-1 w-full overflow-hidden cursor-crosshair bg-gradient-to-b from-[#120710] to-[#070306]"
        onClick={(e) => {
          // Allow tapping anywhere on field to move turret and fire
          const rect = e.currentTarget.getBoundingClientRect()
          const clickXPercent = ((e.clientX - rect.left) / rect.width) * 100
          setTurretX(Math.max(10, Math.min(90, clickXPercent)))
          fireLaser()
        }}
      >
        {/* Subtle Cyber Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(rgba(230,98,119,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(230,98,119,0.2) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Falling Bugs */}
        {bugs.map((bug) => (
          <button
            key={bug.id}
            onClick={(e) => {
              e.stopPropagation()
              zapBug(bug.id)
            }}
            style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 rounded-md border text-[11px] font-mono font-bold shadow-lg transition-transform hover:scale-110 active:scale-95 animate-pulse"
            css-color={bug.color}
            style-custom={{ borderColor: bug.color, color: bug.color, backgroundColor: 'rgba(0,0,0,0.8)' }}
          >
            <span
              className="flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-mono font-bold"
              style={{
                borderColor: bug.color,
                color: bug.color,
                backgroundColor: 'rgba(10, 5, 10, 0.85)',
                boxShadow: `0 0 10px ${bug.color}40`,
              }}
            >
              <Bug className="w-3 h-3" />
              <span>{bug.name}</span>
            </span>
          </button>
        ))}

        {/* Lasers */}
        {lasers.map((l) => (
          <div
            key={l.id}
            style={{ left: `${l.x}%`, top: `${l.y}%` }}
            className="absolute w-1 h-3 -translate-x-1/2 bg-cyan-300 rounded-full shadow-[0_0_8px_#38bdf8] pointer-events-none"
          />
        ))}

        {/* Player Laser Turret */}
        <div
          style={{ left: `${turretX}%` }}
          className="absolute bottom-2 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-75"
        >
          <div className="w-1.5 h-3 bg-cyan-400 rounded-t shadow-[0_0_10px_#22d3ee]" />
          <div className="w-7 h-3 rounded-md bg-[#E66277] border border-white/30 shadow-[0_0_12px_rgba(230,98,119,0.8)] flex items-center justify-center">
            <Zap className="w-2.5 h-2.5 text-white" />
          </div>
        </div>

        {/* Tip at bottom */}
        <div className="absolute bottom-1 right-2 text-[10px] font-mono text-gray-500 pointer-events-none hidden sm:block">
          Tap bugs or use [←] [→] + [Space]
        </div>

        {/* Game Over Modal */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-4 text-center">
            <div className="px-3 py-1 rounded bg-red-500/20 border border-red-500 text-red-400 font-mono text-xs font-bold mb-2">
              GAME OVER // BUGS INFILTRATED
            </div>
            <h4 className="text-xl font-bold font-mono text-white mb-1">
              Final Score: <span className="text-[#E66277]">{score}</span>
            </h4>
            <p className="text-xs text-gray-400 font-mono mb-4">
              {score >= 100
                ? "⭐ Elite Code Warrior: Divyesh's architecture stands strong!"
                : 'Good effort! Clean code requires constant vigilance.'}
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={restartGame}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#E66277] hover:bg-rose-600 text-white font-mono text-xs font-bold shadow-[0_0_15px_rgba(230,98,119,0.5)] transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Play Again</span>
              </button>
              <button
                onClick={onExit}
                className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
              >
                Back to Terminal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
