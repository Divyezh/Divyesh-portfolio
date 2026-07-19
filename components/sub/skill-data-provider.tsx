'use client'
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Image from "next/image"

interface Props {
  src: string
  width: number
  height: number
  index: number
  name: string
}

export default function SkillDataProvider({ src, width, height, index, name }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true })

  const imageVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  }

  const animationDelay = 0.3 + index * 0.1  // stagger per icon

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={imageVariants}
      animate={inView ? "visible" : "hidden"}
      custom={animationDelay}
      transition={{ delay: animationDelay, duration: 0.5 }}
      title={name}
      className="group relative flex items-center justify-center"
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={name}
        className="transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]"
      />
      {/* Tooltip */}
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
        {name}
      </span>
    </motion.div>
  )
}

