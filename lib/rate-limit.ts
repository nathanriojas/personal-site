// ---------------------------------------------------------------------------
// Server-only per-IP rate limiting for the contact form, backed by Upstash
// Redis. Credentials are read from the environment and never reach the client.
//
// Fails OPEN: if the Upstash env vars are absent (e.g. local dev), rate limiting
// is disabled rather than blocking submissions. It only activates in an
// environment where UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are set.
// ---------------------------------------------------------------------------

import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// `undefined` = not yet initialized, `null` = intentionally disabled (no creds).
let limiter: Ratelimit | null | undefined

function getLimiter(): Ratelimit | null {
  if (limiter !== undefined) return limiter

  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) {
    console.warn(
      "[contact] Upstash env not set — per-IP rate limiting is disabled.",
    )
    limiter = null
    return limiter
  }

  limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    // Conservative: 3 submissions per IP per 10 minutes, sliding window.
    limiter: Ratelimit.slidingWindow(3, "10 m"),
    prefix: "ratelimit:contact",
    analytics: false,
  })
  return limiter
}

export type RateResult = {
  success: boolean
  limit: number
  remaining: number
  /** Epoch ms when the window resets. */
  reset: number
}

/**
 * Check the limit for an identifier (client IP). Returns `null` when rate
 * limiting is disabled — callers should treat that as allowed.
 */
export async function limitContact(ip: string): Promise<RateResult | null> {
  const rl = getLimiter()
  if (!rl) return null
  const { success, limit, remaining, reset } = await rl.limit(ip)
  return { success, limit, remaining, reset }
}

/**
 * Best-effort client IP for a Vercel-hosted request. Prefers the first entry of
 * `x-forwarded-for` (the original client), then `x-real-ip`, and finally a
 * constant fallback so a missing header degrades gracefully instead of throwing.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim()
    if (first) return first
  }
  const realIp = request.headers.get("x-real-ip")
  if (realIp) return realIp.trim()
  return "unknown"
}
