# nathanriojas.com

Personal portfolio and photography journal for **Nathan Riojas**, a Forward Deployed Engineer. A single-page portfolio (About, Projects, Experience, Skills, Contact) plus **Field Notes** — a separate, editorial travel-photography gallery — built as a fast, accessible, content-driven Next.js app.

- **Live:** https://nathanriojas.com
- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Resend · Upstash · Vercel

---

## Highlights

- **Content-driven.** All editable copy and data lives in [`content/`](content) (one file per domain) and [`public/field-notes/manifest.json`](public/field-notes/manifest.json). Components are presentation; you change words in one place.
- **Field Notes gallery.** A deterministic, hand-placed "photo wall" masonry layout with a curated, balanced composition, plus an Apple-Photos-style lightbox with zoom/pan that never upscales or crops.
- **Production contact form.** App Router route handler → [Resend](https://resend.com) email, with server-side validation/sanitization, a honeypot + submit-timing bot filter, and per-IP rate limiting via [Upstash Redis](https://upstash.com).
- **Performance.** `next/image` (AVIF/WebP, responsive, lazy) with all source images resized to a 2560px cap; heavy GIFs converted to looping muted MP4.
- **SEO.** Centralized metadata builder, JSON-LD (Person, WebSite, ImageGallery, breadcrumbs), sitemap, robots, and dynamic Open Graph images.
- **Accessible + tasteful motion.** Semantic markup, keyboard/focus support, and reduced-motion fallbacks throughout.

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 16 (App Router, React Server Components) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS v4, Base UI, lucide-react |
| Email | Resend |
| Rate limiting | Upstash Redis + `@upstash/ratelimit` |
| Image processing | `sharp` (build-time scripts), `next/image` (runtime) |
| Hosting | Vercel |

## Project structure

```
app/                 App Router routes, layout, API, SEO plumbing
  api/contact/       Contact form route handler (Resend)
  field-notes/       The /field-notes gallery route
  page.tsx           Home page (composes the sections)
  globals.css        Design tokens + all custom animations (Tailwind v4)
content/             ALL editable copy/data — one file per domain (site, nav,
                     hero, about, experience, projects, skills, contact,
                     field-notes) re-exported from content/index.ts (@/content)
components/          Presentation components (sections, Field Notes, media/zoom)
lib/                 Logic only: field-notes loader, contact validation/email,
                     rate limiting, SEO helpers, utils
public/
  field-notes/       Gallery images (per-country folders) + manifest.json
  projects/          Project media (mp4/png/jpg/svg)
scripts/             Legacy field-notes tooling (see caveat below)
AGENTS.md            Deep contributor/AI guide — the source of truth for "how to"
```

For the detailed conventions (adding a project, adding Field Notes images, the
image-resizing workflow, the contact-form architecture), see **[AGENTS.md](AGENTS.md)**.

## Getting started

**Prerequisites:** Node.js 20+ and a package manager (npm or pnpm).

```bash
npm install
# Create .env.local and fill in values as needed (see Environment variables below).
# It's optional for local dev — the site runs without it.
npm run dev                  # http://localhost:3000
```

> The contact form and rate limiter **fail gracefully** without credentials, so the site runs locally with an empty `.env.local` — the form just can't send email until `RESEND_API_KEY` is set.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve a production build |
| `npm run lint` | ESLint |
| `npm run generate:fieldnotes` | ⚠️ **Legacy** manifest generator — **do not run** against the current data; it contains stale hardcoded entries and would clobber the manifest. See the header comments in `scripts/`. |

## Environment variables

All are server-side only and read from the environment (never bundled to the client). Set them in `.env.local` for local dev and in your host's dashboard for production.

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Yes (for email) | Resend API key. The sending domain must be verified in Resend. |
| `CONTACT_TO_EMAIL` | No | Recipient (default `me@nathanriojas.com`). |
| `CONTACT_FROM_EMAIL` | No | Sender (default `Nathan Riojas <contact@nathanriojas.com>`). |
| `UPSTASH_REDIS_REST_URL` | No | Upstash Redis REST URL — enables per-IP rate limiting when set. |
| `UPSTASH_REDIS_REST_TOKEN` | No | Upstash Redis REST token. |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical origin for SEO (default `https://nathanriojas.com`). |

Rate limiting and the bot filter activate automatically once their credentials are present; without them the endpoint still validates input and sends email.

## Editing content

- **Copy & data:** edit the relevant file in [`content/`](content) — e.g. `content/projects.ts` for projects, `content/contact.ts` for the contact form's text. No component edits needed.
- **Field Notes photos:** drop the image into `public/field-notes/<country>/` and add an entry to `public/field-notes/manifest.json`. See [AGENTS.md](AGENTS.md) for the schema, the required real/oriented dimensions, and the resize step.

## Deployment

Deployed on **Vercel**. The App Router route handlers (contact form, image optimization) require a Node host — note that **despite the `*.github.io` repository name, this is not a static export and will not work on GitHub Pages.** To deploy:

1. Import the repo into Vercel.
2. Add the environment variables above (at minimum `RESEND_API_KEY`).
3. Push to the production branch; Vercel builds and deploys automatically.

## License

© Nathan Riojas. Source is provided for reference; site content, copy, and photographs are not licensed for reuse.
