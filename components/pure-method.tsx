"use client"

import { useFadeIn } from "@/hooks/use-fade-in"

const principles = [
  {
    number: "01",
    title: "Zentrierung",
    description: "Alle Bewegungen starten aus der Korpermitte – dem sogenannten Powerhouse.",
  },
  {
    number: "02",
    title: "Konzentration",
    description: "Volle Aufmerksamkeit auf jede Bewegung fur maximale Wirkung und Sicherheit.",
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
    description: "Qualitat vor Quantitat – jede Ubung wird technisch sauber ausgefuhrt.",
  },
  {
    number: "06",
    title: "Fluss",
    description: "Fliessende, harmonische Ubergange zwischen den Ubungen fur ein ganzheitliches Training.",
  },
]

export function PureMethod() {
  const { ref, isVisible } = useFadeIn()

  return (
    <section id="method" ref={ref} className="py-24 md:py-32 bg-secondary text-foreground relative overflow-hidden">
     
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className={`max-w-2xl mb-20 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4">
            Philosophie
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
            Die <span className="italic">Pure Pilates</span> Methode
          </h2>
          <p className="text-muted-foreground text-lg">
            Basierend auf den sechs klassischen Prinzipien von Joseph Pilates, 
            kombiniert mit modernen Erkenntnissen der Bewegungswissenschaft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {principles.map((principle, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-[2rem] border border-border hover:border-primary/30 hover:bg-card/50 transition-all duration-500 bg-card ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
            >
              <span className="absolute top-6 right-6 text-primary/30 font-serif text-5xl font-light group-hover:text-primary/50 transition-colors">
                {principle.number}
              </span>
              <div className="pt-8">
                <h3 className="font-serif text-2xl md:text-3xl mb-4 group-hover:text-primary transition-colors">
                  {principle.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
