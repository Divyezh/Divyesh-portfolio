'use client'
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface Project {
  title: string
  description: string
  image: string
  link: string
  tags: string[]
}

export default function ProjectCard({ title, description, image, link, tags }: Project) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="relative group overflow-hidden rounded-2xl border border-white/5
                 hover:border-purple-core/30 transition-all duration-300
                 bg-gradient-to-b from-[#0d0025] to-[#030014] flex flex-col h-full"
      style={{ boxShadow: '0 4px 40px rgba(0,0,0,0.5)' }}
    >
      {/* AMBER HOVER GLOW */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(139,92,246,0.08), transparent 60%)' }}
      />

      {/* IMAGE */}
      <div className="relative w-full h-48 overflow-hidden flex-shrink-0 bg-[#0a0015]">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030014]/90" />
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-grow">
        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
            <span key={tag}
              className="text-[11px] px-3 py-1 rounded-full border border-purple-core/20
                         text-purple-mid bg-purple-core/5 font-mono">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-white text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{description}</p>

        <Link href={link} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-purple-mid text-sm font-semibold
                     hover:text-purple-light transition-colors group/link mt-auto w-max">
          View Project
          <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
        </Link>
      </div>
    </motion.div>
  )
}


