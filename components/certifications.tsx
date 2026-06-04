"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Award, Calendar, ShieldCheck, CheckCircle2 } from "lucide-react"
import { useScrollAnimation } from "../hooks/use-scroll-animation"
import { motion } from "framer-motion"

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
      title: "Machine Learning with Python",
      issuer: "IBM",
      date: "2026",
      credentialId: "f25a59e8801e49989ee5720bb39de52b",
      description: "Gained hands-on experience in building and deploying machine learning models using Python and scikit-learn",
      skills: ["Python", "Scikit-learn", "Machine Learning"],
      verifyUrl: "https://courses.cognitiveclass.ai/certificates/f25a59e8801e49989ee5720bb39de52b",
      color: "from-red-500 to-yellow-500"
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
            src="/images/Technical Certifications.png"
            alt="Certifications graphic"
            className="absolute inset-0 w-full h-full object-cover object-right mix-blend-screen opacity-60 md:opacity-100"
          />

          {/* Gradient Overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent z-10 transition-opacity duration-1000 group-hover:opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent md:hidden z-10" />

          {/* Heading Content */}
          <div className="relative z-20 px-6 sm:px-10 md:px-16 flex flex-col items-start h-[350px] md:h-[400px] justify-center transition-transform duration-1000 group-hover:translate-x-4">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <div className="h-px bg-primary w-12 transition-all duration-1000 group-hover:w-24" />
              <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm drop-shadow-md">Credentials</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground tracking-tighter leading-[0.9] max-w-2xl drop-shadow-2xl">
              Technical <br className="hidden sm:block" /> Certifications.
            </h2>
            <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl transition-opacity duration-1000 opacity-90 group-hover:opacity-100 line-clamp-2 md:line-clamp-none">
              Industry-recognized credentials validating expertise in modern engineering standards.
            </p>
          </div>
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
