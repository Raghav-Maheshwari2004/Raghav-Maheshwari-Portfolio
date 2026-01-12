"use client"

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useState, useEffect, useMemo } from "react"
import { ArrowRight, Sparkles, Code, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

// --- 1. THE FRAGMENT ASSEMBLY ENGINE ---
const FragmentAssemblyOverlay = ({ 
    isFalling, 
    isRising, 
    onComplete 
}: { 
    isFalling: boolean; 
    isRising: boolean; 
    onComplete: () => void 
}) => {
    // Configuration: Grid Dimensions
    const rows = 10;
    const cols = 12;
    const totalPieces = rows * cols;

    // Generate grid pieces with random delays for organic movement
    const shards = useMemo(() => {
        return [...Array(totalPieces)].map((_, i) => ({
            id: i,
            // Random scatter for "Pile" effect
            randomRotate: (Math.random() - 0.5) * 90, 
            randomScale: 0.8 + Math.random() * 0.4,
            // Delays:
            // Fall: Random + slightly bottom-heavy?
            fallDelay: Math.random() * 0.3, 
            // Rise: Random delay so they don't all snap at once
            riseDelay: Math.random() * 0.6,
            // Random horizontal drift for more organic feel
            randomX: (Math.random() - 0.5) * 50
        }))
    }, [])

    return (
        <div className="fixed inset-0 z-[200] pointer-events-none flex flex-wrap overflow-hidden">
            {shards.map((shard, index) => (
                <motion.div
                    key={shard.id}
                    className="relative border-[0.5px] border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg" // Enhanced visual
                    style={{
                        width: `${100 / cols}%`,
                        height: `${100 / rows}%`,
                    }}
                    initial={{ opacity: 0, y: 0, scale: 1, rotate: 0 }}
                    animate={{ 
                        // ANIMATION LOGIC:
                        // 1. If Falling: Drop down off screen with rotation and scale
                        // 2. If Rising: Snap back to 0 (Grid position)
                        y: isFalling 
                           ? "140vh" 
                           : isRising 
                             ? "0vh" 
                             : "0vh", 
                        
                        // Rotation: Spin when falling, straighten when rising
                        rotate: isFalling ? shard.randomRotate : 0,
                        
                        // Scale: Shrink when falling, normal when rising
                        scale: isFalling ? shard.randomScale : 1,
                        
                        // Horizontal drift for more organic falling
                        x: isFalling ? shard.randomX : 0,

                        // Opacity: Visible only when active
                        opacity: (isFalling || isRising) ? 1 : 0
                    }}
                    transition={{ 
                        duration: isFalling ? 1.8 : 1.5,
                        // Fall = Accelerate (Gravity), Rise = Decelerate (Snap)
                        ease: isFalling ? "easeIn" : [0.25, 0.1, 0.25, 1], 
                        delay: isFalling ? shard.fallDelay : shard.riseDelay 
                    }}
                    // Cleanup: When the last piece finishes rising, trigger real page
                    onAnimationComplete={() => {
                        if (isRising && index === totalPieces - 1) {
                            setTimeout(onComplete, 150)
                        }
                    }}
                >
                    {/* Enhanced visual effects for rising pieces */}
                    {isRising && (
                        <>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 transition-opacity duration-1000" />
                            <div className="absolute inset-0 bg-white/5 animate-pulse" />
                        </>
                    )}
                    
                    {/* Subtle glow effect when falling */}
                    {isFalling && (
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5" />
                    )}
                </motion.div>
            ))}
        </div>
    )
}

// --- 2. MAIN INTRO COMPONENT ---
export default function IntroPage({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0)
  
  // Animation States
  const [status, setStatus] = useState<"IDLE" | "FALLING" | "RISING">("IDLE")

  useEffect(() => {
    // Intro Sequence (Text Fade In)
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 500))
      setStep(1) // Blur In Name
      await new Promise(r => setTimeout(r, 1200))
      setStep(2) // Subtitle
      await new Promise(r => setTimeout(r, 800))
      setStep(3) // Button
    }
    sequence()
  }, [])

  const handleEnter = async () => {
      // 1. Start Falling Phase
      setStatus("FALLING")

      // 2. Wait for pieces to drop (approx 1.2s + delays)
      await new Promise(r => setTimeout(r, 1500))

      // 3. Start Rising Phase (The Rebuild)
      setStatus("RISING")
      
      // Note: onFinish is called by the FragmentOverlay when it finishes rising
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center overflow-hidden">
      
      {/* 1. BACKGROUND LAYERS (Static Texture) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] z-0 pointer-events-none" />


      {/* 2. THE FRAGMENT SYSTEM (Always mounted, controlled by props) */}
      <FragmentAssemblyOverlay 
          isFalling={status === "FALLING"}
          isRising={status === "RISING"}
          onComplete={onFinish}
      />


      {/* 3. MAIN INTRO CONTENT */}
      {/* We wrap this in AnimatePresence so it can fade out when FALLING starts */}
      <AnimatePresence>
        {status === "IDLE" && (
            <motion.div 
                key="intro-content"
                className="relative z-10 flex flex-col items-center"
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)", transition: { duration: 0.8 } }}
            >
                {/* Name */}
                <div className="relative overflow-hidden mb-6 p-2">
                    <motion.h1 
                        initial={{ opacity: 0, filter: "blur(20px)", y: 20 }}
                        animate={{ 
                            opacity: step >= 1 ? 1 : 0, 
                            filter: step >= 1 ? "blur(0px)" : "blur(20px)",
                            y: step >= 1 ? 0 : 20
                        }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} 
                        className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-[0.2em] text-center"
                    >
                        RAGHAV MAHESHWARI
                    </motion.h1>
                </div>

                {/* Separator */}
                <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: step >= 2 ? "200px" : 0, opacity: step >= 2 ? 1 : 0 }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    className="h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent mb-6"
                />

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, letterSpacing: "0em" }}
                    animate={{ 
                        opacity: step >= 2 ? 1 : 0,
                        letterSpacing: step >= 2 ? "0.15em" : "0em" 
                    }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="flex items-center gap-3 text-slate-400/80 text-sm sm:text-base font-light uppercase"
                >
                    <span>Full-Stack Engineer</span>
                    <span className="w-1 h-1 bg-blue-500 rounded-full" /> 
                    <span>Problem Solver</span>
                </motion.div>

                {/* Enter Button */}
                <div className="mt-16 h-12">
                    <AnimatePresence>
                    {step >= 3 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Button
                                onClick={handleEnter} 
                                variant="ghost" 
                                className="group text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-500 font-light tracking-widest text-xs sm:text-sm"
                            >
                                <span className="flex items-center gap-2">
                                   ENTER EXPERIENCE
                                   <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </span>
                            </Button>
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}