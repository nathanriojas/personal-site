import type { Metadata } from "next"
import { Spectral, Libre_Franklin } from "next/font/google"
import { ConceptBanner } from "@/components/samples/concept-banner"
import { ScrollToTop } from "@/components/scroll-to-top"
import { DemoProvider, DemoAction } from "@/components/samples/demo-action"
import { ashfordVale as c } from "@/content/concepts"

/*
 * CONCEPT SITE — "Ashford & Vale", a boutique strategy & operations advisory.
 * Design direction: restrained, sophisticated, editorial, generous whitespace.
 * Palette: ivory #f7f6f2 · ink #171a18 · forest #2c4a3b · gold #a98a54.
 * No fabricated regulated credentials; engagements are described generically.
 *
 * All copy lives in content/concepts/ashford-vale.ts — this file is layout,
 * palette, and typography only.
 */

const serif = Spectral({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" })
const sans = Libre_Franklin({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" })

export const metadata: Metadata = {
  title: "Ashford & Vale — Strategy & Operations Advisory",
  description:
    "A concept advisory-firm website by Nathan Riojas. A restrained, editorial design for a boutique strategy and operations practice.",
  robots: { index: false, follow: false },
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className={`${sans.className} text-[11px] font-medium uppercase tracking-[0.24em] text-[#2c4a3b]`}>
    {children}
  </p>
)




export default function AdvisoryConcept() {
  return (
    <DemoProvider>
    <div className={`${sans.className} min-h-screen bg-[#f7f6f2] text-[#171a18]`}>
      <ConceptBanner className="border-b border-[#171a18]/8 bg-[#f0efe9] text-[#5f635b]" linkClassName="text-[#2c4a3b]" />

      {/* Header — sticky. Restructured with an outer full-width wrapper so the
          bg/blur cover the whole viewport width while the inner row stays
          aligned to the page's max-w-5xl content column. The concept banner
          above it stays non-sticky (see components/samples/concept-banner). */}
      <header className="sticky top-0 z-40 border-b border-[#171a18]/8 bg-[#f7f6f2]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 sm:px-8">
          <ScrollToTop className={`${serif.className} text-xl tracking-tight text-[#171a18] transition-opacity duration-300 hover:opacity-80`}>
            {c.brand.first} <span className="text-[#a98a54]">{c.brand.amp}</span> {c.brand.second}
          </ScrollToTop>
          <nav className="hidden items-center gap-9 text-sm text-[#4a4e47] md:flex">
            {c.nav.map((item) => (
              <a key={item.href} href={item.href} className="rounded-sm outline-none transition-colors hover:text-[#2c4a3b] focus-visible:text-[#2c4a3b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{item.label}</a>
            ))}
          </nav>
          <a href="#contact" className="rounded-sm text-sm text-[#2c4a3b] underline decoration-[#2c4a3b]/30 underline-offset-4 outline-none transition-colors hover:decoration-[#2c4a3b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
            {c.navCta}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto max-w-5xl px-6 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-24">
        <Label>{c.hero.eyebrow}</Label>
        <h1 className={`${serif.className} mt-7 max-w-3xl text-4xl font-medium leading-[1.12] tracking-tight text-[#171a18] sm:text-6xl`}>
          {c.hero.headline}
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#4a4e47]">
          {c.hero.body}
        </p>
        <div className="mt-10 flex items-center gap-6">
          <a href="#contact" className="rounded-none bg-[#2c4a3b] px-7 py-3.5 text-sm font-medium text-[#f7f6f2] transition-colors hover:bg-[#22392e]">
            {c.hero.primaryCta}
          </a>
          <a href="#approach" className="text-sm text-[#4a4e47] transition-colors hover:text-[#2c4a3b]">
            {c.hero.secondaryCta}
          </a>
        </div>
      </section>

      {/* Positioning statement */}
      <section className="border-y border-[#171a18]/8 bg-[#f2f1ea]">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
          <p className={`${serif.className} max-w-3xl text-2xl leading-relaxed text-[#2a2e28] sm:text-3xl`}>
            {c.positioning}
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-28">
        <Label>{c.services.eyebrow}</Label>
        <div className="mt-12 divide-y divide-[#171a18]/10 border-y border-[#171a18]/10">
          {c.services.items.map((s) => (
            <div key={s.name} className="grid gap-4 py-9 sm:grid-cols-[auto_1fr] sm:gap-12">
              <div className="flex items-baseline gap-5">
                <span className={`${serif.className} text-lg text-[#a98a54]`}>{s.n}</span>
                <h2 className={`${serif.className} text-3xl font-medium tracking-tight text-[#171a18]`}>{s.name}</h2>
              </div>
              <p className="max-w-xl text-lg leading-relaxed text-[#4a4e47] sm:pt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="border-t border-[#171a18]/8 bg-[#20302a] text-[#e9e7dd]">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-28">
          <p className={`${sans.className} text-[11px] font-medium uppercase tracking-[0.24em] text-[#b7c3ab]`}>{c.approach.eyebrow}</p>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            {c.approach.items.map((item) => (
              <div key={item.title}>
                <h3 className={`${serif.className} text-2xl font-medium text-[#f4f2e8]`}>{item.title}</h3>
                <p className="mt-3 leading-relaxed text-[#b9bfb0]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Representative work */}
      <section id="work" className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-28">
        <Label>{c.work.eyebrow}</Label>
        <p className="mt-4 max-w-xl text-[#6a6e66]">
          {c.work.note}
        </p>
        <div className="mt-12 space-y-px overflow-hidden rounded-none border border-[#171a18]/10">
          {c.work.engagements.map((e) => (
            <div key={e.sector} className="grid gap-2 bg-[#faf9f5] px-6 py-7 sm:grid-cols-[14rem_1fr] sm:gap-8 sm:px-8">
              <p className={`${serif.className} text-lg text-[#2c4a3b]`}>{e.sector}</p>
              <p className="text-[#4a4e47]">{e.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Insights */}
      <section id="insights" className="border-t border-[#171a18]/8 bg-[#f2f1ea]">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-24">
          <Label>{c.insights.eyebrow}</Label>
          {/* Illustrative article index — no full pieces exist behind these for
              this concept, so entries are non-interactive rather than dead links. */}
          <ul className="mt-10 divide-y divide-[#171a18]/10 border-y border-[#171a18]/10">
            {c.insights.items.map((a) => (
              <li
                key={a.title}
                className="flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <span className={`${serif.className} text-xl text-[#171a18] sm:text-2xl`}>{a.title}</span>
                <span className="shrink-0 text-sm text-[#8a8e84]">{a.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-16">
          <div>
            <Label>{c.contact.eyebrow}</Label>
            <h2 className={`${serif.className} mt-5 text-4xl font-medium leading-tight tracking-tight text-[#171a18] sm:text-5xl`}>
              {c.contact.heading}
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-[#4a4e47]">
              {c.contact.body}
            </p>
          </div>
          <div className="space-y-6 sm:pt-10">
            <div>
              <p className="text-sm text-[#8a8e84]">{c.contact.emailLabel}</p>
              <DemoAction className={`${serif.className} text-xl text-[#2c4a3b] transition-colors hover:text-[#171a18]`} ariaLabel={`Email ${c.contact.email}`}>{c.contact.email}</DemoAction>
            </div>
            <div>
              <p className="text-sm text-[#8a8e84]">{c.contact.officesLabel}</p>
              <p className={`${serif.className} text-xl text-[#171a18]`}>{c.contact.offices}</p>
            </div>
            <DemoAction className="inline-flex rounded-none bg-[#2c4a3b] px-7 py-3.5 text-sm font-medium text-[#f7f6f2] transition-colors hover:bg-[#22392e]">
              {c.contact.cta}
            </DemoAction>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#171a18]/10">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-[#8a8e84] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className={`${serif.className} text-base text-[#171a18]`}>{c.brand.first} <span className="text-[#a98a54]">{c.brand.amp}</span> {c.brand.second}</p>
          <a href="/websites" className="text-[#2c4a3b] underline decoration-[#2c4a3b]/30 underline-offset-4 transition-colors hover:decoration-[#2c4a3b]">
            {c.footer.creditLink}
          </a>
        </div>
      </footer>
    </div>
    </DemoProvider>
  )
}
