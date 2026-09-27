import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { InventoryFilters, type FilterGroup } from "@/components/site/InventoryFilters";
import { YachtModal } from "@/components/site/YachtModal";
import { yachts } from "@/lib/inventory";
import type { InventoryItem } from "@/lib/inventory";
import { abs, OG_IMAGES, BASE_URL } from "@/lib/seo";
import heroYachtSunset from "@/assets/yacht-sunset-deck.jpg";

const yachtLengthFt = (item: InventoryItem) =>
  parseInt(item.facts.find((fact) => fact.label === "Length")?.value ?? "", 10) || 0;

export const Route = createFileRoute("/yachts")({
  head: () => ({
    meta: [
      { title: "Miami Yacht Charters - Private Fleet from 50ft to 130ft · Avori Group" },
      { name: "description", content: "Charter a private yacht in Miami - Sunseeker, Pershing, Ferretti, Azimut and more. Half-day, sunset, and overnight charters with full crew." },
      { property: "og:title", content: "Private Yacht Charters in Miami - Avori Group" },
      { property: "og:description", content: "Hand-picked Miami yachts from 50ft sport cruisers to 130ft superyachts. Full crew, full discretion." },
      { property: "og:url", content: abs("/yachts") },
      { property: "og:image", content: OG_IMAGES.yachts },
      { name: "twitter:title", content: "Miami Yacht Charters - Avori Group" },
      { name: "twitter:description", content: "Private yacht charters across Miami - full crew, fully curated." },
      { name: "twitter:image", content: OG_IMAGES.yachts },
    ],
    links: [{ rel: "canonical", href: abs("/yachts") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Private Yacht Charter",
          areaServed: { "@type": "City", name: "Miami" },
          provider: { "@type": "LocalBusiness", name: "Avori Group", url: BASE_URL },
          name: "Miami Private Yacht Charters",
          url: abs("/yachts"),
        }),
      },
      {
        // BreadcrumbList — shows path in SERP: Avori Group > Yachts
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home",   item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "Yachts", item: abs("/yachts") },
          ],
        }),
      },
    ],
  }),
  component: YachtsPage,
});

function YachtsPage() {
  const [query, setQuery]   = useState("");
  const [values, setValues] = useState<Record<string, string>>({ length: "all", order: "desc" });
  const [selected, setSelected] = useState<InventoryItem | null>(null);

  const groups: FilterGroup[] = [
    {
      id: "length",
      label: "Length",
      options: [
        { label: "Any length",   value: "all"     },
        { label: "Up to 70 ft",  value: "0-70"    },
        { label: "70 \u2013 90 ft",   value: "70-90"   },
        { label: "90 \u2013 110 ft",  value: "90-110"  },
        { label: "110 ft and up",value: "110-999" },
      ],
    },
    {
      id: "order",
      label: "Sort by length",
      defaultValue: "desc",
      options: [
        { label: "Descending (longest first)", value: "desc" },
        { label: "Ascending (shortest first)", value: "asc" },
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
    const matchingYachts = yachts.filter((y) => {
      if (q && !`${y.name} ${y.tagline}`.toLowerCase().includes(q)) return false;
      if (lenRange && (yachtLengthFt(y) < lenRange[0] || yachtLengthFt(y) > lenRange[1])) return false;
      return true;
    });

    const direction = values.order === "asc" ? 1 : -1;
    return matchingYachts.sort((a, b) => {
      const aLength = yachtLengthFt(a);
      const bLength = yachtLengthFt(b);
      if (aLength === 0) return bLength === 0 ? 0 : 1;
      if (bLength === 0) return -1;
      return direction * (aLength - bLength);
    });
  }, [query, values]);

  return (
    <PageShell ctaLabel="Request Availability" service="Yacht charter">
      {/* Lightbox modal */}
      <YachtModal yacht={selected} onClose={() => setSelected(null)} />

      {/* \u2500\u2500 Hero header \u2500\u2500 */}
      <section className="relative isolate overflow-hidden">
        {/* Mobile: full-width band above the text, fading down into the page background */}
        <div className="relative h-48 w-full sm:h-56 md:hidden">
          <img
            src={heroYachtSunset}
            alt="Sunset from a private yacht's aft deck off Miami"
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover object-[30%_50%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/55 to-background" />
        </div>
        {/* Desktop: backdrop fills the right side, behind the text */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] md:block">
          <img
            src={heroYachtSunset}
            alt="Sunset from a private yacht's aft deck off Miami"
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>
        <div className="container-luxe relative pt-6 pb-6 md:pt-24 md:pb-8">
          <div className="max-w-3xl">
            <p className="eyebrow">Fleet · {yachts.length} vessels</p>
            <h1 className="mt-4 text-5xl md:text-7xl">Yachts</h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              Sport yachts, sun-deck cruisers, and full-crew superyachts - each with provisioning,
              water toys, and slip-side service handled. Tap any card to open the gallery.
            </p>
            <Link to="/contact" search={{ service: "Yacht charter" }} className="btn-primary mt-8">Request Availability</Link>
          </div>
        </div>
      </section>

      <div className="hairline my-6 md:my-8" />

      {/* \u2500\u2500 Filters + grid \u2500\u2500 */}
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

        <div className="mt-5">
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
          alt={`${yacht.name} - Private Yacht Charter Miami`}
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
