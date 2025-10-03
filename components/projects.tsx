"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Code, Database, Users, Calendar, Lightbulb, type LucideIcon } from "lucide-react" // Import LucideIcon type
import { useState, useEffect } from "react"
import { fetchGitHubProjects } from "@/app/actions/github-projects" // Import the new action

// Map string identifiers to Lucide icons
const iconMap: { [key: string]: LucideIcon } = {
  github: Github,
  code: Code,
  database: Database,
  users: Users,
  // Add more mappings if you use other string identifiers for icons
}

// Define a type that matches your existing Project interface, making dynamic fields optional
interface Project {
  title: string
  description: string
  fullDescription?: string
  technologies: string[]
  status: string
  icon?: string // Changed to string
  type: string
  githubUrl: string | null
  gradient?: string // Made optional
  challenges?: string[]
  learned?: string[]
  timeline?: string
}

export function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  // Hardcoded projects (these will be combined with fetched GitHub projects)
  const hardcodedProjects: Project[] = [
    {
      title: "Social Media MVP",
      description:
        "Leading a team to develop a comprehensive social media application with chat, short videos, and snap-like stories functionality.",
      fullDescription:
        "This project involves building a full-featured social media platform from scratch. Key challenges include real-time messaging, video processing, and scalable architecture. Leading a team of developers while managing project timelines and feature requirements.",
      technologies: ["Team Leadership", "Project Management", "Mobile Development", "Real-time Systems"],
      status: "Ongoing",
      icon: "users", // Changed to string
      type: "Team Project",
      githubUrl: null,
      gradient: "from-purple-400 to-purple-600",
      challenges: ["Real-time messaging", "Video processing", "Team coordination"],
      learned: ["Leadership skills", "Project management", "System architecture"],
      timeline: "6 months",
    },
    {
      title: "Pharmacy Management System",
      description:
        "A comprehensive system for managing pharmacy operations with inventory tracking, sales management, and customer records.",
      fullDescription:
        "Built using Python and MySQL, this system handles complete pharmacy operations including inventory management, prescription tracking, sales analytics, and customer relationship management. Features automated alerts for low stock and expiry dates.",
      technologies: ["Python", "MySQL", "Database Design", "GUI Development"],
      status: "In Progress",
      icon: "database", // Changed to string
      type: "Personal Project",
      githubUrl: null,
      gradient: "from-emerald-400 to-emerald-600",
      challenges: ["Complex database relationships", "User interface design", "Data validation"],
      learned: ["Advanced SQL", "Python GUI frameworks", "Database optimization"],
      timeline: "4 months",
    },
    {
      title: "Job Portal System",
      description:
        "SQL-based backend system for job listings, applications, and user data. Features job posting management, user registration, authentication, and structured relational schema with CRUD operations.",
      fullDescription:
        "A complete job portal backend with normalized database design, supporting job seekers and employers. Includes advanced search functionality, application tracking, and comprehensive reporting features.",
      technologies: ["SQL", "MySQL", "Database Management", "Backend Development"],
      status: "Completed",
      icon: "database", // Changed to string
      type: "Academic Project",
      githubUrl: "https://github.com/YUET-944/job-portal",
      gradient: "from-blue-400 to-blue-600",
      challenges: ["Database normalization", "Complex queries", "Performance optimization"],
      learned: ["Advanced SQL techniques", "Database design principles", "Query optimization"],
      timeline: "3 months",
    },
    {
      title: "Hotel Management System",
      description:
        "Collaborative project for hotel management with booking system, room management, and customer service features. Built in partnership with Abdul Muhamin.",
      fullDescription:
        "A comprehensive hotel management solution covering reservations, room allocation, billing, and customer service. Developed collaboratively, focusing on modular design and efficient workflow management.",
      technologies: ["Web Development", "Collaboration", "Hotel Management", "Database Design"],
      status: "Completed",
      icon: "code", // Changed to string
      type: "Collaboration Project",
      githubUrl: "https://github.com/Muhemin365/hotel-website/tree/main",
      gradient: "from-indigo-400 to-indigo-600",
      challenges: ["Team collaboration", "Feature integration", "User experience design"],
      learned: ["Collaborative development", "Git workflows", "Project coordination"],
      timeline: "2 months",
    },
    {
      title: "ATM System",
      description:
        "Object-oriented ATM simulation system with account management, transactions, and security features.",
      fullDescription:
        "A complete ATM simulation built with C++ using object-oriented principles. Features include account authentication, balance inquiry, cash withdrawal, deposit functionality, and transaction history with proper error handling.",
      technologies: ["C++", "OOP", "System Design", "Security"],
      status: "Completed",
      icon: "code", // Changed to string
      type: "Academic Project",
      githubUrl: "https://github.com/YUET-944/ATM-System",
      gradient: "from-orange-400 to-orange-600",
      challenges: ["Security implementation", "Error handling", "User interface design"],
      learned: ["OOP principles", "Security best practices", "System design patterns"],
      timeline: "1 month",
    },
    {
      title: "DSA Toolkit",
      description:
        "Implementation of sliding window algorithms and linked list operations. Demonstrates multiple DSA techniques including maximum sum subarray, unique elements, and optimized linked list management.",
      fullDescription:
        "A comprehensive toolkit showcasing various data structures and algorithms implementations. Focus on sliding window techniques, linked list operations, and algorithm optimization with detailed documentation and examples.",
      technologies: ["C++", "Data Structures", "Algorithms", "Sliding Window", "Optimization"],
      status: "Completed",
      icon: "code", // Changed to string
      type: "Learning Project",
      githubUrl: "https://github.com/YUET-944/DSA-tollkit",
      gradient: "from-pink-400 to-pink-600",
      challenges: ["Algorithm optimization", "Memory management", "Code documentation"],
      learned: ["Advanced algorithms", "Performance analysis", "Code optimization"],
      timeline: "2 months",
    },
  ]

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true)
      try {
        const githubProjects = await fetchGitHubProjects()
        // Combine hardcoded projects with fetched GitHub projects
        // You might want to add logic here to prevent duplicates if a hardcoded project also exists on GitHub
        setAllProjects([...hardcodedProjects, ...githubProjects])
      } catch (error) {
        console.error("Failed to load projects:", error)
        setAllProjects(hardcodedProjects) // Fallback to only hardcoded projects on error
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-400/30"
      case "in progress":
        return "bg-blue-500/20 text-blue-400 border-blue-400/30"
      case "ongoing":
        return "bg-purple-500/20 text-purple-400 border-purple-400/30"
      case "active": // For GitHub projects
        return "bg-indigo-500/20 text-indigo-400 border-indigo-400/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-400/30"
    }
  }

  // Helper function to render the icon
  const renderIcon = (iconName: string | undefined) => {
    if (!iconName) return <Github className="h-6 w-6" /> // Default to Github if no icon specified

    const IconComponent = iconMap[iconName.toLowerCase()]
    if (IconComponent) {
      return <IconComponent className="h-6 w-6" />
    }
    return <Github className="h-6 w-6" /> // Fallback to Github if name not found
  }

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-400"></div>
        <p className="ml-4 text-white text-lg">Loading projects from GitHub...</p>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-['Poppins']">Featured Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A showcase of my development projects, from academic assignments to personal initiatives
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((project, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group cursor-pointer"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div
                    className={`bg-gradient-to-r ${project.gradient || "from-gray-700 to-gray-900"} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{renderIcon(project.icon)}</div>
                  </div>
                  <Badge className={`${getStatusColor(project.status)} border`}>{project.status}</Badge>
                </div>
                <CardTitle className="text-white text-lg font-['Poppins'] group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </CardTitle>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs text-emerald-400 border-emerald-400/30 w-fit">
                    {project.type}
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
                  {hoveredProject === index ? project.fullDescription : project.description}
                </p>

                {/* Enhanced project details on hover */}
                {hoveredProject === index && (project.challenges || project.learned) && (
                  <div className="space-y-3 mb-4 animate-fade-in">
                    {project.challenges && project.challenges.length > 0 && (
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
                    {project.learned && project.learned.length > 0 && (
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
                  {project.githubUrl ? (
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 border-0 group"
                      onClick={() => window.open(project.githubUrl!, "_blank")}
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
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
