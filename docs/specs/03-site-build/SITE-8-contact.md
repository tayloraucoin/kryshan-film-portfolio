# SITE-8 — Contact: the address, big and copyable, with a Copy that never lies

**Epic:** SITE — Kryshan Randel's live site · **Step 2 (The rest of the site)** · Size: S
**Slice type:** a one-block static page with one client leaf. The risks are:
- a "Copied" label when nothing was copied (an insecure context, a denied permission)
- the address overflowing a 320 px screen
- a form or form-like element creeping in

**Status:** Draft → ready for execution (authored 2026-09-24)

> **Vigil: light review, one induced failure.** Induce the copy failure twice and state both results:
> - stub `navigator.clipboard.writeText` to reject
> - load the page from a non-secure origin (the dev server over the machine's LAN IP, where `isSecureContext` is false)
>
> Check 320 px with the real address and with a long test address.

---

## Outcome

`/contact` is a courtesy page: the email is already on every page. It's one left-aligned block:
- the H1 "No agent, no form, no waiting."
- his address, very large, as a `mailto:`
- a quiet "Copy" beneath it
- later, one line for the teaching audience (SITE-C writes it)

The footer directly beneath carries his place and socials, so the page repeats neither. "Copy" copies the exact address and says "Copied". When the browser won't let it copy, it never claims it did: it selects the address and says so. On a 320 px phone the address breaks before the `@` and never scrolls sideways. There is no form.

Nothing about the footer, the bar or the email variable changes here (SITE-1 owns them).

## Why / intent

- **Spec §6.6:** the page, its text table and its acceptance seeds.
- **Spec §4.3 (Copy):** `navigator.clipboard.writeText` is used only when `isSecureContext`. On failure the label never says "Copied": Contact selects the address, and the status reads "Couldn't copy. The address is selected." Client leaves never import `@/lib/config`.
- **Spec §7.6:** "Copy" → "Copied", with that failure line (Locked).
- **D-SITE-14:** Contact is an address page with Copy, and no form.
- **D-SITE-26:** Contact is left-aligned, amending 06-A's centring.
- **D-SITE-18:** the email is `CONTACT_EMAIL`, falling back to the alias. The alias must deliver before the first look (O-SITE-15, Taylor).
- **O-SITE-16:** the H1 is **flagged to him**. The default is the H1 as is; the offered alternative is "No agent and no form. Email me."
- **What this slice is NOT (binding):**
  - no form, input or "send a message" affordance (a form is the Supabase add-on, spec §2)
  - no place line or socials in the page body
  - no subject on this page's mailto (subjects belong to the panel and detail pages, D-SITE-23)
- **Ground truth:**
  - SITE-1: the chrome, `siteRoutes.contact`, `content/site.ts`
  - SITE-3: `components/composed/site/copy-button.tsx` (shared and secure-context aware), consumed, never forked

## Rulings this slice makes (labelled, logged)

- **Contact's page strings live in `content/site.ts` as a `CONTACT` export:** `h1`, `description` (the Locked meta) and `teachingLine?`. Spec §5 has no `content/contact.ts`, and `content/site.ts` already holds single-page strings (the 404 line). The Copy microcopy stays with the other §7.6 strings in the same file. `[ASSUMPTION: reversible placement; the scope sheet names only the page file.]` Logged.
- **The `<wbr>` goes before the `@` of whatever `SITE.email` holds,** not before a hardcoded `hello`: `{local}<wbr>@{domain}`, split on the last `@`. `CONTACT_EMAIL` can change (D-SITE-18), and the break must follow it. Logged.
- **"Copy" is hidden without JavaScript using CSS, not by rendering it late.** Tailwind v4's `noscript:` variant (`@media (scripting: none)`) hides it. With JavaScript it's in the server HTML from the first paint, so nothing shifts when it hydrates. Mounting it only after hydration would move the teaching line and the footer (CLS). If SITE-3's `CopyButton` already does this, nothing to do. Logged.
- **Contact's failure mode selects the on-page address.** If SITE-3's `CopyButton` has no "select this element on failure" mode, add one as a prop on the shared component (for example the target element's id). Don't write a second copy button. Logged.

## Experience & states

### The block (spec §6.6)

Left-aligned, max-width 40rem, in the page's normal gutter. Nothing centred.

1. **Bar** (Contact `aria-current="page"`). Skip link: "Skip to content".
2. **H1** "No agent, no form, no waiting." (Locked, flagged, O-SITE-16). The kit's H1 step. **No red phrase.**
3. **The address:**
   - A `mailto:{SITE.email}` link with no subject. Its visible text is `{local}<wbr>@{domain}`.
   - Type: Archivo **800**, width **80** (`font-stretch: 80%`), **not uppercase**, size `clamp(2rem, 7vw, 4rem)`, `foreground`, with a hover or focus-visible treatment through tokens (`--link` on hover).
   - `overflow-wrap: anywhere` is the last resort, for an address too long to break at the `@` alone.
4. **"Copy"** on its own line beneath:
   - SITE-3's `CopyButton`, receiving the address as a prop (the page is a server component; the leaf never imports `@/lib/config`).
   - The panel's Copy link look (Label step, `muted-foreground`, hover `--link`), with a 44 px hit area.
   - Hidden without JavaScript.
5. **Teaching line** (**Write**, ≤12 words, plain, no "also"): rendered only when `CONTACT.teachingLine` exists. **Absent at SITE-8**; SITE-C writes it.
6. **Footer** (SITE-1): the address line, "Vancouver, works anywhere.", the socials. The page body carries no place line and no socials.

### Metadata

- Title "Contact — Kryshan Randel".
- Description (Locked, Cantor): "Email Kryshan Randel directly. Director, camera operator, editor and film instructor. Vancouver, works anywhere."
- Canonical `siteRoutes.contact`. `og:image` is the site default.

### States (exhaustive)

- **Copy:**
  - idle ("Copy")
  - copied ("Copied" for 2 s, then "Copy"; announced once through a polite `role="status"`)
  - failed: the address is selected, the label stays "Copy", and the status reads "Couldn't copy. The address is selected."
- **JavaScript off:** Copy isn't displayed. The mailto still works, and the address can be selected by hand.
- **Teaching line:** absent (the default) · present.
- **Address:** the alias (the default) · a longer override through `CONTACT_EMAIL`.

### Failure / edge states

- **Not a secure context** (`http://` on a LAN IP; some embedded webviews): `navigator.clipboard` isn't used. The failure path runs straight away.
- **`writeText` rejects** (permission denied, or the document isn't focused): the failure path runs. The label never shows "Copied".
- **Double activation during "Copied":** it copies again and restarts the 2 s. There's only ever one status message, and no stacking.
- **A very long `CONTACT_EMAIL`:** it breaks at the `@`, then anywhere. It never scrolls horizontally.
- **The alias doesn't deliver:** not detectable by the page. That's O-SITE-15's gate on the first look (Taylor), not a code path.

## Non-negotiables (this slice)

- **No form element**, and no `input`, `textarea`, `select` or `button[type=submit]`, on this page.
- **"Copied" appears only after a resolved `writeText`** in a secure context. Every other path is the failure path.
- **No horizontal scroll at 320 px** with any valid address.
- **Client leaves get the email as a prop;** nothing client-side imports `@/lib/config`.
- **Static.** No request-time reads, and one small client leaf (the shared copy button).

If the spec would force you to break one of these, **stop and ask**.

## Data & content

**Database: none (static site, no database).**

**Content files:**
- `content/site.ts` gains `CONTACT`:
  - `h1`: the Locked string above
  - `description`: the Locked meta above
  - `teachingLine?`: absent; SITE-C
- The §7.6 Contact microcopy ("Copy", "Copied", "Couldn't copy. The address is selected.") lives there too, if SITE-3 hasn't already put it there.
- Each entry gets a one-line comment (CONVENTIONS §10a).
- `lib/config.ts` `SITE.email` is read by the server page only.

**Placement:**
- `app/(site)/contact/page.tsx`, using `components/composed/site/copy-button.tsx` (Mason's call, build order scope sheet).
- An extension to `copy-button.tsx` only if its select-on-failure mode is missing (see Rulings).
- No new component files.

**Validators:** none.

**AI notes: None.**

**Instrumentation: None (D-SITE-15); the mailto subject is the only signal (D-SITE-23).** Contact's mailto carries no subject.

## Accessibility

- **One h1.** The address link's accessible name is the address itself (`<wbr>` doesn't change it).
- **Copy:**
  - a `<button type="button">`, reachable by Tab and activated by Enter and Space
  - its accessible name stays "Copy" (or "Copied" while copied)
  - the result is announced once in a polite `role="status"` that exists in the DOM from load, so the first announcement isn't lost
  - focus stays on the button after both success and failure
- **Selection on failure** is visible (the browser's own highlight). The status text tells the visitor what happened.
- **Targets:** Copy ≥44 px. The address link is large by type.
- **Reflow at 320 px (1.4.10):** no horizontal scroll, and nothing clipped.
- **Contrast:** the address in `foreground` (16.7:1); Copy in `muted-foreground` (7.6:1).
- **Language** `en-CA`.

## Acceptance criteria (observable; `yarn dev:agent` for the walk, `yarn build:agent` for the static HTML)

1. **At 1440:** bar (Contact `aria-current="page"`) · the H1 "No agent, no form, no waiting." · the address · "Copy" on its own line · footer. The block is left-aligned with a max width of 40rem. There's no place line, no socials and no teaching line in `main`.
2. **No form.** In the built page, `document.querySelectorAll('form, input, textarea, select, [type=submit]').length === 0`.
3. **The address markup:**
   - The static HTML (`.next-build` output for `/contact`) contains `hello<wbr>@kryshanrandel.com` with the default alias, as `<wbr/>` in React's output.
   - The link's `href` is exactly `mailto:hello@kryshanrandel.com`, with no `?subject`.
4. **Type:**
   - Computed `font-weight` 800, `font-stretch` 80%, `text-transform` none.
   - `font-size` 32px at 390, about 54px at 768, and 64px at 1440.
5. **320 px:**
   - With the default alias, `document.documentElement.scrollWidth <= 320`, and the address breaks at the `@` only.
   - With a temporary `CONTACT_EMAIL=a-very-long-local-part-for-testing@example.com` set inline for a local run (never committed), there's still no horizontal scroll: the address wraps within the block.
6. **Copy by keyboard:**
   - Tab reaches Copy and Enter activates it.
   - The clipboard holds exactly `SITE.email`.
   - The label reads "Copied" for about 2 s and then "Copy".
   - The status announces once.
   - Focus stays on the button.
7. **Copy failure, stubbed** *(Vigil)*: with `navigator.clipboard.writeText` stubbed to reject, activating Copy leaves the label as "Copy" (never "Copied"). `window.getSelection().toString()` equals the address, and the status reads "Couldn't copy. The address is selected."
8. **Copy failure, insecure context** *(Vigil)*: loaded over `http://<LAN IP>:4500`, where `isSecureContext` is false, Copy makes no `navigator.clipboard` call and takes the failure path as in 7. If the LAN route isn't available in the agent's environment, say so, and 7 stands alone.
9. **No JavaScript:** Copy isn't displayed. With JavaScript, a cold load shows it with CLS 0 (it doesn't appear late).
10. **Teaching line:** absent by default. With a temporary `CONTACT.teachingLine`, it renders beneath Copy as one line. Reverted after.
11. **Metadata:** `<title>` "Contact — Kryshan Randel". The description is the Locked string verbatim. The canonical is `{SITE_URL}/contact`.
12. **Colour:** no element in `main` uses `primary` (no red phrase).
13. **Performance:** CLS 0 and the LCP element is the H1. The only page-specific client JavaScript is the copy button.
14. `yarn verify` passes (lint zero warnings, check-types, build:agent). Browser walk at 1440, 768, 390 and 320 on `/contact` via `yarn dev:agent` (never `yarn dev`/`yarn build`). The closing note is appended to this ticket per the kickoff contract.

## Likely-relevant technical notes (ADVISORY — dev decides)

- **Splitting the address:** `const at = email.lastIndexOf("@")`, then render `{email.slice(0, at)}<wbr />{email.slice(at)}`. Zod has already validated the address (`lib/env.ts`).
- **The status region:** a visually hidden `role="status"` rendered empty on load and written on each result is the reliable pattern. A region inserted at the moment of the message is often missed by screen readers.
- **Selecting the address:** `const range = document.createRange(); range.selectNodeContents(el); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(range);`.
- **The type size in Tailwind v4:** an arbitrary value `text-[clamp(2rem,7vw,4rem)]` plus `font-stretch-80%` and `font-extrabold`, or a kit token if SITE-1 added a display step. Never a hex value.

## Dev's call

- The exact hover or focus treatment of the address (tokens only).
- The prop name for the select-on-failure mode, if `CopyButton` needs one.
- The vertical spacing inside the block, within the kit's rhythm (§4.1).

## Out of scope

- **The teaching line's words:** SITE-C.
- **The H1 alternative** ("No agent and no form. Email me."): Kryshan's answer to O-SITE-16. It's a one-string content edit if he picks it.
- **The alias existing and delivering:** O-SITE-15 (Taylor), which gates the first look.
- **The footer, the bar and socials** (including O-SITE-6's possible removal of Instagram and Facebook): SITE-1.
- **A contact form:** never in the standard build (spec §2); the Supabase add-on.
- **Copy link on the panel and detail pages:** SITE-3 and SITE-5. They share the same component.

## Depends on

- **SITE-1:** the chrome, `siteRoutes.contact`, `content/site.ts`. Complete in `PROGRESS.md`.
- **SITE-3:** `components/composed/site/copy-button.tsx` (the scope sheet: "using the shared copy button", which SITE-3 creates). Complete in `PROGRESS.md`. The build order's dependency table lists SITE-1 only; this ticket wins, and the table needs SITE-3 added. Building before SITE-3 would mean writing a second copy button, which the scope sheet forbids.

## Recommended Claude Code execution

**Sonnet 5.** One careful mechanism (the copy failure path) on a settled component, against a precise spec. Opus isn't needed. Choosing a lighter model than Sonnet 5 risks the happy path only: a button that sets "Copied" before the promise settles (so it lies in a non-secure context), the `<wbr>` hardcoded after "hello" (so it breaks when `CONTACT_EMAIL` changes), and a Copy mounted after hydration that shifts the footer.

---

### Claude Code kickoff (paste into the session)

> Build **SITE-8 — Contact: the address, big and copyable** (`docs/specs/03-site-build/SITE-8-contact.md`). Model: **Sonnet 5**. **The address, left-aligned and huge, breaking at the `@`; a Copy that says "Copied" only when it copied; no form.**
>
> Read first, in order:
> 1. this ticket
> 2. `docs/specs/README.md` (the kickoff contract)
> 3. `AGENTS.md`
> 4. `docs/CONVENTIONS.md`
> 5. `docs/specs/03-site-build/site-ux-spec-v1.0.md` §4.1, §4.3 (Copy), §6.6, §7.6, §9, §12 (D-SITE-14, 18, 26)
> 6. the SITE-1 and SITE-3 tickets and closing notes (`copy-button.tsx`: reuse, don't fork)
> 7. `docs/specs/DEVIATIONS.md` + `docs/specs/TECHNICAL-DECISIONS.md`
>
> Constraints:
> - Routes only from `lib/routes.ts`; env only via `lib/env.ts`; no hex outside `brand/`.
> - Client leaves never import `@/lib/config`: the email arrives as a prop.
> - No upward imports, and nothing public imports `review/`.
> - Never `yarn dev` or `yarn build`: use `yarn dev:agent` / `yarn build:agent`.
> - If a non-negotiable would have to break, stop and ask.
>
> Close in three places: this ticket's `Status:`, `docs/specs/PROGRESS.md`, and `DEVIATIONS.md` (plus `TECHNICAL-DECISIONS.md` for real alternatives). Then tick `03-site-build/00-build-order.md`. Run `yarn verify` and report what it printed. Append a `## Closing note` here: what shipped, both failure-path results, deviations, and the one thing the next ticket must know.
