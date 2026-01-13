"use client"

import React, { useRef, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as random from "maath/random"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// --- 1. THE 3D STAR FIELD COMPONENT ---
function Stars(props: any) {
    const ref = useRef<any>()

    // Generate 5000 random points in a sphere
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))

    useFrame((state, delta) => {
        if (!ref.current) return

        // Rotate the stars slowly
        ref.current.rotation.x -= delta / 10
        ref.current.rotation.y -= delta / 15

        // "Warp Speed" Effect check
        // If we are in "warping" state (passed down via props usually, but here we just do subtle move)
        // For the actual warp, we will animate the Camera or the Scale in the parent.
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    )
}

// --- 2. MAIN INTRO COMPONENT ---
export default function IntroPage({ onFinish }: { onFinish: () => void }) {
    const [warping, setWarping] = useState(false)
    const [opacity, setOpacity] = useState(1)

    const handleEnter = () => {
        setWarping(true)
        // 1. Trigger Warp Animation (handled by state in Canvas or simple CSS transition for visual punch)

        // 2. Wait for visual effect then finish
        setTimeout(() => {
            setOpacity(0) // Fade out
            setTimeout(onFinish, 500) // Unmount
        }, 1500)
    }

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black"
            animate={{ opacity: opacity }}
            transition={{ duration: 0.5 }}
        >
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    {/* The Stars */}
                    <Stars />

                    {/* Fly Controls or just simple Camera movement could go here if needed */}
                </Canvas>
            </div>

            {/* UI Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full pointer-events-none">

                {/* Animated Text Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: warping ? 0 : 1, scale: warping ? 1.5 : 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-7xl font-bold text-white tracking-widest mb-4 mix-blend-difference">
                        RAGHAV MAHESHWARI
                    </h1>
                    <p className="text-blue-200/80 text-lg tracking-[0.3em] uppercase mb-12">
                        Full-Stack Engineer
                    </p>
                </motion.div>

                {/* Enter Button (Interactive) */}
                {!warping && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="pointer-events-auto"
                    >
                        <Button
                            onClick={handleEnter}
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/10 hover:text-white px-8 py-6 text-lg tracking-widest backdrop-blur-md transition-all duration-300 group"
                        >
                            EXPLORE
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>
                )}
            </div>

            {/* Warp Speed Overlay Effect (CSS Radial) */}
            <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${warping ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, black 100%)',
                    boxShadow: 'inset 0 0 100px 50px black'
                }}
            />
        </motion.div>
    )
}