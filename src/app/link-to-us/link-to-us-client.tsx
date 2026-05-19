"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  Code,
  Award,
  Search,
  BookOpen,
  Link2,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-body font-medium transition-all ${
        copied
          ? "bg-green-100 text-green-700 border border-green-200"
          : "bg-[#1A2332] text-white hover:bg-[#2A3A52] border border-transparent"
      }`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" /> Copied!
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" /> {label}
        </>
      )}
    </button>
  );
}

function CodeBlock({ code, copyLabel }: { code: string; copyLabel?: string }) {
  return (
    <div className="relative group">
      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre className="text-sm text-gray-100 font-mono leading-relaxed whitespace-pre-wrap break-all">
          <code>{code}</code>
        </pre>
      </div>
      <div className="absolute top-3 right-3">
        <CopyButton text={code} label={copyLabel || "Copy HTML"} />
      </div>
    </div>
  );
}

// ===== Section 1: Text Links =====
const TEXT_LINKS = [
  {
    label: "Simple Text Link",
    description: "A clean, minimal link to Oasis Emaar",
    code: `<a href="https://oasisemaar.com">The Oasis by Emaar — Authorized Agent</a>`,
  },
  {
    label: "Descriptive Link with Title",
    description: "A link with title attribute for better SEO",
    code: `<a href="https://oasisemaar.com" title="The Oasis by Emaar — Authorized sales agent for luxury waterfront villas in Dubai">The Oasis by Emaar — Authorized Sales Agent</a>`,
  },
  {
    label: "SEO-Optimized Anchor Text",
    description: "Keyword-rich anchor text for real estate directories",
    code: `<a href="https://oasisemaar.com" title="Luxury waterfront villas in Dubai by Emaar Properties">luxury waterfront villas in Dubai</a> — explore The Oasis by Emaar with an authorized agent`,
  },
  {
    label: "Full Reference Link",
    description: "Complete reference with description for blog posts and articles",
    code: `<a href="https://oasisemaar.com" title="Oasis Emaar - Authorized Agent for The Oasis by Emaar Properties"><strong>Oasis Emaar</strong></a> — Authorized sales agent for The Oasis by Emaar Properties PJSC. Premium waterfront community featuring luxury villas, mansions, and branded residences in Dubailand, Dubai. Starting from AED 9.18M.`,
  },
];

// ===== Section 2: Property Badge =====
const BADGE_HTML = `<div style="font-family:'Segoe UI',system-ui,sans-serif;max-width:320px;border:1px solid #C8A45C;border-radius:12px;overflow:hidden;background:#1A2332;">
  <div style="background:linear-gradient(135deg,#C8A45C 0%,#D4AF37 50%,#E8C547 100%);padding:12px 16px;display:flex;align-items:center;gap:10px;">
    <div style="width:36px;height:36px;background:#1A2332;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#C8A45C;font-size:18px;font-weight:700;">OE</div>
    <div>
      <div style="color:#1A2332;font-size:14px;font-weight:700;">Oasis Emaar</div>
      <div style="color:#1A2332;font-size:11px;opacity:0.8;">Authorized Sales Agent</div>
    </div>
  </div>
  <div style="padding:12px 16px;">
    <div style="color:#C8A45C;font-size:12px;font-weight:600;margin-bottom:4px;">The Oasis by Emaar Properties</div>
    <div style="color:#999;font-size:11px;margin-bottom:8px;">Luxury Waterfront Villas in Dubai</div>
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;">
      <span style="color:#fff;font-size:12px;">📞 +971 52 691 9169</span>
    </div>
    <a href="https://oasisemaar.com" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:linear-gradient(135deg,#C8A45C,#D4AF37);color:#1A2332;text-decoration:none;padding:8px 16px;border-radius:6px;font-size:12px;font-weight:700;">View Properties →</a>
  </div>
</div>`;

// ===== Section 3: Search Widget =====
const SEARCH_WIDGET_HTML = `<div style="font-family:'Segoe UI',system-ui,sans-serif;max-width:400px;border:1px solid #C8A45C;border-radius:12px;overflow:hidden;background:#1A2332;padding:16px;">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
    <div style="width:28px;height:28px;background:linear-gradient(135deg,#C8A45C,#D4AF37);border-radius:6px;display:flex;align-items:center;justify-content:center;color:#1A2332;font-size:12px;font-weight:700;">OE</div>
    <span style="color:#C8A45C;font-size:14px;font-weight:700;">Search Oasis Properties</span>
  </div>
  <form action="https://oasisemaar.com/inventory" method="get" style="display:flex;gap:8px;">
    <input type="text" name="q" placeholder="Search villas, mansions, apartments..." style="flex:1;padding:10px 12px;border:1px solid #333;border-radius:6px;background:#0f1720;color:#fff;font-size:13px;outline:none;" />
    <button type="submit" style="background:linear-gradient(135deg,#C8A45C,#D4AF37);color:#1A2332;border:none;padding:10px 16px;border-radius:6px;font-size:13px;font-weight:700;cursor:pointer;">Search</button>
  </form>
  <div style="color:#666;font-size:11px;margin-top:8px;">76+ luxury properties across 9 exclusive clusters</div>
</div>`;

// ===== Section 4: Citation Formats =====
const CITATIONS = {
  APA: `Oasis Emaar. (2026). The Oasis by Emaar — Authorized Sales Agent. Retrieved from https://oasisemaar.com`,
  MLA: `Oasis Emaar. "The Oasis by Emaar — Authorized Sales Agent." Oasis Emaar, 2026, https://oasisemaar.com.`,
  Chicago: `Oasis Emaar. "The Oasis by Emaar — Authorized Sales Agent." Oasis Emaar. Accessed [date]. https://oasisemaar.com.`,
};

