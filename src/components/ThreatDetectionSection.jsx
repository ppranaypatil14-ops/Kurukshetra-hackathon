import React from 'react'
import TiltCard from './TiltCard'
import { useInView } from '../hooks/useInView'

export default function ThreatDetectionSection({ scanResults, onSelectFinding }) {
  const [sectionRef, isInView] = useInView({ threshold: 0.12, rootMargin: '0px 0px -50px 0px' })

  // Authoritative values from backend when available, otherwise elegant defaults
  const score = scanResults?.score ?? 72
  const severityCounts = scanResults?.severity_counts ?? { Critical: 2, High: 5, Medium: 8, Low: 12, Unknown: 0 }
  const findings = scanResults?.prioritized_findings ?? []
  const inventory = scanResults?.dependency_inventory ?? []
  const categoryScores = scanResults?.category_scores ?? {
    vulnerabilities: 65,
    supply_chain_behavior: 78,
    dependency_integrity: 84,
    reputation: 92,
    provenance: 78,
  }

  // Calculate percentages for severity bars
  const totalAlerts = (severityCounts.Critical || 0) + (severityCounts.High || 0) + (severityCounts.Medium || 0) || 1
  const critBarWidth = Math.min(100, Math.round(((severityCounts.Critical || 0) / totalAlerts) * 100) || (severityCounts.Critical ? 20 : 5))
  const highBarWidth = Math.min(100, Math.round(((severityCounts.High || 0) / totalAlerts) * 100) || (severityCounts.High ? 30 : 5))
  const medBarWidth = Math.min(100, Math.round(((severityCounts.Medium || 0) / totalAlerts) * 100) || (severityCounts.Medium ? 40 : 5))

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#16131c] text-white py-20 px-4 sm:px-8 lg:px-12 border-t border-purple-900/40 relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Heading */}
        <div
          className={`max-w-3xl mb-14 transition-all duration-500 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[25px]'
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#ff2a85] animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-wider text-purple-300">
              {scanResults ? 'Live Scan Intelligence Engine' : 'Comprehensive Supply-Chain Protection'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5 leading-tight">
            Detect supply-chain threats before they reach your code
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
            DeepScan analyzes dependencies across your repository to identify vulnerabilities, suspicious packages, and supply-chain risks before they become a security problem.
          </p>
        </div>

        {/* 4 Feature Cards Grid with 50-100ms Stagger and 0.98 -> 1 scale */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CARD 1: Detect vulnerable dependencies before deployment (Terminal Simulation) */}
          <div
            className={`transition-all duration-500 delay-75 ${
              isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-[25px] scale-[0.98]'
            }`}
          >
            <TiltCard maxTilt={1.0}>
              <div className="bg-[#1e172e] rounded-2xl border border-purple-500/20 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-purple-500/40 transition-all shadow-xl min-h-[420px]">
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#ff2a85]/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="mb-6 z-10">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-purple-100 transition-colors leading-snug">
                      Detect vulnerable dependencies before deployment
                    </h3>
                    <span className="text-purple-300 text-xl font-bold transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                  </div>
                </div>

                {/* Terminal Simulation */}
                <div className="w-full bg-[#110d1a] border border-purple-800/40 rounded-xl p-4 sm:p-5 font-mono text-xs sm:text-sm text-neutral-200 shadow-2xl relative z-10">
                  <div className="flex items-center space-x-2 pb-3 mb-3 border-b border-purple-900/40">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block"></span>
                    <span className="text-neutral-400 text-xs ml-2 font-sans font-medium">terminal — deepscan engine</span>
                  </div>
                  <div className="space-y-2 leading-relaxed">
                    <p className="text-neutral-400">
                      <span className="text-purple-400 font-bold">$</span> deepscan analyze {scanResults ? `--scan-id=${scanResults.scan_id}` : ''}
                    </p>
                    <p className="text-purple-300/80 text-xs font-sans">
                      {scanResults ? 'Authoritative AST & heuristic engine completed' : 'Scanning dependencies and static AST...'}
                    </p>

                    <div className="pt-1.5 space-y-1.5 font-mono text-xs sm:text-[13px] max-h-48 overflow-y-auto pr-1">
                      {inventory.length > 0 ? (
                        inventory.slice(0, 5).map((dep, idx) => (
                          <div key={idx} className="flex items-center justify-between py-0.5">
                            <div className="flex items-center truncate mr-2">
                              <span className="text-emerald-400 mr-2 font-bold flex-shrink-0">✓</span>
                              <span className="text-neutral-200 truncate">{dep.package}@{dep.resolved_version}</span>
                            </div>
                            <span className="text-emerald-400 font-bold text-xs flex-shrink-0">SAFE</span>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-emerald-400 mr-2 font-bold">✓</span>
                              <span className="text-neutral-200">react@18.2.0</span>
                            </div>
                            <span className="text-emerald-400 font-bold text-xs">SAFE</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-emerald-400 mr-2 font-bold">✓</span>
                              <span className="text-neutral-200">express@4.18.2</span>
                            </div>
                            <span className="text-emerald-400 font-bold text-xs">SAFE</span>
                          </div>
                        </>
                      )}

                      {findings.slice(0, 2).map((f, idx) => (
                        <div
                          key={idx}
                          onClick={() => onSelectFinding && onSelectFinding(f)}
                          className={`flex items-center justify-between px-2 py-1 rounded border cursor-pointer ${
                            f.severity === 'Critical'
                              ? 'bg-rose-950/40 border-rose-800/50'
                              : 'bg-amber-950/20 border-amber-800/30'
                          }`}
                        >
                          <div className="flex items-center truncate mr-2">
                            <span className={f.severity === 'Critical' ? 'text-rose-400 mr-2 font-bold' : 'text-amber-400 mr-2 font-bold'}>
                              {f.severity === 'Critical' ? '✕' : '⚠'}
                            </span>
                            <span className="text-white font-bold truncate">{f.package}: {f.title}</span>
                          </div>
                          <span className={`text-xs font-bold font-mono px-1.5 py-0.2 rounded ${f.severity === 'Critical' ? 'text-rose-400' : 'text-amber-400'}`}>
                            {f.severity.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 text-xs text-neutral-400 border-t border-purple-900/30 flex items-center justify-between font-sans">
                      <span className="font-medium text-purple-200">
                        {inventory.length > 0 ? `${inventory.length} dependencies cataloged` : '3 safe · 1 vulnerable · 1 high risk'}
                      </span>
                      <span className="text-[11px] bg-purple-900/40 text-purple-300 px-2 py-0.5 rounded font-mono font-semibold">
                        {scanResults ? 'backend verified' : 'analysis completed'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* CARD 2: Identify supply-chain risks & Dependency Inventory */}
          <div
            className={`transition-all duration-500 delay-150 ${
              isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-[25px] scale-[0.98]'
            }`}
          >
            <TiltCard maxTilt={1.0}>
              <div className="bg-[#1e172e] rounded-2xl border border-purple-500/20 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-purple-500/40 transition-all shadow-xl min-h-[420px]">
                <div className="mb-6 z-10">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-purple-100 transition-colors leading-snug">
                      Dependency Inventory & Threat Identification
                    </h3>
                    <span className="text-purple-300 text-xl font-bold transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                  </div>
                </div>

                <div className="w-full bg-[#161221] border border-purple-800/40 rounded-xl p-4 sm:p-5 shadow-2xl relative z-10 flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-900/40 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#ff2a85] to-[#c026d3] flex items-center justify-center text-white text-[10px] font-black">
                        ◈
                      </div>
                      <span className="font-bold text-white text-sm tracking-tight font-sans">
                        Authoritative Inventory & Risks
                      </span>
                    </div>
                    <span className="bg-purple-900/40 text-purple-300 text-[10px] font-mono font-semibold px-2 py-0.5 rounded border border-purple-700/40">
                      {inventory.length} Modules
                    </span>
                  </div>

                  <div className="overflow-x-auto text-xs max-h-52 overflow-y-auto">
                    <table className="w-full text-left font-mono">
                      <thead className="text-neutral-400 border-b border-purple-900/40 text-[11px] sticky top-0 bg-[#161221]">
                        <tr>
                          <th className="pb-2 font-semibold font-sans">Dependency</th>
                          <th className="pb-2 font-semibold font-sans">Ecosystem</th>
                          <th className="pb-2 font-semibold font-sans text-right">Resolved Ver</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-purple-900/30">
                        {inventory.length > 0 ? (
                          inventory.slice(0, 6).map((dep, idx) => (
                            <tr key={idx} className="text-neutral-200">
                              <td className="py-2 font-medium">
                                <span className="text-white font-bold">{dep.package}</span>
                              </td>
                              <td className="py-2 text-neutral-400 text-[11px]">{dep.ecosystem || 'PyPI'}</td>
                              <td className="py-2 text-right">
                                <span className="bg-purple-950/60 text-purple-200 px-2 py-0.5 rounded border border-purple-800/40 text-[11px]">
                                  {dep.resolved_version || dep.requested_version || '*'}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <>
                            <tr className="text-neutral-200">
                              <td className="py-2.5 font-medium">
                                <span className="text-white font-bold">package-x</span>
                              </td>
                              <td className="py-2.5 text-neutral-400 text-xs">npm</td>
                              <td className="py-2.5 text-right">
                                <span className="inline-flex items-center gap-1.5 bg-rose-500/15 border border-rose-500/30 text-rose-300 font-sans font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                                  Critical
                                </span>
                              </td>
                            </tr>
                            <tr className="text-neutral-200">
                              <td className="py-2.5 font-medium">
                                <span className="text-white font-bold">package-y</span>
                              </td>
                              <td className="py-2.5 text-neutral-400 text-xs">npm</td>
                              <td className="py-2.5 text-right">
                                <span className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-300 font-sans font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                                  High
                                </span>
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 pt-3 border-t border-purple-900/40 flex flex-wrap gap-2">
                    <span className="bg-[#241a33] text-purple-200 text-[11px] font-medium px-2.5 py-1 rounded-full border border-purple-700/40">
                      Typosquatting Check
                    </span>
                    <span className="bg-[#241a33] text-purple-200 text-[11px] font-medium px-2.5 py-1 rounded-full border border-purple-700/40">
                      Dependency Confusion
                    </span>
                    <span className="bg-[#241a33] text-purple-200 text-[11px] font-medium px-2.5 py-1 rounded-full border border-purple-700/40">
                      AST Behavior Scan
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* CARD 3: Map your dependencies to understand where risk comes from */}
          <div
            className={`transition-all duration-500 delay-200 ${
              isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-[25px] scale-[0.98]'
            }`}
          >
            <TiltCard maxTilt={1.0}>
              <div className="bg-[#1e172e] rounded-2xl border border-purple-500/20 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-purple-500/40 transition-all shadow-xl min-h-[420px]">
                <div className="mb-6 z-10">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-purple-100 transition-colors leading-snug">
                      Map dependencies to understand where risk comes from
                    </h3>
                    <span className="text-purple-300 text-xl font-bold transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                  </div>
                </div>

                {/* Graph Flow with depth and gentle risk node pulse */}
                <div className="w-full h-64 sm:h-56 bg-[#120e1c] rounded-xl border border-purple-800/40 relative flex items-center justify-center overflow-hidden p-4 sm:p-6">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.08),transparent_70%)] pointer-events-none"></div>
                  <div className="relative w-full flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-2 z-10 max-w-lg">
                    {/* Node 1 */}
                    <div className="bg-[#211833] border border-purple-500/30 rounded-lg px-3 py-2 text-center shadow-lg min-w-[100px] flex-1">
                      <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider block">Source</span>
                      <span className="text-xs font-bold text-white whitespace-nowrap">Your Repository</span>
                    </div>

                    {/* Connector 1 */}
                    <div className="text-purple-400 font-bold text-sm hidden sm:block">→</div>
                    <div className="text-purple-400 font-bold text-xs sm:hidden">↓</div>

                    {/* Node 2 */}
                    <div className="bg-[#241c38] border border-purple-500/30 rounded-lg px-3 py-2 text-center shadow-lg min-w-[100px] flex-1">
                      <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider block">Direct</span>
                      <span className="text-xs font-bold text-white whitespace-nowrap">Direct Dependency</span>
                    </div>

                    {/* Connector 2 */}
                    <div className="text-purple-400 font-bold text-sm hidden sm:block">→</div>
                    <div className="text-purple-400 font-bold text-xs sm:hidden">↓</div>

                    {/* Node 3 */}
                    <div className="bg-[#271d3d] border border-purple-500/30 rounded-lg px-3 py-2 text-center shadow-lg min-w-[100px] flex-1">
                      <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider block">Transitive</span>
                      <span className="text-xs font-bold text-white whitespace-nowrap">Transitive Level 2+</span>
                    </div>

                    {/* Connector 3 */}
                    <div className="text-rose-400 font-bold text-sm hidden sm:block">→</div>
                    <div className="text-rose-400 font-bold text-xs sm:hidden">↓</div>

                    {/* Node 4 (Highlighted Risk Node with gentle, non-aggressive pulse) */}
                    <div className="relative bg-gradient-to-br from-rose-950/80 to-[#2a1226] border-2 border-[#ff2a85] rounded-lg px-3 py-2 text-center shadow-xl shadow-pink-600/30 min-w-[100px] flex-1 threat-node-pulse">
                      <span className="text-[10px] font-mono text-rose-300 uppercase tracking-wider block font-bold">Threat Detected</span>
                      <span className="text-xs font-extrabold text-white whitespace-nowrap flex items-center justify-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a85]"></span>Security Risk
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* CARD 4: Turn security findings into prioritized remediation */}
          <div
            className={`transition-all duration-500 delay-250 ${
              isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-[25px] scale-[0.98]'
            }`}
          >
            <TiltCard maxTilt={1.0}>
              <div className="bg-[#1e172e] rounded-2xl border border-purple-500/20 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-purple-500/40 transition-all shadow-xl min-h-[420px]">
                <div className="mb-6 z-10">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-purple-100 transition-colors leading-snug">
                      Prioritized Remediation & Risk Categories
                    </h3>
                    <span className="text-purple-300 text-xl font-bold transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                  </div>
                </div>

                <div className="w-full bg-[#161122] border border-purple-500/40 rounded-xl p-4 sm:p-5 shadow-2xl relative z-10">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-900/40">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm font-sans tracking-tight">Authoritative Risk Score</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="bg-purple-900/40 border border-purple-500/30 text-purple-200 font-mono font-bold px-2.5 py-0.5 rounded text-xs">
                        {score} / 100
                      </span>
                    </div>
                  </div>

                  {/* Real Severity Counts Progress bars */}
                  <div className="space-y-2.5 text-xs">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-rose-400 font-semibold">CRITICAL</span>
                        <span className="text-rose-300 font-bold">{severityCounts.Critical ?? 0}</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden flex">
                        <div
                          className="bg-rose-500 h-full rounded-full shadow-sm shadow-rose-500/50 transition-all duration-700 ease-out"
                          style={{ width: isInView ? `${critBarWidth}%` : '0%' }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-amber-400 font-semibold">HIGH</span>
                        <span className="text-amber-300 font-bold">{severityCounts.High ?? 0}</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden flex">
                        <div
                          className="bg-amber-400 h-full rounded-full shadow-sm shadow-amber-400/50 transition-all duration-700 ease-out delay-100"
                          style={{ width: isInView ? `${highBarWidth}%` : '0%' }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-yellow-400 font-semibold">MEDIUM</span>
                        <span className="text-yellow-300 font-bold">{severityCounts.Medium ?? 0}</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden flex">
                        <div
                          className="bg-yellow-400 h-full rounded-full shadow-sm shadow-yellow-400/50 transition-all duration-700 ease-out delay-150"
                          style={{ width: isInView ? `${medBarWidth}%` : '0%' }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Category Scores Grid (Requirement 11) */}
                  <div className="pt-3 mt-3 border-t border-purple-900/40">
                    <div className="text-[11px] font-mono text-purple-300/80 uppercase mb-2">CATEGORY RISK RATINGS</div>
                    <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                      <div className="bg-[#211833] px-2 py-1 rounded border border-purple-800/30 flex justify-between">
                        <span className="text-neutral-400">Vulnerabilities</span>
                        <span className="text-white font-bold">{categoryScores.vulnerabilities ?? 80}/100</span>
                      </div>
                      <div className="bg-[#211833] px-2 py-1 rounded border border-purple-800/30 flex justify-between">
                        <span className="text-neutral-400">Supply Chain</span>
                        <span className="text-white font-bold">{categoryScores.supply_chain_behavior ?? 85}/100</span>
                      </div>
                      <div className="bg-[#211833] px-2 py-1 rounded border border-purple-800/30 flex justify-between">
                        <span className="text-neutral-400">Integrity</span>
                        <span className="text-white font-bold">{categoryScores.dependency_integrity ?? 84}/100</span>
                      </div>
                      <div className="bg-[#211833] px-2 py-1 rounded border border-purple-800/30 flex justify-between">
                        <span className="text-neutral-400">Reputation</span>
                        <span className="text-white font-bold">{categoryScores.reputation ?? 92}/100</span>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Actions list */}
                  <div className="pt-3 mt-3 border-t border-purple-900/40">
                    <div className="text-[11px] font-mono text-purple-300/80 uppercase mb-2">PRIORITIZED REMEDIATIONS</div>
                    <div className="space-y-1.5 font-mono text-xs">
                      {findings.length > 0 ? (
                        findings.slice(0, 3).map((f, idx) => (
                          <div
                            key={idx}
                            onClick={() => onSelectFinding && onSelectFinding(f)}
                            className="flex items-center justify-between text-neutral-200 bg-[#211833] px-2.5 py-1.5 rounded border border-purple-800/30 cursor-pointer hover:border-purple-500/40 transition-colors"
                          >
                            <span className="truncate mr-2">
                              <span className="text-emerald-400 font-bold mr-1">↑</span> {f.remediation || `Fix ${f.package}`}
                            </span>
                            <span className="text-[11px] text-purple-300 font-sans flex-shrink-0">
                              {f.priority || 'P2'}
                            </span>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="flex items-center justify-between text-neutral-200 bg-[#211833] px-2.5 py-1.5 rounded border border-purple-800/30">
                            <span>
                              <span className="text-emerald-400 font-bold mr-1">↑</span> Upgrade package-x
                            </span>
                            <span className="text-[11px] text-purple-300 font-sans">Fixes critical</span>
                          </div>
                          <div className="flex items-center justify-between text-neutral-200 bg-[#211833] px-2.5 py-1.5 rounded border border-purple-800/30">
                            <span>
                              <span className="text-amber-400 font-bold mr-1">↑</span> Verify package-y
                            </span>
                            <span className="text-[11px] text-purple-300 font-sans">Review integrity</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  )
}
