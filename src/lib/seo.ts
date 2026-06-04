/**
 * Central SEO constants & helpers.
 * Swap BASE_URL for the custom domain when it's ready.
 */
export const BASE_URL = "https://neel2k-com.vercel.app";

/** Returns a fully-qualified absolute URL for the given path */
export const abs = (path: string) => `${BASE_URL}${path}`;

/** Today's date in YYYY-MM-DD for sitemap <lastmod> */
export const TODAY = new Date().toISOString().slice(0, 10);
