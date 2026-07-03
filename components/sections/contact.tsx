/**
 * Contact section: intro copy, the contact form, and understated direct links
 * (email, GitHub, LinkedIn). Copy comes from content/contact.ts.
 */
import { Mail } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ContactForm } from "@/components/sections/contact-form"
import { site, contact } from "@/content"

export function ContactSection() {
  return (
    <ScrollReveal>
      <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
        {contact.section.intro}
      </p>

      <ContactForm />

      {/* Direct alternatives — bare, larger icons, kept understated so the form
          stays the focus. Labels are removed visually but preserved for screen
          readers + hover tooltips via aria-label / title. */}
      <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-border pt-6">
        <span className="text-sm text-muted-foreground/80">
          {contact.section.directLabel}
        </span>
        <div className="flex items-center gap-7">
          <a
            href={`mailto:${site.email}`}
            aria-label={`${contact.section.social.emailAriaPrefix} ${site.email}`}
            title={site.email}
            className="text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-primary focus-visible:outline-none focus-visible:text-primary"
          >
            <Mail className="size-6" />
          </a>
          <a
            href={site.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label={contact.section.social.githubAria}
            title={contact.section.social.githubTitle}
            className="text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-primary focus-visible:outline-none focus-visible:text-primary"
          >
            <GithubIcon className="size-6" />
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={contact.section.social.linkedinAria}
            title={contact.section.social.linkedinTitle}
            className="text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-primary focus-visible:outline-none focus-visible:text-primary"
          >
            <LinkedinIcon className="size-6" />
          </a>
        </div>
      </div>
    </ScrollReveal>
  )
}
