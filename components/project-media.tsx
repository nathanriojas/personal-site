"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * Renders project preview media. Uses a looping, muted <video> for .mp4/.webm
 * sources (played only while in view for performance) and a Next <Image> for
 * everything else (.gif is served unoptimized so it animates).
 */
export function ProjectMedia({
  src,
  alt,
  sizes,
  className,
  priority,
}: {
  src: string
  alt: string
  sizes?: string
  className?: string
  priority?: boolean
}) {
  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm")
  const isSvg = src.endsWith(".svg")
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (prefersReduced) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.play().catch(() => {})
          } else {
            el.pause()
          }
        })
      },
      { threshold: 0.25 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (isSvg) {
    // Architecture diagrams: show the full diagram on a light canvas.
    return (
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-white p-3",
          className,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-contain"
        />
      </div>
    )
  }

  if (isVideo) {
    return (
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        autoPlay
        preload="metadata"
        aria-label={alt}
        className={cn("h-full w-full object-cover", className)}
      />
    )
  }

  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      fill
      sizes={sizes}
      unoptimized={src.endsWith(".gif")}
      className={cn("object-cover", className)}
      priority={priority}
    />
  )
}
