#!/usr/bin/env node
/**
 * Verifies that every relative markdown link in tracked *.md files resolves to
 * a real file or directory. Run via `yarn docs:check-links`.
 *
 * Exit code 1 with a file:line report when broken links are found.
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const repoRoot = resolve(import.meta.dirname, "..");

const files = execSync("git ls-files --cached --others --exclude-standard", {
  cwd: repoRoot,
  encoding: "utf8",
})
  .split("\n")
  .filter((f) => f.endsWith(".md") && !f.startsWith("node_modules/"));

// [text](target) — capture target; tolerate titles ("...") after the URL and
// one level of balanced parentheses in the path (Next.js route groups).
const LINK_RE =
  /\[[^\]]*\]\(<?((?:[^()\s<>]|\([^()\s]*\))+)(?:\s+"[^"]*")?>?\)/g;

// Leading "/" targets are site URLs in specs, not repo files.
const IGNORED_PREFIXES = ["http://", "https://", "mailto:", "tel:", "#", "/"];

let broken = 0;

for (const file of files) {
  const abs = resolve(repoRoot, file);
  const lines = readFileSync(abs, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const match of line.matchAll(LINK_RE)) {
      const target = match[1];
      if (IGNORED_PREFIXES.some((p) => target.startsWith(p))) continue;
      const path = decodeURIComponent(target.split("#")[0]);
      if (!path) continue;
      const resolved = resolve(dirname(abs), path);
      if (!existsSync(resolved)) {
        broken++;
        console.log(`${file}:${i + 1}  →  ${target}`);
      }
    }
  });
}

if (broken > 0) {
  console.error(`\n${broken} broken markdown link(s).`);
  process.exit(1);
}
console.log(`All markdown links resolve (${files.length} files checked).`);
