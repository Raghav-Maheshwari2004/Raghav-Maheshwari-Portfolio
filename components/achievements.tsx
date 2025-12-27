"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Award, Calendar } from "lucide-react"
import { useScrollAnimation } from "../hooks/use-scroll-animation"

export function Achievements() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: achievementsRef, isVisible: achievementsVisible } = useScrollAnimation()

  const achievements = [
    {
      title: "Editor and Chapter Contributor",
      organization: "VIT Vellore",
      date: "November 2023",
      description:
        "Coordinated, contributed and worked as an editor of a book 'Multidisciplinary Insights: Traversing Through the Landscape of Data and Its Attributes' under the guidance of Dr. M. Thenmozhi, Assistant Director (TLCE), VIT-Vellore.",
      chapter: "Impact of Artificial Intelligence on the Future Jobs",
      isbn: "978-93-92995-56-9",
      type: "Publication",
      skills: ["Technical Writing", "Research", "AI Analysis", "Editorial Work"],
    },
  ]

  return (
    <section id="achievements" className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="h-8 w-8 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold">Achievements & Publications</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recognition and contributions to the academic and professional community through research and publications.
          </p>
        </div>

        <div
          ref={achievementsRef}
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
            achievementsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              className={`professional-card hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                achievementsVisible ? "animate-fade-in-up" : ""
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-xl leading-tight">{achievement.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {achievement.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="font-medium text-primary">{achievement.organization}</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{achievement.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>

                <div className="bg-primary/10 rounded-lg p-4 space-y-3">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Published Chapter:</h4>
                    <p className="text-sm font-medium">"{achievement.chapter}"</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground">ISBN: </span>
                      <span className="text-sm font-mono">{achievement.isbn}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Skills Demonstrated:</h4>
                  <div className="flex flex-wrap gap-2">
                    {achievement.skills.map((skill, skillIndex) => (
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
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-400 ${
            achievementsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">1</div>
            <div className="text-sm text-muted-foreground">Published Book</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">1</div>
            <div className="text-sm text-muted-foreground">Chapter Authored</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2023</div>
            <div className="text-sm text-muted-foreground">Publication Year</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">AI</div>
            <div className="text-sm text-muted-foreground">Research Focus</div>
          </div>
        </div>
      </div>
    </section>
  )
}
