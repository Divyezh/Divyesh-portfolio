import Navbar from "@/components/main/navbar"
import Hero from "@/components/main/hero"
import Skills from "@/components/main/skills"
import AiCareerRadar from "@/components/main/ai-career-radar"
import CollaborateSection from "@/components/main/collaborate-section"
import Projects from "@/components/main/projects"
import Footer from "@/components/main/footer"
import SmoothScrollProvider from "@/components/sub/smooth-scroll-provider"

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="min-h-screen w-full relative bg-[#0e070c] text-white selection:bg-purple-500/30 selection:text-white">
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







