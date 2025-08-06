"use client"

import { useState, useEffect } from "react"

export function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  useEffect(() => {
    // Update year dynamically
    const updateYear = () => {
      setCurrentYear(new Date().getFullYear())
    }

    // Update immediately
    updateYear()

    // Set up interval to check for year change (check every hour)
    const interval = setInterval(updateYear, 3600000)

    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="py-8 px-4 border-t border-white/10 bg-slate-900/50 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-400 mb-2">
          © {currentYear} Muhammad Younas Khan (MYK). Built with ❤️ using React & Tailwind CSS.
        </p>
        <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
          <span>Deployed on</span>
          <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent font-semibold">
            Vercel
          </span>
        </div>
        <div className="mt-2 text-xs text-gray-600">
          <p>Designed & Developed with passion in Swat, Pakistan 🇵🇰</p>
        </div>
      </div>
    </footer>
  )
}
