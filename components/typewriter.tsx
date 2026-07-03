"use client"

/**
 * Types a short string out character-by-character, then blinks a cursor.
 * Reserves the final width (sr-only copy) so layout never shifts, and shows the
 * full text instantly when the user prefers reduced motion.
 */
import { useEffect, useState } from "react"

type TypewriterProps = {
  text: string
  /** ms per character */
  speed?: number
  /** ms before typing starts */
  startDelay?: number
  className?: string
}

export function Typewriter({
  text,
  speed = 110,
  startDelay = 250,
  className,
}: TypewriterProps) {
  const [count, setCount] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) {
      setReduced(true)
      setCount(text.length)
      return
    }

    let interval: ReturnType<typeof setInterval>
    const startTimer = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            clearInterval(interval)
            return c
          }
          return c + 1
        })
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(startTimer)
      clearInterval(interval)
    }
  }, [text, speed, startDelay])

  const done = count >= text.length

  return (
    <span className={className}>
      {/* Reserve space so layout doesn't shift while typing */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      {!reduced && (
        <span
          aria-hidden="true"
          className={`ml-0.5 inline-block w-[0.6ch] ${done ? "animate-blink" : ""}`}
        >
          {"|"}
        </span>
      )}
    </span>
  )
}
