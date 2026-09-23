# Performance

Speed is a design material. A client's visitor meets the site on a mid-range phone with two bars, and the first impression is formed before anything is read. These are the rules that keep that impression fast, and the checks that prove it.

## 1. Targets

| Metric                        | Target (mobile, throttled)                                                 |
| ----------------------------- | -------------------------------------------------------------------------- |
| Lighthouse performance        | ≥ 95                                                                       |
| Largest Contentful Paint      | ≤ 2.0 s; the LCP element is server-rendered text or the first poster       |
| Cumulative Layout Shift       | 0 (every media box reserves its ratio)                                     |
| First-screen transfer         | < 200 KB before the first frame is visible                                 |
| JavaScript on the public site | shadcn primitives actually used + `VideoEmbed`. No global client provider. |

## 2. Static by default

- Every public route renders at build time. No `cookies()`, `headers()`, `searchParams` reads, or fetches at request time on the public site. If a page needs any of those, the design is wrong; ask.
- `export const dynamic = "force-dynamic"` appears in exactly one tree: `app/review/`. It is deleted before launch.
- The root layout applies the brand kit as inline custom properties on `<html>` and nothing else. No theme provider, no client context at the root.

## 3. Server and client

- Pages, layouts, chrome, content sections: server components.
- Client components are leaves: a video player, a menu, a form. They receive data as props; they do not fetch.
- `"use client"` on line 1 marks the boundary; keep it as low in the tree as it can go.

## 4. Images

- `next/image` everywhere. Always pass `width` and `height` (or `fill` inside a `Frame`) and a real `sizes`. `w-auto` on a `next/image` is a known trap: the browser picks the largest srcset candidate and lays the image out at a fraction of its size.
- Formats: AVIF then WebP (`next.config.ts`). Posters are JPEG or WebP sources at 1600 px wide at most, chosen frames, never auto-generated.
- Posters and stills live in `public/` unless a client's images genuinely live elsewhere; add that one host to `remotePatterns` and nothing more. An optimizer pointed at arbitrary hosts is an open image proxy.
- The first poster on a page gets `priority`; everything below the first screen is lazy (the default).

## 5. Video

- Never hosted in the repo. YouTube (`youtube-nocookie.com`) or Vimeo (`dnt=1`), through `lib/media/embed-url.ts`.
- Poster-first: `components/composed/media/video-embed.tsx` renders an image and a button. The iframe mounts on tap, with autoplay, because the tap is the gesture. No player exists on the page before intent.
- Never autoplay with sound on load. Never a looping background video.

## 6. Fonts

- `next/font/google` or `next/font/local`, `display: "swap"`, subset `latin`, only the weights the kit uses. Variable fonts where the family has one.
- The loader lives with the kit that uses it (`brand/production.ts` supplies `fontClassName`); the root layout never names a face. See `docs/BRANDING.md` §3.
- Three slots per kit: display, body, mono. A fourth face needs a reason on the kit page.

## 7. Motion

- Ambient motion is CSS. Orchestration, if a client's design calls for it, is JS in a leaf component.
- Motion shows cause and effect: expansions grow from where they were tapped, overlays arrive and leave the same way. Nothing loops for attention. One deliberate moment per site.
- `prefers-reduced-motion` is designed: `globals.css` collapses transitions; components use `motion-safe:` for anything that moves.

## 8. Third parties

- None on the public site by default. Analytics, if a client asks for it, is consent-gated and loaded through `@next/third-parties` after interaction; it never runs on `/review`.
- No font CDN links, no icon fonts, no embeds beyond the two video hosts.

## 9. The checks

Before a first look and before launch:

1. `yarn verify` (lint, types, build).
2. `yarn build:agent && yarn start:agent`, then Lighthouse on `/` in mobile mode. Record the four numbers in the ticket.
3. Network tab on a cold load of `/`: no request to a video host, no font request beyond the kit's own, first-screen transfer under 200 KB.
4. Keyboard walk: skip link, every interactive element reachable, focus visible, video plays from the keyboard.
5. `prefers-reduced-motion: reduce` in devtools: nothing moves, nothing breaks.
