# client-boilerplate

The starting point for every coded client website: a five-page static Next.js 16 site with shadcn components, a brand kit pipeline that starts empty, and a gated design-review round the client uses once before the real build.

Duplicate it per client (`docs/NEW-CLIENT.md`). Never build a client site in this repo.

## Read first

1. [`AGENTS.md`](AGENTS.md) — the instruction spine for agents and humans alike.
2. [`docs/CONVENTIONS.md`](docs/CONVENTIONS.md) — placement, layers, naming, the ten rules.
3. [`docs/PERFORMANCE.md`](docs/PERFORMANCE.md) — why the site is fast and how to keep it so.
4. [`docs/BRANDING.md`](docs/BRANDING.md) — how a kit becomes the site.
5. [`docs/REVIEW-LAYER.md`](docs/REVIEW-LAYER.md) — the review round, end to end.

Full index: [`docs/README.md`](docs/README.md).

## Prerequisites

Node 22 (`.nvmrc`) and Yarn 4.13 via Corepack:

```bash
corepack enable
yarn install
cp .env.example .env.local
```

## Commands

|                         |                                                     |
| ----------------------- | --------------------------------------------------- |
| `yarn dev`              | Dev server on :3000 (humans)                        |
| `yarn dev:agent`        | Dev server on :4500 with its own build dir (agents) |
| `yarn verify`           | Lint, types, build. What CI runs.                   |
| `yarn format`           | Prettier                                            |
| `yarn docs:check-links` | Every relative markdown link resolves               |

## Layout

```
app/          routes: (site)/ public · review/ the gated round
brand/        kits as data · production slot (null until set)
components/   primitives/ (shadcn) · composed/ (site chrome, media, KitScope)
content/      page copy, typed
lib/          env · routes · config · metadata · validators · review client
review/       the round's registries: kits, layouts (markdown), mocks
docs/         conventions, performance, branding, review layer, specs
```

## The review round in one paragraph

Set `REVIEW_ACCESS_CODE`, `REVIEW_SESSION_SECRET`, `REVIEW_BACKEND_URL` and `REVIEW_INGEST_KEY`; the client opens `/review/access`, sees three kits, three layouts and three demo home pages, turns on **Comment** and clicks the exact thing they mean, then fills the feedback form. Comments and the form go to tayloraucoin.com through this site's server (`docs/REVIEW-BACKEND-CONTRACT.md`). When a kit is chosen it becomes `brand/production.ts` and the review layer is deleted.
