import { createServerFn } from '@tanstack/react-start';
import { resend } from '@/lib/resend';

export type ContactFormData = {
  name: string;
  phone: string;
  instagram?: string;
  service: string;
  date: string;
  group?: string;
  message?: string;
};

export const submitContactForm = createServerFn({ method: 'POST' }).handler(
  async ({ data }: { data: ContactFormData }) => {
    const { name, phone, instagram, service, date, group, message } = data;

    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['arjunpat107@gmail.com'],
      subject: `New inquiry — ${service} — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="border-bottom:2px solid #000;padding-bottom:12px;">New Inquiry — Neel2k Concierge</h2>
          <table style="width:100%;border-collapse:collapse;margin-top:16px;">
            <tr><td style="padding:8px 0;color:#666;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Phone</td><td style="padding:8px 0;">${phone}</td></tr>
            ${instagram ? `<tr><td style="padding:8px 0;color:#666;">Instagram</td><td style="padding:8px 0;">${instagram}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#666;">Service</td><td style="padding:8px 0;">${service}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Date</td><td style="padding:8px 0;">${date}</td></tr>
            ${group ? `<tr><td style="padding:8px 0;color:#666;">Group size</td><td style="padding:8px 0;">${group}</td></tr>` : ''}
          </table>
          ${message ? `<div style="margin-top:20px;padding:16px;background:#f5f5f5;border-radius:8px;"><p style="color:#666;margin:0 0 8px;">Message</p><p style="margin:0;">${message}</p></div>` : ''}
          <p style="margin-top:24px;font-size:12px;color:#999;">Sent from neel2k.com contact form</p>
        </div>
      `,
    });

    if (error) throw new Error(error.message);

    return { ok: true };
  },
);
