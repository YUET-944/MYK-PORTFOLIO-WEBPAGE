import { createClient } from '@supabase/supabase-js'
import type { Project, Profile, Review, Testimonial } from './supabase' // Assuming these types are defined in supabase.ts

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is not set. Running in demo mode.')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const isSupabaseConfigured = !!supabase;

// Default/fallback data
const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Social Media MVP",
    description: "Leading a team to develop a comprehensive social media application with chat, short videos, and snap-like stories functionality.",
    full_description: "This project involves building a full-featured social media platform from scratch. Key challenges include real-time messaging, video processing, and scalable architecture. Leading a team of developers while managing project timelines and feature requirements.",
    technologies: ["Team Leadership", "Project Management", "Mobile Development", "Real-time Systems"],
    status: "ongoing",
    type: "team",
    github_url: null,
    live_url: null,
    image_url: null,
    gradient: "from-purple-400 to-purple-600",
    challenges: ["Real-time messaging", "Video processing", "Team coordination"],
    learned: ["Leadership skills", "Project management", "System architecture"],
    timeline: "6 months",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_featured: true,
    order_index: 1,
  },
  {
    id: "2",
    title: "Pharmacy Management System",
    description: "A comprehensive system for managing pharmacy operations with inventory tracking, sales management, and customer records.",
    full_description: "Built using Python and MySQL, this system handles complete pharmacy operations including inventory management, prescription tracking, sales analytics, and customer relationship management. Features automated alerts for low stock and expiry dates.",
    technologies: ["Python", "MySQL", "Database Design", "GUI Development"],
    status: "completed",
    type: "personal",
    github_url: null,
    live_url: null,
    image_url: null,
    gradient: "from-emerald-400 to-emerald-600",
    challenges: ["Complex database relationships", "User interface design", "Data validation"],
    learned: ["Advanced SQL", "Python GUI frameworks", "Database optimization"],
    timeline: "4 months",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_featured: true,
    order_index: 2,
  },
  {
    id: "3",
    title: "AI-Powered Content Generator",
    description: "An application leveraging AI models to generate articles, summaries, and creative content based on user prompts.",
    full_description: "Developed an AI-powered content generation tool using Python (Flask) for the backend and React for the frontend. Integrated with OpenAI's GPT-3 API to generate various forms of text content. Features include customizable prompts, content editing, and export options. Focused on efficient API calls and user-friendly interface design.",
    gradient: "from-red-500 to-orange-600",
    type: "AI/ML Project",
    status: "completed",
    timeline: "Aug 2023 - Oct 2023",
    technologies: ["React", "Python (Flask)", "OpenAI API", "PostgreSQL", "Material-UI"],
    challenges: ["API Rate Limiting", "Content Moderation"],
    learned: ["NLP Fundamentals", "Prompt Engineering"],
    github_url: "https://github.com/YUET-944/ai-content-generator",
    live_url: "https://ai-content-demo.vercel.app",
    is_featured: false,
  },
  {
    id: "4",
    title: "Mobile Expense Tracker",
    description: "A cross-platform mobile application for tracking personal expenses and visualizing spending habits.",
    full_description: "Designed and built a mobile expense tracker using React Native and Firebase. Users can add, categorize, and view their expenses, with data synchronized in real-time. Implemented interactive charts and graphs for spending analysis. Focused on intuitive UX and offline capabilities.",
    gradient: "from-purple-500 to-pink-600",
    type: "Mobile App",
    status: "completed",
    timeline: "Nov 2023 - Jan 2024",
    technologies: ["React Native", "Firebase", "Expo", "Redux"],
    challenges: ["Offline Data Sync", "Cross-platform Compatibility"],
    learned: ["Mobile Development Best Practices", "State Management"],
    github_url: "https://github.com/YUET-944/expense-tracker-app",
    live_url: null,
    is_featured: false,
  },
  {
    id: "5",
    title: "DevOps Automation Dashboard",
    description: "A dashboard to monitor CI/CD pipelines, deployment statuses, and server health metrics.",
    full_description: "Created a DevOps dashboard using Vue.js and a custom Node.js API. Integrated with Jenkins, Docker, and Prometheus to display real-time build statuses, container health, and server performance. Designed for quick insights and proactive issue detection in a development environment.",
    gradient: "from-yellow-500 to-orange-600",
    type: "DevOps Tool",
    status: "in_progress",
    timeline: "Feb 2024 - Present",
    technologies: ["Vue.js", "Node.js", "Docker", "Jenkins", "Prometheus"],
    challenges: ["Data Aggregation", "Real-time Monitoring"],
    learned: ["DevOps Principles", "Containerization"],
    github_url: "https://github.com/YUET-944/devops-dashboard",
    live_url: null,
    is_featured: false,
  },
  {
    id: "6",
    title: "Blockchain Voting System",
    description: "A decentralized voting application built on a private Ethereum blockchain for secure and transparent elections.",
    full_description: "Developed a proof-of-concept blockchain-based voting system using Solidity, Web3.js, and React. Ensured immutability and transparency of votes. Implemented smart contracts for voter registration, candidate management, and vote casting. Focused on security and auditability.",
    gradient: "from-gray-700 to-gray-900",
    type: "Blockchain",
    status: "completed",
    timeline: "Mar 2024 - May 2024",
    technologies: ["Solidity", "Ethereum", "Web3.js", "React", "Truffle"],
    challenges: ["Smart Contract Security", "Gas Optimization"],
    learned: ["Blockchain Fundamentals", "Decentralized Application (DApp) Development"],
    github_url: "https://github.com/YUET-944/blockchain-voting-system",
    live_url: null,
    is_featured: false,
  },
  {
    id: "7",
    title: "Machine Learning Model Deployment",
    description: "Deployed a sentiment analysis machine learning model as a web service using Flask and Docker.",
    full_description: "Packaged a pre-trained sentiment analysis model (trained with TensorFlow) into a RESTful API using Flask. Containerized the application with Docker for easy deployment and scalability. Developed a simple React frontend to interact with the API and demonstrate its functionality.",
    gradient: "from-indigo-500 to-purple-700",
    type: "AI/ML Project",
    status: "completed",
    timeline: "Jun 2024 - Jul 2024",
    technologies: ["Python (Flask)", "TensorFlow", "Docker", "React", "Nginx"],
    challenges: ["Model Optimization", "Deployment Strategy"],
    learned: ["MLOps", "API Design for ML Models"],
    github_url: "https://github.com/YUET-944/ml-model-deployment",
    live_url: "https://sentiment-analysis-demo.vercel.app",
    is_featured: false,
  },
  {
    id: "8",
    title: "IoT Smart Home Dashboard",
    description: "A dashboard to control and monitor smart home devices, displaying real-time sensor data.",
    full_description: "Built an IoT dashboard using Angular and Node.js with MQTT for real-time communication with devices. Features include device control (lights, thermostats), sensor data visualization (temperature, humidity), and automation rules. Focused on responsiveness and secure device communication.",
    gradient: "from-cyan-500 to-blue-700",
    type: "IoT Project",
    status: "ongoing",
    timeline: "Aug 2024 - Present",
    technologies: ["Angular", "Node.js", "MQTT", "Raspberry Pi", "Chart.js"],
    challenges: ["Device Integration", "Data Latency"],
    learned: ["IoT Protocols", "Edge Computing"],
    github_url: "https://github.com/YUET-944/iot-smart-home",
    live_url: null,
    is_featured: false,
  },
  {
    id: "9",
    title: "Serverless API Gateway",
    description: "Developed a scalable and cost-effective API gateway using AWS Lambda and API Gateway.",
    full_description: "Designed and implemented a serverless API gateway to handle incoming requests and route them to various Lambda functions. Used AWS API Gateway for request routing, authentication, and throttling. Focused on building highly available and fault-tolerant microservices.",
    gradient: "from-orange-400 to-red-600",
    type: "Cloud/Serverless",
    status: "completed",
    timeline: "Sep 2024 - Nov 2024",
    technologies: ["AWS Lambda", "AWS API Gateway", "Node.js", "DynamoDB"],
    challenges: ["Cold Starts", "Monitoring Serverless Functions"],
    learned: ["Serverless Architecture", "Cloud Security"],
    github_url: "https://github.com/YUET-944/serverless-api-gateway",
    live_url: null,
    is_featured: false,
  },
  {
    id: "10",
    title: "Custom CMS with Headless WordPress",
    description: "Built a custom content management system using Next.js as a frontend and Headless WordPress as a backend.",
    full_description: "Created a performant and SEO-friendly blog platform by decoupling WordPress from its frontend. Used Next.js for static site generation and GraphQL to fetch content from Headless WordPress. Implemented dynamic routing for posts and categories, and optimized image loading.",
    gradient: "from-pink-500 to-red-700",
    type: "Web Application",
    status: "completed",
    timeline: "Dec 2024 - Feb 2025",
    technologies: ["Next.js", "WordPress (Headless)", "GraphQL", "ACF", "Tailwind CSS"],
    challenges: ["WordPress API Integration", "SEO Optimization"],
    learned: ["Headless CMS", "Static Site Generation"],
    github_url: "https://github.com/YUET-944/headless-wordpress-cms",
    live_url: "https://headless-wp-demo.vercel.app",
    is_featured: true,
  },
  {
    id: "11",
    title: "Data Visualization Dashboard",
    description: "An interactive dashboard for visualizing large datasets with D3.js and React.",
    full_description: "Developed a data visualization dashboard that consumes data from a REST API and renders interactive charts and graphs using D3.js. Implemented features like filtering, zooming, and tooltips for enhanced data exploration. Focused on performance with large datasets.",
    gradient: "from-teal-500 to-emerald-700",
    type: "Data Science",
    status: "completed",
    timeline: "Mar 2025 - May 2025",
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL", "Redux"],
    challenges: ["Large Data Rendering", "Performance Optimization"],
    learned: ["Advanced D3.js", "Data Storytelling"],
    github_url: "https://github.com/YUET-944/data-viz-dashboard",
    live_url: "https://data-viz-demo.vercel.app",
    is_featured: true,
  },
  {
    id: "12",
    title: "Cross-platform Desktop App",
    description: "A desktop application for managing personal finances, built with Electron and React.",
    full_description: "Created a cross-platform desktop application that allows users to track income, expenses, and generate financial reports. Used Electron for desktop integration and React for the UI. Implemented local data storage and export functionalities.",
    gradient: "from-blue-600 to-indigo-800",
    type: "Desktop App",
    status: "in_progress",
    timeline: "Jun 2025 - Present",
    technologies: ["Electron", "React", "SQLite", "Chakra UI"],
    challenges: ["Native OS Integration", "Security"],
    learned: ["Electron Development", "Desktop App Distribution"],
    github_url: "https://github.com/YUET-944/desktop-finance-app",
    live_url: null,
    is_featured: false,
  },
]

