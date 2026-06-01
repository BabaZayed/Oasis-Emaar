"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to analytics
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#0D1B2A]">
      <div className="max-w-lg mx-auto px-4 text-center">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-[#C8A45C]/10 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-[#C8A45C]" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
          Something Went Wrong
        </h1>

        {/* Description */}
        <p className="font-body text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
          We encountered an unexpected error. This has been logged and our team will look into it.
          Please try again or navigate back to the homepage.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={reset}
            size="lg"
            className="gold-gradient text-[#1A2332] font-bold px-8 py-6 rounded-md hover:opacity-90 w-full sm:w-auto"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          <Link href="/">
            <Button
              size="lg"
              variant="outline"
              className="border-[#C8A45C] text-[#C8A45C] font-bold px-8 py-6 rounded-md hover:bg-[#C8A45C]/10 hover:text-[#C8A45C] w-full sm:w-auto"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
