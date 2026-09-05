// Product catalog — sourced live from Shopify (Storefront API).
//
// Nothing about a product (price, images, stock, description, sale price,
// colours) is authored in this file any more. It all comes from
// app/lib/shopify.ts, which reads your Shopify store directly. To change a
// product, edit it in Shopify admin — this file just maps Shopify's shape
// onto the shape the rest of the site's components expect.
//
// See the README section "Connecting to Shopify" for how to point this at
// your store.

import { fetchAllShopifyProducts, fetchShopifyProductByHandle, isShopifyConfigured, type ShopifyProduct, type ShopifyVariant } from "./shopify";

export type Fabric = {
  code: string;
  name: string;
  hex: string;
  swatchImage: string;
  studioFront: string;
  studioAngle: string;
  lifestyle?: string[];
  /** Fabric range / material name (e.g. "Adele", "Surrey") when sourced from the fabric-swatch library. */
  material?: string;
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

export type ProductType = "corner" | "chaise" | "u-shape" | "modular" | "chesterfield" | "recliner" | "sofa-bed" | "cinema" | "sofa";
export type ColorFamily = "grey" | "blue" | "beige" | "green" | "red" | "brown" | "black" | "ivory";

export type Product = {
  slug: string;
  name: string;
  type: ProductType;
  category: string;
  tagline: string;
  heroImage: string;
  priceFrom: string;
  priceFromValue: number;
  compareAtPrice?: string;
  inStock: boolean;
  intro: string[];
  silhouette: string;
  details: { label: string; value: string }[];
  fabrics: Fabric[];
  sizes?: SizeVariant[];
  colorFamilies: ColorFamily[];
  seatOptions: number[];
  lifestyle: LifestyleSet[];
  defaultFabricCode: string;
};

export function colorFamilyFromFabric(fabric: Fabric): ColorFamily {
  const name = fabric.name.toLowerCase();

  if (/\b(white|ivory|boucl|cream)\b/.test(name)) return "ivory";
  if (/\b(beige|oatmeal|stone|linen|tan|mustard)\b/.test(name)) return "beige";
  if (/\b(grey|gray|slate)\b/.test(name)) return "grey";
  if (/\b(blue|navy|midnight)\b/.test(name)) return "blue";
  if (/\b(teal|green|emerald)\b/.test(name)) return "green";
  if (/\b(red|crimson|burgundy)\b/.test(name)) return "red";
  if (/\b(brown|chocolate|rust|orange)\b/.test(name)) return "brown";
  if (/\b(black|charcoal)\b/.test(name)) return "black";

  const hex = fabric.hex.replace("#", "");
  const red = parseInt(hex.slice(0, 2), 16) || 0;
  const green = parseInt(hex.slice(2, 4), 16) || 0;
  const blue = parseInt(hex.slice(4, 6), 16) || 0;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

  if (brightness > 220) return "ivory";
  if (brightness < 55) return "black";
  if (max - min < 28) return "grey";
  if (red > green + 30 && red > blue + 30) return green > blue ? "brown" : "red";
  if (blue > red + 25 && blue > green + 15) return "blue";
  if (green >= red && green >= blue) return "green";
  return "beige";
}

function uniqueSorted<T extends string | number>(values: T[]): T[] {
  return Array.from(new Set(values)).sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true })) as T[];
}

const COLOUR_HEX: Record<string, string> = {
  grey: "#7c8894",
  gray: "#7c8894",
  slate: "#5b6b78",
  navy: "#1f2b45",
  blue: "#2456ac",
  beige: "#d8c6b0",
  oatmeal: "#e3d6c4",
  stone: "#d9cdbc",
  linen: "#efe6dc",
  tan: "#b5793f",
  mustard: "#c9a233",
  green: "#3f6b4a",
  emerald: "#0e6b4f",
  teal: "#1f6b6b",
  red: "#a3283a",
  burgundy: "#6b1438",
  crimson: "#9c1f34",
  brown: "#5a3a26",
  chocolate: "#4a2c1c",
  black: "#1c1a19",
  charcoal: "#2c2b29",
  ivory: "#f3ece0",
  cream: "#f2e9d8",
  white: "#faf8f4",
};

