import { ImageResponse } from "next/og"
import { site, websitesHero, websitesMeta } from "@/content"

/**
 * Branded Open Graph card for /websites. Mirrors the structure of the home and
 * Field Notes cards (eyebrow → headline → wordmark footer) but uses the warm
 * cream/forest palette of the services page rather than the portfolio's dark
 * graphite, so a shared link previews as the sibling identity it is.
 *
 * Copy comes from content/ so the card can never drift from the page.
 */
export const alt = websitesMeta.ogAlt
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

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
          background: "#faf6ef",
          padding: "72px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#3c6b52",
            fontFamily: "monospace",
          }}
        >
          {websitesHero.eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, color: "#2f2b26", fontWeight: 700, lineHeight: 1.05 }}>
            {websitesHero.headline}
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#5c554c",
              marginTop: 26,
              maxWidth: 960,
              lineHeight: 1.4,
            }}
          >
            {websitesHero.lead}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            color: "#7a7268",
            fontFamily: "monospace",
          }}
        >
          <span style={{ color: "#2f2b26", fontWeight: 700 }}>{site.name}</span>
          <span style={{ color: "#b5613a", marginLeft: 12, marginRight: 12 }}>·</span>
          <span>nathanriojas.com/websites</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
