"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Eye, Zap, ArrowRight, X, ChevronRight, Activity, Code2, Server } from "lucide-react"
import { useScrollAnimation } from "../hooks/use-scroll-animation"
import { useRef, useState, MouseEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"

// --- Types & Data ---
type ProjectDetails = {
  problem: string;
  architecture: string;
  metrics: string[];
}

export type ProjectData = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  status: string;
  mapImageUrl?: string;
  useMapReveal?: boolean;
  details?: ProjectDetails;
}

const currentProjectData: ProjectData[] = [
  {
    title: "WeNAV - Live Navigation & Tracking",
    description: "A real-time location-sharing app featuring secure, room-based trip tracking, dynamic routing with custom UI aesthetics, and real-time ETA calculation.",
    image: "/images/wenav.png",
    technologies: ["Flutter", "Firebase", "Google Maps API"],
    liveUrl: "#",
    githubUrl: "https://github.com/Raghav-Maheshwari2004/WeNAV",
    status: "Currently Working On",
    mapImageUrl: "/images/map-bg.png"
  }
]

const projectsData: ProjectData[] = [
  {
    title: "Real-Time Disaster Management",
    description: "Capstone project aiding rescue ops. Utilizes YOLOv11 for real-time object detection to identify victims/hazards in hazardous environments.",
    image: "/images/Disaster.png",
    technologies: ["Python", "YOLOv11", "OpenCV"],
    liveUrl: "https://realtimedisasterdashbaord.streamlit.app/",
    githubUrl: "https://github.com/Raghav-Maheshwari2004/Sailency-Adaptaive-Algo",
    status: "Flagship",
    details: {
      problem: "Traditional disaster response relies on manual reporting and human-operated surveillance, leading to critical time lags in detecting fires, floods, or debris-blocked paths in complex, large-scale environments.",
      architecture: "Developed a real-time computer vision pipeline integrating YOLOv8 for high-speed object detection and DeepSORT for multi-object tracking. The system processes live feeds (CCTV/Drone) to identify disaster indicators and map them dynamically.",
      metrics: [
        "Detection Precision: ~86–94% (depending on environmental noise).",
        "Processing Latency: Optimized for near real-time execution on edge hardware.",
        "Core Logic: Cascaded YOLO inference with motion-trajectory analysis to eliminate false positives in dynamic crowd/disaster scenes."
      ]
    }
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
    image: "/images/Dynamic.png",
    technologies: ["React.js", "API", "CSS"],
    liveUrl: "https://dynamic-weather-visualizer.vercel.app/",
    githubUrl: "https://github.com/Raghav-Maheshwari2004/dynamic-weather-visualizer",
    status: "Live",
    useMapReveal: true,
    mapImageUrl: "/images/weather-bg.png",
    details: {
      problem: "Existing weather tools often provide raw, overwhelming data that lacks contextual utility. Users need a way to filter through massive meteorological datasets to extract actionable insights for daily planning or professional use-cases.",
      architecture: "Engineered an interactive dashboard fetching real-time data via RESTful APIs (e.g., OpenWeatherMap). The front-end leverages dynamic charting libraries to visualize multi-parameter trends (temperature, humidity, air quality) with an auto-updating state management system.",
      metrics: [
        "Data Integrity: Implemented robust error handling for API failures and invalid location inputs.",
        "Responsiveness: Fully fluid design optimized for mobile and desktop, with <1s page load times.",
        "Data Density: Synchronized KPI gauges and forecast grids allow for multi-metric comparison at a single glance."
      ]
    }
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
    githubUrl: "https://github.com/Raghav-Maheshwari2004/Skillizer",
    status: "AI Powered",
    details: {
      problem: "Job seekers struggle to map their project experience to specific industry-demanded skill sets, while recruiters face 'resume noise' that masks technical proficiency and project impact.",
      architecture: "Leveraged the Google Gemini API to build an automated parser that analyzes project descriptions, mapping them against technical competency frameworks and extracting key performance metrics to generate objective skill scores.",
      metrics: [
        "Parsing Efficiency: Reduces manual resume screening time by ~70%.",
        "Alignment Accuracy: High correlation between extracted skills and specific JDs (Job Descriptions).",
        "Scalability: Processes multi-project portfolios in seconds."
      ]
    }
  },
  {
    title: "Talksy Chat",
    description: "Real-time chat using Firestore for instant synchronization and media sharing.",
    image: "/images/talksy2.png",
    technologies: ["React", "Firebase", "Firestore"],
    liveUrl: "https://talksy-wxza.vercel.app/",
    githubUrl: "https://github.com/Raghav-Maheshwari2004/talksy-chat-app",
    status: "Real-Time",
    useMapReveal: true,
    mapImageUrl: "/images/talksy-bg.png",
  },
]

