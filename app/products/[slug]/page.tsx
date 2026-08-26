import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import { getAllSlugs, getProduct, products } from "../../lib/products";
import ProductGallery from "./ProductGallery";
import SizeConfigurationMatrix from "./SizeConfigurationMatrix";
import TrendingProducts from "./TrendingProducts";
import "./dfs-product.css";
import "./dfs-fixes.css";
import "./mobile-pdp-order.css";
import "./mobile-final.css";
import "./trending.css";
import "./restore-prior.css";

const SITE_URL = "https://sofas-by-daneen-fashion-recreation.ahmedfayyaz47.chatgpt.site";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

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

  return <><a className="skip-link" href="#main-content">Skip to content</a><div id="top"><div className="announce"><span aria-hidden="true">‹</span><p>Autumn promotional events and mid-season clearance sales across UK</p><span aria-hidden="true">›</span></div><SiteHeader /><main id="main-content" className="dfs-product-page"><nav className="dfs-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/shop">Shop</Link><span>/</span><span>{product.category}</span><span>/</span><span>{product.name}</span></nav><ProductGallery product={product} initialFabricCode={fabric} /><SizeConfigurationMatrix product={product} /><TrendingProducts currentSlug={product.slug} items={trendingItems} /></main><footer id="showrooms" className="deferred-section"><Link className="footer-logo" href="/#top">Sofas By Daneen</Link><div className="copyright"><span>LANGUAGE &nbsp; English</span><span>Copyright © 2026 Sofas By Daneen. Designed by BureauBarbara</span></div></footer></div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></>;
}
