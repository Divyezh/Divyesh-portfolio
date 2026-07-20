'use client'
import { motion } from "framer-motion"
import { slideInFromLeft, slideInFromRight } from "@/lib/motion"
import FeaturedCarousel from "../sub/featured-carousel"
import { Projects } from "@/constants"
import { HiSparkles } from "react-icons/hi"

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-20 px-4">
      {/* SECTION HEADER */}
      <div className="text-center mb-14 flex flex-col items-center">
        <motion.div
          variants={slideInFromLeft(0.3)} initial="hidden" whileInView="visible"
          viewport={{ once: true }}
          className="Welcome-box py-2 px-4 border border-purple-core/20 inline-flex mb-4"
        >
          <HiSparkles className="text-purple-mid mr-2" />
          <span className="Welcome-text text-sm font-medium">My Work</span>
        </motion.div>

        <motion.h2
          variants={slideInFromRight(0.5)} initial="hidden" whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          Featured{" "}
          <span className="Welcome-text">Projects</span>
        </motion.h2>
      </div>

      {/* PROJECTS CAROUSEL */}
      <div className="w-full">
        <FeaturedCarousel projects={Projects} />
      </div>
    </section>
  )
}

