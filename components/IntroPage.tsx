"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useMemo } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// --- 1. PUZZLE SHAPE GENERATOR ---
const generatePuzzlePath = (row: number, col: number, width: number, height: number) => {
    const seed = (r: number, c: number, side: string) => Math.sin(r * 99 + c * 13 + (side === "v" ? 1 : 0)) > 0 ? 1 : -1
    const tabSize = Math.min(width, height) * 0.20; 

    const top = row === 0 ? 0 : -seed(row, col, "h");
    const right = col === 11 ? 0 : seed(row, col + 1, "v");
    const bottom = row === 9 ? 0 : seed(row + 1, col, "h");
    const left = col === 0 ? 0 : -seed(row, col, "v");

    let path = `M 0 0`;
    if (top !== 0) path += ` L ${width * 0.4} 0 C ${width * 0.4} ${top * tabSize} ${width * 0.6} ${top * tabSize} ${width * 0.6} 0`;
    path += ` L ${width} 0`;
    
    if (right !== 0) path += ` L ${width} ${height * 0.4} C ${width + right * tabSize} ${height * 0.4} ${width + right * tabSize} ${height * 0.6} ${width} ${height * 0.6}`;
    path += ` L ${width} ${height}`;

    if (bottom !== 0) path += ` L ${width * 0.6} ${height} C ${width * 0.6} ${height + bottom * tabSize} ${width * 0.4} ${height + bottom * tabSize} ${width * 0.4} ${height}`;
    path += ` L 0 ${height}`;

    if (left !== 0) path += ` L 0 ${height * 0.6} C ${left * tabSize} ${height * 0.6} ${left * tabSize} ${height * 0.4} 0 ${height * 0.4}`;
    path += ` Z`;
    
    return path;
}

// --- 2. SINGLE PUZZLE PIECE ---
const PuzzlePiece = ({ 
    data, 
    status, 
    onComplete 
}: { 
    data: any, 
    status: "IDLE" | "FALLING" | "RISING" | "ASSEMBLED",
    onComplete?: () => void 
}) => {
    const w = 100; 
    const h = 100;
    const pathData = useMemo(() => generatePuzzlePath(data.row, data.col, w, h), [data.row, data.col]);

    const isFalling = status === "FALLING";
    const isRising = status === "RISING";
    const isAssembled = status === "ASSEMBLED";

    return (
        <motion.div
            className="absolute z-20"
            style={{
                width: `${100 / 12}%`,
                height: `${100 / 10}%`,
                left: `${(data.col / 12) * 100}%`,
                top: `${(data.row / 10) * 100}%`,
                zIndex: isFalling || isRising ? 50 : 10 
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                y: isFalling ? "120vh" : "0vh",
                rotate: isFalling ? data.randomRotate : 0,
                rotateX: isFalling ? data.randomRotate * 2 : 0,
                scale: isFalling ? 0.8 : (isRising || isAssembled) ? 1.05 : 0.5, 
                opacity: (isFalling || isRising || isAssembled) ? 1 : 0
            }}
            transition={{
                duration: isFalling ? 1.2 : 0.8,
                ease: isFalling ? "easeIn" : "backOut",
                delay: isFalling ? data.fallDelay : data.riseDelay
            }}
            onAnimationComplete={onComplete}
        >
            <svg viewBox={`-20 -20 ${w + 40} ${h + 40}`} className="w-[140%] h-[140%] -ml-[20%] -mt-[20%] overflow-visible drop-shadow-2xl">
                {/* THEME LOGIC:
                    - Class `fill-slate-100`: Light mode color (Light Gray)
                    - Class `dark:fill-[#1e293b]`: Dark mode color (Slate Blue)
                    - Class `stroke-blue-500/30`: Subtle blue border for both
                */}
                <path 
                    d={pathData} 
                    className="fill-slate-100 dark:fill-[#1e293b] stroke-blue-500/50 dark:stroke-blue-400/50 transition-colors duration-500"
                    strokeWidth="1.5"
                />
                
                {/* Texture/Highlight Layer */}
                <path 
                    d={pathData} 
                    fill="currentColor" 
                    fillOpacity="0.1"
                    className="text-black dark:text-white mix-blend-overlay pointer-events-none"
                />
            </svg>
        </motion.div>
    )
}

