import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageShell } from "@/components/site/PageShell";
import { clubs, ALL_GENRES, ALL_VENUE_TYPES } from "@/lib/inventory";
import type { Genre, VenueType } from "@/lib/inventory";
import heroVip from "@/assets/hero-vip.jpg";

export const Route = createFileRoute("/vip-access")({
  head: () => ({
    meta: [
      { title: "Miami VIP Nightlife Access - Tables at LIV, E11EVEN & More · Neel2k" },
      { name: "description", content: "VIP tables and entry at Miami's top clubs and lounges - LIV, E11EVEN, Vendôme, Mr. Jones, Coco, Kiki on the River. A polished add-on to your concierge weekend." },
      { property: "og:title", content: "Miami VIP Access - Tables & Entry · Neel2k" },
      { property: "og:description", content: "Hold the right rooms for the right hours - Miami nightlife, handled." },
      { property: "og:url", content: "/vip-access" },
      { property: "og:image", content: heroVip },
      { name: "twitter:title", content: "Miami VIP Nightlife Access - Neel2k" },
      { name: "twitter:description", content: "VIP tables at LIV, E11EVEN, Vendôme and more - bundled with your Miami concierge day." },
      { name: "twitter:image", content: heroVip },
    ],
    links: [{ rel: "canonical", href: "/vip-access" }],
  }),
  component: VipPage,
});

function VipPage() {
  const [activeGenres, setActiveGenres] = useState<Genre[]>([]);
  const [activeTypes, setActiveTypes] = useState<VenueType[]>([]);

  function toggleGenre(g: Genre) {
    setActiveGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  }

  function toggleType(t: VenueType) {
    setActiveTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  }

  const filtered = useMemo(() => {
    return clubs.filter((club) => {
      const genreOk =
        activeGenres.length === 0 ||
        activeGenres.some((g) => club.genres.includes(g));
      const typeOk =
        activeTypes.length === 0 ||
        activeTypes.some((t) => club.types.includes(t));
      return genreOk && typeOk;
    });
  }, [activeGenres, activeTypes]);

  const hasFilters = activeGenres.length > 0 || activeTypes.length > 0;

  return (
    <PageShell ctaLabel="Inquire Now" service="VIP access">
      <section className="relative -mt-16 h-[60vh] min-h-[440px] overflow-hidden md:-mt-20">
        <img src={heroVip} alt="Miami nightlife" className="absolute inset-0 h-full w-full object-cover" />
        {/* Bottom-to-top fade for hero text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 to-ink/85" />
        {/* Top overlay specifically to keep header links readable */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/60 to-transparent" />
        <div className="container-luxe relative flex h-full flex-col justify-end pb-14 text-primary-foreground md:pb-20">
          <p className="eyebrow !text-primary-foreground/70">Add-on · Optional</p>
          <h1 className="mt-3 text-5xl md:text-7xl">VIP Access</h1>
          <p className="mt-5 max-w-xl text-base text-primary-foreground/80 md:text-lg">
            A small, considered roster of rooms. We bundle these with your yacht or
            vehicle day so the evening doesn't unravel at the door.
          </p>
        </div>
      </section>

      <section className="container-luxe py-20 md:py-28">
        {/* ── Filters ── */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow mr-2 text-muted-foreground">Vibe</span>
            {ALL_GENRES.map((g) => (
              <FilterChip
                key={g}
                label={g}
                active={activeGenres.includes(g)}
                onClick={() => toggleGenre(g)}
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow mr-2 text-muted-foreground">Type</span>
            {ALL_VENUE_TYPES.map((t) => (
              <FilterChip
                key={t}
                label={t}
                active={activeTypes.includes(t)}
                onClick={() => toggleType(t)}
              />
            ))}
          </div>
          {hasFilters && (
            <button
              className="text-xs uppercase tracking-[0.18em] text-muted-foreground underline-offset-2 hover:text-ink hover:underline transition-colors"
              onClick={() => { setActiveGenres([]); setActiveTypes([]); }}
            >
              Clear filters
            </button>
          )}
        </div>

        {/* ── Cards ── */}
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">No venues match the selected filters.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {filtered.map((club) => (
              <article
                key={club.name}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-7 transition-all hover:border-ink/30 md:p-9"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-3xl text-ink md:text-4xl">{club.name}</h3>
                    {/* Type badges */}
                    <div className="flex flex-wrap justify-end gap-1 pt-1">
                      {club.types.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 text-base text-muted-foreground">{club.vibe}</p>
                  {club.schedule && (
                    <p className="mt-2 text-sm font-medium text-ink/70">{club.schedule}</p>
                  )}
                  <p className="mt-1 text-sm text-ink/50">{club.note}</p>
                  {/* Genre tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {club.genres.map((g) => (
                      <span
                        key={g}
                        className="rounded-full bg-ink/5 px-3 py-1 text-[0.7rem] uppercase tracking-[0.14em] text-ink/60"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-between gap-4">
                  <Link to="/contact" search={{ service: "VIP access" }} className="btn-ghost text-ink">Inquire</Link>
                  <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">By guestlist</span>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-20 rounded-2xl bg-ink p-10 text-primary-foreground md:p-16">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow !text-primary-foreground/60">A note on how this works</p>
              <h2 className="mt-3 text-3xl md:text-4xl">VIP is the encore, not the show.</h2>
              <p className="mt-5 max-w-xl text-primary-foreground/75">
                Bundle a table with a yacht day or weekend exotic and we'll align the
                logistics - driver to the door, photographer if you want one, and a quiet
                exit when it's time.
              </p>
            </div>
            <Link to="/contact" search={{ service: "VIP access" }} className="btn-primary bg-primary-foreground !text-ink hover:!bg-accent hover:!text-primary-foreground">Plan the night</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.14em] transition-all",
        active
          ? "border-ink bg-ink text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-ink/40 hover:text-ink",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
