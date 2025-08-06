"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ExternalLink, MapPin } from "lucide-react"
import { Download } from "@/components/animated-download"

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const roles = [
    "Aspiring Full Stack Developer",
    "Web Developer", // Changed from "Python Developer"
    "Database Designer",
    // Removed "Flutter & Mobile App Developer"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleDownloadCV = () => {
    // Create a link to download the PDF CV
    const link = document.createElement("a")
    link.href = "/Muhammad_Younas_Khan_CV.pdf"
    link.download = "Muhammad_Younas_Khan_CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
      {/* Enhanced floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/5 to-emerald-500/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Hero background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.02%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10 px-4">
        {/* Enhanced glassmorphism card */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6 md:p-12 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/10">
          {/* Personal Logo/Avatar */}
          <div className="mb-8">
            <div className="w-28 h-28 mx-auto mb-6 bg-gradient-to-r from-indigo-400 to-emerald-400 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg hover:scale-110 transition-transform duration-300">
              MYK
            </div>

            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-['Poppins'] animate-fade-in">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                Muhammad Younas Khan
              </span>
            </h1>

            {/* Professional Tagline */}
            <div className="text-lg md:text-2xl lg:text-3xl text-gray-300 mb-6 h-12 flex items-center justify-center">
              <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent font-semibold min-w-[280px] md:min-w-[400px] text-center transition-all duration-500">
                {roles[currentRole]}
              </span>
            </div>

            {/* Enhanced Introduction */}
            <div className="max-w-3xl mx-auto mb-6">
              <p className="text-base md:text-lg text-gray-300 mb-4 leading-relaxed">
                💼 <strong className="text-white">Passionate about Web Development, Python & Databases</strong>
              </p>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                Hi! I'm Muhammad Younas Khan, a Computer Science student at UET Mardan. I build efficient, user-focused
                web applications using modern technologies, SQL, and Python. Currently leading a social media MVP
                development team and exploring the latest in full-stack development.
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center justify-center text-gray-400 mb-8">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm">Swat, Pakistan 🇵🇰</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              <ExternalLink className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-indigo-400/50 text-indigo-400 hover:bg-indigo-400/10 backdrop-blur-sm hover:scale-105 transition-all duration-300 group bg-transparent"
              onClick={handleDownloadCV}
            >
              <Download width={16} height={16} stroke="#6366f1" />
              <span className="ml-2">Download Resume</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-emerald-400/50 text-emerald-400 hover:bg-emerald-400/10 backdrop-blur-sm hover:scale-105 transition-all duration-300 group bg-transparent"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Mail className="h-4 w-4 mr-2 group-hover:bounce transition-all" />
              Get In Touch
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/YUET-944"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition-all duration-300 hover:scale-110 hover:rotate-12"
              aria-label="GitHub Profile"
            >
              <Github className="h-7 w-7" />
            </a>
            <a
              href="https://linkedin.com/in/muhammad-younas-khan-72b102264"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition-all duration-300 hover:scale-110 hover:rotate-12"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-7 w-7" />
            </a>
            <a
              href="mailto:mykjcs2023@gmail.com"
              className="text-gray-400 hover:text-indigo-400 transition-all duration-300 hover:scale-110 hover:rotate-12"
              aria-label="Email Contact"
            >
              <Mail className="h-7 w-7" />
            </a>
          </div>
        </div>

        {/* Enhanced GitHub Stats */}
        <div className="mt-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-4 inline-block hover:bg-white/10 transition-all duration-300">
            <p className="text-gray-400 text-sm mb-2">Live GitHub Activity</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm">
              <span className="text-indigo-400 animate-pulse">🔥 Active Developer</span>
              <span className="text-emerald-400 animate-pulse delay-300">📚 Learning Web Development</span>
              <span className="text-purple-400 animate-pulse delay-700">🚀 Building Projects</span>
              <span className="text-yellow-400 animate-pulse delay-1000">👥 Team Leader</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
