import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/yachts", label: "Yachts" },
  { to: "/cars", label: "Cars" },
  { to: "/vip-access", label: "VIP Access" },
  { to: "/contact", label: "Contact" },
] as const;

// Routes that have a full-bleed dark hero — header text should be white when unscrolled
const DARK_HERO_ROUTES = ["/vip-access", "/cars"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isDarkHero = !scrolled && !open && DARK_HERO_ROUTES.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="group flex items-baseline gap-1.5" onClick={() => setOpen(false)}>
          <span className={`font-display text-2xl tracking-tight transition-colors ${
            isDarkHero ? "text-white" : "text-ink"
          }`}>Neel</span>
          <span className={`font-display text-2xl tracking-tight transition-colors ${
            isDarkHero ? "text-white/80" : "text-accent"
          }`}>2k</span>
          <span className={`eyebrow ml-2 hidden text-[0.6rem] sm:inline transition-colors ${
            isDarkHero ? "text-white/60" : ""
          }`}>Miami</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-[0.78rem] uppercase tracking-[0.22em] transition-colors hover:text-ink ${
                isDarkHero
                  ? "text-white/80 hover:!text-white"
                  : "text-foreground/75"
              }`}
              activeProps={{ className: isDarkHero ? "!text-white" : "text-ink" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/contact" className="btn-primary hidden h-11 md:inline-flex">
            Book Now
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`grid h-11 w-11 place-items-center rounded-full border transition-colors md:hidden ${
              isDarkHero
                ? "border-white/30 text-white"
                : "border-border text-ink"
            }`}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container-luxe flex flex-col gap-1 py-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-base uppercase tracking-[0.18em] text-foreground/80"
                activeProps={{ className: "text-ink" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/contact" className="btn-primary mt-4" onClick={() => setOpen(false)}>
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
