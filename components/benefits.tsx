"use client"

import { Activity, Smile, StretchVertical as Stretching, Brain, Heart, Dumbbell } from "lucide-react"
import { useFadeIn } from "@/hooks/use-fade-in"

const benefits = [
  {
    icon: Activity,
    title: "Ruckenprobleme lindern",
    description: "Starkt die Tiefenmuskulatur und unterstutzt eine gesunde Wirbelsaule.",
  },
  {
    icon: Smile,
    title: "Haltung verbessern",
    description: "Korrigiert muskulare Dysbalancen und fordert eine aufrechte Korperhaltung.",
  },
  {
    icon: Stretching,
    title: "Flexibilitat steigern",
    description: "Sanfte Dehnungen erhohen die Beweglichkeit und beugen Verletzungen vor.",
  },
  {
    icon: Brain,
    title: "Stress abbauen",
    description: "Bewusste Atmung und fliessende Bewegungen beruhigen Korper und Geist.",
  },
  {
    icon: Heart,
    title: "Korperbewusstsein fordern",
    description: "Lernen Sie, Ihren Korper besser zu verstehen und achtsam zu bewegen.",
  },
  {
    icon: Dumbbell,
    title: "Kraft aufbauen",
    description: "Ganzheitliches Training fur eine starke Korpermitte und mehr Stabilitat.",
  },
]

export function Benefits() {
  const { ref, isVisible } = useFadeIn()

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-foreground/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-foreground/5 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div>
            <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4">
              Vorteile
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground text-balance">
              Warum Pilates?
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md md:text-right">
            Mehr als nur ein Workout – eine ganzheitliche Methode 
            fur korperliches und mentales Wohlbefinden.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 80}ms` : "0ms" }}
            >
              <div className="group relative bg-primary/5 p-8 rounded-[2rem] border border-primary/20 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:bg-primary/10 hover:scale-[1.02] transition-all duration-250">
                <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center group-hover:bg-primary/10 transition-all duration-300">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
