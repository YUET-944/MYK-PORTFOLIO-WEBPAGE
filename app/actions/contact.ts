"use server"

import nodemailer from "nodemailer"
import { createContactMessage } from "@/lib/database"
import { isSupabaseConfigured } from "@/lib/supabase"

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

  try {
    // Save to database if configured
    if (isSupabaseConfigured) {
      const saved = await createContactMessage({
        first_name: firstName,
        last_name: lastName,
        email,
        subject,
        message,
      })

      if (saved) {
        console.log("✅ Contact message saved to Supabase database")
      } else {
        console.warn("⚠️ Failed to save contact message to database")
      }
    } else {
      console.log("📝 Supabase not configured - skipping database save")
    }

    // Send email if configured
    const mykGmailEmail = process.env.MYK_GMAIL_EMAIL
    const mykGmailAppPassword = process.env.MYK_GMAIL_APP_PASSWORD

    if (mykGmailEmail && mykGmailAppPassword) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: mykGmailEmail,
            pass: mykGmailAppPassword,
          },
        })

        const mailOptions = {
          from: mykGmailEmail,
          to: mykGmailEmail,
          subject: `Portfolio Contact: ${subject} (from ${firstName} ${lastName})`,
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
                    This message was sent from your portfolio website${isSupabaseConfigured ? " and saved to Supabase database" : ""}.
                  </p>
                  <p style="color: #6b7280; font-size: 14px; margin: 5px 0 0 0;">
                    Sent on: ${new Date().toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px;">
                <p style="color: #6b7280; font-size: 12px;">
                  © ${new Date().getFullYear()} Muhammad Younas Khan (MYK) Portfolio${isSupabaseConfigured ? " • Powered by Supabase" : ""}
                </p>
              </div>
            </div>
          `,
        }

        await transporter.sendMail(mailOptions)
        console.log("✅ Email sent successfully via Gmail SMTP")
      } catch (emailError) {
        console.error("❌ Email sending failed:", emailError)
        // Don't fail the entire operation if email fails
      }
    } else {
      console.log("📧 Gmail SMTP not configured - skipping email send")
    }

    return { success: true, message: "Message sent successfully!" }
  } catch (error) {
    console.error("❌ Contact form submission failed:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to send message. Please try again.",
    }
  }
}
