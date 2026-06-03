import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Instagram, MessageCircle, Check, Loader2 } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";

// Web3Forms public access key — safe to expose in client code.
// Get your own free key at https://web3forms.com
const WEB3FORMS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Neel2k Miami Concierge — Book Yachts, Cars & VIP" },
      { name: "description", content: "Contact Neel2k to book a Miami yacht charter, exotic car rental, or VIP table. Call, iMessage, WhatsApp, Instagram DM, or send an inquiry — reply within the hour." },
      { property: "og:title", content: "Contact Neel2k Miami Concierge" },
      { property: "og:description", content: "Direct line, iMessage, WhatsApp, and Instagram DM — pick your channel. Reply within the hour." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const fd = new FormData(e.currentTarget);
    fd.append("access_key", WEB3FORMS_KEY);
    fd.append("from_name", "Neel2k Concierge Website");
    fd.append("subject", `New inquiry — ${fd.get("service")} — ${fd.get("name")}`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });
      const json = await res.json();
      setStatus(json.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <PageShell ctaLabel="Call Concierge">
      <section className="container-luxe pt-16 md:pt-24">
        <div className="max-w-3xl">
          <p className="eyebrow">Concierge · Reply within the hour</p>
          <h1 className="mt-4 text-5xl md:text-7xl">Let's plan it.</h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Share the date, group size, and what you'd like to do. We'll come back with
            availability, options, and a single price.
          </p>
        </div>
      </section>

      <section className="container-luxe mt-14 grid gap-10 md:mt-20 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-7 md:p-10">
          {status === "success" ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-primary-foreground">
                <Check size={22} />
              </span>
              <h2 className="mt-6 text-3xl">Received.</h2>
              <p className="mt-3 max-w-sm text-muted-foreground">
                Your concierge will reply within the hour. For anything time-sensitive, call or text directly.
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              <Field label="Name" name="name" required />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Phone" name="phone" type="tel" required />
                <Field label="Instagram" name="instagram" placeholder="@handle" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Select
                  label="Preferred service"
                  name="service"
                  options={["Yacht charter", "Exotic car", "VIP access", "Full weekend"]}
                />
                <Field label="Desired date" name="date" type="date" required />
              </div>
              <Field label="Group size" name="group" type="number" placeholder="e.g. 8" />
              <div>
                <label htmlFor="message" className="eyebrow">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about the occasion, any preferences, add-ons…"
                  className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-ink"
                />
              </div>
              {status === "error" && (
                <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  Something went wrong. Please try again or reach out directly.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {status === "loading" ? (
                  <><Loader2 size={16} className="animate-spin" /> Sending…</>
                ) : "Send Inquiry"}
              </button>
              <p className="text-xs text-muted-foreground">We respond within the hour, 10am–11pm ET.</p>
            </div>
          )}
        </form>

        <aside className="flex flex-col gap-4">
          <DirectLink href="tel:+13055550199" icon={<Phone size={18} />} label="Call Concierge" value="+1 (305) 555-0199" />
          <DirectLink href="sms:+13055550199" icon={<MessageCircle size={18} />} label="iMessage / Text" value="Reply within the hour" />
          <DirectLink href="https://wa.me/13055550199" icon={<MessageCircle size={18} />} label="WhatsApp" value="Reply within the hour" />
          <DirectLink href="https://instagram.com/neel2k" icon={<Instagram size={18} />} label="Instagram DM" value="@neel2k" />

          <div className="mt-4 rounded-2xl bg-ink p-7 text-primary-foreground">
            <p className="eyebrow !text-primary-foreground/60">Office</p>
            <p className="mt-3 text-lg">Miami · Brickell & Beach</p>
            <p className="mt-1 text-sm text-primary-foreground/70">By appointment only.</p>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}

function Field({ label, name, type = "text", required, placeholder }: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow">
        {label}{required && <span className="text-accent"> *</span>}
      </label>
      <input
        id={name} name={name} type={type} required={required} placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground outline-none transition-colors focus:border-ink"
      />
    </div>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow">{label}</label>
      <select
        id={name} name={name}
        className="mt-2 h-12 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-ink"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function DirectLink({ href, icon, label, value }: {
  href: string; icon: React.ReactNode; label: string; value: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-ink/30"
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-primary-foreground transition-colors group-hover:bg-accent">
        {icon}
      </span>
      <span className="flex-1">
        <span className="block text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
        <span className="mt-1 block text-base text-ink">{value}</span>
      </span>
    </a>
  );
}
