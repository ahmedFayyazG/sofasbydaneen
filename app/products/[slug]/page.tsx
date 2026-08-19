import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import { getAllSlugs, getProduct } from "../../lib/products";
import ProductGallery from "./ProductGallery";

const SITE_URL = "https://sofas-by-daneen-fashion-recreation.ahmedfayyaz47.chatgpt.site";

export function generateStaticParams() { return getAllSlugs().map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const product = getProduct(slug); if (!product) return {};
  return { title: `${product.name} | Sofas By Daneen`, description: product.tagline, alternates: { canonical: `/products/${product.slug}` }, openGraph: { title: `${product.name} | Sofas By Daneen`, description: product.tagline, images: [{ url: product.heroImage }] } };
}

export default async function ProductPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ fabric?: string }> }) {
  const { slug } = await params; const { fabric } = await searchParams; const product = getProduct(slug); if (!product) notFound();
  const structuredData = { "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.tagline, image: `${SITE_URL}${product.heroImage}`, brand: { "@type": "Brand", name: "Sofas By Daneen" }, offers: { "@type": "AggregateOffer", priceCurrency: "EUR", lowPrice: product.priceFrom.replace(/[^\d.,]/g, "").replace(",", "."), availability: "https://schema.org/InStock", url: `${SITE_URL}/products/${product.slug}` } };

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div id="top">
      <div className="announce"><span aria-hidden="true">‹</span><p>Handcrafted sofas · International delivery</p><span aria-hidden="true">›</span></div>
      <SiteHeader />
      <main id="main-content" className="sbd-product-page">
        <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/collections">Sofas</Link><span>/</span><Link href={`/collections/${product.slug}`}>{product.category}</Link><span>/</span><span>{product.name}</span></nav>
        <ProductGallery product={product} initialFabricCode={fabric} />

        <section className="sbd-reassurance-strip" aria-label="Shopping benefits">
          <div><b>Made to order</b><span>Crafted for your home</span></div><div><b>Fabric samples</b><span>Explore colours at home</span></div><div><b>Expert advice</b><span>Help choosing your perfect sofa</span></div><div><b>Quality construction</b><span>Designed for everyday living</span></div>
        </section>

        <section className="sbd-product-story">
          <div><p className="kicker">DESIGNED FOR LIVING</p><h2>About {product.name}</h2></div>
          <div>{product.intro.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<p>{product.silhouette}</p></div>
        </section>

        <section className="sbd-accordion-section" aria-labelledby="details-title">
          <h2 id="details-title">Product details</h2>
          <details open><summary>Dimensions & configuration <span>+</span></summary><div className="sbd-detail-content">{product.sizes ? product.sizes.map((s) => <p key={s.seats}><b>{s.label}</b><span>{s.seats} seat configuration</span></p>) : <p><b>Configuration</b><span>{product.details.find((d) => d.label === "Configuration")?.value ?? "Made to order"}</span></p>}</div></details>
          <details><summary>Materials & construction <span>+</span></summary><dl className="details-list">{product.details.map((detail) => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>)}</dl></details>
          <details><summary>Delivery & lead time <span>+</span></summary><div className="sbd-detail-copy"><p>Your sofa is made to order. Our team will confirm access and delivery details with you before dispatch.</p><p>{product.details.find((d) => d.label === "Lead time")?.value}</p></div></details>
          <details><summary>Care & guarantee <span>+</span></summary><div className="sbd-detail-copy"><p>Vacuum gently with an upholstery attachment, rotate loose cushions regularly and keep upholstered furniture away from prolonged direct sunlight.</p></div></details>
        </section>

        <section className="product-fabric-list" aria-labelledby="fabric-list-title"><p className="kicker">MAKE IT YOURS</p><h2 id="fabric-list-title">Explore every fabric</h2><div className="fabric-grid">{product.fabrics.map((f) => <Link key={f.code} href={`/products/${product.slug}?fabric=${f.code}`} className="fabric-card"><div className="fabric-card-image"><img src={f.studioFront} alt={`${product.name} in ${f.name}`} width="500" height="500" loading="lazy" /></div><span className="fabric-card-swatch" style={{ background: f.hex }} /><span>{f.name}</span></Link>)}</div></section>
        <section className="product-other"><p><Link href="/collections">← Back to all collections</Link></p></section>
      </main>
      <footer id="showrooms" className="deferred-section"><a className="footer-logo" href="/#top">Sofas By Daneen</a><div className="copyright"><span>LANGUAGE &nbsp; English</span><span>Copyright © 2026 Sofas By Daneen</span></div></footer>
    </div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </>;
}
