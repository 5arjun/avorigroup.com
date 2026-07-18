/**
 * Central SEO constants & helpers.
 */
export const BASE_URL = "https://avorigroup.com";

/** Returns a fully-qualified absolute URL for the given path */
export const abs = (path: string) => `${BASE_URL}${path}`;

/** Today's date in YYYY-MM-DD for sitemap <lastmod> */
export const TODAY = new Date().toISOString().slice(0, 10);

/**
 * Centralised OG image URLs.
 * Files live in public/og/ so their paths are stable (never hashed by the build tool).
 */
export const OG_IMAGES = {
  home:   abs("/og/home.jpg"),
  yachts: abs("/og/yachts.jpg"),
  cars:   abs("/og/cars.jpg"),
  vip:    abs("/og/vip.jpg"),
  contact: abs("/og/home.jpg"), // fallback to home OG until dedicated image exists
} as const;
