/**
 * Meta (Facebook) Pixel Event Tracking Utility
 * 
 * Events tracked:
 * - PageView (automatic via base pixel)
 * - Lead (form submissions — contact, paywall, availability, exit-intent)
 * - ViewContent (property detail page views)
 * - Contact (contact form specifically)
 * - InitiateCheckout (paywall modal opened — intent signal)
 * - AddToWishlist (whatsapp button clicked)
 * - Search (availability page filters used)
 * - CompleteRegistration (paywall registration completed)
 */

// Type-safe event names
export type MetaPixelEvent =
  | "PageView"
  | "Lead"
  | "ViewContent"
  | "Contact"
  | "InitiateCheckout"
  | "AddToWishlist"
  | "Search"
  | "CompleteRegistration"
  | "AddPaymentInfo"  // budget selected
  | "CustomizeProduct";  // property interest selected

// Declare fbq on window
declare global {
  interface Window {
    fbq: {
      (track: string, event: string, params?: Record<string, unknown>): void;
      (method: "track" | "trackCustom", event: string, params?: Record<string, unknown>): void;
      push: (args: unknown[]) => void;
      loaded: boolean;
      version: string;
      queue: unknown[];
      callMethod?: (...args: unknown[]) => void;
    };
    _fbq: Window["fbq"];
  }
}

/**
 * Fire a Meta Pixel event safely (no crash if pixel not loaded)
 */
function fbqTrack(event: MetaPixelEvent, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    if (window.fbq) {
      window.fbq("track", event, params);
    }
  } catch (e) {
    console.warn("[Meta Pixel] Event failed:", event, e);
  }
}

/**
 * Fire a custom Meta Pixel event (for non-standard events)
 */
function fbqTrackCustom(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    if (window.fbq) {
      window.fbq("trackCustom", event, params);
    }
  } catch (e) {
    console.warn("[Meta Pixel] Custom event failed:", event, e);
  }
}

// ====== EVENT HELPERS ======

/**
 * Track Lead event — fired when any lead form is submitted
 */
export function trackLead(params: {
  formType: "contact" | "paywall" | "exit_intent" | "availability" | "general";
  propertyInterest?: string;
  budget?: string;
  value?: number;
  currency?: string;
}) {
  fbqTrack("Lead", {
    content_name: params.propertyInterest || "General Inquiry",
    content_category: params.formType,
    value: params.value,
    currency: params.currency || "AED",
  });
}

/**
 * Track Contact event — specifically for contact form submissions
 */
export function trackContact(params: {
  propertyInterest?: string;
  budget?: string;
}) {
  fbqTrack("Contact", {
    content_name: params.propertyInterest || "General",
    content_category: "contact_form",
  });
}

/**
 * Track ViewContent — when a user views a property detail page
 */
export function trackViewContent(params: {
  contentType: "property" | "cluster" | "availability" | "listing" | "blog_post";
  contentName: string;
  contentId?: string;
  value?: number;
  currency?: string;
}) {
  fbqTrack("ViewContent", {
    content_type: params.contentType,
    content_name: params.contentName,
    content_ids: params.contentId ? [params.contentId] : undefined,
    value: params.value,
    currency: params.currency || "AED",
  });
}

/**
 * Track InitiateCheckout — when paywall modal opens (high-intent signal)
 */
export function trackInitiateCheckout(params: {
  propertyName?: string;
  contentId?: string;
  value?: number;
  currency?: string;
}) {
  fbqTrack("InitiateCheckout", {
    content_name: params.propertyName || "Premium Listing",
    content_ids: params.contentId ? [params.contentId] : undefined,
    value: params.value,
    currency: params.currency || "AED",
    num_items: 1,
  });
}

/**
 * Track CompleteRegistration — when paywall registration succeeds
 */
export function trackCompleteRegistration(params: {
  propertyName?: string;
  value?: number;
  currency?: string;
}) {
  fbqTrack("CompleteRegistration", {
    content_name: params.propertyName || "Premium Access",
    status: "completed",
    value: params.value,
    currency: params.currency || "AED",
  });
}

/**
 * Track Search — when user uses availability filters
 */
export function trackSearch(params: {
  query: string;
  contentCategory?: string;
}) {
  fbqTrack("Search", {
    search_string: params.query,
    content_category: params.contentCategory || "property_search",
  });
}

/**
 * Track AddToWishlist — WhatsApp button click
 */
export function trackAddToWishlist(params: {
  propertyName?: string;
  contentId?: string;
}) {
  fbqTrack("AddToWishlist", {
    content_name: params.propertyName || "WhatsApp Inquiry",
    content_ids: params.contentId ? [params.contentId] : undefined,
  });
}

/**
 * Track custom event for phone call clicks
 */
export function trackPhoneCall() {
  fbqTrackCustom("PhoneCall", {
    content_category: "contact",
  });
}

/**
 * Track custom event for email clicks
 */
export function trackEmailClick() {
  fbqTrackCustom("EmailClick", {
    content_category: "contact",
  });
}
