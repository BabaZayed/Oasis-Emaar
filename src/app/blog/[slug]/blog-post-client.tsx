"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Clock,
  ChevronRight,
  Share2,
  MessageCircle,
  Twitter,
  Linkedin,
  Facebook,
  Copy,
  Check,
  User,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getRelatedPosts, type BlogPost } from "@/lib/blog-data";
import { WHATSAPP_LINK, EMAIL } from "@/lib/data";

const categoryColors: Record<string, string> = {
  Investment: "bg-amber-100 text-amber-800 border-amber-200",
  "Buying Guide": "bg-emerald-100 text-emerald-800 border-emerald-200",
  Community: "bg-sky-100 text-sky-800 border-sky-200",
  "Payment Plans": "bg-violet-100 text-violet-800 border-violet-200",
  "Market Analysis": "bg-rose-100 text-rose-800 border-rose-200",
};

interface TableOfContentsItem {
  id: string;
  text: string;
}

function extractHeadings(content: string): TableOfContentsItem[] {
  const regex = /<h2[^>]*>(.*?)<\/h2>/g;
  const headings: TableOfContentsItem[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    const text = match[1].replace(/<[^>]*>/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ id, text });
  }
  return headings;
}

function addIdsToHeadings(content: string): string {
  return content.replace(
    /<h2([^>]*)>(.*?)<\/h2>/g,
    (fullMatch, attrs, innerText) => {
      const text = innerText.replace(/<[^>]*>/g, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return `<h2${attrs} id="${id}">${innerText}</h2>`;
    }
  );
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const pathname = usePathname();
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const headings = useMemo(() => extractHeadings(post.content), [post.content]);

  const handleScroll = useCallback(() => {
    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    let current = "";
    for (const el of headingElements) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 120) {
        current = el.id;
      }
    }
    setActiveHeading(current);
  }, [headings]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const relatedPosts = getRelatedPosts(post.slug, 3);
  const processedContent = addIdsToHeadings(post.content);
  const currentUrl = `https://oasisemaar.com${pathname}`;

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(post.title + " " + currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F0E8]">
      {/* Hero Section */}
      <section className="relative bg-[#1A2332] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#C8A45C] blur-[128px]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#C8A45C] blur-[96px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 sm:pt-40 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-sm font-body text-white/50 mb-6"
            >
              <Link
                href="/"
                className="hover:text-[#C8A45C] transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link
                href="/blog"
                className="hover:text-[#C8A45C] transition-colors"
              >
                Blog
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white/80 truncate max-w-[200px] sm:max-w-none">
                {post.category}
              </span>
            </nav>

            {/* Category */}
            <Badge
              className={`${categoryColors[post.category]} text-xs font-semibold border mb-4`}
            >
              {post.category}
            </Badge>

            {/* Title */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm font-body text-white/60">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#C8A45C]" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#C8A45C]" />
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#C8A45C]" />
                {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
        <div className="h-1 gold-gradient" />
      </section>

      {/* Article Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex gap-8 lg:gap-12">
          {/* Sidebar - Table of Contents (Desktop) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-[#C8A45C]/5">
                <h3 className="font-heading text-sm font-bold text-[#1A2332] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#C8A45C]" />
                  Contents
                </h3>
                <nav className="space-y-1">
                  {headings.map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById(heading.id)
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className={`block text-sm font-body py-1.5 px-2 rounded transition-colors duration-200 line-clamp-2 ${
                        activeHeading === heading.id
                          ? "text-[#C8A45C] bg-[#C8A45C]/5 font-semibold"
                          : "text-[#1A2332]/60 hover:text-[#C8A45C] hover:bg-[#C8A45C]/5"
                      }`}
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Share Buttons - Desktop */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-[#C8A45C]/5 mt-4">
                <h3 className="font-heading text-sm font-bold text-[#1A2332] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#C8A45C]" />
                  Share
                </h3>
                <div className="flex flex-col gap-2">
                  <a
                    href={shareLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-body py-2 px-3 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                  <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-body py-2 px-3 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </a>
                  <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-body py-2 px-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-body py-2 px-3 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 text-sm font-body py-2 px-3 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors w-full"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Article */}
          <article className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-[#C8A45C]/5 overflow-hidden"
            >
              <div
                className="prose prose-lg max-w-none p-6 sm:p-8 lg:p-10 font-body text-[#1A2332]/80 leading-relaxed
                  [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:text-[#1A2332] [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:scroll-mt-28
                  [&_p]:mb-5 [&_p]:leading-relaxed
                  [&_strong]:text-[#1A2332] [&_strong]:font-semibold
                  [&_a]:text-[#C8A45C] [&_a]:underline [&_a]:decoration-[#C8A45C]/30 [&_a]:underline-offset-2 [&_a]:hover:decoration-[#C8A45C]
                  [&_ul]:my-4 [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:text-[#1A2332]/70
                  [&_ol]:my-4 [&_ol]:pl-5 [&_ol]:space-y-2 [&_ol]:list-decimal [&_ol]:text-[#1A2332]/70
                  [&_blockquote]:border-l-4 [&_blockquote]:border-[#C8A45C] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#1A2332]/60
                "
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              {/* Tags */}
              <div className="px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8 lg:pb-10 pt-4 border-t border-[#C8A45C]/10">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-body font-semibold text-[#1A2332]/50">
                    Tags:
                  </span>
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs font-body border-[#C8A45C]/20 text-[#1A2332]/60"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Mobile Share Bar */}
            <div className="lg:hidden mt-6">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-[#C8A45C]/5">
                <h3 className="font-heading text-sm font-bold text-[#1A2332] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#C8A45C]" />
                  Share this article
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  <a
                    href={shareLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 text-xs font-body py-3 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                  <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 text-xs font-body py-3 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                    Twitter
                  </a>
                  <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 text-xs font-body py-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </a>
                  <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 text-xs font-body py-3 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                    Facebook
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="flex flex-col items-center gap-1 text-xs font-body py-3 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            {/* Author Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-8 bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-[#C8A45C]/5"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-[#1A2332]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-bold text-[#1A2332]">
                    {post.author}
                  </h3>
                  <p className="font-body text-sm text-[#1A2332]/60 mt-1 leading-relaxed">
                    Specialised in Dubai real estate analysis, The Oasis by
                    Emaar project insights, and luxury property investment
                    advisory. Contact us for expert guidance on purchasing
                    within The Oasis community.
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-body text-[#C8A45C] hover:underline flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-sm font-body text-[#C8A45C] hover:underline"
                    >
                      {EMAIL}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-8 bg-[#1A2332] rounded-xl p-6 sm:p-8 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#C8A45C] blur-[100px]" />
              </div>
              <div className="relative">
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
                  Interested in{" "}
                  <span className="text-[#C8A45C]">The Oasis?</span>
                </h3>
                <p className="font-body text-white/60 mb-6 max-w-lg mx-auto">
                  Get exclusive pricing, floor plans, and availability
                  across all 9 clusters. Speak with our authorised team.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link href="/availability">
                    <Button className="gold-gradient text-[#1A2332] font-bold px-8 py-4 rounded-lg text-base hover:opacity-90 transition-opacity w-full sm:w-auto">
                      Check Availability
                    </Button>
                  </Link>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="border-[#C8A45C]/30 text-[#C8A45C] hover:bg-[#C8A45C]/10 px-8 py-4 rounded-lg text-base w-full sm:w-auto"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp Us
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mt-12"
              >
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#1A2332] mb-6">
                  Related Articles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="group block"
                    >
                      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-[#C8A45C]/5 h-full flex flex-col">
                        <div className="h-32 bg-gradient-to-br from-[#1A2332] to-[#2A3A52] relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#C8A45C]/10 via-transparent to-transparent" />
                          <div className="absolute top-3 left-3">
                            <Badge
                              className={`${categoryColors[related.category]} text-[10px] font-semibold border`}
                            >
                              {related.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                          <h4 className="font-heading text-sm sm:text-base font-bold text-[#1A2332] mb-2 line-clamp-2 group-hover:text-[#C8A45C] transition-colors leading-snug">
                            {related.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-[#1A2332]/50 font-body mt-auto pt-3">
                            <Clock className="w-3 h-3" />
                            {related.readTime}
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </article>
        </div>
      </section>
    </main>
  );
}
