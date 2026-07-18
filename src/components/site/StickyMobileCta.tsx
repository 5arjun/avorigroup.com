import { Link } from "@tanstack/react-router";

export function StickyMobileCta({
  label = "Request Availability",
  service,
  href,
}: {
  label?: string;
  service?: string;
  /** External/protocol link (e.g. "tel:...") to render instead of navigating to /contact. */
  href?: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
      <div className="container-luxe py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {href ? (
          <a href={href} className="btn-primary w-full">
            {label}
          </a>
        ) : (
          <Link
            to="/contact"
            search={service ? { service } : undefined}
            className="btn-primary w-full"
          >
            {label}
          </Link>
        )}
      </div>
    </div>
  );
}
