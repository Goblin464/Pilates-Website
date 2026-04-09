import { Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-16 bg-foreground text-card relative overflow-hidden">
      {/* Decorative top curve */}
      <div className="absolute -top-1 left-0 right-0 h-20 bg-background" style={{
        clipPath: "ellipse(60% 100% at 50% 0%)"
      }} />
      
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="w-16 h-16 rounded-full bg-card/10 flex items-center justify-center mb-6">
            <span className="font-serif text-2xl font-bold text-card">P</span>
          </div>
          
          <p className="font-serif text-3xl tracking-wide mb-2">Karin Wagner-Zimmermann</p>
          
          {/* Social */}
          <a
            href="https://www.instagram.com/karinwagner.zimmermann/"
            className="w-12 h-12 rounded-full bg-card/10 flex items-center justify-center text-card/60 hover:text-card hover:bg-card/20 transition-all mb-12"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-card/50 mb-8">
            <a href="/impressum" className="hover:text-card transition-colors">Impressum</a>
            <a href="/datenschutz" className="hover:text-card transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-card transition-colors">AGB</a>
          </div>
          
          <p className="text-card/30 text-xs">
            {new Date().getFullYear()} Pure Pilates. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}
