---
name: Avori Group
description: Miami luxury concierge (yacht charters, exotic cars, VIP nightlife) — one editorial deep-navy design system.
colors:
  ink: "oklch(0.14 0.05 255)"
  navy-primary: "oklch(0.28 0.09 255)"
  accent-blue: "oklch(0.55 0.14 240)"
  gold-reserved: "oklch(0.78 0.09 80)"
  sand-reserved: "oklch(0.95 0.012 80)"
  paper-bg: "oklch(0.96937 0.01354 226.889)"
  card: "oklch(1 0 0)"
  muted: "oklch(0.95 0.01 240)"
  muted-foreground: "oklch(0.5 0.03 250)"
  border: "oklch(0.9 0.015 240)"
  input: "oklch(0.92 0.012 240)"
  primary-foreground: "oklch(0.985 0.005 230)"
  destructive: "oklch(0.55 0.22 25)"
typography:
  display:
    fontFamily: "Cormorant Garamond, Times New Roman, serif"
    fontWeight: 500
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontWeight: 400
  label:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 500
    letterSpacing: "0.28em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  pill: "999px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.pill}"
    padding: "0 1.75rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-blue}"
  button-ghost:
    backgroundColor: "transparent"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "3rem"
  card-inventory:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.2xl}"
  input-field:
    backgroundColor: "transparent"
    rounded: "{rounded.lg}"
    height: "3rem"
    padding: "0 1rem"
---

# Design System: Avori Group

## 1. Overview

**Creative North Star: "The Private Marina at Dusk"**

Avori Group's system reads as a members-only concierge ledger, not a booking marketplace: deep navy ink, a pale blue-white paper ground, and a single restrained sky-blue accent that appears only where a decision is being asked for. Cormorant Garamond display type gives every headline an editorial, slightly formal weight; Inter carries all working text (body copy, labels, form fields) so the system never feels precious about itself. The overall density is generous — long section padding (`py-24` to `py-36`), wide image aspect ratios, short paragraphs — because the audience is deciding on a five-figure weekend, not scanning a feature list.

This system explicitly rejects gaudy or ostentatious luxury signaling: heavy gilt ornamentation, glitter, superlative-stacked copy, and gold-and-black "luxury template" clichés. Confidence here is shown through specificity (response times, named venues, named vehicles) and restraint, not decoration. It also rejects marketplace patterns — dense filter rails, price-compare grids, star-rating aggregation — in favor of a curated, editorial presentation of a small, vetted roster.

**Key Characteristics:**
- Deep navy ink as the true "primary" color — carries buttons, headline emphasis, and icon roundels. The lighter `--primary` navy token exists in the palette but the site itself reaches for `ink` everywhere a strong color is needed.
- One sky-blue accent, used sparingly: the "Group" half of the wordmark, hover states, focus rings, required-field asterisks, and the destructive-red-adjacent role of drawing a single eye to one decision point per screen.
- Gold and sand tokens (`--gold`, `--sand`) are defined in `:root` but not wired into any component yet — reserved for a future premium/featured accent, not currently load-bearing.
- Pill-shaped buttons (`border-radius: 999px`) are the only button shape in the system; there is no square or soft-radius button anywhere on the live pages.
- Motion is restrained: a single `rise` entrance keyframe (`.reveal`, cubic-bezier(.2,.7,.2,1), translateY 14px → 0) for hero copy, plus slow `1.2s–1.4s` ease-out image scale on hover. No bounce, no choreography beyond that.

## 2. Colors

The palette is a near-monochrome navy system with one blue accent doing all the "interactive" signaling; gold and sand sit in reserve.

### Primary
- **Ink** (`oklch(0.14 0.05 255)` / `#00081D`): the system's true workhorse color. Backgrounds every primary button, fills icon roundels, and is the hover-border/text color across inventory cards and nav links. Functions as "primary" even though the CSS variable of that name points elsewhere (see Named Rule below).

### Secondary
- **Accent Blue** (`oklch(0.55 0.14 240)` / `#0079BA`): the one spot of hue in an otherwise near-neutral system. Used for the "Group" wordmark half, link hovers, focus rings (`focus:ring-accent/40`), required-field markers, and the hover-fill color on primary buttons. Never used as a large background fill on the live pages — it marks a single decision point, not a surface.
- **Navy Primary** (`oklch(0.28 0.09 255)` / `#012854`): the CSS `--primary` token. Present in the palette and used by a handful of untouched shadcn primitives (slider, switch, radio) but not by the site's own marketing pages, which use `ink` instead.

### Tertiary (reserved, not yet in use)
- **Gold** (`oklch(0.78 0.09 80)` / `#D6B174`): defined for a future premium/featured emphasis (e.g. a "featured charter" badge) but not yet applied anywhere. Don't invent a gold treatment casually — introduce it deliberately, once, with a clear single purpose.
- **Sand** (`oklch(0.95 0.012 80)` / `#F3EEE6`): a warm neutral counterpart to the cooler `background`, also unused today. Same rule: reserve for a deliberate warm-surface moment, don't sprinkle it in as decoration.

