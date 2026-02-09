"use client"

import Image from "next/image"
import { Users, User, ArrowRight } from "lucide-react"
import { useFadeIn } from "@/hooks/use-fade-in"

const courses = [
  {
    image: "/yogamatte.jpg",
    title: "Matten Pilates",
    subtitle: "Gruppenkurse",
    icon: Users,
    description:
      "Klassisches Pilates auf der Matte in kleinen Gruppen. Ideal fur Einsteiger und alle, die die Grundlagen vertiefen mochten.",
    features: ["Max. 8 Teilnehmer", "Alle Level willkommen", "Inkl. Ausrustung"],
  },
  {
    image: "/refomrer.jpg.webp",
    title: "Reformer Pilates",
    subtitle: "Einzeltraining",
    icon: User,
    description:
      "Intensives Training am Reformer-Gerat fur prazise, gelenkschonende Bewegungen und schnelle Fortschritte.",
    features: ["1:1 Betreuung", "Individuelle Anpassung", "Moderne Gerate"],
  },
]

export function Courses() {
  const { ref, isVisible } = useFadeIn()

  return (
    <section id="courses" ref={ref} className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4">
            Kursangebot
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance">
            Meine Angebote
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className={`group bg-card rounded-[2.5rem] border border-border hover:border-primary/30 transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 150}ms` : "0ms" }}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-6 left-6 bg-card/95 backdrop-blur-sm px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg">
                  <course.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {course.subtitle}
                  </span>
                </div>
                
               
              </div>
              
              <div className="p-8 md:p-10">
                <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                  {course.title}
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {course.description}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  {course.features.map((feature, i) => (
                    <span 
                      key={i} 
                      className="px-4 py-2 rounded-full bg-muted text-sm text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 text-primary font-medium group/link"
                >
                  <span className="border-b border-primary/30 group-hover/link:border-primary transition-colors">
                    Mehr erfahren
                  </span>
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-primary-foreground transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
