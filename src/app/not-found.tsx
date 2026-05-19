import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, Phone, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F5F0E8]">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <span className="font-heading text-8xl sm:text-9xl font-bold text-[#C8A45C] opacity-30">
            404
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mb-4">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="font-body text-gray-500 max-w-lg mx-auto mb-8 leading-relaxed">
          The page you are looking for may have been moved, deleted, or possibly never existed.
          Let us help you find what you need at The Oasis by Emaar.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/">
            <Button size="lg" className="gold-gradient text-[#1A2332] font-bold px-8 py-6 rounded-md hover:opacity-90 w-full sm:w-auto">
              <Home className="w-5 h-5 mr-2" />
              Back to Homepage
            </Button>
          </Link>
          <Link href="/projects">
            <Button size="lg" variant="outline" className="border-[#1A2332] text-[#1A2332] font-bold px-8 py-6 rounded-md hover:bg-[#1A2332] hover:text-white w-full sm:w-auto">
              <Search className="w-5 h-5 mr-2" />
              Browse Properties
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <h2 className="font-heading text-lg font-bold text-[#1A2332] mb-4">
            Popular Pages
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Projects", href: "/projects" },
              { label: "Availability", href: "/availability" },
              { label: "Payment Plans", href: "/payment-plan" },
              { label: "FAQ", href: "/faq" },
              { label: "Gallery", href: "/gallery" },
              { label: "Inventory", href: "/inventory" },
              { label: "Blog", href: "/blog" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm text-[#1A2332] hover:text-[#C8A45C] transition-colors py-2 px-3 rounded-md hover:bg-[#F5F0E8]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="font-body text-sm text-gray-500 mb-3">
              Need help? Contact us directly:
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="tel:+971526919169"
                className="flex items-center gap-2 text-sm font-semibold text-[#1A2332] hover:text-[#C8A45C] transition-colors"
              >
                <Phone className="w-4 h-4" />
                +971 52 691 9169
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="mailto:sales@oasisemaar.com"
                className="text-sm font-semibold text-[#1A2332] hover:text-[#C8A45C] transition-colors"
              >
                sales@oasisemaar.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