### Neutral
- **Paper Background** (`oklch(0.96937 0.01354 226.889)` / `#ECF7FC`): the page background — a barely-blue-tinted near-white, not a warm cream. This is the resting surface behind every section.
- **Card** (`#FFFFFF`): pure white, used for card/form surfaces sitting on top of the paper background so they read as a distinct layer without a shadow.
- **Muted / Muted Foreground** (`oklch(0.95 0.01 240)` / `oklch(0.5 0.03 250)`): secondary text and quiet surface fills (e.g. the "Featured" section band background at 40% opacity).
- **Border / Input** (`oklch(0.9 0.015 240)` / `oklch(0.92 0.012 240)`): hairline dividers and default form-field strokes, both a whisper above the background so they read without needing a shadow.

### Named Rules
**The Ink-Is-Primary Rule.** Despite the CSS variable name, `--primary` (navy) is not the system's dominant color in practice — `--ink` is. New components should reach for `ink` for solid fills and strong text, and treat `--primary` as legacy/shadcn-primitive territory only.

**The One-Hue Rule.** Only one saturated hue (accent blue) is live in the system at any time. If gold is ever activated, it replaces or shares that single-accent budget — it does not stack alongside blue as a second simultaneous accent.

## 3. Typography

**Display Font:** Cormorant Garamond (fallback: Times New Roman, serif)
**Body Font:** Inter (fallback: system-ui, -apple-system, sans-serif)
**Label/Mono Font:** JetBrains Mono is declared as `--font-mono` but not currently used anywhere in the UI — reserved, not active.

**Character:** A classic editorial pairing — a warm, slightly formal serif for anything a visitor should feel emotionally, set against a clean grotesk-adjacent sans for anything they need to read quickly or fill in.

### Hierarchy
- **Display** (weight 500, `clamp` scaling from `text-4xl` to `text-[5.5rem]`, tight `-0.01em` tracking, line-height ~1.02–1.1): hero headlines and every section `h2`/`h3`. Always Cormorant Garamond.
- **Body** (weight 400, `text-sm` to `text-lg`, relaxed line-height on longer copy): paragraph copy, card descriptions, form helper text. Capped informally around 60–65ch by the grid widths already in use (`max-w-xl`, `max-w-sm`).
- **Label / Eyebrow** (weight 500, `0.7rem`, `0.28em` letter-spacing, uppercase, `muted-foreground` color): the `.eyebrow` utility class. Used as a section kicker (e.g. "Two signatures", "Featured · Yachts") and as form field labels.
- **Nav / Button Label** (weight 500, `0.78rem`, `0.22em` tracking, uppercase): the wordmark nav links and every button's inner text.

### Named Rules
**The Serif-For-Feeling Rule.** Cormorant Garamond is reserved for headings that should land emotionally (hero lines, section headers, closing CTA). It never appears in body copy, labels, or UI chrome — those stay in Inter.

**The Eyebrow-At-Capacity Rule.** The `.eyebrow` label already sits above nearly every section on the live site (home page alone uses six). Treat it as saturated, not as a default to reach for on new sections — adding more eyebrows pushes the system toward the generic "tiny uppercase tracked kicker on everything" pattern. If a new section needs a lead-in, prefer varying the device (a short standalone line, a different type scale) rather than another eyebrow.

## 4. Elevation

The system is flat by default — surfaces are separated by a hairline border and a shift in background (card white on paper blue-white), not by shadow. The one deliberate exception is a soft, wide, ink-tinted shadow used as a state signal, not a permanent surface treatment.

### Shadow Vocabulary
- **Opened-state glow** (`box-shadow: 0 30px 60px -30px rgba(8,20,50,0.25)`): applied only to an inventory accordion card once expanded, paired with `border-ink/30`. Signals "this is the active one," not ambient depth.
- Generic shadcn primitives (`shadow-sm`, `shadow`) exist in the untouched component library (Card, Button `default` variant) but the site's own pages don't lean on them — new marketing surfaces should follow the flat-plus-hairline-border pattern instead.

### Named Rules
**The Border-Not-Shadow Rule.** Default state for any new card or panel is a 1px `border-border` on `bg-card`, not a drop shadow. Shadow is reserved for the single "active/expanded" signal described above.

## 5. Components

### Buttons
- **Shape:** full pill (`border-radius: 999px`) at a fixed `3rem` height — the only button shape anywhere on the live site.
- **Primary (`.btn-primary`):** `ink` background, `primary-foreground` text, uppercase label at `0.78rem` / `0.22em` tracking. Hover shifts background to `accent-blue` and lifts `1px` (`translateY(-1px)`).
- **Ghost (`.btn-ghost`):** transparent fill, `1px solid currentColor` border, same label treatment. Hover fills `currentColor` as the background and flips the label to the background color.
- **The shadcn `<Button>` primitive** (`src/components/ui/button.tsx`) is present with its own `default`/`outline`/`secondary`/`ghost` variants, but no page in the site currently renders it — every real CTA is a raw `.btn-primary` / `.btn-ghost` class on a `<Link>` or `<button>`. New CTAs should follow the live pattern (the CSS classes), not the unused shadcn variants.

