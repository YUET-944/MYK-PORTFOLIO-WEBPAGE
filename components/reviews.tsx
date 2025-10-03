"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star, Send, CheckCircle, AlertCircle, User } from "lucide-react"
import { submitReview } from "@/app/actions/reviews"

export function Reviews() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [reviews, setReviews] = useState<any[]>([]) // State to hold submitted reviews
  const [reviewCount, setReviewCount] = useState(0) // State for review count

  const handleSubmit = async (formData: FormData) => {
    if (rating === 0) {
      setError("Please select a rating")
      return
    }

    formData.append("rating", rating.toString())
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await submitReview(formData)
      if (result.success && result.reviewData) {
        // Ensure reviewData is valid before using
        const { name, role, company, rating, review, timestamp } = result.reviewData
        if (!name || !role || !rating || !review || !timestamp) {
          throw new Error("Incomplete review data received from server.")
        }

        const newReview = {
          name: name,
          role: role,
          company: company,
          rating: rating,
          review: review,
          date: new Date(timestamp).getFullYear().toString(), // Use timestamp directly
          avatar: "👤", // Default avatar
        }
        setReviews((prevReviews) => [newReview, ...prevReviews])
        setReviewCount((prevCount) => prevCount + 1)
        setIsSubmitted(true)
      } else {
        throw new Error(result.message || "Failed to submit review")
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      setError(error instanceof Error ? error.message : "Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setError(null)
    setRating(0)
  }

  return (
    <section id="reviews" className="py-20 px-4 bg-slate-800/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-['Poppins']">Reviews & Feedback</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            What people say about working with me, and share your own experience
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Existing Reviews */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 font-['Poppins'] flex items-center">
              Client Reviews ({reviewCount})
            </h3>
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                  <CardContent className="p-6 text-center text-gray-400">
                    No reviews yet. Be the first to leave one!
                  </CardContent>
                </Card>
              ) : (
                reviews.map((review, index) => (
                  <Card
                    key={index}
                    className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{review.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                            <span className="text-gray-400 text-sm ml-2">({review.rating}/5)</span>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">"{review.review}"</p>
                          <div>
                            <h4 className="text-white font-semibold font-['Poppins']">{review.name}</h4>
                            <p className="text-indigo-400 text-sm">{review.role}</p>
                            <p className="text-gray-500 text-xs">
                              {review.company} • {review.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Review Submission Form */}
          <div>
            <Card className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardHeader>
                <CardTitle className="text-white font-['Poppins'] flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Leave a Review
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  Share your experience working with me or provide feedback on my projects
                </p>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2 font-['Poppins']">Review Submitted!</h3>
                    <p className="text-gray-400 mb-4">
                      Thank you for your feedback. It will be reviewed and published soon!
                    </p>
                    <Button
                      variant="outline"
                      onClick={resetForm}
                      className="border-indigo-400/50 text-indigo-400 hover:bg-indigo-400/10 bg-transparent"
                    >
                      Submit Another Review
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
                            Your Name <span className="text-red-400">*</span>
                          </label>
                          <Input
                            name="name"
                            placeholder="Your full name"
                            required
                            disabled={isSubmitting}
                            className="bg-slate-900/50 border-slate-600/50 text-white placeholder:text-gray-400 focus:border-indigo-400 disabled:opacity-50"
                          />
                        </div>
                        <div>
                          <label className="text-white text-sm font-medium mb-2 block">
                            Your Role <span className="text-red-400">*</span>
                          </label>
                          <Input
                            name="role"
                            placeholder="e.g., Client, Collaborator, Student"
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
                        <label className="text-white text-sm font-medium mb-2 block">Company/Organization</label>
                        <Input
                          name="company"
                          placeholder="Your company or organization (optional)"
                          disabled={isSubmitting}
                          className="bg-slate-900/50 border-slate-600/50 text-white placeholder:text-gray-400 focus:border-indigo-400 disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">
                          Rating <span className="text-red-400">*</span>
                        </label>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoveredRating(star)}
                              onMouseLeave={() => setHoveredRating(0)}
                              className="p-1 transition-transform hover:scale-110"
                              disabled={isSubmitting}
                            >
                              <Star
                                className={`h-6 w-6 transition-colors ${
                                  star <= (hoveredRating || rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                                }`}
                              />
                            </button>
                          ))}
                          <span className="text-gray-400 text-sm ml-2">
                            {rating > 0 ? `${rating}/5` : "Select rating"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">
                          Your Review <span className="text-red-400">*</span>
                        </label>
                        <Textarea
                          name="review"
                          placeholder="Share your experience working with me or feedback on my projects..."
                          rows={5}
                          required
                          disabled={isSubmitting}
                          className="bg-slate-900/50 border-slate-600/50 text-white placeholder:text-gray-400 focus:border-indigo-400 disabled:opacity-50 resize-none"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting || rating === 0}
                        className="w-full bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Submitting Review...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Submit Review
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
