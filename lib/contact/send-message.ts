import "server-only";
import { Resend } from "resend";
import { SITE_URL } from "@/lib/config";
import { env } from "@/lib/env";
import type {
  ContactMessageInput,
  ContactMessageResult,
} from "@/lib/validators/contact";

let resend: Resend | null = null;

/**
 * Sends one Contact message to `CONTACT_FORM_TO` through Resend, as plain
 * text, with the visitor's address as Reply-To so he answers by hitting
 * Reply. Never throws: an unset key or a refused send is `failed`, and the
 * page then offers his address instead. Nothing here logs what the visitor
 * wrote or who they are.
 */
export async function sendContactMessage(
  input: ContactMessageInput,
): Promise<ContactMessageResult> {
  if (!env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY is unset; message not sent");
    return { ok: false, reason: "failed" };
  }
  resend ??= new Resend(env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: env.CONTACT_FORM_FROM,
      to: env.CONTACT_FORM_TO,
      replyTo: input.email,
      subject: `Website message from ${input.name}`,
      text: [
        input.message,
        "",
        "—",
        `${input.name} <${input.email}>`,
        `Sent from the contact form on ${new URL(SITE_URL).host}. Reply to answer them.`,
      ].join("\n"),
    });
    if (error) {
      console.error(`[contact] Resend refused the send: ${error.name}`);
      return { ok: false, reason: "failed" };
    }
    return { ok: true };
  } catch {
    console.error("[contact] Resend unreachable");
    return { ok: false, reason: "failed" };
  }
}
