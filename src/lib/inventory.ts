const R2 = "https://pub-ffee12d8734e4754ab62e41195b2330b.r2.dev";

const r2Car = (folder: string, count: number): MediaItem[] => {
  const slug = folder.toLowerCase();
  const imgs: MediaItem[] = [{ type: "image", src: `${R2}/cars/${folder}/${slug}-cover.webp` }];
  for (let i = 1; i < count; i++)
    imgs.push({ type: "image", src: `${R2}/cars/${folder}/${slug}-${i}.webp` });
  return imgs;
};

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
    .replace(/[''"`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// ─── YACHTS ───────────────────────────────────────────────────────────────────
import heroYacht from "@/assets/hero-yacht.jpg";

const yachtGallery = (seed: number): MediaItem[] => [
  { type: "image", src: heroYacht },
  { type: "image", src: `https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1400&q=80&sig=${seed}` },
  { type: "image", src: `https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1400&q=80&sig=${seed}` },
  { type: "image", src: `https://images.unsplash.com/photo-1599582909646-2b1e02b4c8b9?auto=format&fit=crop&w=1400&q=80&sig=${seed}` },
  { type: "image", src: `https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1400&q=80&sig=${seed}` },
  { type: "image", src: `https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=1400&q=80&sig=${seed}` },
];

const yachtsRaw: { name: string; tagline: string; length: string; guests: string; experience: string }[] = [
  { name: "75 Ft Icon",             tagline: "Modern sport-yacht silhouette with sun-pad bow.",       length: "75 ft",  guests: "12", experience: "Day Charter"      },
  { name: "50 Ft Flybridge",        tagline: "Nimble flybridge cruiser for intimate Miami days.",     length: "50 ft",  guests: "10", experience: "Day Charter"      },
  { name: "75 Ft Ferretti w Hottub",tagline: "Italian craftsmanship with on-deck hot tub.",          length: "75 ft",  guests: "12", experience: "Day & Sunset"     },
  { name: "90' Sunseeker",          tagline: "British sport-yacht, full crew, premium finishes.",    length: "90 ft",  guests: "13", experience: "Day & Overnight"  },
  { name: "90' Pershing - RYM",     tagline: "Carbon-bodied performance cruiser at speed.",          length: "90 ft",  guests: "13", experience: "Day Charter"      },
  { name: "94' Pershing Jericho",   tagline: "Signature Pershing lines, full entertainment deck.",   length: "94 ft",  guests: "13", experience: "Day & Sunset"     },
  { name: "Angeles III 128'",       tagline: "Tri-deck superyacht with beach-club access.",          length: "128 ft", guests: "14", experience: "Day & Overnight"  },
  { name: "Azimut 130'",            tagline: "Flagship Azimut, sky lounge and master on deck.",      length: "130 ft", guests: "14", experience: "Overnight Charter" },
  { name: "100 Azimut Jumbo",       tagline: "Wide-body 100, full crew, jacuzzi forward.",           length: "100 ft", guests: "13", experience: "Day & Overnight"  },
];

export const yachts: InventoryItem[] = yachtsRaw.map((y, i) => ({
  id: slug(y.name),
  name: y.name,
  tagline: y.tagline,
  cover: heroYacht,
  gallery: yachtGallery(i + 1),
  facts: [
    { label: "Length",     value: y.length     },
    { label: "Guests",     value: y.guests     },
    { label: "Experience", value: y.experience },
  ],
}));

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
