"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className={`absolute inset-0 z-0 transition-all duration-1500 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}>
        <Image
          src="/youngWoman.JPG"
          alt="Pilates Studio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/30 to-foreground/60" />
      </div>

      

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-3xl">
          
          
          <blockquote className={`mb-10 transition-all duration-700 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <p className="font-serif text-4xl md:text-5xl lg:text-7xl text-card leading-[1.1] text-balance">
              &ldquo;It is the mind itself which builds the {" "}
              <span className="italic text-primary">Body</span> &ldquo;
          
            </p>
          </blockquote>
          
          <p className={`text-card/70 text-lg md:text-xl font-serif mb-12 transition-all duration-700 delay-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            — Joseph Pilates
          </p>

         
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-700 delay-1100 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}>
      </div>
    </section>
  )
}
