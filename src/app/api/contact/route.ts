import { NextResponse, type NextRequest } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/contact";
import { siteConfig } from "@/config/site";

/**
 * Best-effort rate limit. On serverless each instance keeps its own map, so
 * this only slows down naive abuse; put a WAF or shared store in front for more.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

async function deliver(data: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY not set; submission logged instead of emailed:", data);
      return true;
    }
    console.error("[contact] RESEND_API_KEY is not configured; cannot deliver enquiry.");
    return false;
  }

  const rows: [string, string | undefined][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company],
    ["Service", data.service],
    ["Budget", data.budget],
  ];
  const html = `
    <h2>New enquiry from ${escapeHtml(siteConfig.name)} website</h2>
    <table cellpadding="6">${rows
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v!)}</td></tr>`)
      .join("")}</table>
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? `${siteConfig.name} <website@unitydevdigital.com>`,
      to: [process.env.CONTACT_TO_EMAIL ?? siteConfig.email],
      reply_to: data.email,
      subject: `New enquiry: ${data.service}, ${data.name}${data.company ? ` (${data.company})` : ""}`,
      html,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    console.error("[contact] Resend responded with", response.status, await response.text().catch(() => ""));
    return false;
  }
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const result = validateContact(body);
  if (!result.ok) {
    return NextResponse.json({ error: "Please check the highlighted fields.", fields: result.errors }, { status: 422 });
  }

  // Bots fill the hidden field: pretend success so they don't retry.
  if (result.data.website) return NextResponse.json({ ok: true });

  try {
    const sent = await deliver(result.data);
    if (!sent) {
      return NextResponse.json(
        { error: `We couldn't send your message right now. Please email us at ${siteConfig.email}.` },
        { status: 503 },
      );
    }
  } catch (error) {
    console.error("[contact] Delivery failed:", error);
    return NextResponse.json(
      { error: `We couldn't send your message right now. Please email us at ${siteConfig.email}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
