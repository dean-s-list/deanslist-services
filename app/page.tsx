'use client'

import dynamic from "next/dynamic"
import Perks from "./components/sections/Perks"

const Hero = dynamic(() => import("./components/sections/Hero"))
const NetworkGraph = dynamic(() => import("./components/sections/NetworkGraph"))
const Partners = dynamic(() => import("./components/sections/Partners"))
const Services = dynamic(() => import("./components/sections/Services"))
const Pricing = dynamic(() => import("./components/sections/Pricing"))
const Trusties = dynamic(() => import("./components/sections/Trusties"))
const Testimonials = dynamic(() => import("./components/sections/Testimonials"))
const AboutUs = dynamic(() => import("./components/sections/AboutUs"))
const Events = dynamic(() => import("./components/sections/Events"))
const FAQ = dynamic(() => import("./components/sections/FAQ"))
const Branches = dynamic(() => import("./components/sections/Branches"))
const Scroller = dynamic(() => import("./components/ui/Scroller"))

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#010C0C] via-[#010C0C] to-[#010C0C] text-white relative">
      <div className="absolute inset-0" />
      <div className="relative z-10">

        {/* Announcement Banner */}
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-3xl px-4">
          <div className="bg-gradient-to-r from-green-700/50 via-purple-600/50 to-green-400/50 backdrop-blur-sm border border-amber-400/30 rounded-lg p-3 shadow-lg mt-3 hover:shadow-amber-500/30 transition-all duration-300 group hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-500/0 animate-shimmer-gold"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-amber-400/0 via-amber-300/10 to-amber-400/0 group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
            <div className="flex items-center justify-between gap-3 relative">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-gradient-to-br from-amber-400/30 to-purple-500/30 rounded-md group-hover:scale-110 transition-all duration-300 animate-pulse-subtle">
                  <svg className="w-4 h-4 text-amber-300 group-hover:text-amber-200 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="transform transition-all duration-300 group-hover:translate-x-1">
                  <h3 className="text-xs font-bold bg-gradient-to-r from-amber-200 to-purple-200 bg-clip-text text-transparent group-hover:from-amber-100 group-hover:to-purple-100">
                    ISLANDDAO IS BACK
                  </h3>
                  <p className="text-xs font-semibold text-amber-200/80 group-hover:text-amber-100/90">
                    Sep 17 - Oct 17, 2025 · Mykonos, Greece
                  </p>
                  <p className="text-xs font-semibold text-amber-200/80 group-hover:text-amber-100/90">
                    The month-long coworking retreat for Solana builders is back.
                  </p>
                </div>
              </div>
              <a
                href="https://v3.islanddao.org" target="_blank" rel="noopener noreferrer"
                className="relative px-3 py-1.5 text-xs font-medium text-white overflow-hidden rounded-md transition-all duration-300 group-hover:scale-105 hover:shadow-md hover:shadow-amber-500/20"
              >
                <span className="relative z-10">Apply Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/40 to-purple-500/40 hover:from-amber-500/50 hover:to-purple-500/50"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-300/30 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer-gold"></div>
              </a>
            </div>
          </div>
        </div>

        <div>
          <Hero />
          <Partners />
          <Services />
          <Pricing />
          <Trusties />
          <Testimonials />
          <Perks />
          <AboutUs />
          <NetworkGraph />
          <Branches />
          <Events />
          <FAQ />
          <Scroller />
        </div>
      </div>
    </main>
  )
}
