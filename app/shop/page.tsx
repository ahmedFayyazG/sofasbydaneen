import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import SiteHeader from "../components/SiteHeader";
import { products } from "../lib/products";
import ShopFilters from "./ShopFilters";
import "./shop.css";

export const metadata: Metadata = {
  title: "Shop Sofas | Sofas By Daneen",
  description: "Filter Sofas By Daneen sofas by type, colour family and size.",
  alternates: { canonical: "/shop" },
};

const colourLabels: Record<string, string> = {
  ivory: "Ivory", beige: "Beige", grey: "Grey", green: "Green", red: "Red", brown: "Brown", blue: "Blue", black: "Black",
};

const typeLabels: Record<string, string> = {
  corner: "Corner", chaise: "Chaise", "u-shape": "U-Shaped", modular: "Modular", chesterfield: "Chesterfield", recliner: "Recliner", "sofa-bed": "Sofa Bed", cinema: "Cinema",
};

const colourCopy: Record<string, string> = {
  ivory: "Soft, warm and endlessly versatile, ivory sofas bring an easy sense of light to the room. Explore relaxed neutral upholstery across our made-to-order collection.",
  beige: "Warm and understated, beige sofas create a calm foundation for layered interiors, natural textures and everyday living.",
  grey: "From pale stone to deep charcoal, grey sofas offer an adaptable backdrop for modern and classic rooms alike.",
  green: "Bring a natural, grounded tone into your living space with green upholstery ranging from muted earthy shades to deeper statement colours.",
  red: "Rich and expressive, red sofas add warmth and character while retaining the tailored finish of our made-to-order silhouettes.",
  brown: "Earthy brown upholstery brings depth, warmth and an effortless lived-in quality to a room.",
  blue: "From quiet slate to deep midnight, blue sofas introduce calm colour with a refined, architectural feel.",
  black: "Confident and graphic, black sofas create a strong anchor for contemporary interiors and layered neutral schemes.",
};

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ type?: string; color?: string; seats?: string }> }) {
  const params = await searchParams;
  const initialFilters = { type: params.type ?? null, color: params.color ?? null, seats: params.seats ?? null };
  const colour = params.color ? colourLabels[params.color] : null;
  const type = params.type ? typeLabels[params.type] : null;
  const collectionTitle = colour && type ? `${colour} ${type} Sofas` : colour ? `${colour} Sofas` : type ? `${type} Sofas` : "Shop Sofas";
  const intro = colour && colourCopy[params.color ?? ""]
    ? colourCopy[params.color ?? ""]
    : type
      ? `Explore our ${type.toLowerCase()} sofa collection, handcrafted to order in a choice of considered fabrics and colours for your home.`
      : "Find the right silhouette, colour and size across our handcrafted collection.";

  const shortcuts = colour
    ? [
        { label: `${colour} Corner Sofas`, href: `/shop?color=${params.color}&type=corner` },
        { label: `${colour} Chaise Sofas`, href: `/shop?color=${params.color}&type=chaise` },
        { label: `${colour} Modular Sofas`, href: `/shop?color=${params.color}&type=modular` },
        { label: `${colour} Chesterfield Sofas`, href: `/shop?color=${params.color}&type=chesterfield` },
        { label: `All ${colour} Sofas`, href: `/shop?color=${params.color}` },
      ]
    : [];

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div id="top">
        <div className="announce"><span aria-hidden="true">‹</span><p>Autumn promotional events and mid-season clearance sales across UK</p><span aria-hidden="true">›</span></div>
        <SiteHeader />
        <main id="main-content" className="daneen-shop-shell">
          <nav className="shop-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/shop">Sofas</Link>{colour && <><span>/</span><span>{colour}</span></>}</nav>
          <section className="shop-collection-hero" aria-labelledby="shop-title">
            <h1 id="shop-title">{collectionTitle}</h1>
            <p>{intro}</p>
            {shortcuts.length > 0 && <div className="shop-shortcuts">{shortcuts.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}</div>}
          </section>

          <Suspense fallback={<div className="shop-loading">Loading sofas...</div>}>
            <ShopFilters products={products} initialFilters={initialFilters} />
          </Suspense>
        </main>

        <footer id="showrooms" className="deferred-section">
          <Link className="footer-logo" href="/#top" aria-label="Sofas By Daneen home">Sofas By Daneen</Link>
          <div className="copyright"><span>LANGUAGE &nbsp; English</span><span>Copyright © 2026 Sofas By Daneen. Designed by BureauBarbara</span></div>
        </footer>
      </div>
    </>
  );
}
