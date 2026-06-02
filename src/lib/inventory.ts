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

// Converts a folder name like "100'-Azimut-Jumbo" into the file slug "100-azimut-jumbo"
const folderToSlug = (folder: string) =>
  folder
    .toLowerCase()
    .replace(/'/g, "")   // strip apostrophes
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
// Folder names keep apostrophes (e.g. "100'-Azimut-Jumbo") but the actual
// filenames inside drop them (e.g. "100-azimut-jumbo-1.webp"), so we use
// folderToSlug() for the file prefix, not folder.toLowerCase().
const r2Yacht = (
  folder: string,
  imageCount: number,
  videoCount: number = 0
): MediaItem[] => {
  const s = folderToSlug(folder);
  const base = `${R2}/yachts/${folder}/${s}`;
  const items: MediaItem[] = [];

  // videos first
  for (let i = 1; i <= videoCount; i++)
    items.push({
      type: "video",
      src: `${base}-${i}.mp4`,
      poster: `${base}-cover.webp`,
    });

  // cover thumbnail + numbered images
  items.push({ type: "image", src: `${base}-cover.webp` });
  for (let i = 1; i <= imageCount; i++)
    items.push({ type: "image", src: `${base}-${i}.webp` });

  return items;
};

// ─── YACHTS ───────────────────────────────────────────────────────────────────
const yachtsRaw: {
  name: string;
  folder: string;
  length: string;
  experience: string;
  images: number;
  videos: number;
}[] = [
  { name: "100' Azimut Jumbo",       folder: "100'-Azimut-Jumbo",      length: "100 ft", experience: "Day & Overnight",  images: 99, videos: 0 },
  { name: "128' Angeles III",         folder: "128'-Angeles-III",        length: "128 ft", experience: "Day & Overnight",  images: 42, videos: 0 },
  { name: "130' Azimut",              folder: "130'-Azimut",             length: "130 ft", experience: "Overnight Charter", images: 86, videos: 1 },
  { name: "48' Princess Gazzela",     folder: "48'-Princess-Gazzela",    length: "48 ft",  experience: "Day Charter",       images: 19, videos: 1 },
  { name: "50' Flybridge",            folder: "50'-Flybridge",           length: "50 ft",  experience: "Day Charter",       images: 15, videos: 1 },
  { name: "53' 2025 Galeon",          folder: "53'-2025-Galeon",         length: "53 ft",  experience: "Day Charter",       images: 33, videos: 0 },
  { name: "70' Money Wave",           folder: "70'-Money-Wave",          length: "70 ft",  experience: "Day Charter",       images: 16, videos: 3 },
  { name: "75' Aicon",                folder: "75'-Aicon",               length: "75 ft",  experience: "Day Charter",       images: 19, videos: 3 },
  { name: "75' Ferretti",             folder: "75'-Ferreti",             length: "75 ft",  experience: "Day & Sunset",      images: 19, videos: 2 },
  { name: "90' Pershing",             folder: "90'-Pershing",            length: "90 ft",  experience: "Day Charter",       images: 58, videos: 2 },
  { name: "90' Sunseeker",            folder: "90'-Sunseeker",           length: "90 ft",  experience: "Day & Overnight",   images: 54, videos: 4 },
  { name: "94' Pershing Jerico V",    folder: "94'-Pershing-Jerico-V",   length: "94 ft",  experience: "Day & Sunset",      images: 82, videos: 1 },
  { name: "94' Churri",               folder: "94'-Churri",              length: "94 ft",  experience: "Day Charter",       images: 14, videos: 1 },
  { name: "Acqua Alberti",            folder: "Acqua-Alberti",           length: "—",      experience: "Day & Overnight",   images: 73, videos: 2 },
  { name: "Deep Blue",                folder: "Deep-Blue",               length: "—",      experience: "Day Charter",       images: 30, videos: 0 },
  { name: "Del Mar",                  folder: "Del-Mar",                 length: "—",      experience: "Day Charter",       images: 69, videos: 0 },
  { name: "Moonlight",                folder: "Moonlight",               length: "—",      experience: "Day Charter",       images: 14, videos: 1 },
  { name: "Warrior Flybridge",        folder: "Warrior-Flybridge",       length: "—",      experience: "Day Charter",       images: 98, videos: 2 },
];

export const yachts: InventoryItem[] = yachtsRaw.map((y) => {
  const gallery = r2Yacht(y.folder, y.images, y.videos);
  const cover = `${R2}/yachts/${y.folder}/${folderToSlug(y.folder)}-cover.webp`;
  return {
    id: slug(y.name),
    name: y.name,
    tagline: "",
    cover,
    gallery,
    facts: [
      ...(y.length !== "—" ? [{ label: "Length", value: y.length }] : []),
      { label: "Experience", value: y.experience },
    ],
  };
});

// ─── CARS ─────────────────────────────────────────────────────────────────────
const carsRaw: { name: string; tagline: string; cat: string; folder: string; count: number }[] = [
  { name: "Audi S5 White",                      tagline: "Crisp white S5 coupe — daily-driver luxury.",          cat: "Coupe",       folder: "Audi-S5-White",                      count: 11 },
  { name: "BMW M3 Competition Blue",             tagline: "M3 Competition in signature blue.",                   cat: "Sedan",       folder: "BMW-M3-Competition-Blue",             count: 14 },
  { name: "BMW M3 Competition Frozen White",     tagline: "Matte frozen white finish, blacked-out trim.",        cat: "Sedan",       folder: "BMW-M3-Competition-Frozen-White",     count: 12 },
  { name: "BMW M3 Competition Yellow",           tagline: "Bold yellow M3 Competition, head-turner spec.",       cat: "Sedan",       folder: "BMW-M3-Competition-Yellow",           count: 18 },
  { name: "BMW M4 Convertible Grey",             tagline: "Top-down M4 with carbon accents.",                   cat: "Convertible", folder: "BMW-M4-Convertible-Grey",             count: 14 },
  { name: "BMW M5 Blue",                         tagline: "Twin-turbo V8 super-sedan in deep blue.",             cat: "Sedan",       folder: "BMW-M5-Blue",                         count: 14 },
  { name: "Cadillac Escalade ESV Black",         tagline: "Long-wheelbase ESV — group transfers in comfort.",    cat: "SUV",         folder: "Cadillac-Escalade-ESV-Black",         count: 14 },
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
export type Club = { name: string; vibe: string; note: string };
export const clubs: Club[] = [
  { name: "LIV",               vibe: "Stadium-energy main room",    note: "Fontainebleau · Saturdays peak."  },
  { name: "E11EVEN",           vibe: "24/7 ultraclub theatre",      note: "Downtown · late-night signature." },
  { name: "Vendôme",           vibe: "Old-world supper club",       note: "Brickell · dinner into dancing."  },
  { name: "Mr. Jones",         vibe: "Cinematic Wynwood lounge",    note: "Wynwood · curated guestlist."     },
  { name: "Coco",              vibe: "Asian-inspired night garden", note: "Wynwood · weekday revival."       },
  { name: "Kiki on the River", vibe: "Greek riverside daytime",     note: "River District · brunch to dusk." },
];
