"use client"

import React from "react"
import { useState } from "react"
import { Phone, Mail, MapPin, Send, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useFadeIn } from "@/hooks/use-fade-in"
import { sendEmail } from "@/app/actions/send-email"
import dynamic from "next/dynamic"

const StudioMap = dynamic(
  () => import("@/components/studio-map").then((mod) => mod.StudioMap),
  { ssr: false }
)

export function ContactSection() {
  const { ref, isVisible } = useFadeIn()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const result = await sendEmail(formData)

    setIsSubmitting(false)
    if (result.success) {
      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", message: "" })
    } else {
      setError(result.error || "Ein Fehler ist aufgetreten.")
    }
  }

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-foreground/5 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className={`text-center mb-20 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance">
            Schreiben Sie <span className="italic">mir</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Contact Info */}
          <div className={`lg:col-span-2 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}>
            <div className="space-y-6">
              <a href="tel:+491234567890" className="contact-card relative flex items-center gap-5 p-5 bg-card rounded-[1.5rem] border border-border overflow-hidden group hover:bg-foreground hover:border-foreground transition-all duration-500">
                <div className="contact-icon relative flex-shrink-0 w-14 h-14 bg-foreground/5 rounded-2xl flex items-center justify-center group-hover:bg-card/20 [transform-style:preserve-3d] transition-colors duration-500">
                  <Phone className="w-6 h-6 text-foreground group-hover:text-card transition-colors duration-500" />
                </div>
                <div className="relative">
                  <p className="text-muted-foreground text-sm group-hover:text-card/60 transition-colors duration-500">Telefon</p>
                  <p className="text-foreground font-medium group-hover:text-card transition-colors duration-500">+49 123 456 7890</p>
                </div>
              </a>

              <a href="mailto:info@pure-pilates.de" className="contact-card relative flex items-center gap-5 p-5 bg-card rounded-[1.5rem] border border-border overflow-hidden group hover:bg-foreground hover:border-foreground transition-all duration-500">
                <div className="contact-icon relative flex-shrink-0 w-14 h-14 bg-foreground/5 rounded-2xl flex items-center justify-center group-hover:bg-card/20 [transform-style:preserve-3d] transition-colors duration-500">
                  <Mail className="w-6 h-6 text-foreground group-hover:text-card transition-colors duration-500" />
                </div>
                <div className="relative">
                  <p className="text-muted-foreground text-sm group-hover:text-card/60 transition-colors duration-500">E-Mail</p>
                  <p className="text-foreground font-medium group-hover:text-card transition-colors duration-500">wagner.zimmermann@gmx.de</p>
                </div>
              </a>

              <div className="contact-card relative bg-card rounded-[1.5rem] border border-border overflow-hidden group hover:bg-foreground hover:border-foreground transition-all duration-500">
                <div className="flex items-center gap-5 p-5">
                  <div className="contact-icon relative flex-shrink-0 w-14 h-14 bg-foreground/5 rounded-2xl flex items-center justify-center group-hover:bg-card/20 [transform-style:preserve-3d] transition-colors duration-500">
                    <MapPin className="w-6 h-6 text-foreground group-hover:text-card transition-colors duration-500" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm group-hover:text-card/60 transition-colors duration-500">Trainingsort</p>
                    <p className="text-foreground font-medium group-hover:text-card transition-colors duration-500">Am Tannenhof 38, Konstanz</p>
                  </div>
                </div>
                <div className={`transition-all duration-1000 ease-out overflow-hidden ${
                  isVisible ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`} style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}>
                  <StudioMap className="w-full h-72 border-t border-border" />
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-3 bg-card p-8 md:p-10 rounded-[2rem] border border-border shadow-xl shadow-primary/5 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8">
                  <Send className="w-12 h-12 text-primary" />
                </div>
                <h3 className="font-serif text-3xl text-foreground mb-4">
                  Vielen Dank!
                </h3>
                <p className="text-muted-foreground mb-8">
                  Ihre Nachricht wurde gesendet. Ich melde mich schnellstmoglich bei Ihnen.
                </p>
                <Button
                  variant="outline"
                  className="bg-transparent rounded-full px-8"
                  onClick={() => setSubmitted(false)}
                >
                  Neue Nachricht
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-foreground text-sm">Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-2 bg-background rounded-xl h-12"
                      placeholder="Ihr Name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground text-sm">E-Mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2 bg-background rounded-xl h-12"
                      placeholder="ihre@email.de"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-foreground text-sm">Telefon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2 bg-background rounded-xl h-12"
                    placeholder="+49 123 456 7890"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-foreground text-sm">Nachricht *</Label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-2 bg-background min-h-36 rounded-xl resize-none"
                    placeholder="Wie kann ich Ihnen helfen?"
                  />
                </div>

                {error && (
                  <p className="text-destructive text-sm text-center bg-destructive/10 rounded-xl p-3">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-foreground text-card hover:bg-card hover:text-foreground border border-foreground rounded-full py-6 text-base font-medium group transition-all duration-300"
                >
                  {isSubmitting ? (
                    "Wird gesendet..."
                  ) : (
                    <>
                      Nachricht senden
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
