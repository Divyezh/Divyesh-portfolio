'use client'
import React, { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import * as THREE from "three"
import { MapPin } from "lucide-react"

export default function CareerGlobe() {
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const [step, setStep] = useState(0)

  // Timing to match terminal:
  // 3.5s (step 1): Radar starts
  // 4.5s (step 2): Location pins appear
  // 5.0s (step 3): Floating job cards
  // 5.5s (step 4): Final status card
  
  useEffect(() => {
    if (!isInView) return
    
    const timers = [
      setTimeout(() => setStep(1), 3500),
      setTimeout(() => setStep(2), 4500),
      setTimeout(() => setStep(3), 5000),
      setTimeout(() => setStep(4), 5500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [isInView])

  // Raw Three.js implementation to bypass React 19 / R3F Reconciler bug
  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 4

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    const updateSize = () => {
      if (!canvasRef.current || !canvasRef.current.parentElement) return
      const { clientWidth, clientHeight } = canvasRef.current.parentElement
      renderer.setSize(clientWidth, clientHeight)
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
    }
    
    updateSize()
    window.addEventListener('resize', updateSize)

    // Inner Solid Core
    const coreGeometry = new THREE.SphereGeometry(1.45, 32, 32)
    const coreMaterial = new THREE.MeshBasicMaterial({ color: 0x0A0A1A, transparent: true, opacity: 0.9 })
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial)
    scene.add(coreMesh)

    // Outer Wireframe
    const wireGeometry = new THREE.SphereGeometry(1.5, 32, 32)
    const wireMaterial = new THREE.MeshBasicMaterial({ color: 0x38BDF8, wireframe: true, transparent: true, opacity: 0.15 })
    const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial)
    scene.add(wireMesh)

    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      wireMesh.rotation.y += 0.003
      wireMesh.rotation.x += 0.001
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener('resize', updateSize)
      cancelAnimationFrame(animationId)
      coreGeometry.dispose()
      coreMaterial.dispose()
      wireGeometry.dispose()
      wireMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={ref} className="relative w-full h-[600px] flex items-center justify-center">
      
      {/* 3D Canvas wrapper */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] relative">
          
          {/* Radar Sweep Animation */}
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 rounded-full border border-purple-500/20 overflow-hidden z-0"
              style={{ boxShadow: '0 0 40px rgba(56, 189, 248, 0.1)' }}
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-[50%] h-[50%] origin-bottom-right"
                style={{ 
                  background: 'conic-gradient(from 180deg at 100% 100%, transparent 60%, rgba(56, 189, 248, 0.4) 100%)' 
                }}
              />
            </motion.div>
          )}

          {/* Replaced R3F Canvas with standard HTML5 Canvas */}
          <canvas ref={canvasRef} className="z-10 absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }} />

          {/* Location Pins */}
          {step >= 2 && (
            <>
              {/* Ahmedabad */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-[35%] right-[25%] z-20 flex flex-col items-center group cursor-pointer"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-75" />
                  <MapPin className="w-5 h-5 text-purple-400 relative z-10 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-6 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-xs text-white whitespace-nowrap border border-white/10 pointer-events-none">
                  Ahmedabad
                </div>
              </motion.div>

              {/* Bangalore */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }} 
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute top-[50%] right-[30%] z-20 flex flex-col items-center group cursor-pointer"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75" />
                  <MapPin className="w-4 h-4 text-blue-400 relative z-10 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-5 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-xs text-white whitespace-nowrap border border-white/10 pointer-events-none">
                  Bangalore
                </div>
              </motion.div>

              {/* Remote */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }} 
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute top-[40%] left-[20%] z-20 flex flex-col items-center group cursor-pointer"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
                  <MapPin className="w-6 h-6 text-green-400 relative z-10 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-7 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-xs text-white whitespace-nowrap border border-white/10 pointer-events-none">
                  Remote Global
                </div>
              </motion.div>
            </>
          )}

          {/* Floating Job Cards */}
          {step >= 3 && (
            <>
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0, y: [-10, 10, -10] }}
                transition={{ opacity: { duration: 0.5 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                className="absolute top-10 -left-10 z-30 bg-[#0F1020]/80 backdrop-blur-xl border border-white/10 p-3 rounded-xl shadow-lg hover:scale-105 transition-transform"
              >
                <div className="text-sm font-semibold text-white">Frontend Engineer</div>
                <div className="text-xs text-green-400">98% Match</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0, y: [10, -10, 10] }}
                transition={{ opacity: { duration: 0.5 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
                className="absolute top-32 -right-10 z-30 bg-[#0F1020]/80 backdrop-blur-xl border border-white/10 p-3 rounded-xl shadow-lg hover:scale-105 transition-transform"
              >
                <div className="text-sm font-semibold text-white">React Developer</div>
                <div className="text-xs text-green-400">95% Match</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: [-10, 10, -10] }}
                transition={{ opacity: { duration: 0.5 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
                className="absolute bottom-10 left-10 z-30 bg-[#0F1020]/80 backdrop-blur-xl border border-white/10 p-3 rounded-xl shadow-lg hover:scale-105 transition-transform"
              >
                <div className="text-sm font-semibold text-white">Next.js Developer</div>
                <div className="text-xs text-green-400">99% Match</div>
              </motion.div>
            </>
          )}

        </div>
      </div>

      {/* Final Status Card Overlay */}
      {step >= 4 && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute z-40 bg-[#060611]/90 backdrop-blur-2xl border border-purple-500/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(139,92,246,0.2)] max-w-[320px] w-full"
        >
          <div className="text-center border-b border-white/10 pb-4 mb-4">
            <div className="text-xs text-purple-400 tracking-widest font-semibold uppercase mb-1">AI Analysis Complete</div>
            <div className="text-2xl font-bold text-white">Best Match</div>
            <div className="text-lg text-blue-400 font-medium">Frontend Engineer</div>
          </div>
          
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Availability</span>
              <span className="flex items-center gap-2 text-white font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Open for Internship
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Joining</span>
              <span className="text-white font-medium">Immediate</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Preferred</span>
              <span className="text-white font-medium">Remote / Hybrid</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <div className="text-xs text-gray-500 mb-1">STATUS</div>
            <div className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Ready to Build Amazing Products.
            </div>
          </div>
        </motion.div>
      )}

    </div>
  )
}
