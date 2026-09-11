import React from 'react'

export default function GaugeCard({ score = 72 }) {
  return (
    <div className="relative w-72 mx-auto lg:ml-auto lg:mr-12 mb-[-32px] z-20">
      <div className="bg-[#241c38]/95 backdrop-blur-md rounded-2xl border border-purple-500/25 p-5 shadow-2xl shadow-purple-950/60">
        {/* Semi-circle Gauge */}
        <div className="relative w-44 h-24 mx-auto flex items-end justify-center overflow-hidden">
          <svg className="w-44 h-44 absolute top-0 -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background track */}
            <circle
              cx="50"
              cy="50"
              fill="none"
              r="45"
              stroke="#372a50"
              strokeDasharray="141 141"
              strokeDashoffset="0"
              strokeLinecap="round"
              strokeWidth="3"
            />
            {/* Glowing active arc */}
            <circle
              className="gauge-path"
              cx="50"
              cy="50"
              fill="none"
              r="45"
              stroke="url(#gauge-gradient)"
              strokeWidth="3.5"
            />
            <defs>
              <linearGradient id="gauge-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#ff0055" />
                <stop offset="50%" stopColor="#ff7300" />
                <stop offset="100%" stopColor="#ffcc00" />
              </linearGradient>
            </defs>
          </svg>
          {/* Center Gauge Metric */}
          <div className="text-center z-10 pb-1">
            <div className="text-3xl font-extrabold text-white tracking-tight leading-none">{score}</div>
            <div className="text-[11px] font-medium text-purple-300/80 mt-1 uppercase tracking-wider">Risk Score</div>
          </div>
        </div>

        {/* Metric Badges Row */}
        <div className="mt-4 pt-3 border-t border-purple-800/30 flex items-center justify-between text-xs font-semibold px-1">
          <div className="flex items-center gap-1.5 text-neutral-300" title="Critical Vulnerabilities">
            <span className="w-0 h-0 border-x-[4px] border-x-transparent border-b-[8px] border-b-rose-500 inline-block"></span>
            <span>2</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-300" title="High Severity Alerts">
            <span className="w-2 h-2 rotate-45 bg-amber-500 inline-block"></span>
            <span>5</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded border border-purple-400/30 text-white" title="Medium Severity Alerts">
            <span className="w-2 h-2 bg-yellow-400 inline-block"></span>
            <span>8</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-400" title="Informational / Clean Packages">
            <span className="w-2 h-2 rounded-full bg-slate-400 inline-block"></span>
            <span>12</span>
          </div>
        </div>
      </div>
    </div>
  )
}
