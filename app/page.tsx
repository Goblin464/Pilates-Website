import { HeroSection } from "@/components/hero-section"
import { TrialOffer } from "@/components/trial-offer"
import { ForEveryone } from "@/components/for-everyone"
import { Benefits } from "@/components/benefits"
import { Courses } from "@/components/courses"
import { AboutMe } from "@/components/about-me"
import { PureMethod } from "@/components/pure-method"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <TrialOffer />
      <ForEveryone />
      <Benefits />
      <Courses />
      <PureMethod />
      <AboutMe />
      <ContactSection />
      <Footer />
    </main>
  )
}
