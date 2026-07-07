# AGENTS.md — AI context for nathanriojas.github.io

This file orients an AI assistant (Claude, Cursor, Copilot, etc.) to this repo so
it can help quickly and safely. It's the single source of truth for "how this
site is put together and how to change it." If you use Claude Code specifically,
note that it auto-loads `CLAUDE.md`; you can symlink or copy this file to
`CLAUDE.md` if you want it loaded automatically there too.

Keep this file updated when structure or conventions change.

---

## 1. What this is

- **Nathan Riojas's personal portfolio site** — a single-page portfolio plus a
  separate "Field Notes" travel-photography gallery.
- **Owner / audience:** Nathan Riojas, a Forward Deployed Engineer. The site is a
  professional showcase (About, Projects, Experience, Skills, Contact) with a
  calm, understated, dark aesthetic.
- **Not** an app with user accounts, a database, or stored user data. It is
  effectively static content + one email endpoint (the contact form).

## 2. Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**.
- **Tailwind CSS v4** (config lives in CSS via `@import "tailwindcss"` in
  `app/globals.css`; there is no `tailwind.config.js`).
- **Base UI** (`@base-ui/react`) + a shadcn-style `Button`; `lucide-react` icons.
- **Resend** SDK for transactional email (contact form).
- **Vercel Analytics** (`@vercel/analytics`).
- **Deployed on Vercel** (a Node host — the App Router route handlers run
  server-side). Despite the `*.github.io` repo name, this is NOT static-exported
  and should not be hosted on GitHub Pages (the contact API needs a server).
- **sharp** is available (transitively, via Next) and is the tool used for image
  resizing/metadata scripts.

## 3. Commands

Node is managed via **nvm in WSL** in the current dev environment. Run:

```bash
npm run dev      # local dev server (localhost:3000)
npm run build    # production build
npm run start    # serve a production build
npm run lint     # eslint
npm run generate:fieldnotes   # legacy manifest generator (see §6.2 caveat)
```

Note: both `package-lock.json` and `pnpm-lock.yaml` exist. If you add a
dependency, **update whichever lockfile your deploy uses (Vercel autodetects) —
and ideally keep both in sync** to avoid a frozen-lockfile build failure.

## 4. Directory map

```
app/
  page.tsx            Home page — composes all sections in order
  layout.tsx          Root layout, fonts, metadata
  globals.css         Design tokens + all custom animations/effects (Tailwind v4)
  api/contact/route.ts  Contact form POST handler (Resend)
  field-notes/        The /field-notes gallery route
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx  SEO/PWA plumbing
components/
  section.tsx         Section wrapper (heading, accent glow, scroll reveal)
  scroll-reveal.tsx   IntersectionObserver reveal animation
  top-nav.tsx flying-name.tsx ambient-background.tsx  Chrome + ambient visuals
  sections/           One component per page section (about, projects,
                      experience, skills, contact, contact-form, hero, ...)
  project-modal.tsx project-gallery.tsx project-media.tsx image-inspector.tsx
                      Project detail modal + media/zoom system
  field-notes/        editorial-gallery.tsx, photo-viewer.tsx, hero-caption.tsx
  ui/button.tsx       The one shared button primitive
content/              ALL editable copy/data — edit here to change words. One
                      file per domain: site, navigation, hero, about, experience,
                      projects, skills, contact, field-notes (+ index.ts barrel).
lib/                  LOGIC only (no copy):
  field-notes.ts      Loads public/field-notes/manifest.json, sorts by `order`
  contact.ts          Contact validation + sanitization + email templates
  rate-limit.ts       Per-IP Upstash rate limiter for the contact route
  seo.ts utils.ts     SEO helpers; cn() classname helper
public/
  field-notes/        Gallery images in per-country folders + manifest.json
  projects/           Project media (mp4/gif/png/jpg/svg)
scripts/              One-off/legacy generators (see §6.2)
```

## 5. Core architecture concepts

- **Content is centralized.** All editable copy/data lives in the `content/`
  folder (one file per domain, re-exported from `content/index.ts` → import from
  `@/content`) plus `public/field-notes/manifest.json` (gallery). `lib/` is logic
  only. You rarely edit section components to change content — you edit `content/`.
  The contact form's validation messages have a single source in
  `content/contact.ts`, shared by both the client and the server.
