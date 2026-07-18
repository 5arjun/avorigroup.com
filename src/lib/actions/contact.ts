import { createServerFn } from '@tanstack/react-start';
import { resend } from '@/lib/resend';

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  service: string;
  date: string;
  group?: string;
  message?: string;
};

const VALID_SERVICES = ["Yacht charter", "Exotic car", "VIP access", "Full weekend"] as const;

// HTML5/WHATWG email regex — practical validation, not full RFC 5322.
const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/** Strip every HTML tag and trim whitespace. */
function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

/** Escape characters that are special in HTML to prevent XSS in the email template. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function sanitize(value: string, maxLen = 500): string {
  return escapeHtml(stripHtml(value)).slice(0, maxLen);
}

function validateAndSanitize(raw: ContactFormData): ContactFormData {
  // ── name ──────────────────────────────────────────────────────────────────
  const name = sanitize(raw.name, 100);
  if (!name || name.length < 2) throw new Error("Name must be at least 2 characters.");

  // ── email ─────────────────────────────────────────────────────────────────
  const emailClean = stripHtml(raw.email).trim().toLowerCase();
  if (!emailClean || emailClean.length > 254 || !EMAIL_RE.test(emailClean))
    throw new Error("Please enter a valid email address.");
  const email = escapeHtml(emailClean);

  // ── phone ─────────────────────────────────────────────────────────────────
  // Allow digits, spaces, +, -, (, ) — strip everything else, then validate length
  const phoneClean = stripHtml(raw.phone).replace(/[^\d\s+\-().]/g, "").trim();
  const digitsOnly = phoneClean.replace(/\D/g, "");
  if (digitsOnly.length < 7 || digitsOnly.length > 15)
    throw new Error("Phone number must be between 7 and 15 digits.");
  const phone = escapeHtml(phoneClean);

  // ── instagram (optional) ──────────────────────────────────────────────────
  let instagram: string | undefined;
  if (raw.instagram) {
    const igRaw = sanitize(raw.instagram, 40);
    // Allow only alphanumeric, underscores, dots, and a leading @
    const igClean = igRaw.replace(/[^a-zA-Z0-9_.@]/g, "");
    instagram = igClean || undefined;
  }

  // ── service ───────────────────────────────────────────────────────────────
  const service = VALID_SERVICES.find(
    (s) => s.toLowerCase() === (raw.service ?? "").toLowerCase()
  );
  if (!service) throw new Error("Invalid service selection.");

  // ── date ──────────────────────────────────────────────────────────────────
  const dateStr = stripHtml(raw.date).trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) throw new Error("Invalid date format.");
  const parsedDate = new Date(dateStr);
  if (isNaN(parsedDate.getTime())) throw new Error("Invalid date.");
  // Must not be in the past (allow today)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (parsedDate < today) throw new Error("Date cannot be in the past.");
  const date = dateStr;

  // ── group size (optional) ─────────────────────────────────────────────────
  let group: string | undefined;
  if (raw.group) {
    const groupNum = parseInt(stripHtml(raw.group), 10);
    if (isNaN(groupNum) || groupNum < 1 || groupNum > 500)
      throw new Error("Group size must be a number between 1 and 500.");
    group = String(groupNum);
  }

  // ── message (optional) ────────────────────────────────────────────────────
  const message = raw.message ? sanitize(raw.message, 2000) : undefined;

  return { name, email, phone, instagram, service, date, group, message };
}

export const submitContactForm = createServerFn({ method: 'POST' })
  .inputValidator((data: ContactFormData) => data)
  .handler(async ({ data }) => {
    const { name, email, phone, instagram, service, date, group, message } =
      validateAndSanitize(data);

    const { error } = await resend.emails.send({
      from: 'concierge@send.avorigroup.com',
      to: ['hello@avorigroup.com'],
      replyTo: email,
      subject: `New inquiry - ${service} - ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="border-bottom:2px solid #3e7a80;padding-bottom:12px;">New Inquiry &mdash; Avori Group</h2>
          <table style="width:100%;border-collapse:collapse;margin-top:16px;">
            <tr><td style="padding:8px 0;color:#666;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;">${email}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Phone</td><td style="padding:8px 0;">${phone}</td></tr>
            ${instagram ? `<tr><td style="padding:8px 0;color:#666;">Instagram</td><td style="padding:8px 0;">${instagram}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#666;">Service</td><td style="padding:8px 0;">${service}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Date</td><td style="padding:8px 0;">${date}</td></tr>
            ${group ? `<tr><td style="padding:8px 0;color:#666;">Group size</td><td style="padding:8px 0;">${group}</td></tr>` : ''}
          </table>
          ${message ? `<div style="margin-top:20px;padding:16px;background:#f5f5f5;border-radius:8px;"><p style="color:#666;margin:0 0 8px;">Message</p><p style="margin:0;">${message}</p></div>` : ''}
          <p style="margin-top:24px;font-size:12px;color:#999;">Sent from avorigroup.com contact form</p>
        </div>
      `,
    });

    if (error) throw new Error(error.message);

    return { ok: true };
  });
