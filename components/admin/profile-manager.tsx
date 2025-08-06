"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save, User, Mail, Github } from "lucide-react"

interface ProfileData {
  name: string
  title: string
  bio: string
  email: string
  phone: string
  location: string
  githubUrl: string
  linkedinUrl: string
  skills: string[]
  languages: string[]
}

export function ProfileManager() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Muhammad Younas Khan",
    title: "Aspiring Full Stack Developer",
    bio: "Passionate Computer Science student at UET Mardan with strong foundation in programming, problem-solving, and database management.",
    email: "mykjcs2023@gmail.com",
    phone: "+923155705944",
    location: "Swat, Pakistan",
    githubUrl: "https://github.com/YUET-944",
    linkedinUrl: "https://linkedin.com/in/muhammad-younas-khan-72b102264",
    skills: ["C++", "Python", "SQL", "JavaScript", "React", "MySQL"],
    languages: ["Pashto (Native)", "Urdu (Fluent)", "English (Good)"],
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    // Load profile data from localStorage
    const savedProfile = localStorage.getItem("adminProfile")
    if (savedProfile) {
      try {
        setProfileData(JSON.parse(savedProfile))
      } catch (error) {
        console.error("Error loading profile:", error)
      }
    }
  }, [])

  const handleSave = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Save to localStorage
    localStorage.setItem("adminProfile", JSON.stringify(profileData))

    // Dispatch event to update the main site
    window.dispatchEvent(
      new CustomEvent("profileUpdated", {
        detail: profileData,
      }),
    )

    setIsLoading(false)
    setIsSaved(true)

    setTimeout(() => setIsSaved(false), 3000)
  }

  const handleInputChange = (field: keyof ProfileData, value: string | string[]) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Profile Management</h2>
        <Button onClick={handleSave} disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : isSaved ? (
            "✅ Saved!"
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="h-5 w-5 mr-2" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Full Name</label>
              <Input
                value={profileData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Professional Title</label>
              <Input
                value={profileData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Bio</label>
              <Textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Email</label>
              <Input
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Phone</label>
              <Input
                value={profileData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Location</label>
              <Input
                value={profileData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Github className="h-5 w-5 mr-2" />
              Social Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">GitHub URL</label>
              <Input
                value={profileData.githubUrl}
                onChange={(e) => handleInputChange("githubUrl", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">LinkedIn URL</label>
              <Input
                value={profileData.linkedinUrl}
                onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Skills & Languages */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Skills & Languages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Skills (comma-separated)</label>
              <Textarea
                value={profileData.skills.join(", ")}
                onChange={(e) =>
                  handleInputChange(
                    "skills",
                    e.target.value.split(",").map((s) => s.trim()),
                  )
                }
                className="bg-slate-700 border-slate-600 text-white"
                rows={3}
                placeholder="C++, Python, JavaScript, React"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Languages (comma-separated)</label>
              <Textarea
                value={profileData.languages.join(", ")}
                onChange={(e) =>
                  handleInputChange(
                    "languages",
                    e.target.value.split(",").map((s) => s.trim()),
                  )
                }
                className="bg-slate-700 border-slate-600 text-white"
                rows={3}
                placeholder="English (Fluent), Spanish (Intermediate)"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
