import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { BASE_URL, abs } from "../lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // Expanded robots directive: allows full snippets and large image previews in SERP
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { property: "og:site_name", content: "Neel2k" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@neel2k" },
      { name: "theme-color", content: "#0b1a2b" },
      // Geo tags for local search signals
      { name: "geo.region", content: "US-FL" },
      { name: "geo.placename", content: "Miami, Florida" },
      { name: "geo.position", content: "25.7617;-80.1918" },
      { name: "ICBM", content: "25.7617, -80.1918" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@400;500;600&display=swap",
      },
      // Sitemap discovery link
      { rel: "sitemap", type: "application/xml", title: "Sitemap", href: "/sitemap.xml" },
      // Favicon chain
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    ],
    scripts: [
      {
        // LocalBusiness schema — feeds Google Maps and local pack
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Neel2k",
          url: BASE_URL,
          image: abs("/og/home.jpg"),
          description:
            "Miami luxury concierge specializing in private yacht charters, exotic and luxury car rentals, and VIP nightlife access.",
          telephone: "+1-305-555-0199",
          priceRange: "$$$$",
          areaServed: { "@type": "City", name: "Miami" },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Miami",
            addressRegion: "FL",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 25.7617,
            longitude: -80.1918,
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
              opens: "09:00",
              closes: "23:00",
            },
          ],
          currenciesAccepted: "USD",
          sameAs: ["https://instagram.com/neel2k"],
          makesOffer: [
            { "@type": "Offer", name: "Private Yacht Charters Miami" },
            { "@type": "Offer", name: "Exotic & Luxury Car Rentals Miami" },
            { "@type": "Offer", name: "Miami VIP Nightlife Access" },
          ],
        }),
      },
      {
        // Organization schema — powers the Google Knowledge Panel / brand sidebar
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Neel2k",
          url: BASE_URL,
          logo: abs("/og/home.jpg"),
          description: "Miami luxury concierge for private yacht charters, exotic car rentals, and VIP nightlife.",
          sameAs: ["https://instagram.com/neel2k"],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-305-555-0199",
            contactType: "customer service",
            availableLanguage: "English",
          },
        }),
      },
      {
        // WebSite schema — enables Google Sitelinks search box
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Neel2k",
          url: BASE_URL,
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Analytics />
      <SpeedInsights />
    </QueryClientProvider>
  );
}
