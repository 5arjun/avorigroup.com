import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import type { InventoryItem } from "@/lib/inventory";

export function InventoryAccordion({
  items,
  ctaLabel = "Inquire",
}: {
  items: InventoryItem[];
  ctaLabel?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="grid gap-5 md:gap-7">
      {items.map((item) => (
        <Card
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
          ctaLabel={ctaLabel}
        />
      ))}
    </div>
  );
}

function Card({
  item,
  isOpen,
  onToggle,
  ctaLabel,
}: {
  item: InventoryItem;
  isOpen: boolean;
  onToggle: () => void;
  ctaLabel: string;
}) {
  const panelId = `panel-${item.id}`;
  const btnId = `btn-${item.id}`;

  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-card transition-all duration-500 ${
        isOpen ? "border-ink/30 shadow-[0_30px_60px_-30px_rgba(8,20,50,0.25)]" : "border-border hover:border-ink/20"
      }`}
    >
      <button
        id={btnId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="grid w-full grid-cols-1 items-stretch text-left md:grid-cols-[280px_1fr_auto]"
      >
        <div className="relative h-56 overflow-hidden md:h-44">
          <img
            src={item.cover}
            alt={item.name}
            loading="lazy"
            className={`h-full w-full object-cover transition-transform duration-[1.2s] ease-out ${
              isOpen ? "scale-105" : "group-hover:scale-105"
            }`}
          />
        </div>

        <div className="flex flex-col justify-center gap-3 px-6 py-5 md:px-8">
          <div className="flex items-baseline gap-3">
            <h3 className="text-2xl text-ink md:text-3xl">{item.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground md:text-base">{item.tagline}</p>
          <dl className="mt-1 flex flex-wrap gap-x-6 gap-y-1">
            {item.facts.map((f) => (
              <div key={f.label} className="flex items-baseline gap-2">
                <dt className="eyebrow text-[0.6rem]">{f.label}</dt>
                <dd className="text-sm font-medium text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex items-center justify-between gap-3 px-6 pb-5 md:flex-col md:items-end md:justify-center md:px-8 md:pb-0">
          <span className="eyebrow hidden md:block">{isOpen ? "Close" : "Gallery"}</span>
          <span
            className={`grid h-10 w-10 place-items-center rounded-full border border-ink/20 text-ink transition-transform duration-500 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <ChevronDown size={16} />
          </span>
        </div>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        hidden={!isOpen}
        className={`grid transition-all duration-500 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        {isOpen && (
          <div className="overflow-hidden border-t border-border">
            <Gallery images={item.gallery} alt={item.name} />
            <div className="flex flex-col items-start justify-between gap-4 px-6 pb-7 md:flex-row md:items-center md:px-8">
              <p className="max-w-md text-sm text-muted-foreground">
                Full specs, pricing, and add-on services delivered within the hour by your concierge.
              </p>
              <Link to="/contact" className="btn-primary">
                {ctaLabel}
              </Link>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className="relative px-6 py-6 md:px-8">
      <div
        ref={scrollerRef}
        className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="relative aspect-[4/3] w-[78%] flex-shrink-0 snap-start overflow-hidden rounded-xl bg-muted sm:w-[55%] md:w-[42%] lg:w-[32%]"
          >
            <img
              src={src}
              alt={`${alt} — image ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 hidden justify-end gap-2 md:flex">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => scrollBy(-1)}
          className="grid h-10 w-10 place-items-center rounded-full border border-border text-ink hover:border-ink"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => scrollBy(1)}
          className="grid h-10 w-10 place-items-center rounded-full border border-border text-ink hover:border-ink"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
