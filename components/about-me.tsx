"use client"

import Image from "next/image"
import { useFadeIn } from "@/hooks/use-fade-in"
import { Award, Heart, Sparkles, GraduationCap } from "lucide-react"

const stats = [
  { icon: Sparkles, value: "15+", label: "Jahre Erfahrung" },
  { icon: Heart, value: "500+", label: "Zufriedene Kunden" },
  { icon: Award, value: "4", label: "Zertifizierungen" },
]

export function AboutMe() {
  const { ref, isVisible } = useFadeIn()

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className={`relative order-2 lg:order-1 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}>
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden">
              <Image

src="/karin.jpeg"
                alt="Karin Wagner-Zimmermann"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Stats overlay 
            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-12 bg-card rounded-[2rem] p-6 shadow-2xl shadow-primary/10">
              <div className="flex gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="font-serif text-2xl text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>*/}
          </div>

          {/* Content */}
          <div className={`order-1 lg:order-2 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 text-balance">
               <span className="italic">Karin Wagner-Zimmermann</span>
            </h2>
            
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Bewegung ist meine Leidenschaft und begleitet mich seit vielen Jahren. Nach meiner Tanzausbildung in Konstanz war ich lange Zeit als Tanzlehrerin tätig und arbeite seitdem beruflich als Grundschullehrerin im Fachbereich Sport.
              </p>
              <p className="text-lg">
                Seit 2011 bin ich zertifizierte Peak Pilates Matten-Trainerin und bringe über zehn Jahre Erfahrung im Matten-Pilates mit. Seit März 2024 vertiefe ich mein Wissen weiter mit der Studio- und Geräteausbildung nach der Romana's Pilates Methode – mit großer Freude daran, Menschen achtsam, kraftvoll und mit Präzision zu unterrichten.
              </p>
            </div>
   {/*
            <div className="mt-10 p-6 bg-card rounded-[1.5rem] border border-border">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h3 className="font-serif text-lg text-foreground">Zertifizierungen</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Peak Pilates Matten-Trainerin (seit 2011)
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Romana's Pilates Methode (seit März 2024)
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Tanzausbildung Konstanz
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Grundschullehrerin Sport
                </div>
              </div>
            </div> 
   */}
          </div>
        </div>
      </div>
    </section>
  )
}
