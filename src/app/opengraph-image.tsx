import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name}: AI, Cloud & Software Development Services`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mirrors the site's Material look: white canvas, blue primary, soft tonal panel.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#ffffff",
        color: "#1f1f1f",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34 }}>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 16,
            background: "#0b57d0",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          U
        </div>
        <div style={{ display: "flex" }}>
          UnityDev&nbsp;<span style={{ color: "#444746" }}>Digital</span>
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 78, lineHeight: 1.08, letterSpacing: -2, maxWidth: 980 }}>
        Engineering for the hard parts of your roadmap
      </div>
      <div style={{ display: "flex", gap: 14, fontSize: 24 }}>
        {[
          ["AI & ML", "#d3e3fd", "#0842a0"],
          ["Cloud & DevOps", "#c4eed0", "#0f5223"],
          ["Dedicated teams", "#ffe8a3", "#5b4300"],
          ["Custom software", "#ffdad6", "#8c1d18"],
        ].map(([label, bg, fg]) => (
          <div
            key={label}
            style={{ display: "flex", padding: "12px 24px", borderRadius: 999, background: bg, color: fg }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
