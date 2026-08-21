import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import { products } from "../lib/products";

export const metadata: Metadata = {
  title: "Our Collections | Sofas By Daneen",
  description: "Browse the Sofas By Daneen collection — corner sofas, chaise sofas, U-shape sectionals, modular seating and our Chesterfield, each handcrafted in the United Kingdom in couture fabrics.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div id="top">
        <div className="announce"><span aria-hidden="true">‹</span><p>Autumn promotional events and mid-season clearance sales across UK</p><span aria-hidden="true">›</span></div>
        <SiteHeader />
        <main id="main-content">
          <section className="cats-hero">
            <p className="kicker">THE COLLECTION</p>
            <h1>OUR SOFAS</h1>
            <p className="soft-copy">Five silhouettes, each handcrafted in our United Kingdom workshop and finished by hand in the fabric of your choosing.</p>
          </section>

          <section className="cats-grid" aria-label="Sofa categories">
            {products.map((product) => (
              <Link key={product.slug} href={`/collections/${product.slug}`} className="cat-card">
                <div className="cat-card-image">
                  <img src={product.heroImage} alt={product.name} width="800" height="800" loading="lazy" decoding="async" />
                </div>
                <span className="cat-card-label">{product.category}</span>
                <h2>{product.name}</h2>
                <p>{product.tagline}</p>
                <span className="cat-card-link">Explore the collection →</span>
              </Link>
            ))}
          </section>
        </main>

        <footer id="showrooms" className="deferred-section">
          <Link className="footer-logo" href="/#top" aria-label="Sofas By Daneen home">Sofas By Daneen</Link>
          <div className="copyright"><span>LANGUAGE &nbsp; English</span><span>Copyright © 2026 Sofas By Daneen. Designed by BureauBarbara</span></div>
        </footer>
      </div>
    </>
  );
}
