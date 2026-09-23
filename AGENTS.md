# client-boilerplate — Agent instructions

**This file is the canonical instruction spine for every agent.** `CLAUDE.md` is a one-line `@AGENTS.md` pointer; shared guidance is edited only here.

## Start here (turn one)

1. **What this is:** the boilerplate for coded client websites (five pages, static, Next.js 16, shadcn, no database), plus a gated design-review round (`/review`) the client uses once before the real build. Each client site is a copy of this repo (`docs/NEW-CLIENT.md`).
2. **Read before coding, in order:** [`docs/CONVENTIONS.md`](docs/CONVENTIONS.md) → [`docs/PERFORMANCE.md`](docs/PERFORMANCE.md) → [`docs/BRANDING.md`](docs/BRANDING.md) → your ticket in [`docs/specs/`](docs/specs/README.md). For anything under `/review`, also [`docs/REVIEW-LAYER.md`](docs/REVIEW-LAYER.md).
3. **Verify work:** `yarn verify` (lint with zero warnings, types, build in the agent's own build dir). There is no test suite; do not write tests during slices.
4. **Done means:** acceptance criteria met · `yarn verify` passes · browser walk on touched routes · the ticket's `Status:` flipped · `PROGRESS.md` ticked · one `DEVIATIONS.md` line per divergence.
5. **Never re-litigate** a `TECHNICAL-DECISIONS.md` entry without new evidence. On-disk reality + `DEVIATIONS.md` beat any stale spec string.

## Source precedence

1. The client's approved deliverables (kit, layout, copy, build spec) for what the site is.
2. [`docs/CONVENTIONS.md`](docs/CONVENTIONS.md) (locked), [`docs/PERFORMANCE.md`](docs/PERFORMANCE.md), [`docs/BRANDING.md`](docs/BRANDING.md) for how it is built.
3. [`docs/REVIEW-LAYER.md`](docs/REVIEW-LAYER.md) and [`docs/REVIEW-BACKEND-CONTRACT.md`](docs/REVIEW-BACKEND-CONTRACT.md) for the review round.
4. The sibling repos' conventions (Conscious Connections `docs/architecture/codebase-conventions.md`; taylor-aucoin `CLAUDE.md`) where the above are silent.
5. `docs/specs/DEVIATIONS.md` + `TECHNICAL-DECISIONS.md` record where implementation deliberately amended a spec.

## Hard guardrails

- **Never run `yarn dev` or `yarn build`.** Use `yarn dev:agent` (port 4500) / `yarn build:agent`. A human may have `yarn dev` up on 3000 sharing `.next`; a build there serves `ENOENT` on every route until restarted.
- **Never npm.** Yarn 4 only; `yarn add --exact` for anything pinned.
- **No upward imports** (`lib` → `brand` → `content` → `components` → `review` → `app`). `yarn lint` enforces it; fix the placement, never the rule.
- **Routes only from `lib/routes.ts`. Env only from `lib/env.ts`. No hex outside `brand/` and `review/kits/`.** Tailwind v4 token syntax is `text-(--x)`; `-[--x]` is a silent no-op.
- **The public site stays static.** No cookies, headers, searchParams or fetches at request time outside `app/review/`.
- **No lorem, stock, or reference imagery** in anything a client sees. Placeholder kits/layouts/mocks render a ribbon and must be replaced before a first look.
- **`DEVIATIONS.md` and `TECHNICAL-DECISIONS.md` are append-only.**
- **No git branches or PRs** as part of slice work unless the ticket says so; commit to the working branch with clear messages.
- **Do not edit `components/primitives/**` by hand**; that is shadcn's output. Regenerate with `npx shadcn@latest add <name> --overwrite`. Our components live in `components/composed/` (CONVENTIONS.md §6).
- **The client will maintain the site** through a Claude Code guide written at handover. Keep every editable fact in `content/`, media in `public/media/`, and the kit in `brand/production.ts`, so that guide stays true (CONVENTIONS.md §10a).

## Commands

Setup: Node 22 (`.nvmrc`), Yarn 4.13 (`corepack enable && yarn install`). Env: [`.env.example`](.env.example).

| Task                           | Command                                          |
| ------------------------------ | ------------------------------------------------ |
| Verify (matches CI)            | `yarn verify`                                    |
| Agent dev server               | `yarn dev:agent` → http://localhost:4500         |
| Agent production build + serve | `yarn build:agent && yarn start:agent` → :4510   |
| Lint / types / format          | `yarn lint` · `yarn check-types` · `yarn format` |
| Doc links                      | `yarn docs:check-links`                          |
| Add a shadcn component         | `npx shadcn@latest add <name>`                   |

## Repo map

| Path                                              | What                                                                                                                                                              |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/(site)/`                                     | The public site. Server components, static.                                                                                                                       |
| `app/review/`                                     | The review round: gate (`access/`), gated pages, `_components/` chrome, `_actions/`.                                                                              |
| `brand/`                                          | `BrandKit` type, compile step (`kit-vars.ts`), neutral kit, `production.ts` (null until set).                                                                     |
| `components/primitives/` · `components/composed/` | shadcn output, untouched · ours: `site/` chrome, `media/` frames and poster-first video, `brand/` KitScope.                                                       |
| `content/`                                        | Page copy as typed TS.                                                                                                                                            |
| `lib/`                                            | `env.ts` · `routes.ts` · `config.ts` (SITE) · `metadata.ts` · `cn.ts` · `color/` · `media/` · `validators/` · `review/` (access, backend client, anchors, types). |
| `review/`                                         | Registries for the round: `kits/`, `layouts/` (markdown), `mocks/`.                                                                                               |
| `proxy.ts`                                        | The review gate.                                                                                                                                                  |
| `docs/`                                           | Index at [`docs/README.md`](docs/README.md).                                                                                                                      |

## Briefing an agent session

Use the kickoff contract in [`docs/specs/README.md`](docs/specs/README.md). One ticket per thread. State paths before code. Report what `yarn verify` printed, not that it "should" pass.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
