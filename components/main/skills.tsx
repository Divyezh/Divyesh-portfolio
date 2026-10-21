'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import SkillText from '../sub/skill-text'
import SkillsCardCarousel from './skills-card-carousel'
import { Frontend_skill, Backend_skill, AI_skill, Full_stack } from '@/constants'
import { Code2, Database, BrainCircuit, Wrench, ChevronDown, ChevronUp } from 'lucide-react'

const skillCategories = [
  {
    title: 'Frontend Engineering',
    icon: Code2,
    skills: Frontend_skill,
  },
  {
    title: 'Backend & Databases',
    icon: Database,
    skills: Backend_skill,
  },
  {
    title: 'AI & LLM Integration',
    icon: BrainCircuit,
    skills: AI_skill,
  },
  {
    title: 'DevOps & Cloud Workflow',
    icon: Wrench,
    skills: Full_stack,
  },
]

export default function Skills() {
  const [showMatrix, setShowMatrix] = useState(false)

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center pt-16 sm:pt-24 pb-20 sm:pb-28 px-3 sm:px-4 md:px-8 max-w-7xl mx-auto w-full z-20 overflow-hidden content-visibility-auto"
    >
      {/* Background ambient studio lighting (VYRO deep indigo / royal violet) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-indigo-600/15 blur-[170px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <SkillText />

      {/* The Flagship 3D Curved Arc Card Carousel */}
      <div className="w-full">
        <SkillsCardCarousel />
      </div>

      {/* Expandable Technical Matrix Drawer for Recruiters & Tech Leads */}
      <div className="w-full max-w-5xl mt-8 sm:mt-12 flex flex-col items-center">
        <button
          onClick={() => setShowMatrix(prev => !prev)}
          className="btn-pill-secondary flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 py-2.5 text-[11px] sm:text-xs font-mono text-slate-200 hover:text-white group shadow-sm transition-all"
        >
          <span>{showMatrix ? 'HIDE DETAILED SPECIFICATIONS' : 'EXPAND FULL STACK MATRIX'}</span>
          {showMatrix ? (
            <ChevronUp className="w-3.5 h-3.5 text-indigo-400 group-hover:-translate-y-0.5 transition-transform" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-indigo-400 group-hover:translate-y-0.5 transition-transform" />
          )}
        </button>

        <AnimatePresence>
          {showMatrix && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full overflow-hidden mt-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 sm:gap-x-10 gap-y-8 sm:gap-y-10 w-full p-4 sm:p-8 rounded-3xl bg-[#090714]/80 border border-white/[0.1] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                {skillCategories.map(category => {
                  const Icon = category.icon
                  return (
                    <div key={category.title} className="w-full">
                      {/* Category Header */}
                      <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.1]">
                        <Icon
                          className="w-4 h-4 text-indigo-400 shrink-0"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        <h3 className="text-base font-semibold text-white tracking-tight">
                          {category.title}
                        </h3>
                      </div>

                      {/* Skill Rows */}
                      <ul className="w-full flex flex-col">
                        {category.skills.map((skill, skillIdx) => {
                          const isLast = skillIdx === category.skills.length - 1
                          return (
                            <li
                              key={skill.skill_name}
                              className={`flex items-center justify-between py-3 transition-colors duration-150 group ${
                                !isLast ? 'border-b border-white/[0.06]' : ''
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                                  <Image
                                    src={skill.Image}
                                    alt={skill.skill_name}
                                    width={20}
                                    height={20}
                                    className="w-5 h-5 object-contain"
                                    loading="lazy"
                                  />
                                </div>
                                <span className="text-sm font-normal text-slate-200 group-hover:text-white transition-colors">
                                  {skill.skill_name}
                                </span>
                              </div>
                              <span className="text-xs font-light text-slate-400 font-mono tracking-wide">
                                {skill.level}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
