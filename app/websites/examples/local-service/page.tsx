import type { Metadata } from "next"
import { Oswald, Barlow } from "next/font/google"
import {
  Phone,
  Star,
  ShieldCheck,
  Award,
  MapPin,
  Home,
  Wrench,
  CloudRain,
  Ruler,
  PanelTop,
  Check,
} from "lucide-react"
import { ConceptBanner } from "@/components/samples/concept-banner"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CornerstoneQuoteForm } from "@/components/samples/cornerstone-quote-form"
import { DemoProvider, DemoAction } from "@/components/samples/demo-action"
import { cornerstone as c, type CornerstoneIcon } from "@/content/concepts"

/*
 * CONCEPT SITE — "Cornerstone Exteriors", a roofing/siding/gutters contractor.
 * Design direction: bold, high-contrast, conversion-first, condensed sans.
 * Palette: navy #0e2a47 · ink #10202e · amber #f26a1b · light #f5f7fa.
 * Priorities: prominent phone, sticky mobile CTA, quote form, trust badges.
 *
 * All copy lives in content/concepts/cornerstone.ts — this file is layout,
 * palette, and typography only. Content refers to icons by string key; the
 * `icons` map below resolves them to lucide components so the content file
 * stays free of React imports.
 */

const head = Oswald({ subsets: ["latin"], weight: ["500", "600", "700"], display: "swap" })
const body = Barlow({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" })

export const metadata: Metadata = {
  title: "Cornerstone Exteriors — Roofing, Siding & Gutters",
  description:
    "A concept contractor website by Nathan Riojas. Roofing, siding, and gutter installation with a focus on trust and clear lead generation.",
  robots: { index: false, follow: false },
}

/** Maps the content file's icon keys to lucide components. */
const icons: Record<CornerstoneIcon, typeof Home> = {
  home: Home,
  wrench: Wrench,
  rain: CloudRain,
  panel: PanelTop,
  ruler: Ruler,
  shield: ShieldCheck,
  star: Star,
  award: Award,
}

export default function LocalServiceConcept() {
  return (
    <DemoProvider>
    <div className={`${body.className} min-h-screen bg-[#f5f7fa] text-[#10202e] pb-16 sm:pb-0`}>
      <ConceptBanner className="bg-[#0a2038] text-[#a9bdd4]" linkClassName="text-[#f5a15e]" />

      {/* Utility bar */}
      <div className="bg-[#0e2a47] text-[#ccdaea]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2 text-sm sm:px-8">
          <span className="hidden sm:inline">{c.utilityBar.hours}</span>
          <DemoAction className="inline-flex items-center gap-2 font-semibold text-white" ariaLabel={`Call ${c.utilityBar.phoneLabel}`}>
            <Phone className="size-4 text-[#f26a1b]" /> {c.utilityBar.phoneLabel}
          </DemoAction>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <ScrollToTop className="flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-80">
            <span className="inline-flex size-8 items-center justify-center bg-[#f26a1b] text-white" aria-hidden="true">
              <Home className="size-5" />
            </span>
            <span className={`${head.className} text-xl font-700 uppercase tracking-wide text-[#0e2a47]`} style={{ fontWeight: 700 }}>
              {c.brand}
            </span>
          </ScrollToTop>
          <nav className="hidden items-center gap-7 text-sm font-600 uppercase tracking-wide text-[#33465a] lg:flex" style={{ fontWeight: 600 }}>
            {c.nav.map((item) => (
              <a key={item.href} href={item.href} className="rounded-sm outline-none transition-colors hover:text-[#f26a1b] focus-visible:text-[#f26a1b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{item.label}</a>
            ))}
          </nav>
          <a href="#quote" className={`${head.className} rounded bg-[#f26a1b] px-5 py-2.5 text-sm uppercase tracking-wide text-white outline-none transition-colors hover:bg-[#d95810] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}>
            {c.navCta}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative bg-[#0e2a47] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ backgroundImage: "linear-gradient(120deg, #0e2a47 40%, #123457 100%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <p className={`${head.className} text-sm uppercase tracking-[0.2em] text-[#f5a15e]`}>
              {c.hero.eyebrow}
            </p>
            <h1 className={`${head.className} mt-4 text-4xl font-700 uppercase leading-[1.02] sm:text-6xl`} style={{ fontWeight: 700 }}>
              {c.hero.headlineLine1}<br />{c.hero.headlineLine2}
            </h1>
            <p className="mt-5 max-w-md text-lg text-[#c6d5e6]">
              {c.hero.body}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#quote" className={`${head.className} rounded bg-[#f26a1b] px-7 py-3.5 text-base uppercase tracking-wide text-white transition-colors hover:bg-[#d95810]`}>
                {c.hero.primaryCta}
              </a>
              <DemoAction className={`${head.className} inline-flex items-center gap-2 rounded border-2 border-white/25 px-6 py-3 text-base uppercase tracking-wide text-white transition-colors hover:border-white`} ariaLabel={`Call ${c.utilityBar.phoneLabel}`}>
                <Phone className="size-5" /> {c.utilityBar.phoneLabel}
              </DemoAction>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#a9bdd4]">
              {c.badges.map((b) => {
                const Icon = icons[b.icon]
                return (
                  <span key={b.label} className="inline-flex items-center gap-1.5">
                    <Icon className="size-4 text-[#f5a15e]" /> {b.label}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Quote form card */}
          <div id="quote" className="rounded-lg bg-white p-6 text-[#10202e] shadow-2xl shadow-black/30 sm:p-7">
            <h2 className={`${head.className} text-2xl font-700 uppercase text-[#0e2a47]`} style={{ fontWeight: 700 }}>
              {c.quoteCard.heading}
            </h2>
            <p className="mt-1 text-sm text-[#5a6b7c]">{c.quoteCard.note}</p>
            <CornerstoneQuoteForm headingFontClassName={head.className} />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-6 sm:px-8 md:grid-cols-4">
          {c.badges.map((b) => {
            const Icon = icons[b.icon]
            return (
            <div key={b.label} className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#f26a1b]/10 text-[#f26a1b]">
                <Icon className="size-5" />
              </span>
              <span className="text-sm font-600 text-[#0e2a47]" style={{ fontWeight: 600 }}>{b.label}</span>
            </div>
            )
          })}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className={`${head.className} text-sm uppercase tracking-[0.2em] text-[#f26a1b]`}>{c.services.eyebrow}</p>
          <h2 className={`${head.className} mt-2 text-3xl font-700 uppercase text-[#0e2a47] sm:text-4xl`} style={{ fontWeight: 700 }}>
            {c.services.heading}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.services.items.map((item) => {
              const Icon = icons[item.icon]
              return (
                <div key={item.name} className="group rounded-lg border border-black/8 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-black/5">
                  <span className="inline-flex size-12 items-center justify-center rounded bg-[#0e2a47] text-white transition-colors group-hover:bg-[#f26a1b]">
                    <Icon className="size-6" />
                  </span>
                  <h3 className={`${head.className} mt-4 text-xl font-600 uppercase text-[#0e2a47]`} style={{ fontWeight: 600 }}>{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5a6b7c]">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-[#0e2a47] py-14 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 sm:px-8 md:grid-cols-4">
          {c.stats.map((stat) => (
            <div key={stat.label}>
              <p className={`${head.className} text-4xl font-700 text-[#f5a15e] sm:text-5xl`} style={{ fontWeight: 700 }}>{stat.value}</p>
              <p className="mt-1 text-sm text-[#a9bdd4]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Work gallery */}
      <section id="work" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className={`${head.className} text-sm uppercase tracking-[0.2em] text-[#f26a1b]`}>{c.work.eyebrow}</p>
          <h2 className={`${head.className} mt-2 text-3xl font-700 uppercase text-[#0e2a47] sm:text-4xl`} style={{ fontWeight: 700 }}>
            {c.work.heading}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.work.items.map((item) => (
              <div key={item.label} className="overflow-hidden rounded-lg border border-black/8">
                <div className="relative aspect-[4/3]" style={{ background: `linear-gradient(150deg, ${item.tint}, #0e2a47)` }} aria-hidden="true">
                  <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                </div>
                <p className="bg-white px-4 py-3 text-sm font-600 text-[#0e2a47]" style={{ fontWeight: 600 }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className={`${head.className} text-sm uppercase tracking-[0.2em] text-[#f26a1b]`}>{c.reviews.eyebrow}</p>
              <h2 className={`${head.className} mt-2 text-3xl font-700 uppercase text-[#0e2a47] sm:text-4xl`} style={{ fontWeight: 700 }}>
                {c.reviews.heading}
              </h2>
            </div>
            <div className="flex items-center gap-1 text-[#f26a1b]">
              {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="size-5 fill-current" />)}
              <span className="ml-2 text-sm font-600 text-[#0e2a47]" style={{ fontWeight: 600 }}>{c.reviews.ratingSummary}</span>
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {c.reviews.items.map((r) => (
              <figure key={r.name} className="rounded-lg border border-black/8 bg-[#f8fafc] p-6">
                <div className="flex gap-0.5 text-[#f26a1b]">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="size-4 fill-current" />)}</div>
                <blockquote className="mt-3 text-sm leading-relaxed text-[#33465a]">&ldquo;{r.text}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm font-600 text-[#0e2a47]" style={{ fontWeight: 600 }}>{r.name} · <span className="font-400 text-[#5a6b7c]" style={{ fontWeight: 400 }}>{r.city}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Service area */}
      <section id="areas" className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className={`${head.className} text-sm uppercase tracking-[0.2em] text-[#f26a1b]`}>{c.areas.eyebrow}</p>
            <h2 className={`${head.className} mt-2 text-3xl font-700 uppercase text-[#0e2a47] sm:text-4xl`} style={{ fontWeight: 700 }}>
              {c.areas.heading}
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {c.areas.towns.map((a) => (
                <li key={a} className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-sm text-[#33465a]">
                  <MapPin className="size-3.5 text-[#f26a1b]" /> {a}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-[#5a6b7c]">{c.areas.note}</p>
          </div>
          <div className="relative min-h-[16rem] overflow-hidden rounded-lg border border-black/8 bg-[#0e2a47]" aria-hidden="true">
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-[#f26a1b] text-white"><MapPin className="size-6" /></span>
              <span className="mt-2 text-sm text-[#a9bdd4]">{c.areas.mapCaption}</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-[#f26a1b] py-14 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 text-center sm:px-8">
          <h2 className={`${head.className} text-3xl font-700 uppercase sm:text-4xl`} style={{ fontWeight: 700 }}>
            {c.ctaBand.heading}
          </h2>
          <p className="max-w-lg text-white/90">{c.ctaBand.body}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="#quote" className={`${head.className} rounded bg-white px-7 py-3.5 text-base uppercase tracking-wide text-[#0e2a47] transition-colors hover:bg-[#0e2a47] hover:text-white`}>
              {c.ctaBand.primaryCta}
            </a>
            <DemoAction className={`${head.className} inline-flex items-center gap-2 rounded border-2 border-white px-6 py-3 text-base uppercase tracking-wide transition-colors hover:bg-white hover:text-[#f26a1b]`} ariaLabel={`Call ${c.utilityBar.phoneLabel}`}>
              <Phone className="size-5" /> {c.utilityBar.phoneLabel}
            </DemoAction>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a1f36] py-12 text-[#a9bdd4]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5 text-white">
              <span className="inline-flex size-8 items-center justify-center bg-[#f26a1b]"><Home className="size-5" /></span>
              <span className={`${head.className} text-xl font-700 uppercase`} style={{ fontWeight: 700 }}>{c.brandFull}</span>
            </div>
            <p className="mt-3 text-sm">{c.footer.tagline}</p>
            <p className="mt-2 text-xs text-[#6f88a4]">{c.footer.license}</p>
          </div>
          <div className="text-sm">
            <p className={`${head.className} uppercase tracking-wide text-white`}>{c.footer.contactHeading}</p>
            <p className="mt-3">{c.utilityBar.phoneLabel}</p>
            <p>{c.footer.email}</p>
            <p className="mt-2">{c.footer.hours}</p>
          </div>
          <div className="text-sm">
            <p className={`${head.className} uppercase tracking-wide text-white`}>{c.footer.linksHeading}</p>
            <ul className="mt-3 space-y-1.5">
              {c.footer.links.map((link) => (
                <li key={link.href}><a href={link.href} className="transition-colors hover:text-white">{link.label}</a></li>
              ))}
              <li><a href="/websites" className="text-[#f5a15e] underline underline-offset-2 transition-colors hover:text-white">{c.footer.creditLink}</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-black/10 bg-white sm:hidden">
        <DemoAction className={`${head.className} flex items-center justify-center gap-2 py-3.5 text-sm uppercase tracking-wide text-[#0e2a47]`} ariaLabel={c.stickyBar.call}>
          <Phone className="size-4" /> {c.stickyBar.call}
        </DemoAction>
        <a href="#quote" className={`${head.className} flex items-center justify-center gap-2 bg-[#f26a1b] py-3.5 text-sm uppercase tracking-wide text-white`}>
          <Check className="size-4" /> {c.stickyBar.quote}
        </a>
      </div>
    </div>
    </DemoProvider>
  )
}
