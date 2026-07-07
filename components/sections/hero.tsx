/**
 * The hero: a full-bleed background portrait with legibility scrims, the
 * animated intro (name, title, tagline, location), social + resume links, and
 * the Field Notes plaque. Copy comes from content (site, hero).
 */
import Image from "next/image"
import { Mail, FileText, MapPin, ChevronDown } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { Typewriter } from "@/components/typewriter"
import { HeroCaption } from "@/components/field-notes/hero-caption"
import { site, hero, chrome } from "@/content"

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center"
    >
      {/* Full-bleed background portrait */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src={site.heroImage || "/placeholder.svg"}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient scrims for text legibility while keeping the photo vivid */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/40" />
        {/* Dedicated bottom fade so the photo dissolves into the content canvas */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 sm:px-10">
        <Typewriter
          text={hero.greeting}
          className="block font-mono text-sm uppercase tracking-[0.3em] text-primary"
        />

        <h1
          className="mt-4 animate-intro text-balance font-mono text-5xl font-semibold tracking-tight text-foreground [word-spacing:-0.22em] sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "900ms" }}
        >
          {/* The first name is the start anchor for the flying-name overlay,
              which paints over it, so it's kept invisible but in-flow. */}
          <span id="hero-name-anchor" style={{ opacity: 0 }}>
            {site.name.split(" ")[0]}
          </span>{" "}
          {site.name.split(" ").slice(1).join(" ")}
        </h1>

        <h2
          className="mt-4 animate-intro text-2xl font-medium text-muted-foreground sm:text-3xl"
          style={{ animationDelay: "1000ms" }}
        >
          {site.title}
        </h2>

        <p
          className="mt-6 max-w-xl animate-intro text-pretty text-lg leading-relaxed text-muted-foreground"
          style={{ animationDelay: "1080ms" }}
        >
          {site.tagline}
        </p>

        <p
          className="mt-6 flex animate-intro items-center gap-2 text-sm text-muted-foreground"
          style={{ animationDelay: "1160ms" }}
        >
          <MapPin className="size-4 text-primary" aria-hidden="true" />
          {site.location}
        </p>

        <ul
          className="mt-8 flex animate-intro items-center gap-5"
          style={{ animationDelay: "1240ms" }}
        >
          <li>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label={hero.aria.github}
            >
              <GithubIcon className="size-6" />
            </a>
          </li>
          <li>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label={hero.aria.linkedin}
            >
              <LinkedinIcon className="size-6" />
            </a>
          </li>
          <li>
            {/* On mobile the mail icon scrolls to the contact form; on larger
                screens it opens the visitor's mail client. */}
            <a
              href="#contact"
              className="text-muted-foreground transition-colors hover:text-primary sm:hidden"
              aria-label={hero.aria.email}
            >
              <Mail className="size-6" />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="hidden text-muted-foreground transition-colors hover:text-primary sm:inline-block"
              aria-label={hero.aria.email}
            >
              <Mail className="size-6" />
            </a>
          </li>
          <li>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <FileText className="size-5" />
              {chrome.resume}
            </a>
          </li>
        </ul>

        <a
          href="#about"
          aria-label={hero.scrollAriaLabel}
          className="mt-16 inline-flex animate-intro items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
          style={{ animationDelay: "1320ms" }}
        >
          <span>{hero.scrollLabel}</span>
          <ChevronDown className="size-4 animate-bounce" aria-hidden="true" />
        </a>
      </div>

      {/* The hero photo's plaque — the sole, quiet gateway into Field Notes */}
      <HeroCaption />
    </section>
  )
}
