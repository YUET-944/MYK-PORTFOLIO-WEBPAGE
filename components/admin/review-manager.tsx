"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Trash2, CheckCircle, X } from "lucide-react"

interface Review {
  id: string
  name: string
  role: string
  company: string
  email: string
  rating: number
  review: string
  status: "pending" | "approved" | "rejected"
  timestamp: string
}

export function ReviewManager() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all")

  useEffect(() => {
    // Load reviews from localStorage
    const savedReviews = localStorage.getItem("portfolioReviews")
    if (savedReviews) {
      try {
        const parsedReviews = JSON.parse(savedReviews).map((review: any, index: number) => ({
          id: review.id || index.toString(),
          name: review.name,
          role: review.role,
          company: review.company || "",
          email: review.email || "",
          rating: review.rating,
          review: review.review,
          status: review.status || "approved",
          timestamp: review.timestamp || new Date().toISOString(),
        }))
        setReviews(parsedReviews)
      } catch (error) {
        console.error("Error loading reviews:", error)
      }
    }
  }, [])

  const updateReviewStatus = (id: string, status: "approved" | "rejected") => {
    const updatedReviews = reviews.map((review) => (review.id === id ? { ...review, status } : review))
    setReviews(updatedReviews)
    localStorage.setItem("portfolioReviews", JSON.stringify(updatedReviews))

    // Update the main testimonials section
    const approvedReviews = updatedReviews.filter((r) => r.status === "approved")
    window.dispatchEvent(
      new CustomEvent("reviewsUpdated", {
        detail: approvedReviews,
      }),
    )
  }

  const deleteReview = (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      const updatedReviews = reviews.filter((review) => review.id !== id)
      setReviews(updatedReviews)
      localStorage.setItem("portfolioReviews", JSON.stringify(updatedReviews))
    }
  }

  const filteredReviews = reviews.filter((review) => filter === "all" || review.status === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-emerald-500/20 text-emerald-400"
      case "rejected":
        return "bg-red-500/20 text-red-400"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Review Management</h2>
        <div className="flex space-x-2">
          {["all", "pending", "approved", "rejected"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status as any)}
              className={filter === status ? "bg-indigo-600" : ""}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== "all" && (
                <Badge className="ml-2 bg-white/20">{reviews.filter((r) => r.status === status).length}</Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-semibold">{review.name}</h3>
                  <p className="text-indigo-400 text-sm">{review.role}</p>
                  {review.company && <p className="text-gray-400 text-xs">{review.company}</p>}
                </div>
                <Badge className={getStatusColor(review.status)}>{review.status}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-gray-400 text-sm">({review.rating}/5)</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-4 italic">"{review.review}"</p>

              <div className="text-xs text-gray-500 mb-4">
                <p>Email: {review.email}</p>
                <p>Submitted: {new Date(review.timestamp).toLocaleDateString()}</p>
              </div>

              <div className="flex space-x-2">
                {review.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => updateReviewStatus(review.id, "approved")}
                      className="bg-emerald-600 hover:bg-emerald-700 flex-1"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateReviewStatus(review.id, "rejected")}
                      className="border-red-400/50 text-red-400 hover:bg-red-400/10 flex-1"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </>
                )}

                {review.status === "approved" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateReviewStatus(review.id, "rejected")}
                    className="border-red-400/50 text-red-400 hover:bg-red-400/10"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                )}

                {review.status === "rejected" && (
                  <Button
                    size="sm"
                    onClick={() => updateReviewStatus(review.id, "approved")}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                )}

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteReview(review.id)}
                  className="text-red-400 border-red-400/50 hover:bg-red-400/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="text-center py-12">
            <p className="text-gray-400">{filter === "all" ? "No reviews found." : `No ${filter} reviews found.`}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
