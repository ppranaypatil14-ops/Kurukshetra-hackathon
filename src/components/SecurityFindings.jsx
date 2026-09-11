import React from 'react'

const defaultDemoFindings = [
  {
    id: 1,
    title: 'Vulnerable dependency detected',
    finding_type: 'Vulnerability',
    source: 'Static AST Engine',
    package: 'package-x',
    file: 'package.json',
    line: 14,
    severity: 'Critical',
    priority: 'P0',
    confidence: 'High',
    evidence: 'Insecure cryptographic method invocation detected in direct package dependency chain.',
    dependency_depth: 1,
    blast_radius: 'Affects core authentication and internal routing modules',
    risk_contribution: '35% contribution to total risk score',
    score_trace: "Rule 'flaw' triggered with CVSS weight 9.0; exploit maturity confirmed.",
    remediation: 'Upgrade to package-x@^2.4.1 or replace with verified alternative.',
    bars: ['bg-rose-500', 'bg-rose-500', 'bg-rose-500'],
  },
  {
    id: 2,
    title: 'Typosquatting risk candidate',
    finding_type: 'Typosquatting',
    source: 'Package Reputation Analyzer',
    package: 'package-y',
    file: 'requirements.txt',
    line: 8,
    severity: 'High',
    priority: 'P1',
    confidence: 'High',
    evidence: 'High Levenshtein proximity match to popular ecosystem library with 0 downloads.',
    dependency_depth: 1,
    blast_radius: 'Immediate runtime supply chain execution',
    risk_contribution: '25% contribution to total risk score',
    score_trace: "Rule 'typosquat' triggered with CVSS weight 7.5; zero reputation publisher.",
    remediation: 'Confirm intentional dependency name; remove suspicious package reference.',
    bars: ['bg-amber-400', 'bg-amber-400', 'bg-amber-400'],
  },
  {
    id: 3,
    title: 'Dependency confusion opportunity',
    finding_type: 'Dependency Confusion',
    source: 'Registry Intelligence Service',
    package: 'package-z',
    file: 'setup.py',
    line: 22,
    severity: 'High',
    priority: 'P1',
    confidence: 'Medium',
    evidence: 'Internal scoped namespace claimed on public npm/PyPI registry without scoped token.',
    dependency_depth: 2,
    blast_radius: 'Build artifact substitution risk',
    risk_contribution: '20% contribution to total risk score',
    score_trace: "Rule 'namespace_collision' triggered with CVSS weight 7.0.",
    remediation: 'Configure internal private package registry proxy and prefix reservation.',
    bars: ['bg-amber-400', 'bg-amber-400', 'bg-amber-400'],
  },
  {
    id: 4,
    title: 'Suspicious package behavior',
    finding_type: 'Suspicious Behavior',
    source: 'Static AST & Behavioral Engine',
    package: 'package-a',
    file: 'app.py',
    line: 5,
    severity: 'Medium',
    priority: 'P2',
    confidence: 'High',
    evidence: 'Direct invocation of subshell process with unsanitized arguments.',
    dependency_depth: 1,
    blast_radius: 'Local process execution scope',
    risk_contribution: '15% contribution to total risk score',
    score_trace: "Rule 'exec_call' triggered with CVSS weight 5.0.",
    remediation: 'Disallow shell=True in child process execution; use parameterized arguments.',
    bars: ['bg-yellow-400', 'bg-yellow-400', 'bg-yellow-400'],
  },
]

export default function SecurityFindings({ findings, onSelectFinding }) {
  const displayFindings = (findings && findings.length > 0) ? findings : defaultDemoFindings

  const getBars = (severity) => {
    const s = (severity || '').toLowerCase()
    if (s === 'critical') return ['bg-rose-500', 'bg-rose-500', 'bg-rose-500']
    if (s === 'high') return ['bg-amber-400', 'bg-amber-400', 'bg-amber-400']
    if (s === 'medium') return ['bg-yellow-400', 'bg-yellow-400', 'bg-yellow-400']
    return ['bg-slate-400', 'bg-slate-400', 'bg-slate-400']
  }

  const getSeverityTextColor = (severity) => {
    const s = (severity || '').toLowerCase()
    if (s === 'critical') return 'text-rose-500'
    if (s === 'high') return 'text-amber-400'
    if (s === 'medium') return 'text-yellow-400'
    return 'text-slate-300'
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'P0':
        return 'bg-rose-500/25 text-rose-300 border-rose-500/50'
      case 'P1':
        return 'bg-amber-500/25 text-amber-300 border-amber-500/50'
      case 'P2':
        return 'bg-yellow-500/25 text-yellow-300 border-yellow-500/50'
      default:
        return 'bg-slate-500/25 text-slate-300 border-slate-500/50'
    }
  }

  return (
    <div className="bg-[#211933]/90 backdrop-blur-md rounded-2xl border border-purple-500/20 p-5 sm:p-6 shadow-2xl space-y-3 z-10 relative pt-10">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-mono tracking-wider text-purple-300/80 uppercase">
          PRIORITIZED SECURITY FINDINGS ({displayFindings.length})
        </div>
        <span className="text-[11px] text-purple-400 font-mono hidden sm:inline-block">
          Click any item for full evidence
        </span>
      </div>

      <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
        {displayFindings.map((item, idx) => {
          const bars = getBars(item.severity)
          const textColor = getSeverityTextColor(item.severity)
          const prio = item.priority || 'P2'

          return (
            <div
              key={item.id || idx}
              onClick={() => onSelectFinding && onSelectFinding(item)}
              role="button"
              tabIndex={0}
              className="bg-[#291f3d]/80 hover:bg-[#34274e] hover:border-purple-500/50 transition-all border border-purple-800/30 rounded-xl p-3 sm:px-4 flex items-center justify-between gap-3 text-xs sm:text-sm cursor-pointer group active:scale-[0.99]"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                {/* 3 bars indicator */}
                <div className="flex items-end gap-0.5 h-3.5 flex-shrink-0">
                  <span className={`w-1 h-1.5 ${bars[0]} rounded-xs`}></span>
                  <span className={`w-1 h-2.5 ${bars[1]} rounded-xs`}></span>
                  <span className={`w-1 h-3.5 ${bars[2]} rounded-xs`}></span>
                </div>

                <div className="font-medium text-white truncate">
                  <span className="font-bold">{item.title || item.finding_type || 'Security Finding'}</span>{' '}
                  <span className="bg-[#382b54] text-purple-200 px-2 py-0.5 rounded text-xs font-mono ml-1 group-hover:bg-[#49396d] transition-colors">
                    {item.package}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0 text-xs">
                {/* P0 / P1 / P2 / P3 priority pill */}
                <span className={`px-2 py-0.5 rounded font-mono font-bold border text-[11px] ${getPriorityBadge(prio)}`}>
                  {prio}
                </span>

                <span className={`bg-[#1b1529] ${textColor} px-2 py-0.5 rounded-full border border-purple-800/40 flex items-center gap-1 font-semibold`}>
                  {item.severity}
                </span>

                <span className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline-block">
                  →
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
