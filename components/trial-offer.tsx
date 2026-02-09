"use client"

import { useFadeIn } from "@/hooks/use-fade-in"

export function TrialOffer() {
  const { ref, isVisible } = useFadeIn()

  return (
    <section 
      ref={ref}
      className={`py-12 md:py-16 bg-background transition-all duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            Schnupperstunde: <span className="text-foreground font-medium">15 EUR</span>
          </p>
        </div>
      </div>
    </section>
  )
}
