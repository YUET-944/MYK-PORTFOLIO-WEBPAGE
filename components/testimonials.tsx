"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Abdul Muhamin",
      role: "Collaboration Partner",
      institution: "Hotel Management Project",
      content:
        "Working with Muhammad on the hotel management system was a great experience. His attention to detail and collaborative approach made the project successful.",
      rating: 5,
      avatar: "👨‍💻",
    },
  ]

  return (
    <section id="testimonials" className="py-20 px-4 bg-slate-800/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-['Poppins']">What People Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Feedback from collaborators and project partners</p>
        </div>

        <div className="flex justify-center">
          <div className="max-w-2xl">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="text-5xl">{testimonial.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <Quote className="h-8 w-8 text-indigo-400 mb-4" />
                      <p className="text-gray-300 text-base leading-relaxed mb-6 italic">"{testimonial.content}"</p>
                      <div>
                        <h4 className="text-white font-semibold text-lg font-['Poppins']">{testimonial.name}</h4>
                        <p className="text-indigo-400 text-base">{testimonial.role}</p>
                        <p className="text-gray-500 text-sm">{testimonial.institution}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
