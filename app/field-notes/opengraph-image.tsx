import { ImageResponse } from "next/og"

export const alt = "Field Notes — a photography journal by Nathan Riojas"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** Branded Open Graph image for the Field Notes index. */
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
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#34d399",
          }}
        >
          A second notebook
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, color: "#f4f4f5", fontWeight: 700 }}>
            Field Notes
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#a1a1aa",
              marginTop: 24,
              maxWidth: 980,
              lineHeight: 1.4,
            }}
          >
            A photography journal — moments from places worth stopping for.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            color: "#71717a",
          }}
        >
          <span style={{ color: "#f4f4f5", fontWeight: 700 }}>N</span>
          <span style={{ color: "#34d399" }}>.</span>
          <span style={{ marginLeft: 16 }}>nathanriojas.com</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
