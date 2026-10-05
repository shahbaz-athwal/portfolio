# AGENTS.md

Personal portfolio and MDX blog for Shahbaz Singh — https://shbz-me.vercel.app (Vercel project `shbz.me`).
Static Astro site. Optimise for: tiny pages, zero unnecessary JS, subtle motion.

## Commands (Bun only — never npm/pnpm/yarn)

| Task | Command |
| --- | --- |
| Install | `bun install` |
| Dev server | `bun run dev` (http://localhost:4321) |
| **Verify a change** | `bun run check` — types (`astro check`) + lint/format (Biome) + full build |
| Auto-fix lint/format | `bun run format` |
| Preview build | `bun run build && bun run preview` |

Always run `bun run check` before finishing. It must pass with zero errors.

## Stack

- **Astro 7**, `output: "static"`, `build.format: "file"` (deployed on Vercel with `cleanUrls`).
- **Tailwind v4** via `@tailwindcss/vite`; config lives in `src/styles/global.css` (`@theme`). No `tailwind.config`.
- **MDX** via `@astrojs/mdx` + content collections; Shiki dual themes for code.
- **Takumi** (`@takumi-rs/core`) renders OG images at build time.
- **Biome** for lint + format. **TypeScript** strictest.

## Layout

```
src/
  data/site.ts            ← ALL site content: profile, nav, socials, projects, experience, stack
  content/blog/*.mdx      ← blog posts (schema in src/content.config.ts)
  content.config.ts       ← blog collection schema (zod)
  layouts/Base.astro      ← <head>, SEO/OG meta, theme script, nav, footer
  pages/                  ← file-based routes
    og/[...slug].png.ts   ← build-time OG images; one entry per page
  components/             ← .astro components (Nav, Icon, ProjectCard, LiveActivity, …)
  lib/                    ← helpers (posts.ts, og.ts)
  styles/global.css       ← Tailwind entry, theme tokens, motion primitives
  assets/                 ← images (optimised by astro:assets) and fonts
public/                   ← copied verbatim (favicon only)
```

## Conventions

- **Content changes go in `src/data/site.ts`**, not in page markup.
- **No UI frameworks** (React/Preact/Svelte/Vue). Interactivity = a `<script>` in the
  `.astro` component (bundled, TS). Keep client JS minimal and justified.
- **No new runtime dependencies** without a clear reason. Prefer platform APIs.
- Imports use the `@/` alias for `src/`.
- Images: put files in `src/assets/images/`, import them, render with `<Image>` from
  `astro:assets`. Never reference unoptimised images from `public/`.
- Icons: add inline SVG bodies to `src/components/Icon.astro` (24×24, from Iconify). No icon packages.
- Dark mode is the default and is class-based (`.dark` on `<html>`); always style both
  (`text-stone-900 dark:text-stone-100`). Palette: `stone`.
- Never render untrusted/external strings with `set:html` or `innerHTML`; use `textContent`.

## Motion

Subtle and CSS-only. Respect `prefers-reduced-motion` (handled globally).

- Entrance: add `data-reveal` and a stagger index `style="--i: N"` to an element.
- Page transitions: native cross-document View Transitions (`@view-transition` in CSS) — no router JS.
- Shared-element morph: give an element a `view-transition-name` (see the nav indicator).
- Easing token: `ease-out-soft`. Keep durations 150–600ms, distances ≤ 8px.

## Blog posts

Create `src/content/blog/<slug>.mdx`:

```mdx
---
title: Post title
description: One-sentence summary (used for meta + OG image).
date: 2026-01-31
published: true   # false = draft, visible in dev only
---
```

The slug is the filename. OG image, RSS entry, and sitemap entry are generated automatically.

## Adding a page

1. Create `src/pages/<name>.astro` using `<Base title="…" description="…" og="<name>">`.
2. Add an entry for `<name>` in `src/pages/og/[...slug].png.ts`.
3. Add it to `nav` in `src/data/site.ts` if it should appear in the header.

## Deployment

Vercel project `shbz.me` (Git-connected). Pushes to `master` deploy to production at
https://shbz-me.vercel.app; every other branch/PR gets a preview deployment (behind Vercel login).
The canonical URL is set in two places: `site` in `astro.config.ts` and `site.url` in `src/data/site.ts`.

## Live activity

`src/components/LiveActivity.astro` subscribes to Lanyard over WebSocket
(`wss://api.lanyard.rest/socket`) for Discord user `site.discordId`, showing Spotify
playback and editor activity. Rendered on the home page only.
