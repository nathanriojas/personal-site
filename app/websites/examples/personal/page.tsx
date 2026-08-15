import type { Metadata } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { ArrowRight } from "lucide-react"
import { ConceptBanner } from "@/components/samples/concept-banner"
import { ScrollToTop } from "@/components/scroll-to-top"
import { DemoProvider, DemoAction } from "@/components/samples/demo-action"
import { mayaEllison as c } from "@/content/concepts"

/*
 * CONCEPT SITE — "Maya Ellison", an individual professional / personal site.
 * Design direction: editorial, expressive, high-contrast, grotesk + mono.
 * Palette: paper #f3f1ea · ink #141317 · cobalt #2b46ff.
 * Maya is fictional — no real portrait is used (an abstract monogram stands in).
 *
 * All copy lives in content/concepts/maya-ellison.ts — this file is layout,
 * palette, and typography only.
 */

const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" })
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" })

export const metadata: Metadata = {
  title: "Maya Ellison — Product Designer & Design Engineer",
  description:
    "A concept personal website by Nathan Riojas. An editorial, expressive design for an individual professional's online presence.",
  robots: { index: false, follow: false },
}



export default function PersonalConcept() {
  return (
    <DemoProvider>
    <div className={`${grotesk.className} min-h-screen bg-[#f3f1ea] text-[#141317]`}>
      <ConceptBanner className="bg-[#141317] text-[#a7a5ad]" linkClassName="text-[#8fa0ff]" />

      {/* Header — sticky, using this concept's own bold 2px-rule motif (see
          the "marquee" strip below) rather than the other concepts' hairline
          border, so it stays visually consistent with Maya's graphic style. */}
      <header className="sticky top-0 z-40 border-b-2 border-[#141317] bg-[#f3f1ea]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
          <ScrollToTop className="rounded-sm text-lg font-600 transition-opacity duration-300 hover:opacity-80" style={{ fontWeight: 600 }}>{c.name}</ScrollToTop>
          <nav className={`${mono.className} hidden items-center gap-7 text-[13px] text-[#5b5960] sm:flex`}>
            {c.nav.map((item) => (
              <a key={item.href} href={item.href} className="rounded-sm outline-none transition-colors hover:text-[#2b46ff] focus-visible:text-[#2b46ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{item.label}</a>
            ))}
          </nav>
          <span className={`${mono.className} inline-flex items-center gap-2 text-[13px] text-[#5b5960]`}>
            <span className="size-2 rounded-full bg-[#2b46ff]" aria-hidden="true" /> {c.availability}
          </span>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-16">
        <p className={`${mono.className} text-[13px] uppercase tracking-[0.2em] text-[#5b5960]`}>
          {c.hero.eyebrow}
        </p>
        <h1 className="mt-8 text-[clamp(2.75rem,9vw,6.5rem)] font-600 leading-[0.98] tracking-[-0.02em]" style={{ fontWeight: 600 }}>
          {c.hero.headlineLine1}<br />
          {c.hero.headlineLine2Pre}<span className="text-[#2b46ff]">{c.hero.headlineAccent}</span>{c.hero.headlineLine2Post}
        </h1>
        <div className="mt-10 flex max-w-2xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-lg leading-relaxed text-[#3d3b43]">
            {c.hero.body}
          </p>
          <div className="flex items-center gap-4">
            <a href="#work" className="inline-flex items-center gap-2 rounded-full bg-[#141317] px-6 py-3 text-sm font-500 text-[#f3f1ea] transition-colors hover:bg-[#2b46ff]" style={{ fontWeight: 500 }}>
              {c.hero.primaryCta} <ArrowRight className="size-4" />
            </a>
            <a href="#contact" className="text-sm text-[#141317] underline decoration-[#2b46ff] decoration-2 underline-offset-4 transition-colors hover:text-[#2b46ff]">
              {c.hero.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      {/* Marquee-ish capability strip */}
      <section className="overflow-hidden border-y-2 border-[#141317] py-3">
        <div className={`${mono.className} flex flex-wrap justify-center gap-x-6 gap-y-1 px-5 text-[13px] uppercase tracking-widest text-[#5b5960]`}>
          {c.capabilities.map((cap, i) => (
            <span key={cap} className="contents">
              {i > 0 && <span className="text-[#2b46ff]">/</span>}
              <span>{cap}</span>
            </span>
          ))}
        </div>
      </section>

      {/* Work */}
      <section id="work" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex items-baseline justify-between">
          <h2 className="text-3xl font-600 tracking-tight sm:text-4xl" style={{ fontWeight: 600 }}>{c.work.heading}</h2>
          <span className={`${mono.className} text-[13px] text-[#5b5960]`}>{c.work.range}</span>
        </div>
        {/* Selected-work index — illustrative case studies with no real
            destination for this concept, so entries aren't dead links. */}
        <div className="mt-10 border-t border-[#141317]/15">
          {c.work.items.map((w) => (
            <div key={w.title} className="grid items-center gap-6 border-b border-[#141317]/15 py-8 sm:grid-cols-[auto_1fr] sm:gap-10">
              <div className="flex items-center gap-6">
                <span className={`${mono.className} text-sm text-[#8a8890]`}>{w.n}</span>
                <div
                  className="size-16 shrink-0 rounded-lg sm:size-20"
                  style={{ background: `linear-gradient(140deg, ${w.tint}, ${w.tint}22)` }}
                  aria-hidden="true"
                />
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="text-2xl font-600 tracking-tight sm:text-3xl" style={{ fontWeight: 600 }}>{w.title}</h3>
                  <span className={`${mono.className} text-[13px] text-[#5b5960]`}>{w.role} · {w.year}</span>
                </div>
                <p className="mt-2 max-w-xl text-[#3d3b43]">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-y border-[#141317]/12 bg-[#ece9e0]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div
            className="relative flex aspect-[4/5] max-w-xs items-center justify-center overflow-hidden rounded-2xl"
            style={{ background: "linear-gradient(150deg, #2b46ff, #141317)" }}
            aria-hidden="true"
          >
            <span className={`${grotesk.className} text-7xl font-700 text-white/90`} style={{ fontWeight: 700 }}>{c.monogram}</span>
          </div>
          <div>
            <p className={`${mono.className} text-[13px] uppercase tracking-[0.2em] text-[#5b5960]`}>{c.about.eyebrow}</p>
            <div className="mt-6 space-y-5 text-xl leading-relaxed text-[#2a2930]">
              {c.about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Writing */}
      <section id="writing" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="text-3xl font-600 tracking-tight sm:text-4xl" style={{ fontWeight: 600 }}>{c.writing.heading}</h2>
        {/* Illustrative — no full essays/talks exist behind these for this
            concept, so entries are non-interactive rather than dead links. */}
        <ul className="mt-8 border-t border-[#141317]/15">
          {c.writing.items.map((a) => (
            <li
              key={a.title}
              className="flex items-center justify-between gap-6 border-b border-[#141317]/15 py-6"
            >
              <span className="text-xl font-500 sm:text-2xl" style={{ fontWeight: 500 }}>{a.title}</span>
              <span className={`${mono.className} shrink-0 text-[13px] text-[#5b5960]`}>{a.meta}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-[#141317] text-[#f3f1ea]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <p className={`${mono.className} text-[13px] uppercase tracking-[0.2em] text-[#8fa0ff]`}>{c.contact.eyebrow}</p>
          <h2 className="mt-6 text-[clamp(2.5rem,8vw,5.5rem)] font-600 leading-[0.98] tracking-[-0.02em]" style={{ fontWeight: 600 }}>
            {c.contact.headingLine1}<br />{c.contact.headingLine2}
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <DemoAction className="text-xl text-[#f3f1ea] underline decoration-[#2b46ff] decoration-2 underline-offset-[6px] transition-colors hover:text-[#8fa0ff] sm:text-2xl" ariaLabel={`Email ${c.contact.email}`}>
              {c.contact.email}
            </DemoAction>
            {/* Decorative — no real profiles exist for this fictional concept. */}
            <div className={`${mono.className} flex gap-5 text-sm text-[#a7a5ad]`} aria-hidden="true">
              {c.contact.socials.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#141317] text-[#6b6971]">
        <div className={`${mono.className} mx-auto flex max-w-6xl flex-col gap-3 border-t border-white/10 px-5 py-8 text-[13px] sm:flex-row sm:items-center sm:justify-between sm:px-8`}>
          <span>{c.footer.copyright}</span>
          <a href="/websites" className="text-[#8fa0ff] underline underline-offset-2 transition-colors hover:text-white">
            {c.footer.creditLink}
          </a>
        </div>
      </footer>
    </div>
    </DemoProvider>
  )
}
