/**
 * The public site's route group. It renders no chrome: each page wraps its
 * content in `SiteShell` (components/composed/site/site-shell.tsx), because
 * the bar's current item and the skip link's words depend on the page and a
 * layout can't see which page it wraps (M-SITE-1).
 */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return children;
}
