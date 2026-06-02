import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { InventoryAccordion } from "@/components/site/InventoryAccordion";
import { cars } from "@/lib/inventory";
import heroCar from "@/assets/hero-car.jpg";

export const Route = createFileRoute("/cars")({
  head: () => ({
    meta: [
      { title: "Exotic & Luxury Car Rentals Miami — Ferrari, Lamborghini, Rolls-Royce · Neel2k" },
      { name: "description", content: "Rent a Ferrari, Lamborghini, McLaren, Rolls-Royce, Porsche or AMG in Miami. Self-drive or chauffeured — delivered to your hotel, residence, or marina." },
      { property: "og:title", content: "Exotic & Luxury Car Rentals in Miami — Neel2k" },
      { property: "og:description", content: "Curated Miami exotic fleet — Ferrari, Lamborghini, McLaren, Porsche, Rolls-Royce, AMG. Delivered to you." },
      { property: "og:url", content: "/cars" },
      { property: "og:image", content: heroCar },
      { name: "twitter:title", content: "Miami Exotic Car Rentals — Neel2k" },
      { name: "twitter:description", content: "Ferrari, Lamborghini, McLaren, Rolls-Royce — delivered anywhere in Miami." },
      { name: "twitter:image", content: heroCar },
    ],
    links: [{ rel: "canonical", href: "/cars" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Exotic & Luxury Car Rental",
          areaServed: { "@type": "City", name: "Miami" },
          provider: { "@type": "LocalBusiness", name: "Neel2k" },
          name: "Miami Exotic & Luxury Car Rentals",
        }),
      },
    ],
  }),
  component: CarsPage,
});

function CarsPage() {
  return (
    <PageShell ctaLabel="Request Availability">
      <section className="container-luxe pt-16 md:pt-24">
        <div className="max-w-3xl">
          <p className="eyebrow">Garage · 12 vehicles</p>
          <h1 className="mt-4 text-5xl md:text-7xl">Cars</h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Marquee exotics and luxury daily-drivers, delivered to your hotel, residence,
            or marina. Insurance, fuel, and chauffeur options arranged on request.
          </p>
          <Link to="/contact" className="btn-primary mt-8">Request Availability</Link>
        </div>
      </section>

      <div className="hairline my-16 md:my-20" />

      <section className="container-luxe">
        <InventoryAccordion items={cars} ctaLabel="Inquire about this car" />
      </section>
    </PageShell>
  );
}
