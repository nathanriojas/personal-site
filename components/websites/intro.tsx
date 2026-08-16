/**
 * "Hi, I'm Nathan." — the personal introduction, placed early so a visitor
 * feels they're meeting a real person before any pricing or segmentation.
 *
 * Portrait: the crop is baked into the asset itself
 * (public/nathan-headshot.jpg), which Nathan composed by hand — the code must
 * not re-crop it. That asset is essentially square (2560x2547), so the
 * container is `aspect-square` to match it: when the container ratio equals
 * the image ratio, `object-cover` has no overflow to trim and the composition
 * renders exactly as cropped. (A previous 9:10 container silently shaved ~10%
 * off the sides of that intentional framing.) `object-center` is therefore a
 * no-op here and stays only as an explicit default — if the asset is ever
 * replaced with a differently-shaped one, match `aspect-*` to the new file's
 * ratio rather than trying to compensate with object-position.
 */
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { websitesIntro } from "@/content"

export function WebsitesIntro() {
  return (
    <section className="py-14 sm:py-20">
      <ScrollReveal>
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
          <div className="mx-auto w-full max-w-[16rem] shrink-0 md:mx-0 md:max-w-none md:w-72">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-secondary shadow-xl shadow-black/[0.06]">
              <Image
                src="/nathan-websites-portrait.jpg"
                alt={websitesIntro.portraitAlt}
                fill
                quality={90}
                sizes="(min-width: 768px) 288px, 256px"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              {websitesIntro.heading}
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted-foreground">
              {websitesIntro.paragraphs.map((p, i) => (
                <p key={i} className="text-pretty">
                  {p}
                </p>
              ))}
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              {websitesIntro.portfolio.text}{" "}
              <Link
                href={websitesIntro.portfolio.href}
                className="group inline-flex items-center gap-1 rounded-sm font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {websitesIntro.portfolio.linkLabel}
                <ArrowRight
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
