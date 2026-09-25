import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

/**
 * Import boundaries, enforced by lint rather than by review.
 *
 * The layers, lowest first: `lib/` (pure helpers, env, routes) · `brand/`
 * (kits as data) · `content/` (page copy) · `components/` · `review/`
 * (the review round's registries and mocks) · `app/` (composition). Nothing
 * may import upward. The rules below encode exactly that, so a misplaced
 * import fails `yarn lint` instead of surviving until someone notices.
 * See docs/CONVENTIONS.md §3.
 *
 * The second wall (D-SITE-19): nothing public imports the review layer,
 * by alias or by relative path, so the public site survives its deletion
 * (SITE-9). Public = `app/(site)/**`, `app/*.{ts,tsx}`, `components/**`,
 * `content/**`, `brand/**`.
 *
 * One `forbid()` call per glob, carrying both walls. In flat config a
 * second `no-restricted-imports` block for the same files REPLACES the
 * first block's options rather than adding to them, so never append one.
 */
function upward(group) {
  return {
    group: [group],
    message: `Upward import. ${group} sits above this layer — see docs/CONVENTIONS.md §3.`,
  };
}

const REVIEW_WALL = {
  group: ["@/review/*", "@/lib/review/*", "@/app/review/*", "**/review/*"],
  message:
    "The public site never imports the review layer (D-SITE-19). Copy what you need into components/composed/.",
};

/** `rules` is a list of `{ group, message }` pattern groups. */
function forbid(files, rules) {
  return {
    files,
    rules: {
      "no-restricted-imports": ["error", { patterns: rules }],
    },
  };
}

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  forbid(
    ["lib/**"],
    ["@/brand/*", "@/content/*", "@/components/*", "@/review/*", "@/app/*"].map(
      upward,
    ),
  ),
  forbid(
    ["brand/**"],
    [...["@/content/*", "@/components/*", "@/app/*"].map(upward), REVIEW_WALL],
  ),
  forbid(
    ["content/**"],
    [...["@/components/*", "@/app/*"].map(upward), REVIEW_WALL],
  ),
  forbid(["components/**"], [upward("@/app/*"), REVIEW_WALL]),
  forbid(["review/**"], [upward("@/app/*")]),
  forbid(["app/(site)/**", "app/*.{ts,tsx}"], [REVIEW_WALL]),
  {
    // shadcn-generated files are vendored; their style is theirs.
    files: ["components/primitives/**"],
    rules: { "no-restricted-imports": "off" },
  },
  globalIgnores([
    ".next/**",
    ".next-agent/**",
    ".next-build/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
