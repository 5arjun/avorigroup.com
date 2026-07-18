import { Link } from "@tanstack/react-router";
import { Instagram, Phone, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 bg-ink text-primary-foreground">
      <div className="container-luxe py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-baseline gap-1">
              <span className="font-display text-3xl">Avori</span>
              <span className="font-display text-3xl text-accent">Group</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              A private Miami concierge for yacht charters, exotic vehicles, and
              the evenings in between. Discreet, fast, hand-curated.
            </p>
          </div>

          <div>
            <p className="eyebrow !text-primary-foreground/50">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/yachts" className="hover:text-accent">Yachts</Link></li>
              <li><Link to="/cars" className="hover:text-accent">Cars</Link></li>
              <li><Link to="/vip-access" className="hover:text-accent">VIP Access</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow !text-primary-foreground/50">Direct</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href="tel:+13055550199" className="flex items-center gap-2 hover:text-accent"><Phone size={14}/> +1 (305) 555-0199</a></li>
              <li><a href="https://instagram.com/avori.group" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-accent"><Instagram size={14}/> @avori.group</a></li>
              <li><a href="https://wa.me/13055550199" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-accent"><MessageCircle size={14}/> WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-primary-foreground/10 pt-8 text-xs text-primary-foreground/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Avori Group · Miami, FL</p>
          <p className="uppercase tracking-[0.22em]">By invitation · By inquiry</p>
        </div>
      </div>
    </footer>
  );
}
