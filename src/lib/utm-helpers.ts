export interface UTMData {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  ref?: string;
  firstTouchTimestamp?: number;
  landingPage?: string;
}

export function getUTMData(): UTMData | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem("oasis_utm");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function getUTMString(): string {
  const data = getUTMData();
  if (!data) return "";
  const parts: string[] = [];
  if (data.source) parts.push(`utm_source=${data.source}`);
  if (data.medium) parts.push(`utm_medium=${data.medium}`);
  if (data.campaign) parts.push(`utm_campaign=${data.campaign}`);
  if (data.term) parts.push(`utm_term=${data.term}`);
  if (data.content) parts.push(`utm_content=${data.content}`);
  return parts.length > 0 ? "?" + parts.join("&") : "";
}
