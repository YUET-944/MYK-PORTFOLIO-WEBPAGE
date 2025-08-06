"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TechStack() {
  const techCategories = [
    {
      category: "Programming Languages",
      technologies: [
        { name: "C++", icon: "⚡", color: "from-blue-400 to-blue-600" },
        { name: "Python", icon: "🐍", color: "from-green-400 to-green-600" },
        { name: "SQL", icon: "🗄️", color: "from-orange-400 to-orange-600" },
        { name: "JavaScript", icon: "🟨", color: "from-yellow-400 to-yellow-600" },
      ],
    },
    {
      category: "Frameworks & Libraries",
      technologies: [
        { name: "Flutter", icon: "📱", color: "from-blue-400 to-cyan-400" },
        { name: "React", icon: "⚛️", color: "from-cyan-400 to-blue-500" },
        { name: "Next.js", icon: "▲", color: "from-gray-700 to-gray-900" },
        { name: "Tailwind CSS", icon: "🎨", color: "from-teal-400 to-blue-500" },
      ],
    },
    {
      category: "Databases & Tools",
      technologies: [
        { name: "MySQL", icon: "🐬", color: "from-blue-500 to-blue-700" },
        { name: "Git", icon: "📝", color: "from-orange-500 to-red-500" },
        { name: "VS Code", icon: "💻", color: "from-blue-600 to-blue-800" },
        { name: "Figma", icon: "🎯", color: "from-purple-400 to-pink-400" },
      ],
    },
    {
      category: "Currently Learning",
      technologies: [
        { name: "Node.js", icon: "🟢", color: "from-green-500 to-green-700" },
        { name: "MongoDB", icon: "🍃", color: "from-green-400 to-green-600" },
        { name: "Firebase", icon: "🔥", color: "from-yellow-400 to-orange-500" },
        { name: "Docker", icon: "🐳", color: "from-blue-400 to-blue-600" },
      ],
    },
  ]

  return (
    <section id="tech-stack" className="py-20 px-4 bg-slate-800/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-['Poppins']">Tech Stack</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Technologies and tools I use to bring ideas to life</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map((category, categoryIndex) => (
            <Card
              key={categoryIndex}
              className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="text-white text-lg font-['Poppins'] text-center">{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {category.technologies.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="flex flex-col items-center p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group cursor-pointer"
                    >
                      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{tech.icon}</div>
                      <span className="text-white text-xs font-medium text-center group-hover:text-indigo-400 transition-colors">
                        {tech.name}
                      </span>
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
