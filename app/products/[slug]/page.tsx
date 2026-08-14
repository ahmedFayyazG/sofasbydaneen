import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import { getAllSlugs, getProduct } from "../../lib/products";
import ProductGallery from "./ProductGallery";

const SITE_URL = "https://sofas-by-daneen-fashion-recreation.ahmedfayyaz47.chatgpt.site";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Sofas By Daneen`,
    description: product.tagline,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} | Sofas By Daneen`,
      description: product.tagline,
      images: [{ url: product.heroImage }],
    },
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ fabric?: string }>;
}) {
  const { slug } = await params;
  const { fabric } = await searchParams;
  const product = getProduct(slug);
  if (!product) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.tagline,
    image: `${SITE_URL}${product.heroImage}`,
    brand: { "@type": "Brand", name: "Sofas By Daneen" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: product.priceFrom.replace(/[^\d.,]/g, "").replace(",", "."),
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/products/${product.slug}`,
    },
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div id="top">
        <div className="announce"><span aria-hidden="true">‹</span><p>International delivery.</p><span aria-hidden="true">›</span></div>
        <SiteHeader />
        <main id="main-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/collections">Our Collections</Link><span aria-hidden="true">/</span>
            <Link href={`/collections/${product.slug}`}>{product.category}</Link><span aria-hidden="true">/</span>
            <span>{product.name}</span>
          </nav>

          <section className="product-hero" aria-label={product.name}>
            <ProductGallery product={product} initialFabricCode={fabric} />
            <div className="product-info">
              <p className="kicker">{product.category.toUpperCase()}</p>
              <h1>{product.name}</h1>
              <p className="soft-copy">{product.tagline}</p>
              <p className="cat-price">From {product.priceFrom}</p>
              <div className="promises product-promises">
                <span>• &nbsp; MADE IN FRANCE</span><span>• &nbsp; ARTISANAL BESPOKE</span><span>• &nbsp; INTERNATIONAL DELIVERY</span>
              </div>
              <a className="pill filled" href="#showrooms">REQUEST A QUOTE →</a>
              <a className="pill" href="#showrooms">ORDER A FABRIC SAMPLE →</a>
            </div>
          </section>

          <section className="product-content" aria-labelledby="about-title">
            <h2 id="about-title">The Silhouette</h2>
            {product.intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <p className="silhouette-copy">{product.silhouette}</p>
          </section>

          <section className="product-details" aria-labelledby="details-title">
            <h2 id="details-title">Construction &amp; Materials</h2>
            <dl className="details-list">
              {product.details.map((detail) => (
                <div key={detail.label}>
                  <dt>{detail.label}</dt>
                  <dd>{detail.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {product.lifestyle.length > 0 && (
            <section className="product-lifestyle" aria-labelledby="lifestyle-title">
              <h2 id="lifestyle-title">In the Room</h2>
              <div className="lifestyle-grid">
                {product.lifestyle.flatMap((set) =>
                  set.images.map((image, index) => (
                    <figure key={`${set.fabricName}-${index}`}>
                      <img src={image} alt={`${product.name} in ${set.fabricName}, styled in a living room`} width="900" height="675" loading="lazy" decoding="async" />
                      <figcaption><span style={{ background: set.fabricHex }} aria-hidden="true"></span>{set.fabricName}</figcaption>
                    </figure>
                  ))
                )}
              </div>
            </section>
          )}

          <section className="product-fabric-list" aria-labelledby="fabric-list-title">
            <h2 id="fabric-list-title">All Fabrics</h2>
            <div className="fabric-grid">
              {product.fabrics.map((f) => (
                <Link key={f.code} href={`/products/${product.slug}?fabric=${f.code}`} className="fabric-card">
                  <div className="fabric-card-image">
                    <img src={f.studioFront} alt={`${product.name} in ${f.name}`} width="500" height="500" loading="lazy" decoding="async" />
                  </div>
                  <span className="fabric-card-swatch" style={{ background: f.hex }} aria-hidden="true"></span>
                  <span>{f.name}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="product-other" aria-label="Explore other collections">
            <p><Link href="/collections">← Back to all collections</Link></p>
          </section>
        </main>

        <footer id="showrooms" className="deferred-section">
          <a className="footer-logo" href="/#top" aria-label="Sofas By Daneen home">Sofas By Daneen</a>
          <div className="copyright"><span>LANGUAGE &nbsp; English</span><span>Copyright © 2026 Sofas By Daneen. Designed by BureauBarbara</span></div>
        </footer>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
