import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { InventoryFilters, type FilterGroup } from "@/components/site/InventoryFilters";
import { YachtModal } from "@/components/site/YachtModal";
import { yachts } from "@/lib/inventory";
import type { InventoryItem } from "@/lib/inventory";
import heroYacht from "@/assets/hero-yacht.jpg";

export const Route = createFileRoute("/yachts")({
  head: () => ({
    meta: [
      { title: "Miami Yacht Charters — Private Fleet from 50ft to 130ft · Neel2k" },
      { name: "description", content: "Charter a private yacht in Miami — Sunseeker, Pershing, Ferretti, Azimut and more. Half-day, sunset, and overnight charters with full crew." },
      { property: "og:title", content: "Private Yacht Charters in Miami — Neel2k" },
      { property: "og:description", content: "Hand-picked Miami yachts from 50ft sport cruisers to 130ft superyachts. Full crew, full discretion." },
      { property: "og:url", content: "/yachts" },
      { property: "og:image", content: heroYacht },
      { name: "twitter:title", content: "Miami Yacht Charters — Neel2k" },
      { name: "twitter:description", content: "Private yacht charters across Miami — full crew, fully curated." },
      { name: "twitter:image", content: heroYacht },
    ],
    links: [{ rel: "canonical", href: "/yachts" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Private Yacht Charter",
          areaServed: { "@type": "City", name: "Miami" },
          provider: { "@type": "LocalBusiness", name: "Neel2k" },
          name: "Miami Private Yacht Charters",
        }),
      },
    ],
  }),
  component: YachtsPage,
});

function YachtsPage() {
  const [query, setQuery]   = useState("");
  const [values, setValues] = useState<Record<string, string>>({ length: "all", guests: "all" });
  const [selected, setSelected] = useState<InventoryItem | null>(null);

  const getFact = (item: (typeof yachts)[number], label: string) =>
    item.facts.find((f) => f.label === label)?.value ?? "";
  const lengthFt  = (item: (typeof yachts)[number]) => parseInt(getFact(item, "Length"), 10) || 0;
  const guestsNum = (item: (typeof yachts)[number]) => parseInt(getFact(item, "Guests"), 10) || 0;

  const groups: FilterGroup[] = [
    {
      id: "length",
      label: "Length",
      options: [
        { label: "Any length",   value: "all"     },
        { label: "Up to 70 ft",  value: "0-70"    },
        { label: "70 – 90 ft",   value: "70-90"   },
        { label: "90 – 110 ft",  value: "90-110"  },
        { label: "110 ft and up",value: "110-999" },
      ],
    },
    {
      id: "guests",
      label: "Guests",
      options: [
        { label: "Any size", value: "all"    },
        { label: "Up to 10", value: "0-10"  },
        { label: "11 – 12",  value: "11-12" },
        { label: "13+",      value: "13-999"},
      ],
    },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const parseRange = (v: string | undefined): [number, number] | null => {
      if (!v || v === "all") return null;
      const [min, max] = v.split("-").map(Number);
      return [min, max];
    };
    const lenRange = parseRange(values.length);
    const gstRange = parseRange(values.guests);
    return yachts.filter((y) => {
      if (q && !`${y.name} ${y.tagline}`.toLowerCase().includes(q)) return false;
      if (lenRange && (lengthFt(y) < lenRange[0] || lengthFt(y) > lenRange[1])) return false;
      if (gstRange && (guestsNum(y) < gstRange[0] || guestsNum(y) > gstRange[1])) return false;
      return true;
    });
  }, [query, values]);

  return (
    <PageShell ctaLabel="Request Availability">
      {/* Lightbox modal */}
      <YachtModal yacht={selected} onClose={() => setSelected(null)} />

      {/* ── Hero header ── */}
      <section className="container-luxe pt-16 md:pt-24">
        <div className="max-w-3xl">
          <p className="eyebrow">Fleet · {yachts.length} vessels</p>
          <h1 className="mt-4 text-5xl md:text-7xl">Yachts</h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Sport yachts, sun-deck cruisers, and full-crew superyachts — each with provisioning,
            water toys, and slip-side service handled. Tap any card to open the gallery.
          </p>
          <Link to="/contact" className="btn-primary mt-8">Request Availability</Link>
        </div>
      </section>

      <div className="hairline my-16 md:my-20" />

      {/* ── Filters + grid ── */}
      <section className="container-luxe pb-24">
        <InventoryFilters
          groups={groups}
          values={values}
          onChange={(id, v) => setValues((p) => ({ ...p, [id]: v }))}
          query={query}
          onQueryChange={setQuery}
          resultCount={filtered.length}
          totalCount={yachts.length}
        />

        <div className="mt-8">
          {filtered.length > 0 ? (
            <YachtGrid items={filtered} onSelect={setSelected} />
          ) : (
            <p className="rounded-2xl border border-border bg-card/40 p-10 text-center text-muted-foreground">
              No yachts match those filters. Try widening your search.
            </p>
          )}
        </div>
      </section>
    </PageShell>
  );
}

// ── Yacht card grid ────────────────────────────────────────────────────────
function YachtGrid({
  items,
  onSelect,
}: {
  items: InventoryItem[];
  onSelect: (y: InventoryItem) => void;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((yacht) => (
        <YachtCard key={yacht.id} yacht={yacht} onClick={() => onSelect(yacht)} />
      ))}
    </div>
  );
}

function YachtCard({
  yacht,
  onClick,
}: {
  yacht: InventoryItem;
  onClick: () => void;
}) {
  const hasVideo = yacht.gallery.some((m) => m.type === "video");

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View gallery for ${yacht.name}`}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card text-left transition duration-300 hover:border-ink/25 hover:shadow-[0_20px_50px_-20px_rgba(8,20,50,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
    >
      {/* Cover image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={yacht.cover}
          alt={yacht.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Video badge */}
        {hasVideo && (
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-white backdrop-blur-sm">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
            Video
          </span>
        )}

        {/* Gallery count */}
        <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm">
          {yacht.gallery.length} {yacht.gallery.length === 1 ? "photo" : "photos"}
        </span>
      </div>

      {/* Card body */}
      <div className="px-5 py-4">
        <h3 className="text-xl font-semibold text-ink">{yacht.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{yacht.tagline}</p>

        <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
          {yacht.facts.map((f) => (
            <div key={f.label} className="flex items-baseline gap-1.5">
              <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">{f.label}</dt>
              <dd className="text-sm font-medium text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>

        {/* Tap hint */}
        <p className="mt-4 text-xs text-muted-foreground/60 group-hover:text-muted-foreground transition">
          Tap to view gallery →
        </p>
      </div>
    </button>
  );
}
