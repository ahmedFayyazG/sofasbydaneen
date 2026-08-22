import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import { getAllSlugs, getProduct, products } from "../../lib/products";
import ProductGallery from "./ProductGallery";
import TrendingProducts from "./TrendingProducts";
import "./product.css";
import "./product-refine.css";
import "./dfs-product.css";
import "./trending.css";

const SITE_URL = "https://sofas-by-daneen-fashion-recreation.ahmedfayyaz47.chatgpt.site";
export function generateStaticParams() { return getAllSlugs().map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: `${product.name} | Sofas By Daneen`, description: product.tagline, alternates: { canonical: `/products/${product.slug}` }, openGraph: { title: `${product.name} | Sofas By Daneen`, description: product.tagline, images: [{ url: product.heroImage }] } };
}

export default async function ProductPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ fabric?: string }> }) {
  const { slug } = await params;
  const { fabric } = await searchParams;
  const product = getProduct(slug);
  if (!product) notFound();

  const structuredData = { "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.tagline, image: `${SITE_URL}${product.heroImage}`, brand: { "@type": "Brand", name: "Sofas By Daneen" }, offers: { "@type": "AggregateOffer", priceCurrency: "GBP", lowPrice: product.priceFromValue, availability: "https://schema.org/InStock", url: `${SITE_URL}/products/${product.slug}` } };
  const trendingItems = products.map((item) => ({ slug: item.slug, name: item.name, category: item.category, image: item.heroImage, price: item.priceFrom, fabric: item.fabrics.find((f) => f.code === item.defaultFabricCode)?.name ?? item.fabrics[0]?.name ?? "Made to order" }));

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div id="top">
      <div className="announce"><span aria-hidden="true">‹</span><p>Autumn promotional events and mid-season clearance sales across UK</p><span aria-hidden="true">›</span></div>
      <SiteHeader />
      <main id="main-content" className="sbd-product-page">
        <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/shop">Shop</Link><span>/</span><Link href={`/collections/${product.slug}`}>{product.category}</Link><span>/</span><span>{product.name}</span></nav>
        <ProductGallery product={product} initialFabricCode={fabric} />
        <section className="product-fabric-list" aria-labelledby="fabric-list-title"><p className="kicker">MAKE IT YOURS</p><h2 id="fabric-list-title">Explore every fabric</h2><div className="fabric-grid">{product.fabrics.map((item) => <Link key={item.code} href={`/products/${product.slug}?fabric=${item.code}`} className="fabric-card"><div className="fabric-card-image"><img src={item.studioFront} alt={`${product.name} in ${item.name}`} width="500" height="500" loading="lazy" decoding="async" /></div><span className="fabric-card-swatch" style={{ background: item.hex }} /><span>{item.name}</span></Link>)}</div></section>
        <TrendingProducts currentSlug={product.slug} items={trendingItems} />
        <section className="product-other" aria-label="Explore other collections"><p><Link href="/shop">← Back to shop</Link></p></section>
      </main>
      <footer id="showrooms" className="deferred-section"><Link className="footer-logo" href="/#top">Sofas By Daneen</Link><div className="copyright"><span>LANGUAGE &nbsp; English</span><span>Copyright © 2026 Sofas By Daneen. Designed by BureauBarbara</span></div></footer>
    </div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </>;
}
