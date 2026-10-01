"use server";

import { sendContactMessage } from "@/lib/contact/send-message";
import {
  contactMessageInput,
  type ContactField,
  type ContactMessageResult,
} from "@/lib/validators/contact";

/**
 * Contact's form → his inbox. Thin: validate, send, return a result. A
 * filled honeypot answers `ok` without sending, so a bot learns nothing.
 */
export async function submitContactMessage(
  input: unknown,
): Promise<ContactMessageResult> {
  const parsed = contactMessageInput.safeParse(input);
  if (!parsed.success) {
    const fields = new Set<ContactField>();
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field === "website") return { ok: true };
      if (field === "name" || field === "email" || field === "message") {
        fields.add(field);
      }
    }
    return { ok: false, reason: "invalid", fields: [...fields] };
  }
  return sendContactMessage(parsed.data);
}
