import Link from "next/link";
import { SITE } from "@/lib/config";
import { siteRoutes } from "@/lib/routes";

/**
 * The site's chrome, top. Wordmark left, primary nav right, nothing else.
 * Quieter than the weakest piece on the page by design: the work is the
 * hero. Replace the wordmark with the kit's treatment when the kit is set.
 */
export function SiteHeader() {
  return (
    <header className="border-b border-border" data-review-id="site-header">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link
          href={siteRoutes.home}
          className="font-heading text-lg font-semibold tracking-tight"
        >
          {SITE.name}
        </Link>
        {SITE.nav.length > 0 ? (
          <nav aria-label="Primary">
            <ul className="flex items-center gap-5 text-sm">
              {SITE.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
