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
    skills: Frontend_skill,
  },
  {
    title: "Backend & Databases",
    icon: Database,
    skills: Backend_skill,
  },
  {
    title: "AI & LLM Integration",
    icon: BrainCircuit,
    skills: AI_skill,
  },
  {
    title: "DevOps & Cloud Workflow",
    icon: Wrench,
    skills: Full_stack,
  },
]

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center pt-24 pb-28 px-4 md:px-8 max-w-6xl mx-auto w-full z-20"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <SkillText />

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden my-10 py-3 border-y border-white/[0.08]">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-12 sm:gap-y-14 w-full mt-4">
        {skillCategories.map((category, index) => {
          const Icon = category.icon
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="w-full"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.12]">
                <Icon
                  className="w-4 h-4 text-purple-400/80 shrink-0"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                  {category.title}
                </h3>
              </div>

              {/* Skill rows */}
              <ul className="w-full flex flex-col">
                {category.skills.map((skill, skillIdx) => {
                  const isLast = skillIdx === category.skills.length - 1
                  return (
                    <li
                      key={skill.skill_name}
                      className={`flex items-center justify-between py-3.5 sm:py-4 transition-colors duration-150 group ${
                        !isLast ? "border-b border-white/[0.08]" : ""
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
                        <span className="text-sm sm:text-base font-normal text-slate-200 group-hover:text-white transition-colors">
                          {skill.skill_name}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-light text-slate-400 font-mono tracking-wide">
                        {skill.level}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