export default function LinkToUsClient() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      {/* Hero */}
      <div className="bg-[#1A2332] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C8A45C]/10 border border-[#C8A45C]/30 mb-6">
            <Link2 className="w-4 h-4 text-[#C8A45C]" />
            <span className="text-[#C8A45C] text-sm font-body font-medium">Partner Resources</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Link to <span className="text-[#C8A45C]">Oasis Emaar</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto font-body leading-relaxed">
            Add Oasis Emaar widgets, badges, and links to your website. Simply copy and paste our ready-made HTML snippets for real estate directories, blogs, and partner sites.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-12">
        {/* Section 1: Text Links */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center">
              <Code className="w-5 h-5 text-[#1A2332]" />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1A2332]">Text Links</h2>
          </div>
          <p className="text-gray-600 font-body mb-8 leading-relaxed">
            Choose from pre-made HTML link snippets below. Click &quot;Copy HTML&quot; to copy and paste directly into your website or blog.
          </p>
          <div className="space-y-6">
            {TEXT_LINKS.map((link, i) => (
              <div
                key={i}
                className="bg-[#F5F0E8]/50 border border-gray-100 rounded-xl p-5 sm:p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading text-lg font-semibold text-[#1A2332]">
                    {link.label}
                  </h3>
                  <CopyButton text={link.code} label="Copy HTML" />
                </div>
                <p className="text-gray-500 text-sm font-body mb-3">{link.description}</p>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-[#1A2332] font-body" dangerouslySetInnerHTML={{ __html: link.code }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Property Badge */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center">
              <Award className="w-5 h-5 text-[#1A2332]" />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1A2332]">
              Embeddable Property Badge
            </h2>
          </div>
          <p className="text-gray-600 font-body mb-8 leading-relaxed">
            Add our authorized agent badge to your website. This self-contained widget displays your partnership with Oasis Emaar.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Preview */}
            <div>
              <h3 className="text-sm font-body font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Preview
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex items-center justify-center min-h-[200px]">
                <div
                  style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", maxWidth: 320, border: "1px solid #C8A45C", borderRadius: 12, overflow: "hidden", background: "#1A2332" }}
                >
                  <div
                    style={{
                      background: "linear-gradient(135deg, #C8A45C 0%, #D4AF37 50%, #E8C547 100%)",
                      padding: "12px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        background: "#1A2332",
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#C8A45C",
                        fontSize: 18,
                        fontWeight: 700,
                      }}
                    >
                      OE
                    </div>
                    <div>
                      <div style={{ color: "#1A2332", fontSize: 14, fontWeight: 700 }}>Oasis Emaar</div>
                      <div style={{ color: "#1A2332", fontSize: 11, opacity: 0.8 }}>Authorized Sales Agent</div>
                    </div>
                  </div>
                  <div style={{ padding: "12px 16px" }}>
                    <div style={{ color: "#C8A45C", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
                      The Oasis by Emaar Properties
                    </div>
                    <div style={{ color: "#999", fontSize: 11, marginBottom: 8 }}>Luxury Waterfront Villas in Dubai</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                      <span style={{ color: "#fff", fontSize: 12 }}>📞 +971 52 691 9169</span>
                    </div>
                    <span
                      style={{
                        display: "inline-block",
                        background: "linear-gradient(135deg, #C8A45C, #D4AF37)",
                        color: "#1A2332",
                        padding: "8px 16px",
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      View Properties →
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Code */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-body font-semibold text-gray-500 uppercase tracking-wider">
                  HTML Code
                </h3>
                <CopyButton text={BADGE_HTML} label="Copy HTML" />
              </div>
              <div className="relative">
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto max-h-[340px] overflow-y-auto">
                  <pre className="text-xs text-gray-100 font-mono leading-relaxed whitespace-pre-wrap break-all">
                    <code>{BADGE_HTML}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Search Widget */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center">
              <Search className="w-5 h-5 text-[#1A2332]" />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1A2332]">
              Embeddable Search Widget
            </h2>
          </div>
          <p className="text-gray-600 font-body mb-8 leading-relaxed">
            Let your visitors search Oasis Emaar properties directly from your site. This widget links to our full inventory page.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Preview */}
            <div>
              <h3 className="text-sm font-body font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Preview
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex items-center justify-center min-h-[200px]">
                <div
                  style={{
                    fontFamily: "'Segoe UI', system-ui, sans-serif",
                    maxWidth: 400,
                    border: "1px solid #C8A45C",
                    borderRadius: 12,
                    overflow: "hidden",
                    background: "#1A2332",
                    padding: 16,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        background: "linear-gradient(135deg, #C8A45C, #D4AF37)",
                        borderRadius: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#1A2332",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      OE
                    </div>
                    <span style={{ color: "#C8A45C", fontSize: 14, fontWeight: 700 }}>
                      Search Oasis Properties
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      type="text"
                      placeholder="Search villas, mansions, apartments..."
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        border: "1px solid #333",
                        borderRadius: 6,
                        background: "#0f1720",
                        color: "#fff",
                        fontSize: 13,
                        outline: "none",
                      }}
                      readOnly
                    />
                    <span
                      style={{
                        background: "linear-gradient(135deg, #C8A45C, #D4AF37)",
                        color: "#1A2332",
                        border: "none",
                        padding: "10px 16px",
                        borderRadius: 6,
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Search
                    </span>
                  </div>
                  <div style={{ color: "#666", fontSize: 11, marginTop: 8 }}>
                    76+ luxury properties across 9 exclusive clusters
                  </div>
                </div>
              </div>
            </div>

            {/* Code */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-body font-semibold text-gray-500 uppercase tracking-wider">
                  HTML Code
                </h3>
                <CopyButton text={SEARCH_WIDGET_HTML} label="Copy HTML" />
              </div>
              <div className="relative">
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto max-h-[340px] overflow-y-auto">
                  <pre className="text-xs text-gray-100 font-mono leading-relaxed whitespace-pre-wrap break-all">
                    <code>{SEARCH_WIDGET_HTML}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Cite This Page */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#1A2332]" />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1A2332]">
              Cite This Page
            </h2>
          </div>
          <p className="text-gray-600 font-body mb-8 leading-relaxed">
            Use these citation formats when referencing Oasis Emaar in blog posts, research articles, or academic papers.
          </p>

          <div className="space-y-6">
            {(Object.entries(CITATIONS) as [string, string][]).map(([format, citation]) => (
              <div
                key={format}
                className="bg-[#F5F0E8]/50 border border-gray-100 rounded-xl p-5 sm:p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading text-lg font-semibold text-[#1A2332]">
                    {format} Format
                  </h3>
                  <CopyButton text={citation} label="Copy Citation" />
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-700 font-body leading-relaxed">{citation}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="bg-[#1A2332] rounded-2xl p-8 sm:p-10 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
            Need a Custom Widget?
          </h2>
          <p className="text-gray-300 font-body mb-6 max-w-lg mx-auto">
            We can create custom integrations, co-branded widgets, or partnership badges tailored to your website. Get in touch with our team.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 gold-gradient text-[#1A2332] font-bold px-8 py-3 rounded-md hover:opacity-90 transition-opacity font-body"
          >
            Contact Our Team <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
