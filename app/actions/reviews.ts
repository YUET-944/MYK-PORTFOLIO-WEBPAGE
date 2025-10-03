"use server"

import { google } from "googleapis" // Import googleapis

export async function submitReview(formData: FormData) {
  const name = formData.get("name") as string
  const role = formData.get("role") as string
  const email = formData.get("email") as string
  const company = (formData.get("company") as string) || "Not specified"
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

  try {
    const reviewData = {
      timestamp: new Date().toISOString(), // Changed to ISO string for reliable parsing
      name,
      role,
      email,
      company,
      rating: ratingNum, // Store as number
      review,
      status: "Pending Review",
    }

    // Try to save to Google Sheets
    try {
      await appendToReviewsSheet(reviewData)
      console.log("Review saved to Google Sheets successfully")
    } catch (sheetsError) {
      console.error("❌ Failed to save to Google Sheets:", sheetsError)
      // Continue even if sheets fails, but log the error
    }

    return { success: true, message: "Review submitted successfully!", reviewData: reviewData }
  } catch (error) {
    console.error("Error submitting review:", error)
    return { success: false, message: "Failed to submit review. Please try again." }
  }
}

// Function to append review data to Google Sheets
async function appendToReviewsSheet(data: any) {
  try {
    // Ensure googleapis is imported and used here
    const credentials = {
      client_id: "428144697183-pifjll06sn95q6bs3heuq3ef00dscu92.apps.googleusercontent.com",
      client_secret: "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",
      redirect_uris: ["https://myk-portfolio-website.vercel.app/auth/callback"],
    }

    const oauth2Client = new google.auth.OAuth2(
      credentials.client_id,
      credentials.client_secret,
      credentials.redirect_uris[0],
    )

    if (!process.env.GOOGLE_REFRESH_TOKEN) {
      throw new Error("GOOGLE_REFRESH_TOKEN environment variable not configured.")
    }
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    })

    const sheets = google.sheets({ version: "v4", auth: oauth2Client })
    const spreadsheetId = process.env.GOOGLE_SHEET_ID

    if (!spreadsheetId) {
      throw new Error("GOOGLE_SHEET_ID environment variable not configured.")
    }

    // Prepare the row data for reviews
    const values = [
      [data.timestamp, data.name, data.role, data.email, data.company, data.rating, data.review, data.status],
    ]

    // Append to the Reviews sheet (create if doesn't exist)
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Reviews!A:H",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error saving review to sheets:", error)
    throw error
  }
}
