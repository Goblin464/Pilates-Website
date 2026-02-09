"use client"

import Image from "next/image"
import { useFadeIn } from "@/hooks/use-fade-in"

const audiences = [
  {
    image: "/oldMan.JPG",
    title: "Jedes Alter",
    subtitle: "20 bis 80+",
    description: "Pilates passt sich Ihnen an, nicht umgekehrt.",
  },
  {
    image: "/youngWoman.JPG",
    title: "Jedes Fitnesslevel",
    subtitle: "Anfanger bis Profi",
    description: "Wir holen Sie dort ab, wo Sie stehen.",
  },
  {
    image: "/hands.JPG",
    title: "Jede Lebenssituation",
    subtitle: "Schwangerschaft & Reha",
    description: "Wir unterstutzen Sie in jeder Phase.",
  },
]

export function ForEveryone() {
  const { ref, isVisible } = useFadeIn()

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background relative">
      {/* Decorative top wave */}
      <div className="absolute -top-1 left-0 right-0 h-24 bg-background" style={{
        clipPath: "ellipse(70% 100% at 50% 0%)"
      }} />
      
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className={`text-center mb-20 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4">
            Fur jeden geeignet
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance">
            Pilates ist fur <span className="italic">alle</span> da
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {audiences.map((item, index) => (
            <div 
              key={index} 
              className={`group transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 150}ms` : "0ms" }}
            >
              <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-[2.5rem]">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-foreground/10 to-transparent" />
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-card">
                  <p className="text-primary text-sm uppercase tracking-wider mb-1">{item.subtitle}</p>
                  <h3 className="font-serif text-2xl md:text-3xl mb-2">{item.title}</h3>
                  <p className="text-card/80 text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
