import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { clubs } from "@/lib/inventory";
import heroVip from "@/assets/hero-vip.jpg";

export const Route = createFileRoute("/vip-access")({
  head: () => ({
    meta: [
      { title: "Miami VIP Nightlife Access — Tables at LIV, E11EVEN & More · Neel2k" },
      { name: "description", content: "VIP tables and entry at Miami's top clubs and lounges — LIV, E11EVEN, Vendôme, Mr. Jones, Coco, Kiki on the River. A polished add-on to your concierge weekend." },
      { property: "og:title", content: "Miami VIP Access — Tables & Entry · Neel2k" },
      { property: "og:description", content: "Hold the right rooms for the right hours — Miami nightlife, handled." },
      { property: "og:url", content: "/vip-access" },
      { property: "og:image", content: heroVip },
      { name: "twitter:title", content: "Miami VIP Nightlife Access — Neel2k" },
      { name: "twitter:description", content: "VIP tables at LIV, E11EVEN, Vendôme and more — bundled with your Miami concierge day." },
      { name: "twitter:image", content: heroVip },
    ],
    links: [{ rel: "canonical", href: "/vip-access" }],
  }),
  component: VipPage,
});

function VipPage() {
  return (
    <PageShell ctaLabel="Inquire Now">
      <section className="relative -mt-16 h-[60vh] min-h-[440px] overflow-hidden md:-mt-20">
        <img src={heroVip} alt="Miami nightlife" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 to-ink/85" />
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
        <div className="grid gap-5 md:grid-cols-2">
          {clubs.map((club) => (
            <article key={club.name} className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-7 transition-all hover:border-ink/30 md:p-9">
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-3xl text-ink md:text-4xl">{club.name}</h3>
                  <span className="eyebrow">Room</span>
                </div>
                <p className="mt-4 text-base text-muted-foreground">{club.vibe}</p>
                <p className="mt-2 text-sm text-ink/70">{club.note}</p>
              </div>
              <div className="mt-8 flex items-center justify-between gap-4">
                <Link to="/contact" className="btn-ghost text-ink">Inquire</Link>
                <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">By guestlist</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 rounded-2xl bg-ink p-10 text-primary-foreground md:p-16">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow !text-primary-foreground/60">A note on how this works</p>
              <h2 className="mt-3 text-3xl md:text-4xl">VIP is the encore, not the show.</h2>
              <p className="mt-5 max-w-xl text-primary-foreground/75">
                Bundle a table with a yacht day or weekend exotic and we'll align the
                logistics — driver to the door, photographer if you want one, and a quiet
                exit when it's time.
              </p>
            </div>
            <Link to="/contact" className="btn-primary bg-primary-foreground !text-ink hover:!bg-accent hover:!text-primary-foreground">Plan the night</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
