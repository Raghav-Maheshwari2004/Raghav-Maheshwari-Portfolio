"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Terminal } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 } as const
    },
  }

  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden bg-background flex flex-col items-center justify-center pt-20"
    >
      {/* Grid Background with Fade */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* CONTENT LAYER */}
      <div className="container mx-auto px-4 z-10 relative text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Available for Work
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="bg-gradient-to-b from-black to-black/60 dark:from-white dark:to-white/60 bg-clip-text text-transparent">
                Raghav Maheshwari
              </span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8 flex items-center justify-center gap-3 text-xl sm:text-2xl md:text-3xl font-light text-blue-700/80 dark:text-blue-200/80">
            <Terminal className="w-6 h-6 sm:w-8 sm:h-8 opacity-80" />
            <span>Full-Stack Engineer & Problem Solver</span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              I transform complex problems into elegant digital solutions.
              Specializing in <span className="text-blue-600 dark:text-blue-200">Scalable Web Architecture</span>,
              <span className="text-blue-600 dark:text-blue-200"> AI Integration</span>, and
              <span className="text-blue-600 dark:text-blue-200"> User-Centric Experiences</span>.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
            <Button size="lg" className="group w-full sm:w-auto min-w-[160px] h-12 text-base bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-lg shadow-blue-900/20" onClick={scrollToProjects}>
              View Selected Work
              <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[160px] h-12 text-base border-border hover:bg-muted text-foreground hover:text-foreground" asChild>
              <a
                href="https://drive.google.com/file/d/1bVntMEC01NiQeyCR1vMYrbjkbUwSiddI/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
              </a>
            </Button>
          </motion.div>

        </motion.div>

        {/* Social Links Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex justify-center items-center space-x-8"
        >
          <a href="https://github.com/Raghav-Maheshwari2004" target="_blank" rel="noopener noreferrer" className="p-3 text-slate-400 hover:text-white transition-all hover:scale-110">
            <Github className="h-7 w-7" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/raghav-maheshwari-803012275/" target="_blank" rel="noopener noreferrer" className="p-3 text-slate-400 hover:text-blue-400 transition-all hover:scale-110">
            <Linkedin className="h-7 w-7" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="mailto:maheshwari.raghav2004@gmail.com" className="p-3 text-slate-400 hover:text-red-400 transition-all hover:scale-110">
            <Mail className="h-7 w-7" />
            <span className="sr-only">Email</span>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
      >
        <div className="animate-bounce text-slate-500">
          <ArrowDown className="h-6 w-6" />
        </div>
      </motion.div>
    </section>
  )
}