import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import SiteHeader from "../components/SiteHeader";
import { products } from "../lib/products";
import ShopFilters from "./ShopFilters";
import "./type-cards.css";

export const metadata: Metadata = {
  title: "Shop Sofas | Sofas By Daneen",
  description: "Filter Sofas By Daneen sofas by type, colour family and size.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; color?: string; seats?: string }>;
}) {
  const params = await searchParams;
  const initialFilters = {
    type: params.type ?? null,
    color: params.color ?? null,
    seats: params.seats ?? null,
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div id="top">
        <div className="announce"><span aria-hidden="true">‹</span><p>International delivery.</p><span aria-hidden="true">›</span></div>
        <SiteHeader />
        <main id="main-content">
          <section className="shop-hero" aria-labelledby="shop-title">
            <p className="kicker">SOFAS BY DANEEN</p>
            <h1 id="shop-title">Shop Sofas</h1>
            <p className="soft-copy">Find the right silhouette, colour and size across our handcrafted collection.</p>
          </section>

          <Suspense fallback={<div className="shop-loading">Loading shop filters...</div>}>
            <ShopFilters products={products} initialFilters={initialFilters} />
          </Suspense>
        </main>

        <footer id="showrooms" className="deferred-section">
          <Link className="footer-logo" href="/#top" aria-label="Sofas By Daneen home">Sofas By Daneen</Link>
          <div className="copyright"><span>LANGUAGE &nbsp; English</span><span>Copyright © 2026 Sofas By Daneen. Designed by BureauBarbara</span></div>
        </footer>
      </div>

      <style>{`
        /* Keep Shop by type, but remove the two promotional filter rows.
           Colour and size remain available inside the working Filter control. */
        .shop-page > .shop-filter-section:nth-of-type(2),
        .shop-page > .shop-filter-section:nth-of-type(3) {
          display: none !important;
        }

        /* Hide Sofa beds and Cinema sofas from Shop by type and the Type filter. */
        .shop-type-grid > .shop-type-tile:nth-child(7),
        .shop-type-grid > .shop-type-tile:nth-child(8),
        .ref-filter-groups > div:first-child > button:nth-of-type(7),
        .ref-filter-groups > div:first-child > button:nth-of-type(8) {
          display: none !important;
        }
      `}</style>
    </>
  );
}
