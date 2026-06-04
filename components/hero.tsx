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
      <div className="container mx-auto px-4 sm:px-8 z-10 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] xl:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-center w-full max-w-screen-2xl mx-auto text-left"
        >
          <div className="flex flex-col items-start">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-3 mb-8 md:mb-12">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </div>
                <span className="text-primary font-bold tracking-widest uppercase text-sm">Available for Work</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <h1 className="text-5xl sm:text-[5.5rem] md:text-[6.5rem] lg:text-[7rem] xl:text-[8rem] font-black mb-8 tracking-tighter leading-[0.9] pb-4">
                <span className="bg-gradient-to-b from-black to-black/60 dark:from-white dark:to-white/60 bg-clip-text text-transparent">
                  Raghav <br className="hidden sm:block" /> Maheshwari.
                </span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-10 flex items-center gap-4 text-xl sm:text-2xl font-semibold text-muted-foreground">
              <div className="h-px bg-muted-foreground/30 w-12 hidden md:block" />
              <span>Full-Stack Engineer & Problem Solver</span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-xl leading-relaxed">
                I transform complex problems into elegant digital solutions.
                Specializing in <span className="text-primary font-medium">Scalable Web Architecture</span>,
                <span className="text-primary font-medium"> AI Integration</span>, and
                <span className="text-primary font-medium"> User-Centric Experiences</span>.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 items-start w-full sm:w-auto">
              <Button size="lg" className="group h-14 px-8 rounded-full text-base font-bold bg-foreground text-background hover:scale-105 transition-transform duration-300 shadow-xl" onClick={scrollToProjects}>
                Explore My Work
                <ArrowDown className="ml-3 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-base font-bold border-2 border-border hover:bg-muted" asChild>
                <a
                  href="https://drive.google.com/file/d/14Qs5VUfPeyTQALvHuJGFF4FJqQbHs9jI/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                </a>
              </Button>
            </motion.div>

            {/* Social Links Row */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-20 flex items-center space-x-6"
            >
              <a href="https://github.com/Raghav-Maheshwari2004" target="_blank" rel="noopener noreferrer" className="p-3 bg-muted/50 rounded-full text-foreground/70 hover:text-foreground hover:bg-muted transition-all hover:scale-110">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/raghav-maheshwari-803012275/" target="_blank" rel="noopener noreferrer" className="p-3 bg-muted/50 rounded-full text-foreground/70 hover:text-blue-500 hover:bg-blue-500/10 transition-all hover:scale-110">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="mailto:maheshwari.raghav2004@gmail.com" className="p-3 bg-muted/50 rounded-full text-foreground/70 hover:text-red-500 hover:bg-red-500/10 transition-all hover:scale-110">
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </a>
            </motion.div>
          </div>

          {/* THE NEW RIGHT SIDE TERMINAL */}
          <motion.div 
            initial={{ opacity: 0, x: 20, rotateY: -10, perspective: 1000 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.6, duration: 1, type: "spring" }}
            className="hidden lg:block relative w-full max-w-[28rem] xl:max-w-lg lg:ml-auto xl:mx-auto"
          >
            {/* Glow behind the terminal */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-2xl opacity-20 animate-pulse" />
            
            {/* Terminal Window */}
            <div className="relative rounded-2xl bg-[#09090b]/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto text-xs text-muted-foreground font-mono">inference_engine.py</div>
              </div>
              
              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm leading-relaxed overflow-hidden">
                <div className="flex flex-col gap-1 text-blue-300/80">
                  <span><span className="text-pink-500">import</span> cv2</span>
                  <span><span className="text-pink-500">from</span> ultralytics <span className="text-pink-500">import</span> YOLO</span>
                  <br />
                  <span><span className="text-slate-500"># Initialize real-time tracking</span></span>
                  <span>model = YOLO(<span className="text-amber-300">'yolo11n.pt'</span>)</span>
                  <span>stream = cv2.VideoCapture(<span className="text-purple-400">0</span>)</span>
                  <br />
                  <span><span className="text-pink-500">while</span> <span className="text-purple-400">True</span>:</span>
                  <span className="pl-4">success, frame = stream.read()</span>
                  <span className="pl-4">results = model.track(frame, persist=<span className="text-purple-400">True</span>)</span>
                  <br />
                  <span className="pl-4 text-emerald-400 animate-pulse">_</span>
                </div>
              </div>
            </div>
          </motion.div>
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