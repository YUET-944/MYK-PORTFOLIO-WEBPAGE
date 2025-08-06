"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react'
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { getApprovedReviews } from "@/lib/database"
import { isSupabaseConfigured } from "@/lib/supabase"
import type { Review } from "@/lib/supabase"

interface TestimonialReview {
  name: string
  role: string
  company?: string
  content: string
  rating: number
  avatar: string
  date: string
}

export function Testimonials() {
  const [currentReview, setCurrentReview] = useState(0)
  const [reviews, setReviews] = useState<TestimonialReview[]>([
    // Default testimonial
    {
      name: "Abdul Muhamin",
      role: "Collaboration Partner",
      company: "Hotel Management Project",
      content:
        "Working with Muhammad on the hotel management system was a great experience. His attention to detail and collaborative approach made the project successful.",
      rating: 5,
      avatar: "👨‍💻",
      date: "2024",
    },
  ])
  const [loading, setLoading] = useState(true)

  // Load reviews from database
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const dbReviews = await getApprovedReviews()
        const formattedReviews: TestimonialReview[] = dbReviews.map((review: Review) => ({
          name: review.name,
          role: review.role,
          company: review.company || undefined,
          content: review.review,
          rating: review.rating,
          avatar: "👤",
          date: new Date(review.created_at).getFullYear().toString(),
        }))

        // Combine default testimonial with database reviews
        setReviews([
          {
            name: "Abdul Muhamin",
            role: "Collaboration Partner",
            company: "Hotel Management Project",
            content:
              "Working with Muhammad on the hotel management system was a great experience. His attention to detail and collaborative approach made the project successful.",
            rating: 5,
            avatar: "👨‍💻",
            date: "2024",
          },
          ...formattedReviews,
        ])
      } catch (error) {
        console.error("Failed to load reviews:", error)
      } finally {
        setLoading(false)
      }
    }

    loadReviews()
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    if (reviews.length > 1) {
      const interval = setInterval(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length)
      }, 5000) // Change slide every 5 seconds

      return () => clearInterval(interval)
    }
  }, [reviews.length])

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const goToReview = (index: number) => {
    setCurrentReview(index)
  }

  if (loading) {
    return (
      <section id="testimonials" className="py-20 px-4 bg-slate-800/30 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-400"></div>
        <p className="ml-4 text-white text-lg">Loading testimonials...</p>
      </section>
    )
  }

  if (reviews.length === 0) {
    return null
  }

  const currentReviewData = reviews[currentReview]

  return (
    <section id="testimonials" className="py-20 px-4 bg-slate-800/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-['Poppins']">What People Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Feedback from collaborators, clients, and project partners ({reviews.length} review
            {reviews.length !== 1 ? "s" : ""})
            {!isSupabaseConfigured && (
              <span className="block mt-2 text-yellow-400 text-sm flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Demo mode - Connect database for dynamic reviews
              </span>
            )}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Review Card */}
          <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-500 group">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="text-6xl md:text-7xl flex-shrink-0 mx-auto md:mx-0">{currentReviewData.avatar}</div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start mb-4">
                    {[...Array(currentReviewData.rating)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-gray-400 text-sm ml-2">({currentReviewData.rating}/5)</span>
                  </div>
                  <Quote className="h-10 w-10 text-indigo-400 mb-6 mx-auto md:mx-0" />
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 italic">
                    "{currentReviewData.content}"
                  </p>
                  <div>
                    <h4 className="text-white font-semibold text-xl md:text-2xl font-['Poppins'] mb-2">
                      {currentReviewData.name}
                    </h4>
                    <p className="text-indigo-400 text-lg mb-1">{currentReviewData.role}</p>
                    {currentReviewData.company && <p className="text-gray-500 text-sm">{currentReviewData.company}</p>}
                    <p className="text-gray-500 text-sm mt-2">{currentReviewData.date}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Controls */}
          {reviews.length > 1 && (
            <>
              {/* Previous/Next Buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevReview}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full p-3 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextReview}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full p-3 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                  aria-label="Next review"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-8 space-x-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToReview(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentReview
                        ? "bg-indigo-400 scale-125"
                        : "bg-gray-600 hover:bg-gray-500 hover:scale-110"
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mt-6 max-w-md mx-auto">
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <div
                    className="bg-gradient-to-r from-indigo-400 to-emerald-400 h-1 rounded-full transition-all duration-500"
                    style={{ width: `${((currentReview + 1) / reviews.length) * 100}%` }}
                  />
                </div>
                <p className="text-center text-gray-400 text-sm mt-2">
                  {currentReview + 1} of {reviews.length}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Auto-play indicator */}
        {reviews.length > 1 && (
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm flex items-center justify-center">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mr-2"></span>
              Auto-playing every 5 seconds
              {isSupabaseConfigured ? " • Powered by Supabase" : " • Demo mode"}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
