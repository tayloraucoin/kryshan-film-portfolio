import type { NextConfig } from "next";
import "./lib/env";

/**
 * `import "./lib/env"` runs the zod validation at build time, so a missing or
 * malformed variable fails `next build` instead of a page at runtime.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,

  /**
   * Overridable build directory, so an agent's `dev:agent` / `build:agent`
   * process never rewrites the `.next` a human's `yarn dev` is serving from.
   * Unset everywhere else, so Vercel and a plain `yarn dev` use `.next`.
   */
  distDir: process.env.NEXT_DIST_DIR ?? ".next",

  images: {
    formats: ["image/avif", "image/webp"],
    // Add a remote host here only when a client's images genuinely live off
    // the repo (docs/PERFORMANCE.md §4). The default is `public/`.
    remotePatterns: [],
  },

  /**
   * The review layer reads layout markdown from disk at request time. Nothing
   * imports those files, so Vercel's tracer cannot see them; naming them here
   * is what ships them with the function.
   */
  outputFileTracingIncludes: {
    "/review/layouts/[layout]": ["./review/layouts/**/*.md"],
  },
};

export default nextConfig;
