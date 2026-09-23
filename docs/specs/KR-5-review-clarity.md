# KR-5 — Review round clarity: brand page, layout briefs, kit switcher

**Epic:** KR — Kryshan Randel, Phase 1 review round · **Phase 1** · Size: M
**Slice type:** review-round usability, from Taylor's walk of trios A–C. Runs before KR-4 (send).

**Status:** Complete (2026-09-22)

---

## Outcome

1. `/review/brand`: the brand in one page (essence, three pillars with proof, overlaps, which pillar each kit leads with), cut from `docs/client/kryshan-04-brand-pillars.md`. Linked from the review index ("Start here") and from each kit page.
2. Layout pages lead with a plain-language brief: the idea, the same five questions answered for every layout, why (quoting his intake), what it gives up, and the three side by side. The full layout deliverable is still on the page, verbatim, folded under "Show the full layout notes".
3. Every demo home page can be shown in any of the three kits: `/review/mocks/<mock>/<kit>`, nine combinations, with a switcher above the page. The bare `/review/mocks/<mock>` redirects to the kit it was designed with. The kit is a path segment because comments are keyed by path.

## Why

Taylor, after the KR-1..3 walk: the pillars were nowhere in the round; the layout pages were too long for a non-technical client ("where do I even start to differentiate this?"); pairing each layout with one kit hid the combinations he might prefer.

## Placement

`review/brand.ts` (data) · `app/review/(gated)/brand/page.tsx` · `review/layouts/index.ts` (`brief`, `BRIEF_QUESTIONS`, `mockId`) · `app/review/(gated)/layouts/[layout]/page.tsx` · `app/review/(gated)/mocks/[mock]/page.tsx` (redirect) · `app/review/(gated)/mocks/[mock]/[kit]/page.tsx` + `_components/kit-switcher.tsx` · `review/kits/types.ts` (`MockVars`) · the three kits' `extraVars` · `lib/routes.ts` (`mock(id, kitId)`, `brand`).

## Acceptance (met)

- `yarn verify` passes.
- All nine `/review/mocks/<mock>/<kit>` URLs return 200 inside the requested kit's scope; the bare URL redirects to the paired kit.
- The index links the brand page first; each kit page names its leading pillar and links there.
- Each layout page's visible text is a brief (~600 words with the comparison table, down from the full spec); the spec is one click away and byte-identical to `docs/client/`.

## Closing note

Walk at 1440: index, brand page, layout B brief (comparison table, details closed), B in kit A, C in kit B, A in kit C. Every mock reads only the shadcn roles plus the shared `MockVars`, so a new combination needs no mock change. Known look: in kit B the ghost "RANDEL" (kit B's `muted` on cream) is more visible than in C; left as the honest result of that pairing.
