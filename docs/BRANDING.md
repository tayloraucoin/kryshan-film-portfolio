# Branding

Every client site gets its own kit. This file is how a kit becomes the site, how three review kits coexist before one is chosen, and what "empty until set" means in code.

## 1. A kit is data

`brand/types.ts` defines `BrandKit`: an id, a ground (`light` or `dark`), the full set of shadcn colour roles as hex, three font slots, a radius, and optional ramps, roles and a type scale for the kit page. A kit is complete or it is not a kit; every role is required so a component never falls through to a default that was not chosen.

`brand/kit-vars.ts` is the compile step. It turns a kit into the custom properties shadcn's components already read (`--background`, `--primary`, `--font-sans`, …). Nothing in `components/primitives` knows a kit exists.

## 2. Where a kit is applied

- **Production kit:** the root layout (`app/layout.tsx`) sets the variables inline on `<html>` and adds `dark` when the ground is dark. One scope, the whole site.
- **Review kits:** `components/composed/brand/kit-scope.tsx` sets the same variables on a wrapper `<div>`. Three kits render on three pages, or on one, with no change to `globals.css`.

`app/globals.css` holds the neutral fallbacks and the `@theme inline` bridge that maps `--background` to `bg-background`. It never holds a brand colour. If you are adding a hex to `globals.css`, stop.

## 3. Fonts

A font slot's `stack` is a CSS `font-family` value. For a licensed or Google face:

1. Load it with `next/font` in the kit's file, at module scope, with `variable: "--font-<name>"`.
2. Set the slot's stack to `"var(--font-<name>), <fallback>"`.
3. Put the loader's `className` (joined, if several) in the kit's `fontClassName`.

The scope element applies `fontClassName`, so the variable exists exactly where the stack is used. The root layout never imports a font.

```ts
// brand/kits/example.ts
import { Archivo } from "next/font/google";
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
export const EXAMPLE_KIT: BrandKit = {
  fontClassName: archivo.variable,
  fonts: { display: { stack: "var(--font-archivo), sans-serif" }, … },
  …
};
```

Local files (`next/font/local`) go in `public/fonts/`; note the licence in the slot's `note`.

## 3a. The extension point

A kit may declare `extraVars`: custom properties beyond the shadcn roles, emitted at the same scope. Use it for a fourth font slot (`--font-quote`), an inverse surface (`--surface-dark`), or role-tag colours (`--tag-directing`, `--tag-camera`, `--tag-editing`). Components read them with Tailwind's variable syntax (`bg-(--surface-dark)`), and the kit page does not render them, so document each one in the kit file's comment. Keep the list short; a kit with ten extra variables is a kit whose roles were mapped wrong.

## 4. Empty until set

`brand/production.ts` exports `PRODUCTION_KIT: BrandKit | null` and starts as `null`. `brand/active.ts` returns the neutral kit in that case. A client site that ships with `null` is obviously unbranded (system font, grey) rather than subtly wrong.

When the review round has chosen a kit:

1. Copy the chosen `review/kits/<kit>.ts` to `brand/kits/<client>.ts` (a plain `BrandKit`; drop the review-only fields or keep them, both type-check).
2. Set `PRODUCTION_KIT` to it.
3. Delete `app/review/`, `review/`, `lib/review/`, `proxy.ts`'s review branch, and the four `REVIEW_*` variables. The public site never depended on any of it.

Never point `PRODUCTION_KIT` at a file inside `review/`; the layer order forbids it and the delete step above would break the site.

## 5. Dark grounds

A kit's `ground` decides the `dark` class at its scope, which drives every `dark:` variant in shadcn's components. There is no user-facing theme toggle and no `next-themes` provider: the kit is the theme. If a client's design needs a light and a dark surface, that is two kits or a kit with an explicit second surface, decided on the kit page, not a system-preference switch.

## 6. Contrast

The review kit page computes WCAG ratios for the five text/ground pairs that matter and prints the grade. A kit that fails AA at body size says so on its own page. The production kit must pass the same five pairs; run the numbers through `lib/color/contrast.ts` when in doubt.

## 7. The style guide

The handover style guide the offer promises is the chosen kit's page, exported. Keep `ramps`, `roles`, `typeScale`, `voice` and `never` filled on the production kit so the page stays true after launch.
