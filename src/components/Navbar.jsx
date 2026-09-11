import React, { useState } from 'react'

export default function Navbar() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <header className="w-full border-b border-white/5 bg-[#16131c]/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo and Primary Nav */}
        <div className="flex items-center space-x-12">
          <a aria-label="DeepScan Homepage" className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white group" href="#">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#ff2a85] to-[#c026d3] flex items-center justify-center shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform text-white font-black text-sm">
              ◈
            </div>
            <span className="text-[22px] font-extrabold tracking-tight">DeepScan</span>
          </a>

          {/* Desktop Navigation Items */}
          <nav className="hidden md:flex items-center space-x-8 text-[15px] font-medium text-neutral-200">
            <a className="hover:text-white transition-colors" href="#product">Product</a>
            <a className="hover:text-white transition-colors" href="#how-it-works">How It Works</a>
            <a className="hover:text-white transition-colors" href="#security">Security</a>
            <a className="hover:text-white transition-colors" href="#features">Features</a>
            <a className="hover:text-white transition-colors" href="#technology">Technology</a>
            <a className="hover:text-white transition-colors" href="https://github.com/ppranaypatil14-ops/Kurukshetra-hackathon" target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>
        </div>

        {/* Right Action Items */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center bg-[#292138] border border-purple-500/20 rounded-full px-3.5 py-1.5 focus-within:border-purple-400/50 transition-all">
            <span className="text-xs font-semibold text-purple-300 mr-2 tracking-wide">Repository</span>
            <input
              type="text"
              placeholder="Search or audit..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-transparent border-0 p-0 text-xs text-white placeholder-purple-300/50 focus:ring-0 w-28 md:w-36 outline-none"
            />
            <button aria-label="Search" className="text-purple-300 hover:text-white transition-colors ml-1" type="button">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
          <a className="bg-white text-black text-[14px] font-bold px-5 py-2.5 rounded-full hover:bg-neutral-100 active:scale-95 transition-all shadow-sm" href="#scan">
            Scan Repository
          </a>
        </div>
      </div>
    </header>
  )
}
