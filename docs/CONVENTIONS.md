# Conventions

The contract for this repo and every client repo duplicated from it. It is the Conscious Connections and taylor-aucoin house style, reduced to what a single static site needs. When this file and the code disagree, fix one of them the same day.

## 0. The ten rules

1. **Placement is decided by one question: who imports this?** One route → co-locate under that route in `_components/`, `_actions/`, `_lib/`. Two or more routes → `components/`. Anything framework-free that two places need → `lib/`.
2. **The layers are strictly ordered and lint-enforced.** `lib/` → `brand/` → `content/` → `components/` → `review/` → `app/`. Nothing imports upward. `yarn lint` fails on an upward import (`eslint.config.mjs`).
3. **Server Components are the unmarked default.** Client components carry `"use client"` on line 1 and live in a `_components/` folder or `components/`. Interactivity is pushed to the leaves.
4. **All filenames are kebab-case.** Identifiers keep their own casing. Hooks start with `use-`. No `helpers.ts`, `misc.ts`, or `utils.ts`; `lib/cn.ts` is the one shadcn exception and does one thing.
5. **Named exports only**, except where Next requires a default (`page`, `layout`, `route`, `proxy`, config files).
6. **Every path is built in `lib/routes.ts`.** No route string inline. Every env variable is read in `lib/env.ts`. Nothing else touches `process.env`.
7. **Colour and type are tokens.** No hex outside `brand/` and `review/kits/`. Tailwind v4 variable syntax is `text-(--token)`; the v3 form `-[--token]` is a silent no-op and is banned.
8. **Real content in every frame a client sees.** No lorem, no stock, no reference stills. Structural copy in the boilerplate is labelled as such and replaced before first look.
9. **Static stays static.** The public site never reads cookies, headers, or a backend at request time. Only `/review` is dynamic, and it is deleted before launch.
10. **When unsure, match the nearest existing pattern or stop and ask.** Never invent a location, a token, or a fact.

## 1. Stack

|                 |                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------- |
| Framework       | Next.js 16, App Router, `proxy.ts`, Turbopack, `typedRoutes`                                  |
| Language        | TypeScript strict, `noUncheckedIndexedAccess`                                                 |
| Styling         | Tailwind v4, CSS-first (`app/globals.css`), no `tailwind.config`                              |
| Components      | shadcn (Base UI, `base-nova` preset) vendored into `components/primitives/`                   |
| Env             | `@t3-oss/env-nextjs` + zod in `lib/env.ts`                                                    |
| Package manager | Yarn 4.13 with `nodeLinker: node-modules`. Never npm.                                         |
| Node            | 22 (`.nvmrc`)                                                                                 |
| Deploy          | Vercel, one project per client, in the client's account                                       |
| Database        | None. Content is typed TS in `content/`.                                                      |
| Tests           | None during build slices, on purpose. Verification is lint, types, build, and a browser pass. |

## 2. What goes where

```
app/                 Composition only: routes, layouts, metadata.
  (site)/            The public site. Each page renders its chrome through `SiteShell`.
  review/            The client review round (docs/REVIEW-LAYER.md). Deleted before launch.
  **/_components/    Client leaves for one route.
  **/_actions/       Server actions for one route: validate, call, return a result.
brand/               Kits as data, the compile step, the production slot.
components/          Shared across routes.
  primitives/        shadcn-generated. Never hand-edited; regenerated with `npx shadcn@latest add`.
  composed/          Ours, built from primitives: site/ (chrome) · media/ (frames, video) · brand/ (KitScope).
content/             Page copy as typed TS. The client edits this.
lib/                 Pure helpers: env, routes, config, metadata, colour, media, validators, review client.
review/              The review round's registries: kits/, layouts/ (markdown), mocks/ (server components).
public/              Static assets: posters, fonts (if local), favicons.
docs/                This folder. specs/ holds the tickets and the three records.
scripts/             Node scripts. check-doc-links.mjs today.
proxy.ts             The review gate. The only authorization decision in the repo.
```

## 3. Import matrix

| From ↓ may import → | lib | brand | content | components | review | app |
| ------------------- | --- | ----- | ------- | ---------- | ------ | --- |
| lib                 | yes |       |         |            |        |     |
| brand               | yes | yes   |         |            |        |     |
| content             | yes | yes   | yes     |            |        |     |
| components          | yes | yes   | yes     | yes        |        |     |
| review              | yes | yes   | yes     | yes        | yes    |     |
| app                 | yes | yes   | yes     | yes        | yes    | yes |

`components/primitives/**` is exempt from the rule because shadcn writes it.

## 4. Server, client, actions

- A page is a thin server shell: read content or the registry, build metadata, render. No fetching in pages on the public site (there is nothing to fetch).
- A server action takes `unknown`, parses it with a zod schema from `lib/validators/`, calls one function, and returns a **result union** (`{ ok: true, data } | { ok: false, reason }`). It never throws to the UI: a thrown error crosses the action boundary as an opaque digest.
- Client components own state and events, nothing else. If a client component computes something two places need, that computation moves to `lib/`.
- `server-only` is imported at the top of any module that must never reach a browser bundle (`lib/review/access.ts`, `lib/review/backend.ts`).

