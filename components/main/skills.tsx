'use client'
import { motion } from "framer-motion"
import SkillDataProvider from "../sub/skill-data-provider"
import SkillText from "../sub/skill-text"
import { Frontend_skill, Backend_skill, AI_skill, Full_stack } from "@/constants"

// Combine all skills and deduplicate by skill name
const allSkills = [...Frontend_skill, ...Backend_skill, ...Full_stack, ...AI_skill]
const uniqueSkills = allSkills.filter((v, i, a) => a.findIndex(t => (t.skill_name === v.skill_name)) === i)

// Create V-shape rows (lengths: 7, 6, 5, 4, 2)
const rows = [
  uniqueSkills.slice(0, 7),
  uniqueSkills.slice(7, 13),
  uniqueSkills.slice(13, 18),
  uniqueSkills.slice(18, 22),
  uniqueSkills.slice(22, 24)
]

export default function Skills() {
  let globalIndex = 0; // To keep staggered animation cascading properly

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center pt-20 pb-32 overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* SKILLS BG VIDEO */}
      <video
        autoPlay muted loop playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-20"
      >
        <source src="/videos/skills-bg.webm" type="video/webm" />
      </video>

      {/* PURPLE/CYAN GLOW OVERLAY */}
      <div className="absolute inset-0 -z-[5] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,92,246,0.1) 0%, transparent 70%)' }}
      />

      <SkillText />

      {/* SKILL ICONS V-SHAPE GRID */}
      <div className="flex flex-col items-center justify-center gap-6 md:gap-8 mt-16 z-20">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-row justify-center items-center gap-4 md:gap-8"
          >
            {row.map((skill) => {
              const currentIndex = globalIndex++;
              return (
                <SkillDataProvider
                  key={skill.skill_name}
                  src={skill.Image} 
                  width={skill.width}
                  height={skill.height} 
                  index={currentIndex} 
                  name={skill.skill_name}
                />
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
