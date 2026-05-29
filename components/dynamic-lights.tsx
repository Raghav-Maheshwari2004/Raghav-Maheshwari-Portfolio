"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const SECTION_COLORS = [
  { id: "home", color: "rgba(59, 130, 246, 0.6)" }, // Blue
  { id: "innovations", color: "rgba(234, 179, 8, 0.7)" }, // Yellow
  { id: "skills", color: "rgba(34, 197, 94, 0.6)" }, // Green
  { id: "projects", color: "rgba(168, 85, 247, 0.6)" }, // Purple
  { id: "experience", color: "rgba(99, 102, 241, 0.6)" }, // Indigo
  { id: "achievements", color: "rgba(236, 72, 153, 0.6)" }, // Pink
  { id: "certifications", color: "rgba(14, 165, 233, 0.6)" }, // Sky
  { id: "contact", color: "rgba(239, 68, 68, 0.6)" }, // Red
];

interface DynamicLightsProps {
  top: string;
  bottom: string;
  left: string;
  right: string;
}

export default function DynamicLights({ top, bottom, left, right }: DynamicLightsProps) {
  const [activeColor, setActiveColor] = useState(SECTION_COLORS[0].color);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let observer: IntersectionObserver;

    const initObserver = () => {
      const scrollContainer = document.getElementById("desktop-scroll");
      if (!scrollContainer) return false;

      // Check if at least the home section exists (it might be delayed by Intro animation)
      const homeSection = document.getElementById("home");
      if (!homeSection) return false;

      observer = new IntersectionObserver(
        (entries) => {
          let maxIntersectionRatio = 0;
          let mostVisibleId = null;

          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > maxIntersectionRatio) {
              maxIntersectionRatio = entry.intersectionRatio;
              mostVisibleId = entry.target.id;
            }
          });

          if (mostVisibleId) {
            const section = SECTION_COLORS.find((s) => s.id === mostVisibleId);
            if (section) {
              setActiveColor(section.color);
            }
          }
        },
        {
          root: scrollContainer, 
          threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
          rootMargin: "-20% 0px -20% 0px"
        }
      );

      SECTION_COLORS.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.observe(el);
      });

      return true;
    };

    // Try immediately
    let success = initObserver();

    // If sections aren't in the DOM yet, poll every 500ms until they are
    const interval = !success 
      ? setInterval(() => {
          success = initObserver();
          if (success) clearInterval(interval);
        }, 500)
      : null;

    return () => {
      if (observer) observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [mounted]);

  // Don't render anything until theme is resolved to avoid hydration mismatch flashes
  if (!mounted) return null;

  const isDarkMode = resolvedTheme === "dark";

  return (
    <div
      className="absolute z-0 pointer-events-none rounded-2xl"
      style={{
        // Make the glow source slightly larger than the screen so it spills out behind the TV
        top: `calc(${top} - 2%)`,
        bottom: `calc(${bottom} - 2%)`,
        left: `calc(${left} - 1.5%)`,
        right: `calc(${right} - 1.5%)`,
        
        // Heavy blur to create the ambient light effect on the wall behind the TV
        filter: "blur(70px)",
        
        // Dynamic background color that transitions smoothly
        backgroundColor: activeColor,
        
        // Transition settings for a very smooth color crossfade
        transition: "background-color 1.5s ease-in-out, opacity 1s ease-in-out",
        
        // Only show vibrant colors in dark mode.
        opacity: isDarkMode ? 0.9 : 0
      }}
    />
  );
}
