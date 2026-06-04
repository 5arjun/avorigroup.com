import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyMobileCta } from "./StickyMobileCta";

export function PageShell({
  children,
  ctaLabel,
  service,
}: {
  children: ReactNode;
  ctaLabel?: string;
  service?: string;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pb-24 pt-16 md:pt-20">{children}</main>
      <Footer />
      <StickyMobileCta label={ctaLabel} service={service} />
    </div>
  );
}
