"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Code, Database, Users, Calendar, Lightbulb, ExternalLink, AlertTriangle, TypeIcon as type, LucideIcon } from 'lucide-react'
import { useState, useEffect } from "react"
import { getProjects } from "@/lib/database"
import { isSupabaseConfigured } from "@/lib/supabase"
import type { Project } from "@/lib/supabase"

// Map string identifiers to Lucide icons
const iconMap: { [key: string]: LucideIcon } = {
  github: Github,
  code: Code,
  database: Database,
  users: Users,
}

export function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [currentFilter, setCurrentFilter] = useState<'featured' | 'all' | 'completed'>('featured') // New state for filter

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true)
      try {
        const data = await getProjects(currentFilter) // Pass the current filter
        setProjects(data)
        console.log("Projects loaded into state:", data)
      } catch (error) {
        console.error("Failed to load projects:", error)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [currentFilter]) // Re-run effect when filter changes

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-400/30"
      case "in_progress":
        return "bg-blue-500/20 text-blue-400 border-blue-400/30"
      case "ongoing":
        return "bg-purple-500/20 text-purple-400 border-purple-400/30"
      case "active":
        return "bg-indigo-500/20 text-indigo-400 border-indigo-400/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-400/30"
    }
  }

  const renderIcon = (type: string) => {
    const iconName = type.toLowerCase().includes("team")
      ? "users"
      : type.toLowerCase().includes("database")
        ? "database"
        : "code"
    const IconComponent = iconMap[iconName]
    return IconComponent ? <IconComponent className="h-6 w-6" /> : <Code className="h-6 w-6" />
  }

  const getSectionTitle = () => {
    switch (currentFilter) {
      case 'featured':
        return 'Featured Projects';
      case 'all':
        return 'All My Projects';
      case 'completed':
        return 'Completed Projects';
      default:
        return 'My Projects';
    }
  }

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-400"></div>
        <p className="ml-4 text-white text-lg">Loading projects...</p>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-['Poppins']">{getSectionTitle()}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A showcase of my development projects
            {!isSupabaseConfigured && (
              <span className="block mt-2 text-yellow-400 text-sm flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Demo mode - Connect database for dynamic content
              </span>
            )}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <Button
            size="lg"
            variant={currentFilter === 'featured' ? 'default' : 'outline'}
            onClick={() => setCurrentFilter('featured')}
            className={currentFilter === 'featured' ? "bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 border-0 shadow-lg" : "border-indigo-400/50 text-indigo-400 hover:bg-indigo-400/10 bg-transparent"}
          >
            Featured Projects
          </Button>
          <Button
            size="lg"
            variant={currentFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setCurrentFilter('all')}
            className={currentFilter === 'all' ? "bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 border-0 shadow-lg" : "border-indigo-400/50 text-indigo-400 hover:bg-indigo-400/10 bg-transparent"}
          >
            All Projects
          </Button>
          <Button
            size="lg"
            variant={currentFilter === 'completed' ? 'default' : 'outline'}
            onClick={() => setCurrentFilter('completed')}
            className={currentFilter === 'completed' ? "bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 border-0 shadow-lg" : "border-indigo-400/50 text-indigo-400 hover:bg-indigo-400/10 bg-transparent"}
          >
            Completed Projects
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 && !loading ? (
            <div className="col-span-full text-center text-gray-400 text-lg">
              No projects found for this filter.
            </div>
          ) : (
            projects.map((project, index) => (
              <Card
                key={project.id}
                className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group cursor-pointer"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div
                      className={`bg-gradient-to-r ${project.gradient} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white">{renderIcon(project.type)}</div>
                    </div>
                    <Badge className={`${getStatusColor(project.status)} border`}>
                      {project.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-lg font-['Poppins'] group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </CardTitle>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs text-emerald-400 border-emerald-400/30 w-fit">
                      {project.type.replace("_", " ")}
                    </Badge>
                    {project.timeline && (
                      <div className="flex items-center text-gray-400 text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {project.timeline}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {hoveredProject === index ? project.full_description : project.description}
                  </p>

                  {/* Enhanced project details on hover */}
                  {hoveredProject === index && (project.challenges.length > 0 || project.learned.length > 0) && (
                    <div className="space-y-3 mb-4 animate-fade-in">
                      {project.challenges.length > 0 && (
                        <div>
                          <h4 className="text-white text-xs font-semibold mb-1 flex items-center">
                            <Lightbulb className="h-3 w-3 mr-1 text-yellow-400" />
                            Key Challenges
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {project.challenges.map((challenge, i) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="text-xs bg-red-500/20 text-red-300 border-red-400/30"
                              >
                                {challenge}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {project.learned.length > 0 && (
                        <div>
                          <h4 className="text-white text-xs font-semibold mb-1 flex items-center">
                            <Code className="h-3 w-3 mr-1 text-green-400" />
                            What I Learned
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {project.learned.map((skill, i) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="text-xs bg-green-500/20 text-green-300 border-green-400/30"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-xs bg-slate-700/50 text-gray-300 border-slate-600/50 hover:bg-slate-600/50 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.github_url ? (
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 border-0 group"
                        onClick={() => window.open(project.github_url!, "_blank")}
                      >
                        <Github className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                        View Code
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-gray-500/30 text-gray-500 cursor-not-allowed bg-transparent"
                        disabled
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Private Repo
                      </Button>
                    )}
                    {project.live_url && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-emerald-400/50 text-emerald-400 hover:bg-emerald-400/10 bg-transparent"
                        onClick={() => window.open(project.live_url!, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="text-center mt-12 space-y-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            onClick={() => window.open("https://github.com/YUET-944", "_blank")}
          >
            <Github className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  )
}
