import React from 'react'
import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import EcosystemGrid from './components/EcosystemGrid'
import ThreatDetectionSection from './components/ThreatDetectionSection'
import ProofPointsSection from './components/ProofPointsSection'

export default function App() {
  return (
    <div className="bg-[#16131c] text-white font-sans antialiased overflow-x-hidden selection:bg-[#ff2a85] selection:text-white min-h-screen">
      <AnnouncementBar />
      <Navbar />
      <HeroSection />
      <EcosystemGrid />
      <ThreatDetectionSection />
      <ProofPointsSection />
    </div>
  )
}
