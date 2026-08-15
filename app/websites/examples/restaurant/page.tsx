import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { ConceptBanner } from "@/components/samples/concept-banner"
import { ScrollToTop } from "@/components/scroll-to-top"
import { DemoProvider, DemoAction } from "@/components/samples/demo-action"
import { emberRye as c } from "@/content/concepts"

/*
 * CONCEPT SITE — "Ember & Rye", a wood-fired neighborhood restaurant.
 * Design direction: dark, warm, atmospheric, serif-led, image-forward.
 * Palette: espresso #17110d · cream #efe4d4 · ember #e08a3c · sage #9bad7a.
 * Image slots use warm gradient art (no photos on hand); each <div data-slot>
 * is sized so a real photograph can drop in with no layout change.
 *
 * All copy lives in content/concepts/ember-rye.ts — this file is layout,
 * palette, and typography only.
 */

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})
const body = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Ember & Rye — Wood-Fired Neighborhood Kitchen",
  description:
    "A concept restaurant website by Nathan Riojas. Wood-fired seasonal cooking, natural wine, and a warm neighborhood room.",
  robots: { index: false, follow: false },
}


function ImageSlot({
  className,
  variant = "a",
}: {
  className?: string
  variant?: "a" | "b" | "c" | "d"
}) {
  const grads: Record<string, string> = {
    a: "radial-gradient(120% 120% at 20% 15%, #3a2417 0%, #17110d 60%), linear-gradient(160deg, #4a2c17, #1c130d)",
    b: "radial-gradient(120% 120% at 80% 20%, #4a3a1e 0%, #171009 65%), linear-gradient(200deg, #3c2a14, #14100b)",
    c: "radial-gradient(100% 120% at 30% 80%, #52301a 0%, #160f0a 60%), linear-gradient(140deg, #3a2416, #120d09)",
    d: "radial-gradient(120% 120% at 60% 10%, #2f3a22 0%, #14110b 60%), linear-gradient(200deg, #33361f, #120f0a)",
  }
  return (
    <div
      data-slot="image"
      aria-hidden="true"
      className={className}
      style={{ backgroundImage: grads[variant] }}
    >
      {/* subtle ember light */}
      <div
        className="h-full w-full"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 100%, rgba(224,138,60,0.16), transparent 70%)",
        }}
      />
    </div>
  )
}

