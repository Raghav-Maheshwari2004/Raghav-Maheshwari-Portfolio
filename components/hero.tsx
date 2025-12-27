"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Terminal } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    },
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 max-w-5xl">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">
                Raghav Maheshwari
              </span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6 flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-light text-primary">
            <Terminal className="w-6 h-6 sm:w-8 sm:h-8" />
            <span>Full-Stack Engineer & Problem Solver</span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              I transform complex problems into elegant digital solutions. 
              Currently a final-year Computer Science student specializing in 
              <span className="text-foreground font-medium"> Scalable Web Architecture</span>, 
              <span className="text-foreground font-medium"> AI Integration</span>, and creating 
              <span className="text-foreground font-medium"> User-Centric Experiences</span>.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 w-full sm:w-auto">
            <Button size="lg" className="group w-full sm:w-auto min-w-[160px] h-12 text-base shadow-lg shadow-primary/25" onClick={scrollToProjects}>
              View Selected Work
              <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[160px] h-12 text-base backdrop-blur-sm bg-background/50 hover:bg-secondary/50" asChild>
              <a
                href="https://drive.google.com/file/d/1bVntMEC01NiQeyCR1vMYrbjkbUwSiddI/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
              </a>
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center items-center space-x-6 p-4 rounded-2xl bg-secondary/20 backdrop-blur-sm border border-secondary/20">
            <a href="https://github.com/Raghav-Maheshwari2004" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200">
               <Github className="h-6 w-6" />
            </a>
            <div className="h-4 w-[1px] bg-border" />
            <a href="https://www.linkedin.com/in/raghav-maheshwari-803012275/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-500 transition-colors hover:scale-110 transform duration-200">
               <Linkedin className="h-6 w-6" />
            </a>
            <div className="h-4 w-[1px] bg-border" />
            <a href="mailto:maheshwari.raghav2004@gmail.com" className="text-muted-foreground hover:text-red-500 transition-colors hover:scale-110 transform duration-200">
               <Mail className="h-6 w-6" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce p-2 rounded-full border border-muted-foreground/20 bg-background/50 backdrop-blur-sm">
           <ArrowDown className="h-5 w-5 text-muted-foreground" />
        </div>
      </motion.div>
    </section>
  )
}