// --- 3. FRAGMENT ENGINE ---
const FragmentAssemblyOverlay = ({ 
    status,
    onComplete 
}: { 
    status: "IDLE" | "FALLING" | "RISING" | "ASSEMBLED";
    onComplete: () => void 
}) => {
    const rows = 10;
    const cols = 12;
    const totalPieces = rows * cols;

    const shards = useMemo(() => {
        return [...Array(totalPieces)].map((_, i) => ({
            id: i,
            row: Math.floor(i / cols),
            col: i % cols,
            randomRotate: (Math.random() - 0.5) * 90, 
            fallDelay: Math.random() * 0.3,
            riseDelay: Math.random() * 0.8 
        }))
    }, [])

    return (
        <div className="fixed inset-0 z-[200] pointer-events-none">
            {shards.map((shard, index) => (
                <PuzzlePiece 
                    key={shard.id}
                    data={shard}
                    status={status}
                    onComplete={() => {
                        if (status === "RISING" && index === totalPieces - 1) {
                            setTimeout(onComplete, 100) 
                        }
                    }}
                />
            ))}
        </div>
    )
}

// --- 4. MAIN INTRO COMPONENT ---
export default function IntroPage({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState<"IDLE" | "FALLING" | "RISING" | "ASSEMBLED">("IDLE")

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 500))
      setStep(1)
      await new Promise(r => setTimeout(r, 1200))
      setStep(2)
      await new Promise(r => setTimeout(r, 800))
      setStep(3)
    }
    sequence()
  }, [])

  const handleEnter = async () => {
      setStatus("FALLING")
      await new Promise(r => setTimeout(r, 1600))
      setStatus("RISING")
  }

  const handleAssemblyComplete = () => {
      setStatus("ASSEMBLED") 
      onFinish() 
  }

  return (
    <motion.div
      // 1. Theme-Aware Background: White in Light Mode, Midnight Blue in Dark Mode
      className="fixed inset-0 z-[100] bg-white dark:bg-[#020617] flex flex-col items-center justify-center overflow-hidden transition-colors duration-500"
      exit={{ opacity: 0 }} 
      transition={{ duration: 2.5, ease: "easeInOut" }}
    >
      {/* Background Texture (Inverted for visibility in light mode) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-multiply dark:mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      
      <FragmentAssemblyOverlay 
          status={status}
          onComplete={handleAssemblyComplete}
      />

      <AnimatePresence>
        {status === "IDLE" && (
            <motion.div 
                key="intro-content"
                className="relative z-10 flex flex-col items-center"
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)", transition: { duration: 0.8 } }}
            >
                {/* NAME: Dark Text in Light Mode, White in Dark Mode */}
                <div className="relative overflow-hidden mb-6 p-2">
                    <motion.h1 
                        initial={{ opacity: 0, filter: "blur(20px)", y: 20 }}
                        animate={{ 
                            opacity: step >= 1 ? 1 : 0, 
                            filter: step >= 1 ? "blur(0px)" : "blur(20px)",
                            y: step >= 1 ? 0 : 20
                        }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} 
                        className="text-4xl sm:text-6xl md:text-7xl font-light text-slate-900 dark:text-white tracking-[0.2em] text-center transition-colors duration-500"
                    >
                        RAGHAV MAHESHWARI
                    </motion.h1>
                </div>

                <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: step >= 2 ? "200px" : 0, opacity: step >= 2 ? 1 : 0 }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    className="h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mb-6"
                />

                <motion.div
                    initial={{ opacity: 0, letterSpacing: "0em" }}
                    animate={{ opacity: step >= 2 ? 1 : 0, letterSpacing: step >= 2 ? "0.15em" : "0em" }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm sm:text-base font-light uppercase transition-colors duration-500"
                >
                    <span>Full-Stack Engineer</span>
                    <span className="w-1 h-1 bg-blue-500 rounded-full" /> 
                    <span>Problem Solver</span>
                </motion.div>

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
                                className="group text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500 font-light tracking-widest text-xs sm:text-sm"
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
    </motion.div>
  )
}