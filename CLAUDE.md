# CLAUDE.md

Guidance for Claude (and humans) working in this repo. Read this before making changes.

## What this is

Marketing website for **UnityDev Digital**, an IT services company offering AI & ML, cloud & DevOps,
custom software and dedicated development teams. Single landing page with anchored sections plus a
contact API. Deployed on Vercel.

## Stack

| Concern    | Choice                                                                   |
| ---------- | ------------------------------------------------------------------------ |
| Framework  | Next.js 16 (App Router, Turbopack), React 19                             |
| Language   | TypeScript 5.9 (strict)                                                  |
| Styling    | Tailwind CSS 4, CSS-first config in `src/app/globals.css` (no JS config) |
| Animation  | `motion` 13 (formerly framer-motion), imported from `motion/react`       |
| Theming    | `next-themes` (class strategy, system default)                           |
| UI helpers | Headless UI (dialog), Heroicons, react-hook-form                         |
| Tooling    | ESLint 9 flat config (`eslint-config-next`), Prettier + Tailwind plugin  |

Version notes: TypeScript 7 (native/Go) and ESLint 10 are out, but we stay on TS 5.9 and ESLint 9
until `next build` type-checking and `eslint-config-next` officially support them. Next.js 16
requires Node >= 20.9.

## Commands

```bash
npm run dev          # local dev server on http://localhost:3000
npm run build        # production build (also type-checks)
npm run start        # serve the production build
npm run check        # typecheck + lint + format check. Run before every commit.
npm run format       # auto-format with Prettier (also sorts Tailwind classes)
```

npm is the primary package manager. `yarn.lock` is also committed; if you change dependencies, run
both `npm install` and `yarn install` so the two lockfiles stay in sync.

**Definition of done for any change:** `npm run check` and `npm run build` both pass, and the change
has been viewed in a browser in **light and dark mode** at **mobile (390px) and desktop (1440px)**
widths with no console errors and no horizontal scroll.

## Project structure

```
src/
  app/
    layout.tsx            Root layout: fonts, metadata, JSON-LD, providers, nav/footer
    page.tsx              Home page: composes sections in order
    globals.css           Tailwind import, design tokens, keyframes, base styles
    api/contact/route.ts  Contact form endpoint (validation, honeypot, rate limit, Resend)
    opengraph-image.tsx   Generated OG image
    robots.ts, sitemap.ts, manifest.ts, icon.svg, not-found.tsx
  components/
    layout/    Navbar, Footer, ThemeToggle
    sections/  One file per page section (Hero, Services, Engagement, Process, WhyUs, Faq, Contact…)
    motion/    Reusable animation primitives (see below)
    ui/        Small presentational pieces (Button, Container, SectionHeading, Logo)
  config/site.ts   Site name, URL, email, nav items, social links
  content/home.ts  ALL page copy and data (services, FAQs, process steps, commitments…)
  lib/             Helpers: cn(), contact validation, useActiveSection hook
```

## Conventions

### Content

- **Copy lives in `src/content/home.ts`**, not inline in components. Edit text there.
- **Never invent facts.** No fake client logos, testimonials, case studies, awards or statistics.
  Figures in `commitments` are promises the business makes; confirm with the owner before changing
  them. Add real testimonials or case studies only when the user supplies them.
- Tech names in the marquee are text only; don't add third-party logos without permission.

### Styling

- Use the **semantic colour tokens** (`bg-background`, `bg-surface`, `bg-surface-2`, `text-foreground`,
  `text-muted`, `border-border`, `text-brand`, `text-accent`, `ring-ring`). Never hard-code hex values
  in components. Tokens are defined for both themes at the top of `globals.css`.
- Fonts: `font-display` (Outfit) for headings, `font-sans` (Inter) for body, `font-mono`
  (JetBrains Mono) for small labels.
- Use `cn()` from `@/lib/cn` to combine conditional classes.
- Watch for conflicting display utilities: a component whose base classes include `inline-flex` can't
  be hidden with `hidden sm:inline-flex` via `className`; wrap it in an element instead.
- Layout width: always wrap section content in `<Container>` (max-w-7xl with responsive padding).
- Utility helpers in `globals.css`: `.text-gradient`, `.bg-grid`, `.mask-radial`, `.mask-fade-edges`.

### Animation (important)

- The app is wrapped in `LazyMotion strict`, so **always use `m.div`, `m.span`…, never `motion.div`**.
  Using `motion.*` throws at runtime.
