"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Code, Database, Smartphone, Calendar, Target, Heart } from "lucide-react"

export function About() {
  const timeline = [
    {
      year: "2021-2023",
      title: "Intermediate in Computer Science",
      institution: "Govt. Post Graduate Jahanzeb College, Swat",
      description: "Foundation in Computer Science, Mathematics, and Physics",
    },
    {
      year: "2023-2027",
      title: "BS Computer Science",
      institution: "University of Engineering and Technology, Mardan",
      description: "Currently pursuing degree with focus on software development and algorithms",
    },
  ]

  const highlights = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Programming",
      description: "Strong foundation in C++, Python, and SQL",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Database Systems",
      description: "Experience with MySQL and database design",
      color: "from-emerald-400 to-emerald-600",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Development",
      description: "Learning Flutter for cross-platform apps",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Education",
      description: "BS Computer Science at UET Mardan",
      color: "from-indigo-400 to-indigo-600",
    },
  ]

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-['Poppins']">About Me</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Passionate about creating innovative software solutions and continuously learning new technologies
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Enhanced Journey Section */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-white mb-6 font-['Poppins'] flex items-center">
              <Heart className="h-6 w-6 mr-3 text-red-400" />
              My Story
            </h3>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                I am a passionate and dedicated Computer Science student from UET Mardan, with a strong foundation in
                programming, problem-solving, and database management. My journey in technology started with curiosity
                and has evolved into a deep commitment to building meaningful solutions.
              </p>
              <p>
                Currently working on exciting projects including a pharmacy management system and leading a team for a
                social media MVP. I'm also expanding my skills in Flutter for mobile development and planning to dive
                deep into ReactJS. Every project teaches me something new and fuels my passion for innovation.
              </p>

              {/* Mission Statement */}
              <div className="bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 rounded-xl p-4 border border-indigo-400/20 mt-6">
                <h4 className="text-white font-semibold mb-2 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-indigo-400" />
                  My Mission
                </h4>
                <p className="text-gray-300 text-sm">
                  To become a skilled full-stack developer who creates technology that solves real-world problems and
                  makes a positive impact on people's lives. I believe in continuous learning, collaboration, and
                  building solutions that matter.
                </p>
              </div>
            </div>

            {/* Enhanced Timeline */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-indigo-400" />
                Education Timeline
              </h4>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-indigo-400/30 pl-4 pb-4 hover:border-indigo-400/60 transition-colors"
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-indigo-400 rounded-full -ml-[7px] mr-3 animate-pulse"></div>
                      <span className="text-indigo-400 font-medium">{item.year}</span>
                    </div>
                    <h5 className="text-white font-semibold">{item.title}</h5>
                    <p className="text-emerald-400 text-sm">{item.institution}</p>
                    <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`bg-gradient-to-r ${item.color} p-3 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{item.icon}</div>
                  </div>
                  <h4 className="text-white font-semibold mb-2 font-['Poppins'] group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
