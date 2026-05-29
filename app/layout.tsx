import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TvModeProvider } from "@/components/tv-mode-provider"
import TVWrapper from "@/components/tv-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Raghav Maheshwari - Web Developer & CSE Student",
  description:
    "Portfolio of Raghav Maheshwari, a passionate web developer and computer science engineering student specializing in modern web technologies.",
  keywords: ["web developer", "computer science", "react", "next.js", "portfolio"],
  authors: [{ name: "Raghav Maheshwari" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Raghav Maheshwari - Web Developer & CSE Student",
    description: "Portfolio showcasing web development projects and skills",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:," />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange={false}
          storageKey="portfolio-theme"
        >
          <TvModeProvider>
            <TVWrapper>
              {children}
            </TVWrapper>
          </TvModeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
