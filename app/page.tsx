import Navbar from "@/components/main/navbar"
import Hero from "@/components/main/hero"
import Skills from "@/components/main/skills"
import AiCareerRadar from "@/components/main/ai-career-radar"
import Projects from "@/components/main/projects"
import Footer from "@/components/main/footer"

export default function Home() {
  return (
    <main className="min-h-screen w-full relative bg-[#0e070c] text-white selection:bg-purple-500/30 selection:text-white">
      <Navbar />
      <div className="flex flex-col">
        <Hero />
        <Skills />
        <AiCareerRadar />
        <Projects />
        <Footer />
      </div>
    </main>
  )
}

