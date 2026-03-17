"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { img } from "@/lib/utils"
import { Highlighter } from "@/components/ui/highlighter"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showReformer, setShowReformer] = useState(false)
  const [showSeparator, setShowSeparator] = useState(false)
  const [showMatten, setShowMatten] = useState(false)
  const [showHighlight, setShowHighlight] = useState(false)

  const [showPilates, setShowPilates] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const t0 = setTimeout(() => setShowPilates(true), 500)
    const t1 = setTimeout(() => setShowReformer(true), 1000)
    const t2 = setTimeout(() => setShowSeparator(true), 1300)
    const t3 = setTimeout(() => setShowMatten(true), 1500)
    const t4 = setTimeout(() => setShowHighlight(true), 800)
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className={`absolute inset-0 z-0 transition-all duration-1500 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}>
        <Image
          src={img("/startPicture.JPG")}
          alt="Pilates Studio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/30 to-foreground/60" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-3xl">
          <div
            className="mb-6 font-serif text-5xl md:text-7xl lg:text-8xl text-card leading-[1.1] transition-all duration-1000 ease-out"
            style={{
              opacity: showPilates ? 1 : 0,
              transform: showPilates ? "translateY(0)" : "translateY(-20px)",
              filter: showPilates ? "blur(0px)" : "blur(12px)",
            }}
          >
            {showHighlight ? (
              <Highlighter
                action="highlight"
                color="#8fac8f"
                animationDuration={800}
                iterations={1}
                multiline={false}
              
              >
                Pilates
              </Highlighter>
            ) : (
              "Pilates"
            )}
          </div>

          <div className="font-serif text-3xl md:text-4xl lg:text-6xl text-card leading-[1.1] flex flex-wrap items-baseline gap-x-4 md:gap-x-6">
            <a
              href="#reformer"
              className="transition-all duration-1000 ease-out hover:text-primary"
              style={{
                opacity: showReformer ? 1 : 0,
                transform: showReformer ? "translateY(0)" : "translateY(-20px)",
                filter: showReformer ? "blur(0px)" : "blur(12px)",
              }}
            >
              Reformer Stunden &
            </a>
            <div className="basis-full h-0" />
            <a
              href="#matten"
              className="transition-all duration-1000 ease-out hover:text-primary"
              style={{
                opacity: showMatten ? 1 : 0,
                transform: showMatten ? "translateY(0)" : "translateY(-20px)",
                filter: showMatten ? "blur(0px)" : "blur(12px)",
              }}
            >
              Matten Kurse
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
