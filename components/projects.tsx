"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Eye, Zap } from "lucide-react"
import { useScrollAnimation } from "../hooks/use-scroll-animation"
import { useRef, useState, MouseEvent } from "react"
import { motion } from "framer-motion"

// --- Configuration & Data ---
const projectsData = [
  {
    title: "Real-Time Disaster Management",
    description: "Capstone project aiding rescue ops. Utilizes YOLOv11 for real-time object detection to identify victims/hazards in hazardous environments.",
    image: "/placeholder.svg?height=600&width=800", // Larger image for flagship
    technologies: ["Python", "YOLOv11", "OpenCV"],
    liveUrl: "https://disaster-management-brown.vercel.app/",
    githubUrl: "https://github.com/Raghav-Maheshwari2004",
    status: "Flagship",
  },
  {
    title: "Dynamic Meeting Scheduler",
    description: "Full-stack booking app. Leverages AJAX for instant availability checks without page reloads. Robust PHP backend.",
    image: "/placeholder.svg?height=600&width=400", // Taller image
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
  },
  {
    title: "Talksy Chat",
    description: "Real-time chat using Firestore for instant synchronization and media sharing.",
    image: "/images/talksy2.png",
    technologies: ["React", "Firebase", "Firestore"],
    liveUrl: "https://talksy-wxza.vercel.app/",
    githubUrl: "#",
  },
]

// --- Spotlight Card Component ---
// This handles the "Flashlight" effect on hover
function SpotlightCard({ 
  children, 
  className = "", 
  spotlightColor = "rgba(59, 130, 246, 0.25)" // Electric Blue
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
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-[#0F172A] text-slate-200 shadow-2xl ${className}`}
    >
      {/* The Moving Spotlight Gradient */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
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
    <section id="projects" className="py-24 bg-[#020617] relative overflow-hidden">
      
      {/* Deep Tech Grid Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            Featured <span className="text-blue-500">Works</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A selection of complex problems solved with elegant engineering.
          </p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-6 max-w-7xl mx-auto">
          
          {projectsData.map((project, index) => {
            // Determine Bento Grid Spans based on index
            // Index 0: Flagship (Large Square 2x2)
            // Index 1: Technical (Tall Vertical 1x2)
            // Others: Standard (1x1)
            const isFlagship = index === 0;
            const isTechnical = index === 1;
            
            let gridClass = "col-span-1 row-span-1"; 
            if (isFlagship) gridClass = "md:col-span-2 md:row-span-2";
            if (isTechnical) gridClass = "md:col-span-1 md:row-span-2";

            return (
              <SpotlightCard key={index} className={`${gridClass} group flex flex-col`}>
                <Card className="h-full w-full bg-transparent border-0 flex flex-col justify-between">
                  
                  {/* Image / Preview Area */}
                  <div className={`relative overflow-hidden w-full ${isFlagship ? 'h-[60%]' : 'h-[50%]'} bg-slate-950/50`}>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    
                    {/* Floating Status Badge */}
                    {project.status && (
                       <Badge variant="secondary" className="absolute top-4 left-4 bg-blue-500/10 text-blue-400 border-blue-500/20 backdrop-blur-md z-10">
                         {project.status}
                       </Badge>
                    )}

                    {/* Overlay Action Buttons (Visible on Hover) */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                       {project.liveUrl !== "#" && (
                         <Button size="sm" variant="default" className="bg-blue-600 hover:bg-blue-500 rounded-full" asChild>
                           <a href={project.liveUrl} target="_blank" rel="noreferrer">
                             <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                           </a>
                         </Button>
                       )}
                       {project.githubUrl !== "#" && (
                         <Button size="sm" variant="outline" className="border-white/20 bg-black/50 text-white hover:bg-white/10 rounded-full" asChild>
                           <a href={project.githubUrl} target="_blank" rel="noreferrer">
                             <Github className="w-4 h-4 mr-2" /> Code
                           </a>
                         </Button>
                       )}
                    </div>
                  </div>

                  {/* Text Content */}
                  <CardHeader className="p-6 flex-grow flex flex-col justify-start relative z-20 bg-[#0F172A]">
                    <div className="flex justify-between items-start mb-2">
                       <CardTitle className={`text-white font-bold ${isFlagship ? 'text-2xl' : 'text-xl'}`}>
                         {project.title}
                       </CardTitle>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-grow">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies.map((tech, i) => (
                        <Badge 
                          key={i} 
                          variant="outline" 
                          className="border-blue-500/20 bg-blue-500/5 text-blue-300/80 text-[10px] px-2 py-0.5 hover:border-blue-500/50 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                </Card>
              </SpotlightCard>
            )
          })}
        </div>
        
        {/* Bottom CTA (Optional) */}
        <div className="flex justify-center mt-12">
           <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/5">
             View All Repositories <Github className="ml-2 h-4 w-4" />
           </Button>
        </div>

      </div>
    </section>
  )
}