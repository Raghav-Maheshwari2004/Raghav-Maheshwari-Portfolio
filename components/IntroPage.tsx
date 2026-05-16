"use client"

import React, { useRef, useState, useMemo, useEffect } from "react"
import { Canvas, useFrame, extend } from "@react-three/fiber"
import { OrbitControls, Effects } from "@react-three/drei"
import { UnrealBloomPass } from "three-stdlib"
import * as THREE from "three"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

extend({ UnrealBloomPass })

const ParticleSwarm = () => {
    const meshRef = useRef<any>();
    const count = 20000;
    const speedMult = 0.1;
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const target = useMemo(() => new THREE.Vector3(), []);
    const pColor = useMemo(() => new THREE.Color(), []);
    const color = pColor; // Alias for user code compatibility

    const positions = useMemo(() => {
        const pos = [];
        for (let i = 0; i < count; i++) pos.push(new THREE.Vector3((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100));
        return pos;
    }, []);

    // Material & Geom
    const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), []);
    const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.25), []);

    const PARAMS = useMemo(() => ({ "scale": 110, "activity": 2.5, "separation": 5, "complexity": 8 }), []);
    const addControl = (id: string, l: string, min: number, max: number, val: number) => {
        // @ts-ignore
        return PARAMS[id] !== undefined ? PARAMS[id] : val;
    };
    const setInfo = (title?: string, desc?: string) => { };
    const annotate = (id: string, pos: THREE.Vector3, label: string) => { };

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime() * speedMult;
        const THREE_LIB = THREE;

        // @ts-ignore
        if (material.uniforms && material.uniforms.uTime) {
            // @ts-ignore
            material.uniforms.uTime.value = time;
        }

        for (let i = 0; i < count; i++) {
            // USER CODE START
            const scale = addControl("scale", "Brain Scale", 10, 100, 45);
            const activity = addControl("activity", "Synaptic Activity", 0.1, 10, 2.5);
            const separation = addControl("separation", "Hemisphere Gap", 0, 20, 5);
            const complexity = addControl("complexity", "Neural Folding", 1, 15, 8);

            if (i === 0) {
                setInfo("Neural Network", "Visualizing millions of synaptic connections and action potentials.");
                annotate("cortex", new THREE.Vector3(0, scale + 15, 0), "Cerebral Cortex Activity");
            }

            const p = i / count;
            const goldenRatio = 1.61803398875;
            const cosVal = Math.max(-1.0, Math.min(1.0, 1.0 - 2.0 * p));
            const theta = Math.acos(cosVal);
            const phi = 2.0 * Math.PI * i / goldenRatio;

            const fold = 0.75 + 0.25 * Math.sin(theta * complexity) * Math.cos(phi * complexity + time * 0.2);
            const radius = scale * fold;

            let x = radius * Math.sin(theta) * Math.cos(phi);
            let y = radius * Math.sin(theta) * Math.sin(phi);
            let z = radius * Math.cos(theta);

            x += (x >= 0 ? 1 : -1) * separation;

            const isTract = (i % 60 === 0) ? 1.0 : 0.0;
            x *= (1.0 - 0.85 * isTract);
            y *= (1.0 - 0.20 * isTract);
            z *= (1.0 - 0.50 * isTract);

            const neuronOffset = Math.sin(i * 12.9898 + i * 78.233) * 43758.5453;
            const firingPhase = neuronOffset + time * activity;
            const spike = Math.pow(Math.max(0.0, Math.sin(firingPhase)), 40);

            const wave = (Math.sin(y * 0.1 - time * 1.5) + 1.0) * 0.5;

            const jiggle = 0.3 * (1.0 - isTract);
            const jX = Math.sin(time * 5.0 + i) * jiggle;
            const jY = Math.cos(time * 6.2 + i * 2.0) * jiggle;
            const jZ = Math.sin(time * 4.1 - i) * jiggle;

            target.set(x + jX, y + jY, z + jZ);

            const baseHue = 0.65 + p * 0.15;
            const currentHue = baseHue - spike * 0.15 - isTract * 0.1;
            const saturation = 0.7 + wave * 0.3;
            const lightness = Math.max(0.0, Math.min(1.0, (isTract * 0.1) + 0.15 + (wave * 0.15) + (spike * 0.7)));

            color.setHSL(currentHue, saturation, lightness);
            // USER CODE END

            positions[i].lerp(target, 0.02);
            dummy.position.copy(positions[i]);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
            meshRef.current.setColorAt(i, pColor);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[geometry, material, count]} />
    );
};

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
                <Canvas camera={{ position: [0, 0, 100], fov: 60 }}>
                    <fog attach="fog" args={['#000000', 0.01]} />
                    <ParticleSwarm />
                    <OrbitControls autoRotate={true} />
                    <Effects disableGamma>
                        {/* @ts-ignore */}
                        <unrealBloomPass threshold={0} strength={1.8} radius={0.4} />
                    </Effects>
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
                        Full-Stack & AI/ML Engineer
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