# New client checklist

How `client-boilerplate` becomes `<client>-site`. Thirty minutes, in this order.

## 1. Duplicate

```bash
cd /Users/taylor/lighthouse/clients
cp -R client-boilerplate <client>-site
cd <client>-site
rm -rf .git .next .next-* node_modules
git init
yarn install
```

Create the GitHub repository in the client's name (the offer promises it) and add it as `origin`.

## 2. Rename

- `package.json` → `name`.
- `lib/config.ts` → `SITE.name`, `tagline`, `description`, `locale`, `email`, `nav`, `social`.
- `README.md` → the first heading and the one-line description.
- `.claude/launch.json` and `package.json` → pick an agent port pair not used by another client repo (`4500`/`4510` here; the next client takes `4500`/`4510`).

## 2a. File the deliverables

Copy everything the design phase produced (success criteria, taste read, copy bank, pillars, kits PDF and tokens, layouts, the Claude Code prompts) and the client's raw media into `docs/client/` with a `README.md` index, so no build thread depends on a chat attachment. Convert poster frames into `public/media/posters/<slug>.jpg` (1600 px max, JPEG q82, never upscaled) with a `MANIFEST.md` mapping files to slugs and flagging any guess.

## 3. Environment

- Copy `.env.example` to `.env.local`. Set `NEXT_PUBLIC_SITE_URL`.
- For the review round, set the four `REVIEW_*` variables (docs/REVIEW-LAYER.md §4).
- Create the Vercel project in the client's account and set the same variables there.

## 4. Verify the empty site

```bash
yarn verify
yarn dev:agent
```

Open `http://localhost:4500`: neutral kit, the structural home page, the chrome. Open `/review/access`: the gate.

## 5. The review round

Run the Batch 7 prompts (docs/REVIEW-LAYER.md §5). Confirm no placeholder ribbon remains. Send the link and the code.

## 6. After the round

Set the production kit and delete the review layer (docs/BRANDING.md §4, docs/REVIEW-LAYER.md §6). Open `docs/specs/` and cut the build tickets from the build spec.

## 7. Launch

`docs/PERFORMANCE.md` §9 checks · redirects from the old site in `next.config.ts` (`redirects()`) · domain and Vercel in the client's name · the self-edit guide written for this site · the style guide exported from the kit page.
