import type { Metadata } from "next";
import WebPageSchema from "@/components/web-page-schema";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Oasis Emaar — the terms and conditions governing your use of our website and services related to The Oasis by Emaar properties.",
  alternates: { canonical: "https://oasisemaar.com/terms" },
};

export default function TermsPage() {
  return (
    <>
      <WebPageSchema
        name="Terms of Service — Oasis Emaar"
        description="Terms and conditions governing your use of our website and services."
        url="https://oasisemaar.com/terms"
        breadcrumbItems={[
          { name: "Home", url: "https://oasisemaar.com" },
          { name: "Terms of Service", url: "https://oasisemaar.com/terms" },
        ]}
      />
      <div className="min-h-screen bg-white pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A2332] mb-2">Terms of Service</h1>
          <p className="text-gray-500 text-sm mb-8">Last updated: May 2026</p>

          <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
            <section>
              <h2 className="font-heading text-xl font-bold text-[#1A2332] mb-3">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">By accessing or using the website oasisemaar.com (the &quot;Site&quot;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not use the Site. These terms apply to all visitors, users, and others who access or use the Site. We reserve the right to modify these terms at any time, and your continued use of the Site after any changes constitutes acceptance of the new terms.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[#1A2332] mb-3">2. Nature of Services</h2>
              <p className="leading-relaxed">Oasis Emaar is an independent authorised real estate brokerage that acts as a sales agent for Emaar Properties PJSC for The Oasis community in Dubai. We are not Emaar Properties PJSC, and we do not represent ourselves as such. All property information, pricing, specifications, and handover dates displayed on this Site are provided for informational and marketing purposes only and are subject to change by the developer without notice. Images, renders, and artistic impressions are indicative only and do not represent the final product. Nothing on this Site constitutes a binding offer or contract for the sale of any property.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[#1A2332] mb-3">3. Property Information</h2>
              <p className="leading-relaxed">While we make every effort to ensure the accuracy of property information, including prices, sizes, floor plans, and availability, we do not warrant or guarantee the accuracy, completeness, or currency of such information. Prices are starting prices and may vary based on unit selection, plot position, and payment plan. Availability is subject to change without notice as units may be sold or reserved at any time. For the most current and accurate information, please contact us directly to confirm pricing and availability before making any decisions.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[#1A2332] mb-3">4. Intellectual Property</h2>
              <p className="leading-relaxed">All content on this Site, including text, graphics, logos, images, and software, is the property of Oasis Emaar or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content on this Site without our prior written consent. Emaar, The Oasis, Address, Palace, and related names and logos are trademarks of Emaar Properties PJSC and are used on this Site with authorisation for marketing purposes only.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[#1A2332] mb-3">5. Limitation of Liability</h2>
              <p className="leading-relaxed">To the maximum extent permitted by applicable law, Oasis Emaar shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site or reliance on any information contained herein. This includes, without limitation, damages for loss of profits, data, or other intangible losses, even if we have been advised of the possibility of such damages. Our total liability to you for all claims arising out of or relating to the use of the Site shall not exceed the amount you paid us, if any, to access the Site.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[#1A2332] mb-3">6. Governing Law</h2>
              <p className="leading-relaxed">These Terms of Service shall be governed by and construed in accordance with the laws of the Emirate of Dubai and the applicable federal laws of the United Arab Emirates. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[#1A2332] mb-3">7. Contact</h2>
              <p className="leading-relaxed">For questions about these Terms of Service, please contact us at sales@oasisemaar.com or +971 52 691 9169.</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
