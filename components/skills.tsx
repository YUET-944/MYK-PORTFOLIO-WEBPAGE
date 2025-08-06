"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Database, Globe, Smartphone, Settings, Award } from "lucide-react"

export function Skills() {
  const skillCategories = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Programming Languages",
      gradient: "from-blue-400 to-blue-600",
      skills: [
        { name: "C++", level: 90 },
        { name: "Python", level: 75 },
        { name: "SQL", level: 85 },
        { name: "HTML/CSS", level: 70 },
        { name: "JavaScript", level: 40 },
      ],
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Web Development",
      gradient: "from-emerald-400 to-emerald-600",
      skills: [
        { name: "Frontend Development", level: 65 },
        { name: "Backend Development", level: 50 },
        { name: "ReactJS", level: 30 },
        { name: "Responsive Design", level: 70 },
      ],
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Database & Systems",
      gradient: "from-purple-400 to-purple-600",
      skills: [
        { name: "MySQL", level: 85 },
        { name: "Database Design", level: 80 },
        { name: "Data Structures", level: 75 },
        { name: "Algorithms", level: 70 },
      ],
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Development",
      gradient: "from-indigo-400 to-indigo-600",
      skills: [
        { name: "Flutter", level: 40 },
        { name: "Android Development", level: 35 },
        { name: "iOS Development", level: 30 },
        { name: "Cross-platform", level: 40 },
      ],
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Tools & Technologies",
      gradient: "from-orange-400 to-orange-600",
      skills: [
        { name: "Git & GitHub", level: 75 },
        { name: "Microsoft Office", level: 90 },
        { name: "Figma", level: 50 },
        { name: "VS Code", level: 85 },
      ],
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Soft Skills",
      gradient: "from-pink-400 to-pink-600",
      skills: [
        { name: "Problem Solving", level: 85 },
        { name: "Team Leadership", level: 75 },
        { name: "Project Management", level: 70 },
        { name: "Communication", level: 80 },
      ],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-['Poppins']">Skills & Expertise</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A comprehensive overview of my technical skills and areas of expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <CardHeader>
                <CardTitle className="flex items-center text-white font-['Poppins']">
                  <div className={`bg-gradient-to-r ${category.gradient} p-2 rounded-lg mr-3`}>
                    <div className="text-white">{category.icon}</div>
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm font-medium">{skill.name}</span>
                        <span className="text-indigo-400 text-xs">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${category.gradient} h-2 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
