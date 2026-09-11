import React from 'react'

const findings = [
  {
    id: 1,
    title: 'Vulnerable dependency:',
    registry: 'npm',
    package: 'package-x',
    severity: 'Critical',
    severityColor: 'bg-rose-500',
    severityTextColor: 'text-rose-500',
    tag: 'Direct',
    bars: ['bg-rose-500', 'bg-rose-500', 'bg-rose-500']
  },
  {
    id: 2,
    title: 'Typosquatting risk:',
    registry: 'npm',
    package: 'package-y',
    severity: 'High',
    severityColor: 'bg-amber-400',
    severityTextColor: 'text-amber-400',
    tag: 'Potential',
    bars: ['bg-amber-400', 'bg-amber-400', 'bg-amber-400']
  },
  {
    id: 3,
    title: 'Dependency confusion:',
    registry: 'npm',
    package: 'package-z',
    severity: 'High',
    severityColor: 'bg-amber-400',
    severityTextColor: 'text-amber-400',
    tag: 'Production',
    bars: ['bg-amber-400', 'bg-amber-400', 'bg-amber-400']
  },
  {
    id: 4,
    title: 'Suspicious package behavior:',
    registry: 'npm',
    package: 'package-a',
    severity: 'Medium',
    severityColor: 'bg-yellow-400',
    severityTextColor: 'text-yellow-400',
    tag: 'In Use',
    bars: ['bg-yellow-400', 'bg-yellow-400', 'bg-yellow-400']
  }
]

export default function SecurityFindings() {
  return (
    <div className="bg-[#211933]/90 backdrop-blur-md rounded-2xl border border-purple-500/20 p-5 sm:p-6 shadow-2xl space-y-3 z-10 relative pt-10">
      <div className="text-xs font-mono tracking-wider text-purple-300/80 uppercase mb-3">
        SECURITY FINDINGS
      </div>

      {findings.map((item) => (
        <div
          key={item.id}
          className="bg-[#291f3d]/80 hover:bg-[#2d2243] transition-colors border border-purple-800/30 rounded-xl p-3 sm:px-4 flex items-center justify-between gap-3 text-xs sm:text-sm"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex items-end gap-0.5 h-3.5 flex-shrink-0">
              <span className={`w-1 h-1.5 ${item.bars[0]} rounded-xs`}></span>
              <span className={`w-1 h-2.5 ${item.bars[1]} rounded-xs`}></span>
              <span className={`w-1 h-3.5 ${item.bars[2]} rounded-xs`}></span>
            </div>
            <div className="font-medium text-white truncate">
              <span className="font-bold">{item.title}</span>{' '}
              <span className="text-neutral-300">{item.registry}</span>{' '}
              <span className="bg-[#382b54] text-purple-200 px-2 py-0.5 rounded text-xs font-mono ml-1">
                {item.package}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0 text-xs">
            <span className={`bg-[#1b1529] ${item.severityTextColor} px-2 py-0.5 rounded-full border border-purple-800/40 flex items-center gap-1 font-semibold`}>
              {item.severity}
            </span>
            <span className="bg-[#1b1529] text-purple-300/90 px-2 py-0.5 rounded-full border border-purple-800/40 hidden sm:inline-block">
              {item.tag}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
