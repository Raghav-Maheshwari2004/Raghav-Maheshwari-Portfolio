"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import DynamicLights from "./dynamic-lights";
import { useTvMode } from "./tv-mode-provider";

export default function TVWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const { isTvMode } = useTvMode();

  // Wait until mounted to avoid hydration mismatch with next-themes
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && resolvedTheme === "dark";

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* 
        If TV mode is off, show the normal website on all screens.
        If TV mode is on, show normal website on mobile (< lg), and TV wrapper on desktop.
      */}

      {/* Normal Website View */}
      <div id="mobile-scroll" className={`${isTvMode ? 'block lg:hidden' : 'block'} w-full h-full overflow-y-auto bg-background text-foreground`}>
        {children}
      </div>

      {/* Desktop View (TV Wrapper) */}
      {isTvMode && (
        <div
          className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          style={{
            // The exact aspect ratio of LightMode.png and DarkMode.png (2752 / 1536)
            aspectRatio: "2752 / 1536",
            // We use 150vw/150vh to make the TV physically larger than the screen.
            // This gives the website inside a much larger pixel width (desktop size),
            // fixing the horizontal scrollbar and squished elements.
            width: "150vw",
            height: "150vh",
            maxWidth: "calc(150vh * (2752 / 1536))",
            maxHeight: "calc(150vw * (1536 / 2752))",
          }}
        >

          {/* TV Background Images for Smooth Crossfade */}
          <div className="absolute inset-0 w-full h-full">
            {/* Light Mode Image (Base Layer) */}
            <Image
              src="/images/LightMode.png"
              alt="TV Background Light"
              fill
              priority
              className="object-cover"
            />

            {/* Dark Mode Image (Top Layer that fades in/out) */}
            <Image
              src="/images/DarkMode.png"
              alt="TV Background Dark"
              fill
              priority
              className={`object-cover transition-opacity duration-700 ease-in-out ${isDarkMode ? "opacity-100" : "opacity-0"
                }`}
            />
          </div>

          {/* Dynamic Ambilight Effect (behind the screen) */}
          {!isDarkMode && (
            <DynamicLights
              top="0.5%"
              bottom="16%"
              left="5.5%"
              right="16.9%"
            />
          )}

          {/* The actual "Screen" portion of the TV */}
          {/* These percentages dictate where the website renders inside the TV image. */}
          {/* I've adjusted them based on your screenshot, but you can fine-tune them! */}
          <div
            className="absolute z-10 overflow-hidden bg-background text-foreground transition-colors duration-300"
            style={{
              /* Adjust these values to perfectly fit the screen in your image */
              top: "17.5%",         // Distance from top of image
              bottom: "31.5%",   // Distance from bottom of image
              left: "25.7%",      // Distance from left of image
              right: "25%",     // Distance from right of image
              // Adding a subtle glow effect to the screen in dark mode
              boxShadow: isDarkMode ? "0 0 50px rgba(255,255,255,0.05)" : "none",
              // slightly round the corners if the TV screen is rounded
              borderRadius: "4px"
            }}
          >
            {/* The website content goes here, allowing it to scroll within the TV screen */}
            <div id="desktop-scroll" className="w-full h-full overflow-y-auto no-scrollbar relative">
              {children}
            </div>
          </div>

          {/* Subtle reflection overlay on the screen (optional, adds realism) */}
          <div
            className="absolute z-20 pointer-events-none rounded-md"
            style={{
              top: "0%", bottom: "0%", left: "0%", right: "0%",
              background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 100%)",
              opacity: isDarkMode ? 0.2 : 0.5,
              transition: "opacity 0.7s ease-in-out"
            }}
          />
        </div>
      )}
    </div>
  );
}
