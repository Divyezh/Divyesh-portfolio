"use client"

import React, { useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

export function DivyeshCustomWord({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
  }

  const dY = useTransform(smoothProgress, [0, 1], [40, -35])
  const iY = useTransform(smoothProgress, [0, 1], [25, -20])
  const iDotY = useTransform(smoothProgress, [0, 1], [70, -50])
  const vY = useTransform(smoothProgress, [0, 1], [45, -40])
  const yY = useTransform(smoothProgress, [0, 1], [30, -25])
  const eY = useTransform(smoothProgress, [0, 1], [50, -45])
  const sY = useTransform(smoothProgress, [0, 1], [35, -30])
  const hY = useTransform(smoothProgress, [0, 1], [55, -48])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full select-none overflow-visible flex items-end justify-center pt-4 pb-0 ${className}`}
    >
      <svg
        viewBox="0 0 1420 340"
        className="w-full h-auto max-h-[44vw] md:max-h-[350px] overflow-visible drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="divyeshTextGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          <linearGradient id="divyeshHoverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>

        <motion.g
          style={{ y: dY }}
          whileHover={{ scale: 1.04, y: -8 }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
          className="cursor-pointer text-white hover:text-purple-300 transition-colors"
        >
          <path
            fill="url(#divyeshTextGrad)"
            d="M 120,290 C 50,290 20,240 20,172 C 20,104 50,54 120,54 C 142,54 160,62 172,74 L 172,8 L 222,8 L 222,290 L 172,290 L 172,270 C 160,282 142,290 120,290 Z M 122,106 C 84,106 70,134 70,172 C 70,210 84,238 122,238 C 154,238 172,212 172,172 C 172,132 154,106 122,106 Z"
          />
        </motion.g>

        <motion.g
          whileHover={{ scale: 1.05, y: -10 }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
          className="cursor-pointer text-white hover:text-purple-300 transition-colors"
        >
          <motion.circle
            cx="275"
            cy="34"
            r="26"
            fill="url(#divyeshTextGrad)"
            style={{ y: iDotY }}
            animate={{
              y: [0, -7, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.path
            style={{ y: iY }}
            fill="url(#divyeshTextGrad)"
            d="M 250,98 L 300,98 L 300,290 L 250,290 Z"
          />
        </motion.g>

        <motion.g
          style={{ y: vY }}
          whileHover={{ scale: 1.04, y: -8 }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
          className="cursor-pointer text-white hover:text-purple-300 transition-colors"
        >
          <path
            fill="url(#divyeshTextGrad)"
            d="M 325,98 L 377,98 L 415,226 L 453,98 L 505,98 L 441,290 L 389,290 Z"
          />
        </motion.g>

        <motion.g
          style={{ y: yY }}
          whileHover={{ scale: 1.04, y: -8 }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
          className="cursor-pointer text-white hover:text-purple-300 transition-colors"
        >
          <path
            fill="url(#divyeshTextGrad)"
            d="M 530,98 L 582,98 L 620,212 L 658,98 L 710,98 L 642,284 C 624,332 596,358 546,358 C 528,358 514,354 504,347 L 518,304 C 526,308 536,310 546,310 C 570,310 582,296 592,272 L 600,250 Z"
          />
        </motion.g>

        <motion.g
          style={{ y: eY }}
          whileHover={{ scale: 1.04, y: -8 }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
          className="cursor-pointer text-white hover:text-purple-300 transition-colors"
        >
          <path
            fill="url(#divyeshTextGrad)"
            d="M 830,290 C 760,290 735,240 735,172 C 735,104 760,54 830,54 C 900,54 925,102 925,174 L 925,188 L 785,188 C 789,224 810,246 845,246 C 872,246 892,234 905,214 L 925,240 C 902,274 870,290 830,290 Z M 785,150 L 878,150 C 874,120 854,98 830,98 C 802,98 789,120 785,150 Z"
          />
        </motion.g>

        <motion.g
          style={{ y: sY }}
          whileHover={{ scale: 1.04, y: -8 }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
          className="cursor-pointer text-white hover:text-purple-300 transition-colors"
        >
          <path
            fill="url(#divyeshTextGrad)"
            d="M 955,244 L 995,214 C 1010,232 1028,244 1050,244 C 1072,244 1084,234 1084,220 C 1084,204 1070,196 1040,186 C 1000,174 965,156 965,116 C 965,76 1000,54 1046,54 C 1082,54 1112,70 1130,98 L 1095,126 C 1080,110 1066,100 1046,100 C 1028,100 1015,108 1015,120 C 1015,132 1028,140 1056,150 C 1096,162 1135,180 1135,222 C 1135,266 1098,290 1050,290 C 1008,290 976,270 955,244 Z"
          />
        </motion.g>

        <motion.g
          style={{ y: hY }}
          whileHover={{ scale: 1.04, y: -8 }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
          className="cursor-pointer text-white hover:text-purple-300 transition-colors"
        >
          <path
            fill="url(#divyeshTextGrad)"
            d="M 1170,8 L 1220,8 L 1220,116 C 1238,98 1262,88 1292,88 C 1348,88 1380,126 1380,192 L 1380,290 L 1330,290 L 1330,200 C 1330,162 1310,138 1276,138 C 1242,138 1220,164 1220,210 L 1220,290 L 1170,290 Z"
          />
        </motion.g>
      </svg>
    </div>
  )
}
