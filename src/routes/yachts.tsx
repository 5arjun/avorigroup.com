import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { InventoryAccordion } from "@/components/site/InventoryAccordion";
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
        <InventoryAccordion items={yachts} ctaLabel="Inquire about this yacht" />
      </section>
    </PageShell>
  );
}
