import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Review", template: "%s — Review" },
  robots: { index: false, follow: false },
};

/**
 * Everything under `/review` is private and per-request: the proxy has
 * already decided who may be here, and the pages read cookies and talk to a
 * backend, so nothing in this tree is static. The public site is untouched.
 */
export const dynamic = "force-dynamic";

export default function ReviewRootLayout({ children }: LayoutProps<"/review">) {
  return <>{children}</>;
}
