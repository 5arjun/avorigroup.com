import { createServerFn } from "@tanstack/react-start";

export type ContactFormData = {
  name: string;
  phone: string;
  instagram?: string;
  service: string;
  date: string;
  group?: string;
  message?: string;
};

export const submitContactForm = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const data = ctx.data as ContactFormData;
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY is not set");

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="border-bottom:2px solid #000;padding-bottom:12px;">New Inquiry — Neel2k Concierge</h2>
        <table style="width:100%;border-collapse:collapse;margin-top:16px;">
          <tr><td style="padding:8px 0;color:#666;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;">${data.name}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Phone</td><td style="padding:8px 0;">${data.phone}</td></tr>
          ${data.instagram ? `<tr><td style="padding:8px 0;color:#666;">Instagram</td><td style="padding:8px 0;">${data.instagram}</td></tr>` : ""}
          <tr><td style="padding:8px 0;color:#666;">Service</td><td style="padding:8px 0;">${data.service}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Date</td><td style="padding:8px 0;">${data.date}</td></tr>
          ${data.group ? `<tr><td style="padding:8px 0;color:#666;">Group size</td><td style="padding:8px 0;">${data.group}</td></tr>` : ""}
        </table>
        ${data.message ? `<div style="margin-top:20px;padding:16px;background:#f5f5f5;border-radius:8px;"><p style="color:#666;margin:0 0 8px;">Message</p><p style="margin:0;">${data.message}</p></div>` : ""}
        <p style="margin-top:24px;font-size:12px;color:#999;">Sent from suncoastconcierge.com contact form</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:    "Neel2k Concierge <onboarding@resend.dev>",
        to:      ["arjunpat107@gmail.com"],
        subject: `New inquiry from ${data.name} — ${data.service}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend error: ${err}`);
    }

    return { ok: true };
  });
