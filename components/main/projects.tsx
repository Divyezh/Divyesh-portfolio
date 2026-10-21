'use client'
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProjectCard from "../sub/project-card"
import { Projects } from "@/constants"
import { Sparkles, ArrowUpRight, FolderGit2 } from "lucide-react"
import { FaGithub } from "react-icons/fa"

const CATEGORIES = ["All", "AI & SaaS", "Full Stack", "Healthcare", "Interactive Web"] as const;

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const filteredProjects = selectedCategory === "All"
    ? Projects
    : Projects.filter(p => p.category === selectedCategory)

  return (
    <section id="projects" className="relative py-16 sm:py-24 px-3 sm:px-6 md:px-8 max-w-7xl mx-auto w-full z-20 content-visibility-auto">
      {/* SECTION HEADER */}
      <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-4 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-indigo-300 text-xs font-mono font-medium uppercase tracking-wider">
            Featured Portfolio
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
        >
          Selected{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
            Works &amp; Engineering
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base max-w-xl mt-3 font-normal"
        >
          Production-ready applications, intelligent AI pipelines, and interactive web experiences built with modern stacks.
        </motion.p>

        {/* CATEGORY FILTER TABS (VYRO Pill Capsule) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 p-1.5 rounded-2xl sm:rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-lg"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-black text-white font-bold border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.6)] scale-[1.02]"
                  : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* PROJECTS GRID */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* GITHUB CALLOUT BANNER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-14 p-6 sm:p-8 rounded-3xl glass-card border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-400">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white tracking-tight">Looking for more repositories?</h4>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              Explore open-source contributions, algorithms, and full-stack experiments on my GitHub profile.
            </p>
          </div>
        </div>

        <a
          href="https://github.com/Divyezh"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pill-primary py-2.5 px-5 text-xs font-bold shrink-0"
        >
          <FaGithub className="w-4 h-4" />
          <span>Visit GitHub @Divyezh</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </section>
  )
}
