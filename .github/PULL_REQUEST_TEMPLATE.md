## Summary

<!-- What does this PR change? One or two sentences. -->

## Pre-accept checklist (docs/CONVENTIONS.md §9)

- [ ] **Location** — each file is where §2 puts it; client leaves in `_components/`.
- [ ] **Naming** — kebab-case filenames; `use-` prefix for hooks; named exports.
- [ ] **Imports** — no upward imports (`yarn lint` passes); paths from `lib/routes.ts`; env from `lib/env.ts`.
- [ ] **Server/client** — server default; `"use client"` on line 1 only where needed.
- [ ] **Tokens** — colours and fonts by token name; no new hexes outside `brand/`.
- [ ] **Performance** — no video element before intent; images sized; nothing dynamic on the public site.
- [ ] **Records** — spec status flipped, `PROGRESS.md` ticked, one `DEVIATIONS.md` line per divergence.

## How to verify

```bash
yarn verify
```
