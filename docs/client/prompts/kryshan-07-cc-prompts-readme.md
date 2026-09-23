# Kryshan Randel — Claude Code prompts: how to run them

Vitrine · batch 7 · 2026-09-22 · for the `kryshan-site` copy of `client-boilerplate` (CB-0 and CB-1 done).

Three prompts, one per kit/layout pair. **Run them in order, A → B → C, one Claude Code thread each,** because A creates the shared pieces (project data, posters, the `Projects` types) and B and C extend them. Each prompt opens its own ticket in `docs/specs/`, states file paths before writing code, ends with `yarn verify` and a browser walk, and commits to the working branch, as CONVENTIONS requires.

## What each prompt produces

| Prompt | Kit file | Layout page | Mock home | Routes |
|---|---|---|---|---|
| A | `review/kits/kryshan-a.ts` | `review/layouts/kryshan-a.md` | `review/mocks/home-a.tsx` (+ `_components/`) | `/review/kits/kryshan-a` · `/review/layouts/kryshan-a` · `/review/mocks/home-a` |
| B | `review/kits/kryshan-b.ts` | `review/layouts/kryshan-b.md` | `review/mocks/home-b.tsx` | `…/kryshan-b` · `…/home-b` |
| C | `review/kits/kryshan-c.ts` | `review/layouts/kryshan-c.md` | `review/mocks/home-c.tsx` | `…/kryshan-c` · `…/home-c` |

Shared, created by A: `content/projects.ts` (typed, 27 pieces + rights flags), `public/media/posters/<slug>.jpg` (from his screenshots), `content/site.ts` additions (name, roles line, email, socials), and the review index wiring for the three trios.

## Attachments to give every thread
- `kryshan-05-tokens.json` — every hex, ramp and font per kit. The only source of colour values.
- `kryshan-05-brand-kits.pdf` — the visual reference for what each kit should feel like.
- `kryshan-03-copy-and-voice.md` — the copy bank; §8 is what the mocks say.
- `kryshan-02-success-criteria.md` — §3.5 is the project inventory; §10 the rights notes.
- `kryshan-project-images.zip` — the 27 poster screenshots (A only needs it; harmless elsewhere).
Plus, per thread, that layout's `kryshan-06-layout-{A,B,C}.md`.

## Things the prompts assume about the boilerplate (from your summary)
- `BrandKit` = all shadcn colour roles, three font slots, radius, ground light/dark; fonts via `next/font` inside the kit file; review kits apply through `KitScope`.
- Registries in `review/kits/`, `review/layouts/` (markdown), `review/mocks/` (server components) with a `placeholder` flag.
- `components/media/` has a frame and a poster-first `video-embed` that mounts the iframe on tap; `lib/media/` builds nocookie/dnt embed URLs.
- Click-to-comment anchors on `data-review-id`.
- Tailwind v4 tokens as `text-(--x)`; no hex outside `brand/` and `review/kits/`.
Where the real type or registry differs, the prompts tell Claude Code to conform to the repo, not to the prompt, and to log the divergence in DEVIATIONS.md.

## Not in the repo
The PDF stays out of `public/` (it isn't behind the gate). Kryshan gets it from you directly.
