"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Calendar, ExternalLink, Eye } from "lucide-react"
import { useState } from "react"

export function Certificates() {
  const [viewer, setViewer] = useState<{ title: string; image: string; verify?: string } | null>(null)

  const certifications = [
    {
      name: "Introduction to Computers, OS, and Security",
      status: "Completed",
      provider: "Microsoft (via Coursera)",
      description: "Comprehensive course covering computer fundamentals, operating systems, and security principles.",
      date: "April 18, 2025",
      verificationUrl: "https://coursera.org/verify/FSUOSYPRKQ94",
      certificateImage: "/certificates/coursera-microsoft.png",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      name: "CodeAlpha – Letter of Recommendation",
      status: "Completed",
      provider: "CodeAlpha",
      description: "Letter of Recommendation recognizing performance during the Frontend Development internship.",
      date: "Sept 21, 2025",
      certificateImage: "/certificates/codealpha-letter.png",
      gradient: "from-amber-400 to-yellow-500",
    },
    {
      name: "CodeAlpha – Internship Certificate",
      status: "Completed",
      provider: "CodeAlpha",
      description: "Certificate of completion for the Frontend Development Virtual Internship Program.",
      date: "Sept 21, 2025",
      certificateImage: "/certificates/codealpha-internship.png",
      gradient: "from-emerald-400 to-emerald-600",
    },
    {
      name: "Logic Loomer – Frontend Internship (React)",
      status: "Completed",
      provider: "Logic Loomer",
      description: "Certificate acknowledging successful completion of the Frontend Internship in React.",
      date: "Aug 29, 2025",
      certificateImage: "/certificates/logic-loomer-internship.png",
      gradient: "from-indigo-400 to-indigo-600",
    },
  ]

  const achievements = [
    {
      title: "Active GitHub Contributor",
      description: "Consistent contributions to personal and collaborative projects",
      icon: "🚀",
    },
    {
      title: "Team Leadership",
      description: "Leading social media MVP development team",
      icon: "👥",
    },
    {
      title: "Academic Excellence",
      description: "Strong performance in Computer Science coursework",
      icon: "🎓",
    },
  ]

  return (
    <section id="certificates" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-['Poppins']">
            Certificates & Achievements
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Professional certifications and notable achievements in my journey
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center font-['Poppins']">
              <Award className="h-6 w-6 mr-3 text-indigo-400" />
              Certifications
            </h3>
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <Card
                  key={index}
                  className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg font-['Poppins'] mb-2">{cert.name}</CardTitle>
                        <div
                          className={`bg-gradient-to-r ${cert.gradient} text-white px-3 py-1 rounded-full text-sm font-medium w-fit`}
                        >
                          {cert.provider}
                        </div>
                      </div>
                      <Badge
                        className={
                          cert.status === "Completed"
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-400/30"
                            : "bg-yellow-500/20 text-yellow-400 border-yellow-400/30"
                        }
                      >
                        {cert.status}
                      </Badge>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm mt-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      {cert.date}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{cert.description}</p>
                    <div className="flex gap-2">
                      {cert.verificationUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-indigo-400/50 text-indigo-400 hover:bg-indigo-400/10 bg-transparent"
                          onClick={() => window.open(cert.verificationUrl, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Verify Certificate
                        </Button>
                      )}
                      {cert.certificateImage && (
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 border-0"
                          onClick={() =>
                            setViewer({ title: cert.name, image: cert.certificateImage, verify: cert.verificationUrl })
                          }
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Certificate
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center font-['Poppins']">
              <Award className="h-6 w-6 mr-3 text-emerald-400" />
              Achievements
            </h3>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div>
                        <h4 className="text-white font-semibold mb-1 font-['Poppins']">{achievement.title}</h4>
                        <p className="text-gray-400 text-sm">{achievement.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Languages */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center font-['Poppins']">
                <span className="mr-2">🌍</span>
                Languages
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { language: "Pashto", level: "Native", color: "from-green-400 to-green-600" },
                  { language: "Urdu", level: "Fluent", color: "from-blue-400 to-blue-600" },
                  { language: "English", level: "Good", color: "from-purple-400 to-purple-600" },
                ].map((lang, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10"
                  >
                    <span className="text-white font-medium">{lang.language}</span>
                    <Badge className={`bg-gradient-to-r ${lang.color} text-white border-0`}>{lang.level}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Modal */}
        {viewer && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 max-w-5xl w-full max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white font-['Poppins']">{viewer.title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewer(null)}
                  className="text-white hover:bg-white/10"
                >
                  ✕
                </Button>
              </div>
              <div className="bg-white rounded-lg p-2">
                <img
                  src={viewer.image || "/placeholder.svg"}
                  alt={`${viewer.title} certificate`}
                  className="w-full h-auto rounded"
                />
              </div>
              {viewer.verify && (
                <div className="mt-4 text-center">
                  <Button
                    className="bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 border-0"
                    onClick={() => window.open(viewer.verify!, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Verify
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
