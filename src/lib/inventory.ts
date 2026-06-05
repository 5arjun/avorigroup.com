const R2 = "https://pub-ffee12d8734e4754ab62e41195b2330b.r2.dev";

// ─── Media types ─────────────────────────────────────────────────────────────
export type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster?: string };

export type InventoryItem = {
  id: string;
  name: string;
  tagline: string;
  facts: { label: string; value: string }[];
  cover: string;        // always a plain image URL for the card thumbnail
  gallery: MediaItem[]; // ordered: video first (if any), then photos
};

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[''""`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Converts a folder name into the file slug - strips both straight and curly apostrophes
const folderToSlug = (folder: string) =>
  folder
    .toLowerCase()
    .replace(/['']/g, "")   // strip straight + curly apostrophes
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// ─── CAR helper ──────────────────────────────────────────────────────────────
const r2Car = (folder: string, count: number): MediaItem[] => {
  const s = folder.toLowerCase();
  const imgs: MediaItem[] = [{ type: "image", src: `${R2}/cars/${folder}/${s}-cover.webp` }];
  for (let i = 1; i < count; i++)
    imgs.push({ type: "image", src: `${R2}/cars/${folder}/${s}-${i}.webp` });
  return imgs;
};

// ─── YACHT helper ─────────────────────────────────────────────────────────────
// NOTE: The R2 bucket folder is "yacths" (typo) - do not change this constant.
// Some folder names use curly apostrophes ('), others use straight (').
// Video pattern: always a -hero file first, then -video-1, -video-2, etc.
// Extensions are mixed (.mp4 / .mov) - specified explicitly per yacht via the
// `videoExts` array: first entry is the hero ext, rest are the numbered extras.
const R2_YACHTS = `${R2}/yacths`;

const r2Yacht = (
  folder: string,
  imageCount: number,
  videoExts: string[] = []   // e.g. ["mp4"] or ["mov", "mp4", "mov"] - hero first, then video-1, video-2...
): MediaItem[] => {
  const s = folderToSlug(folder);
  const base = `${R2_YACHTS}/${folder}/${s}`;
  const items: MediaItem[] = [];

  videoExts.forEach((ext, i) => {
    const src = i === 0
      ? `${base}-hero.${ext}`
      : `${base}-video-${i}.${ext}`;
    items.push({ type: "video", src, poster: `${base}-cover.webp` });
  });

  // cover thumbnail + numbered images
  items.push({ type: "image", src: `${base}-cover.webp` });
  for (let i = 1; i <= imageCount; i++)
    items.push({ type: "image", src: `${base}-${i}.webp` });

  return items;
};

// ─── YACHTS ───────────────────────────────────────────────────────────────────
// NOTE: folder names must exactly match the R2 bucket folder names.
// Curly apostrophe (') = %E2%80%99, straight (') = %27 - they are different!
// videoExts: first = hero ext, subsequent = video-1, video-2... exts
const yachtsRaw: {
  name: string;
  folder: string;
  length: string;
  images: number;
  videoExts: string[];
}[] = [
  { name: "60' Rodman",               folder: "60'-Rodman",              length: "60 ft",  images: 39, videoExts: [] },
  { name: "100' Azimut Jumbo",       folder: "100'-Azimut-Jumbo",      length: "100 ft", images: 99, videoExts: [] },
  { name: "128' Angeles III",         folder: "128'-Angeles-III",        length: "128 ft", images: 42, videoExts: [] },
  { name: "130' Azimut",              folder: "130'-Azimut",             length: "130 ft", images: 86, videoExts: ["mov"] },
  { name: "48' Princess Gazzela",     folder: "48\u2019-Princess-Gazzela",    length: "48 ft",  images: 19, videoExts: ["mov"] },
  { name: "50' Flybridge",            folder: "50'-Flybridge",           length: "50 ft",  images: 15, videoExts: ["mov"] },
  { name: "53' 2025 Galeon",          folder: "53'-2025-Galeon",         length: "53 ft",  images: 33, videoExts: [] },
  { name: "70' Money Wave",           folder: "70\u2019-Money-Wave",          length: "70 ft",  images: 16, videoExts: ["mov", "mp4", "mov"] },
  { name: "75' Aicon",                folder: "75'-Aicon",               length: "75 ft",  images: 19, videoExts: ["mp4", "mp4", "mp4"] },
  { name: "75' Ferretti",             folder: "75'-Ferreti",             length: "75 ft",  images: 19, videoExts: ["mp4", "mp4"] },
  { name: "90' Pershing",             folder: "90'-Pershing",            length: "90 ft",  images: 58, videoExts: ["mp4", "mp4"] },
  { name: "90' Sunseeker",            folder: "90\u2019-Sunseeker",           length: "90 ft",  images: 54, videoExts: ["mp4", "mp4", "mp4", "mov"] },
  { name: "94' Pershing Jerico V",    folder: "94'-Pershing-Jerico-V",   length: "94 ft",  images: 82, videoExts: ["mp4"] },
  { name: "94' Churri",               folder: "94\u2019-Churri",              length: "94 ft",  images: 14, videoExts: ["mp4"] },
  { name: "Acqua Alberti",            folder: "Acqua-Alberti",           length: "-",      images: 73, videoExts: ["mp4", "mp4"] },
  { name: "Deep Blue",                folder: "Deep-Blue",               length: "-",      images: 30, videoExts: [] },
  { name: "Del Mar",                  folder: "Del-Mar",                 length: "-",      images: 69, videoExts: [] },
  { name: "Moonlight",                folder: "Moonlight",               length: "-",      images: 14, videoExts: ["mp4"] },
  { name: "Warrior Flybridge",        folder: "Warrior-Flybridge",       length: "-",      images: 98, videoExts: ["mp4", "mov"] },
];

export const yachts: InventoryItem[] = yachtsRaw.map((y) => {
  const gallery = r2Yacht(y.folder, y.images, y.videoExts);
  const cover = `${R2_YACHTS}/${y.folder}/${folderToSlug(y.folder)}-cover.webp`;
  return {
    id: slug(y.name),
    name: y.name,
    tagline: "",
    cover,
    gallery,
    facts: [
      ...(y.length !== "-" ? [{ label: "Length", value: y.length }] : []),
      { label: "Experience", value: "Day & Night" },
    ],
  };
});

// ─── CARS ─────────────────────────────────────────────────────────────────────
const carsRaw: { name: string; tagline: string; cat: string; folder: string; count: number }[] = [
  { name: "Audi S5 White",                      tagline: "Crisp white S5 coupe - daily-driver luxury.",          cat: "Coupe",       folder: "Audi-S5-White",                      count: 11 },
  { name: "BMW M3 Competition Blue",             tagline: "M3 Competition in signature blue.",                   cat: "Sedan",       folder: "BMW-M3-Competition-Blue",             count: 14 },
  { name: "BMW M3 Competition Frozen White",     tagline: "Matte frozen white finish, blacked-out trim.",        cat: "Sedan",       folder: "BMW-M3-Competition-Frozen-White",     count: 12 },
  { name: "BMW M3 Competition Yellow",           tagline: "Bold yellow M3 Competition, head-turner spec.",       cat: "Sedan",       folder: "BMW-M3-Competition-Yellow",           count: 18 },
  { name: "BMW M4 Convertible Grey",             tagline: "Top-down M4 with carbon accents.",                   cat: "Convertible", folder: "BMW-M4-Convertible-Grey",             count: 14 },
  { name: "BMW M5 Blue",                         tagline: "Twin-turbo V8 super-sedan in deep blue.",             cat: "Sedan",       folder: "BMW-M5-Blue",                         count: 14 },
  { name: "Cadillac Escalade ESV Black",         tagline: "Long-wheelbase ESV - group transfers in comfort.",    cat: "SUV",         folder: "Cadillac-Escalade-ESV-Black",         count: 14 },
  { name: "Corvette C8 2026 Black",              tagline: "Mid-engine C8 in stealth black.",                    cat: "Coupe",       folder: "Corvette-C8-2026-Black",              count: 10 },
  { name: "Ferrari 296 GTS Red",                 tagline: "Hybrid V6 Spider in Rosso Corsa, top down.",         cat: "Convertible", folder: "Ferrari-296-GTS-Red",                 count: 16 },
  { name: "Ferrari F8 Black",                    tagline: "Twin-turbo V8 F8 Tributo in nero.",                  cat: "Supercar",    folder: "Ferrari-F8-Black",                    count: 12 },
  { name: "Ferrari SF90 Satin Black",            tagline: "Plug-in hybrid flagship, satin black wrap.",         cat: "Hypercar",    folder: "Ferrari-SF90-Satin-Black",            count: 10 },
  { name: "Lamborghini Evo Spider Grey",         tagline: "Huracán EVO Spider in grigio, sound on demand.",     cat: "Convertible", folder: "Lamborghini-Evo-Spider-Grey",         count: 14 },
  { name: "Lamborghini Urus Black",              tagline: "Performance SUV in stealth black.",                  cat: "SUV",         folder: "Lamborghini-Urus-Black",              count: 17 },
  { name: "Lamborghini Urus Performante Purple", tagline: "Track-tuned Urus Performante in viola.",             cat: "SUV",         folder: "Lamborghini-Urus-Performante-Purple", count: 10 },
  { name: "McLaren 750S Spider Orange",          tagline: "Papaya orange Spider with dihedral doors.",          cat: "Supercar",    folder: "Mclaren-750S-Spider-Orange",          count: 8  },
  { name: "Mercedes G63 AMG Black",              tagline: "G-Wagon in classic blacked-out spec.",               cat: "SUV",         folder: "Mercedes-G63-AMG-Black",              count: 13 },
  { name: "Porsche 911 Turbo S Techart White",   tagline: "Techart-tuned Turbo S in pearl white.",              cat: "Coupe",       folder: "Porsche-911-Turbo-S-Techart-White",   count: 19 },
  { name: "Porsche GT3 992 Grey",                tagline: "Track-bred GT3 992, naturally aspirated flat-six.",  cat: "Coupe",       folder: "Porsche-GT3-992-Grey",                count: 12 },
  { name: "Porsche GTS Grey",                    tagline: "Balanced GTS spec, grey on black.",                  cat: "Coupe",       folder: "Porsche-GTS-Grey",                    count: 11 },
  { name: "Rolls-Royce Cullinan Black",          tagline: "Coachwork luxury, twin-turbo V12 in black.",         cat: "SUV",         folder: "Rolls-Royce-Cullinan-Black",          count: 16 },
];

export const cars: InventoryItem[] = carsRaw.map((c) => {
  const imgs = r2Car(c.folder, c.count);
  return {
    id: slug(c.name),
    name: c.name,
    tagline: c.tagline,
    cover: imgs[0].src as string,
    gallery: imgs,
    facts: [
      { label: "Category", value: c.cat           },
      { label: "Rental",   value: "Daily / Weekly" },
    ],
  };
});

// ─── CLUBS ────────────────────────────────────────────────────────────────────
export type VenueType = "Club" | "Lounge" | "Dinner Party" | "Day Club";
export type Genre = "Hip-Hop" | "EDM" | "Open Format";

export type Club = {
  name: string;
  vibe: string;
  note: string;
  types: VenueType[];
  genres: Genre[];
  /** Short schedule line shown on the card, e.g. "Fri Hip-Hop · Sat EDM · Sun Hip-Hop" */
  schedule?: string;
};

export const clubs: Club[] = [
  {
    name: "LIV",
    vibe: "Stadium-energy main room at Fontainebleau",
    note: "Subject to change on holidays & big events.",
    schedule: "Fri Hip-Hop · Sat EDM · Sun Hip-Hop",
    types: ["Club"],
    genres: ["Hip-Hop", "EDM"],
  },
  {
    name: "E11EVEN",
    vibe: "24/7 ultraclub theatre with headline DJs & artists",
    note: "Downtown · late-night signature.",
    types: ["Club"],
    genres: ["Hip-Hop", "EDM", "Open Format"],
  },
  {
    name: "Mr. Jones",
    vibe: "Best Hip-Hop club in Miami Beach — high-level artists & performances",
    note: "Miami Beach · curated guestlist.",
    types: ["Club"],
    genres: ["Hip-Hop"],
  },
  {
    name: "Casa Neos",
    vibe: "Beach day club by day, upscale lounge after dark",
    note: "Miami Beach · dual-format venue.",
    types: ["Day Club", "Lounge"],
    genres: ["Open Format"],
  },
  {
    name: "Strawberry Moon",
    vibe: "Rooftop day club at the Goodtime Hotel — pool party energy with a South Beach edge",
    note: "South Beach · poolside reservations.",
    types: ["Day Club", "Lounge"],
    genres: ["Open Format"],
  },
  {
    name: "Kiki",
    vibe: "Greek-style dinner party on the river",
    note: "River District · brunch through late night.",
    types: ["Dinner Party", "Lounge"],
    genres: ["Open Format"],
  },
  {
    name: "Habibi",
    vibe: "Arab-style immersive dinner party",
    note: "Miami · curated evenings.",
    types: ["Dinner Party", "Lounge"],
    genres: ["Open Format"],
  },
  {
    name: "Coco",
    vibe: "Fashion District Hip-Hop club & lounge",
    note: "Fashion District · weekday revival.",
    types: ["Club", "Lounge"],
    genres: ["Hip-Hop"],
  },
  {
    name: "Vendôme",
    vibe: "Old-world supper club — dinner into dancing",
    note: "Brickell · dinner into dancing.",
    types: ["Club", "Dinner Party"],
    genres: ["Hip-Hop"],
  },
  {
    name: "Gekko",
    vibe: "Restaurant & lounge from David Grutman & Bad Bunny",
    note: "Brickell · late-night dining.",
    types: ["Lounge"],
    genres: ["Open Format"],
  },
  {
    name: "Bacara",
    vibe: "Open-format club — crowd-driven programming",
    note: "Miami · rotating formats.",
    types: ["Club"],
    genres: ["Open Format"],
  },
  {
    name: "Boobytrap",
    vibe: "Gentleman's club with premium service",
    note: "Miami · late night.",
    types: ["Club"],
    genres: ["Hip-Hop", "Open Format"],
  },
  {
    name: "Mona",
    vibe: "Hip-Hop lounge with an intimate, upscale feel",
    note: "Miami · reservation recommended.",
    types: ["Lounge"],
    genres: ["Hip-Hop"],
  },
];

export const ALL_GENRES: Genre[] = ["Hip-Hop", "EDM", "Open Format"];
export const ALL_VENUE_TYPES: VenueType[] = ["Club", "Lounge", "Dinner Party", "Day Club"];