function hexFromName(name: string): string {
  const lower = name.toLowerCase();
  for (const [word, hex] of Object.entries(COLOUR_HEX)) {
    if (lower.includes(word)) return hex;
  }
  return "#8a8378";
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Guess a couture-style ProductType bucket from Shopify's productType/tags. */
function inferType(productType: string, tags: string[]): ProductType {
  const haystack = `${productType} ${tags.join(" ")}`.toLowerCase();
  if (haystack.includes("corner") || haystack.includes("l shape") || haystack.includes("l-shape")) return "corner";
  if (haystack.includes("u-shape") || haystack.includes("u shape")) return "u-shape";
  if (haystack.includes("chaise")) return "chaise";
  if (haystack.includes("chesterfield")) return "chesterfield";
  if (haystack.includes("recliner")) return "recliner";
  if (haystack.includes("sofa bed") || haystack.includes("sofa-bed")) return "sofa-bed";
  if (haystack.includes("cinema")) return "cinema";
  if (haystack.includes("modular")) return "modular";
  return "sofa";
}

/** Guess seat count(s) from the title/tags, e.g. "2 Seater", "3+2 Seater Set". */
function inferSeatOptions(title: string, tags: string[]): number[] {
  const haystack = `${title} ${tags.join(" ")}`.toLowerCase();
  const combo = haystack.match(/(\d)\s*\+\s*(\d)/);
  if (combo) return uniqueSorted([Number(combo[1]), Number(combo[2])]);
  const single = haystack.match(/(\d)\s*seater/);
  if (single) return [Number(single[1])];
  return [3];
}

function stripHtml(html: string): string {
  return html
    .replace(/<li>/g, "• ")
    .replace(/<\/li>/g, "\n")
    .replace(/<\/p>/g, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .trim();
}

function paragraphsFromHtml(html: string): string[] {
  const matches = [...html.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => stripHtml(m[1]).trim()).filter(Boolean);
  if (matches.length) return matches;
  const plain = stripHtml(html);
  return plain ? [plain] : [];
}

function detailsFromHtml(html: string): { label: string; value: string }[] {
  const items = [...html.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => stripHtml(m[1]).trim()).filter(Boolean);
  return items.map((value) => ({ label: "", value }));
}

function money(amount: string, currencyCode: string): string {
  const value = Number(amount);
  const symbol = currencyCode === "GBP" ? "£" : currencyCode === "USD" ? "$" : currencyCode === "EUR" ? "€" : `${currencyCode} `;
  return `${symbol}${value.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function titleCaseWords(value: string): string {
  return value.replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Derive a colour name for one swatch image from its alt text ("Adele – Navy") or filename ("adele-navy.png"). */
function colourNameFromSwatch(rangeName: string, altText: string | null, url: string): string {
  if (altText) {
    const parts = altText.split(/[–—-]/).map((s) => s.trim()).filter(Boolean);
    const last = parts[parts.length - 1];
    if (last && last.toLowerCase() !== rangeName.toLowerCase()) return last;
  }
  const filename = url.split("/").pop()?.split("?")[0] ?? "";
  const base = filename.replace(/\.[a-z0-9]+$/i, "");
  const withoutRange = base.toLowerCase().startsWith(rangeName.toLowerCase()) ? base.slice(rangeName.length) : base;
  const cleaned = withoutRange.replace(/^[-_ ]+/, "").replace(/[-_]+/g, " ").trim();
  return cleaned ? titleCaseWords(cleaned) : titleCaseWords(base);
}

/** Build Fabric entries from the product's linked fabric-range metaobjects (Material/Colour swatch library uploaded in Shopify admin). */
function fabricsFromMetaobjects(product: ShopifyProduct): Fabric[] {
  const ranges = product.fabricRanges?.references?.edges.map((e) => e.node) ?? [];
  const fabrics: Fabric[] = [];

  // Metaobject swatches are small texture chips for the colour picker, not
  // full product photography — the actual gallery images always come from
  // the product itself, since this store doesn't shoot a separate studio
  // photo per fabric colourway.
  const images = product.images.edges.map((e) => e.node.url);
  const heroImage = product.featuredImage?.url ?? images[0] ?? "";

  for (const range of ranges) {
    const rangeName = range.name?.value?.trim();
    if (!rangeName) continue;
    const swatchEdges = range.swatches?.references?.edges ?? [];

    for (const swatchEdge of swatchEdges) {
      const image = swatchEdge.node.image;
      if (!image?.url) continue;
      const colour = colourNameFromSwatch(rangeName, image.altText, image.url);
      fabrics.push({
        code: slugify(`${rangeName}-${colour}`),
        name: colour,
        material: rangeName,
        hex: hexFromName(colour),
        swatchImage: image.url,
        studioFront: heroImage,
        studioAngle: images[1] ?? heroImage,
        lifestyle: images.slice(1),
      });
    }
  }

  return fabrics;
}

/** Build one Fabric entry per distinct "Colour"/"Color" variant option, falling back to a single synthetic fabric from the product's main image. */
function fabricsFromShopify(product: ShopifyProduct): Fabric[] {
  const fromMetaobjects = fabricsFromMetaobjects(product);
  if (fromMetaobjects.length > 0) return fromMetaobjects;

  const images = product.images.edges.map((e) => e.node.url);
  const heroImage = product.featuredImage?.url ?? images[0] ?? "";

  const colourOptionName = product.options.find((o) => /colou?r/i.test(o.name))?.name;
  const variants = product.variants.edges.map((e) => e.node);

  if (colourOptionName && variants.length > 1) {
    const seen = new Map<string, ShopifyVariant>();
    for (const variant of variants) {
      const value = variant.selectedOptions.find((o) => o.name === colourOptionName)?.value;
      if (value && !seen.has(value)) seen.set(value, variant);
    }
    if (seen.size > 0) {
      return Array.from(seen.entries()).map(([name, variant]) => {
        const image = variant.image?.url ?? heroImage;
        return {
          code: slugify(name),
          name,
          hex: hexFromName(name),
          swatchImage: image,
          studioFront: image,
          studioAngle: image,
          lifestyle: images.filter((url) => url !== image),
        };
      });
    }
  }

  // No colour variants configured in Shopify yet — one fabric from the product itself.
  const fallbackName = product.title.replace(/^The\s+/i, "");
  return [
    {
      code: "default",
      name: fallbackName,
      hex: hexFromName(fallbackName),
      swatchImage: heroImage,
      studioFront: heroImage,
      studioAngle: images[1] ?? heroImage,
      lifestyle: images.slice(1),
    },
  ];
}

function mapShopifyProduct(raw: ShopifyProduct): Product {
  const fabrics = fabricsFromShopify(raw);
  const heroImage = raw.featuredImage?.url ?? raw.images.edges[0]?.node.url ?? "";
  const minPrice = raw.priceRange.minVariantPrice;
  const compareAt = raw.compareAtPriceRange?.minVariantPrice;
  const hasRealDiscount = compareAt && Number(compareAt.amount) > Number(minPrice.amount);

  return {
    slug: raw.handle,
    name: raw.title,
    type: inferType(raw.productType, raw.tags),
    category: raw.productType || "Sofas",
    tagline: paragraphsFromHtml(raw.descriptionHtml)[0]?.split(/(?<=[.!?])\s/)[0] ?? raw.title,
    heroImage,
    priceFrom: money(minPrice.amount, minPrice.currencyCode),
    priceFromValue: Number(minPrice.amount),
    compareAtPrice: hasRealDiscount ? money(compareAt.amount, compareAt.currencyCode) : undefined,
    inStock: raw.availableForSale && (raw.totalInventory ?? 0) > 0,
    intro: paragraphsFromHtml(raw.descriptionHtml),
    silhouette: raw.description,
    details: detailsFromHtml(raw.descriptionHtml),
    fabrics,
    colorFamilies: uniqueSorted(fabrics.map(colorFamilyFromFabric)),
    seatOptions: inferSeatOptions(raw.title, raw.tags),
    lifestyle: fabrics.map((f) => ({ fabricName: f.name, fabricHex: f.hex, images: [f.studioFront, f.studioAngle, ...(f.lifestyle ?? [])] })),
    defaultFabricCode: fabrics[0]?.code ?? "default",
  };
}

let cache: { at: number; products: Product[] } | null = null;
const CACHE_MS = 60_000;

export async function getProducts(): Promise<Product[]> {
  if (!isShopifyConfigured) return [];
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.products;

  const raw = await fetchAllShopifyProducts();
  const products = raw.map(mapShopifyProduct);
  cache = { at: Date.now(), products };
  return products;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  if (!isShopifyConfigured) return undefined;

  const cached = cache?.products.find((p) => p.slug === slug);
  if (cached) return cached;

  const raw = await fetchShopifyProductByHandle(slug);
  return raw ? mapShopifyProduct(raw) : undefined;
}

export async function getAllSlugs(): Promise<string[]> {
  const products = await getProducts();
  return products.map((p) => p.slug);
}
