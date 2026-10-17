import dynamic from "next/dynamic"
import Navbar from "@/components/main/navbar"
import Hero from "@/components/main/hero"
import SmoothScrollProvider from "@/components/sub/smooth-scroll-provider"

// Code-split below-the-fold sections to minimize initial JavaScript execution & TBT
const Skills = dynamic(() => import("@/components/main/skills"), {
  loading: () => <div className="min-h-[600px]" />,
})
const AiCareerRadar = dynamic(() => import("@/components/main/ai-career-radar"), {
  loading: () => <div className="min-h-[600px]" />,
})
const CollaborateSection = dynamic(() => import("@/components/main/collaborate-section"), {
  loading: () => <div className="min-h-[500px]" />,
})
const Projects = dynamic(() => import("@/components/main/projects"), {
  loading: () => <div className="min-h-[600px]" />,
})
const Footer = dynamic(() => import("@/components/main/footer"), {
  loading: () => <div className="min-h-[400px]" />,
})

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="min-h-screen w-full relative bg-[#050508] text-white selection:bg-indigo-500/30 selection:text-white">
        <Navbar />
        <div className="flex flex-col">
          <Hero />
          <Skills />
          <AiCareerRadar />
          <CollaborateSection />
          <Projects />
          <Footer />
        </div>
      </main>
    </SmoothScrollProvider>
  )
}







