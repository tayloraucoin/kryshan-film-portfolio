# The review layer

Every client engagement has one feedback round before the real build: the client sees three branding kits, three layouts and three demo home pages, comments on the exact things they react to, and answers a short form. This layer is that round, built into the client's own repo so what they comment on is what would ship. It is deleted before launch.

## 1. What it is

Routes, all under `/review`:

| Route                        | What                                                                                                                                                                                |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/review/access`             | The code gate. The only page outside the gate.                                                                                                                                      |
| `/review`                    | The index: three columns (kits, layouts, demos) and the feedback link.                                                                                                              |
| `/review/kits/[kit]`         | One kit as a live style page: palette with contrast, type scale, voice strings, the never list. One template for all three.                                                         |
| `/review/layouts/[layout]`   | A plain-language brief of the layout (five questions, why, what it gives up, the three side by side), then the deliverable's markdown folded underneath, in its paired kit's scope. |
| `/review/mocks/[mock]`       | Redirects to the demo in the kit its layout was designed with.                                                                                                                      |
| `/review/mocks/[mock]/[kit]` | A demo home page: one layout in any kit (a switcher above it), full width, real content. Kits share `MockVars` (M-KR-3).                                                            |
| `/review/brand`              | The brand in one page: essence, pillars, which pillar each kit leads with. Linked first from the index.                                                                             |
| `/review/feedback`           | The form, rendered from `review/feedback.ts`: rankings, 0.0–7.0 sliders and forks (KR-6), then the three free-text boxes.                                                           |

On every gated page: a bar with **Comment** (click-to-comment), the comment count (opens the list), and **Leave feedback**.

## 2. Gate

- `REVIEW_ACCESS_CODE` and `REVIEW_SESSION_SECRET` in the environment switch the layer on. Without both, every code is refused and the access page says the layer is off.
- `REVIEW_GATE=off` turns the gate off for local development: `proxy.ts` lets every `/review` request through, `/review/access` forwards to `next` (or the index), and the index shows a warning while it is off. The default, and anything but the literal `off`, is `on`. A deployed round is always `on`.
- The client types the code once. `app/review/access/_actions/enter-code.ts` compares it in constant time and sets a signed, HttpOnly, path-scoped cookie for thirty days (`lib/review/access.ts`).
- `proxy.ts` checks the signature on every `/review/*` request except the access page and redirects to it with `?next=`. It also stamps `X-Robots-Tag: noindex`; `app/robots.ts` disallows the tree as well.
- This is not authentication. It is a shared code that keeps a link private. Nothing in the layer holds client data beyond what the client writes into it.

## 3. Comments

`app/review/_components/comment-layer.tsx` and `review-context.tsx`.

- Comment mode captures the next click anywhere outside the review chrome, describes the clicked element (`lib/review/anchor.ts`: a `data-review-id` ancestor, an `id`, or a structural selector, plus the click position as fractions of the element's box), and opens a composer at the click.
- Saved comments render as numbered pins where their selector resolves now, on any viewport. The list (a sheet) has jump-to and delete.
- Every comment gets a browser-minted uuid, is shown immediately, and is sent through a server action to the backend (`lib/review/backend.ts`). If the send fails, the comment is kept in `localStorage` under the page's path, shown as "not yet sent", and retried on the next load or on the Retry button with the same id. Nothing a reviewer writes is lost on a bad connection.
- Authors mark the parts of a page they want comments to stick to with `data-review-id="…"` (stable, unique per page). Unmarked elements still work; their selector is just less readable in the email.

## 4. Backend

`docs/REVIEW-BACKEND-CONTRACT.md` is the contract with tayloraucoin.com. The client site's server holds the per-round key (`REVIEW_INGEST_KEY`) and talks to `REVIEW_BACKEND_URL`; the browser never sees either. With the two unset, the layer still works and says so on the index: comments stay in the reviewer's browser.

Setting up a round:

1. In taylor-aucoin: `yarn review:create --client "Name" --label "Phase 1 · kits and layouts"`. Copy the key it prints; it is shown once.
2. In the client repo's environment (Vercel project settings or `.env.local`): the four `REVIEW_*` variables.
3. Open `/review/access` with the code, confirm the bar says **Connected**.
4. Send the client the URL and the code, separately.

## 5. What Batch 7 fills in

The boilerplate ships the machinery with placeholders that say so on their face. The per-client "Batch 7" prompts replace them. The seams:

| Replace                                 | With                                                                                                                                                                                    | Notes                                                                                                                        |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `review/kits/placeholder-{a,b,c}.ts`    | One `ReviewKit` per kit: the tokens from `kryshan-05-tokens.json`-style deliverables, fonts via `next/font`, ramps, roles, type scale, voice strings, never list. `placeholder: false`. | Keep ids `kit-a`, `kit-b`, `kit-c` or update the registry and the layout/mock pairings.                                      |
| `review/layouts/placeholder-{a,b,c}.md` | The layout deliverables, unchanged. Update `review/layouts/index.ts` (name, thesis, file, `placeholder: false`).                                                                        | Read from disk at request time; `next.config.ts` traces the folder.                                                          |
| `review/mocks/placeholder-home.tsx`     | One server component per pairing (`mock-a.tsx`, …) built from the client's real titles, posters and copy, using `components/composed/media/*`. Update `review/mocks/index.ts`.          | Mocks receive `{ kit }` and render inside `KitScope`; they must not import from `app/`. Mark sections with `data-review-id`. |

Attachments a Batch 7 prompt should expect: the brand-kit PDF and its tokens JSON, the three layout markdown files, the copy document, and a media manifest (poster files into `public/posters/`, video ids).

Done when: every registry entry has `placeholder` false or absent; `/review` shows no ribbon; `yarn verify` passes; a browser walk on a phone-width viewport can comment on each of the nine pages and submit the form.

## 6. After the round

Taylor triages every comment (defect · taste adjustment · direction change · scope change), converges on one kit and one layout, and writes the build spec. Then:

1. Set the production kit (`docs/BRANDING.md` §4).
2. Delete the layer: `app/review/`, `review/`, `lib/review/`, `lib/validators/review.ts`, `proxy.ts` (or its review branch), the `REVIEW_*` variables, the `outputFileTracingIncludes` entry, and the `/review` disallow in `robots.ts`.
3. `yarn verify`. The public site never imported any of it, so nothing else changes.

## 7. Not in this layer

- Editing a comment (delete and re-add).
- Replies or threads.
- An admin view of results (taylor-aucoin gets an email per submission and holds the tables).
- Multiple reviewers with names. The round is one client; if two people review, they share the code and the comments say who.
- Screenshots. The client comments on the live page; the selector and position are the record.
