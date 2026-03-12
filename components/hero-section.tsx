"use client"

import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { img } from "@/lib/utils"

const QUOTE_CHARS = `"It is the mind itself which builds the `
const HIGHLIGHT = "Body"
const QUOTE_END = ` "`

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [charIndex, setCharIndex] = useState(0)
  const totalChars = QUOTE_CHARS.length + HIGHLIGHT.length + QUOTE_END.length
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setIsLoaded(true)

    const startDelay = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setCharIndex((prev) => {
          if (prev >= totalChars) {
            if (intervalRef.current) clearInterval(intervalRef.current)
            return totalChars
          }
          return prev + 1
        })
      }, 30)
    }, 600)

    return () => {
      clearTimeout(startDelay)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [totalChars])

  const renderQuote = () => {
    const part1End = QUOTE_CHARS.length
    const part2End = part1End + HIGHLIGHT.length
    const visiblePart1 = QUOTE_CHARS.slice(0, Math.min(charIndex, part1End))
    const visiblePart2 = charIndex > part1End
      ? HIGHLIGHT.slice(0, Math.min(charIndex - part1End, HIGHLIGHT.length))
      : ""
    const visiblePart3 = charIndex > part2End
      ? QUOTE_END.slice(0, charIndex - part2End)
      : ""

    return (
      <>
        {visiblePart1}
        {visiblePart2 && (
          <span className="italic text-primary">{visiblePart2}</span>
        )}
        {visiblePart3}
        {charIndex < totalChars && (
          <span className="inline-block w-[3px] h-[0.85em] bg-card/80 align-baseline ml-0.5 animate-blink" />
        )}
      </>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className={`absolute inset-0 z-0 transition-all duration-1500 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}>
        <Image
          src={img("/youngWoman.JPG")}
          alt="Pilates Studio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/30 to-foreground/60" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-3xl">
          <blockquote className="mb-10">
            <p className="font-serif text-4xl md:text-5xl lg:text-7xl text-card leading-[1.1] text-balance min-h-[1.1em]">
              {renderQuote()}
            </p>
          </blockquote>

          <p className={`text-card/70 text-lg md:text-xl font-serif mb-12 transition-all duration-700 ${
            charIndex >= totalChars ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            — Joseph Pilates
          </p>
        </div>
      </div>
    </section>
  )
}
