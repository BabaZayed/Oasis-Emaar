import type { Metadata } from "next";
import WebPageSchema from "@/components/web-page-schema";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Legal disclaimer for Oasis Emaar — important notices about property information, developer relationships, and investment advice related to The Oasis by Emaar.",
  alternates: { canonical: "https://oasisemaar.com/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <>
      <WebPageSchema
        name="Disclaimer — Oasis Emaar"
        description="Important legal notices about property information and investment advice."
        url="https://oasisemaar.com/disclaimer"
        breadcrumbItems={[
          { name: "Home", url: "https://oasisemaar.com" },
          { name: "Disclaimer", url: "https://oasisemaar.com/disclaimer" },
        ]}
      />
      <div className="min-h-screen bg-white pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A2332] mb-2">Disclaimer</h1>
          <p className="text-gray-500 text-sm mb-8">Last updated: May 2026</p>

          <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
            <section>
              <h2 className="font-heading text-xl font-bold text-[#1A2332] mb-3">Independent Authorised Brokerage</h2>
              <p className="leading-relaxed">Oasis Emaar is an independent authorised real estate brokerage operating as a sales agent for The Oasis by Emaar Properties PJSC. We are NOT Emaar Properties PJSC, nor are we a subsidiary, division, or affiliate of Emaar Properties PJSC. All references to Emaar, The Oasis, Address, Palace, and related brand names are trademarks of Emaar Properties PJSC and are used herein for identification and marketing purposes only, with the developer&apos;s authorisation. Any opinions, analyses, or recommendations expressed on this website are those of Oasis Emaar and do not necessarily reflect the views of Emaar Properties PJSC.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[#1A2332] mb-3">Property Information Accuracy</h2>
              <p className="leading-relaxed">All property information, specifications, pricing, payment plans, handover dates, and other details displayed on this website are provided for informational and marketing purposes only and are subject to change by the developer at any time without prior notice. While we make reasonable efforts to ensure the accuracy of information presented, we do not warrant or guarantee that all information is current, complete, or error-free. Starting prices refer to the lowest listed price for a particular cluster and may not reflect the price of available units at any given time. Floor plans, renders, and images are artistic impressions only and may differ from the final constructed product. Prospective buyers should verify all information directly with our sales team before making any purchase decision.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[#1A2332] mb-3">No Investment Advice</h2>
              <p className="leading-relaxed">The content on this website, including blog articles, market analyses, and investment discussions, is provided for general informational purposes only and does not constitute financial, investment, legal, or tax advice. Any projections, estimates, or statements regarding potential returns on investment, capital appreciation, rental yields, or market trends are based on historical data and current market conditions and are not guarantees of future performance. Prospective investors should conduct their own due diligence and consult with qualified financial, legal, and tax advisors before making any investment decisions. Past performance is not indicative of future results, and all investments carry inherent risks including the potential loss of principal.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[#1A2332] mb-3">Third-Party Links</h2>
              <p className="leading-relaxed">This website may contain links to third-party websites, including the official Emaar Properties website, Dubai Land Department, RERA, and other government and industry resources. These links are provided for your convenience and information only. We do not control, endorse, or assume responsibility for the content, accuracy, or practices of any third-party website. Accessing any third-party link is at your own risk, and you should review the terms and privacy policy of any linked site before providing any personal information.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[#1A2332] mb-3">Regulatory Compliance</h2>
              <p className="leading-relaxed">Oasis Emaar operates in compliance with the laws and regulations of the Emirate of Dubai and the United Arab Emirates, including those administered by the Real Estate Regulatory Agency (RERA) and the Dubai Land Department (DLD). All property transactions facilitated by Oasis Emaar are subject to applicable DLD and RERA regulations, including escrow account requirements for off-plan properties. Prospective buyers are encouraged to verify the regulatory status of any property or agent through the official DLD and RERA platforms.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[#1A2332] mb-3">Limitation of Liability</h2>
              <p className="leading-relaxed">To the fullest extent permitted by law, Oasis Emaar disclaims all warranties, express or implied, and shall not be liable for any damages arising from the use of this website or reliance on any information contained herein, including but not limited to direct, indirect, incidental, special, or consequential damages. This disclaimer applies regardless of the legal theory under which such damages are sought.</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
