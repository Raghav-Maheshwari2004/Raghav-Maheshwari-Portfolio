"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Github, Linkedin, Send, ExternalLink } from "lucide-react"
import { useState } from "react"
import { useScrollAnimation } from "../hooks/use-scroll-animation"

export function Contact() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation()
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation()

  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const handleGmailCompose = (e: React.FormEvent) => {
    e.preventDefault()
    window.open("https://mail.google.com/mail/u/0/#inbox", "_blank")
  }

  const handleDefaultEmail = (e: React.FormEvent) => {
    e.preventDefault()
    // Add logic here
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      
      {/* GRID FOOTER: This closes the website design loop */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_top,black,transparent)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
             <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Get In Touch</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Open for opportunities and interesting projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div
            ref={formRef}
            className={`transition-all duration-1000 ${
              formVisible ? "opacity-100 -translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 w-full bg-card/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
                  <Send className="h-5 w-5" /> Contact Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                  <Input name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                  <Textarea name="message" placeholder="Your Message" rows={4} value={formData.message} onChange={handleChange} required />
                  
                  <div className="space-y-3 pt-2">
                    <Button type="button" onClick={handleGmailCompose} className="w-full bg-red-600 hover:bg-red-700">
                      <Mail className="h-4 w-4 mr-2" /> Open in Gmail
                    </Button>
                    <Button type="button" onClick={handleDefaultEmail} variant="outline" className="w-full">
                      <Send className="h-4 w-4 mr-2" /> Use Default App
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Info Side */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-200 ${
              infoVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            ref={infoRef}
          >
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <CardTitle className="text-xl">Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform">
                    <a href="https://github.com/Raghav-Maheshwari2004" target="_blank"><Github className="h-5 w-5" /></a>
                  </Button>
                  <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform">
                    <a href="https://www.linkedin.com/in/raghav-maheshwari-803012275/" target="_blank"><Linkedin className="h-5 w-5" /></a>
                  </Button>
                  <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform">
                    <a href="mailto:maheshwari.raghav2004@gmail.com"><Mail className="h-5 w-5" /></a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm border-primary/10">
               <CardHeader><CardTitle className="text-xl">Contact Details</CardTitle></CardHeader>
               <CardContent className="space-y-3">
                  <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary"/> maheshwari.raghav2004@gmail.com</div>
                  <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary"/> +91-7878194586</div>
                  <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary"/> India</div>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-border/50 text-center text-muted-foreground relative z-10">
        <p>&copy; 2024 Raghav Maheshwari. All rights reserved.</p>
      </div>
    </section>
  )
}