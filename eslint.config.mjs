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
 */
function forbid(files, patterns) {
  return {
    files,
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: patterns.map((group) => ({
            group: [group],
            message: `Upward import. ${group} sits above this layer — see docs/CONVENTIONS.md §3.`,
          })),
        },
      ],
    },
  };
}

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  forbid(
    ["lib/**"],
    ["@/brand/*", "@/content/*", "@/components/*", "@/review/*", "@/app/*"],
  ),
  forbid(
    ["brand/**"],
    ["@/content/*", "@/components/*", "@/review/*", "@/app/*"],
  ),
  forbid(["content/**"], ["@/components/*", "@/review/*", "@/app/*"]),
  forbid(["components/**"], ["@/review/*", "@/app/*"]),
  forbid(["review/**"], ["@/app/*"]),
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
