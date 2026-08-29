'use client'
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProjectCard from "../sub/project-card"
import { Projects } from "@/constants"
import { Sparkles, ArrowUpRight, FolderGit2 } from "lucide-react"
import { FaGithub } from "react-icons/fa"

const CATEGORIES = ["All", "AI & SaaS", "Healthcare", "Interactive Web"] as const;

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const filteredProjects = selectedCategory === "All"
    ? Projects
    : Projects.filter(p => p.category === selectedCategory)

  return (
    <section id="projects" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto w-full z-20">
      {/* SECTION HEADER */}
      <div className="flex flex-col items-center text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/25 bg-purple-500/10 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-purple-300 text-xs font-mono font-medium uppercase tracking-wider">
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-purple-500">
            Works &amp; Engineering
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base max-w-xl mt-3"
        >
          Production-ready applications, intelligent AI pipelines, and interactive web experiences built with modern stacks.
        </motion.p>

        {/* CATEGORY FILTER TABS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-full glass-card border border-white/10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-purple-600/40 text-white border border-purple-500/50 shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
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
        className="mt-14 p-6 sm:p-8 rounded-3xl glass-card border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
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
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/40 transition-all flex-shrink-0"
        >
          <FaGithub className="w-4 h-4" />
          <span>Visit GitHub @Divyezh</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
        </a>
      </motion.div>
    </section>
  )
}

