"use client"

/**
 * "Demo only" interception for the concept sites.
 *
 * The four sample sites under /websites/examples are fictional, but they are
 * meant to feel like real, finished websites — so their controls stay fully
 * interactive (pointer cursor, hover, focus, keyboard) rather than being
 * disabled or made inert. What they must NOT do is perform a real-world action
 * on behalf of a business that doesn't exist: launch the Phone app, open Mail,
 * open Maps, or navigate to a fabricated external site.
 *
 * `DemoAction` renders a real <button> rather than an <a> with a
 * `preventDefault()` handler. That is deliberate and is the whole point:
 *   - A `tel:` / `mailto:` anchor launches the device app on the OS side. If
 *     JS hasn't hydrated yet (slow mobile network, JS error, bfcache restore),
 *     `preventDefault()` never runs and the phone dialer opens anyway. A
 *     <button> has no href, so it cannot navigate even with JS fully broken.
 *   - Semantically these controls perform an action on the current page, not
 *     navigation to a resource, so <button> is also the correct element.
 * Styling is passed straight through, so each concept keeps its own look.
 *
 * Wrap a concept page in <DemoProvider> and every DemoAction inside it shares
 * one polite live region, rendered once at the bottom of the viewport.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"
import { cn } from "@/lib/utils"
import { conceptDemo } from "@/content/concepts/demo"

/** How long a notice stays on screen before fading out. */
const NOTICE_MS = 3600

type Notice = { id: number; message: string }
type NotifyFn = (message?: string) => void

// Default is a no-op so a DemoAction rendered outside a provider still
// intercepts the action (the important part) instead of throwing.
const DemoContext = createContext<NotifyFn>(() => {})

export function useDemoNotice(): NotifyFn {
  return useContext(DemoContext)
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [notice, setNotice] = useState<Notice | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const counter = useRef(0)

  const notify = useCallback<NotifyFn>((message = conceptDemo.notice) => {
    if (timer.current) clearTimeout(timer.current)
    // A fresh id on every call gives the inner node a new React key, which
    // replaces the DOM node inside the live region — that is what makes an
    // identical repeated message get announced again rather than ignored.
    counter.current += 1
    setNotice({ id: counter.current, message })
    timer.current = setTimeout(() => setNotice(null), NOTICE_MS)
  }, [])

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  return (
    <DemoContext.Provider value={notify}>
      {children}
      {/*
        The live region container is always mounted (only its contents change),
        because assistive tech must observe the region *before* it updates to
        reliably announce it. `pointer-events-none` keeps it from ever
        intercepting a tap. Sits above Cornerstone's sticky mobile CTA bar
        (bottom-0, h ~50px, z-50) on small screens, hence bottom-24 there.
      */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex justify-center px-4 sm:bottom-6"
      >
        {notice && (
          <p
            key={notice.id}
            className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 max-w-[22rem] rounded-full bg-[#101114]/95 px-4 py-2.5 text-center text-[13px] font-medium text-white shadow-lg shadow-black/25 ring-1 ring-white/10 backdrop-blur-sm motion-safe:duration-200"
          >
            {notice.message}
          </p>
        )}
      </div>
    </DemoContext.Provider>
  )
}

/**
 * A control that looks exactly like the concept's own link/button but performs
 * no real-world action. Pass the same `className` the original anchor used.
 */
export function DemoAction({
  children,
  className,
  style,
  message,
  ariaLabel,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Overrides the default notice (e.g. the form variant). */
  message?: string
  /**
   * Accessible name when the visible text alone wouldn't be clear (e.g. a
   * bare phone number). The demo suffix is appended automatically.
   */
  ariaLabel?: string
}) {
  const notify = useDemoNotice()
  return (
    <button
      type="button"
      onClick={() => notify(message)}
      aria-label={ariaLabel ? `${ariaLabel} ${conceptDemo.ariaSuffix}` : undefined}
      // `cursor-pointer` because Tailwind's preflight gives buttons the default
      // cursor; `text-left` because buttons center their text where the anchors
      // these replace did not. Caller styles win via cn()'s merge.
      className={cn("cursor-pointer text-left", className)}
      style={style}
    >
      {children}
    </button>
  )
}
