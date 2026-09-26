import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { InventoryAccordion } from "@/components/site/InventoryAccordion";
import { InventoryFilters, type FilterGroup } from "@/components/site/InventoryFilters";
import { cars } from "@/lib/inventory";
import { abs, OG_IMAGES, BASE_URL } from "@/lib/seo";
import heroCarLineup from "@/assets/miami-cars-lineup.jpg";

export const Route = createFileRoute("/cars")({
  head: () => ({
    meta: [
      { title: "Exotic & Luxury Car Rentals Miami - Ferrari, Lamborghini, Rolls-Royce · Avori Group" },
      { name: "description", content: "Rent a Ferrari, Lamborghini, McLaren, Rolls-Royce, Porsche or AMG in Miami. Self-drive or chauffeured - delivered to your hotel, residence, or marina." },
      { property: "og:title", content: "Exotic & Luxury Car Rentals in Miami - Avori Group" },
      { property: "og:description", content: "Curated Miami exotic fleet - Ferrari, Lamborghini, McLaren, Porsche, Rolls-Royce, AMG. Delivered to you." },
      { property: "og:url", content: abs("/cars") },
      { property: "og:image", content: OG_IMAGES.cars },
      { name: "twitter:title", content: "Miami Exotic Car Rentals - Avori Group" },
      { name: "twitter:description", content: "Ferrari, Lamborghini, McLaren, Rolls-Royce - delivered anywhere in Miami." },
      { name: "twitter:image", content: OG_IMAGES.cars },
    ],
    links: [{ rel: "canonical", href: abs("/cars") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Exotic & Luxury Car Rental",
          areaServed: { "@type": "City", name: "Miami" },
          provider: { "@type": "LocalBusiness", name: "Avori Group", url: BASE_URL },
          name: "Miami Exotic & Luxury Car Rentals",
          url: abs("/cars"),
        }),
      },
      {
        // BreadcrumbList — shows path in SERP: Avori Group > Cars
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "Cars", item: abs("/cars") },
          ],
        }),
      },
    ],
  }),
  component: CarsPage,
});

function CarsPage() {
  const [query, setQuery] = useState("");
  const [values, setValues] = useState<Record<string, string>>({ category: "all", brand: "all" });

  const getFact = (item: (typeof cars)[number], label: string) =>
    item.facts.find((f) => f.label === label)?.value ?? "";
  const brandOf = (item: (typeof cars)[number]) => item.name.split(" ")[0];

  const categories = Array.from(new Set(cars.map((c) => getFact(c, "Category")))).sort();
  const brands = Array.from(new Set(cars.map(brandOf))).sort();

  const groups: FilterGroup[] = [
    {
      id: "category",
      label: "Category",
      options: [
        { label: "All categories", value: "all" },
        ...categories.map((c) => ({ label: c, value: c })),
      ],
    },
    {
      id: "brand",
      label: "Brand",
      options: [
        { label: "All brands", value: "all" },
        ...brands.map((b) => ({ label: b, value: b })),
      ],
    },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cars.filter((c) => {
      if (q && !`${c.name} ${c.tagline}`.toLowerCase().includes(q)) return false;
      if (values.category !== "all" && getFact(c, "Category") !== values.category) return false;
      if (values.brand !== "all" && brandOf(c) !== values.brand) return false;
      return true;
    });
  }, [query, values]);

  return (
    <PageShell ctaLabel="Request Availability" service="Exotic car">
      <section className="relative isolate overflow-hidden">
        {/* Mobile: full-width band above the text, fading down into the page background */}
        <div className="relative h-48 w-full sm:h-56 md:hidden">
          <img
            src={heroCarLineup}
            alt="Lineup of exotic Lamborghinis delivered for a Miami rental"
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/55 to-background" />
        </div>
        {/* Desktop: backdrop fills the right side, behind the text */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] md:block">
          <img
            src={heroCarLineup}
            alt="Lineup of exotic Lamborghinis delivered for a Miami rental"
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>
        <div className="container-luxe relative pt-6 pb-6 md:pt-24 md:pb-8">
          <div className="max-w-3xl">
            <p className="eyebrow">Garage · 42 vehicles</p>
            <h1 className="mt-4 text-5xl md:text-7xl">Cars</h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              Marquee exotics and luxury daily-drivers, delivered to your hotel, residence,
              or marina. Insurance, fuel, and chauffeur options arranged on request.
            </p>
            <Link to="/contact" search={{ service: "Exotic car" }} className="btn-primary mt-8">Request Availability</Link>
          </div>
        </div>
      </section>

      <div className="hairline my-6 md:my-8" />

      <section className="container-luxe">
        <InventoryFilters
          groups={groups}
          values={values}
          onChange={(id, v) => setValues((p) => ({ ...p, [id]: v }))}
          query={query}
          onQueryChange={setQuery}
          resultCount={filtered.length}
          totalCount={cars.length}
        />
        <div className="mt-5">
          {filtered.length > 0 ? (
            <InventoryAccordion items={filtered} ctaLabel="Inquire about this car" service="Exotic car" />
          ) : (
            <p className="rounded-2xl border border-border bg-card/40 p-10 text-center text-muted-foreground">
              No cars match those filters. Try widening your search.
            </p>
          )}
        </div>
      </section>
    </PageShell>
  );
}
