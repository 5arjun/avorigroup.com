import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, MessageCircle, Instagram } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/yachts", label: "Yachts" },
  { to: "/cars", label: "Cars" },
  { to: "/vip-access", label: "VIP Access" },
  { to: "/contact", label: "Contact" },
] as const;

// Routes that have a full-bleed dark hero — header text should be white when unscrolled
const DARK_HERO_ROUTES = ["/vip-access"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isDarkHero = !scrolled && !open && DARK_HERO_ROUTES.includes(pathname);
  const whiteText = open || isDarkHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        open ? "bg-ink" : scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="group flex items-baseline gap-1.5" onClick={() => setOpen(false)}>
          <span className={`font-display text-2xl tracking-tight transition-colors ${
            whiteText ? "text-white" : "text-ink"
          }`}>Avori</span>
          <span className="font-display text-2xl tracking-tight text-accent">Group</span>
          <span className={`eyebrow ml-2 hidden text-[0.6rem] sm:inline transition-colors ${
            whiteText ? "text-white/60" : ""
          }`}>Miami</span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`whitespace-nowrap text-[0.78rem] uppercase tracking-[0.22em] transition-colors hover:text-ink ${
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
          <Link to="/contact" className="btn-primary hidden h-11 lg:inline-flex">
            Book Now
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden ${
              whiteText
                ? "border-white/30 text-white"
                : "border-border text-ink"
            }`}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-y-auto bg-ink md:top-20 lg:hidden">
          <nav className="container-luxe flex flex-1 flex-col justify-center">
            {links.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="menu-item-in group flex items-center gap-4 border-b border-primary-foreground/10 py-4 font-display text-4xl text-primary-foreground/80 transition-colors first:border-t hover:text-primary-foreground sm:text-5xl"
                style={{ animationDelay: `${i * 45}ms` }}
                activeProps={{ className: "!text-primary-foreground" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-opacity ${
                    isActive(l.to) ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                  }`}
                />
                {l.label}
              </Link>
            ))}
          </nav>

          <div
            className="menu-item-in container-luxe flex flex-col gap-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8"
            style={{ animationDelay: `${links.length * 45}ms` }}
          >
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary w-full bg-primary-foreground !text-ink hover:!bg-accent hover:!text-primary-foreground"
            >
              Book Now
            </Link>
            <div className="flex items-center justify-center gap-6 text-primary-foreground/50">
              <a href="tel:+17324290269" aria-label="Call Avori Group" className="transition-colors hover:text-accent">
                <Phone size={18} />
              </a>
              <a
                href="https://wa.me/17324290269"
                target="_blank"
                rel="noreferrer"
                aria-label="Message Avori Group on WhatsApp"
                className="transition-colors hover:text-accent"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="https://instagram.com/avori.group"
                target="_blank"
                rel="noreferrer"
                aria-label="Avori Group on Instagram"
                className="transition-colors hover:text-accent"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
