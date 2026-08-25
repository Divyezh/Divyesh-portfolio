"use client";

import React, { useEffect, useRef } from "react";

export default function ParticleSphereAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 300);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle Sphere parameters
    const particleCount = 280;
    const particles: { x: number; y: number; z: number; baseSize: number }[] = [];
    const radius = Math.min(width, height) * 0.38;

    // Fibonacci sphere algorithm for uniform distribution
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < particleCount; i++) {
      const y = 1 - (i / (particleCount - 1)) * 2; // y goes from 1 to -1
      const r = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      particles.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        baseSize: Math.random() * 1.5 + 1,
      });
    }

    const angleX = 0.002;
    const angleY = 0.005;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Rotate and draw particles
      particles.forEach((p) => {
        // Rotation around Y axis
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // Rotation around X axis
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        p.x = x1;
        p.y = y2;
        p.z = z2;

        // Perspective projection
        const perspective = 400;
        const scale = perspective / (perspective + z2);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;

        // Alpha and size based on depth z2
        const alpha = Math.max(0.15, Math.min(1, (z2 + radius) / (2 * radius)));
        const size = p.baseSize * scale * 1.2;

        // Particle Glow
        ctx.beginPath();
        ctx.arc(projX, projY, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${alpha * 0.85})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(139, 92, 246, 0.6)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      style={{ pointerEvents: "none" }}
    />
  );
}
