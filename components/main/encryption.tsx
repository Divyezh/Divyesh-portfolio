'use client'
import { motion } from "framer-motion"
import Image from "next/image"
import { slideInFromTop } from "@/lib/motion"

export default function Encryption() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-center py-24 gap-12 overflow-hidden">

      {/* BG VIDEO */}
      <video autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10 opacity-15">
        <source src="/videos/encryption-bg.webm" type="video/webm" />
      </video>

      {/* AMBER GLOW */}
      <div className="absolute inset-0 -z-[5] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.08), transparent 60%)' }}
      />

      {/* LOCK ANIMATION */}
      <div className="relative flex flex-col items-center justify-center min-h-[300px]">
        {/* We use standard relative positioning to float the top lock above the main lock */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20px] z-10"
        >
          <Image src="/lock-top.png" alt="lock top" width={50} height={50}
            style={{ filter: 'drop-shadow(0 0 12px rgba(139,92,246,0.6))' }}
          />
        </motion.div>
        <Image src="/lock-main.png" alt="lock" width={130} height={230}
          className="mt-8"
          style={{ filter: 'drop-shadow(0 0 20px rgba(139,92,246,0.4))' }}
        />
      </div>

      {/* TEXT CONTENT */}
      <div className="max-w-lg text-center md:text-left px-4">
        <motion.p
          variants={slideInFromTop} initial="hidden" whileInView="visible"
          viewport={{ once: true }}
          className="text-purple-mid text-sm font-semibold uppercase tracking-[0.2em] mb-3"
        >
          Performance & Security
        </motion.p>
        <motion.h2
          variants={slideInFromTop} initial="hidden" whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          AI-Powered &{" "}
          <span className="Welcome-text">Production-Ready</span>
        </motion.h2>
        <motion.p
          variants={slideInFromTop} initial="hidden" whileInView="visible"
          viewport={{ once: true }}
          className="text-gray-400 text-base leading-relaxed"
        >
          Every product I build is optimized for performance, security, and scale.
          From JWT authentication to SSR/SSG pipelines — built right, built to last.
        </motion.p>
      </div>
    </section>
  )
}


