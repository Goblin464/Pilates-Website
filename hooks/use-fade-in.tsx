"use client"
import { useEffect, useRef, useState } from "react"

export function useFadeIn(threshold = 0.4) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() 
        }
      },
      { threshold }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  return { ref, isVisible }
}