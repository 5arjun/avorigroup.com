/**
 * Central SEO configuration.
 * Update BASE_URL when the custom domain goes live — all canonical URLs,
 * OG image paths, sitemap <loc> values, and JSON-LD urls update automatically.
 */
export const BASE_URL = "https://neel2k-com.vercel.app";

/** Returns an absolute URL for the given path. */
export const abs = (path: string): string => `${BASE_URL}${path}`;

/** Shared OG image paths — stored in public/og/ so URLs are stable (not hashed). */
export const OG_IMAGES = {
  home:   abs("/og/home.jpg"),
  yachts: abs("/og/yachts.jpg"),
  cars:   abs("/og/cars.jpg"),
  vip:    abs("/og/vip.jpg"),
} as const;
