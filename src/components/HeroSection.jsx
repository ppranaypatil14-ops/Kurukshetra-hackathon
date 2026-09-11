import React from 'react'
import GaugeCard from './GaugeCard'
import SecurityFindings from './SecurityFindings'
import TiltCard from './TiltCard'
import ScanController from './ScanController'
import { useScrollParallax } from '../hooks/useScrollParallax'

export default function HeroSection({
  scanState,
  setScanState,
  scanId,
  setScanId,
  progress,
  setProgress,
  currentStage,
  setCurrentStage,
  error,
  setError,
  onScanCompleted,
  scanResults,
  onSelectFinding,
}) {
  const { scrollY, isDesktop } = useScrollParallax()

  // Subtle natural parallax (10-20px max, no fading or blur overlays)
  const heroCopyOffsetY = isDesktop ? -Math.min(scrollY * 0.05, 20) : 0
  const visualOffsetY = isDesktop ? -Math.min(scrollY * 0.025, 12) : 0
  const mosaicDriftY = isDesktop ? Math.min(scrollY * 0.035, 18) : 0

  return (
    <main className="relative min-h-[calc(100vh-120px)] hero-glow flex items-center overflow-hidden">
      {/* Decorative Mosaic Background with 10-20px subtle scroll depth */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          transform: isDesktop ? `translate3d(0, ${mosaicDriftY}px, 0)` : 'none',
        }}
      >
        {/* Mosaic Grid Right Edge */}
        <div className="absolute right-0 top-12 bottom-0 hidden xl:grid grid-cols-4 grid-rows-12 gap-0 opacity-90">
          <div className="pixel-box col-start-3 row-start-2 bg-gradient-to-br from-[#ff2a85] to-[#d946ef] rounded-sm"></div>
          <div className="pixel-box col-start-3 row-start-3 bg-neutral-200/90 rounded-sm"></div>
          <div className="pixel-box col-start-2 row-start-4 bg-neutral-300 rounded-sm"></div>
          <div className="pixel-box col-start-1 row-start-5 bg-neutral-700/50 rounded-sm"></div>
          <div className="pixel-box col-start-2 row-start-6 bg-[#e11d74] rounded-sm shadow-lg shadow-pink-600/30"></div>
          <div className="pixel-box col-start-1 row-start-7 bg-neutral-800 rounded-sm"></div>
          <div className="pixel-box col-start-1 row-start-8 bg-neutral-200 rounded-sm"></div>
          <div className="pixel-box col-start-2 row-start-8 bg-neutral-500/40 rounded-sm"></div>
          <div className="pixel-box col-start-2 row-start-9 bg-neutral-800 rounded-sm"></div>
          <div className="pixel-box col-start-3 row-start-9 bg-neutral-300 rounded-sm"></div>
          <div className="pixel-box col-start-3 row-start-10 bg-neutral-800 rounded-sm"></div>
        </div>

        {/* Mosaic Grid Bottom Elements */}
        <div className="absolute bottom-0 left-0 hidden lg:flex items-end">
          <div className="pixel-box bg-neutral-800/80"></div>
          <div className="pixel-box bg-[#e11d74]"></div>
          <div className="pixel-box bg-neutral-700/60"></div>
        </div>
        <div className="absolute bottom-6 left-[68%] hidden xl:block">
          <div className="pixel-box bg-[#ffd000] shadow-lg shadow-yellow-500/20"></div>
        </div>
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content & Live Scan Controller */}
          <section
            className="lg:col-span-6 xl:col-span-6 max-w-2xl"
            style={{
              transform: isDesktop ? `translate3d(0, ${heroCopyOffsetY}px, 0)` : 'none',
            }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-[82px] font-black tracking-tight leading-[1.05] text-white">
              Secure<br />
              Software<br />
              Supply Chains<br />
              <span className="bg-gradient-to-r from-[#ff2a85] via-[#ec4899] to-[#f43f5e] bg-clip-text text-transparent">
                Before Attacks
              </span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-neutral-300 max-w-lg leading-relaxed font-normal">
              DeepScan analyzes your project's dependencies to detect vulnerabilities, suspicious packages, and software supply-chain risks before they reach your code.
            </p>

            {/* Live Scan Controller - GitHub & ZIP Scan Form */}
            <ScanController
              scanState={scanState}
              setScanState={setScanState}
              scanId={scanId}
              setScanId={setScanId}
              progress={progress}
              setProgress={setProgress}
              currentStage={currentStage}
              setCurrentStage={setCurrentStage}
              error={error}
              setError={setError}
              onScanCompleted={onScanCompleted}
            />

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                className="inline-flex items-center justify-center bg-[#251e34]/70 border border-neutral-600/70 hover:border-neutral-400 text-white font-bold text-[15px] px-8 py-3.5 rounded-full hover:bg-[#2e2642] active:scale-95 transition-all"
                href="#how-it-works"
              >
                See How It Works
              </a>
              <span className="text-xs text-neutral-400 font-mono">
                ⚡ Powered by Backend Heuristic & AST Engine
              </span>
            </div>
          </section>

          {/* Right Column: Security Card Mockup connected to Backend */}
          <section
            className="lg:col-span-6 xl:col-span-6 relative w-full max-w-xl mx-auto lg:ml-auto"
            style={{
              transform: isDesktop ? `translate3d(0, ${visualOffsetY}px, 0)` : 'none',
            }}
          >
            <TiltCard maxTilt={1.0}>
              <GaugeCard
                score={scanResults?.score ?? 72}
                riskLevel={scanResults?.risk_level ?? 'Risk Score'}
                severityCounts={scanResults?.severity_counts}
              />
              <SecurityFindings
                findings={scanResults?.prioritized_findings}
                onSelectFinding={onSelectFinding}
              />
            </TiltCard>
          </section>
        </div>
      </div>
    </main>
  )
}
