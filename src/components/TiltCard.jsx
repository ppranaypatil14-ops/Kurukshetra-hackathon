import React, { useRef, useState } from 'react'

/**
 * TiltCard: Very subtle 1-degree 3D perspective tilt on desktop mouse movement.
 * Smooth return on mouse leave. Completely inert on mobile / touch.
 */
export default function TiltCard({ children, className = '', maxTilt = 1.0, style = {} }) {
  const cardRef = useRef(null)
  const [transformStyle, setTransformStyle] = useState('')

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Max 1 degree tilt
    const rotateX = (((y - centerY) / centerY) * -maxTilt).toFixed(2)
    const rotateY = (((x - centerX) / centerX) * maxTilt).toFixed(2)

    setTransformStyle(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
  }

  const handleMouseLeave = () => {
    setTransformStyle('perspective(800px) rotateX(0deg) rotateY(0deg)')
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{
        transform: transformStyle,
        ...style
      }}
    >
      {children}
    </div>
  )
}
