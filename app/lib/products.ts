export type Fabric = {
  code: string;
  name: string;
  hex: string;
  swatchImage: string;
  studioFront: string;
  studioAngle: string;
  lifestyle?: string[];
};

export type SizeVariant = {
  seats: number;
  label: string;
  studioFront: string;
  studioAngle: string;
};

export type LifestyleSet = {
  fabricName: string;
  fabricHex: string;
  images: string[];
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  heroImage: string;
  priceFrom: string;
  intro: string[];
  silhouette: string;
  details: { label: string; value: string }[];
  fabrics: Fabric[];
  sizes?: SizeVariant[];
  lifestyle: LifestyleSet[];
  defaultFabricCode: string;
};

const P = (slug: string, path: string) => `/products/${slug}/${path}`;

export const products: Product[] = [
  {
    slug: "corner-sofa",
    name: "The Loire Corner Sofa",
    category: "Corner Sofas",
    tagline: "A generous L-shaped silhouette for grand living rooms",
    heroImage: P("corner-sofa", "01-slate-grey-velvet/white-bg/daneen-corner-sofa-slate-grey-velvet-white-front.jpg"),
    priceFrom: "€3.290,00",
    intro: [
      "The Loire is our most generous corner silhouette — a low, deep-seated L-shape built to anchor a living room without ever feeling heavy. Square block arms and a plump, loose back cushion give it an easy, lived-in elegance.",
      "Every Loire is upholstered by hand in our Lille workshop, in a fabric chosen from our couture colourway library or your own designer of choice.",
    ],
    silhouette: "Low profile L-shaped corner sofa with square block arms, a deep single seat cushion and loose plump back cushions. Small dark timber feet keep the silhouette grounded and architectural.",
    details: [
      { label: "Frame", value: "Kiln-dried solid beech, hand-jointed and corner-blocked" },
      { label: "Seat fill", value: "High-resilience foam core wrapped in goose-feather and down" },
      { label: "Back cushions", value: "Loose, plump feather-and-down, hand-plumped on delivery" },
      { label: "Feet", value: "Dark stained solid timber, floor-glide protected" },
      { label: "Configuration", value: "Fixed L-shape corner, generous single size" },
      { label: "Lead time", value: "10–12 weeks, handcrafted to order" },
    ],
    defaultFabricCode: "F1",
    fabrics: [
      {
        code: "F1", name: "Slate Grey Velvet", hex: "#5b6472",
        swatchImage: P("corner-sofa", "01-slate-grey-velvet/white-bg/daneen-corner-sofa-slate-grey-velvet-white-front.jpg"),
        studioFront: P("corner-sofa", "01-slate-grey-velvet/white-bg/daneen-corner-sofa-slate-grey-velvet-white-front.jpg"),
        studioAngle: P("corner-sofa", "01-slate-grey-velvet/white-bg/daneen-corner-sofa-slate-grey-velvet-white-angle.jpg"),
        lifestyle: [
          P("corner-sofa", "01-slate-grey-velvet/lifestyle/daneen-corner-sofa-slate-grey-velvet-lifestyle-01.jpg"),
          P("corner-sofa", "01-slate-grey-velvet/lifestyle/daneen-corner-sofa-slate-grey-velvet-lifestyle-02.jpg"),
          P("corner-sofa", "01-slate-grey-velvet/lifestyle/daneen-corner-sofa-slate-grey-velvet-lifestyle-03.jpg"),
        ],
      },
      {
        code: "F2", name: "Midnight Blue Velvet", hex: "#1f2a44",
        swatchImage: P("corner-sofa", "02-midnight-blue-velvet/white-bg/daneen-corner-sofa-midnight-blue-velvet-white-front.jpg"),
        studioFront: P("corner-sofa", "02-midnight-blue-velvet/white-bg/daneen-corner-sofa-midnight-blue-velvet-white-front.jpg"),
        studioAngle: P("corner-sofa", "02-midnight-blue-velvet/white-bg/daneen-corner-sofa-midnight-blue-velvet-white-angle.jpg"),
        lifestyle: [
          P("corner-sofa", "02-midnight-blue-velvet/lifestyle/daneen-corner-sofa-midnight-blue-velvet-lifestyle-01.jpg"),
          P("corner-sofa", "02-midnight-blue-velvet/lifestyle/daneen-corner-sofa-midnight-blue-velvet-lifestyle-02.jpg"),
          P("corner-sofa", "02-midnight-blue-velvet/lifestyle/daneen-corner-sofa-midnight-blue-velvet-lifestyle-03.jpg"),
        ],
      },
      {
        code: "F3", name: "Oatmeal Linen", hex: "#cdbfa0",
        swatchImage: P("corner-sofa", "03-oatmeal-linen/white-bg/daneen-corner-sofa-oatmeal-linen-white-front.jpg"),
        studioFront: P("corner-sofa", "03-oatmeal-linen/white-bg/daneen-corner-sofa-oatmeal-linen-white-front.jpg"),
        studioAngle: P("corner-sofa", "03-oatmeal-linen/white-bg/daneen-corner-sofa-oatmeal-linen-white-angle.jpg"),
        lifestyle: [
          P("corner-sofa", "03-oatmeal-linen/lifestyle/daneen-corner-sofa-oatmeal-linen-lifestyle-01.jpg"),
          P("corner-sofa", "03-oatmeal-linen/lifestyle/daneen-corner-sofa-oatmeal-linen-lifestyle-02.jpg"),
          P("corner-sofa", "03-oatmeal-linen/lifestyle/daneen-corner-sofa-oatmeal-linen-lifestyle-03.jpg"),
        ],
      },
      {
        code: "F4", name: "Stone Beige Linen", hex: "#d6c6a8",
        swatchImage: P("corner-sofa", "04-stone-beige-linen/white-bg/daneen-corner-sofa-stone-beige-linen-white-front.jpg"),
        studioFront: P("corner-sofa", "04-stone-beige-linen/white-bg/daneen-corner-sofa-stone-beige-linen-white-front.jpg"),
        studioAngle: P("corner-sofa", "04-stone-beige-linen/white-bg/daneen-corner-sofa-stone-beige-linen-white-angle.jpg"),
        lifestyle: [
          P("corner-sofa", "04-stone-beige-linen/lifestyle/daneen-corner-sofa-stone-beige-linen-lifestyle-01.jpg"),
          P("corner-sofa", "04-stone-beige-linen/lifestyle/daneen-corner-sofa-stone-beige-linen-lifestyle-02.jpg"),
          P("corner-sofa", "04-stone-beige-linen/lifestyle/daneen-corner-sofa-stone-beige-linen-lifestyle-03.jpg"),
        ],
      },
      {
        code: "F5", name: "Ivory Bouclé", hex: "#efe8da",
        swatchImage: P("corner-sofa", "05-ivory-boucle/white-bg/daneen-corner-sofa-ivory-boucle-white-front.jpg"),
        studioFront: P("corner-sofa", "05-ivory-boucle/white-bg/daneen-corner-sofa-ivory-boucle-white-front.jpg"),
        studioAngle: P("corner-sofa", "05-ivory-boucle/white-bg/daneen-corner-sofa-ivory-boucle-white-angle.jpg"),
        lifestyle: [
          P("corner-sofa", "05-ivory-boucle/lifestyle/daneen-corner-sofa-ivory-boucle-lifestyle-01.jpg"),
          P("corner-sofa", "05-ivory-boucle/lifestyle/daneen-corner-sofa-ivory-boucle-lifestyle-02.jpg"),
          P("corner-sofa", "05-ivory-boucle/lifestyle/daneen-corner-sofa-ivory-boucle-lifestyle-03.jpg"),
        ],
      },
      {
        code: "F6", name: "Rust Velvet", hex: "#a4522c",
        swatchImage: P("corner-sofa", "06-rust-velvet/white-bg/daneen-corner-sofa-rust-velvet-white-front.jpg"),
        studioFront: P("corner-sofa", "06-rust-velvet/white-bg/daneen-corner-sofa-rust-velvet-white-front.jpg"),
        studioAngle: P("corner-sofa", "06-rust-velvet/white-bg/daneen-corner-sofa-rust-velvet-white-angle.jpg"),
        lifestyle: [
          P("corner-sofa", "06-rust-velvet/lifestyle/daneen-corner-sofa-rust-velvet-lifestyle-01.jpg"),
          P("corner-sofa", "06-rust-velvet/lifestyle/daneen-corner-sofa-rust-velvet-lifestyle-02.jpg"),
          P("corner-sofa", "06-rust-velvet/lifestyle/daneen-corner-sofa-rust-velvet-lifestyle-03.jpg"),
        ],
      },
    ],
    lifestyle: [],
  },

  {
    slug: "chaise-sofa",
    name: "The Vosges Chaise Sofa",
    category: "Chaise Sofas",
    tagline: "A relaxed silhouette with a sweeping chaise return",
    heroImage: P("chaise-sofa", "01-slate-grey-velvet/studio/daneen-chaise-sofa-slate-grey-velvet-studio-01.jpg"),
    priceFrom: "€2.980,00",
    intro: [
      "The Vosges pairs a traditional three-seat sofa with a long, cushioned chaise return — the piece to stretch out on at the end of the day. Its rounded arm and softly upholstered chaise edge keep the whole silhouette relaxed rather than rigid.",
      "Hand-built in our workshop and finished in the fabric of your choosing, the Vosges is equally at home as a reading corner or the centrepiece of an open living space.",
    ],
    silhouette: "Three-seat sofa with an integrated chaise longue return, rounded low arms and deep, plush seat cushions upholstered as one continuous line for an uninterrupted lounging surface.",
    details: [
      { label: "Frame", value: "Kiln-dried solid beech, hand-jointed and corner-blocked" },
      { label: "Seat fill", value: "High-resilience foam core wrapped in goose-feather and down" },
      { label: "Chaise cushion", value: "Single continuous plush cushion, feather-topped" },
      { label: "Feet", value: "Dark stained solid timber, floor-glide protected" },
      { label: "Configuration", value: "Fixed chaise return, generous single size" },
      { label: "Lead time", value: "10–12 weeks, handcrafted to order" },
    ],
    defaultFabricCode: "F1",
    fabrics: [
      {
        code: "F1", name: "Slate Grey Velvet", hex: "#5b6472",
        swatchImage: P("chaise-sofa", "01-slate-grey-velvet/studio/daneen-chaise-sofa-slate-grey-velvet-studio-01.jpg"),
        studioFront: P("chaise-sofa", "01-slate-grey-velvet/studio/daneen-chaise-sofa-slate-grey-velvet-studio-01.jpg"),
        studioAngle: P("chaise-sofa", "01-slate-grey-velvet/studio/daneen-chaise-sofa-slate-grey-velvet-studio-02.jpg"),
        lifestyle: [
          P("chaise-sofa", "01-slate-grey-velvet/lifestyle/daneen-chaise-sofa-slate-grey-velvet-lifestyle-01.jpg"),
          P("chaise-sofa", "01-slate-grey-velvet/lifestyle/daneen-chaise-sofa-slate-grey-velvet-lifestyle-02.jpg"),
          P("chaise-sofa", "01-slate-grey-velvet/lifestyle/daneen-chaise-sofa-slate-grey-velvet-lifestyle-03.jpg"),
        ],
      },
      {
        code: "F2", name: "Midnight Blue Velvet", hex: "#1f2a44",
        swatchImage: P("chaise-sofa", "02-midnight-blue-velvet/studio/daneen-chaise-sofa-midnight-blue-velvet-studio-01.jpg"),
        studioFront: P("chaise-sofa", "02-midnight-blue-velvet/studio/daneen-chaise-sofa-midnight-blue-velvet-studio-01.jpg"),
        studioAngle: P("chaise-sofa", "02-midnight-blue-velvet/studio/daneen-chaise-sofa-midnight-blue-velvet-studio-02.jpg"),
        lifestyle: [
          P("chaise-sofa", "02-midnight-blue-velvet/lifestyle/daneen-chaise-sofa-midnight-blue-velvet-lifestyle-01.jpg"),
          P("chaise-sofa", "02-midnight-blue-velvet/lifestyle/daneen-chaise-sofa-midnight-blue-velvet-lifestyle-02.jpg"),
          P("chaise-sofa", "02-midnight-blue-velvet/lifestyle/daneen-chaise-sofa-midnight-blue-velvet-lifestyle-03.jpg"),
        ],
      },
      {
        code: "F3", name: "Oatmeal Linen", hex: "#cdbfa0",
        swatchImage: P("chaise-sofa", "03-oatmeal-linen/studio/daneen-chaise-sofa-oatmeal-linen-studio-01.jpg"),
        studioFront: P("chaise-sofa", "03-oatmeal-linen/studio/daneen-chaise-sofa-oatmeal-linen-studio-01.jpg"),
        studioAngle: P("chaise-sofa", "03-oatmeal-linen/studio/daneen-chaise-sofa-oatmeal-linen-studio-02.jpg"),
        lifestyle: [
          P("chaise-sofa", "03-oatmeal-linen/lifestyle/daneen-chaise-sofa-oatmeal-linen-lifestyle-01.jpg"),
          P("chaise-sofa", "03-oatmeal-linen/lifestyle/daneen-chaise-sofa-oatmeal-linen-lifestyle-02.jpg"),
          P("chaise-sofa", "03-oatmeal-linen/lifestyle/daneen-chaise-sofa-oatmeal-linen-lifestyle-03.jpg"),
        ],
      },
      {
        code: "F4", name: "Stone Beige Linen", hex: "#d6c6a8",
        swatchImage: P("chaise-sofa", "04-stone-beige-linen/studio/daneen-chaise-sofa-stone-beige-linen-studio-01.jpg"),
        studioFront: P("chaise-sofa", "04-stone-beige-linen/studio/daneen-chaise-sofa-stone-beige-linen-studio-01.jpg"),
        studioAngle: P("chaise-sofa", "04-stone-beige-linen/studio/daneen-chaise-sofa-stone-beige-linen-studio-02.jpg"),
        lifestyle: [
          P("chaise-sofa", "04-stone-beige-linen/lifestyle/daneen-chaise-sofa-stone-beige-linen-lifestyle-01.jpg"),
          P("chaise-sofa", "04-stone-beige-linen/lifestyle/daneen-chaise-sofa-stone-beige-linen-lifestyle-02.jpg"),
          P("chaise-sofa", "04-stone-beige-linen/lifestyle/daneen-chaise-sofa-stone-beige-linen-lifestyle-03.jpg"),
        ],
      },
      {
        code: "F5", name: "Ivory Bouclé", hex: "#efe8da",
        swatchImage: P("chaise-sofa", "05-ivory-boucle/studio/daneen-chaise-sofa-ivory-boucle-studio-01.jpg"),
        studioFront: P("chaise-sofa", "05-ivory-boucle/studio/daneen-chaise-sofa-ivory-boucle-studio-01.jpg"),
        studioAngle: P("chaise-sofa", "05-ivory-boucle/studio/daneen-chaise-sofa-ivory-boucle-studio-02.jpg"),
        lifestyle: [
          P("chaise-sofa", "05-ivory-boucle/lifestyle/daneen-chaise-sofa-ivory-boucle-lifestyle-01.jpg"),
          P("chaise-sofa", "05-ivory-boucle/lifestyle/daneen-chaise-sofa-ivory-boucle-lifestyle-02.jpg"),
          P("chaise-sofa", "05-ivory-boucle/lifestyle/daneen-chaise-sofa-ivory-boucle-lifestyle-03.jpg"),
        ],
      },
      {
        code: "F6", name: "Rust Orange Velvet", hex: "#a4522c",
        swatchImage: P("chaise-sofa", "06-rust-orange-velvet/studio/daneen-chaise-sofa-rust-orange-velvet-studio-01.jpg"),
        studioFront: P("chaise-sofa", "06-rust-orange-velvet/studio/daneen-chaise-sofa-rust-orange-velvet-studio-01.jpg"),
        studioAngle: P("chaise-sofa", "06-rust-orange-velvet/studio/daneen-chaise-sofa-rust-orange-velvet-studio-02.jpg"),
        lifestyle: [
          P("chaise-sofa", "06-rust-orange-velvet/lifestyle/daneen-chaise-sofa-rust-orange-velvet-lifestyle-01.jpg"),
          P("chaise-sofa", "06-rust-orange-velvet/lifestyle/daneen-chaise-sofa-rust-orange-velvet-lifestyle-02.jpg"),
          P("chaise-sofa", "06-rust-orange-velvet/lifestyle/daneen-chaise-sofa-rust-orange-velvet-lifestyle-03.jpg"),
        ],
      },
    ],
    lifestyle: [],
  },

  {
    slug: "u-shape-sofa",
    name: "The Camargue U-Shape Sofa",
    category: "U-Shape Sofas",
    tagline: "Our largest silhouette, built for gathering",
    heroImage: P("u-shape-sofa", "01-slate-grey-velvet/studio/daneen-u-shape-sofa-slate-grey-velvet-studio-01.jpg"),
    priceFrom: "€4.480,00",
    intro: [
      "The Camargue is the largest piece in our collection: a full U-shaped sectional with two facing chaise returns, designed for households who gather. It seats a crowd without ever losing the low, tailored profile that runs through every Sofas By Daneen silhouette.",
      "Every panel is upholstered by hand, seam by seam, in our Lille workshop — the same couture attention we give a single armchair, scaled up to a piece that can hold a whole family.",
    ],
    silhouette: "Symmetrical U-shaped sectional with two opposing chaise returns, square block arms and deep bench-style seating upholstered in one continuous run for a clean, tailored line.",
    details: [
      { label: "Frame", value: "Kiln-dried solid beech, hand-jointed and corner-blocked" },
      { label: "Seat fill", value: "High-resilience foam core wrapped in goose-feather and down" },
      { label: "Back cushions", value: "Loose, plump feather-and-down bolsters along the full run" },
      { label: "Feet", value: "Dark stained solid timber, floor-glide protected" },
      { label: "Configuration", value: "Fixed U-shape sectional, generous single size" },
      { label: "Lead time", value: "12–14 weeks, handcrafted to order" },
    ],
    defaultFabricCode: "F1",
    fabrics: [
      {
        code: "F1", name: "Slate Grey Velvet", hex: "#5b6472",
        swatchImage: P("u-shape-sofa", "01-slate-grey-velvet/studio/daneen-u-shape-sofa-slate-grey-velvet-studio-01.jpg"),
        studioFront: P("u-shape-sofa", "01-slate-grey-velvet/studio/daneen-u-shape-sofa-slate-grey-velvet-studio-01.jpg"),
        studioAngle: P("u-shape-sofa", "01-slate-grey-velvet/studio/daneen-u-shape-sofa-slate-grey-velvet-studio-02.jpg"),
        lifestyle: [
          P("u-shape-sofa", "01-slate-grey-velvet/lifestyle/daneen-u-shape-sofa-slate-grey-velvet-lifestyle-01.jpg"),
          P("u-shape-sofa", "01-slate-grey-velvet/lifestyle/daneen-u-shape-sofa-slate-grey-velvet-lifestyle-02.jpg"),
          P("u-shape-sofa", "01-slate-grey-velvet/lifestyle/daneen-u-shape-sofa-slate-grey-velvet-lifestyle-03.jpg"),
        ],
      },
      {
        code: "F2", name: "Midnight Blue Velvet", hex: "#1f2a44",
        swatchImage: P("u-shape-sofa", "02-midnight-blue-velvet/studio/daneen-u-shape-sofa-midnight-blue-velvet-studio-01.jpg"),
        studioFront: P("u-shape-sofa", "02-midnight-blue-velvet/studio/daneen-u-shape-sofa-midnight-blue-velvet-studio-01.jpg"),
        studioAngle: P("u-shape-sofa", "02-midnight-blue-velvet/studio/daneen-u-shape-sofa-midnight-blue-velvet-studio-02.jpg"),
        lifestyle: [
          P("u-shape-sofa", "02-midnight-blue-velvet/lifestyle/daneen-u-shape-sofa-midnight-blue-velvet-lifestyle-01.jpg"),
          P("u-shape-sofa", "02-midnight-blue-velvet/lifestyle/daneen-u-shape-sofa-midnight-blue-velvet-lifestyle-02.jpg"),
          P("u-shape-sofa", "02-midnight-blue-velvet/lifestyle/daneen-u-shape-sofa-midnight-blue-velvet-lifestyle-03.jpg"),
        ],
      },
      {
        code: "F3", name: "Oatmeal Linen", hex: "#cdbfa0",
        swatchImage: P("u-shape-sofa", "03-oatmeal-linen/studio/daneen-u-shape-sofa-oatmeal-linen-studio-01.jpg"),
        studioFront: P("u-shape-sofa", "03-oatmeal-linen/studio/daneen-u-shape-sofa-oatmeal-linen-studio-01.jpg"),
        studioAngle: P("u-shape-sofa", "03-oatmeal-linen/studio/daneen-u-shape-sofa-oatmeal-linen-studio-02.jpg"),
        lifestyle: [
          P("u-shape-sofa", "03-oatmeal-linen/lifestyle/daneen-u-shape-sofa-oatmeal-linen-lifestyle-01.jpg"),
          P("u-shape-sofa", "03-oatmeal-linen/lifestyle/daneen-u-shape-sofa-oatmeal-linen-lifestyle-02.jpg"),
          P("u-shape-sofa", "03-oatmeal-linen/lifestyle/daneen-u-shape-sofa-oatmeal-linen-lifestyle-03.jpg"),
        ],
      },
      {
        code: "F4", name: "Stone Beige Linen", hex: "#d6c6a8",
        swatchImage: P("u-shape-sofa", "04-stone-beige-linen/studio/daneen-u-shape-sofa-stone-beige-linen-studio-01.jpg"),
        studioFront: P("u-shape-sofa", "04-stone-beige-linen/studio/daneen-u-shape-sofa-stone-beige-linen-studio-01.jpg"),
        studioAngle: P("u-shape-sofa", "04-stone-beige-linen/studio/daneen-u-shape-sofa-stone-beige-linen-studio-02.jpg"),
        lifestyle: [
          P("u-shape-sofa", "04-stone-beige-linen/lifestyle/daneen-u-shape-sofa-stone-beige-linen-lifestyle-01.jpg"),
          P("u-shape-sofa", "04-stone-beige-linen/lifestyle/daneen-u-shape-sofa-stone-beige-linen-lifestyle-02.jpg"),
          P("u-shape-sofa", "04-stone-beige-linen/lifestyle/daneen-u-shape-sofa-stone-beige-linen-lifestyle-03.jpg"),
        ],
      },
      {
        code: "F5", name: "Ivory Bouclé", hex: "#efe8da",
        swatchImage: P("u-shape-sofa", "05-ivory-boucle/studio/daneen-u-shape-sofa-ivory-boucle-studio-01.jpg"),
        studioFront: P("u-shape-sofa", "05-ivory-boucle/studio/daneen-u-shape-sofa-ivory-boucle-studio-01.jpg"),
        studioAngle: P("u-shape-sofa", "05-ivory-boucle/studio/daneen-u-shape-sofa-ivory-boucle-studio-02.jpg"),
        lifestyle: [
          P("u-shape-sofa", "05-ivory-boucle/lifestyle/daneen-u-shape-sofa-ivory-boucle-lifestyle-01.jpg"),
          P("u-shape-sofa", "05-ivory-boucle/lifestyle/daneen-u-shape-sofa-ivory-boucle-lifestyle-02.jpg"),
          P("u-shape-sofa", "05-ivory-boucle/lifestyle/daneen-u-shape-sofa-ivory-boucle-lifestyle-03.jpg"),
        ],
      },
      {
        code: "F6", name: "Rust Orange Velvet", hex: "#a4522c",
        swatchImage: P("u-shape-sofa", "06-rust-orange-velvet/studio/daneen-u-shape-sofa-rust-orange-velvet-studio-01.jpg"),
        studioFront: P("u-shape-sofa", "06-rust-orange-velvet/studio/daneen-u-shape-sofa-rust-orange-velvet-studio-01.jpg"),
        studioAngle: P("u-shape-sofa", "06-rust-orange-velvet/studio/daneen-u-shape-sofa-rust-orange-velvet-studio-02.jpg"),
        lifestyle: [
          P("u-shape-sofa", "06-rust-orange-velvet/lifestyle/daneen-u-shape-sofa-rust-orange-velvet-lifestyle-01.jpg"),
          P("u-shape-sofa", "06-rust-orange-velvet/lifestyle/daneen-u-shape-sofa-rust-orange-velvet-lifestyle-02.jpg"),
          P("u-shape-sofa", "06-rust-orange-velvet/lifestyle/daneen-u-shape-sofa-rust-orange-velvet-lifestyle-03.jpg"),
        ],
      },
    ],
    lifestyle: [],
  },

  {
    slug: "modular-corner-sofa",
    name: "The Marais Modular Corner Sofa",
    category: "Modular Sofas",
    tagline: "Configurable seating that grows with your room",
    heroImage: P("modular-corner-sofa", "by-size/03-3-seat/daneen-modular-corner-sofa-3-seat-beige-studio-front.jpg"),
    priceFrom: "€1.690,00",
    intro: [
      "The Marais is our modular system: clean-lined seating blocks with a single crisp front seam that click together into anything from a compact one-seater to a full five-seat corner arrangement with a chaise return.",
      "Because each module is upholstered separately, you can start small and add sections later, or mix fabrics between blocks for a more graphic, contemporary layout.",
    ],
    silhouette: "Square block arms, loose plump back cushions and deep seat cushions with a single clean front seam. Modular sections sit with a visible reveal between them, on small dark timber feet, with no exposed frame or piping.",
    details: [
      { label: "Frame", value: "Kiln-dried solid beech, hand-jointed and corner-blocked" },
      { label: "Seat fill", value: "High-resilience foam core wrapped in goose-feather and down" },
      { label: "Back cushions", value: "Loose, plump feather-and-down, hand-plumped on delivery" },
      { label: "Feet", value: "Small dark timber feet on every module" },
      { label: "Configuration", value: "1 to 5 seats, with a 5-seat chaise-corner layout" },
      { label: "Lead time", value: "8–10 weeks, handcrafted to order" },
    ],
    defaultFabricCode: "F2",
    sizes: [
      { seats: 1, label: "1 Seat", studioFront: P("modular-corner-sofa", "by-size/01-1-seat/daneen-modular-corner-sofa-1-seat-beige-studio-front.jpg"), studioAngle: P("modular-corner-sofa", "by-size/01-1-seat/daneen-modular-corner-sofa-1-seat-beige-studio-angle.jpg") },
      { seats: 2, label: "2 Seats", studioFront: P("modular-corner-sofa", "by-size/02-2-seat/daneen-modular-corner-sofa-2-seat-beige-studio-front.jpg"), studioAngle: P("modular-corner-sofa", "by-size/02-2-seat/daneen-modular-corner-sofa-2-seat-beige-studio-angle.jpg") },
      { seats: 3, label: "3 Seats", studioFront: P("modular-corner-sofa", "by-size/03-3-seat/daneen-modular-corner-sofa-3-seat-beige-studio-front.jpg"), studioAngle: P("modular-corner-sofa", "by-size/03-3-seat/daneen-modular-corner-sofa-3-seat-beige-studio-angle.jpg") },
      { seats: 4, label: "4 Seats", studioFront: P("modular-corner-sofa", "by-size/04-4-seat/daneen-modular-corner-sofa-4-seat-beige-studio-front.jpg"), studioAngle: P("modular-corner-sofa", "by-size/04-4-seat/daneen-modular-corner-sofa-4-seat-beige-studio-angle.jpg") },
      { seats: 5, label: "5 Seats · Corner Chaise", studioFront: P("modular-corner-sofa", "by-size/05-5-seat/daneen-modular-corner-sofa-5-seat-beige-studio-front.jpg"), studioAngle: P("modular-corner-sofa", "by-size/05-5-seat/daneen-modular-corner-sofa-5-seat-beige-studio-angle.jpg") },
    ],
    fabrics: [
      { code: "F1", name: "White", hex: "#f2ede2", swatchImage: P("modular-corner-sofa", "by-fabric/01-white/daneen-modular-corner-sofa-3-seat-white-studio-front.jpg"), studioFront: P("modular-corner-sofa", "by-fabric/01-white/daneen-modular-corner-sofa-3-seat-white-studio-front.jpg"), studioAngle: P("modular-corner-sofa", "by-fabric/01-white/daneen-modular-corner-sofa-3-seat-white-studio-angle.jpg") },
      { code: "F2", name: "Beige", hex: "#d9c7a8", swatchImage: P("modular-corner-sofa", "by-fabric/02-beige/daneen-modular-corner-sofa-3-seat-beige-studio-front.jpg"), studioFront: P("modular-corner-sofa", "by-fabric/02-beige/daneen-modular-corner-sofa-3-seat-beige-studio-front.jpg"), studioAngle: P("modular-corner-sofa", "by-fabric/02-beige/daneen-modular-corner-sofa-3-seat-beige-studio-angle.jpg") },
      { code: "F3", name: "Rust", hex: "#b5502e", swatchImage: P("modular-corner-sofa", "by-fabric/03-rust/daneen-modular-corner-sofa-3-seat-rust-studio-front.jpg"), studioFront: P("modular-corner-sofa", "by-fabric/03-rust/daneen-modular-corner-sofa-3-seat-rust-studio-front.jpg"), studioAngle: P("modular-corner-sofa", "by-fabric/03-rust/daneen-modular-corner-sofa-3-seat-rust-studio-angle.jpg") },
      { code: "F4", name: "Red", hex: "#8b1e1e", swatchImage: P("modular-corner-sofa", "by-fabric/04-red/daneen-modular-corner-sofa-3-seat-red-studio-front.jpg"), studioFront: P("modular-corner-sofa", "by-fabric/04-red/daneen-modular-corner-sofa-3-seat-red-studio-front.jpg"), studioAngle: P("modular-corner-sofa", "by-fabric/04-red/daneen-modular-corner-sofa-3-seat-red-studio-angle.jpg") },
      { code: "F5", name: "Brown", hex: "#6b4a34", swatchImage: P("modular-corner-sofa", "by-fabric/05-brown/daneen-modular-corner-sofa-3-seat-brown-studio-front.jpg"), studioFront: P("modular-corner-sofa", "by-fabric/05-brown/daneen-modular-corner-sofa-3-seat-brown-studio-front.jpg"), studioAngle: P("modular-corner-sofa", "by-fabric/05-brown/daneen-modular-corner-sofa-3-seat-brown-studio-angle.jpg") },
      { code: "F6", name: "Teal", hex: "#2f6f6a", swatchImage: P("modular-corner-sofa", "by-fabric/06-teal/daneen-modular-corner-sofa-3-seat-teal-studio-front.jpg"), studioFront: P("modular-corner-sofa", "by-fabric/06-teal/daneen-modular-corner-sofa-3-seat-teal-studio-front.jpg"), studioAngle: P("modular-corner-sofa", "by-fabric/06-teal/daneen-modular-corner-sofa-3-seat-teal-studio-angle.jpg") },
      { code: "F7", name: "Navy", hex: "#1c2e4a", swatchImage: P("modular-corner-sofa", "by-fabric/07-navy/daneen-modular-corner-sofa-3-seat-navy-studio-front.jpg"), studioFront: P("modular-corner-sofa", "by-fabric/07-navy/daneen-modular-corner-sofa-3-seat-navy-studio-front.jpg"), studioAngle: P("modular-corner-sofa", "by-fabric/07-navy/daneen-modular-corner-sofa-3-seat-navy-studio-angle.jpg") },
      { code: "F8", name: "Charcoal", hex: "#2b2b2d", swatchImage: P("modular-corner-sofa", "by-fabric/08-charcoal/daneen-modular-corner-sofa-3-seat-charcoal-studio-front.jpg"), studioFront: P("modular-corner-sofa", "by-fabric/08-charcoal/daneen-modular-corner-sofa-3-seat-charcoal-studio-front.jpg"), studioAngle: P("modular-corner-sofa", "by-fabric/08-charcoal/daneen-modular-corner-sofa-3-seat-charcoal-studio-angle.jpg") },
    ],
    lifestyle: [
      { fabricName: "Beige", fabricHex: "#d9c7a8", images: [P("modular-corner-sofa", "lifestyle/beige/daneen-modular-corner-sofa-lifestyle-beige-three-quarter.jpg"), P("modular-corner-sofa", "lifestyle/beige/daneen-modular-corner-sofa-lifestyle-beige-wide.jpg")] },
      { fabricName: "Brown", fabricHex: "#6b4a34", images: [P("modular-corner-sofa", "lifestyle/brown/daneen-modular-corner-sofa-lifestyle-brown-three-quarter.jpg"), P("modular-corner-sofa", "lifestyle/brown/daneen-modular-corner-sofa-lifestyle-brown-wide.jpg")] },
      { fabricName: "Navy", fabricHex: "#1c2e4a", images: [P("modular-corner-sofa", "lifestyle/navy/daneen-modular-corner-sofa-lifestyle-navy-three-quarter.jpg"), P("modular-corner-sofa", "lifestyle/navy/daneen-modular-corner-sofa-lifestyle-navy-wide.jpg")] },
    ],
  },

  {
    slug: "chesterfield-sofa",
    name: "The Chesterfield",
    category: "Chesterfield Sofas",
    tagline: "The classic tufted silhouette, remade in couture fabrics",
    heroImage: P("chesterfield-sofa", "by-size/03-3-seat/daneen-chesterfield-sofa-3-seat-beige-studio-front.jpg"),
    priceFrom: "€2.190,00",
    intro: [
      "Our Chesterfield honours the original silhouette in full: rolled scroll arms, nailhead trim in warm antique bronze, and a fully diamond-tufted back and seat, hand-buttoned by our upholsterers.",
      "Available from a single armchair through to a five-seat chaise-corner configuration, and in eight couture fabrics — from soft brushed linen to jewel-toned velvet.",
    ],
    silhouette: "Rolled scroll arms with a low, tightly curved profile. Nailhead stud trim along the front edge of each arm and the seat rail. Fully diamond button-tufted back panel and seat cushions. Turned dark wood bun feet with front castors.",
    details: [
      { label: "Frame", value: "Kiln-dried solid beech, hand-jointed and corner-blocked" },
      { label: "Tufting", value: "Hand-buttoned diamond tufting, back panel and seats" },
      { label: "Trim", value: "Nailhead studs in warm antique bronze" },
      { label: "Feet", value: "Turned dark wood bun feet with front castors" },
      { label: "Configuration", value: "1 to 5 seats, with a 5-seat chaise-corner layout" },
      { label: "Lead time", value: "10–12 weeks, handcrafted to order" },
    ],
    defaultFabricCode: "F2",
    sizes: [
      { seats: 1, label: "1 Seat · Armchair", studioFront: P("chesterfield-sofa", "by-size/01-1-seat/daneen-chesterfield-sofa-1-seat-beige-studio-front.jpg"), studioAngle: P("chesterfield-sofa", "by-size/01-1-seat/daneen-chesterfield-sofa-1-seat-beige-studio-angle.jpg") },
      { seats: 2, label: "2 Seats", studioFront: P("chesterfield-sofa", "by-size/02-2-seat/daneen-chesterfield-sofa-2-seat-beige-studio-front.jpg"), studioAngle: P("chesterfield-sofa", "by-size/02-2-seat/daneen-chesterfield-sofa-2-seat-beige-studio-angle.jpg") },
      { seats: 3, label: "3 Seats", studioFront: P("chesterfield-sofa", "by-size/03-3-seat/daneen-chesterfield-sofa-3-seat-beige-studio-front.jpg"), studioAngle: P("chesterfield-sofa", "by-size/03-3-seat/daneen-chesterfield-sofa-3-seat-beige-studio-angle.jpg") },
      { seats: 4, label: "4 Seats", studioFront: P("chesterfield-sofa", "by-size/04-4-seat/daneen-chesterfield-sofa-4-seat-beige-studio-front.jpg"), studioAngle: P("chesterfield-sofa", "by-size/04-4-seat/daneen-chesterfield-sofa-4-seat-beige-studio-angle.jpg") },
      { seats: 5, label: "5 Seats · Corner Chaise", studioFront: P("chesterfield-sofa", "by-size/05-5-seat/daneen-chesterfield-sofa-5-seat-beige-studio-front.jpg"), studioAngle: P("chesterfield-sofa", "by-size/05-5-seat/daneen-chesterfield-sofa-5-seat-beige-studio-angle.jpg") },
    ],
    fabrics: [
      { code: "F1", name: "White", hex: "#f2ede2", swatchImage: P("chesterfield-sofa", "by-fabric/01-white/daneen-chesterfield-sofa-3-seat-white-studio-front.jpg"), studioFront: P("chesterfield-sofa", "by-fabric/01-white/daneen-chesterfield-sofa-3-seat-white-studio-front.jpg"), studioAngle: P("chesterfield-sofa", "by-fabric/01-white/daneen-chesterfield-sofa-3-seat-white-studio-angle.jpg") },
      { code: "F2", name: "Beige", hex: "#d9c7a8", swatchImage: P("chesterfield-sofa", "by-fabric/02-beige/daneen-chesterfield-sofa-3-seat-beige-studio-front.jpg"), studioFront: P("chesterfield-sofa", "by-fabric/02-beige/daneen-chesterfield-sofa-3-seat-beige-studio-front.jpg"), studioAngle: P("chesterfield-sofa", "by-fabric/02-beige/daneen-chesterfield-sofa-3-seat-beige-studio-angle.jpg") },
      { code: "F3", name: "Burnt Orange", hex: "#b5551f", swatchImage: P("chesterfield-sofa", "by-fabric/03-orange/daneen-chesterfield-sofa-3-seat-orange-studio-front.jpg"), studioFront: P("chesterfield-sofa", "by-fabric/03-orange/daneen-chesterfield-sofa-3-seat-orange-studio-front.jpg"), studioAngle: P("chesterfield-sofa", "by-fabric/03-orange/daneen-chesterfield-sofa-3-seat-orange-studio-angle.jpg") },
      { code: "F4", name: "Crimson", hex: "#7a1f24", swatchImage: P("chesterfield-sofa", "by-fabric/04-crimson/daneen-chesterfield-sofa-3-seat-crimson-studio-front.jpg"), studioFront: P("chesterfield-sofa", "by-fabric/04-crimson/daneen-chesterfield-sofa-3-seat-crimson-studio-front.jpg"), studioAngle: P("chesterfield-sofa", "by-fabric/04-crimson/daneen-chesterfield-sofa-3-seat-crimson-studio-angle.jpg") },
      { code: "F5", name: "Chocolate", hex: "#4a3327", swatchImage: P("chesterfield-sofa", "by-fabric/05-chocolate/daneen-chesterfield-sofa-3-seat-chocolate-studio-front.jpg"), studioFront: P("chesterfield-sofa", "by-fabric/05-chocolate/daneen-chesterfield-sofa-3-seat-chocolate-studio-front.jpg"), studioAngle: P("chesterfield-sofa", "by-fabric/05-chocolate/daneen-chesterfield-sofa-3-seat-chocolate-studio-angle.jpg") },
      { code: "F6", name: "Teal", hex: "#2f6f75", swatchImage: P("chesterfield-sofa", "by-fabric/06-teal/daneen-chesterfield-sofa-3-seat-teal-studio-front.jpg"), studioFront: P("chesterfield-sofa", "by-fabric/06-teal/daneen-chesterfield-sofa-3-seat-teal-studio-front.jpg"), studioAngle: P("chesterfield-sofa", "by-fabric/06-teal/daneen-chesterfield-sofa-3-seat-teal-studio-angle.jpg") },
      { code: "F7", name: "Navy", hex: "#1c2740", swatchImage: P("chesterfield-sofa", "by-fabric/07-navy/daneen-chesterfield-sofa-3-seat-navy-studio-front.jpg"), studioFront: P("chesterfield-sofa", "by-fabric/07-navy/daneen-chesterfield-sofa-3-seat-navy-studio-front.jpg"), studioAngle: P("chesterfield-sofa", "by-fabric/07-navy/daneen-chesterfield-sofa-3-seat-navy-studio-angle.jpg") },
      { code: "F8", name: "Charcoal", hex: "#2b2b2d", swatchImage: P("chesterfield-sofa", "by-fabric/08-charcoal/daneen-chesterfield-sofa-3-seat-charcoal-studio-front.jpg"), studioFront: P("chesterfield-sofa", "by-fabric/08-charcoal/daneen-chesterfield-sofa-3-seat-charcoal-studio-front.jpg"), studioAngle: P("chesterfield-sofa", "by-fabric/08-charcoal/daneen-chesterfield-sofa-3-seat-charcoal-studio-angle.jpg") },
    ],
    lifestyle: [
      { fabricName: "Beige", fabricHex: "#d9c7a8", images: [P("chesterfield-sofa", "lifestyle/beige/daneen-chesterfield-sofa-3-seat-beige-lifestyle-threequarter.jpg"), P("chesterfield-sofa", "lifestyle/beige/daneen-chesterfield-sofa-3-seat-beige-lifestyle-wide.jpg")] },
      { fabricName: "Teal", fabricHex: "#2f6f75", images: [P("chesterfield-sofa", "lifestyle/teal/daneen-chesterfield-sofa-3-seat-teal-lifestyle-threequarter.jpg"), P("chesterfield-sofa", "lifestyle/teal/daneen-chesterfield-sofa-3-seat-teal-lifestyle-wide.jpg")] },
      { fabricName: "Navy", fabricHex: "#1c2740", images: [P("chesterfield-sofa", "lifestyle/navy/daneen-chesterfield-sofa-3-seat-navy-lifestyle-threequarter.jpg"), P("chesterfield-sofa", "lifestyle/navy/daneen-chesterfield-sofa-3-seat-navy-lifestyle-wide.jpg")] },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return products.map((p) => p.slug);
}