export default function RestaurantConcept() {
  return (
    <DemoProvider>
    <div className={`${body.className} min-h-screen bg-[#17110d] text-[#efe4d4]`}>
      <ConceptBanner className="bg-[#0e0a07] text-[#c9b8a3]" linkClassName="text-[#e08a3c]" />

      {/* Header — sticky so the reservation CTA stays reachable while
          scrolling; the concept banner above it is intentionally not sticky
          (it scrolls away once the "this is a concept" message has landed). */}
      <header className="sticky top-0 z-40 border-b border-[#efe4d4]/8 bg-[#17110d]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <ScrollToTop className={`${display.className} text-2xl font-semibold tracking-wide transition-opacity duration-300 hover:opacity-80`}>
            {c.brand.first} <span className="text-[#e08a3c]">{c.brand.amp}</span> {c.brand.second}
          </ScrollToTop>
          <nav className="hidden items-center gap-8 text-sm text-[#c9b8a3] sm:flex">
            {c.nav.map((item) => (
              <a key={item.href} href={item.href} className="rounded-sm outline-none transition-colors hover:text-[#efe4d4] focus-visible:text-[#efe4d4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{item.label}</a>
            ))}
          </nav>
          <a
            href="#reserve"
            className="rounded-full border border-[#e08a3c]/60 px-5 py-2 text-sm font-medium text-[#e8a765] outline-none transition-colors hover:bg-[#e08a3c] hover:text-[#17110d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {c.navCta}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 70% 0%, rgba(224,138,60,0.16), transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-14">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#9bad7a]">
              {c.hero.eyebrow}
            </p>
            <h1 className={`${display.className} mt-5 text-5xl font-medium leading-[1.02] sm:text-6xl lg:text-7xl`}>
              {c.hero.headline}
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#c9b8a3]">
              {c.hero.body}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#reserve"
                className="rounded-full bg-[#e08a3c] px-7 py-3.5 text-sm font-semibold text-[#17110d] transition-colors hover:bg-[#eaa056]"
              >
                {c.hero.primaryCta}
              </a>
              <a href="#menu" className={`${display.className} text-lg text-[#efe4d4] underline decoration-[#e08a3c]/40 underline-offset-4 transition-colors hover:decoration-[#e08a3c]`}>
                {c.hero.secondaryCta}
              </a>
            </div>
          </div>
          <div className="relative">
            <ImageSlot
              variant="a"
              className="aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-[#efe4d4]/10 shadow-2xl shadow-black/40"
            />
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-[#efe4d4]/10 bg-[#1f1813] px-5 py-4 sm:block">
              <p className={`${display.className} text-2xl`}>{c.hero.badge.title}</p>
              <p className="text-xs uppercase tracking-widest text-[#9bad7a]">{c.hero.badge.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="border-t border-[#efe4d4]/8 py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <ImageSlot
            variant="c"
            className="aspect-[5/4] w-full overflow-hidden rounded-2xl border border-[#efe4d4]/10"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#9bad7a]">{c.story.eyebrow}</p>
            <h2 className={`${display.className} mt-4 text-4xl font-medium sm:text-5xl`}>
              {c.story.heading}
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-[#c9b8a3]">
              {c.story.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="border-t border-[#efe4d4]/8 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#9bad7a]">{c.menu.eyebrow}</p>
              <h2 className={`${display.className} mt-3 text-4xl font-medium sm:text-5xl`}>
                {c.menu.heading}
              </h2>
            </div>
            <p className="hidden max-w-xs text-right text-sm text-[#9a8b78] sm:block">
              {c.menu.note}
            </p>
          </div>

          <div className="mt-12 grid gap-x-14 gap-y-8 sm:grid-cols-2">
            {c.menu.dishes.map((d) => (
              <div key={d.name} className="flex items-baseline gap-4">
                <div className="min-w-0">
                  <h3 className={`${display.className} text-2xl`}>{d.name}</h3>
                  <p className="mt-1 text-sm text-[#9a8b78]">{d.note}</p>
                </div>
                <span
                  className="mb-1 flex-1 self-end border-b border-dashed border-[#efe4d4]/15"
                  aria-hidden="true"
                />
                <span className={`${display.className} text-xl text-[#e8a765]`}>{d.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-4">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <ImageSlot variant="b" className="aspect-square overflow-hidden rounded-xl border border-[#efe4d4]/10" />
            <ImageSlot variant="d" className="aspect-square overflow-hidden rounded-xl border border-[#efe4d4]/10" />
            <ImageSlot variant="a" className="aspect-square overflow-hidden rounded-xl border border-[#efe4d4]/10" />
            <ImageSlot variant="c" className="aspect-square overflow-hidden rounded-xl border border-[#efe4d4]/10" />
          </div>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="border-t border-[#efe4d4]/8 py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#9bad7a]">{c.visit.eyebrow}</p>
            <h2 className={`${display.className} mt-4 text-4xl font-medium sm:text-5xl`}>
              {c.visit.heading}
            </h2>
            <dl className="mt-8 space-y-5">
              {c.visit.details.map((d) => (
                <div key={d.label}>
                  <dt className="text-xs uppercase tracking-widest text-[#9bad7a]">{d.label}</dt>
                  <dd className="mt-1.5 text-[#c9b8a3]">
                    {d.lines.map((line, i) => (
                      <span key={line}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
            <DemoAction className="mt-8 inline-flex rounded-full border border-[#efe4d4]/20 px-6 py-3 text-sm font-medium transition-colors hover:border-[#e08a3c] hover:text-[#e8a765]">
              {c.visit.cta}
            </DemoAction>
          </div>
          <div
            className="relative min-h-[18rem] overflow-hidden rounded-2xl border border-[#efe4d4]/10"
            style={{
              backgroundColor: "#1b1510",
              backgroundImage:
                "linear-gradient(rgba(239,228,212,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(239,228,212,0.05) 1px, transparent 1px)",
              backgroundSize: "38px 38px",
            }}
            aria-hidden="true"
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-[#e08a3c] text-[#17110d]">
                <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>
              </div>
              <p className="mt-3 text-sm text-[#9a8b78]">{c.visit.mapCaption}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reserve CTA */}
      <section id="reserve" className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-[#e08a3c]/25 bg-[#1f1813] px-6 py-14 text-center sm:px-12">
          <p className="text-xs uppercase tracking-[0.28em] text-[#9bad7a]">{c.reserve.eyebrow}</p>
          <h2 className={`${display.className} mx-auto mt-4 max-w-2xl text-4xl font-medium sm:text-5xl`}>
            {c.reserve.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[#c9b8a3]">
            {c.reserve.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <DemoAction className="rounded-full bg-[#e08a3c] px-8 py-3.5 text-sm font-semibold text-[#17110d] transition-colors hover:bg-[#eaa056]">
              {c.reserve.primaryCta}
            </DemoAction>
            <DemoAction className="text-sm text-[#c9b8a3] transition-colors hover:text-[#efe4d4]">
              {c.reserve.secondaryCta}
            </DemoAction>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#efe4d4]/8 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className={`${display.className} text-2xl`}>{c.brand.first} <span className="text-[#e08a3c]">{c.brand.amp}</span> {c.brand.second}</p>
            <p className="mt-2 text-sm text-[#9a8b78]">{c.footer.address}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-[#9a8b78] sm:items-end">
            {/* Decorative — no real social accounts exist for this concept. */}
            <div className="flex gap-5" aria-hidden="true">
              {c.footer.socials.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <a href="/websites" className="text-[#8f7f6d] underline underline-offset-2 transition-colors hover:text-[#e8a765]">
              {c.footer.creditLink}
            </a>
          </div>
        </div>
      </footer>
    </div>
    </DemoProvider>
  )
}
