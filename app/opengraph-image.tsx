import { ImageResponse } from "next/og"
import { site } from "@/content"

export const alt = "Nathan Riojas — Staff Forward Deployed Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** Branded Open Graph image for the portfolio home page. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#15171a",
          padding: "72px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 30, color: "#a1a1aa" }}>
          <span style={{ color: "#f4f4f5", fontWeight: 700 }}>N</span>
          <span style={{ color: "#34d399", marginRight: 16 }}>.</span>
          <span style={{ letterSpacing: 4, textTransform: "uppercase", fontSize: 22 }}>
            Portfolio
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, color: "#f4f4f5", fontWeight: 700, lineHeight: 1.05 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 40, color: "#34d399", marginTop: 12 }}>{site.title}</div>
          <div style={{ fontSize: 28, color: "#a1a1aa", marginTop: 24, maxWidth: 900 }}>
            {site.tagline}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#71717a" }}>{site.location}</div>
      </div>
    ),
    { ...size },
  )
}
