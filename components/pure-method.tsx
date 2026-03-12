"use client"

import { useEffect, useRef, useState } from "react"
import { useFadeIn } from "@/hooks/use-fade-in"
import ScrollReveal from "@/components/ScrollReveal"


const principles = [
  {
    number: "01",
    title: "Zentrierung",
    description: "Alle Bewegungen starten aus der Körpermitte – dem sogenannten Powerhouse.",
  },
  {
    number: "02",
    title: "Konzentration",
    description: "Volle Aufmerksamkeit auf jede Bewegung.",
  },
  {
    number: "03",
    title: "Kontrolle",
    description: "Prazise, bewusste Bewegungen statt schneller, unkontrollierter Wiederholungen.",
  },
  {
    number: "04",
    title: "Atmung",
    description: "Die richtige Atemtechnik unterstutzt jede Bewegung und fordert die Entspannung.",
  },
  {
    number: "05",
    title: "Prazision",
    description: "Qualitat vor Quantitat – jede Ubung wird technisch exakt ausgeführt.",
  },
  {
    number: "06",
    title: "Fluss",
    description: "Fliessende, harmonische Ubergange zwischen den Ubungen fur ein ganzheitliches Training.",
  },
]

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [breakpoint])
  return isMobile
}

function FlipCard({ principle, index, isVisible, isMobile }: { principle: typeof principles[number]; index: number; isVisible: boolean; isMobile: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    if (!isMobile) return
    const el = cardRef.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const trigger = window.innerHeight * 0.55
      setFlipped(rect.top < trigger)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [isMobile])

  const shouldFlip = isMobile && flipped

  return (
    <div
      ref={cardRef}
      className={`group transition-all duration-500 [perspective:1000px] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
    >
      <div
        className="relative aspect-[3/4] max-w-[180px] mx-auto w-full [transform-style:preserve-3d] transition-transform duration-700 ease-in-out pointer-events-none group-hover:[transform:rotateY(180deg)]"
        style={shouldFlip ? { transform: "rotateY(180deg)" } : undefined}
      >
        {/* Front — white */}
        <div className="absolute inset-0 rounded-2xl border border-border bg-card flex items-center justify-center p-4 [backface-visibility:hidden]">
          <h3 className="font-serif text-base lg:text-lg text-foreground text-center">
            {principle.title}
          </h3>
        </div>
        {/* Back — black */}
        <div className="absolute inset-0 rounded-2xl bg-foreground flex flex-col items-center justify-center p-4 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <h3 className="font-serif text-base lg:text-lg mb-2 text-center text-card">
            {principle.title}
          </h3>
          <p className="leading-relaxed text-xs lg:text-sm text-center text-card/70">
            {principle.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function PureMethod() {
  const { ref, isVisible } = useFadeIn()
  const isMobile = useIsMobile()

  return (
    <section id="method" ref={ref} className="py-24 md:py-32 bg-background text-foreground relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className={`flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
              Die <span className="italic">klassische Pilates</span> Methode
            </h2>
            <p className="text-muted-foreground text-lg">
              Basierend auf den sechs klassischen Prinzipien von Joseph Pilates.
            </p>
          </div>

          <blockquote className="lg:max-w-xs lg:text-right shrink-0">
            <ScrollReveal
              baseOpacity={0}
              enableBlur
              blurStrength={4}
              textClassName="font-serif !text-xl md:!text-2xl lg:!text-3xl italic text-primary !font-normal"
            >
              {"\u201CIn 10 sessions you will feel the difference, in 20 you will see the difference, and in 30 you will have a whole new body.\u201D"}
            </ScrollReveal>
            <cite className="block mt-3 text-sm not-italic text-muted-foreground">
              — Joseph Pilates
            </cite>
          </blockquote>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-5 relative">
          {principles.map((principle, index) => (
            <FlipCard key={index} principle={principle} index={index} isVisible={isVisible} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  )
}
