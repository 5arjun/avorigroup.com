import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Instagram, MessageCircle, Check, Loader2 } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { submitContactForm, type ContactFormData } from "@/lib/actions/contact";

const SERVICE_OPTIONS = ["Yacht charter", "Exotic car", "VIP access", "Full weekend"] as const;
type ServiceOption = (typeof SERVICE_OPTIONS)[number];

function normaliseService(raw: string | undefined): ServiceOption {
  if (!raw) return "Yacht charter";
  const match = SERVICE_OPTIONS.find(
    (o) => o.toLowerCase() === raw.toLowerCase()
  );
  return match ?? "Yacht charter";
}

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: typeof search.service === "string" ? search.service : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact Neel2k Miami Concierge \u2014 Book Yachts, Cars & VIP" },
      { name: "description", content: "Contact Neel2k to book a Miami yacht charter, exotic car rental, or VIP table. Call, WhatsApp, Instagram DM, or send an inquiry \u2014 reply within the hour." },
      { property: "og:title", content: "Contact Neel2k Miami Concierge" },
      { property: "og:description", content: "Direct line, WhatsApp, and Instagram DM, pick your channel. Reply within the hour." },
      { property: "og:url", content: "/contact" },
      { name: "twitter:title", content: "Contact Neel2k Miami" },
      { name: "twitter:description", content: "Book Miami yachts, exotic cars, and VIP nightlife, reply within the hour." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Neel2k Miami",
          mainEntity: {
            "@type": "LocalBusiness",
            name: "Neel2k",
            telephone: "+1-305-555-0199",
            areaServed: "Miami",
          },
        }),
      },
    ],
  }),
  component: ContactPage,
});

// Client-side field-level validation — mirrors server rules
function validateForm(fd: FormData): string | null {
  const name = (fd.get("name") as string ?? "").trim();
  if (name.length < 2) return "Name must be at least 2 characters.";

  const phone = (fd.get("phone") as string ?? "").trim();
  // Reject anything that isn't digits, spaces, +, -, (, )
  if (/[^\d\s+\-().]/.test(phone))
    return "Phone number may only contain digits, spaces, and + - ( ) characters.";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15)
    return "Phone number must be between 7 and 15 digits.";

  const date = (fd.get("date") as string ?? "").trim();
  if (!date) return "Please select a desired date.";
  const parsed = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (isNaN(parsed.getTime()) || parsed < today)
    return "Please choose a date that is today or in the future.";

  const group = (fd.get("group") as string ?? "").trim();
  if (group) {
    const n = parseInt(group, 10);
    if (isNaN(n) || String(n) !== group || n < 1 || n > 500)
      return "Group size must be a whole number between 1 and 500.";
  }

  return null;
}

function ContactPage() {
  const { service: rawService } = Route.useSearch();
  const defaultService = normaliseService(rawService);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);

    const clientError = validateForm(fd);
    if (clientError) {
      setStatus("error");
      setErrorMsg(clientError);
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const data: ContactFormData = {
      name:      (fd.get("name")      as string).trim(),
      phone:     (fd.get("phone")     as string).trim(),
      instagram: (fd.get("instagram") as string).trim() || undefined,
      service:   fd.get("service")   as string,
      date:      fd.get("date")      as string,
      group:     (fd.get("group")    as string).trim() || undefined,
      message:   (fd.get("message")  as string).trim() || undefined,
    };

    try {
      await submitContactForm({ data });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <PageShell ctaLabel="Call Concierge">
      <section className="container-luxe pt-16 md:pt-24">
        <div className="max-w-3xl">
          <p className="eyebrow">Concierge will reply as soon as possible</p>
          <h1 className="mt-4 text-5xl md:text-7xl">Let's plan it.</h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Share the date, group size, and what you'd like to do. We'll come back with
            availability, options, and a single price.
          </p>
        </div>
      </section>

      <section className="container-luxe mt-14 grid gap-10 md:mt-20 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-border bg-card p-7 md:p-10">
          {status === "success" ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-primary-foreground">
                <Check size={22} />
              </span>
              <h2 className="mt-6 text-3xl">Received.</h2>
              <p className="mt-3 max-w-sm text-muted-foreground">
                Your concierge will reply as soon as possible. For anything time-sensitive, call or text directly.
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              <Field
                label="Name"
                name="name"
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  required
                  maxLength={20}
                  autoComplete="tel"
                  placeholder="+1 305 000 0000"
                />
                <Field
                  label="Instagram"
                  name="instagram"
                  placeholder="@handle"
                  pattern="@?[a-zA-Z0-9_.]{1,30}"
                  maxLength={40}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField
                  label="Preferred service"
                  name="service"
                  options={SERVICE_OPTIONS as unknown as string[]}
                  defaultValue={defaultService}
                />
                <Field
                  label="Desired date"
                  name="date"
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <Field
                label="Group size"
                name="group"
                type="number"
                placeholder="e.g. 8"
                min="1"
                max="500"
              />
              <div>
                <label htmlFor="message" className="eyebrow">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  maxLength={2000}
                  placeholder="Tell us about the occasion, any preferences, add-ons"
                  className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-ink"
                />
              </div>
              {status === "error" && (
                <p role="alert" className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {errorMsg || "Something went wrong. Please try again or reach out directly."}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {status === "loading" ? (
                  <><Loader2 size={16} className="animate-spin" /> Sending&hellip;</>
                ) : "Send Inquiry"}
              </button>
              <p className="text-xs text-muted-foreground">We respond within the hour, 9am&ndash;11pm ET.</p>
            </div>
          )}
        </form>

        <aside className="flex flex-col gap-4">
          <DirectLink href="tel:+13055550199" icon={<Phone size={18} />} label="Call Concierge" value="+1 (305) 555-0199" />
          <DirectLink href="sms:+13055550199" icon={<MessageCircle size={18} />} label="iMessage / SMS" value="Text us directly" />
          <DirectLink href="https://wa.me/13055550199" icon={<MessageCircle size={18} />} label="WhatsApp" value="Message on Whatsapp" />
          <DirectLink href="https://instagram.com/neel2k" icon={<Instagram size={18} />} label="Instagram DM" value="@neel2k" />
          <div className="mt-4 rounded-2xl bg-ink p-7 text-primary-foreground">
            <p className="eyebrow !text-primary-foreground/60">Office</p>
            <p className="mt-3 text-lg">Miami | Brickell & Beach</p>
            <p className="mt-1 text-sm text-primary-foreground/70">By appointment only.</p>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  pattern,
  minLength,
  maxLength,
  min,
  max,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  min?: string;
  max?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow">
        {label}{required && <span className="text-accent"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
        min={min}
        max={max}
        autoComplete={autoComplete}
        className="mt-2 h-12 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground outline-none transition-colors focus:border-ink"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow">{label}</label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="mt-2 h-12 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-ink"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function DirectLink({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
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
