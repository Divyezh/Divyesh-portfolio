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
      className="group relative flex flex-col h-full rounded-3xl overflow-hidden glass-card glass-card-hover border border-white/[0.1] hover:border-indigo-500/40 shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/15 via-transparent to-transparent" />

      <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-[#090714] border-b border-white/[0.08]">
        <Image
          src={imageError ? "/projects/portfolio.png" : project.image}
          alt={project.title}
          fill
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          onError={() => setImageError(true)}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#090714] via-transparent to-black/20" />

        {project.metrics && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10.5px] font-mono font-medium text-emerald-400 flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {project.metrics}
          </div>
        )}

        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0a081c]/85 backdrop-blur-md border border-indigo-500/30 text-[10.5px] font-mono font-semibold text-indigo-300 shadow-sm">
          {project.category}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow justify-between bg-[#070611]/80">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <h3 className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors tracking-tight">
              {project.title}
            </h3>
            <span className="text-xs text-slate-500 font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            </span>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mb-5 line-clamp-3">
            {project.description}
          </p>

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

        {/* Action Buttons: VYRO Pill Design */}
        <div className="flex items-center gap-2.5 pt-4 border-t border-white/[0.08] mt-auto">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-primary flex-1 py-2 px-4 text-xs font-bold"
          >
            <span>Live Project</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-secondary py-2 px-3.5 text-xs font-medium"
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
