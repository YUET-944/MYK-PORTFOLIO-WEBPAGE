import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react"

export function Education() {
  const education = [
    {
      degree: "BS Computer Science",
      institution: "University of Engineering and Technology, Mardan",
      duration: "2023 - 2027",
      status: "Current",
      description:
        "Pursuing Bachelor's degree in Computer Science with focus on software development, algorithms, and database systems.",
      highlights: [
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Software Engineering",
        "Object-Oriented Programming",
      ],
    },
    {
      degree: "Intermediate in Computer Science (ICS)",
      institution: "Govt. Post Graduate Jahanzeb College, Swat",
      duration: "2021 - 2023",
      status: "Completed",
      description:
        "Completed intermediate education with specialization in Computer Science, Mathematics, and Physics.",
      highlights: ["Computer Science Fundamentals", "Mathematics", "Physics", "Programming Basics"],
    },
  ]

  const certifications = [
    {
      name: "Microsoft SC-900: Security, Compliance, and Identity Fundamentals",
      status: "In Progress",
      provider: "Microsoft",
      description: "Learning cloud security, compliance, and identity management fundamentals.",
    },
  ]

  return (
    <section id="education" className="py-20 px-4 bg-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Education & Certifications</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">My academic journey and professional certifications</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <GraduationCap className="h-6 w-6 mr-3 text-purple-400" />
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index} className="bg-slate-900 border-slate-700">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white text-lg">{edu.degree}</CardTitle>
                        <p className="text-purple-400 font-medium">{edu.institution}</p>
                      </div>
                      <Badge className={edu.status === "Current" ? "bg-blue-600" : "bg-green-600"}>{edu.status}</Badge>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      {edu.duration}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{edu.description}</p>
                    <div className="space-y-2">
                      <h4 className="text-white font-medium text-sm">Key Subjects:</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.highlights.map((highlight, hIndex) => (
                          <Badge key={hIndex} variant="secondary" className="text-xs bg-slate-700 text-gray-300">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Award className="h-6 w-6 mr-3 text-purple-400" />
              Certifications
            </h3>
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="bg-slate-900 border-slate-700">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-white text-lg">{cert.name}</CardTitle>
                      <Badge className="bg-yellow-600">{cert.status}</Badge>
                    </div>
                    <p className="text-purple-400 font-medium">{cert.provider}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{cert.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-purple-400" />
                Languages
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { language: "Pashto", level: "C1 (Advanced)", color: "from-green-400 to-green-600" },
                  { language: "Urdu", level: "B2 (Upper Intermediate)", color: "from-blue-400 to-blue-600" },
                  { language: "English", level: "B1 (Intermediate)", color: "from-purple-400 to-purple-600" },
                ].map((lang, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-slate-900 rounded-lg border border-slate-700"
                  >
                    <span className="text-white">{lang.language}</span>
                    <Badge variant="outline" className="text-purple-400 border-purple-400">
                      {lang.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
