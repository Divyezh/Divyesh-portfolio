'use client'
import React, { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Sparkles } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { ProjectItem } from "@/constants"

export default function ProjectCard({ project }: { project: ProjectItem }) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col h-full rounded-2xl overflow-hidden glass-card glass-card-hover border border-white/[0.08] hover:border-purple-500/40"
    >
      {/* CARD SPOTLIGHT GLOW */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />

      {/* IMAGE PREVIEW CONTAINER */}
      <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-[#090a12] border-b border-white/[0.06]">
        <Image
          src={imageError ? "/projects/portfolio.png" : project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          onError={() => setImageError(true)}
        />
        
        {/* Subtle Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d16] via-transparent to-black/20" />

        {/* METRIC BADGE */}
        {project.metrics && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono font-medium text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {project.metrics}
          </div>
        )}

        {/* CATEGORY BADGE */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-purple-950/70 backdrop-blur-md border border-purple-500/30 text-[11px] font-mono font-medium text-purple-300">
          {project.category}
        </div>
      </div>

      {/* CARD BODY CONTENT */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* TITLE & LIVE INDICATOR */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors tracking-tight">
              {project.title}
            </h3>
            <span className="text-xs text-slate-500 font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Sparkles className="w-3 h-3 text-purple-400" />
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="text-slate-300 text-sm leading-relaxed mb-5 line-clamp-3">
            {project.description}
          </p>

          {/* TECH STACK TAGS */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300 font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06] mt-auto">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-purple-600/30 border border-purple-500/40 hover:bg-purple-600/50 hover:border-purple-400 transition-all duration-200 shadow-[0_0_12px_rgba(139,92,246,0.2)]"
          >
            <span>Live Project</span>
            <ExternalLink className="w-3.5 h-3.5 text-purple-300" />
          </a>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-all duration-200"
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <FaGithub className="w-3.5 h-3.5" />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}




