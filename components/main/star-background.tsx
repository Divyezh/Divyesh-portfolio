'use client'

import React, { useRef, useEffect } from "react"
import * as THREE from "three"

export default function StarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const isMobile = typeof window !== "undefined" && (window.innerWidth < 768 || navigator.maxTouchPoints > 0)
    const isLowEnd = typeof navigator !== "undefined" && (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)
    const count = isLowEnd ? 1000 : isMobile ? 1500 : 3500

    const scene = new THREE.Scene()
    scene.background = null

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 2

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
      precision: isLowEnd ? "lowp" : "mediump"
    })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75))

    const starsGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const colorCore = new THREE.Color(0xe8821a)
    const colorBright = new THREE.Color(0xffaa44)
    const colorLight = new THREE.Color(0xffdd88)

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100
      positions[i + 1] = (Math.random() - 0.5) * 100
      positions[i + 2] = (Math.random() - 0.5) * 200

      const randomValue = Math.random()
      let selectedColor
      if (randomValue < 0.7) selectedColor = colorCore
      else if (randomValue < 0.9) selectedColor = colorBright
      else selectedColor = colorLight

      colors[i] = selectedColor.r
      colors[i + 1] = selectedColor.g
      colors[i + 2] = selectedColor.b
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const starsMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.14 : 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const starMesh = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(starMesh)

    let animationFrameId: number
    let isTabVisible = true
    const startTime = Date.now()

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden
      if (isTabVisible) {
        animate()
      } else {
        cancelAnimationFrame(animationFrameId)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    const animate = () => {
      if (!isTabVisible) return
      
      const elapsedTime = (Date.now() - startTime) * 0.0005
      starMesh.rotation.x = Math.sin(elapsedTime * 0.5) * 0.2
      starMesh.rotation.y = Math.sin(elapsedTime * 0.3) * 0.3
      
      const scale = 1 + Math.sin(elapsedTime * 0.8) * 0.05
      starMesh.scale.set(scale, scale, scale)
      
      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (!canvasRef.current) return
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }, 150)
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      starsGeometry.dispose()
      starsMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-[1] transform-gpu pointer-events-none" 
      style={{ pointerEvents: 'none', willChange: 'transform' }}
    />
  )
}
