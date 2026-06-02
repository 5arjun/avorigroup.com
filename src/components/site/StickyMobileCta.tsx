import { Link } from "@tanstack/react-router";

export function StickyMobileCta({ label = "Request Availability" }: { label?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
      <div className="container-luxe py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Link to="/contact" className="btn-primary w-full">
          {label}
        </Link>
      </div>
    </div>
  );
}
