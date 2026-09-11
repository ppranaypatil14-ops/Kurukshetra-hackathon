import React from 'react'

export default function EcosystemGrid() {
  return (
    <section className="w-full bg-[#f4ede4] text-[#16131c] py-16 px-4 sm:px-8 lg:px-12 relative overflow-hidden border-t border-neutral-300/60">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-6">
          <p className="text-xs md:text-sm font-semibold tracking-widest text-neutral-500 uppercase">
            Built for the Modern Software Supply Chain
          </p>
        </div>

        {/* Registry & Ecosystem Grid */}
        <div className="w-full border border-neutral-300/80 bg-white/40 rounded-sm mb-16 overflow-hidden shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {/* GitHub */}
            <div className="flex items-center justify-center p-6 border-b sm:border-b-0 border-r border-neutral-300/80 h-24 gap-2.5">
              <svg className="w-5 h-5 fill-current text-neutral-900" viewBox="0 0 24 24">
                <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path>
              </svg>
              <span className="font-sans font-bold text-lg text-neutral-900 tracking-tight">GitHub</span>
            </div>

            {/* OSV */}
            <div className="flex items-center justify-center p-6 border-b sm:border-b-0 lg:border-r border-neutral-300/80 h-24 gap-2">
              <div className="w-6 h-6 rounded bg-[#1b1529] text-white flex items-center justify-center font-mono font-bold text-xs shadow-sm">
                OSV
              </div>
              <span className="font-sans font-black text-lg tracking-wider text-neutral-900">OSV</span>
            </div>

            {/* npm */}
            <div className="flex items-center justify-center p-6 border-b sm:border-b-0 border-r border-neutral-300/80 h-24 gap-1.5">
              <div className="bg-[#cb3837] text-white font-black px-2 py-0.5 text-base rounded-[2px] tracking-tight">
                npm
              </div>
            </div>

            {/* PyPI */}
            <div className="flex items-center justify-center p-6 border-b sm:border-b-0 lg:border-r border-neutral-300/80 h-24 gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                <path d="M12 2L4 6.5V11L12 6.5L20 11V6.5L12 2Z" fill="#3775A9"></path>
                <path d="M4 13V17.5L12 22L20 17.5V13L12 17.5L4 13Z" fill="#FFD43B"></path>
              </svg>
              <span className="font-sans font-bold text-lg text-neutral-900 tracking-tight">PyPI</span>
            </div>

            {/* Node.js */}
            <div className="flex items-center justify-center p-6 border-b sm:border-b-0 border-r border-neutral-300/80 h-24 gap-2">
              <svg className="w-5 h-5 fill-current text-[#539E43]" viewBox="0 0 24 24">
                <path d="M12 2l10 5.75v10.5L12 24 2 18.25V7.75L12 2zm0 2.32L4 8.92v6.16l8 4.6 8-4.6V8.92L12 4.32z"></path>
              </svg>
              <span className="font-sans font-bold text-lg text-neutral-900 tracking-tight">Node.js</span>
            </div>

            {/* Python */}
            <div className="flex items-center justify-center p-6 h-24 gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                <path d="M11.91 2C6.55 2 6.89 4.33 6.89 4.33L6.9 6.74H12V7.5H4.27S2 7.24 2 12.55c0 5.32 1.98 5.14 1.98 5.14h1.18v-2.45s-.06-2.92 2.87-2.92h4.94s2.81.04 2.81-2.73V4.73S16.2 2 11.91 2z" fill="#3776AB"></path>
                <path d="M12.09 22c5.36 0 5.02-2.33 5.02-2.33l-.01-2.41H12V16.5h7.73S22 16.76 22 11.45c0-5.32-1.98-5.14-1.98-5.14h-1.18v2.45s.06 2.92-2.87 2.92h-4.94s-2.81-.04-2.81 2.73v4.86S7.8 22 12.09 22z" fill="#FFD43B"></path>
              </svg>
              <span className="font-sans font-bold text-lg text-neutral-900 tracking-tight">Python</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-neutral-300/80">
            {/* FastAPI */}
            <div className="flex items-center justify-center p-6 border-b sm:border-b-0 border-r border-neutral-300/80 h-24 gap-2">
              <svg className="w-5 h-5 fill-current text-[#059694]" viewBox="0 0 24 24">
                <path d="M12 2L3 13.5h7.5L9 22l11-12.5h-8L12 2z"></path>
              </svg>
              <span className="font-sans font-bold text-base text-neutral-900 tracking-tight">FastAPI</span>
            </div>

            {/* PostgreSQL */}
            <div className="flex items-center justify-center p-6 border-b sm:border-b-0 lg:border-r border-neutral-300/80 h-24 gap-2">
              <svg className="w-5 h-5 fill-current text-[#336791]" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
              </svg>
              <span className="font-sans font-bold text-base text-neutral-900 tracking-tight">PostgreSQL</span>
            </div>

            {/* Docker */}
            <div className="flex items-center justify-center p-6 border-b sm:border-b-0 border-r border-neutral-300/80 h-24 gap-2">
              <svg className="w-5 h-5 fill-current text-[#008fe2]" viewBox="0 0 24 24">
                <path d="M13.98 11.08h2.12v2.12H13.98zm-3.18 0h2.12v2.12H10.8zm-3.19 0h2.12v2.12H7.61zm-3.18 0h2.12v2.12H4.43zm6.37-3.18h2.12v2.12H10.8zm3.18 0h2.12v2.12H13.98zm-6.37 0h2.12v2.12H7.61zm9.55 3.18h2.12v2.12h-2.12zm-3.18-3.18h2.12v2.12H13.98zM23.95 13.5c-.24-1.57-1.46-2.48-2.61-2.67-.3-.05-.62-.05-.93 0-.25-1.5-1.32-2.5-2.68-2.5h-.45c-.2 0-.4.04-.59.1-.06-.5-.26-.97-.58-1.34l-.4-.44-3.52.01v2.85h-10v5.04c0 3.32 2.68 6.02 5.98 6.02h7.32c5.07 0 9.17-3.35 9.46-7.07z"></path>
              </svg>
              <span className="font-sans font-bold text-base text-neutral-900 tracking-tight">Docker</span>
            </div>

            {/* NetworkX */}
            <div className="flex items-center justify-center p-6 border-b sm:border-b-0 lg:border-r border-neutral-300/80 h-24 gap-2">
              <svg className="w-5 h-5 fill-current text-[#1772b4]" viewBox="0 0 24 24">
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="18" cy="6" r="3"></circle>
                <circle cx="12" cy="18" r="3"></circle>
                <path d="M8.5 7.5l5 7m-5-.5l5-7" fill="none" stroke="currentColor" strokeWidth="2"></path>
              </svg>
              <span className="font-sans font-extrabold text-base tracking-tight text-neutral-900">NetworkX</span>
            </div>

            {/* Git */}
            <div className="flex items-center justify-center p-6 border-b sm:border-b-0 border-r border-neutral-300/80 h-24 gap-2">
              <svg className="w-5 h-5 fill-current text-[#F05032]" viewBox="0 0 24 24">
                <path d="M2.5 10.5L10.5 2.5a2.12 2.12 0 0 1 3 0l8 8a2.12 2.12 0 0 1 0 3l-8 8a2.12 2.12 0 0 1-3 0l-8-8a2.12 2.12 0 0 1 0-3zm10.7 7.7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-2.4-5.3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 0v2.8m2.4-5.2l-2.4 2.4"></path>
              </svg>
              <span className="font-sans font-bold text-lg text-neutral-900">Git</span>
            </div>

            {/* OWASP */}
            <div className="flex items-center justify-center p-6 h-24 gap-2">
              <svg className="w-5 h-5 fill-current text-neutral-900" viewBox="0 0 24 24">
                <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 2.18l6 2.25v4.66c0 3.99-2.6 7.74-6 8.78-3.4-1.04-6-4.79-6-8.78V6.43l6-2.25z"></path>
              </svg>
              <span className="font-sans font-black text-lg text-neutral-900 tracking-wider">OWASP</span>
            </div>
          </div>
        </div>

        {/* Stats and Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 10,000+ Stat Card */}
          <div className="lg:col-span-4 bg-white rounded-lg p-8 shadow-sm border border-neutral-200/80 relative min-h-[220px] flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900">10,000+</span>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#9d174d] to-[#d946ef] p-[1.5px] flex items-center justify-center shadow-md shadow-pink-500/20">
                <div className="w-full h-full bg-gradient-to-b from-[#db2777] to-[#9333ea] rounded-md flex items-center justify-center text-white">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1 14.5v-4H8.5L13 5.5v4h2.5L11 16.5z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <p className="font-bold text-neutral-900 text-sm sm:text-base mt-8 mb-4">Attacks blocked every week</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-[2px] bg-neutral-400"></span>
                <span className="w-2 h-2 rounded-[2px] border border-neutral-400"></span>
                <span className="w-2 h-2 rounded-[2px] border border-neutral-400"></span>
              </div>
            </div>
          </div>

          {/* Blocked by DeepScan Version Widget */}
          <div className="lg:col-span-3 flex items-center justify-center py-4">
            <div className="relative w-[190px] h-[190px]">
              <div className="absolute top-0 left-0 w-[110px] h-[110px] bg-[#d73a3a] z-10 flex flex-col justify-between p-2.5 shadow-md">
                <div className="absolute -top-3 left-3 bg-[#1e1a29] text-white px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 border border-purple-400/20 shadow-lg whitespace-nowrap">
                  <svg className="w-3 h-3 text-purple-300 fill-current" viewBox="0 0 24 24">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path>
                  </svg>
                  <span>Blocked by DeepScan</span>
                </div>
                <div className="mt-auto font-mono text-xs font-bold text-white">1.1.2</div>
              </div>
              <div className="absolute bottom-0 right-0 w-[110px] h-[110px] bg-[#221c2e] z-0 flex flex-col justify-end p-2.5 shadow-lg">
                <div className="font-mono text-xs font-bold text-white">1.2.0</div>
              </div>
            </div>
          </div>

          {/* Explainer Card */}
          <div className="lg:col-span-5 bg-white/60 rounded-lg p-8 sm:p-10 border border-neutral-200/80 flex flex-col justify-between min-h-[220px]">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 leading-snug tracking-tight mb-6">
              Open source makes up 90% of modern application code. DeepScan scans every package and update for malicious behavior across all major registries.
            </h2>
            <div>
              <a className="inline-flex items-center justify-center bg-[#1e1a29] hover:bg-black text-white font-bold text-sm px-6 py-3 rounded-full transition-colors shadow-sm" href="#about">
                What is DeepScan?
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
