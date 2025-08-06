import Hero from "@/components/hero"
import { About } from "@/components/about"
import { TechStack } from "@/components/tech-stack"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Certificates } from "@/components/certificates"
import { Testimonials } from "@/components/testimonials"
import { Reviews } from "@/components/reviews"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Muhammad Younas Khan | Portfolio - Aspiring Full Stack Developer",
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <TechStack />
        <Skills />
        <Projects />
        <Certificates />
        <Testimonials />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
