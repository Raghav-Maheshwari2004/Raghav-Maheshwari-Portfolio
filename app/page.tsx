import { Hero } from "../components/hero"
import { Skills } from "../components/skills"
import { Projects } from "../components/projects"
import { Experience } from "../components/experience"
import { Contact } from "../components/contact"
import { Navigation } from "../components/navigation"
import { Certifications } from "../components/certifications"
import { Achievements } from "../components/achievements"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Fixed spacing for navbar - exactly 64px (h-16) */}
      <main style={{ paddingTop: "64px" }}>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Certifications />
        <Contact />
      </main>
    </div>
  )
}
