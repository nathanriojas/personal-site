import type { MetadataRoute } from "next"
import { defaultDescription } from "@/lib/seo"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nathan Riojas — Staff Forward Deployed Engineer",
    short_name: "Nathan Riojas",
    description: defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#15171a",
    theme_color: "#15171a",
    icons: [
      {
        src: "/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
      {
        src: "/apple-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  }
}
