import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import { getAllSlugs, getProduct } from "../../lib/products";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.category} | Sofas By Daneen`,
    description: product.tagline,
    alternates: { canonical: `/collections/${product.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div id="top">
        <div className="announce"><span aria-hidden="true">‹</span><p>Autumn promotional events and mid-season clearance sales across UK</p><span aria-hidden="true">›</span></div>
        <SiteHeader />
        <main id="main-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/collections">Our Collections</Link><span aria-hidden="true">/</span><span>{product.category}</span>
          </nav>

          <section className="cat-hero" aria-label={product.category}>
            <div className="cat-hero-image">
              <img src={product.heroImage} alt={product.name} width="1080" height="1080" loading="eager" decoding="async" />
            </div>
            <div className="cat-hero-copy">
              <p className="kicker">{product.category.toUpperCase()}</p>
              <h1>{product.name}</h1>
              <p className="soft-copy">{product.tagline}</p>
              <p className="cat-price">From {product.priceFrom}</p>
              <Link className="pill filled" href={`/products/${product.slug}`}>VIEW PRODUCT DETAILS →</Link>
            </div>
          </section>

          <section className="cat-fabrics" aria-label="Available fabrics">
            <h2>Available in {product.fabrics.length} couture fabrics</h2>
            <div className="fabric-grid">
              {product.fabrics.map((fabric) => (
                <Link key={fabric.code} href={`/products/${product.slug}?fabric=${fabric.code}`} className="fabric-card">
                  <div className="fabric-card-image">
                    <img src={fabric.studioFront} alt={`${product.name} in ${fabric.name}`} width="500" height="500" loading="lazy" decoding="async" />
                  </div>
                  <span className="fabric-card-swatch" style={{ background: fabric.hex }} aria-hidden="true"></span>
                  <span>{fabric.name}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="cat-other" aria-label="Other collections">
            <h2>Explore our other silhouettes</h2>
            <p><Link href="/collections">← Back to all collections</Link></p>
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
