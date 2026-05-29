"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface TvModeContextType {
  isTvMode: boolean;
  setIsTvMode: (value: boolean) => void;
}

const TvModeContext = createContext<TvModeContextType | undefined>(undefined);

export function TvModeProvider({ children }: { children: React.ReactNode }) {
  const [isTvMode, setIsTvMode] = useState(false);

  return (
    <TvModeContext.Provider value={{ isTvMode, setIsTvMode }}>
      {children}
    </TvModeContext.Provider>
  );
}

export function useTvMode() {
  const context = useContext(TvModeContext);
  if (context === undefined) {
    throw new Error("useTvMode must be used within a TvModeProvider");
  }
  return context;
}
