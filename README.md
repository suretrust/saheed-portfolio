# Saheed Oladele — Portfolio

Personal portfolio for Saheed Oladele, senior software engineer, writer, and
lecturer. Live at [saheedoladele.com](https://saheedoladele.com).

## Stack

- **[Next.js 15](https://nextjs.org)** with the App Router, statically
  exported where possible
- **TypeScript**, strict mode
- **CSS** with custom properties and design tokens (no framework, no Tailwind)
- **next/font** for self-hosted Newsreader, Inter, and JetBrains Mono
- **next/og** for per-piece Open Graph images
- **Sharp** for icon generation

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

The dev server hot-reloads on every file change. Theme persists across reloads
via `localStorage`. The IntersectionObserver-driven scroll reveals respect
`prefers-reduced-motion`.

### Scripts

```bash
npm run dev        # Dev server with HMR
npm run build      # Production build (also runs in CI)
npm run start      # Serve the production build locally
npm run lint       # ESLint over the codebase
npm run typecheck  # tsc --noEmit
```

CI runs `lint`, `typecheck`, and `build` on every push and PR to `main`.

## Project structure

```
app/
  layout.tsx              Root layout — Metadata API, theme bootstrap, fonts
  page.tsx                Home
  about/                  About page
  writing/                Writing list + dynamic article pages + RSS feed
  projects/               Projects list + dynamic project pages
  contact/                Contact
  sitemap.ts              Generates /sitemap.xml
  robots.ts               Generates /robots.txt with explicit allows for
                          GPTBot, ClaudeBot, Perplexity, Google-Extended, etc.
  manifest.ts             Generates /manifest.webmanifest
  llms.txt/route.ts       Short llms.txt index for agent consumption
  llms-full.txt/route.ts  Longer agent-readable mirror of site content
  not-found.tsx           Branded 404
components/
  Nav.tsx                 Sticky header with theme toggle and burger menu
  Footer.tsx              Footer with social links
  RevealObserver.tsx      Global scroll-reveal coordinator
  Icon.tsx / Logo         Inline SVG icons and the SO monogram
  ThemeToggle.tsx         Light/dark switch
  ArticleRow.tsx          Compact article row
  ProjectCard.tsx         Project tile with cover image
  seo/                    JSON-LD schema components
lib/
  content.ts              Single source of truth for profile, stack,
                          articles, projects, currently, navigation
  seo.ts                  SITE_URL, SITE config, expertise tags
  og.ts                   OG image fonts + colours
public/
  fonts/                  Bundled woff for next/og rendering
  projects/               Per-project screenshots used in the cards/details
  og-default.png          Static OG fallback (home, about, contact)
  og-writing.png          Static OG fallback (writing list)
  icon.svg                SVG favicon with media-query dark mode
  icon-*.png              PNG icon set + apple-touch + maskable
```

## Updating content

All content lives in [`lib/content.ts`](./lib/content.ts). Adding an article,
listing a new project, or rotating the "Currently" focus is a single edit —
the writing list, project grid, sitemap, RSS feed, JSON-LD, llms.txt, and per-
piece OG images all update automatically.

### Adding an article

Push a new entry to the `ARTICLES` array. External URLs (`url`) become the
canonical for syndicated pieces so the publisher's own page keeps the SEO
weight.

### Adding a project

Push to the `PROJECTS` array. Drop screenshots under
`public/projects/<slug>/`, then reference them as `cover` and `gallery` items.
The project card's thumbnail, the detail page's hero, and the social preview
image all wire up from the same paths.

### Site configuration

[`lib/seo.ts`](./lib/seo.ts) holds the production URL, expertise list, and
default OG image. The single env var that controls absolute URLs site-wide is
`NEXT_PUBLIC_SITE_URL` — set it in your hosting provider for production.

## Accessibility

- WCAG 2.2 AA throughout: landmarks, single `<h1>` per page, programmatic
  focus via a skip link, `aria-current` on nav, `role="switch"` on the theme
  toggle, `aria-expanded`/`aria-controls` on the mobile menu burger,
  composed accessible names on cards and rows, list semantics for tag groups
- `prefers-reduced-motion` enforced site-wide via a global rule plus
  per-animation guards
- Forced-colors mode supported with system colour tokens
- Focus-visible ring system tuned per element category

## SEO and AEO

- Full Metadata API on every route: title template, description, canonical,
  Open Graph, Twitter card, robots directives, icons, manifest
- JSON-LD: `Person`, `WebSite`, `ProfilePage`, `BreadcrumbList`, `Article`,
  `CreativeWork`, `Course` (for the lecturing portal), `SoftwareApplication`
  (for the marketplace), `ContactPage`, `CollectionPage`
- Per-piece dynamic Open Graph images via
  `app/{projects,writing}/[slug]/opengraph-image.tsx`
- RSS feed at `/writing/feed.xml`
- `/llms.txt` and `/llms-full.txt` per the [llmstxt.org](https://llmstxt.org)
  spec, with the canonical content mirrored as scannable markdown for agents
- `robots.txt` explicitly allows the major AI crawlers in addition to the
  general `*`

## Deployment

Push to `main` runs CI. The repo is configured for one-click deploy on either
Vercel or Netlify — both auto-detect the Next.js project and serve the
dynamic OG image routes correctly.

The only env var that matters: `NEXT_PUBLIC_SITE_URL`. Defaults to
`https://saheedoladele.com` if unset.

## License

All rights reserved. The code is published for reference; the content
(articles, project descriptions, biographical material) is not licensed for
reuse.
