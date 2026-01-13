"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Award, Calendar, ShieldCheck, CheckCircle2 } from "lucide-react"
import { useScrollAnimation } from "../hooks/use-scroll-animation"

export function Certifications() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: certsRef, isVisible: certsVisible } = useScrollAnimation()

  const certifications = [
    {
      title: "Ethics in the Age of Generative AI",
      issuer: "IBM",
      date: "2024",
      credentialId: "cfbdb8bde029d727d13daab6030dfe10d9772a579a7e6ee2aa93af125e1d8c4b",
      description: "Mastered ethical frameworks for AI deployment, focusing on bias mitigation and responsible scaling.",
      skills: ["AI Ethics", "Generative AI", "Responsible AI"],
      verifyUrl: "https://www.linkedin.com/learning/certificates/c2ef7be8a04504dd1768c9e313462b579e3a4779293658dcd336e613f45fb244?trk=share_certificate",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Frontend Development Certificate",
      issuer: "Professional Certification",
      date: "2024",
      credentialId: "7955576",
      description: "Advanced proficiency in building responsive, accessible, and performant web applications.",
      skills: ["HTML5", "CSS3", "React", "System Design"],
      verifyUrl: "https://simpli-web.app.link/e/lOxseyc9hUb",
      color: "from-emerald-500 to-green-500"
    },
    {
      title: "IBM CEWXAI IIN Certificate",
      issuer: "IBM - VIT Partnership",
      date: "2024",
      credentialId: "-",
      description: "Specialized training in enterprise AI solutions, cloud-native architecture, and machine learning pipelines.",
      skills: ["IBM Watson", "Cloud AI", "ML Ops"],
      verifyUrl: "https://courses.vit.skillsnetwork.site/certificates/acc1dd66c20b446fad89863796bc7484",
      color: "from-indigo-500 to-purple-500"
    },
  ]

  return (
    <section id="certifications" className="py-24 bg-background relative overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,transparent_25%,#000_25%,#000_50%,transparent_50%,transparent_75%,#000_75%,#000_100%)] bg-[size:24px_24px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-amber-500/10 rounded-full border border-amber-500/20">
              <Award className="h-6 w-6 text-amber-500" />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Technical <span className="text-amber-500">Certifications</span></h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Industry-recognized credentials validating expertise in modern engineering standards.
          </p>
        </div>

        <div
          ref={certsRef}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-200 ${certsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {certifications.map((cert, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group`}
            >
              {/* Premium Top Border Gradient */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cert.color}`} />

              <CardHeader className="pt-8 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 rounded-lg bg-secondary/50 border border-border">
                    <ShieldCheck className="w-6 h-6 text-foreground/80" />
                  </div>
                  <Badge variant="outline" className="border-border/50 bg-background/50 font-mono text-xs">
                    {cert.date}
                  </Badge>
                </div>

                <CardTitle className="text-xl font-bold leading-tight group-hover:text-amber-500 transition-colors">
                  {cert.title}
                </CardTitle>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <span className="font-semibold text-foreground/80">{cert.issuer}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {cert.description}
                </p>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary/50 border border-border/50 text-secondary-foreground/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border/30 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Credential ID</span>
                      <span className="text-xs font-mono text-foreground/70 truncate max-w-[120px]">{cert.credentialId}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-2 text-xs font-medium hover:bg-amber-500/10 hover:text-amber-600 transition-colors"
                      asChild
                    >
                      <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                        Verify <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
