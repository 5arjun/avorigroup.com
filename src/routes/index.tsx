import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles, Anchor, Car, Wine, ShieldCheck, Clock, Users, Compass } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { yachts, cars } from "@/lib/inventory";
import { abs, OG_IMAGES, BASE_URL } from "@/lib/seo";
import heroHome from "@/assets/hero-home.jpg";
import heroCar from "@/assets/hero-car.jpg";
import heroYachtImg from "@/assets/hero-yacht.jpg";
import heroVip from "@/assets/hero-vip.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Avori Group - Yacht Charters, Exotic Car Rentals & VIP" },
      { name: "description", content: "Private yacht charters, exotic car rentals, and VIP nightlife access in Miami - curated end-to-end by a single trusted concierge. Reply within the hour." },
      { property: "og:title", content: "Avori Group - Miami Yacht Charters, Exotic Cars & VIP Access" },
      { property: "og:description", content: "One Miami concierge for private yachts, exotic cars, and the city's most coveted rooms." },
      { property: "og:url", content: abs("/") },
      { property: "og:image", content: OG_IMAGES.home },
      { name: "twitter:title", content: "Avori Group - Miami Luxury Concierge" },
      { name: "twitter:description", content: "Yacht charters, exotic car rentals, and VIP nightlife - Miami, end-to-end." },
      { name: "twitter:image", content: OG_IMAGES.home },
    ],
    links: [{ rel: "canonical", href: abs("/") }],
    scripts: [
      {
        // FAQPage schema — can show Q&A accordion directly in Google SERP
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How far in advance should I book a yacht charter in Miami?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We recommend inquiring at least 48–72 hours in advance for standard charters. For superyachts or busy holiday weekends, 1–2 weeks is ideal. Last-minute requests are always welcome — we respond within the hour.",
              },
            },
            {
              "@type": "Question",
              name: "Do you deliver exotic cars to hotels in Miami?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. We deliver to any Miami hotel, private residence, marina, or airport. Chauffeur options are also available on request.",
              },
            },
            {
              "@type": "Question",
              name: "Can I bundle a yacht charter with a car rental and VIP nightlife?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Absolutely — that's exactly what we specialize in. We coordinate all three through a single concierge so nothing falls between providers. Tell us your weekend and we'll build the full itinerary.",
              },
            },
            {
              "@type": "Question",
              name: "What areas of Miami do you serve?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We serve all of Greater Miami including South Beach, Brickell, Wynwood, Coconut Grove, Miami Beach, and the surrounding waters for yacht charters.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell ctaLabel="Book Now">
      {/* HERO */}
      <section className="relative -mt-16 h-[100svh] min-h-[640px] w-full overflow-hidden md:-mt-20">
        <img
          src={heroHome}
          alt="Luxury yacht cruising Miami waters at golden hour"
          fetchPriority="high"
          loading="eager"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/85" />
        <div className="container-luxe relative flex h-full flex-col justify-end pb-16 pt-32 text-primary-foreground md:pb-24">
          <div className="reveal max-w-3xl">
            <p className="eyebrow !text-primary-foreground/80">Miami · By Appointment</p>
            <h1 className="mt-5 text-5xl leading-[1.02] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              The Miami you<br />
              <span className="italic text-primary-foreground/90">were promised.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-primary-foreground/80 md:text-lg">
              Private yacht charters and exotic vehicles, arranged through a single
              concierge. VIP rooms after dark, when the occasion calls for it.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact" search={{ service: "Full weekend" }} className="btn-primary bg-primary-foreground !text-ink hover:!bg-accent hover:!text-primary-foreground">
                Request Availability <ArrowUpRight size={16} />
              </Link>
              <Link to="/yachts" className="btn-ghost text-primary-foreground">
                Explore Fleet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE SPLIT */}
      <section className="container-luxe py-24 md:py-36">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Two signatures</p>
            <h2 className="mt-3 max-w-2xl text-4xl md:text-5xl">By day, on the water. By night, on the road.</h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground md:text-right">
            Choose your channel. Each route opens directly to a curated, on-call inventory.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <ServiceCard
            to="/yachts"
            tag="01 · Yachts"
            title="Private Charters"
            copy="Sport-yachts, sun-deck cruisers, and full-crew superyachts. Half-day to overnight."
            image={heroYachtImg}
            imageAlt="Private yacht charter Miami - sport cruisers and superyachts"
            icon={<Anchor size={18} />}
          />
          <ServiceCard
            to="/cars"
            tag="02 · Cars"
            title="Exotic & Luxury Fleet"
            copy="Cullinan, Urus, 296 GTB, G-Wagons, soft-tops. Delivered to your door."
            image={heroCar}
            imageAlt="Exotic and luxury car rental Miami - Ferrari, Lamborghini, Rolls-Royce"
            icon={<Car size={18} />}
          />
        </div>
      </section>

      {/* VIP add-on */}
      <section className="bg-slate-900 text-primary-foreground">
        <div className="container-luxe grid items-center gap-12 py-24 md:grid-cols-2 md:py-32">
          <div className="relative aspect-[5/6] overflow-hidden rounded-2xl">
            <img
              src={heroVip}
              alt="Miami VIP nightlife - exclusive tables at LIV and E11EVEN"
              loading="lazy"
              width={800}
              height={960}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow !text-primary-foreground/60">Add-on</p>
            <h2 className="mt-3 text-4xl md:text-5xl">After dinner, the city opens.</h2>
            <p className="mt-5 max-w-md text-base text-primary-foreground/75 md:text-lg">
              When the night requires it, we hold tables at LIV, E11EVEN, Vendôme, and other clubs you won't find on a guestlist. Bundle it with your day.
            </p>
            <div className="mt-8 flex gap-3">
              <Link to="/vip-access" className="btn-primary bg-primary-foreground !text-ink hover:!bg-accent hover:!text-primary-foreground">
                See the rooms
              </Link>
              <Link to="/contact" search={{ service: "VIP access" }} className="btn-ghost text-primary-foreground">Inquire</Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="container-luxe py-24 md:py-36">
        <div className="mb-16 max-w-2xl">
          <p className="eyebrow">Why Avori Group</p>
          <h2 className="mt-3 text-4xl md:text-5xl">One concierge. The full city. Your lifestyle elevated.</h2>
        </div>

        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          <Why icon={<Sparkles size={18} />} title="One contact, end to end">
            Yachts, vehicles, dinner, nightlife - coordinated through a single line so nothing falls between providers.
          </Why>
          <Why icon={<Clock size={18} />} title="Hour-fast responses">
            Availability, pricing, and confirmations within sixty minutes of your inquiry. Often faster.
          </Why>
          <Why icon={<Compass size={18} />} title="Curated, not catalogued">
            Every captain, vendor, and room on our roster is one we use ourselves. No third-party booking sites.
          </Why>
          <Why icon={<Users size={18} />} title="Group-ready logistics">
            Bachelor & bachelorette weekends, birthdays, corporate retreats - vehicles, slip transfers, and tables handled in one brief.
          </Why>
          <Why icon={<ShieldCheck size={18} />} title="Discreet by default">
            Private channels, NDAs on request, and a staff trained in confidentiality. No social tagging unless you ask.
          </Why>
          <Why icon={<Wine size={18} />} title="On-board, on-call">
            Provisioning, photographers, chefs, water toys - whatever the day requires, queued before you board.
          </Why>
        </div>
      </section>

      {/* FEATURED PREVIEW */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="container-luxe">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Featured · Yachts</p>
              <h2 className="mt-3 text-3xl md:text-4xl">A glance at the marina.</h2>
            </div>
            <Link to="/yachts" className="hidden text-xs uppercase tracking-[0.22em] text-ink hover:text-accent md:inline-flex items-center gap-2">
              See all 12 <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {yachts.slice(0, 3).map((y) => (
              <PreviewCard key={y.id} title={y.name} tagline={y.tagline} image={y.cover} to="/yachts" type="yacht" />
            ))}
          </div>

          <div className="mt-20 mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Featured · Cars</p>
              <h2 className="mt-3 text-3xl md:text-4xl">In the garage right now.</h2>
            </div>
            <Link to="/cars" className="hidden text-xs uppercase tracking-[0.22em] text-ink hover:text-accent md:inline-flex items-center gap-2">
              See all 12 <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cars.slice(0, 3).map((c) => (
              <PreviewCard key={c.id} title={c.name} tagline={c.tagline} image={c.cover} to="/cars" type="car" />
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="container-luxe py-28 text-center md:py-40">
        <p className="eyebrow">Begin</p>
        <h2 className="mx-auto mt-3 max-w-3xl text-4xl md:text-6xl">
          Tell us the weekend. <span className="italic">We'll build the rest.</span>
        </h2>
        <div className="mt-10">
          <Link to="/contact" search={{ service: "Full weekend" }} className="btn-primary">Request Availability</Link>
        </div>
      </section>
    </PageShell>
  );
}

function ServiceCard({ to, tag, title, copy, image, imageAlt, icon }: {
  to: "/yachts" | "/cars"; tag: string; title: string; copy: string; image: string; imageAlt: string; icon: React.ReactNode;
}) {
  return (
    <Link to={to} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-ink">
      <img src={image} alt={imageAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-[1.4s] ease-out group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      <div className="relative flex h-full flex-col justify-between p-7 text-primary-foreground md:p-10">
        <div className="flex items-center justify-between">
          <span className="eyebrow !text-primary-foreground/70">{tag}</span>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/40">{icon}</span>
        </div>
        <div>
          <h3 className="text-4xl md:text-5xl">{title}</h3>
          <p className="mt-3 max-w-xs text-sm text-primary-foreground/80">{copy}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-primary-foreground transition-all group-hover:gap-3">
            Enter <ArrowUpRight size={14} />
          </p>
        </div>
      </div>
    </Link>
  );
}

function Why({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-primary-foreground">{icon}</span>
      <h3 className="mt-5 text-2xl">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

function PreviewCard({ title, tagline, image, to, type }: { title: string; tagline: string; image: string; to: "/yachts" | "/cars"; type: "yacht" | "car"; }) {
  const altText = type === "yacht"
    ? `${title} - Private Yacht Charter Miami`
    : `${title} - Exotic Car Rental Miami`;
  return (
    <Link to={to} className="group block overflow-hidden rounded-xl bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={image} alt={altText} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
      </div>
      <div className="p-5">
        <h3 className="text-xl text-ink">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{tagline}</p>
      </div>
    </Link>
  );
}
