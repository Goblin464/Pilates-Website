"use client"
import { useEffect, useRef, useState } from "react"

export function useFadeIn(threshold = 0.4) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const actualThreshold = isMobile ? 0.1 : threshold

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: actualThreshold }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}