- **Home composition:** `app/page.tsx` renders `<Section>` wrappers around each
  section component and assigns each a per-section accent color. `Section`
  provides the heading, the soft accent glow, and the scroll-reveal.
- **Design system:** dark, monochrome-graphite base with a single restrained
  **emerald** accent (`--primary`). Tokens + every custom animation live in
  `app/globals.css`. Per-section accent tints (rose/amber/teal/etc.) are used
  only for the glow band, not for interactive elements.
- **Aesthetic rules (important for edits):** understated, calm, "handcrafted."
  No bright colors, no heavy borders, no large white boxes. Interactive accents
  use the emerald `--primary`. Mono uppercase labels (`font-mono ... tracking`)
  are a recurring motif. Match the surrounding code's density and idiom.

## 6. How to do common tasks

### 6.1 Add or edit a Project

1. Edit the `projects` array in `content/projects.ts`. Each project has: `slug`, `title`,
   `category`, `year`, `role`, `description` (card blurb), `longDescription`
   (modal), `highlights[]`, `media`, `tags[]`, optional `link`.
2. `media` is either a single path string or an **array** for a multi-image
   gallery (first entry is the card preview). Put files in `public/projects/`.
3. **Supported media:** `.png`, `.jpg`, `.svg`, `.gif`, and `.mp4`/`.webm`.
   - `.svg` → shown on a light canvas (architecture diagrams).
   - `.mp4`/`.webm` → rendered as a looping, muted, in-view autoplay `<video>`.
   - `.gif` → served **unoptimized** (Next can't optimize animated images).
4. **Prefer MP4 over GIF** for anything non-trivial: animated GIFs bypass the
   image optimizer and ship at full size. Convert with ffmpeg
   (`-c:v libx264 -pix_fmt yuv420p -movflags +faststart -an`, force even
   dimensions via `scale=trunc(iw/2)*2:trunc(ih/2)*2`). Keep a GIF only if it's
   already tiny and the MP4 would be larger.
   - GIF frame-timing gotcha: browsers clamp very short GIF frame delays (≤~10ms)
     to ~100ms (10fps). If a converted MP4 plays too fast, re-encode with
     `-vf "setpts=10*PTS" -r 10` to match the browser's perceived speed.
5. **Gallery/inspector:** all project media (images and video) can be opened in
   full-screen inspection (`components/image-inspector.tsx`) with zoom/pan. The
   inspector caps at native resolution (never upscales), so if two images in one
   project look mismatched in zoom, give them a **consistent width**.

### 6.2 Add images to Field Notes

Field Notes is an individual-moment photo wall; images live in per-country
folders under `public/field-notes/<country>/` and are described in
`public/field-notes/manifest.json`.

1. Drop the image into the right country folder (create the folder for a new
   country). Keep descriptive filenames (e.g. `USA Utah The Narrows.jpg`).
2. Add an object to `manifest.json`. Schema (all strings unless noted):

   ```jsonc
   {
     "id": "unique-kebab-id",
     "src": "/field-notes/<country>/<Exact File Name.jpg>",
     "alt": "Human readable",
     "location": "Landmark or city",   // reads like the photo's title
     "place": "Country",
     "month": "August",
     "year": "2022",
     "observation": "One unique sentence shown in the viewer.",
     "width": 2560,                     // NUMBER — real oriented pixel dims
     "height": 1440,
     "order": 3,                        // OPTIONAL number: lower = featured earlier
     "scale": 0.9                       // OPTIONAL layout knob (0.6–1)
   }
   ```

   - `width`/`height` **must be the real, EXIF-oriented display dimensions** —
     the gallery's masonry balancing and the lightbox's no-upscale cap depend on
     them. Get them with sharp *after* baking orientation:
     `sharp(file).rotate().toBuffer({resolveWithObject:true})` → `info.width/height`.
     (Do NOT use `sharp(file).metadata()` alone — it returns pre-rotation dims.)
   - Ordering: entries with an `order` field render first (ascending); the rest
     follow in array order. The manifest is kept grouped by country,
     alphabetically. New entries are merged into their country group.
   - Every `observation` should be unique.
3. **Resize before committing** (see §7).
4. `scripts/generate-fieldnotes-manifest.js` (`npm run generate:fieldnotes`) is a
   **legacy generator with stale hardcoded data** — do not run it blindly against
   the current manifest. The manifest is currently maintained directly / with
   small sharp scripts. Review/rewrite the generator before relying on it.

### 6.3 Contact form

- UI: `components/sections/contact-form.tsx` (client). API:
  `app/api/contact/route.ts` (server). Shared validation + email templates:
  `lib/contact.ts`.
- Sends via Resend. Env vars:
  - `RESEND_API_KEY` (**required**, server-only, never commit).
  - `CONTACT_TO_EMAIL` (optional, default `me@nathanriojas.com`).
  - `CONTACT_FROM_EMAIL` (optional, default `Nathan Riojas <contact@nathanriojas.com>`).
  - `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` (optional; enable per-IP
    rate limiting when set — see below).
- The sending domain must be verified in Resend. Reply-To is set to the
  visitor's email so replying in Gmail goes to them.
- Local: put the key in `.env.local` (gitignored). Production: set it in the
  Vercel dashboard.
- **Abuse protection (all server-side, in this order):**
  1. Honeypot hidden `website` field + submit-timing check (`spamCheck` in
     `lib/contact.ts`) — likely bots are dropped **silently** with a fake `200`.
  2. Per-IP rate limit via Upstash Redis (`lib/rate-limit.ts`,
     `@upstash/ratelimit`): 3 requests / 10 min / IP, checked **before** Resend so
     over-limit requests never send email (returns `429`). Fails **open** if the
     Upstash env vars are absent, so local dev and any misconfig never block real
     visitors. Client IP comes from `x-forwarded-for` (first entry) → `x-real-ip`.

## 7. Image handling conventions

- On Vercel, `next/image` resizes + serves AVIF/WebP per request and edge-caches
  it, so **source format barely matters for delivery** — but source *pixel size*
  and *file size* drive transform cost, cache-warm time, repo size, and (for
  GIFs, which bypass the optimizer) actual bytes shipped.
- **Convention: resize photos to a 2560px max edge, quality ~85 JPEG**, before
  committing. This was applied across `public/field-notes`. Use sharp:
  `sharp(input).rotate().resize(2560,2560,{fit:"inside",withoutEnlargement:true}).keepIccProfile().jpeg({quality:85,mozjpeg:true})`.
  `.rotate()` bakes EXIF orientation (so no orientation flag remains);
  `keepIccProfile()` preserves color without re-introducing the orientation flag.
- After resizing Field Notes images, **update `width`/`height` in the manifest**
  to the new dimensions (aspect ratios are unchanged, so layout is unaffected).
- **Back up originals outside the repo** before any destructive resize pass
  (previous backups were placed in `~/…-backup-<date>/` in the WSL home dir).

## 8. Security / secrets (see also the deeper review Nathan has on file)

- No database, no auth, no stored user data → minimal attack surface.
- Secrets: `RESEND_API_KEY` and the two `UPSTASH_REDIS_REST_*` values. `.env*` is
  gitignored; **never commit real keys**. All are server-only (read in route
  handlers / server modules) and never reach the client bundle.
- Contact input is validated + sanitized server-side in `lib/contact.ts`
  (control-char stripping, CR/LF removal to prevent email-header injection,
  HTML-escaping in the email body, length caps, empty-submission rejection).
- **Contact abuse protection is in place:** honeypot + submit-timing (silent
  drop) and per-IP Upstash rate limiting (3 / 10 min, before Resend). See §6.3.
  Remaining optional hardening: an Origin check and a Resend sending cap.

## 9. Gotchas / conventions

- Content changes = edit a file in `content/` or the manifest, not the components.
- Match the existing understated aesthetic; don't introduce bright colors or
  heavy UI chrome.
- The repo has both npm and pnpm lockfiles — keep them consistent.
- Dev environment here runs Node via nvm inside WSL; sharp/ffmpeg are available
  for image/video work.
- SEO is wired up (`app/sitemap.ts`, `robots.ts`, `opengraph-image.tsx`,
  `lib/seo.ts`, `components/json-ld.tsx`) — update these if routes/content change.
