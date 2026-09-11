import { useState, useEffect } from 'react'

/**
 * Lightweight scroll hook using requestAnimationFrame for subtle parallax depth.
 * Automatically disables on mobile screens / touch devices for maximum performance.
 */
export function useScrollParallax() {
  const [scrollY, setScrollY] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // Only enable parallax on desktop devices with hover support
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && window.matchMedia('(hover: hover)').matches)
    }

    checkIsDesktop()
    window.addEventListener('resize', checkIsDesktop)

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkIsDesktop)
    }
  }, [])

  return { scrollY, isDesktop }
}
