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
  const meshRef = useRef<any>(null);
  const count = 20000;
  const speedMult = 1;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);
  const color = pColor; // Alias for user code compatibility
  
  const positions = useMemo(() => {
     const pos = [];
     for(let i=0; i<count; i++) pos.push(new THREE.Vector3((Math.random()-0.5)*100, (Math.random()-0.5)*100, (Math.random()-0.5)*100));
     return pos;
  }, []);

  // Material & Geom
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), []);
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.25), []);

  const PARAMS = useMemo(() => ({"scale":80,"chaos":1,"fold":1.57,"drift":0.3}), []);
  const addControl = (id: string, l: string, min: number, max: number, val: number) => {
      // @ts-ignore
      return PARAMS[id] !== undefined ? PARAMS[id] : val;
  };
  const setInfo = (title?: string, desc?: string) => {};
  const annotate = (id: string, pos: THREE.Vector3, label: string) => {};

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speedMult;
    const THREE_LIB = THREE;

    // @ts-ignore
    if(material.uniforms && material.uniforms.uTime) {
         // @ts-ignore
         material.uniforms.uTime.value = time;
    }

    for (let i = 0; i < count; i++) {
        // USER CODE START
        const scale = addControl("scale", "Universe Scale", 20, 200, 80);
        const chaos = addControl("chaos", "Quantum Chaos", 0, 3, 1.0);
        const fold = addControl("fold", "4D Fold Angle", 0, 6.28, 1.57);
        const drift = addControl("drift", "Cosmic Drift", 0, 2, 0.3);
        
        if (i === 0) {
          setInfo("Tesseract Observer", "The universe as seen from the 4th dimension. Time is the 4D axis folding 3D space into itself. Each particle is a quantum of spacetime.");
          annotate("singularity", new THREE.Vector3(0, 0, 0), "Origin");
          annotate("horizon", new THREE.Vector3(scale * 0.6, 0, 0), "Event Horizon");
        }
        
        const t = time * 0.18;
        const phi = (i / count) * 6.2831853;
        const theta = Math.acos(1 - 2 * ((i * 1.6180339887) % 1));
        
        // 4D hypercube basis: map particle index to 4D hyperspherical coords
        const layer = Math.floor(i / (count * 0.25));
        const localT = (i % (count * 0.25)) / (count * 0.25);
        const psi = localT * 6.2831853 + t;
        const xi = phi + t * 0.07 * (layer + 1);
        
        // 4D coordinates (w is time dimension)
        const r4 = scale * (0.3 + 0.7 * (i / count));
        const sinTh = Math.sin(theta);
        const cosTh = Math.cos(theta);
        const sinPhi = Math.sin(xi);
        const cosPhi = Math.cos(xi);
        const sinPsi = Math.sin(psi + fold);
        const cosPsi = Math.cos(psi + fold);
        
        // Raw 4D point on hypersphere
        let x4 = r4 * sinTh * cosPhi;
        let y4 = r4 * sinTh * sinPhi;
        let z4 = r4 * cosTh;
        let w4 = r4 * cosPsi * 0.9;
        
        // 4D->3D stereographic projection from w-axis viewpoint
        // Observer sits at w = viewW, projecting onto w=0 hyperplane
        const viewW = scale * (1.2 + 0.4 * Math.sin(t * 0.5));
        const wDenom = viewW - w4;
        const wSafe = wDenom + (Math.abs(wDenom) < 0.5 ? 0.5 : 0);
        const proj = viewW / wSafe;
        
        let px = x4 * proj;
        let py = y4 * proj;
        let pz = z4 * proj;
        
        // Quantum chaos field: interference pattern layered on projection
        const noiseFreq = 0.04 * chaos;
        const nx = Math.sin(px * noiseFreq + t * 1.3) * Math.cos(py * noiseFreq - t * 0.9);
        const ny = Math.sin(py * noiseFreq + t * 0.7) * Math.cos(pz * noiseFreq + t * 1.1);
        const nz = Math.sin(pz * noiseFreq - t * 1.5) * Math.cos(px * noiseFreq + t * 0.6);
        const noiseAmp = scale * 0.12 * chaos;
        
        px += nx * noiseAmp;
        py += ny * noiseAmp;
        pz += nz * noiseAmp;
        
        // Cosmic expansion drift: radial breathing of the universe
        const breathe = 1.0 + drift * 0.15 * Math.sin(t * 0.4 + (i / count) * 3.14159);
        px *= breathe;
        py *= breathe;
        pz *= breathe;
        
        // Clamp to finite safe range
        const maxCoord = 600;
        px = Math.max(-maxCoord, Math.min(maxCoord, px));
        py = Math.max(-maxCoord, Math.min(maxCoord, py));
        pz = Math.max(-maxCoord, Math.min(maxCoord, pz));
        
        target.set(px, py, pz);
        
        // Color: hue encodes 4D w-position (temporal dimension)
        // Saturation encodes distance from tesseract center
        // Lightness encodes quantum interference intensity
        const dist = Math.sqrt(px*px + py*py + pz*pz);
        const distNorm = Math.min(dist / (scale * 2.5), 1.0);
        const wNorm = (w4 / (r4 + 0.001)) * 0.5 + 0.5;
        
        // Hue: cycles through cosmic spectrum by 4D angle
        const hue = (wNorm * 0.72 + (i / count) * 0.28 + t * 0.04) % 1.0;
        // Saturation: higher near tesseract faces, lower at corners
        const sat = 0.55 + 0.45 * Math.abs(Math.sin(psi * 2.0 + t));
        // Lightness: bright at interference peaks, dim in voids
        const interference = 0.5 + 0.5 * Math.sin(distNorm * 9.42 - t * 1.8);
        const lit = 0.18 + 0.52 * interference * (1.0 - distNorm * 0.4);
        
        color.setHSL(hue, sat, lit);
        // USER CODE END

        positions[i].lerp(target, 0.1);
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