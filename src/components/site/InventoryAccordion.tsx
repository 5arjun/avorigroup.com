import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import type { InventoryItem, MediaItem } from "@/lib/inventory";

export function InventoryAccordion({
  items,
  ctaLabel = "Inquire",
  service,
}: {
  items: InventoryItem[];
  ctaLabel?: string;
  service?: string;
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
          service={service}
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
  service,
}: {
  item: InventoryItem;
  isOpen: boolean;
  onToggle: () => void;
  ctaLabel: string;
  service?: string;
}) {
  const panelId = `panel-${item.id}`;
  const btnId   = `btn-${item.id}`;

  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-card transition-all duration-500 ${
        isOpen
          ? "border-ink/30 shadow-[0_30px_60px_-30px_rgba(8,20,50,0.25)]"
          : "border-border hover:border-ink/20"
      }`}
    >
      {/* ── Card header / toggle ── */}
      <button
        id={btnId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="grid w-full grid-cols-1 items-stretch text-left md:grid-cols-[280px_1fr_auto]"
      >
        {/* Thumbnail */}
        <div className="relative h-56 overflow-hidden md:h-44">
          <img
            src={item.cover}
            alt={item.name}
            loading="lazy"
            className={`h-full w-full object-cover transition-transform duration-[1.2s] ease-out ${
              isOpen ? "scale-105" : ""
            }`}
          />
        </div>

        {/* Meta */}
        <div className="flex flex-col justify-center gap-3 px-6 py-5 md:px-8">
          <h3 className="text-2xl text-ink md:text-3xl">{item.name}</h3>
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

        {/* Chevron */}
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

      {/* ── Expanded panel ── */}
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
            <Gallery media={item.gallery} alt={item.name} />
            <div className="flex flex-col items-start justify-between gap-4 px-6 pb-7 md:flex-row md:items-center md:px-8">
              <p className="max-w-md text-sm text-muted-foreground">
                Full specs, pricing, and add-on services delivered asap by your concierge.
              </p>
              <Link
                to="/contact"
                search={service ? { service } : undefined}
                className="btn-primary"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

// ── Gallery ──────────────────────────────────────────────────────────────────
function Gallery({ media, alt }: { media: MediaItem[]; alt: string }) {
  const scrollerRef  = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const hasVideo = media.some((m) => m.type === "video");

  return (
    <div className="relative px-6 py-6 md:px-8">
      {/* Sound toggle - only shown when a video is present */}
      {hasVideo && (
        <button
          type="button"
          onClick={() => setMuted((v) => !v)}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute right-8 top-8 z-10 flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm transition hover:border-ink/30 hover:text-ink"
        >
          {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          <span>{muted ? "Sound off" : "Sound on"}</span>
        </button>
      )}

      {/* Scrollable rail */}
      <div
        ref={scrollerRef}
        className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {media.map((item, i) => (
          <div
            key={i}
            className="relative aspect-[4/3] w-[78%] flex-shrink-0 snap-start overflow-hidden rounded-xl bg-muted sm:w-[55%] md:w-[42%] lg:w-[32%]"
          >
            {item.type === "video" ? (
              <>
                <video
                  src={item.src}
                  poster={item.poster}
                  autoPlay
                  muted={muted}
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
                {/* Video badge */}
                <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-white backdrop-blur-sm">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                  Video
                </span>
              </>
            ) : (
              <img
                src={item.src}
                alt={`${alt} - photo ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* Desktop nav arrows */}
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