// All projects combined for the sidebar
const allProjects = [...currentProjectData, ...projectsData];

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
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// --- Map Reveal Card Component ---
function MapRevealCard({
  children,
  className = "",
  mapImageUrl = "/images/map-bg.png"
}: {
  children: React.ReactNode;
  className?: string;
  mapImageUrl?: string;
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
      className={`relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-amber-500/30 dark:bg-white/5 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{
          opacity,
          backgroundImage: `url(${mapImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black 10%, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black 10%, transparent 80%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-background/70 dark:bg-slate-950/70 transition-opacity duration-500"
        style={{ opacity: opacity ? 1 : 0 }}
      />
      <div className="relative h-full z-10">{children}</div>
    </div>
  );
}

// --- Detailed View Component ---
function ProjectDetailView({ project, onClose }: { project: ProjectData; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl overflow-hidden shadow-2xl relative h-full flex flex-col"
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-50 bg-background/50 hover:bg-background rounded-full backdrop-blur-md"
        onClick={onClose}
      >
        <X className="w-5 h-5" />
      </Button>

      <div className="relative h-64 md:h-80 shrink-0">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <Badge className="mb-3 bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border-none">
            {project.status}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{project.title}</h2>
        </div>
      </div>

      <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-grow">
        <div className="flex flex-wrap gap-2 mb-8">
          {project.technologies.map((tech, i) => (
            <span key={i} className="text-sm font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
              {tech}
            </span>
          ))}
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-3">
              <Eye className="w-5 h-5 text-blue-500" /> Overview
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          {project.details ? (
            <>
              <div>
                <h4 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-3">
                  <Activity className="w-5 h-5 text-red-500" /> Problem Definition
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {project.details.problem}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-3">
                  <Server className="w-5 h-5 text-purple-500" /> System Architecture
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {project.details.architecture}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-amber-500" /> Performance Metrics
                </h4>
                <ul className="space-y-3">
                  {project.details.metrics.map((metric, i) => {
                    const [title, desc] = metric.split(': ');
                    return (
                      <li key={i} className="flex gap-3 text-muted-foreground">
                        <ChevronRight className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-foreground">{title}:</strong> {desc || ''}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          ) : (
            <div className="p-6 bg-secondary/50 rounded-2xl border border-border text-center">
              <Code2 className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Detailed architecture and metrics are currently being documented for this project.</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 border-t border-border bg-card/50 flex gap-4 shrink-0">
        {project.githubUrl !== "#" && (
          <Button asChild variant="outline" className="flex-1 rounded-xl group border-border hover:bg-secondary">
            <a href={project.githubUrl} target="_blank" rel="noreferrer">
              <Github className="w-4 h-4 mr-2" /> Source Code
            </a>
          </Button>
        )}
        {project.liveUrl !== "#" && (
          <Button asChild className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-500 text-white">
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
            </a>
          </Button>
        )}
      </div>
    </motion.div>
  );
}


// --- Main Projects Component ---
export function Projects() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  // Render a project card in the grid
  const renderCard = (project: ProjectData, index: number, isFlagship: boolean, isCurrent: boolean) => {
    const gridClass = isFlagship && !selectedProject ? "lg:col-span-2 lg:row-span-2" : "col-span-1 row-span-1";
    const CardComponent = project.useMapReveal || isCurrent ? MapRevealCard : SpotlightCard;
    const cardProps = project.useMapReveal || isCurrent ? { mapImageUrl: project.mapImageUrl || "/images/map-bg.png" } : {};

    return (
      <CardComponent key={index} {...(cardProps as any)} className={`${gridClass} group flex flex-col h-full min-h-[320px] transition-all duration-500`}>
        <Card className="h-full w-full bg-transparent border-0 flex flex-col justify-between shadow-none p-0">

          <div className={`relative overflow-hidden w-full ${isFlagship && !selectedProject ? 'h-[280px] lg:h-[400px]' : 'h-[180px]'} bg-muted/20 dark:bg-black/40 shrink-0`}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90 dark:from-slate-950 dark:via-slate-950/20" />

            <Badge variant="secondary" className={`absolute top-4 right-4 backdrop-blur-md text-foreground border border-border/10 z-10 font-normal tracking-wide px-3 py-1 ${isCurrent ? 'bg-amber-500/20 text-amber-500' : 'bg-background/50'}`}>
              {project.status}
            </Badge>
          </div>

          <div className="p-6 md:p-8 flex-grow flex flex-col relative z-20 -mt-12">
            <div className="flex justify-between items-start mb-3">
              <h3 className={`font-bold text-foreground tracking-tight ${isFlagship && !selectedProject ? 'text-3xl' : 'text-xl'}`}>
                {project.title}
              </h3>
            </div>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 flex-grow line-clamp-3">
              {project.description}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 2).map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-500 dark:text-blue-300 border border-blue-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Button
                variant="ghost"
                className="text-sm font-medium hover:bg-blue-500/10 hover:text-blue-500 group/btn -mr-2"
                onClick={() => {
                  setSelectedProject(project);
                  // Scroll slightly so the split view is centered if on mobile
                  const el = document.getElementById('projects');
                  if (el && window.innerWidth < 1024) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                More <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </Card>
      </CardComponent>
    );
  };

  return (
    <section id="projects" className="py-32 bg-background relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background pointer-events-none dark:from-blue-900/10 dark:via-slate-950 dark:to-slate-950" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
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

        {/* Dynamic Layout Wrapper */}
        <AnimatePresence mode="wait">
          {!selectedProject ? (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              {/* Active Development Section (Standalone when no project selected) */}
              <div className="mb-20 max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                  </span>
                  <h3 className="text-2xl font-bold text-foreground tracking-tight">Active Development</h3>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {currentProjectData.map((project, index) => (
                    <MapRevealCard key={`current-${index}`} mapImageUrl={project.mapImageUrl || "/images/map-bg.png"} className="group flex flex-col h-full min-h-[250px] transition-all duration-500">
                      <Card className="h-full w-full bg-transparent border-0 flex flex-col md:flex-row shadow-none p-0 overflow-hidden">

                        {/* Image Area - Half width on desktop */}
                        <div className="relative w-full md:w-2/5 h-[200px] md:h-auto bg-muted/20 dark:bg-black/40 shrink-0">
                          <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay z-10" />
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90 dark:from-slate-950 md:bg-gradient-to-r" />
                        </div>

                        {/* Text Content */}
                        <div className="p-6 md:p-8 w-full md:w-3/5 flex flex-col relative z-20 justify-center">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-bold text-foreground tracking-tight text-2xl group-hover:text-amber-500 transition-colors">
                              {project.title}
                            </h3>
                          </div>

                          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                            {project.description}
                          </p>

                          {/* Tech Stack Pills & More Button */}
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech, i) => (
                                <span
                                  key={i}
                                  className="text-xs font-medium px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <Button
                              variant="ghost"
                              className="text-sm font-medium hover:bg-amber-500/10 hover:text-amber-500 group/btn -mr-2"
                              onClick={() => {
                                setSelectedProject(project);
                                const el = document.getElementById('projects');
                                if (el && window.innerWidth < 1024) {
                                  el.scrollIntoView({ behavior: 'smooth' });
                                }
                              }}
                            >
                              More <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </MapRevealCard>
                  ))}
                </div>
              </div>

              {/* Grid Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {projectsData.map((project, index) => renderCard(project, index, index === 0, false))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="split-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 max-w-7xl mx-auto h-auto lg:h-[800px]"
            >
              {/* Sidebar (List of all projects) */}
              <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar lg:h-full pb-8 lg:pb-0 order-2 lg:order-1">
                <h3 className="font-semibold text-muted-foreground px-2 pt-2 text-sm uppercase tracking-wider">All Projects</h3>
                {allProjects.map((project, index) => {
                  const isSelected = project.title === selectedProject.title;
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedProject(project)}
                      className={`flex gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300 border ${isSelected
                        ? 'bg-card border-blue-500/50 shadow-md shadow-blue-900/10'
                        : 'bg-transparent border-transparent hover:bg-card/50 hover:border-border'
                        }`}
                    >
                      <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-muted">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className={`font-semibold text-sm line-clamp-2 ${isSelected ? 'text-blue-500' : 'text-foreground'}`}>
                          {project.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">{project.status}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Expanded Detail View */}
              <div className="lg:h-full order-1 lg:order-2">
                <ProjectDetailView project={selectedProject} onClose={() => setSelectedProject(null)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        {!selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-20"
          >
            <a href="https://github.com/Raghav-Maheshwari2004?tab=repositories" target="_blank" rel="noreferrer">
              <Button className="h-12 px-8 rounded-full bg-secondary hover:bg-secondary/80 text-foreground border border-border shadow-lg group">
                View All Repositories <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </motion.div>
        )}

      </div>
    </section>
  )
}
