'use client'
import React, { useRef, useEffect } from "react"
import * as THREE from "three"

export default function StarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene Setup
    const scene = new THREE.Scene()
    scene.background = null // Transparent so #030014 shows through

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 2

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Stars Geometry
    const starsGeometry = new THREE.BufferGeometry()
    const count = 5000

    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    // AMBER COLOR SHADES
    const colorCore = new THREE.Color(0xe8821a)  // 70%
    const colorBright = new THREE.Color(0xffaa44) // 20%
    const colorLight = new THREE.Color(0xffdd88)  // 10%

    for (let i = 0; i < count * 3; i += 3) {
      // Positions (-50 to +50 for x/y, -100 to +100 for z)
      positions[i] = (Math.random() - 0.5) * 100     // x
      positions[i + 1] = (Math.random() - 0.5) * 100 // y
      positions[i + 2] = (Math.random() - 0.5) * 200 // z

      // Colors
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

    // Material
    const starsMaterial = new THREE.PointsMaterial({
      size: 0.1, // slightly larger for glow effect
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const starMesh = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(starMesh)

    // Animation Loop
    let animationFrameId: number
    const startTime = Date.now()
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      
      const elapsedTime = (Date.now() - startTime) * 0.0005
      
      // Continuous looping boomerang drift (Math.sin)
      starMesh.rotation.x = Math.sin(elapsedTime * 0.5) * 0.2
      starMesh.rotation.y = Math.sin(elapsedTime * 0.3) * 0.3
      
      // Slight pulsating scale for breathing boomerang effect
      const scale = 1 + Math.sin(elapsedTime * 0.8) * 0.05
      starMesh.scale.set(scale, scale, scale)
      
      renderer.render(scene, camera)
    }
    animate()

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
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
      className="fixed top-0 left-0 w-full h-full -z-[1]" 
      style={{ pointerEvents: 'none' }}
    />
  )
}