const defaultReviews: Review[] = []
const defaultTestimonials: Testimonial[] = []

// Projects
export async function getProjects(filterType: 'all' | 'completed' | 'featured' = 'featured'): Promise<Project[]> {
  if (!isSupabaseConfigured) {
    console.log("📝 Using fallback projects data (Supabase not configured)")
    const allDemoProjects = defaultProjects;

    if (filterType === 'completed') {
      return allDemoProjects.filter(p => p.status === 'completed');
    } else if (filterType === 'featured') {
      return allDemoProjects.filter(p => p.is_featured);
    }
    return allDemoProjects;
  }

  let query = supabase.from('projects').select('*');

  if (filterType === 'featured') {
    query = query.eq('is_featured', true);
  } else if (filterType === 'completed') {
    query = query.eq('status', 'completed');
  }
  // If filterType is 'all', no additional filter is applied, fetching all projects.

  const { data, error } = await query.order('order_index', { ascending: true }).order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching ${filterType} projects from Supabase:`, error);
    return [];
  }
  console.log(`Fetched ${filterType} projects from Supabase:`, data);
  return data as Project[];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  // This function is now redundant as getProjects can handle 'featured' filter
  // but keeping it for backward compatibility if other parts of the app use it directly.
  return getProjects('featured');
}

export async function createProject(
  project: Omit<Project, "id" | "created_at" | "updated_at">,
): Promise<Project | null> {
  if (!isSupabaseConfigured) {
    console.warn("Cannot create project: Supabase not configured")
    return null
  }

  try {
    const { data, error } = await supabase.from("projects").insert([project]).select().single()

    if (error) {
      console.error("Error creating project:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Database connection error:", error)
    return null
  }
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
  if (!isSupabaseConfigured) {
    console.warn("Cannot update project: Supabase not configured")
    return null
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating project:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Database connection error:", error)
    return null
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  if (!isSupabaseConfigured) {
    console.warn("Cannot delete project: Supabase not configured")
    return false
  }

  try {
    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) {
      console.error("Error deleting project:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Database connection error:", error)
    return false
  }
}

// Profile
export async function getProfile(): Promise<Profile | null> {
  if (!isSupabaseConfigured) {
    console.log("📝 Using fallback profile data (Supabase not configured)")
    return {
      id: "1",
      name: "Muhammad Younas Khan",
      title: "Aspiring Full Stack Developer",
      bio: "Passionate Computer Science student at UET Mardan with strong foundation in programming, problem-solving, and database management.",
      email: "mykjcs2023@gmail.com",
      phone: "+923155705944",
      location: "Swat, Pakistan",
      github_url: "https://github.com/YUET-944",
      linkedin_url: "https://linkedin.com/in/muhammad-younas-khan-72b102264",
      resume_url: null,
      avatar_url: null,
      skills: ["C++", "Python", "SQL", "JavaScript", "React", "MySQL"],
      languages: ["Pashto (Native)", "Urdu (Fluent)", "English (Good)"],
      roles: ["Aspiring Full Stack Developer", "Web Developer", "Database Designer"],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }

  try {
    const { data, error } = await supabase.from("profile").select("*").single()

    if (error) {
      console.error("Error fetching profile:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Database connection error:", error)
    return null
  }
}

export async function updateProfile(updates: Partial<Profile>): Promise<Profile | null> {
  if (!isSupabaseConfigured) {
    console.warn("Cannot update profile: Supabase not configured")
    return null
  }

  try {
    const { data, error } = await supabase
      .from("profile")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating profile:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Database connection error:", error)
    return null
  }
}

// Reviews
export async function getApprovedReviews(): Promise<Review[]> {
  if (!isSupabaseConfigured) {
    console.log("📝 Using fallback reviews data (Supabase not configured)")
    return defaultReviews
  }

  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching reviews:", error)
      return defaultReviews
    }

    return data || defaultReviews
  } catch (error) {
    console.error("Database connection error:", error)
    return defaultReviews
  }
}

export async function getAllReviews(): Promise<Review[]> {
  if (!isSupabaseConfigured) {
    console.log("📝 Using fallback reviews data (Supabase not configured)")
    return defaultReviews
  }

  try {
    const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching all reviews:", error)
      return defaultReviews
    }

    return data || defaultReviews
  } catch (error) {
    console.error("Database connection error:", error)
    return defaultReviews
  }
}

export async function createReview(review: Omit<Review, "id" | "created_at" | "updated_at">): Promise<Review | null> {
  if (!isSupabaseConfigured) {
    console.warn("Cannot create review: Supabase not configured")
    return null
  }

  try {
    const { data, error } = await supabase.from("reviews").insert([review]).select().single()

    if (error) {
      console.error("Error creating review:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Database connection error:", error)
    return null
  }
}

export async function updateReviewStatus(id: string, status: "approved" | "rejected"): Promise<Review | null> {
  if (!isSupabaseConfigured) {
    console.warn("Cannot update review status: Supabase not configured")
    return null
  }

  try {
    const { data, error } = await supabase
      .from("reviews")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating review status:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Database connection error:", error)
    return null
  }
}

export async function deleteReview(id: string): Promise<boolean> {
  if (!isSupabaseConfigured) {
    console.warn("Cannot delete review: Supabase not configured")
    return false
  }

  try {
    const { error } = await supabase.from("reviews").delete().eq("id", id)

    if (error) {
      console.error("Error deleting review:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Database connection error:", error)
    return false
  }
}

// Contact Messages
export async function createContactMessage(message: {
  first_name: string
  last_name: string
  email: string
  subject: string
  message: string
}): Promise<boolean> {
  if (!isSupabaseConfigured) {
    console.warn("Cannot save contact message: Supabase not configured")
    return false
  }

  try {
    const { error } = await supabase.from("contact_messages").insert([message])

    if (error) {
      console.error("Error creating contact message:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Database connection error:", error)
    return false
  }
}
