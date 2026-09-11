import React from 'react'
import TiltCard from './TiltCard'
import { useInView } from '../hooks/useInView'

export default function ProofPointsSection() {
  const [sectionRef, isInView] = useInView({ threshold: 0.15, rootMargin: '0px 0px -40px 0px' })

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#ede8df] text-[#16131c] py-20 lg:py-24 px-4 sm:px-8 lg:px-12 border-t border-neutral-300/80 relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div
            className={`lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-6 transition-all duration-500 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[25px]'
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-black rounded-xs"></div>
              <span className="text-xs md:text-sm font-bold tracking-wider text-neutral-900 uppercase">
                Proof Points
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.08] text-neutral-900 mb-6">
              Protecting the world's best engineering teams
            </h2>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal mb-8 max-w-lg">
              Millions of developers trust DeepScan to get visibility into supply chain risk and build a security feedback loop into their workflow.
            </p>
            <div>
              <a
                className="inline-flex items-center justify-center bg-[#16131c] hover:bg-black text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all shadow-md active:scale-95"
                href="#demo"
              >
                Book a Demo
              </a>
            </div>
          </div>

          {/* Right Column: Bento Grid with 50-100ms Sequential Stagger */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
              <div className="hidden sm:block"></div>
              <div className="hidden sm:block"></div>

              {/* 11.6M+ Card */}
              <div
                className={`transition-all duration-500 delay-75 ${
                  isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-[25px] scale-[0.98]'
                }`}
              >
                <TiltCard maxTilt={1.0} className="h-full">
                  <div className="bg-[#16131c] text-white p-5 sm:p-6 rounded-lg flex flex-col justify-between min-h-[140px] sm:min-h-[150px] shadow-sm h-full">
                    <div className="text-xs sm:text-[13px] font-semibold text-neutral-300 leading-snug">
                      Commits Secured Every Month
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-auto">
                      11.6M+
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* Gradient Accent Tile 1 */}
              <div
                className={`bg-gradient-to-br from-[#ff2a85] via-[#e11d74] to-[#c026d3] rounded-lg min-h-[140px] sm:min-h-[150px] shadow-sm transition-all duration-500 delay-100 ${
                  isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              ></div>

              {/* 85+ Signal Card */}
              <div
                className={`transition-all duration-500 delay-125 ${
                  isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-[25px] scale-[0.98]'
                }`}
              >
                <TiltCard maxTilt={1.0} className="h-full">
                  <div className="bg-[#16131c] text-white p-5 sm:p-6 rounded-lg flex flex-col justify-between min-h-[140px] sm:min-h-[150px] shadow-sm h-full">
                    <div className="text-xs sm:text-[13px] font-semibold text-neutral-300 leading-snug">
                      Supply chain risk signal
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-auto">
                      85+
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* 10,000+ Attacks Card */}
              <div
                className={`transition-all duration-500 delay-150 ${
                  isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-[25px] scale-[0.98]'
                }`}
              >
                <TiltCard maxTilt={1.0} className="h-full">
                  <div className="bg-[#16131c] text-white p-5 sm:p-6 rounded-lg flex flex-col justify-between min-h-[140px] sm:min-h-[150px] shadow-sm h-full">
                    <div className="text-xs sm:text-[13px] font-semibold text-neutral-300 leading-snug">
                      Attacks blocked weekly
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-auto">
                      10,000+
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* 27,000+ Orgs Protected (Wide) */}
              <div
                className={`col-span-2 transition-all duration-500 delay-175 ${
                  isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-[25px] scale-[0.98]'
                }`}
              >
                <TiltCard maxTilt={1.0} className="h-full">
                  <div className="bg-[#ff2a85] text-white p-5 sm:p-6 rounded-lg flex flex-col justify-between min-h-[140px] sm:min-h-[150px] shadow-sm h-full">
                    <div className="text-xs sm:text-[13px] font-bold text-white/90 leading-snug">
                      Orgs Protected
                    </div>
                    <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-auto">
                      27,000+
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* Gradient Accent Tile 2 */}
              <div
                className={`bg-gradient-to-tr from-[#e11d74] to-[#ff2a85] rounded-lg min-h-[140px] sm:min-h-[150px] shadow-sm transition-all duration-500 delay-200 ${
                  isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              ></div>

              {/* Anthropic / Figma Yellow Card */}
              <div
                className={`transition-all duration-500 delay-225 ${
                  isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-[25px] scale-[0.98]'
                }`}
              >
                <TiltCard maxTilt={1.0} className="h-full">
                  <div className="bg-[#ffd000] text-[#16131c] p-4 sm:p-5 rounded-lg flex flex-col justify-between min-h-[140px] sm:min-h-[150px] shadow-sm h-full">
                    <div className="flex items-center justify-between text-xs sm:text-[13px] font-bold tracking-tight">
                      <span>Trusted by</span>
                      <span className="font-bold">↗</span>
                    </div>
                    <div className="space-y-2 mt-auto">
                      <div className="font-bold text-sm sm:text-base tracking-widest leading-none">ANTHROP\C</div>
                      <div className="font-black text-sm sm:text-base tracking-tight leading-none">Figma</div>
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* 300,000+ Threat Detections Card */}
              <div
                className={`transition-all duration-500 delay-250 ${
                  isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-[25px] scale-[0.98]'
                }`}
              >
                <TiltCard maxTilt={1.0} className="h-full">
                  <div className="bg-[#ff2a85] text-white p-5 sm:p-6 rounded-lg flex flex-col justify-between min-h-[140px] sm:min-h-[150px] shadow-sm h-full">
                    <div className="text-xs sm:text-[13px] font-bold text-white/90 leading-snug">
                      Unique threat detections
                    </div>
                    <div className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-auto">
                      300,000+
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* 1.5M Repositories Card */}
              <div
                className={`transition-all duration-500 delay-275 ${
                  isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-[25px] scale-[0.98]'
                }`}
              >
                <TiltCard maxTilt={1.0} className="h-full">
                  <div className="bg-[#16131c] text-white p-5 sm:p-6 rounded-lg flex flex-col justify-between min-h-[140px] sm:min-h-[150px] shadow-sm h-full">
                    <div className="text-xs sm:text-[13px] font-semibold text-neutral-300 leading-snug">
                      Code Repositories Protected
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-auto">
                      1.5M
                    </div>
                  </div>
                </TiltCard>
              </div>

              <div className="hidden sm:block"></div>

              {/* Replit / Vercel Yellow Card */}
              <div
                className={`transition-all duration-500 delay-300 ${
                  isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-[25px] scale-[0.98]'
                }`}
              >
                <TiltCard maxTilt={1.0} className="h-full">
                  <div className="bg-[#ffd000] text-[#16131c] p-4 sm:p-5 rounded-lg flex flex-col justify-between min-h-[140px] sm:min-h-[150px] shadow-sm h-full">
                    <div className="flex items-center justify-between text-xs sm:text-[13px] font-bold tracking-tight">
                      <span>Trusted by</span>
                      <span className="font-bold">↗</span>
                    </div>
                    <div className="space-y-2 mt-auto">
                      <div className="font-extrabold text-sm sm:text-base tracking-tight leading-none flex items-center gap-1.5">
                        <span className="w-3 h-3 bg-neutral-900 rounded-xs inline-block"></span>
                        Replit
                      </div>
                      <div className="font-bold text-sm sm:text-base tracking-tight leading-none flex items-center gap-1">
                        <span>▲</span> Vercel
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>

              <div className="hidden sm:block"></div>
              <div className="hidden sm:block"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
