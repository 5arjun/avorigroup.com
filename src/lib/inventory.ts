import heroYacht from "@/assets/hero-yacht.jpg";
import heroCar from "@/assets/hero-car.jpg";

export type InventoryItem = {
  id: string;
  name: string;
  tagline: string;
  facts: { label: string; value: string }[];
  cover: string;
  gallery: string[];
};

const yachtGallery = (seed: number) => [
  heroYacht,
  `https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1400&q=80&sig=${seed}`,
  `https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1400&q=80&sig=${seed}`,
  `https://images.unsplash.com/photo-1599582909646-2b1e02b4c8b9?auto=format&fit=crop&w=1400&q=80&sig=${seed}`,
  `https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1400&q=80&sig=${seed}`,
  `https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=1400&q=80&sig=${seed}`,
];

const carGallery = (seed: number) => [
  heroCar,
  `https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80&sig=${seed}`,
  `https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80&sig=${seed}`,
  `https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=80&sig=${seed}`,
  `https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1400&q=80&sig=${seed}`,
  `https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=80&sig=${seed}`,
];

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/['’"`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const yachtsRaw: { name: string; tagline: string; length: string; guests: string; experience: string }[] = [
  { name: "75 Ft Icon", tagline: "Modern sport-yacht silhouette with sun-pad bow.", length: "75 ft", guests: "12", experience: "Day Charter" },
  { name: "50 Ft Flybridge", tagline: "Nimble flybridge cruiser for intimate Miami days.", length: "50 ft", guests: "10", experience: "Day Charter" },
  { name: "75 Ft Ferretti w Hottub", tagline: "Italian craftsmanship with on-deck hot tub.", length: "75 ft", guests: "12", experience: "Day & Sunset" },
  { name: "90' Sunseeker", tagline: "British sport-yacht, full crew, premium finishes.", length: "90 ft", guests: "13", experience: "Day & Overnight" },
  { name: "90' Pershing - RYM", tagline: "Carbon-bodied performance cruiser at speed.", length: "90 ft", guests: "13", experience: "Day Charter" },
  { name: "94' Pershing Jericho", tagline: "Signature Pershing lines, full entertainment deck.", length: "94 ft", guests: "13", experience: "Day & Sunset" },
  { name: "Angeles III 128'", tagline: "Tri-deck superyacht with beach-club access.", length: "128 ft", guests: "14", experience: "Day & Overnight" },
  { name: "Azimut 130'", tagline: "Flagship Azimut, sky lounge and master on deck.", length: "130 ft", guests: "14", experience: "Overnight Charter" },
  { name: "100 Azimut Jumbo", tagline: "Wide-body 100, full crew, jacuzzi forward.", length: "100 ft", guests: "13", experience: "Day & Overnight" },
];

export const yachts: InventoryItem[] = yachtsRaw.map((y, i) => ({
  id: slug(y.name),
  name: y.name,
  tagline: y.tagline,
  cover: heroYacht,
  gallery: yachtGallery(i + 1),
  facts: [
    { label: "Length", value: y.length },
    { label: "Guests", value: y.guests },
    { label: "Experience", value: y.experience },
  ],
}));

const carsRaw: { name: string; tagline: string; cat: string }[] = [
  { name: "Audi S5 White", tagline: "Crisp white S5 coupe — daily-driver luxury.", cat: "Coupe" },
  { name: "BMW M3 Competition Blue", tagline: "M3 Competition in signature blue.", cat: "Sedan" },
  { name: "BMW M3 Competition Yellow", tagline: "Bold yellow M3 Competition, head-turner spec.", cat: "Sedan" },
  { name: "BMW M3 Competition Frozen White", tagline: "Matte frozen white finish, blacked-out trim.", cat: "Sedan" },
  { name: "BMW M4 Convertible Grey", tagline: "Top-down M4 with carbon accents.", cat: "Convertible" },
  { name: "BMW M5 Blue", tagline: "Twin-turbo V8 super-sedan in deep blue.", cat: "Sedan" },
  { name: "BMW M5 2026 Blue", tagline: "Latest-gen M5, hybrid V8, executive spec.", cat: "Sedan" },
  { name: "Corvette C8 2026 Black", tagline: "Mid-engine C8 in stealth black.", cat: "Coupe" },
  { name: "Cadillac Escalade ESV Black", tagline: "Long-wheelbase ESV — group transfers in comfort.", cat: "SUV" },
  { name: "Ferrari F8 Black", tagline: "Twin-turbo V8 F8 Tributo in nero.", cat: "Supercar" },
  { name: "Ferrari 296 GTS Red", tagline: "Hybrid V6 Spider in Rosso Corsa, top down.", cat: "Convertible" },
  { name: "Ferrari SF90 Satin Black", tagline: "Plug-in hybrid flagship, satin black wrap.", cat: "Hypercar" },
  { name: "McLaren 750S Spider Orange", tagline: "Papaya orange Spider with dihedral doors.", cat: "Supercar" },
  { name: "Mercedes G63 AMG Black", tagline: "G-Wagon in classic blacked-out spec.", cat: "SUV" },
  { name: "Porsche GTS Grey", tagline: "Balanced GTS spec, grey on black.", cat: "Coupe" },
  { name: "Porsche 911 Turbo S Techart White", tagline: "Techart-tuned Turbo S in pearl white.", cat: "Coupe" },
  { name: "Porsche GT3 992 Grey", tagline: "Track-bred GT3 992, naturally aspirated flat-six.", cat: "Coupe" },
  { name: "Lamborghini Evo Spider Grey", tagline: "Huracán EVO Spider in grigio, sound on demand.", cat: "Convertible" },
  { name: "Lamborghini Urus Black", tagline: "Performance SUV in stealth black.", cat: "SUV" },
  { name: "Lamborghini Urus Performante Purple", tagline: "Track-tuned Urus Performante in viola.", cat: "SUV" },
  { name: "Rolls-Royce Cullinan Black", tagline: "Coachwork luxury, twin-turbo V12 in black.", cat: "SUV" },
];

export const cars: InventoryItem[] = carsRaw.map((c, i) => ({
  id: slug(c.name),
  name: c.name,
  tagline: c.tagline,
  cover: heroCar,
  gallery: carGallery(i + 1),
  facts: [
    { label: "Category", value: c.cat },
    { label: "Rental", value: i % 2 === 0 ? "Daily" : "Daily / Weekly" },
    { label: "Drive", value: i % 3 === 0 ? "Chauffeured" : "Self-drive available" },
  ],
}));

export type Club = { name: string; vibe: string; note: string };
export const clubs: Club[] = [
  { name: "LIV", vibe: "Stadium-energy main room", note: "Fontainebleau · Saturdays peak." },
  { name: "E11EVEN", vibe: "24/7 ultraclub theatre", note: "Downtown · late-night signature." },
  { name: "Vendôme", vibe: "Old-world supper club", note: "Brickell · dinner into dancing." },
  { name: "Mr. Jones", vibe: "Cinematic Wynwood lounge", note: "Wynwood · curated guestlist." },
  { name: "Coco", vibe: "Asian-inspired night garden", note: "Wynwood · weekday revival." },
  { name: "Kiki on the River", vibe: "Greek riverside daytime", note: "River District · brunch to dusk." },
];
