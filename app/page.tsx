"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

// Import your new Intro Component
import IntroPage from "../components/IntroPage" 

// Your existing components
import { Hero } from "../components/hero"
import { Skills } from "../components/skills"
import { Projects } from "../components/projects"
import { Experience } from "../components/experience"
import { Contact } from "../components/contact"
import { Navigation } from "../components/navigation"
import { Certifications } from "../components/certifications"
import { Achievements } from "../components/achievements"

export default function Portfolio() {
  // We default to TRUE so the Intro Page shows first
  const [showIntro, setShowIntro] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      
      {/* AnimatePresence with mode="wait" ensures the Intro completely 
        fades out BEFORE the website fades in 
      */}
      <AnimatePresence >
        
        {showIntro ? (
          // 1. The Intro Page (Holographic Decode)
          // It handles its own animation logic. When the user clicks the button,
          // it calls onFinish, setting showIntro to false.
          <IntroPage key="intro" onFinish={() => setShowIntro(false)} />
        ) : (
          // 2. The Main Website
          // We wrap it in motion.div to give it a slow fade-in effect
          <motion.div
            key="main-site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }} // Smooth 1s fade-in
            className="w-full"
          >
            <Navigation />
            
            <main style={{ paddingTop: "64px" }}>
              <Hero />
              <Skills />
              <Projects />
              <Experience />
              <Achievements />
              <Certifications />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}