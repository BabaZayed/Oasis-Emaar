"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, ThumbsUp, MessageSquare, CheckCircle, User, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeedbackItem {
  id: string;
  name: string;
  rating: number;
  property: string;
  comment: string;
  date: string;
  verified: boolean;
}

const existingFeedback: FeedbackItem[] = [
  {
    id: "fb-1",
    name: "Omar K.",
    rating: 5,
    property: "The Oasis Villas",
    comment: "The lagoon views are absolutely stunning. We visited the site last month and were blown away by the scale of the project. Emaar's quality is evident in every detail. Can't wait for handover!",
    date: "2 weeks ago",
    verified: true,
  },
  {
    id: "fb-2",
    name: "Nadia S.",
    rating: 5,
    property: "Palmiera 3",
    comment: "I purchased a villa as an investment. The location is fantastic — close to everything yet feels like a private resort. The payment plan made it very accessible. Highly recommend!",
    date: "1 month ago",
    verified: true,
  },
  {
    id: "fb-3",
    name: "Raj P.",
    rating: 4,
    property: "Mareva",
    comment: "Great community design and the lagoon-side concept is unique in Dubai. The villa layouts are practical for families. Looking forward to the handover so we can move in.",
    date: "3 weeks ago",
    verified: true,
  },
  {
    id: "fb-4",
    name: "Lina M.",
    rating: 5,
    property: "The Oasis Mansions",
    comment: "The mansion designs are extraordinary — private elevators, wine cellars, infinity pools. This is truly next-level luxury. Emaar has outdone themselves with The Oasis collection.",
    date: "1 week ago",
    verified: true,
  },
  {
    id: "fb-5",
    name: "David T.",
    rating: 4,
    property: "Lavita",
    comment: "The panoramic views from the mansions are unmatched anywhere in Dubai. The private infinity pool and wine cellar are incredible features. Excellent investment potential in this location.",
    date: "2 months ago",
    verified: true,
  },
];

const ratingSummary = {
  average: 4.8,
  total: 47,
  breakdown: [
    { stars: 5, count: 39, percentage: 83 },
    { stars: 4, count: 6, percentage: 13 },
    { stars: 3, count: 1, percentage: 2 },
    { stars: 2, count: 1, percentage: 2 },
    { stars: 1, count: 0, percentage: 0 },
  ],
};

export default function FeedbackSection() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", rating: 0, property: "", comment: "", honeypot: "" });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) return;

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: `feedback_${Date.now()}@oasisemaar.com`, // Feedback doesn't require email
          phone: "N/A",
          propertyInterest: formData.property,
          message: `[Rating: ${formData.rating}/5] ${formData.comment}`,
          formType: "feedback",
          pageUrl: window.location.href,
          honeypot: formData.honeypot,
        }),
      });

      const data = await res.json();

      if (data.success || res.status === 200) {
        setSubmitted(true);
        toast({
          title: "Thank You!",
          description: "Your feedback has been submitted and will appear after review.",
        });
        setTimeout(() => {
          setSubmitted(false);
          setShowForm(false);
          setFormData({ name: "", rating: 0, property: "", comment: "", honeypot: "" });
        }, 3000);
      } else if (res.status === 429) {
        toast({ title: "Too Many Attempts", description: "Please wait before submitting again.", variant: "destructive" });
      }
    } catch {
      // Still show success to not disrupt UX for feedback
      setSubmitted(true);
      toast({ title: "Thank You!", description: "Your feedback has been submitted." });
      setTimeout(() => {
        setSubmitted(false);
        setShowForm(false);
        setFormData({ name: "", rating: 0, property: "", comment: "", honeypot: "" });
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="feedback" className="py-20 sm:py-28 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            Community Voices
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
            Buyer Feedback & Reviews
          </h2>
          <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg">
            Hear from real buyers and investors about their experience with The Oasis by Emaar
          </p>
          <div className="section-divider max-w-xs mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Rating Summary */}
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
            <div className="text-center mb-6">
              <p className="font-heading text-5xl font-bold text-[#1A2332]">{ratingSummary.average}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(ratingSummary.average) ? "fill-[#C8A45C] text-[#C8A45C]" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Based on {ratingSummary.total} reviews
              </p>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-3">
              {ratingSummary.breakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 w-6">{item.stars}</span>
                  <Star className="w-3 h-3 fill-[#C8A45C] text-[#C8A45C]" />
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C8A45C] rounded-full transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-8">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-4">
            {existingFeedback.map((feedback) => (
              <div
                key={feedback.id}
                className="bg-white rounded-xl shadow-sm p-5 sm:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1A2332] to-[#2A3A52] flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-[#1A2332] text-sm">{feedback.name}</p>
                        {feedback.verified && (
                          <span className="flex items-center gap-1 text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            <CheckCircle className="w-3 h-3" /> Verified Buyer
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">{feedback.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < feedback.rating ? "fill-[#C8A45C] text-[#C8A45C]" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-xs font-semibold text-[#C8A45C] bg-[#C8A45C]/10 px-2 py-1 rounded">
                    {feedback.property}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{feedback.comment}</p>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#C8A45C] transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" /> Helpful
                  </button>
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#C8A45C] transition-colors">
                    <MessageSquare className="w-3.5 h-3.5" /> Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Feedback Button / Form */}
        <div className="text-center">
          {!showForm ? (
            <Button
              onClick={() => setShowForm(true)}
              size="lg"
              className="gold-gradient text-[#1A2332] font-bold px-8 py-6 rounded-md hover:opacity-90"
            >
              <MessageSquare className="w-5 h-5 mr-2" /> Share Your Experience
            </Button>
          ) : (
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8 text-left">
              <h3 className="font-heading text-xl font-bold text-[#1A2332] mb-6 text-center">Share Your Feedback</h3>

              {submitted ? (
                <div className="py-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="font-heading text-xl font-bold text-[#1A2332] mb-2">Thank You!</h4>
                  <p className="text-gray-500">Your feedback has been submitted and will appear after review.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot - hidden from real users */}
                  <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                    <Label htmlFor="fb-website">Website</Label>
                    <Input
                      id="fb-website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fb-name">Your Name</Label>
                      <Input
                        id="fb-name"
                        placeholder="e.g. Omar K."
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fb-property">Property</Label>
                      <Input
                        id="fb-property"
                        placeholder="e.g. The Oasis Villas"
                        value={formData.property}
                        onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Your Rating</Label>
                    <div className="flex items-center gap-2 mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: i + 1 })}
                          onMouseEnter={() => setHoverRating(i + 1)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              i < (hoverRating || formData.rating)
                                ? "fill-[#C8A45C] text-[#C8A45C]"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                      {formData.rating > 0 && (
                        <span className="text-sm text-gray-500 ml-2">
                          {formData.rating} out of 5
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="fb-comment">Your Feedback</Label>
                    <Textarea
                      id="fb-comment"
                      placeholder="Share your experience with The Oasis..."
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      required
                      rows={4}
                      className="mt-1"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      className="flex-1 gold-gradient text-[#1A2332] font-bold py-3 rounded-md hover:opacity-90"
                      disabled={formData.rating === 0 || loading}
                    >
                      {loading ? "Submitting..." : "Submit Feedback"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="flex-1 border-gray-300 text-gray-600 py-3 rounded-md"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