### Cards
- **Inventory card** (yacht/car listing): `rounded-2xl`, `border border-border` at rest, `hover:border-ink/20`; expands to `border-ink/30` plus the opened-state shadow above. Thumbnail image scales to `105%` over `1.2s` ease-out on open/hover.
- **Service split card** (home page): `aspect-[4/5]`, `rounded-2xl`, full-bleed image with an `ink`-to-transparent gradient overlay, an uppercase eyebrow tag top-left and a bordered circular icon badge top-right, title + copy pinned to the bottom.
- **Preview card** (featured grid): simpler — `rounded-xl`, `bg-card`, `aspect-[4/3]` image, plain text block below (no overlay). Reserve the gradient-overlay treatment for the two primary service cards only; the featured/preview grid stays quieter by design.
- **Corner Style:** `16px` (service/inventory cards) or `12px` (preview cards) — never square.
- **Border:** `border-border` default; `border-ink/*` only on hover or active state.

### Inputs / Fields
- **Form fields** (contact form): `rounded-lg` (`8px`), `border-input`, `bg-background`, `h-12`, focus switches border to `ink` (no ring). Label is the `.eyebrow` treatment sitting directly above the field.
- **Filter fields** (inventory search/select): `rounded-full` (pill), `border-border`, focus switches border to `accent-blue` plus a `ring-accent/40` glow. The pill shape signals "quick filter," distinct from the more formal rounded-lg form fields — keep that distinction; don't unify the two into one shape.
- **Error text:** `rounded-lg`, `bg-destructive/10` fill, `text-destructive`, `role="alert"`.

### Navigation
- Fixed header, transparent over the hero image; once scrolled (`scrollY > 12`) or the mobile menu is open, it gains `bg-background/85 backdrop-blur-xl` and a bottom hairline border.
- Routes with a full-bleed dark hero (`/vip-access`) force white nav text until scrolled, tracked via an explicit `DARK_HERO_ROUTES` list — any new page with a dark, image-led hero should be added to that list rather than reinventing header contrast logic.
- Nav links: `0.78rem`, `0.22em` tracking, uppercase, `foreground/75` at rest, `ink` on hover (or `white/80` → `white` on dark-hero routes).

### Sticky Mobile CTA
Fixed bottom bar (`md:hidden`), `bg-background/95 backdrop-blur-xl`, top hairline border, full-width `.btn-primary` inside, with `env(safe-area-inset-bottom)` padding for notched devices. Every page mounts this via `PageShell`; new pages should keep using `PageShell` rather than hand-rolling the mobile CTA.

## 6. Do's and Don'ts

### Do:
- **Do** use `ink` for solid fills, strong text, and icon roundels — it's the system's true primary color regardless of the `--primary` variable name.
- **Do** keep buttons as full pills at `3rem` height; use `.btn-primary` / `.btn-ghost` for every CTA rather than the unused shadcn `<Button>` variants.
- **Do** default new cards/panels to a hairline `border-border` on `bg-card`, reserving shadow for the single "expanded/active" signal.
- **Do** reserve `accent-blue` for one decision point per view (a link, a focus ring, a hover state) — not as a background fill.
- **Do** respect `prefers-reduced-motion` for the `.reveal` entrance and hover-scale transitions on images, per PRODUCT.md's accessibility requirement (standard WCAG AA baseline).
- **Do** preserve or strengthen the existing text-shadow treatment on hero copy over dark imagery — contrast there is load-bearing, not decorative.

### Don't:
- **Don't** use raw Tailwind palette colors (e.g. `bg-slate-900`, as currently used on the home page's VIP section) for dark surfaces — use `ink` so the palette stays closed to the token system. This is an existing inconsistency worth fixing in a future pass, not a pattern to repeat.
- **Don't** add another `.eyebrow` kicker to a new section by default — the device is already at capacity across the site (see the Eyebrow-At-Capacity Rule). This is also a named anti-pattern for AI-generated marketing pages generally: don't let it multiply further here.
- **Don't** introduce gold or sand as decoration. They're reserved, unused tokens — activate either only for one deliberate, singular purpose (e.g. a "featured" badge), never as ambient warmth.
- **Don't** reach for square or soft-radius (`rounded-md`) buttons. Every button on the live site is a full pill; a square button would read as a foreign component.
- **Don't** add marketplace UI (star ratings, price-compare tables, dense multi-facet filter sidebars) — the roster is presented as curated and small, per PRODUCT.md's "curated, not catalogued" principle, not shopped like a marketplace.
- **Don't** use heavy gilt ornamentation, glitter, or superlative-stacked copy ("the most luxurious," "unparalleled," "world-class") — PRODUCT.md's anti-reference is generic gold-and-black luxury-template cliché, and this system's restraint is the point.
