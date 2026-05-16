"use client"

import { Lightbulb, AlertTriangle, Settings, TrendingUp } from "lucide-react"
import { useScrollAnimation } from "../hooks/use-scroll-animation"
import { Card } from "@/components/ui/card"

export function Innovations() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="innovations" className="py-32 bg-background relative overflow-hidden transition-colors duration-300">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/10 via-background to-background pointer-events-none dark:from-yellow-900/10 dark:via-slate-950 dark:to-slate-950" />

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-sm font-medium mb-6">
              <Lightbulb className="w-4 h-4" />
              <span>Innovation</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
              SAGE: <span className="text-yellow-500">Saliency-Adaptive Gradient Enhancement</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              Physics-Informed Computer Vision for Adverse Weather Recovery
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {["Python", "OpenCV", "NumPy", "YOLOv11"].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-secondary rounded-full text-sm font-medium text-foreground border border-border">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Problem & The Solution */}
            <div className="space-y-8">
              <Card className="p-8 bg-card/50 backdrop-blur border-red-500/20 hover:border-red-500/40 transition-colors shadow-lg">
                <div className="flex items-center gap-3 mb-4 text-red-500">
                  <AlertTriangle className="w-6 h-6" />
                  <h3 className="text-2xl font-bold">The Problem</h3>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-3">AI Blindness in Disaster Zones</h4>
                <p className="text-muted-foreground leading-relaxed">
                  In emergency search-and-rescue operations, drones are deployed to find victims during the critical "Golden Hour." However, standard object detection models suffer a catastrophic drop in accuracy when faced with real-world disaster conditions. Dense smoke, heavy fog, and smog scatter light and obscure the camera's view, rendering even the most advanced AI models effectively "blind" to stranded survivors and hazards.
                </p>
              </Card>

              <Card className="p-8 bg-card/50 backdrop-blur border-yellow-500/20 hover:border-yellow-500/40 transition-colors shadow-lg">
                <div className="flex items-center gap-3 mb-4 text-yellow-500">
                  <Lightbulb className="w-6 h-6" />
                  <h3 className="text-2xl font-bold">The Solution</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To solve this, I engineered SAGE (Saliency-Adaptive Gradient Enhancement) a lightweight, physics-informed image preprocessing algorithm. Rather than using computationally heavy, secondary neural networks that slow down the system, SAGE mathematically reconstructs degraded drone footage in real time before it is fed into the object detection engine.
                </p>
              </Card>
            </div>

            {/* How It Works & The Impact */}
            <div className="space-y-8">
              <Card className="p-8 bg-card/50 backdrop-blur border-blue-500/20 hover:border-blue-500/40 transition-colors shadow-lg">
                <div className="flex items-center gap-3 mb-4 text-blue-500">
                  <Settings className="w-6 h-6" />
                  <h3 className="text-2xl font-bold">How It Works</h3>
                </div>
                <p className="text-muted-foreground mb-4">SAGE acts as a reconstructive filter tailored for atmospheric chaos, executing three sequential mathematical phases per frame:</p>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-foreground">Texture Analysis (Laplacian Variance):</strong>
                      <span className="text-muted-foreground ml-2">Scans the pixel matrix to distinguish between "rough" regions (geometries, debris) and "smooth" regions (empty fog). This ensures edges are aggressively sharpened while preventing digital noise amplification.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-foreground">Spectral Shifting (Red-Channel Bias):</strong>
                      <span className="text-muted-foreground ml-2">Artificially amplifies longer red and infrared wavelengths, which inherently possess the physical capability to penetrate airborne particulate matter.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-foreground">Localized Contrast Equalization (CLAHE):</strong>
                      <span className="text-muted-foreground ml-2">Partitions the image into localized 8x8 grids, equalizing the contrast of each tile independently to uncover hidden shapes in dark shadows.</span>
                    </div>
                  </li>
                </ul>
              </Card>

              <Card className="p-8 bg-card/50 backdrop-blur border-green-500/20 hover:border-green-500/40 transition-colors shadow-lg">
                <div className="flex items-center gap-3 mb-4 text-green-500">
                  <TrendingUp className="w-6 h-6" />
                  <h3 className="text-2xl font-bold">The Impact & Results</h3>
                </div>
                <p className="text-muted-foreground mb-4">Successfully integrated as the primary preprocessing module for a YOLOv11 disaster response architecture.</p>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-foreground">Catastrophic Failure Prevented:</strong>
                      <span className="text-muted-foreground ml-2">Baseline YOLOv11 accuracy collapsed to an unusable 42.1% mAP in simulated dense smoke.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-foreground">Massive Recovery:</strong>
                      <span className="text-muted-foreground ml-2">SAGE recovered the model's accuracy back to a highly reliable 76.4% mAP.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-foreground">Edge-Ready Speed:</strong>
                      <span className="text-muted-foreground ml-2">Sustains real-time inference speeds of 30+ FPS via optimized math operations (OpenCV/NumPy), viable for live drone deployments.</span>
                    </div>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
