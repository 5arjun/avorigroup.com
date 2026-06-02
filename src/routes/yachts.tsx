import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { InventoryAccordion } from "@/components/site/InventoryAccordion";
import { InventoryFilters, type FilterGroup } from "@/components/site/InventoryFilters";
import { yachts } from "@/lib/inventory";
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
  const [query, setQuery] = useState("");
  const [values, setValues] = useState<Record<string, string>>({ length: "all", guests: "all" });

  const getFact = (item: (typeof yachts)[number], label: string) =>
    item.facts.find((f) => f.label === label)?.value ?? "";
  const lengthFt = (item: (typeof yachts)[number]) =>
    parseInt(getFact(item, "Length"), 10) || 0;
  const guestsNum = (item: (typeof yachts)[number]) =>
    parseInt(getFact(item, "Guests"), 10) || 0;

  const groups: FilterGroup[] = [
    {
      id: "length",
      label: "Length",
      options: [
        { label: "Any length", value: "all" },
        { label: "Up to 70 ft", value: "0-70" },
        { label: "70 – 90 ft", value: "70-90" },
        { label: "90 – 110 ft", value: "90-110" },
        { label: "110 ft and up", value: "110-999" },
      ],
    },
    {
      id: "guests",
      label: "Guests",
      options: [
        { label: "Any size", value: "all" },
        { label: "Up to 10", value: "0-10" },
        { label: "11 – 12", value: "11-12" },
        { label: "13+", value: "13-999" },
      ],
    },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return yachts.filter((y) => {
      if (q && !`${y.name} ${y.tagline}`.toLowerCase().includes(q)) return false;
      const ranges: Record<string, [number, number]> = {} as never;
      for (const g of groups) {
        const v = values[g.id];
        if (v && v !== "all") {
          const [min, max] = v.split("-").map(Number);
          ranges[g.id] = [min, max];
        }
      }
      if (ranges.length && (lengthFt(y) < ranges.length[0] || lengthFt(y) > ranges.length[1])) return false;
      if (ranges.guests && (guestsNum(y) < ranges.guests[0] || guestsNum(y) > ranges.guests[1])) return false;
      return true;
    });
  }, [query, values]);

  return (
    <PageShell ctaLabel="Request Availability">
      <section className="container-luxe pt-16 md:pt-24">
        <div className="max-w-3xl">
          <p className="eyebrow">Fleet · 12 vessels</p>
          <h1 className="mt-4 text-5xl md:text-7xl">Yachts</h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Sport yachts, sun-deck cruisers, and full-crew superyachts — each with provisioning,
            water toys, and slip-side service handled. Open a card to view the gallery.
          </p>
          <Link to="/contact" className="btn-primary mt-8">Request Availability</Link>
        </div>
      </section>

      <div className="hairline my-16 md:my-20" />

      <section className="container-luxe">
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
            <InventoryAccordion items={filtered} ctaLabel="Inquire about this yacht" />
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
