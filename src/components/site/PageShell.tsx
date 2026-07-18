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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="pb-24 pt-16 md:pt-20">{children}</main>
      <Footer />
      <StickyMobileCta label={ctaLabel} service={service} href={ctaHref} />
    </div>
  );
}
