'use client'
import React, { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function CareerTerminal() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const [step, setStep] = useState(0)

  // Timing: 
  // 0.0s: Terminal powers on (step 0)
  // 0.5s: Initializing Neural Engine... (step 1)
  // 1.0s: Loading Profile... (step 2)
  // 1.5s: Scanning... Progress bar (step 3)
  // 2.5s: Matching Skills (step 4)
  // 3.5s: Result / Match Found (step 5)
  
  useEffect(() => {
    if (!isInView) return
    
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 1800),
      setTimeout(() => setStep(4), 2800),
      setTimeout(() => setStep(5), 4500), // Delay to let skills render
    ]
    
    return () => timers.forEach(clearTimeout)
  }, [isInView])

  const skills = [
    "React", "Next.js", "TypeScript", "Tailwind CSS", 
    "Node.js", "Express.js", "AI Integration", "UI Engineering", "Responsive Design"
  ]

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-[600px] rounded-2xl overflow-hidden border border-purple-500/30 bg-[#0F1020]/60 backdrop-blur-xl shadow-[0_0_40px_rgba(139,92,246,0.15)] group"
    >
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
      
      {/* Top Bar */}
      <div className="relative z-10 flex items-center px-4 py-3 border-b border-white/10 bg-black/20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="mx-auto text-xs font-mono text-gray-400 uppercase tracking-widest">
          AI_CAREER_RADAR.EXE
        </div>
      </div>

      {/* Terminal Content */}
      <div className="relative z-10 p-6 font-mono text-sm md:text-base text-gray-300 h-[450px] overflow-y-auto custom-scrollbar flex flex-col gap-2">
        
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
            <div className="flex items-center gap-2 text-blue-400 mt-1 ml-4">
              <motion.div 
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 1, ease: "linear" }}
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
              {skills.map((skill, index) => (
                <motion.div 
                  key={skill}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
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
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-2 border border-green-500/30 bg-green-500/5 rounded-lg p-4"
          >
            <div className="text-xs text-gray-400 mb-1">RESULT</div>
            <div className="flex items-center gap-2 text-green-400 font-bold text-lg mb-4">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              MATCH FOUND
            </div>
            
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-gray-500 text-xs">ROLE</div>
                <div className="text-white">Frontend Developer</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-500 text-xs">AVAILABILITY</div>
                  <div className="text-purple-300">Open for Internship</div>
                  <div className="text-purple-300">Immediate Joining</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs">LOCATION</div>
                  <div className="text-blue-300">Ahmedabad</div>
                  <div className="text-blue-300">Remote / Hybrid</div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5">
                <div className="text-gray-500 text-xs">EXPERIENCE</div>
                <div className="text-gray-300">Building premium modern web experiences.</div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Blinking Cursor */}
        <motion.div 
          animate={{ opacity: [1, 0, 1] }} 
          transition={{ duration: 0.8, repeat: Infinity }}
          className="w-2 h-4 bg-purple-400 mt-2"
        />
      </div>

      {/* Edge Glow */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-2xl transition-colors duration-500 pointer-events-none" />
    </motion.div>
  )
}
