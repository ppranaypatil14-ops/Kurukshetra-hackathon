import React, { useState, useRef } from 'react'
import { startGitHubScan, startZipScan, getScanStatus, getScanResults } from '../services/api'

export default function ScanController({
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
}) {
  const [scanMethod, setScanMethod] = useState('github') // 'github' | 'zip'
  const [githubUrl, setGithubUrl] = useState('https://github.com/octocat/Hello-World')
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef(null)
  const pollIntervalRef = useRef(null)

  const isScanning = ['STARTING', 'QUEUED', 'RUNNING'].includes(scanState)

  const stopPolling = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current)
      pollIntervalRef.current = null
    }
  }

  const pollScan = (id) => {
    stopPolling()
    pollIntervalRef.current = setInterval(async () => {
      try {
        const statusData = await getScanStatus(id)
        if (statusData.status) {
          setScanState(statusData.status)
        }
        if (typeof statusData.progress === 'number') {
          setProgress(statusData.progress)
        }
        if (statusData.current_stage) {
          setCurrentStage(statusData.current_stage)
        }

        if (statusData.status === 'COMPLETED') {
          stopPolling()
          // Fetch authoritative full results separately
          const fullResults = await getScanResults(id)
          onScanCompleted(fullResults)
        } else if (statusData.status === 'FAILED') {
          stopPolling()
          setError(statusData.error || 'Security scan failed on the backend.')
        }
      } catch (err) {
        // network retry
        console.warn('Poll status error:', err)
      }
    }, 1000)
  }

  const handleStartScan = async (e) => {
    if (e) e.preventDefault()
    if (isScanning) return

    setError(null)
    setScanState('STARTING')
    setProgress(0)
    setCurrentStage('Connecting to backend...')

    try {
      let result
      if (scanMethod === 'github') {
        if (!githubUrl.trim()) {
          setError('Please provide a valid GitHub repository URL.')
          setScanState('IDLE')
          return
        }
        result = await startGitHubScan(githubUrl.trim())
      } else {
        if (!selectedFile) {
          setError('Please select a repository ZIP archive to upload.')
          setScanState('IDLE')
          return
        }
        result = await startZipScan(selectedFile)
      }

      const newScanId = result.scan_id
      setScanId(newScanId)
      setScanState(result.status || 'QUEUED')
      setCurrentStage(result.status === 'QUEUED' ? 'Waiting for analysis...' : 'Starting analysis...')
      pollScan(newScanId)
    } catch (err) {
      setScanState('FAILED')
      setError(err.message || 'Failed to trigger scan. Ensure backend is running.')
      stopPolling()
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.name.endsWith('.zip')) {
        setError('Please upload a valid .zip repository archive.')
        return
      }
      setSelectedFile(file)
      setError(null)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      if (!file.name.endsWith('.zip')) {
        setError('Please upload a valid .zip repository archive.')
        return
      }
      setSelectedFile(file)
      setError(null)
    }
  }

  return (
    <div id="scan" className="w-full max-w-2xl mt-8">
      {/* Method Tabs */}
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          onClick={() => {
            if (!isScanning) setScanMethod('github')
          }}
          disabled={isScanning}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
            scanMethod === 'github'
              ? 'bg-white text-black shadow-lg shadow-white/10'
              : 'bg-[#221a32] text-neutral-300 hover:text-white hover:bg-[#2c2242]'
          } ${isScanning ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          GitHub Repository
        </button>

        <button
          type="button"
          onClick={() => {
            if (!isScanning) setScanMethod('zip')
          }}
          disabled={isScanning}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
            scanMethod === 'zip'
              ? 'bg-white text-black shadow-lg shadow-white/10'
              : 'bg-[#221a32] text-neutral-300 hover:text-white hover:bg-[#2c2242]'
          } ${isScanning ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          ZIP Archive Upload
        </button>
      </div>

      {/* Main Input Bar */}
      <form onSubmit={handleStartScan} className="relative">
        {scanMethod === 'github' ? (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-[#201831] border border-purple-500/30 rounded-2xl p-2 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-500/20 shadow-2xl transition-all">
            <div className="flex items-center flex-1 px-3 py-2">
              <svg className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                disabled={isScanning}
                placeholder="https://github.com/organization/repository"
                className="w-full bg-transparent border-0 text-sm text-white placeholder-purple-300/40 focus:outline-none focus:ring-0 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isScanning || !githubUrl.trim()}
              className="mt-2 sm:mt-0 flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff2a85] to-[#d946ef] hover:opacity-95 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-pink-600/30"
            >
              {isScanning ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>Scan Repository</span>
                  <span className="text-white font-bold">→</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragOver(true)
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col sm:flex-row items-center justify-between bg-[#201831] border ${
              isDragOver ? 'border-[#ff2a85] bg-[#2a1d42]' : 'border-purple-500/30'
            } rounded-2xl p-3 cursor-pointer hover:border-purple-400 transition-all shadow-2xl`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".zip"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex items-center gap-3 px-3 py-1.5 flex-1 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-purple-900/50 flex items-center justify-center text-purple-300 flex-shrink-0">
                📦
              </div>
              <div className="overflow-hidden">
                {selectedFile ? (
                  <div>
                    <div className="text-sm font-bold text-white truncate">{selectedFile.name}</div>
                    <div className="text-xs text-purple-300/80 font-mono">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · Ready to analyze
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-sm font-semibold text-white">Choose or drop repository ZIP</div>
                    <div className="text-xs text-purple-300/70">Supports full source codebase archives</div>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleStartScan(e)
              }}
              disabled={isScanning || !selectedFile}
              className="w-full sm:w-auto mt-2 sm:mt-0 flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff2a85] to-[#d946ef] hover:opacity-95 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-pink-600/30"
            >
              {isScanning ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>Analyze ZIP</span>
                  <span className="text-white font-bold">↑</span>
                </>
              )}
            </button>
          </div>
        )}
      </form>

      {/* Error Message */}
      {error && (
        <div className="mt-3 p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-rose-300 text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <span>⚠</span>
            <span>{error}</span>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-rose-400 hover:text-rose-200 font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Active Scan Progress / Stage Card */}
      {scanState !== 'IDLE' && (
        <div className="mt-4 p-4 bg-[#1e162e]/90 border border-purple-500/30 rounded-2xl shadow-xl space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  scanState === 'COMPLETED'
                    ? 'bg-emerald-400'
                    : scanState === 'FAILED'
                    ? 'bg-rose-500'
                    : 'bg-[#ff2a85] animate-ping'
                }`}
              ></span>
              <span className="font-mono font-bold uppercase tracking-wider text-purple-200">
                {scanState}
              </span>
              {scanId && (
                <span className="text-[11px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                  ID: {scanId}
                </span>
              )}
            </div>
            <span className="font-mono font-bold text-white text-sm">
              {progress}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#110c1c] h-2.5 rounded-full overflow-hidden p-0.5 border border-purple-900/60">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                scanState === 'COMPLETED'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm shadow-emerald-500/50'
                  : scanState === 'FAILED'
                  ? 'bg-rose-500'
                  : 'bg-gradient-to-r from-[#ff2a85] to-[#a855f7] shadow-sm shadow-pink-500/50'
              }`}
              style={{ width: `${Math.max(progress, scanState === 'QUEUED' ? 5 : 0)}%` }}
            ></div>
          </div>

          {/* Stage text directly from backend */}
          <div className="flex items-center justify-between text-xs text-neutral-300">
            <span className="font-mono truncate">{currentStage || 'Processing...'}</span>
            {scanState === 'COMPLETED' && (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                ✓ Authoritative Results Loaded
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
