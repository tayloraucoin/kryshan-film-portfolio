import { SITE } from "@/lib/config";

/**
 * The site's chrome, bottom. Carries the email on every page: contact is
 * never more than one scroll away, whatever the page (docs/CONVENTIONS.md §7).
 */
export function SiteFooter() {
  return (
    <footer
      className="mt-auto border-t border-border"
      data-review-id="site-footer"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <a
          href={`mailto:${SITE.email}`}
          className="font-medium hover:underline"
        >
          {SITE.email}
        </a>
        {SITE.social.length > 0 ? (
          <ul className="flex flex-wrap gap-4 text-muted-foreground">
            {SITE.social.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  rel="me noopener"
                  target="_blank"
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </footer>
  );
}
