import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { X, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import type { InventoryItem, MediaItem } from "@/lib/inventory";

interface Props {
  yacht: InventoryItem | null;
  onClose: () => void;
}

export function YachtModal({ yacht, onClose }: Props) {
  const [activeIdx, setActiveIdx]   = useState(0);
  const [muted, setMuted]           = useState(true);
  const videoRef                    = useRef<HTMLVideoElement>(null);
  const railRef                     = useRef<HTMLDivElement>(null);
  const overlayRef                  = useRef<HTMLDivElement>(null);

  // Reset to first item whenever a new yacht opens
  useEffect(() => {
    if (yacht) {
      setActiveIdx(0);
      setMuted(true);
    }
  }, [yacht?.id]);

  // Keyboard navigation + escape
  useEffect(() => {
    if (!yacht) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowRight")  next();
      if (e.key === "ArrowLeft")   prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [yacht, activeIdx]);

  // Lock body scroll while open
  useEffect(() => {
    if (yacht) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [!!yacht]);

  // Scroll active thumbnail into view
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const thumb = rail.children[activeIdx] as HTMLElement | undefined;
    thumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIdx]);

  if (!yacht) return null;

  const media   = yacht.gallery;
  const active  = media[activeIdx];
  const hasVideo = media.some((m) => m.type === "video");

  const prev = () => setActiveIdx((i) => (i - 1 + media.length) % media.length);
  const next = () => setActiveIdx((i) => (i + 1) % media.length);

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${yacht.name} gallery`}
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* ── Top bar ────────────────────────────────────────────── */}
      <div className="flex shrink-0 items-center justify-between px-5 py-4 md:px-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/40">Yacht</p>
          <h2 className="text-lg font-semibold text-white md:text-2xl">{yacht.name}</h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Facts pills */}
          <dl className="hidden items-center gap-3 md:flex">
            {yacht.facts.map((f) => (
              <div key={f.label} className="flex items-baseline gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                <dt className="text-[10px] uppercase tracking-widest text-white/40">{f.label}</dt>
                <dd className="text-sm font-medium text-white">{f.value}</dd>
              </div>
            ))}
          </dl>

          {/* Sound toggle (only when video present) */}
          {hasVideo && (
            <button
              type="button"
              onClick={() => setMuted((v) => !v)}
              aria-label={muted ? "Unmute" : "Mute"}
              className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
              <span className="hidden sm:inline">{muted ? "Unmute" : "Mute"}</span>
            </button>
          )}

          {/* Inquire CTA */}
          <Link
            to="/contact"
            onClick={onClose}
            className="hidden rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)] md:inline-flex"
          >
            Inquire
          </Link>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* ── Main viewer ────────────────────────────────────────── */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-12">
        {/* Prev arrow */}
        {media.length > 1 && (
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="absolute left-2 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-sm transition hover:bg-white/10 md:left-4 md:h-12 md:w-12"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {/* Media frame */}
        <div className="flex h-full w-full max-w-6xl items-center justify-center">
          {active.type === "video" ? (
            <video
              ref={videoRef}
              key={active.src}
              src={active.src}
              poster={(active as Extract<MediaItem, { type: "video" }>).poster}
              autoPlay
              muted={muted}
              loop
              playsInline
              preload="metadata"
              className="max-h-full max-w-full rounded-xl object-contain"
              style={{ maxHeight: "calc(100vh - 220px)" }}
            />
          ) : (
            <img
              key={active.src}
              src={active.src}
              alt={`${yacht.name} — photo ${activeIdx + 1}`}
              loading="eager"
              className="max-h-full max-w-full rounded-xl object-contain"
              style={{ maxHeight: "calc(100vh - 220px)" }}
            />
          )}
        </div>

        {/* Next arrow */}
        {media.length > 1 && (
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="absolute right-2 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-sm transition hover:bg-white/10 md:right-4 md:h-12 md:w-12"
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>

      {/* ── Thumbnail rail ─────────────────────────────────────── */}
      <div className="shrink-0 px-4 py-4 md:px-8">
        <div
          ref={railRef}
          className="scrollbar-none flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {media.map((m, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIdx(i)}
              aria-label={m.type === "video" ? `Video ${i + 1}` : `Photo ${i + 1}`}
              className={`relative shrink-0 overflow-hidden rounded-lg transition ${
                i === activeIdx
                  ? "ring-2 ring-[var(--color-primary)] ring-offset-2 ring-offset-black"
                  : "opacity-50 hover:opacity-80"
              }`}
              style={{ width: 80, height: 56 }}
            >
              {m.type === "video" ? (
                <>
                  <video
                    src={m.src}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                  {/* Play icon overlay */}
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                      <path d="M5 3l14 9-14 9V3z" />
                    </svg>
                  </span>
                </>
              ) : (
                <img
                  src={m.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile inquire CTA */}
        <div className="mt-3 flex justify-center md:hidden">
          <Link
            to="/contact"
            onClick={onClose}
            className="rounded-full bg-[var(--color-primary)] px-8 py-2.5 text-sm font-medium text-white"
          >
            Inquire about this yacht
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}
