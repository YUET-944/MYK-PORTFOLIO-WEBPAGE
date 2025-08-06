"use server"

import { createReview } from "@/lib/database"
import { isSupabaseConfigured } from "@/lib/supabase"

export async function submitReview(formData: FormData) {
  const name = formData.get("name") as string
  const role = formData.get("role") as string
  const email = formData.get("email") as string
  const company = (formData.get("company") as string) || ""
  const rating = formData.get("rating") as string
  const review = formData.get("review") as string

  // Validate required fields
  if (!name || !role || !email || !rating || !review) {
    return { success: false, message: "All required fields must be filled" }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, message: "Invalid email format" }
  }

  // Validate rating
  const ratingNum = Number.parseInt(rating)
  if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return { success: false, message: "Rating must be between 1 and 5" }
  }

  if (!isSupabaseConfigured) {
    return { 
      success: false, 
      message: "Review submission is not available in demo mode. Please configure Supabase to enable this feature." 
    }
  }

  try {
    const reviewData = {
      name,
      role,
      email,
      company: company || null,
      rating: ratingNum,
      review,
      status: "pending" as const, // Reviews start as pending for moderation
    }

    const createdReview = await createReview(reviewData)

    if (!createdReview) {
      return { success: false, message: "Failed to submit review. Please try again." }
    }

    return {
      success: true,
      message: "Review submitted successfully! It will appear after approval.",
      reviewData: {
        ...reviewData,
        id: createdReview.id,
        timestamp: createdReview.created_at,
      },
    }
  } catch (error) {
    console.error("Error submitting review:", error)
    return { success: false, message: "Failed to submit review. Please try again." }
  }
}
