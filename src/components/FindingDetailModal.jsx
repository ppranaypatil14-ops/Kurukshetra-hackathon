import React, { useEffect } from 'react'

export default function FindingDetailModal({ finding, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!finding) return null

  const getPriorityBadge = (prio) => {
    switch (prio) {
      case 'P0':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-rose-500/20'
      case 'P1':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-amber-500/20'
      case 'P2':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50 shadow-yellow-500/20'
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/50 shadow-slate-500/20'
    }
  }

  const getSeverityBadge = (sev) => {
    const s = (sev || '').toLowerCase()
    if (s === 'critical') return 'bg-rose-500 text-white'
    if (s === 'high') return 'bg-amber-500 text-white'
    if (s === 'medium') return 'bg-yellow-400 text-black'
    return 'bg-slate-400 text-black'
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#1d162b] border border-purple-500/40 rounded-2xl shadow-2xl shadow-purple-950/80 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-purple-800/40 flex items-start justify-between gap-4 bg-[#231a35]/60">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border shadow-sm ${getPriorityBadge(finding.priority)}`}>
                {finding.priority || 'P2'} Priority
              </span>
              <span className={`text-xs font-sans font-bold px-2.5 py-0.5 rounded-full ${getSeverityBadge(finding.severity)}`}>
                {finding.severity || 'Medium'}
              </span>
              <span className="text-xs font-mono bg-purple-900/40 text-purple-300 px-2 py-0.5 rounded border border-purple-700/40">
                Confidence: {finding.confidence || 'High'}
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                Depth: L{finding.dependency_depth ?? 1}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {finding.title || 'Security Finding'}
            </h3>
            <p className="text-xs text-purple-300/80 font-mono mt-1">
              Package: <span className="text-white font-bold">{finding.package}</span>
              {finding.file && ` · ${finding.file}:${finding.line || 1}`}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-[#151020] p-3 rounded-xl border border-purple-900/40">
              <div className="text-neutral-400 uppercase font-mono text-[10px]">Finding Type</div>
              <div className="text-white font-semibold mt-0.5">{finding.finding_type || 'Vulnerability'}</div>
            </div>
            <div className="bg-[#151020] p-3 rounded-xl border border-purple-900/40">
              <div className="text-neutral-400 uppercase font-mono text-[10px]">Engine Source</div>
              <div className="text-purple-200 font-semibold mt-0.5 truncate" title={finding.source}>
                {finding.source || 'Security Engine'}
              </div>
            </div>
            <div className="bg-[#151020] p-3 rounded-xl border border-purple-900/40">
              <div className="text-neutral-400 uppercase font-mono text-[10px]">Risk Contribution</div>
              <div className="text-rose-400 font-semibold mt-0.5">{finding.risk_contribution || 'Direct'}</div>
            </div>
            <div className="bg-[#151020] p-3 rounded-xl border border-purple-900/40">
              <div className="text-neutral-400 uppercase font-mono text-[10px]">Blast Radius</div>
              <div className="text-amber-300 font-semibold mt-0.5 truncate" title={finding.blast_radius}>
                {finding.blast_radius || 'Consuming modules'}
              </div>
            </div>
          </div>

          {/* Raw Evidence (Crucial: never replace with vague AI text) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-purple-300 uppercase tracking-wider font-bold">
                Authoritative Evidence
              </span>
              <span className="text-[11px] text-neutral-400 font-mono">
                Source AST / Detector Output
              </span>
            </div>
            <div className="bg-[#100c19] border border-purple-900/60 rounded-xl p-4 font-mono text-xs sm:text-sm text-neutral-200 overflow-x-auto shadow-inner">
              <pre className="whitespace-pre-wrap break-words">{finding.evidence || 'No raw evidence snippet attached.'}</pre>
            </div>
          </div>

          {/* Human-Readable Score Trace */}
          <div className="bg-[#181224] border border-purple-900/40 rounded-xl p-4">
            <div className="text-xs font-mono text-purple-300 uppercase tracking-wider font-bold mb-1.5">
              Score Trace & Decision Path
            </div>
            <p className="text-sm text-neutral-300 font-mono leading-relaxed">
              {finding.score_trace || 'Triggered heuristic pattern analysis with rule weight assignment.'}
            </p>
          </div>

          {/* Remediation Recommendations */}
          <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-4">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider font-bold mb-1.5">
              <span>🛡</span> Remediation Recommendation
            </div>
            <p className="text-sm text-emerald-100/90 leading-relaxed font-sans">
              {finding.remediation || 'Upgrade dependency to latest patched release or apply input sanitization.'}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#171122] border-t border-purple-800/40 flex items-center justify-between">
          <span className="text-xs text-neutral-400 font-mono">
            SupplyGuard Engine Verification Active
          </span>
          <button
            onClick={onClose}
            className="bg-white hover:bg-neutral-100 text-black font-bold text-xs px-5 py-2 rounded-full transition-all active:scale-95"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  )
}
