"use client"

import Image from "next/image"
import { Users, User, ArrowRight } from "lucide-react"
import { useFadeIn } from "@/hooks/use-fade-in"
import { img } from "@/lib/utils"

const courses = [
  {
    image: "/_DSC1443-3.jpg",
    title: "Matten Pilates",
    subtitle: "Gruppenkurse",
    icon: Users,
    description:
      "Klassischer Pilates Unterricht auf der Matte in kleinen Gruppen.",
    features: ["Beginner & Intermediate"]
  },
  {
    image: "/IMG_7172.JPG",
    title: "Reformer Pilates",
    subtitle: "Einzeltraining",
    icon: User,
    description:
      "35 Minuten Reformer-Training, gefolgt von 15 Minuten individuellem Training auf der Matte oder mit Kleingeräten.",
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
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance">
            Meine Angebote
          </h2>
        </div>

        <div className="space-y-6 lg:space-y-12">
          {/* Reformer Pilates - Größer */}
          <div
            id="reformer"
            className={`group bg-card rounded-[2.5rem] border border-border hover:bg-foreground hover:border-foreground transition-all duration-500 overflow-hidden w-full scroll-mt-24 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: isVisible ? "0ms" : "0ms" }}
          >
            {(() => {
              const course = courses[1]
              return (
                <>
                  <div className="relative aspect-[21/9] overflow-hidden">
                    <Image
                      src={img(course.image)}
                      alt={course.title}
                      fill
                      sizes="100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                    
                    <div className="absolute top-6 left-6 bg-card/95 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-3 shadow-lg group-hover:bg-foreground/90 transition-colors duration-500">
                      <course.icon className="w-5 h-5 text-primary group-hover:text-card transition-colors duration-500" />
                      <span className="text-base font-medium text-foreground group-hover:text-card transition-colors duration-500">
                        {course.subtitle}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 md:p-10">
                    <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-4 group-hover:text-card transition-colors duration-500">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground mb-8 leading-relaxed group-hover:text-card/70 transition-colors duration-500">
                      {course.description}
                    </p>
                    <div className="mb-8">
                     
                      
                      <div className="flex flex-wrap gap-3">
                      
                        
                        <span className="px-4 py-2 rounded-full bg-muted text-sm text-muted-foreground group-hover:bg-card/10 group-hover:text-card/70 transition-colors duration-500">
                         50 Minuten
                        </span>
                        
                        <span className="px-4 py-2 rounded-full bg-muted text-sm text-muted-foreground group-hover:bg-card/10 group-hover:text-card/70 transition-colors duration-500">
                         Personalisisert
                        </span>
                        
                       
                        
                      </div>
                    </div>
                    
                   
                  </div>
                </>
              )
            })()}
          </div>

          {/* Matten Pilates - Gleiche Breite, aber niedriger */}
          <div
            className={`transition-all duration-500 ${
              isVisible ? "opacity-95 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
          >
          <div id="matten" className="group bg-card rounded-[2.5rem] border border-border hover:bg-foreground hover:border-foreground transition-all duration-500 overflow-hidden w-full scroll-mt-24">
            {(() => {
              const course = courses[0]
              return (
                <div className="flex flex-col lg:flex-row">
                  <div className="relative lg:w-2/5 aspect-[16/9] lg:aspect-auto lg:h-auto overflow-hidden">
                    <Image
                      src={img(course.image)}
                      alt={course.title}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent lg:bg-gradient-to-r lg:from-foreground/30 lg:to-transparent" />
                    
                    <div className="absolute top-6 left-6 bg-card/95 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-3 shadow-lg group-hover:bg-foreground/90 transition-colors duration-500">
                      <course.icon className="w-5 h-5 text-primary group-hover:text-card transition-colors duration-500" />
                      <span className="text-base font-medium text-foreground group-hover:text-card transition-colors duration-500">
                        {course.subtitle}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 lg:w-3/5 flex flex-col justify-center">
                    <h3 className="font-serif text-2xl md:text-1xl text-foreground mb-3 group-hover:text-card transition-colors duration-500">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-card/70 transition-colors duration-500">
                      {course.description}
                    </p>
                    
                    <div className="mb-6">
                      
                      
                      <div className="flex flex-wrap gap-3">
                        {course.features.map((feature, i) => (
                          <span 
                            key={i} 
                            className="px-4 py-2 rounded-full bg-muted text-sm text-muted-foreground group-hover:bg-card/10 group-hover:text-card/70 transition-colors duration-500"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-3 text-foreground font-medium group/link group-hover:text-card transition-colors duration-500"
                    >
                     
                     
                    </a>
                  </div>
                </div>
              )
            })()}
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
