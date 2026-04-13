"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Spin as Hamburger } from 'hamburger-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let rafId: number | null = null

    const handleScroll = () => {
      if (rafId) return

      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
        setScrollProgress(progress)
        setIsScrolled(scrollTop > 50)
        rafId = null
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial calculation
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const navItems = [
    { label: "Über mich", href: "#about" },
    { label: "Angebot", href: "#courses" },
    { label: "Methode", href: "#method" },
    { label: "Kontakt", href: "#contact" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsOpen(false)
  }



  return (

    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
      ? "bg-card/80 backdrop-blur-xl shadow-lg shadow-primary/5"
      : "bg-transparent"
      }`}>
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 h-1.5 w-full overflow-hidden">
        <div
          className="h-full bg-primary"
          style={{ width: `${scrollProgress}%`, transition: 'none' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="group flex items-center gap-3">

            <span className={`font-serif text-lg tracking-widest transition-colors ${isScrolled ? "text-foreground" : "text-card"
              }`}>
              Karin Wagner-Zimmermann
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isScrolled
                  ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                  : "text-card/80 hover:text-card hover:bg-card/10"
                  }`}
              >
                {item.label}
              </a>
            ))}

          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-1 rounded-full transition-all ${isScrolled ? "text-foreground bg-muted" : "text-card bg-card/10"
              }`}
          >
           <Hamburger size={20} toggled={isOpen} toggle={setIsOpen} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`absolute right-0 mt-4 w-56 origin-top-right transform transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
            }`}
        >
          <div className="bg-card rounded-3xl p-4 shadow-xl">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block px-4 py-3 rounded-2xl transition-all duration-300 ${isOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {item.label}
              </a>
            ))}


          </div>
        </div>
      </div>
    </nav>
  )
}
