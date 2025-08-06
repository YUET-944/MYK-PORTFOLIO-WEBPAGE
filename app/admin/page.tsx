"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Eye, LogOut, User, Briefcase, MessageSquare, Settings, Shield } from "lucide-react"
import { AdminLogin } from "@/components/admin/admin-login"
import { ProjectManager } from "@/components/admin/project-manager"
import { ProfileManager } from "@/components/admin/profile-manager"
import { ReviewManager } from "@/components/admin/review-manager"

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const adminToken = localStorage.getItem("adminToken")
    const tokenExpiry = localStorage.getItem("adminTokenExpiry")

    if (adminToken && tokenExpiry) {
      const now = new Date().getTime()
      if (now < Number.parseInt(tokenExpiry)) {
        setIsAuthenticated(true)
      } else {
        // Token expired, remove it
        localStorage.removeItem("adminToken")
        localStorage.removeItem("adminTokenExpiry")
      }
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true)
      // Set token with 24 hour expiry
      const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000
      localStorage.setItem("adminToken", "authenticated")
      localStorage.setItem("adminTokenExpiry", expiryTime.toString())
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminTokenExpiry")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-400"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Admin Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-indigo-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
              <p className="text-gray-400 text-sm">Portfolio Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("/", "_blank")}
              className="border-emerald-400/50 text-emerald-400 hover:bg-emerald-400/10"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Live Site
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-red-400/50 text-red-400 hover:bg-red-400/10 bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border border-slate-700">
            <TabsTrigger value="projects" className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span>Projects</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <ProjectManager />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileManager />
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewManager />
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  System Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">Database Status</h3>
                    <Badge className="bg-emerald-500/20 text-emerald-400">Connected</Badge>
                  </div>
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">Last Backup</h3>
                    <p className="text-gray-400 text-sm">Today, 2:30 PM</p>
                  </div>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <Save className="h-4 w-4 mr-2" />
                  Backup Data
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
