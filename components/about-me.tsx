"use client"

import Image from "next/image"
import { useFadeIn } from "@/hooks/use-fade-in"
import { img } from "@/lib/utils"
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
                src={img("/GalleryPictures/IMG_8074.JPG")}
                alt="Karin Wagner-Zimmermann"
                fill
                className="object-cover"
              />
            </div>
            
           
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
                Bewegung ist meine Leidenschaft und begleitet mich seit vielen Jahren. Nach meiner Tanzausbildung in Konstanz war ich als Tanzlehrerin tätig und arbeite beruflich als Grundschullehrerin unteranderem im Fachbereich Sport.
              </p>
              <p className="text-lg">
                Seit 2011 bin ich zertifizierte Peak Pilates Matten-Trainerin und bringe über zehn Jahre Erfahrung im Matten-Pilates mit. Seit März 2024 vertiefe ich mein Wissen weiter mit der Studio und Geräteausbildung nach der Romana's Pilates Methode – mit großer Freude daran, Menschen achtsam, kraftvoll und mit Präzision zu unterrichten.
              </p>
            </div>
   
          </div>
        </div>
      </div>
    </section>
  )
}
