import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name}: AI, Cloud & Software Development Services`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
        background: "radial-gradient(circle at 80% 20%, #2a1f8f 0%, #060913 55%)",
        color: "#eef1f8",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: "linear-gradient(135deg, #7c6ffa, #22d3ee)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44,
            fontWeight: 700,
          }}
        >
          U
        </div>
        <div style={{ fontSize: 36, fontWeight: 600 }}>{siteConfig.name}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
          AI, Cloud & Development Teams
        </div>
        <div style={{ fontSize: 32, color: "#98a2b8", marginTop: 24 }}>{siteConfig.tagline}</div>
      </div>
      <div style={{ display: "flex", gap: 16, fontSize: 24, color: "#c7cde0" }}>
        {["AI & ML", "Cloud & DevOps", "Dedicated Teams", "Custom Software"].map((label) => (
          <div
            key={label}
            style={{ padding: "10px 22px", borderRadius: 999, border: "1px solid #2b3552", display: "flex" }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
