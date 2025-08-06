"use server"

// Removed import for Github icon here, as it's not rendered on the server
// import { Github } from 'lucide-react' // Assuming Lucide React is available
// import type { JSX } from "react" // Import JSX to declare JSX.Element

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  topics: string[]
  created_at: string
  updated_at: string
  fork: boolean
  private: boolean
}

// Define a type that matches your existing Project interface, making dynamic fields optional
interface PortfolioProject {
  title: string
  description: string
  fullDescription?: string
  technologies: string[]
  status: string
  icon?: string // Changed from JSX.Element to string
  type: string
  githubUrl: string | null
  gradient?: string // Optional, will default for GitHub projects
  challenges?: string[]
  learned?: string[]
  timeline?: string
}

export async function fetchGitHubProjects(): Promise<PortfolioProject[]> {
  const githubUsername = process.env.GITHUB_USERNAME || "YUET-944" // Use your GitHub username
  const githubPat = process.env.GITHUB_PAT // Your GitHub Personal Access Token

  if (!githubPat) {
    console.warn("GITHUB_PAT environment variable is not set. Cannot fetch GitHub projects.")
    return []
  }

  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&direction=desc`, {
      headers: {
        Authorization: `token ${githubPat}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: {
        revalidate: 3600, // Revalidate data every hour
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Failed to fetch GitHub repos: ${response.status} - ${errorText}`)
      return []
    }

    const repos: GitHubRepo[] = await response.json()

    // Filter out forks and private repositories (unless you want to show private ones)
    const filteredRepos = repos.filter((repo) => !repo.fork && !repo.private)

    const portfolioProjects: PortfolioProject[] = filteredRepos.map((repo) => ({
      title: repo.name
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "), // Format name to Title Case
      description: repo.description || "No description provided.",
      fullDescription: repo.description || "No detailed description available from GitHub.",
      technologies: repo.language ? [repo.language, ...repo.topics] : repo.topics,
      status: "Active", // Default status for GitHub projects
      icon: "github", // Changed to a string identifier
      type: "GitHub Project",
      githubUrl: repo.html_url,
      gradient: "from-gray-700 to-gray-900", // Generic GitHub-themed gradient
      // Challenges, learned, and timeline are not available from GitHub API, so omit them
    }))

    return portfolioProjects
  } catch (error) {
    console.error("Error fetching GitHub projects:", error)
    return []
  }
}
