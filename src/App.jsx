import React, { useState } from 'react'
import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import EcosystemGrid from './components/EcosystemGrid'
import ThreatDetectionSection from './components/ThreatDetectionSection'
import ProofPointsSection from './components/ProofPointsSection'
import FindingDetailModal from './components/FindingDetailModal'

export default function App() {
  const [scanState, setScanState] = useState('IDLE') // 'IDLE' | 'STARTING' | 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'FAILED'
  const [scanId, setScanId] = useState(null)
  const [progress, setProgress] = useState(0)
  const [currentStage, setCurrentStage] = useState('')
  const [error, setError] = useState(null)
  const [scanResults, setScanResults] = useState(null)
  const [selectedFinding, setSelectedFinding] = useState(null)

  const handleScanCompleted = (results) => {
    setScanResults(results)
    setScanState('COMPLETED')
    setProgress(100)
    setCurrentStage('Analysis complete')
  }

  const handleQuickScan = (repoUrl) => {
    const el = document.getElementById('scan')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-[#16131c] text-white font-sans antialiased overflow-x-hidden selection:bg-[#ff2a85] selection:text-white min-h-screen">
      <AnnouncementBar />
      <Navbar onQuickScan={handleQuickScan} />

      <HeroSection
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
        onScanCompleted={handleScanCompleted}
        scanResults={scanResults}
        onSelectFinding={(finding) => setSelectedFinding(finding)}
      />

      <EcosystemGrid />

      <ThreatDetectionSection
        scanResults={scanResults}
        onSelectFinding={(finding) => setSelectedFinding(finding)}
      />

      <ProofPointsSection />

      {/* Authoritative Finding Detail Modal (All 13 attributes + raw evidence) */}
      {selectedFinding && (
        <FindingDetailModal
          finding={selectedFinding}
          onClose={() => setSelectedFinding(null)}
        />
      )}
    </div>
  )
}
