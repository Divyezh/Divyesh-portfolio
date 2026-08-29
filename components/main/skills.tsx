'use client'

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import SkillText from "../sub/skill-text"
import { Frontend_skill, Backend_skill, AI_skill, Full_stack } from "@/constants"
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity"
import { Code2, Database, BrainCircuit, Wrench } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend Engineering",
    icon: Code2,
    color: "from-purple-500/10 to-purple-600/10",
    borderColor: "border-purple-500/20",
    skills: Frontend_skill,
  },
  {
    title: "Backend & Databases",
    icon: Database,
    color: "from-purple-600/10 to-purple-700/10",
    borderColor: "border-purple-600/20",
    skills: Backend_skill,
  },
  {
    title: "AI & LLM Integration",
    icon: BrainCircuit,
    color: "from-purple-700/10 to-purple-800/10",
    borderColor: "border-purple-700/20",
    skills: AI_skill,
  },
  {
    title: "DevOps & Cloud Workflow",
    icon: Wrench,
    color: "from-purple-800/10 to-purple-900/10",
    borderColor: "border-purple-800/20",
    skills: Full_stack,
  },
]

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center pt-24 pb-28 px-4 md:px-8 max-w-7xl mx-auto w-full z-20"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <SkillText />

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden my-10 py-3 glass-card border-y border-white/[0.08]">
        <ScrollVelocityContainer className="text-xl md:text-3xl font-extrabold tracking-tight">
          <ScrollVelocityRow baseVelocity={4} direction={1}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-purple-500 px-4">
              Next.js 14 • React.js • TypeScript • Tailwind CSS • Node.js • PostgreSQL • Prisma ORM • Claude API • OpenAI •
            </span>
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={4} direction={-1}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-purple-500 px-4">
              High Scalability • Clean Architecture • Micro-Interactions • Type-Safe APIs • Production Speed •
            </span>
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
        <div className="from-[#0e070c] pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r" />
        <div className="from-[#0e070c] pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4">
        {skillCategories.map((category, index) => {
          const Icon = category.icon
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 sm:p-7 rounded-3xl glass-card border border-white/[0.08] hover:border-purple-500/30 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-purple-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {category.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {category.skills.length} Tools
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.skill_name}
                    whileHover={{ scale: 1.04, y: -2 }}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] hover:border-purple-500/30 transition-all cursor-default text-center group/skill"
                  >
                    <div className="relative w-10 h-10 mb-2 flex items-center justify-center">
                      <Image
                        src={skill.Image}
                        alt={skill.skill_name}
                        width={40}
                        height={40}
                        loading="lazy"
                        decoding="async"
                        className="object-contain max-h-9 max-w-9 transition-transform group-hover/skill:scale-110"
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-200 line-clamp-1">
                      {skill.skill_name}
                    </span>
                    {skill.level && (
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {skill.level}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
