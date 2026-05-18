"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Calendar, Clock, ArrowRight, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { blogPosts, blogCategories, searchPosts } from "@/lib/blog-data";
import { WHATSAPP_LINK } from "@/lib/data";

const categoryColors: Record<string, string> = {
  Investment: "bg-amber-100 text-amber-800 border-amber-200",
  "Buying Guide": "bg-emerald-100 text-emerald-800 border-emerald-200",
  Community: "bg-sky-100 text-sky-800 border-sky-200",
  "Payment Plans": "bg-violet-100 text-violet-800 border-violet-200",
  "Market Analysis": "bg-rose-100 text-rose-800 border-rose-200",
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function BlogPageClient() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    let posts = blogPosts;

    if (activeCategory !== "All") {
      posts = posts.filter((post) => post.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const searched = searchPosts(searchQuery.trim());
      if (activeCategory !== "All") {
        posts = searched.filter((post) => post.category === activeCategory);
      } else {
        posts = searched;
      }
    }

    return posts;
  }, [activeCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[#F5F0E8]">
      {/* Hero Section */}
      <section className="relative bg-[#1A2332] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#C8A45C] blur-[128px]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#C8A45C] blur-[96px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 text-[#C8A45C] text-sm font-body tracking-wider uppercase mb-4">
              <span>Insights & Analysis</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Dubai Real Estate{" "}
              <span className="text-[#C8A45C]">Blog</span>
            </h1>
            <p className="font-body text-white/70 text-lg sm:text-xl leading-relaxed mb-8">
              Expert analysis, investment guides, and community insights for
              The Oasis by Emaar and the Dubai property market.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C8A45C]" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-lg font-body text-base focus:ring-[#C8A45C] focus:border-[#C8A45C]"
              />
            </div>
          </motion.div>
        </div>
        <div className="h-1 gold-gradient" />
      </section>

      {/* Category Filter Tabs */}
      <section className="bg-white border-b border-[#C8A45C]/10 sticky top-16 sm:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-body text-sm px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-[#C8A45C] text-[#1A2332] font-semibold"
                    : "bg-[#F5F0E8] text-[#1A2332]/70 hover:bg-[#C8A45C]/10 hover:text-[#1A2332]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-full bg-[#C8A45C]/10 flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-[#C8A45C]" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-[#1A2332] mb-2">
              No articles found
            </h3>
            <p className="font-body text-[#1A2332]/60">
              Try adjusting your search or category filter.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="mt-4 border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C] hover:text-[#1A2332]"
            >
              Clear filters
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 h-full flex flex-col border border-[#C8A45C]/5">
                    {/* Image */}
                    <div className="relative h-48 sm:h-52 overflow-hidden bg-gradient-to-br from-[#1A2332] to-[#2A3A52]">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#C8A45C]/20 via-transparent to-[#1A2332]/40" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-heading text-white/20 text-6xl font-bold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge
                          className={`${categoryColors[post.category]} text-xs font-semibold border`}
                        >
                          {post.category}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-[#1A2332]/0 group-hover:bg-[#1A2332]/20 transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <h2 className="font-heading text-lg sm:text-xl font-bold text-[#1A2332] mb-3 line-clamp-2 group-hover:text-[#C8A45C] transition-colors duration-200 leading-snug">
                        {post.title}
                      </h2>
                      <p className="font-body text-sm text-[#1A2332]/60 leading-relaxed mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-[#C8A45C]/10">
                        <div className="flex items-center gap-3 text-xs text-[#1A2332]/50 font-body">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(post.date).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-semibold text-[#C8A45C] group-hover:gap-2 transition-all duration-200">
                          Read
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-[#1A2332] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C8A45C] blur-[200px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Explore{" "}
              <span className="text-[#C8A45C]">The Oasis?</span>
            </h2>
            <p className="font-body text-white/60 text-lg mb-8 max-w-2xl mx-auto">
              Get exclusive access to pricing, floor plans, and availability
              across all 9 clusters. Speak with our authorised Emaar sales
              team today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/availability">
                <Button className="gold-gradient text-[#1A2332] font-bold px-8 py-4 rounded-lg text-base hover:opacity-90 transition-opacity w-full sm:w-auto">
                  Check Availability
                </Button>
              </Link>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="border-[#C8A45C]/30 text-[#C8A45C] hover:bg-[#C8A45C]/10 px-8 py-4 rounded-lg text-base w-full sm:w-auto"
                >
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
