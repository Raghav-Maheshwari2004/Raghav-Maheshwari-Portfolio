"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Award, Calendar, Building } from "lucide-react"
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
      description:
        "Certificate of completion covering ethical considerations and responsible practices in generative artificial intelligence applications.",
      skills: ["AI Ethics", "Generative AI", "Responsible AI", "Machine Learning Ethics"],
      verifyUrl:
        "https://www.linkedin.com/learning/certificates/c2ef7be8a04504dd1768c9e313462b579e3a4779293658dcd336e613f45fb244?trk=share_certificate",
      logo: "/placeholder.svg?height=60&width=60",
    },
    {
      title: "Frontend Development Certificate",
      issuer: "Professional Certification",
      date: "2024",
      credentialId: "7955576",
      description:
        "Comprehensive frontend development certification covering modern web technologies, frameworks, and best practices.",
      skills: ["HTML5", "CSS3", "JavaScript", "React", "Responsive Design"],
      verifyUrl: "https://simpli-web.app.link/e/lOxseyc9hUb",
      logo: "/placeholder.svg?height=60&width=60",
    },
    {
      title: "IBM CEWXAI IIN Certificate",
      issuer: "IBM - VIT Partnership",
      date: "2024",
      credentialId: "-",
      description:
        "Specialized certification from IBM in collaboration with VIT, focusing on advanced AI and machine learning technologies.",
      skills: ["IBM Watson", "AI Development", "Machine Learning", "Cloud AI Services"],
      verifyUrl: "https://courses.vit.skillsnetwork.site/certificates/acc1dd66c20b446fad89863796bc7484",
      logo: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <section id="certifications" className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="h-8 w-8 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold">Certifications</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and achievements that validate my technical expertise and commitment to
            continuous learning.
          </p>
        </div>

        <div
          ref={certsRef}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-200 ${
            certsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {certifications.map((cert, index) => (
            <Card
              key={index}
              className={`professional-card hover:shadow-lg transition-all duration-300 hover:scale-105 group ${
                certsVisible ? "animate-fade-in-up" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <img
                      src={cert.logo || "/placeholder.svg"}
                      alt={`${cert.issuer} logo`}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg leading-tight mb-2">{cert.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Building className="h-4 w-4" />
                      <span className="font-medium text-primary">{cert.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{cert.description}</p>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Skills Covered:</h4>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="text-xs hover:scale-110 transition-transform"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-start justify-between mb-3 gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">Credential ID</p>
                        <p className="text-xs font-mono break-all overflow-wrap-anywhere">{cert.credentialId}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="group-hover:scale-105 transition-transform"
                      >
                        <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Verify
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-400 ${
            certsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">{certifications.length}</div>
            <div className="text-sm text-muted-foreground">Total Certifications</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">3</div>
            <div className="text-sm text-muted-foreground">Major Platforms</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2025</div>
            <div className="text-sm text-muted-foreground">Latest Certification</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Completion Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}
