"use client";

import { useMemo, useState } from "react";
import type { Product } from "../../lib/products";

export default function ProductGallery({ product, initialFabricCode }: { product: Product; initialFabricCode?: string }) {
  const initialFabric = product.fabrics.find((f) => f.code === initialFabricCode) ?? product.fabrics.find((f) => f.code === product.defaultFabricCode) ?? product.fabrics[0];
  const [fabricCode, setFabricCode] = useState(initialFabric.code);
  const [seats, setSeats] = useState<number | null>(product.sizes ? product.sizes[Math.min(2, product.sizes.length - 1)].seats : null);
  const [view, setView] = useState<"front" | "angle">("front");
  const [fabricOpen, setFabricOpen] = useState(true);

  const fabric = useMemo(() => product.fabrics.find((f) => f.code === fabricCode) ?? product.fabrics[0], [product.fabrics, fabricCode]);
  const size = useMemo(() => (product.sizes ? product.sizes.find((s) => s.seats === seats) ?? product.sizes[0] : null), [product.sizes, seats]);
  const mainImage = product.sizes && size && fabricCode === product.defaultFabricCode
    ? (view === "front" ? size.studioFront : size.studioAngle)
    : (view === "front" ? fabric.studioFront : fabric.studioAngle);

  const galleryImages = [fabric.studioFront, fabric.studioAngle, ...(fabric.lifestyle ?? [])].filter(Boolean);

  return (
    <div className="sbd-configurator">
      <div className="sbd-gallery-column">
        <div className="sbd-gallery-stage">
          <img src={mainImage} alt={`${product.name} in ${fabric.name}${size ? `, ${size.label}` : ""}`} width="1200" height="900" loading="eager" decoding="async" />
          <button className="sbd-wishlist" type="button" aria-label="Add to favourites">♡</button>
          <span className="sbd-gallery-count">{view === "front" ? "1" : "2"} / {Math.max(galleryImages.length, 2)}</span>
        </div>
        <div className="sbd-thumbnails" aria-label="Product views">
          <button type="button" className={view === "front" ? "active" : ""} onClick={() => setView("front")}>
            <img src={fabric.studioFront} alt="Front view" />
          </button>
          <button type="button" className={view === "angle" ? "active" : ""} onClick={() => setView("angle")}>
            <img src={fabric.studioAngle} alt="Angled view" />
          </button>
          {(fabric.lifestyle ?? []).slice(0, 3).map((image, index) => (
            <button type="button" key={image} onClick={() => setView(index % 2 === 0 ? "angle" : "front")}>
              <img src={image} alt={`Lifestyle view ${index + 1}`} />
            </button>
          ))}
        </div>
      </div>

      <aside className="sbd-buy-panel">
        <p className="sbd-eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="sbd-rating">★★★★★ <u>4.9 (32 reviews)</u></p>
        <p className="sbd-tagline">{product.tagline}</p>
        <div className="sbd-price-row"><strong>From {product.priceFrom}</strong><span>or pay monthly with flexible finance</span></div>

        {product.sizes && (
          <section className="sbd-option-block">
            <div className="sbd-option-heading"><strong>1. Choose your size</strong><span>{size?.label}</span></div>
            <div className="sbd-size-grid">
              {product.sizes.map((s) => (
                <button key={s.seats} type="button" className={seats === s.seats ? "active" : ""} onClick={() => setSeats(s.seats)}>
                  <b>{s.label}</b><small>{s.seats} seat{ s.seats === 1 ? "" : "s" }</small>
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="sbd-option-block">
          <button className="sbd-option-heading sbd-option-toggle" type="button" onClick={() => setFabricOpen((open) => !open)} aria-expanded={fabricOpen}>
            <strong>{product.sizes ? "2" : "1"}. Choose your fabric & colour</strong><span>{fabric.name} {fabricOpen ? "−" : "+"}</span>
          </button>
          {fabricOpen && <>
            <div className="sbd-selected-fabric">
              <span className="sbd-large-swatch" style={{ background: fabric.hex }} />
              <div><b>{fabric.name}</b><small>Made to order · {fabric.code}</small></div>
            </div>
            <div className="sbd-swatch-grid">
              {product.fabrics.map((f) => (
                <button key={f.code} type="button" className={f.code === fabricCode ? "active" : ""} aria-label={`Choose ${f.name}`} aria-pressed={f.code === fabricCode} onClick={() => setFabricCode(f.code)}>
                  <span style={{ background: f.hex }} />
                  <small>{f.name}</small>
                </button>
              ))}
            </div>
            <button type="button" className="sbd-sample-link">Order free fabric samples</button>
          </>}
        </section>

        <div className="sbd-delivery-card">
          <div><b>Made for you</b><span>Handcrafted to order</span></div>
          <div><b>Delivery</b><span>Room of choice delivery available</span></div>
          <div><b>Guarantee</b><span>Built for years of everyday living</span></div>
        </div>

        <a className="sbd-primary-cta" href="#showrooms">REQUEST A QUOTE</a>
        <a className="sbd-secondary-cta" href="#showrooms">BOOK A DESIGN APPOINTMENT</a>
        <p className="sbd-help">Need help choosing? Speak to our sofa specialists.</p>
      </aside>
    </div>
  );
}
