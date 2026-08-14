import type { Metadata } from "next"
import { Fraunces } from "next/font/google"
import { JsonLd } from "@/components/json-ld"
import {
  buildMetadata,
  absoluteUrl,
  siteUrl,
  jsonLdBreadcrumbs,
} from "@/lib/seo"
import {
  site,
  websitesMeta,
  websitesWho,
  websitesPricing,
  websitesWorking,
  websitesProcess,
  websitesExamples,
  websitesFaq,
  websitesInquiry,
} from "@/content"
import { WebsitesNav } from "@/components/websites/websites-nav"
import { WebsitesHero } from "@/components/websites/hero"
import { WebsitesIntro } from "@/components/websites/intro"
import { WebSection } from "@/components/websites/web-section"
import { Who } from "@/components/websites/who"
import { ExampleWork } from "@/components/websites/example-work"
import { Working } from "@/components/websites/working"
import { Pricing } from "@/components/websites/pricing"
import { Ownership } from "@/components/websites/ownership"
import { Process } from "@/components/websites/process"
import { Faq } from "@/components/websites/faq"
import { InquiryForm } from "@/components/websites/inquiry-form"
import { WebsitesFooter } from "@/components/websites/footer"

// Warm editorial display face, scoped to this page via the --font-display var.
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

export const metadata: Metadata = buildMetadata({
  title: websitesMeta.metaTitle,
  description: websitesMeta.metaDescription,
  path: "/websites",
})

function websitesJsonLd() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Website Design & Development — ${site.name}`,
    description: websitesMeta.metaDescription,
    url: absoluteUrl("/websites"),
    provider: { "@type": "Person", name: site.name, url: siteUrl },
    areaServed: "US",
    serviceType: [
      "Small business website development",
      "Professional personal websites",
      "Custom website and application development",
      "Website modernization",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Website services",
      itemListElement: websitesPricing.tiers.map((t) => ({
        "@type": "Offer",
        name: t.name,
        description: t.summary,
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          minPrice: Number(t.price.replace(/[^0-9.]/g, "")),
        },
      })),
    },
  }
  const breadcrumbs = jsonLdBreadcrumbs([
    { name: "Home", path: "/" },
    { name: "Websites", path: "/websites" },
  ])
  return [service, breadcrumbs]
}

export default function WebsitesPage() {
  return (
    <div
      className={`${display.variable} websites-theme relative min-h-screen`}
    >
      <JsonLd data={websitesJsonLd()} />

      {/* Warm ground that also covers overscroll, plus a whisper of sage light
          at the top so the cream canvas has a little depth. */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-background"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[45vh] opacity-70 [background:radial-gradient(ellipse_60%_45%_at_50%_-5%,color-mix(in_oklab,var(--primary)_10%,transparent),transparent_70%)]"
        aria-hidden="true"
      />

      <a
        href="#inquiry"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-16 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to project inquiry
      </a>

      <WebsitesNav />

      <main className="relative mx-auto max-w-5xl px-6 sm:px-8">
        <WebsitesHero />
        <WebsitesIntro />

        <WebSection id="who" title={websitesWho.label} lead={websitesWho.intro}>
          <Who />
        </WebSection>

        <WebSection
          id="examples"
          title={websitesExamples.label}
          lead={websitesExamples.intro}
        >
          <ExampleWork />
        </WebSection>

        <WebSection id="working" title={websitesWorking.label}>
          <Working />
        </WebSection>

        <WebSection
          id="pricing"
          title={websitesPricing.label}
          lead={websitesPricing.intro}
        >
          <Pricing />
        </WebSection>

        <Ownership />

        <WebSection id="process" title={websitesProcess.label}>
          <Process />
        </WebSection>

        <WebSection id="faq" title={websitesFaq.label}>
          <Faq />
        </WebSection>

        <WebSection
          id="inquiry"
          title={websitesInquiry.label}
          lead={websitesInquiry.intro}
        >
          <InquiryForm />
        </WebSection>

        <WebsitesFooter />
      </main>
    </div>
  )
}
