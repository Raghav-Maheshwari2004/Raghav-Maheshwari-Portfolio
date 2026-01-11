"use client" // Essential for animations

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"

import { Hero } from "../components/hero"
import { Skills } from "../components/skills"
import { Projects } from "../components/projects"
import { Experience } from "../components/experience"
import { Contact } from "../components/contact"
import { Navigation } from "../components/navigation"
import { Certifications } from "../components/certifications"
import { Achievements } from "../components/achievements"

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // This timer controls how long the preloader shows.
    // 2500ms = 2.5 seconds. Adjust to match the counter speed in Preloader.
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      
      {/* The Preloader System */}
      

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