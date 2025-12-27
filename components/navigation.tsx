"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X, Download } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#achievements", label: "Achievements" },
    { href: "#contact", label: "Contact" },
  ]

  if (!mounted) return null

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${
          scrolled ? "pt-4" : "pt-0"
        }`}
      >
        <div
          className={`
            relative flex items-center justify-between px-6 transition-all duration-500 ease-in-out
            ${
              scrolled
                ? "w-[90%] md:w-[85%] lg:w-[75%] h-14 rounded-full bg-background/70 backdrop-blur-xl border border-white/10 shadow-[0px_10px_30px_-10px_rgba(0,0,0,0.2)]"
                : "w-full h-16 bg-background/0 backdrop-blur-none border-transparent"
            }
          `}
        >
          {/* Logo */}
          <div className="flex-shrink-0 z-20">
             <a href="#home" className="text-lg font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                Raghav.dev
             </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium transition-colors"
                onMouseEnter={() => setHoveredPath(item.href)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                {hoveredPath === item.href && (
                  <motion.div
                    layoutId="navbar-hover"
                    className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className={hoveredPath === item.href ? "text-primary" : "text-muted-foreground"}>
                  {item.label}
                </span>
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3 z-20">
             <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="rounded-full hover:bg-primary/10"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Button asChild size="sm" className="rounded-full px-5 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 transition-all hover:scale-105">
              <a
                href="https://drive.google.com/file/d/1bVntMEC01NiQeyCR1vMYrbjkbUwSiddI/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume <Download className="ml-2 h-3 w-3" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-4">
             <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="rounded-full"
            >
                {resolvedTheme === "dark" ? <Moon className="h-5 w-5"/> : <Sun className="h-5 w-5"/>}
            </Button>

            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(!isOpen)} 
                className="rounded-full"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden pt-24 px-6"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item, i) => (
                 <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-semibold text-muted-foreground hover:text-primary transition-colors py-2 border-b border-white/5"
                >
                  {item.label}
                </motion.a>
              ))}
              
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 }}
                 className="pt-6"
              >
                <Button asChild className="w-full text-lg h-12 rounded-full">
                    <a
                        href="https://drive.google.com/file/d/1bVntMEC01NiQeyCR1vMYrbjkbUwSiddI/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Download Resume
                    </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}