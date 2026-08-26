"use client";

import React, { useEffect, useRef } from "react";

export default function ParticleSphereAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let isTabVisible = !document.hidden;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 300);

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const isLowEnd = typeof navigator !== "undefined" && (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4);

    const particleCount = isLowEnd ? 120 : isMobile ? 160 : 260;
    const particles: { x: number; y: number; z: number; baseSize: number }[] = [];
    const radius = Math.min(width, height) * 0.38;

    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < particleCount; i++) {
      const y = 1 - (i / (particleCount - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      particles.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        baseSize: Math.random() * 1.5 + 1.2,
      });
    }

    const angleX = 0.002;
    const angleY = 0.005;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && isTabVisible) {
          render();
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isVisible && isTabVisible) {
        render();
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    const render = () => {
      if (!isVisible || !isTabVisible) return;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const perspective = 400;

      particles.forEach((p) => {
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        p.x = x1;
        p.y = y2;
        p.z = z2;

        const scale = perspective / (perspective + z2);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;

        const alpha = Math.max(0.18, Math.min(1, (z2 + radius) / (2 * radius)));
        const size = p.baseSize * scale;

        ctx.beginPath();
        ctx.arc(projX, projY, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${alpha * 0.9})`;
        ctx.fill();

        if (alpha > 0.6) {
          ctx.beginPath();
          ctx.arc(projX, projY, size * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(238, 210, 255, ${alpha})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block transform-gpu pointer-events-none"
      style={{ pointerEvents: "none", willChange: "transform" }}
    />
  );
}
