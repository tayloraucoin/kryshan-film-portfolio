/**
 * A `mailto:` link, optionally with a subject. Pure and env-free, so client
 * leaves can build the panel's link from the address they receive as a
 * prop. The subject is how an enquiry names the film that prompted it
 * (D-SITE-23), the site's only signal (D-SITE-15).
 */
export function mailtoHref(email: string, subject?: string): string {
  return subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;
}
