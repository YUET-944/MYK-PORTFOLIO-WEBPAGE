"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, ExternalLink } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  fullDescription: string
  technologies: string[]
  status: string
  type: string
  githubUrl: string
  gradient: string
  challenges: string[]
  learned: string[]
  timeline: string
}

export function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)

  // Load projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem("adminProjects")
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects))
      } catch (error) {
        console.error("Error loading projects:", error)
      }
    } else {
      // Initialize with default projects
      const defaultProjects: Project[] = [
        {
          id: "1",
          title: "Social Media MVP",
          description: "Leading a team to develop a comprehensive social media application",
          fullDescription:
            "This project involves building a full-featured social media platform from scratch. Key challenges include real-time messaging, video processing, and scalable architecture.",
          technologies: ["Team Leadership", "Project Management", "Mobile Development"],
          status: "Ongoing",
          type: "Team Project",
          githubUrl: "",
          gradient: "from-purple-400 to-purple-600",
          challenges: ["Real-time messaging", "Video processing", "Team coordination"],
          learned: ["Leadership skills", "Project management", "System architecture"],
          timeline: "6 months",
        },
      ]
      setProjects(defaultProjects)
      localStorage.setItem("adminProjects", JSON.stringify(defaultProjects))
    }
  }, [])

  const saveProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects)
    localStorage.setItem("adminProjects", JSON.stringify(updatedProjects))

    // Dispatch event to update the main projects section
    window.dispatchEvent(
      new CustomEvent("projectsUpdated", {
        detail: updatedProjects,
      }),
    )
  }

  const handleSaveProject = (projectData: Partial<Project>) => {
    if (editingProject) {
      // Update existing project
      const updatedProjects = projects.map((p) =>
        p.id === editingProject.id ? { ...editingProject, ...projectData } : p,
      )
      saveProjects(updatedProjects)
      setEditingProject(null)
    } else if (isAddingNew) {
      // Add new project
      const newProject: Project = {
        id: Date.now().toString(),
        title: "",
        description: "",
        fullDescription: "",
        technologies: [],
        status: "Active",
        type: "Personal Project",
        githubUrl: "",
        gradient: "from-blue-400 to-blue-600",
        challenges: [],
        learned: [],
        timeline: "",
        ...projectData,
      }
      saveProjects([...projects, newProject])
      setIsAddingNew(false)
    }
  }

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const updatedProjects = projects.filter((p) => p.id !== id)
      saveProjects(updatedProjects)
    }
  }

  const ProjectForm = ({
    project,
    onSave,
    onCancel,
  }: {
    project?: Project
    onSave: (data: Partial<Project>) => void
    onCancel: () => void
  }) => {
    const [formData, setFormData] = useState({
      title: project?.title || "",
      description: project?.description || "",
      fullDescription: project?.fullDescription || "",
      technologies: project?.technologies?.join(", ") || "",
      status: project?.status || "Active",
      type: project?.type || "Personal Project",
      githubUrl: project?.githubUrl || "",
      challenges: project?.challenges?.join(", ") || "",
      learned: project?.learned?.join(", ") || "",
      timeline: project?.timeline || "",
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSave({
        ...formData,
        technologies: formData.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        challenges: formData.challenges
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        learned: formData.learned
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      })
    }

    return (
      <Card className="bg-slate-700 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white">{project ? "Edit Project" : "Add New Project"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white"
                  required
                />
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                  className="w-full p-2 bg-slate-600 border border-slate-500 rounded-md text-white"
                >
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Ongoing">Ongoing</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">Short Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                className="bg-slate-600 border-slate-500 text-white"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">Full Description</label>
              <Textarea
                value={formData.fullDescription}
                onChange={(e) => setFormData((prev) => ({ ...prev, fullDescription: e.target.value }))}
                className="bg-slate-600 border-slate-500 text-white"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Technologies (comma-separated)</label>
                <Input
                  value={formData.technologies}
                  onChange={(e) => setFormData((prev) => ({ ...prev, technologies: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Timeline</label>
                <Input
                  value={formData.timeline}
                  onChange={(e) => setFormData((prev) => ({ ...prev, timeline: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white"
                  placeholder="3 months"
                />
              </div>
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">GitHub URL</label>
              <Input
                value={formData.githubUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                className="bg-slate-600 border-slate-500 text-white"
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Challenges (comma-separated)</label>
                <Textarea
                  value={formData.challenges}
                  onChange={(e) => setFormData((prev) => ({ ...prev, challenges: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white"
                  rows={3}
                  placeholder="Real-time messaging, Performance optimization"
                />
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">What I Learned (comma-separated)</label>
                <Textarea
                  value={formData.learned}
                  onChange={(e) => setFormData((prev) => ({ ...prev, learned: e.target.value }))}
                  className="bg-slate-600 border-slate-500 text-white"
                  rows={3}
                  placeholder="System architecture, Team leadership"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                <Save className="h-4 w-4 mr-2" />
                Save Project
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Project Management</h2>
        <Button onClick={() => setIsAddingNew(true)} className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Project
        </Button>
      </div>

      {isAddingNew && <ProjectForm onSave={handleSaveProject} onCancel={() => setIsAddingNew(false)} />}

      {editingProject && (
        <ProjectForm project={editingProject} onSave={handleSaveProject} onCancel={() => setEditingProject(null)} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-white text-lg">{project.title}</CardTitle>
                <Badge
                  className={
                    project.status === "Completed"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : project.status === "In Progress"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-purple-500/20 text-purple-400"
                  }
                >
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{project.technologies.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => setEditingProject(project)} className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                {project.githubUrl && (
                  <Button size="sm" variant="outline" onClick={() => window.open(project.githubUrl, "_blank")}>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteProject(project.id)}
                  className="text-red-400 border-red-400/50 hover:bg-red-400/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="text-center py-12">
            <p className="text-gray-400 mb-4">No projects found. Add your first project to get started!</p>
            <Button onClick={() => setIsAddingNew(true)} className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="h-4 w-4 mr-2" />
              Add First Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
