"use client"
import React, { useEffect } from 'react';

interface SkeletonPageProps {
  onFinish?: () => void;
}

export default function SkeletonPage({ onFinish }: SkeletonPageProps) {
  useEffect(() => {
    if (onFinish) {
      const timer = setTimeout(() => {
        onFinish();
      }, 2500); // 2.5 seconds loading time
      return () => clearTimeout(timer);
    }
  }, [onFinish]);

  return (
    <div className="min-h-screen bg-background w-full flex flex-col pt-4 overflow-hidden relative">
      {/* Subtle Grid Background to match Hero */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Skeleton Navbar */}
        <div className="flex justify-center w-full px-6 pt-0 transition-all duration-300">
          <div className="w-full h-16 md:h-14 md:w-[85%] lg:w-[75%] rounded-full bg-muted/20 animate-pulse flex items-center justify-between px-6 border border-white/5">
            <div className="w-24 h-6 bg-muted/50 rounded-md" />
            <div className="hidden md:flex gap-4">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="w-16 h-4 bg-muted/40 rounded-md" />
              ))}
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-6 rounded-full bg-muted/40" />
              <div className="w-24 h-8 rounded-full bg-muted/50 hidden md:block" />
            </div>
          </div>
        </div>

        {/* Skeleton Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center pt-10 px-4 text-center">
          {/* Badge */}
          <div className="w-40 h-8 rounded-full bg-blue-500/10 animate-pulse mb-6" />
          
          {/* Main Title (Raghav Maheshwari) */}
          <div className="w-[80vw] max-w-3xl h-16 sm:h-24 md:h-28 rounded-2xl bg-muted/30 animate-pulse mb-6" />
          
          {/* Subtitle */}
          <div className="w-64 sm:w-96 h-8 rounded-lg bg-muted/20 animate-pulse mb-8" />
          
          {/* Paragraph Description */}
          <div className="flex flex-col items-center gap-2 mb-10 w-full">
            <div className="w-[90vw] max-w-2xl h-6 rounded-md bg-muted/20 animate-pulse" />
            <div className="w-[85vw] max-w-[40rem] h-6 rounded-md bg-muted/20 animate-pulse" />
            <div className="w-[60vw] max-w-lg h-6 rounded-md bg-muted/20 animate-pulse" />
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center items-center">
            <div className="w-full sm:w-48 h-12 rounded-lg bg-blue-600/20 animate-pulse" />
            <div className="w-full sm:w-48 h-12 rounded-lg bg-muted/30 animate-pulse" />
          </div>

          {/* Social Icons */}
          <div className="mt-16 flex justify-center space-x-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-muted/20 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
