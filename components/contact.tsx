"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Github, Linkedin, Send, CheckCircle, AlertCircle } from "lucide-react"
import { sendContactEmail } from "@/app/actions/contact"

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "mykjcs2023@gmail.com",
      href: "mailto:mykjcs2023@gmail.com",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "0315-5705944",
      href: "tel:+923155705944",
      gradient: "from-emerald-400 to-emerald-600",
    },
  ]

  const socialLinks = [
    {
      icon: <Github className="h-6 w-6" />,
      label: "GitHub",
      href: "https://github.com/YUET-944",
      username: "YUET-944",
      gradient: "from-gray-400 to-gray-600",
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      label: "LinkedIn",
      href: "https://linkedin.com/in/muhammad-younas-khan-72b102264",
      username: "muhammad-younas-khan",
      gradient: "from-blue-400 to-blue-600",
    },
  ]

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await sendContactEmail(formData)
      if (!result?.success) {
        throw new Error(result?.message || "Email service not configured.")
      }
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error sending email:", error)
      setError(
        error instanceof Error ? error.message : "Failed to send message. Please check your connection or try later.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setError(null)
  }

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-['Poppins']">Get In Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 font-['Poppins']">Contact Information</h3>
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className={`bg-gradient-to-r ${info.gradient} p-3 rounded-xl`}>
                    <div className="text-white">{info.icon}</div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium font-['Poppins']">{info.label}</h4>
                    <a href={info.href} className="text-gray-300 hover:text-indigo-400 transition-colors">
                      {info.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <h4 className="text-xl font-semibold text-white mb-4 font-['Poppins']">Connect With Me</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group hover:scale-105"
                >
                  <div
                    className={`bg-gradient-to-r ${social.gradient} p-2 rounded-lg group-hover:scale-110 transition-transform`}
                  >
                    <div className="text-white">{social.icon}</div>
                  </div>
                  <div>
                    <p className="text-white font-medium font-['Poppins']">{social.label}</p>
                    <p className="text-gray-400 text-sm">{social.username}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardHeader>
                <CardTitle className="text-white font-['Poppins']">Send Me a Message</CardTitle>
                <p className="text-gray-400 text-sm">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2 font-['Poppins']">Message Sent!</h3>
                    <p className="text-gray-400 mb-4">Thank you for reaching out. I'll get back to you soon!</p>
                    <Button
                      variant="outline"
                      onClick={resetForm}
                      className="border-indigo-400/50 text-indigo-400 hover:bg-indigo-400/10 bg-transparent"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    {error && (
                      <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 text-red-400" />
                        <p className="text-red-400 text-sm">{error}</p>
                      </div>
                    )}

                    <form action={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-white text-sm font-medium mb-2 block">
                            First Name <span className="text-red-400">*</span>
                          </label>
                          <Input
                            name="firstName"
                            placeholder="Your first name"
                            required
                            disabled={isSubmitting}
                            className="bg-slate-900/50 border-slate-600/50 text-white placeholder:text-gray-400 focus:border-indigo-400 disabled:opacity-50"
                          />
                        </div>
                        <div>
                          <label className="text-white text-sm font-medium mb-2 block">
                            Last Name <span className="text-red-400">*</span>
                          </label>
                          <Input
                            name="lastName"
                            placeholder="Your last name"
                            required
                            disabled={isSubmitting}
                            className="bg-slate-900/50 border-slate-600/50 text-white placeholder:text-gray-400 focus:border-indigo-400 disabled:opacity-50"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <Input
                          type="email"
                          name="email"
                          placeholder="your.email@example.com"
                          required
                          disabled={isSubmitting}
                          className="bg-slate-900/50 border-slate-600/50 text-white placeholder:text-gray-400 focus:border-indigo-400 disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">
                          Subject <span className="text-red-400">*</span>
                        </label>
                        <Input
                          name="subject"
                          placeholder="What's this about?"
                          required
                          disabled={isSubmitting}
                          className="bg-slate-900/50 border-slate-600/50 text-white placeholder:text-gray-400 focus:border-indigo-400 disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">
                          Message <span className="text-red-400">*</span>
                        </label>
                        <Textarea
                          name="message"
                          placeholder="Your message..."
                          rows={5}
                          required
                          disabled={isSubmitting}
                          className="bg-slate-900/50 border-slate-600/50 text-white placeholder:text-gray-400 focus:border-indigo-400 disabled:opacity-50 resize-none"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
