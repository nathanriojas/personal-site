import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { AmbientBackground } from "@/components/ambient-background"
import { FlyingName } from "@/components/flying-name"
import { ScrollRestorer } from "@/components/scroll-restorer"
import { TopNav } from "@/components/top-nav"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Hero } from "@/components/sections/hero"
import { Section } from "@/components/section"
import { AboutSection } from "@/components/sections/about"
import { ExperienceSection } from "@/components/sections/experience"
import { ProjectsSection } from "@/components/sections/projects"
import { SkillsSection } from "@/components/sections/skills"
import { ContactSection } from "@/components/sections/contact"
import { site, sections, chrome, websitesHomeTeaser } from "@/content"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Restores scroll position when returning from Field Notes */}
      <ScrollRestorer />
      {/* Ambient lighting + scroll-tracked spotlight */}
      <AmbientBackground />
      {/* Persistent blueprint dot-grid for depth across the whole canvas */}
      <div className="pointer-events-none absolute inset-0 bg-dots [mask-image:linear-gradient(to_bottom,transparent_0%,black_9%,black_92%,transparent_100%)]" />
      {/* Finer line grid accent near the hero seam */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[120vh] bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <TopNav />
      <FlyingName />

      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-16 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {chrome.skipToContent}
      </a>

      <Hero />

      <div className="relative mx-auto max-w-3xl px-6 sm:px-10">
        <main>
          <Section
            id="about"
            label={sections.about.label}
            accent={sections.about.accent}
            glowSide={sections.about.glowSide}
          >
            <AboutSection />
          </Section>
          <Section
            id="projects"
            label={sections.projects.label}
            accent={sections.projects.accent}
            glowSide={sections.projects.glowSide}
          >
            <ProjectsSection />
          </Section>
          <Section
            id="experience"
            label={sections.experience.label}
            accent={sections.experience.accent}
            glowSide={sections.experience.glowSide}
          >
            <ExperienceSection />
          </Section>
          <Section
            id="skills"
            label={sections.skills.label}
            accent={sections.skills.accent}
            glowSide={sections.skills.glowSide}
          >
            <SkillsSection />
          </Section>

          {/* Website services — placed between the portfolio and Contact so the
              flow reads: here's my engineering work; I also build directly for
              individuals and small businesses; here's how to reach me. Kept
              compact and off the primary nav on purpose. */}
          <section aria-label="Website services" className="py-10">
           <ScrollReveal>
            <div className="rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                {websitesHomeTeaser.eyebrow}
              </p>
              <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                <div>
                  <h2 className="text-xl font-medium text-foreground sm:text-2xl">
                    {websitesHomeTeaser.heading}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {websitesHomeTeaser.body}
                  </p>
                </div>
                <Link
                  href="/websites"
                  className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary transition-colors duration-300 hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {websitesHomeTeaser.cta}
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
           </ScrollReveal>
          </section>

          <Section
            id="contact"
            label={sections.contact.label}
            accent={sections.contact.accent}
            glowSide={sections.contact.glowSide}
          >
            <ContactSection />

            <footer className="mt-16 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border pt-8 text-sm text-muted-foreground">
              <p>
                {chrome.footerCredit} {site.name}.
              </p>
              <Link
                href="/websites"
                className="transition-colors hover:text-primary"
              >
                {websitesHomeTeaser.footerLink}
              </Link>
            </footer>
          </Section>
        </main>
      </div>
    </div>
  )
}
