"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Eye, Zap, ArrowRight } from "lucide-react"
import { useScrollAnimation } from "../hooks/use-scroll-animation"
import { useRef, useState, MouseEvent } from "react"
import { motion } from "framer-motion"

// --- Configuration & Data ---
const projectsData = [
  {
    title: "Real-Time Disaster Management",
    description: "Capstone project aiding rescue ops. Utilizes YOLOv11 for real-time object detection to identify victims/hazards in hazardous environments.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["Python", "YOLOv11", "OpenCV"],
    liveUrl: "https://disaster-management-brown.vercel.app/",
    githubUrl: "https://github.com/Raghav-Maheshwari2004",
    status: "Flagship",
  },
  {
    title: "Dynamic Meeting Scheduler",
    description: "Full-stack booking app. Leverages AJAX for instant availability checks without page reloads. Robust PHP backend.",
    image: "/placeholder.svg?height=600&width=400",
    technologies: ["PHP", "AJAX", "MySQL"],
    liveUrl: "#",
    githubUrl: "#",
    status: "Core Tech",
  },
  {
    title: "Weather Dashboard",
    description: "Responsive app with OpenWeatherMap API for real-time forecasts and dynamic UI.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["React.js", "API", "CSS"],
    liveUrl: "https://dynamic-weather-visualizer.vercel.app/",
    githubUrl: "#",
    status: "Live",
  },
  {
    title: "Hostel Portal",
    description: "Comprehensive portal for hostel operations. Separate logins for Admin, Resident, and Manager roles.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["PHP", "MySQL", "Bootstrap"],
    liveUrl: "#",
    githubUrl: "#",
    status: "Dev",
  },
  {
    title: "Skillizer AI",
    description: "AI-based scoring and feedback using Gemini API to evaluate user skills with personalized reports.",
    image: "/images/skillizer.png",
    technologies: ["React", "Firebase", "Gemini"],
    liveUrl: "https://skillizer.vercel.app/",
    githubUrl: "#",
    status: "AI Powered",
  },
  {
    title: "Talksy Chat",
    description: "Real-time chat using Firestore for instant synchronization and media sharing.",
    image: "/images/talksy2.png",
    technologies: ["React", "Firebase", "Firestore"],
    liveUrl: "https://talksy-wxza.vercel.app/",
    githubUrl: "#",
    status: "Real-Time",
  },
]

// --- Spotlight Card Component ---
function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(59, 130, 246, 0.4)"
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-blue-500/30 dark:bg-white/5 ${className}`}
    >
      {/* The Moving Spotlight Gradient */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {/* Content Container */}
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// --- Main Projects Component ---
export function Projects() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()

  return (
    <section id="projects" className="py-32 bg-background relative overflow-hidden transition-colors duration-300">

      {/* Cinematic Background - Dark Mode Only */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background pointer-events-none dark:from-blue-900/10 dark:via-slate-950 dark:to-slate-950" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-20 transition-all duration-1000 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-500 dark:text-blue-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>Innovation & Engineering</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
            Selected <span className="text-blue-500">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            A showcase of technical depth, blending complex backend logic with fluid frontend experiences.
          </p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">

          {projectsData.map((project, index) => {
            const isFlagship = index === 0;
            // First item spans 2 cols if on large screen
            const gridClass = isFlagship ? "lg:col-span-2 lg:row-span-2" : "col-span-1 row-span-1";

            return (
              <SpotlightCard key={index} className={`${gridClass} group flex flex-col h-full min-h-[320px]`}>
                <Card className="h-full w-full bg-transparent border-0 flex flex-col justify-between shadow-none p-0">

                  {/* Image / Preview Area */}
                  <div className={`relative overflow-hidden w-full ${isFlagship ? 'h-[280px] lg:h-[400px]' : 'h-[180px]'} bg-muted/20 dark:bg-black/40`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 ease-out"
                    />

                    {/* Gradient Overlay for Text Readability - Dark mode mostly, but subtle in light */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90 dark:from-slate-950 dark:via-slate-950/20" />

                    {/* Floating Status Badge */}
                    <Badge variant="secondary" className="absolute top-4 right-4 bg-background/50 backdrop-blur-md text-foreground border border-border/10 z-10 font-normal tracking-wide px-3 py-1">
                      {project.status}
                    </Badge>
                  </div>

                  {/* Text Content */}
                  <div className="p-6 md:p-8 flex-grow flex flex-col relative z-20 -mt-12">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className={`font-bold text-foreground tracking-tight ${isFlagship ? 'text-3xl' : 'text-xl'}`}>
                        {project.title}
                      </h3>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                        {project.githubUrl !== "#" && (
                          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="p-2 bg-secondary rounded-full hover:bg-secondary/80 text-foreground transition-colors border border-border">
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        {project.liveUrl !== "#" && (
                          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="p-2 bg-blue-600 rounded-full hover:bg-blue-500 text-white transition-colors">
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 flex-grow">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-500 dark:text-blue-300 border border-blue-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </SpotlightCard>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-20">
          <Button className="h-12 px-8 rounded-full bg-secondary hover:bg-secondary/80 text-foreground border border-border shadow-lg group">
            View All Repositories <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

      </div>
    </section>
  )
}