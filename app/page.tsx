import Navbar     from "@/components/main/navbar"
import Hero       from "@/components/main/hero"
import Skills     from "@/components/main/skills"
import AiCareerRadar from "@/components/main/ai-career-radar"
import Projects   from "@/components/main/projects"
import Footer     from "@/components/main/footer"

export default function Home() {
  return (
    <main className="h-full w-full overflow-hidden">
      <Navbar />
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <AiCareerRadar />
        <Projects />
        <Footer />
      </div>
    </main>
  )
}
