"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useScrollAnimation } from "../hooks/use-scroll-animation"
import { motion } from "framer-motion"

const getIcon = (slug: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`

export function Skills() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation()

  const skillCategories = [
    {
      title: "Languages & Core",
      skills: [
        { name: "Java", icon: getIcon("java") },
        { name: "C++", icon: getIcon("cplusplus") },
        { name: "Python", icon: getIcon("python") },
        { name: "JavaScript", icon: getIcon("javascript") },
        { name: "TypeScript", icon: getIcon("typescript") },
        { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "DSA", icon: "https://img.icons8.com/color/48/code.png" },
      ],
    },
    {
      title: "Frontend",
      skills: [
        { name: "React.js", icon: getIcon("react") },
        { name: "Redux", icon: getIcon("redux") },
        { name: "HTML5", icon: getIcon("html5") },
        { name: "CSS3", icon: getIcon("css3") },
        { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Bootstrap", icon: getIcon("bootstrap") },
      ],
    },
    {
      title: "Backend & DB",
      skills: [
        { name: "Node.js", icon: getIcon("nodejs") },
        { name: "Express.js", icon: getIcon("express") },
        { name: "RESTful APIs", icon: "https://img.icons8.com/color/48/api-settings.png" },
        { name: "Firebase", icon: getIcon("firebase") },
        { name: "MongoDB", icon: getIcon("mongodb") },
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" },
      ],
    },
    {
      title: "AI/ML",
      skills: [
        { name: "PyTorch", icon: getIcon("pytorch") },
        { name: "YOLO", icon: "https://img.icons8.com/color/48/artificial-intelligence.png" },
        { name: "Gemini API", icon: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" },
        { name: "OpenCV", icon: getIcon("opencv") },
        { name: "NLP", icon: "https://img.icons8.com/color/48/natural-language-processing.png" },
        { name: "Prompt Engineering", icon: "https://img.icons8.com/color/48/chatbot.png" },
      ],
    },
    {
      title: "Cloud, CRM & Tools",
      skills: [
        { name: "AWS", icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
        { name: "Salesforce CRM", icon: getIcon("salesforce") },
        { name: "Git", icon: getIcon("git") },
      ],
    },
  ]

  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">

      {/* CONTINUOUS GRID PATTERN */}
      <div className="absolute inset-0 h-[80%] w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* BANNER HEADER SECTION WITH IMAGE BACKGROUND */}
        <div
          ref={titleRef}
          className={`group relative w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-16 transition-all duration-1000 border border-white/5 shadow-2xl ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
        >
          {/* Background Image */}
          <motion.img
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/images/Technical Arsenal.png"
            alt="Skills graphic"
            className="absolute inset-0 w-full h-full object-cover object-right mix-blend-screen opacity-60 md:opacity-100"
          />

          {/* Gradient Overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent z-10 transition-opacity duration-1000 group-hover:opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent md:hidden z-10" />

          {/* Heading Content */}
          <div className="relative z-20 px-6 sm:px-10 md:px-16 flex flex-col items-start h-[350px] md:h-[400px] justify-center transition-transform duration-1000 group-hover:translate-x-4">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <div className="h-px bg-primary w-12 transition-all duration-1000 group-hover:w-24" />
              <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm drop-shadow-md">Expertise</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground tracking-tighter leading-[0.9] max-w-2xl drop-shadow-2xl">
              Technical <br className="hidden sm:block" /> Arsenal.
            </h2>
            <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl transition-opacity duration-1000 opacity-90 group-hover:opacity-100 line-clamp-2 md:line-clamp-none">
              The tools and technologies I use to bring ideas to life.
            </p>
          </div>
        </div>

        <div
          ref={skillsRef}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-200 ${skillsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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