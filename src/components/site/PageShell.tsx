import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyMobileCta } from "./StickyMobileCta";

export function PageShell({
  children,
  ctaLabel,
  service,
  ctaHref,
}: {
  children: ReactNode;
  ctaLabel?: string;
  service?: string;
  /** External/protocol link (e.g. "tel:...") for the sticky CTA, instead of navigating to /contact. */
  ctaHref?: string;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pb-24 pt-16 md:pt-20">{children}</main>
      <Footer />
      <StickyMobileCta label={ctaLabel} service={service} href={ctaHref} />
    </div>
  );
}
