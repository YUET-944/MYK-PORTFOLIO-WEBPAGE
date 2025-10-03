"use server"

import nodemailer from "nodemailer" // Import nodemailer
import { google } from "googleapis" // Import googleapis

export async function sendContactEmail(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  // Validate required fields
  if (!firstName || !lastName || !email || !subject || !message) {
    throw new Error("All fields are required")
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format")
  }

  // Test mode - log the data and return success
  console.log("=== CONTACT FORM SUBMISSION TEST ===")
  console.log("Timestamp:", new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" }))
  console.log("Name:", `${firstName} ${lastName}`)
  console.log("Email:", email)
  console.log("Subject:", subject)
  console.log("Message:", message)
  console.log("=== END TEST DATA ===")

  // Try to save to Google Sheets
  try {
    await saveContactToSheets({
      firstName,
      lastName,
      email,
      subject,
      message,
      timestamp: new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" }),
    })
    console.log("✅ Contact saved to Google Sheets successfully")
  } catch (sheetsError) {
    console.error("❌ Failed to save to Google Sheets:", sheetsError)
  }

  // Send email directly via Nodemailer (Gmail SMTP)
  const gmailEmail = process.env.GMAIL_EMAIL
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

  if (!gmailEmail || !gmailAppPassword) {
    console.error("⚠️ GMAIL_EMAIL or GMAIL_APP_PASSWORD environment variables are not configured. Email not sent.")
    return {
      success: false,
      message: "Email service not configured. Please set GMAIL_EMAIL and GMAIL_APP_PASSWORD environment variables.",
    }
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailEmail,
        pass: gmailAppPassword,
      },
    })

    const mailOptions = {
      from: gmailEmail, // Send from your configured Gmail address
      to: gmailEmail, // Receive messages at your configured Gmail address
      subject: `Portfolio Contact: ${subject} (from ${firstName} ${lastName})`, // Include sender in subject
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 24px; text-align: center;">New Portfolio Contact</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #374151; margin-top: 0;">Contact Details</h2>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #6366f1;">Name:</strong>
              <span style="color: #374151; margin-left: 10px;">${firstName} ${lastName}</span>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #6366f1;">Sender Email:</strong>
              <a href="mailto:${email}" style="color: #10b981; margin-left: 10px; text-decoration: none;">${email}</a>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #6366f1;">Subject:</strong>
              <span style="color: #374151; margin-left: 10px;">${subject}</span>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #6366f1;">Message:</strong>
              <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 10px; border-left: 4px solid #6366f1;">
                <p style="color: #374151; margin: 0; line-height: 1.6;">${message}</p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                This message was sent from your portfolio website contact form.
              </p>
              <p style="color: #6b7280; font-size: 14px; margin: 5px 0 0 0;">
                Sent on: ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #6b7280; font-size: 12px;">
              © ${new Date().getFullYear()} Muhammad Younas Khan (MYK) Portfolio
            </p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log("✅ Email sent successfully via Nodemailer (Gmail SMTP)")
    return { success: true, message: "Message sent successfully!" }
  } catch (emailError) {
    console.error("❌ Email sending failed via Nodemailer:", emailError)
    return { success: false, message: "Failed to send message. Please check your email configuration and Vercel logs." }
  }
}

// Function to save contact data to Google Sheets
async function saveContactToSheets(data: {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
  timestamp: string
}) {
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

    // Prepare the row data
    const values = [
      [
        data.timestamp,
        data.firstName,
        data.lastName,
        data.email,
        data.subject,
        data.message,
        "New", // Status column
      ],
    ]

    // Append to the Contacts sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Contacts!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    })

    return response.data
  } catch (error) {
    console.error("Google Sheets error in saveContactToSheets:", error)
    throw error
  }
}
