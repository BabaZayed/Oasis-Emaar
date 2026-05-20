import type { Metadata } from "next";
import WebPageSchema from "@/components/web-page-schema";

export const metadata: Metadata = {
  title: "Privacy Policy | Oasis Emaar — The Oasis by Emaar",
  description: "Privacy Policy for Oasis Emaar — how we collect, use, and protect your personal information when you visit our website or contact us about The Oasis by Emaar properties.",
  keywords: [
    "Oasis Emaar privacy policy",
    "privacy policy Dubai real estate",
    "data protection Dubai",
    "Emaar property privacy",
    "personal information Dubai",
    "UAE data protection law",
    "GDPR Dubai property",
    "cookie policy Oasis Emaar",
    "Google Analytics privacy",
    "Meta Pixel privacy",
  ],
  openGraph: {
    title: "Privacy Policy | Oasis Emaar",
    description: "How we collect, use, and protect your personal information when you visit our website.",
    url: "https://oasisemaar.com/privacy",
    siteName: "Oasis Emaar",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Oasis Emaar Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Oasis Emaar",
    description: "How we collect, use, and protect your personal information.",
    images: ["/og-image.jpg"],
    creator: "@OasisEmaar",
    site: "@OasisEmaar",
  },
  alternates: { canonical: "https://oasisemaar.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <WebPageSchema
        name="Privacy Policy — Oasis Emaar"
        description="How we collect, use, and protect your personal information."
        url="https://oasisemaar.com/privacy"
        breadcrumbItems={[
          { name: "Home", url: "https://oasisemaar.com" },
          { name: "Privacy Policy", url: "https://oasisemaar.com/privacy" },
        ]}
      />
      <div className="min-h-screen bg-white pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A2332] mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm mb-8">Last updated: May 2026</p>

          <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
            <section>
              <h2 className="font-heading text-xl font-bold text-[#1A2332] mb-3">1. Information We Collect</h2>
              <p className="leading-relaxed">When you visit oasisemaar.com or contact us about The Oasis by Emaar properties, we may collect the following types of personal information: your full name, email address, phone number (including WhatsApp), budget range, purchase timeline, property preferences, and any additional details you provide through our contact forms, WhatsApp, or phone conversations. We also collect standard technical information automatically when you browse our website, including IP address, browser type, device type, pages visited, time spent on pages, and referral source. This technical data is collected through Google Analytics and Meta Pixel cookies as described below.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[#1A2332] mb-3">2. How We Use Your Information</h2>
              <p className="leading-relaxed">We use your personal information to respond to your property inquiries, provide personalised property recommendations, schedule viewings and consultations, send you relevant updates about The Oasis by Emaar projects, process your interest in specific units or clusters, and improve our website and services. We do not sell, rent, or trade your personal information to third parties for marketing purposes. Your data may be shared with Emaar Properties PJSC only to the extent necessary to process your property purchase or inquiry.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[#1A2332] mb-3">3. Cookies and Tracking Technologies</h2>
              <p className="leading-relaxed">Our website uses cookies and similar tracking technologies to enhance your browsing experience and collect analytical data. Google Analytics (GA4) helps us understand how visitors interact with our website so we can improve content and usability. Meta Pixel tracks conversions from Facebook and Instagram advertising to measure the effectiveness of our marketing campaigns. You can control cookie preferences through your browser settings. Disabling cookies may affect certain features of the website.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[#1A2332] mb-3">4. Data Security</h2>
              <p className="leading-relaxed">We implement industry-standard security measures to protect your personal information, including SSL encryption for all data transmissions, secure server infrastructure, restricted access to personal data on a need-to-know basis, and regular security assessments. While we strive to protect your information, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[#1A2332] mb-3">5. Your Rights</h2>
              <p className="leading-relaxed">You have the right to access, correct, update, or delete your personal information at any time. You may also opt out of marketing communications by contacting us at sales@oasisemaar.com or by clicking the unsubscribe link in any marketing email. If you are a resident of the UAE, you may have additional rights under applicable data protection laws including the Dubai International Financial Centre Data Protection Law and the UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[#1A2332] mb-3">6. Contact Us</h2>
              <p className="leading-relaxed">If you have questions about this Privacy Policy or our data practices, please contact us at:</p>
              <p className="leading-relaxed">
                <strong>Oasis Emaar Real Estate Brokerage</strong><br />
                Email: sales@oasisemaar.com<br />
                Phone: +971 52 691 9169<br />
                Address: Al Quoz Street 21, Dubai, UAE
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