## 5. Naming

- Files and folders: kebab-case. `video-embed.tsx` exports `VideoEmbed`.
- Constants: `SCREAMING_SNAKE_CASE` or an `as const` object.
- Types with `type`, not `interface`. Props often `Readonly<{ … }>`.
- Functions are verbs: `createPageMetadata`, `resolveTarget`, `issueSession`. A name that needs a comment should be renamed.
- `data-review-id="…"` on any element a reviewer should be able to pin a comment to (headers, sections, grids). Stable, kebab-case, unique per page.

## 6. Components: primitives and composed

Two tiers, as in Conscious Connections' `@cc/ui`:

- **`components/primitives/`** is what shadcn writes: one file per primitive, vendored, never hand-edited. Add one with `npx shadcn@latest add <name>`; refresh one with `--overwrite`. They know nothing about the site, the kit, or the content.
- **`components/composed/`** is ours: components built from primitives (or plain elements) that carry a decision about this kind of site: the chrome, the poster-first player, the native-ratio frame, the kit scope. Grouped by concern (`site/`, `media/`, `brand/`, and whatever a client build adds, e.g. `work/`).

Rules for a composed component:

1. It lives here only when two or more routes use it; a component used by one route lives in that route's `_components/`.
2. It accepts `className` and merges it last with `cn()`. A multi-part component may also accept a `classes` object keyed by sub-part (`classes?.root`, `classes?.title`), merged the same way, so a page can adjust layout without forking the component. Variants are typed props, never class overrides.
3. Server component unless it owns state or events; then `"use client"` on line 1 and as small as it can be.
4. Colours and type through tokens only; the kit decides what they resolve to.
5. A top-of-file doc comment saying what decision it carries and why. If there is no decision, it is not composed; it is a primitive or a one-off.

## 7. className

- `cn()` from `lib/cn.ts` when a class string has four or more utilities, breakpoints, states, or conditionals. Short overrides inline.
- Order inside `cn()`: base → responsive → states → motion/a11y → conditionals.
- Prefer `flex`/`grid` + `gap` over `space-y`.
- Design tokens through the shadcn names (`bg-background`, `text-muted-foreground`, `font-heading`). Never a raw colour utility like `bg-neutral-900` on the public site.

## 8. Site-wide invariants (every client site)

- The email is on every page (the footer) and one tap from anywhere.
- Video is poster-first: no iframe, player script or third-party request before a tap (`components/composed/media/video-embed.tsx`).
- Media at native ratio (`components/composed/media/frame.tsx`). Nothing cropped to fit a grid.
- Every hover has a touch equivalent. Reduced motion is designed (`globals.css` collapses transitions; components use `motion-safe:`).
- WCAG 2.2 AA at real sizes; the kit page prints the ratios.
- Metadata through `lib/metadata.ts`; every page has a title, description and canonical.
- Nothing false: no invented credits, no uncleared logos, no NDA'd work, no testimonials without consent.

## 9. Copy

Boilerplate strings are structural and say so (`content/home.ts`, `lib/config.ts`). They are replaced with the client's words before a first look. Never "improve" a client's copy unprompted.

## 10. Records and closure

The spec system in `docs/specs/` is the taylor-aucoin adaptation of Conscious Connections' (see `docs/specs/README.md`). Done means: acceptance criteria met · `yarn verify` passes · the ticket's `Status:` flipped · `PROGRESS.md` ticked · one `DEVIATIONS.md` line per divergence · architectural choices with real alternatives in `TECHNICAL-DECISIONS.md`.

Pre-accept checklist (also in the PR template): location · naming · imports · server/client · tokens · performance · records.

## 10a. The client edits this repo

After launch the client maintains the site themselves through a Claude Code guide written for their repo (`docs/EDITING.md`, produced at handover). That guide can only stay true if the seams stay where it says they are: page copy in `content/`, media in `public/media/`, the kit in `brand/production.ts`, one route per page under `app/(site)/`. Agents building a client site keep every editable fact in `content/` and never scatter copy into components; a string a client might want to change belongs in a content file with a comment saying what it is.

## 11. Commands

| Task                                     | Command                        |
| ---------------------------------------- | ------------------------------ |
| Dev (a human, port 3000)                 | `yarn dev`                     |
| Dev (an agent, port 4500, own build dir) | `yarn dev:agent`               |
| Build (an agent, own build dir)          | `yarn build:agent`             |
| Lint, types, build                       | `yarn verify`                  |
| Format                                   | `yarn format`                  |
| Doc links                                | `yarn docs:check-links`        |
| Add a shadcn component                   | `npx shadcn@latest add <name>` |

Agents never run `yarn dev` or `yarn build`: they share `.next` with a human's running server and clear its manifests mid-request. The `:agent` scripts set `NEXT_DIST_DIR` and a port far from the 3000 block. Each client repo picks its own agent port pair (`4500`/`4510` here) so two client sites can run at once.
