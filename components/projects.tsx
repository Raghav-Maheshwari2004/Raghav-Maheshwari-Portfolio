"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Image as ImageIcon, MonitorPlay, ChevronLeft, ChevronRight } from "lucide-react"
import { useScrollAnimation } from "../hooks/use-scroll-animation"
import { useState } from "react"
import { motion } from "framer-motion"

const projectsData = [
  {
    title: "Real-Time Disaster Management System",
    description: "A capstone project designed to aid rescue operations in hazardous environments. Utilizes YOLOv11 for real-time object detection to identify victims and hazards.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Python", "YOLOv11", "OpenCV"],
    liveUrl: "#",
    githubUrl: "https://github.com/Raghav-Maheshwari2004",
    status: "Capstone",
  },
  {
    title: "Dynamic Meeting Scheduler",
    description: "Full-stack app for seamless booking. Leverages AJAX for instant availability checks without page reloads. Robust PHP backend.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["PHP", "AJAX", "MySQL"],
    liveUrl: "#",
    githubUrl: "#",
    status: "Completed",
  },
  {
    title: "Weather Forecast Dashboard",
    description: "Responsive weather app integrating OpenWeatherMap API for real-time forecasts, humidity, and wind speed with dynamic UI updates.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["React.js", "API", "CSS"],
    liveUrl: "#",
    githubUrl: "#",
    status: "Live",
  },
  {
    title: "Hostel Management System",
    description: "Comprehensive portal for hostel operations, bookings, and payments. Separate logins for Admin, Resident, and Manager roles.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["PHP", "MySQL", "Bootstrap"],
    liveUrl: "#",
    githubUrl: "#",
    status: "Dev",
  },
  {
    title: "Skillizer AI Platform",
    description: "AI-based scoring and feedback using Gemini AI API to evaluate user skills. Features personalized dashboards and reports.",
    image: "/images/skillizer.png",
    technologies: ["React", "Firebase", "Gemini AI"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Talksy Chat App",
    description: "Real-time chat application using Firestore for instant message synchronization and Firebase Storage for media sharing.",
    image: "/images/talksy2.png",
    technologies: ["React", "Firebase", "Firestore"],
    liveUrl: "#",
    githubUrl: "#",
  },
]

export function Projects() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showLivePreview, setShowLivePreview] = useState(false)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projectsData.length)
    setShowLivePreview(false)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length)
    setShowLivePreview(false)
  }

  const getDistanceFromCenter = (index: number) => {
    const length = projectsData.length
    let distance = index - currentIndex
    if (distance > length / 2) distance -= length
    if (distance < -length / 2) distance += length
    return distance
  }

  return (
    // Changed bg to match theme
    <section id="projects" className="py-24 bg-background relative overflow-hidden">
      
      {/* Subtle Gradient Background for this section */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
             <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Featured Works</span>
          </h2>
        </div>

        <div className="relative h-[600px] sm:h-[700px] flex items-center justify-center perspective-[1200px]">
          {projectsData.map((project, index) => {
            const distance = getDistanceFromCenter(index)
            const absDistance = Math.abs(distance)
            const canPreview = project.liveUrl !== "#"
            const isActive = distance === 0

            let zIndex = 10 - absDistance
            let scale = 1 - absDistance * 0.1
            let xOffset = distance === 0 ? "0%" : distance > 0 ? `${absDistance * 40}%` : `${absDistance * -40}%`
            let blur = absDistance * 4 
            let brightness = 1 - absDistance * 0.3
            let opacity = absDistance > 2 ? 0 : 1 

            return (
               <motion.div
                key={index}
                className="absolute top-1/2 left-1/2 origin-center w-[300px] sm:w-[380px] md:w-[420px] h-[500px] sm:h-[600px]"
                initial={false}
                animate={{
                  x: `calc(-50% + ${xOffset})`,
                  y: "-50%",
                  scale: scale,
                  zIndex: zIndex,
                  opacity: opacity,
                  filter: `blur(${blur}px) brightness(${brightness})`,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 25 }}
                style={{ 
                   pointerEvents: isActive ? 'auto' : 'none' 
                }}
              >
                {/* Standardized Card Style */}
                <Card className={`h-full w-full overflow-hidden border-0 shadow-2xl bg-card/90 backdrop-blur-md ${isActive ? 'ring-1 ring-primary/30 shadow-primary/10' : ''} flex flex-col`}>
                  
                  <div className="relative h-[45%] w-full bg-black/20 overflow-hidden group border-b border-white/5">
                     {isActive && showLivePreview && canPreview ? (
                      <iframe
                        src={project.liveUrl}
                        className="w-full h-full border-0 animate-in fade-in"
                        title={`${project.title} Preview`}
                        sandbox="allow-scripts allow-same-origin"
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                      />
                    )}

                    {isActive && canPreview && (
                      <div className="absolute top-3 right-3 z-30">
                         <Button
                          size="sm"
                          variant="outline"
                          className="h-8 bg-black/60 backdrop-blur-md border-white/10 hover:bg-black/80 text-xs gap-1"
                          onClick={() => setShowLivePreview(!showLivePreview)}
                        >
                          {showLivePreview ? <ImageIcon className="h-3 w-3" /> : <MonitorPlay className="h-3 w-3" />}
                          {showLivePreview ? "Image" : "Live"}
                        </Button>
                      </div>
                    )}
                    
                     {project.status && (
                      <div className="absolute top-3 left-3 z-30">
                        <Badge variant="secondary" className="bg-primary/20 text-primary-foreground border-primary/20 backdrop-blur-md">
                            {project.status}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardHeader className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                        <CardTitle className="text-xl sm:text-2xl mb-3">{project.title}</CardTitle>
                        
                        <motion.div 
                            animate={{ opacity: isActive ? 1 : 0.5 }} 
                            className="overflow-hidden"
                        >
                            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies.map((tech, i) => (
                                <Badge key={i} variant="outline" className="border-primary/10 bg-primary/5 text-[10px] sm:text-xs px-2 py-1">
                                    {tech}
                                </Badge>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="flex gap-3 mt-auto">
                        <Button size="sm" className="flex-1" asChild disabled={!canPreview}>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" /> Visit
                            </a>
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4 mr-2" /> Code
                            </a>
                        </Button>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button
            onClick={handlePrev}
            variant="outline"
            size="lg"
            className="rounded-full border-primary/10 bg-background/50 backdrop-blur-sm px-6"
          >
            <ChevronLeft className="mr-2 h-5 w-5" /> PREV
          </Button>
          <Button
            onClick={handleNext}
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6"
            size="lg"
          >
             NEXT <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

      </div>
    </section>
  )
}