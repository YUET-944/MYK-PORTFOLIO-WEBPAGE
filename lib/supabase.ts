import { createClient } from "@supabase/supabase-js"

// Check if Supabase environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a mock client for when Supabase is not configured
const createMockClient = () => ({
  from: () => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ data: null, error: new Error("Supabase not configured") }),
    update: () => ({ data: null, error: new Error("Supabase not configured") }),
    delete: () => ({ error: new Error("Supabase not configured") }),
    eq: function() { return this },
    order: function() { return this },
    single: function() { return this },
  }),
})

// Export the client - either real Supabase or mock
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient()

// Export a flag to check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

// Database Types
export interface Project {
  id: string
  title: string
  description: string
  full_description: string
  technologies: string[]
  status: string
  type: string
  github_url: string | null
  live_url: string | null
  image_url: string | null
  gradient: string
  challenges: string[]
  learned: string[]
  timeline: string
  created_at: string
  updated_at: string
  is_featured: boolean
  order_index: number
}

export interface Profile {
  id: string
  name: string
  title: string
  bio: string
  email: string
  phone: string
  location: string
  github_url: string
  linkedin_url: string
  resume_url: string | null
  avatar_url: string | null
  skills: string[]
  languages: string[]
  roles: string[]
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  name: string
  role: string
  company: string | null
  email: string
  rating: number
  review: string
  status: "pending" | "approved" | "rejected"
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  username: string
  password_hash: string
  email: string
  last_login: string | null
  created_at: string
}
