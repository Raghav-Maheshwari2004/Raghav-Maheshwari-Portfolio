"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ChevronDown, GraduationCap, Briefcase, Building2 } from "lucide-react"
import { useScrollAnimation } from "../hooks/use-scroll-animation"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Experience() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: experienceRef, isVisible: experienceVisible } = useScrollAnimation()
  const { ref: educationRef, isVisible: educationVisible } = useScrollAnimation()

  const [expandedEducation, setExpandedEducation] = useState<number | null>(null)

  const experiences = [
    {
      title: "Front-End Developer Intern",
      company: "Ant Creatives",
      location: "Remote, India",
      period: "May 2024 - Jul 2024",
      description:
        "Assisted in developing SuperSalesIQ, a Customer Relationship Management (CRM) system. Built responsive UI components and interactive user flows to manage clients, leads, and meetings efficiently. Supported API integration to fetch and display real-time data such as user info, client interactions, and dashboard metrics. Collaborated with the core development team to ensure seamless functionality and improve user experience.",
      technologies: ["React", "JavaScript", "API Integration", "CRM Development", "UI/UX Design"],
    },
    {
      title: "Software Developer Intern",
      company: "Peping",
      location: "Remote",
      period: "Jun 2023 - Jul 2023",
      description:
        "Worked on various projects, gaining hands-on experience in software development. Contributed to multiple development initiatives and enhanced technical skills through practical application.",
      technologies: ["Software Development", "Project Management", "Problem Solving"],
    },
  ]

  const education = [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Vellore Institute of Technology (VIT)",
      location: "Vellore, Tamil Nadu",
      period: "2022 - 2026",
      description:
        "Currently pursuing a B.Tech degree in Computer Science at VIT, Vellore, with a keen interest in Web Development and Artificial Intelligence.",
      status: "In Progress",
      additionalInfo: [
        {
          level: "12th Grade",
          year: "2022",
          description:
            "Completed 12th Grade in 2022, specializing in Physics, Chemistry, and Mathematics securing 82%.",
          percentage: "82%",
        },
        {
          level: "10th Grade",
          year: "2020",
          description: "Completed 10th Grade in 2020 with a focus on Mathematics and Science, achieving 88.88%.",
          percentage: "88.88%",
        },
      ],
    },
  ]

  return (
    <section id="experience" className="py-24 bg-background relative overflow-hidden">
      
      {/* Background Decor to match Projects section */}
      <div className="absolute top-0 left-0 -ml-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Experience & Education
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey and academic background in computer science and web development.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Experience Column */}
          <div
            ref={experienceRef}
            className={`transition-all duration-1000 delay-200 ${
              experienceVisible ? "opacity-100 -translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold">Professional Experience</h3>
            </div>

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card
                  key={index}
                  className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-primary/10 ${
                    experienceVisible ? "animate-fade-in-up" : ""
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{exp.title}</CardTitle>
                    <div className="text-primary font-semibold flex items-center gap-2">
                        <Building2 className="w-4 h-4"/> {exp.company}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge 
                            key={techIndex} 
                            variant="secondary" 
                            className="hover:scale-105 transition-transform bg-primary/5 hover:bg-primary/10 border-primary/10"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div
            ref={educationRef}
            className={`transition-all duration-1000 delay-400 ${
              educationVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold">Education</h3>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card
                  key={index}
                  className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-primary/10 ${
                    educationVisible ? "animate-fade-in-up" : ""
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{edu.degree}</CardTitle>
                    <div className="text-primary font-semibold">{edu.institution}</div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {edu.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {edu.location}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{edu.description}</p>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <Badge variant="outline" className="border-primary/20 text-primary">
                        {edu.status}
                      </Badge>
                      
                      {edu.additionalInfo && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedEducation(expandedEducation === index ? null : index)}
                          className="group hover:bg-primary/10 hover:text-primary transition-all duration-200"
                        >
                          <span className="text-sm font-medium mr-1">Previous Education</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ${
                              expandedEducation === index ? "rotate-180" : ""
                            }`}
                          />
                        </Button>
                      )}
                    </div>

                    {/* Expandable Additional Info */}
                    {edu.additionalInfo && expandedEducation === index && (
                      <div className="mt-4 pt-4 border-t border-border/50 space-y-3 animate-in slide-in-from-top-2 duration-300">
                        <h4 className="text-sm font-semibold text-primary mb-2">Academic History</h4>
                        {edu.additionalInfo.map((info, infoIndex) => (
                          <div
                            key={infoIndex}
                            className="bg-muted/30 rounded-lg p-3 hover:bg-muted/50 transition-colors duration-200 border border-border/50"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-primary" />
                                <span className="font-medium">{info.level}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-xs bg-background/50">
                                  {info.year}
                                </Badge>
                                <Badge variant="outline" className="text-xs font-semibold border-primary/20 text-primary">
                                  {info.percentage}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{info.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}