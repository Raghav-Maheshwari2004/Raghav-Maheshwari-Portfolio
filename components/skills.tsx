"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useScrollAnimation } from "../hooks/use-scroll-animation"

const getIcon = (slug: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`

export function Skills() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation()

  const skillCategories = [
    {
      title: "Core Languages",
      skills: [
        { name: "Java", icon: getIcon("java") },
        { name: "Python", icon: getIcon("python") },
        { name: "C++", icon: getIcon("cplusplus") },
        { name: "JavaScript", icon: getIcon("javascript") },
        { name: "PHP", icon: getIcon("php") },
        { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      ],
    },
    {
      title: "Frontend & Design",
      skills: [
        { name: "React.js", icon: getIcon("react") },
        { name: "HTML5", icon: getIcon("html5") },
        { name: "CSS3", icon: getIcon("css3") },
        { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Bootstrap", icon: getIcon("bootstrap") },
        { name: "Framer Motion", icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg" },
      ],
    },
    {
      title: "AI & Computer Vision",
      skills: [
        { name: "OpenCV", icon: getIcon("opencv") },
        { name: "PyTorch", icon: getIcon("pytorch") },
        { name: "TensorFlow", icon: getIcon("tensorflow") },
        { name: "YOLOv11", icon: "https://img.icons8.com/color/48/artificial-intelligence.png" },
        { name: "MediaPipe", icon: "https://mediapipe.dev/images/logo_horizontal.png" },
        { name: "Gemini API", icon: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" },
      ],
    },
    {
      title: "Backend & Cloud",
      skills: [
        { name: "Node.js", icon: getIcon("nodejs") },
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" },
        { name: "Firebase", icon: getIcon("firebase") },
        { name: "Azure", icon: getIcon("azure") },
        { name: "MongoDB", icon: getIcon("mongodb") },
      ],
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "Git", icon: getIcon("git") },
        { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "VS Code", icon: getIcon("vscode") },
        { name: "Postman", icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
        { name: "Vercel", icon: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" },
      ],
    },
  ]

  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      
      {/* CONTINUOUS GRID PATTERN */}
      <div className="absolute inset-0 h-[80%] w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
             <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Technical Arsenal</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The tools and technologies I use to bring ideas to life.
          </p>
        </div>

        <div
          ref={skillsRef}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-200 ${
            skillsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-primary/10 bg-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50 border shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 cursor-default hover:bg-background"
                    >
                      <div className="w-6 h-6 flex items-center justify-center">
                        <img 
                          src={skill.icon} 
                          alt={skill.name} 
                          className="w-full h-full object-contain filter group-hover:brightness-110" 
                          loading="lazy"
                        />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}