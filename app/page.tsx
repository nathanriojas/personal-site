import { AmbientBackground } from "@/components/ambient-background"
import { FlyingName } from "@/components/flying-name"
import { ScrollRestorer } from "@/components/scroll-restorer"
import { TopNav } from "@/components/top-nav"
import { Hero } from "@/components/sections/hero"
import { Section } from "@/components/section"
import { AboutSection } from "@/components/sections/about"
import { ExperienceSection } from "@/components/sections/experience"
import { ProjectsSection } from "@/components/sections/projects"
import { SkillsSection } from "@/components/sections/skills"
import { ContactSection } from "@/components/sections/contact"
import { site, sections, chrome } from "@/content"

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
          <Section
            id="contact"
            label={sections.contact.label}
            accent={sections.contact.accent}
            glowSide={sections.contact.glowSide}
          >
            <ContactSection />
            <footer className="mt-16 border-t border-border pt-8 text-sm text-muted-foreground">
              <p>
                {chrome.footerCredit} {site.name}.
              </p>
            </footer>
          </Section>
        </main>
      </div>
    </div>
  )
}