- Import from `"motion/react"`. Any component using motion must be a client component (`"use client"`).
- Reach for the primitives before writing custom animation:
  - `Reveal`: fade/blur/slide in on first scroll into view (`direction`, `delay`, `as`)
  - `Stagger` + `StaggerItem`: children animate in sequence
  - `Spotlight`: card with a pointer-following glow (writes CSS vars, no re-renders)
  - `Counter`: counts up when visible (server-renders the final value for SEO)
  - `Marquee`: CSS-only infinite scroller (server component)
  - `Magnetic`: subtle pointer attraction for CTAs (mouse only)
  - `ScrollProgress`: top-of-page progress bar
- Shared easing: `easeOut` exported from `motion/Reveal.tsx`. Keep durations 0.3–0.8s.
- Prefer CSS keyframes (`animate-*` tokens in `globals.css`) for continuous/looping motion; prefer
  `motion` for entrance, scroll-linked and interactive motion.
- Animate only `transform`, `opacity` and `filter`; don't animate layout properties in loops.
- **Respect reduced motion.** `MotionConfig reducedMotion="user"` handles motion components; the
  `prefers-reduced-motion` block in `globals.css` stops CSS animations. Anything driven by JS timers
  (e.g. the hero's rotating word) must check `matchMedia("(prefers-reduced-motion: reduce)")`.
- Decorative animated elements get `aria-hidden`. Changing text (like the rotating word) must have a
  stable screen-reader alternative.

### Components and data flow

- Default to server components; add `"use client"` only when a component needs state, effects,
  browser APIs or motion.
- Content objects contain icon **components** (functions), which can't be passed as props from a
  server component to a client component. Client sections import content directly from
  `@/content/home` instead of receiving it as props.
- Section anchors: every section has an `id` that matches `navItems` in `config/site.ts` (the navbar
  highlights the active one), plus `aria-labelledby` pointing at its heading.

### Accessibility

- One `<h1>` (in the hero). Each section heading is an `<h2>`, and cards use `<h3>`.
- Interactive elements must be keyboard reachable with a visible focus ring (global `:focus-visible`
  style). Icon-only buttons need `aria-label`.
- Keep a skip link and `<main id="main">` in the layout.

### SEO

- Metadata lives in `layout.tsx` and derives from `siteConfig`. Keep `title`, `description`,
  OpenGraph and Twitter in sync when changing positioning.
- JSON-LD: `Organization` in the layout, `FAQPage` in `page.tsx` (generated from `faqs`).
- If you add routes, add them to `app/sitemap.ts`.

## Contact form

Flow: `components/sections/Contact.tsx` → `POST /api/contact` → `validateContact()` in
`lib/contact.ts` (shared rules) → email via the Resend REST API.

Environment variables (see `.env.example`):

| Variable               | Purpose                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and OG                     |
| `RESEND_API_KEY`       | Enables email delivery. Without it: dev logs, prod returns 503 |
| `CONTACT_TO_EMAIL`     | Inbox that receives enquiries                                  |
| `CONTACT_FROM_EMAIL`   | Sender; must be on a domain verified in Resend                 |

Safeguards: server-side validation and length limits, a hidden honeypot field (`website`), HTML
escaping in the email body, a 10s upstream timeout, and a best-effort per-IP rate limit (in-memory,
so per serverless instance; use Vercel Firewall or a shared store for real abuse protection).
Never log full submissions in production.

## Security

`next.config.ts` sets `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
`Permissions-Policy` and HSTS, and disables `X-Powered-By`. A Content-Security-Policy isn't set yet
because inline JSON-LD and next-themes' inline script need nonces or hashes. Add one via `proxy.ts`
(Next 16's replacement for `middleware.ts`) if required.

## Deployment (Vercel)

1. Import the repo in Vercel; the framework preset is detected automatically (no `vercel.json` needed).
2. Set the environment variables above for Production (and Preview if desired).
3. Verify the sending domain in Resend and point the domain's DNS at Vercel.

## Adding a new section

1. Put its copy in `src/content/home.ts`.
2. Create `src/components/sections/MySection.tsx` using `<section id="…" aria-labelledby="…">`,
   `<Container>`, `<SectionHeading>` and the motion primitives.
3. Add it to `src/app/page.tsx` in order, and to `navItems` if it should appear in the nav.
4. Run the definition-of-done checks above.
