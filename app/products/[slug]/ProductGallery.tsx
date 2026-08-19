"use client";

import { useMemo, useState } from "react";
import type { Product } from "../../lib/products";

const fabricType = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("bouclé") || n.includes("boucle")) return "Bouclé";
  if (n.includes("velvet")) return "Velvet";
  if (n.includes("linen")) return "Linen";
  if (n.includes("chenille")) return "Chenille";
  if (n.includes("leather")) return "Leather";
  if (n.includes("woven")) return "Woven";
  return "Other";
};

const colourName = (name: string) => name
  .replace(/\b(Velvet|Linen|Bouclé|Boucle|Chenille|Leather|Woven)\b/gi, "")
  .trim();

export default function ProductGallery({ product, initialFabricCode }: { product: Product; initialFabricCode?: string }) {
  const initialFabric = product.fabrics.find((f) => f.code === initialFabricCode)
    ?? product.fabrics.find((f) => f.code === product.defaultFabricCode)
    ?? product.fabrics[0];

  const [fabricCode, setFabricCode] = useState(initialFabric.code);
  const [seats, setSeats] = useState<number | null>(product.sizes?.[Math.min(1, product.sizes.length - 1)]?.seats ?? null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activeType, setActiveType] = useState(fabricType(initialFabric.name));

  const fabric = useMemo(() => product.fabrics.find((f) => f.code === fabricCode) ?? product.fabrics[0], [product.fabrics, fabricCode]);
  const size = useMemo(() => product.sizes?.find((s) => s.seats === seats) ?? product.sizes?.[0] ?? null, [product.sizes, seats]);
  const types = useMemo(() => Array.from(new Set(product.fabrics.map((f) => fabricType(f.name)))), [product.fabrics]);
  const fabricsForType = useMemo(() => product.fabrics.filter((f) => fabricType(f.name) === activeType), [product.fabrics, activeType]);

  const studioFront = product.sizes && size && fabricCode === product.defaultFabricCode ? size.studioFront : fabric.studioFront;
  const studioAngle = product.sizes && size && fabricCode === product.defaultFabricCode ? size.studioAngle : fabric.studioAngle;
  const gallery = [studioFront, studioAngle, ...(fabric.lifestyle ?? [])].filter(Boolean);
  const mainImage = gallery[Math.min(galleryIndex, gallery.length - 1)] ?? studioFront;

  const selectFabric = (code: string) => {
    const next = product.fabrics.find((f) => f.code === code);
    if (!next) return;
    setFabricCode(code);
    setActiveType(fabricType(next.name));
    setGalleryIndex(0);
  };

  const chooseType = (type: string) => {
    setActiveType(type);
    const first = product.fabrics.find((f) => fabricType(f.name) === type);
    if (first) {
      setFabricCode(first.code);
      setGalleryIndex(0);
    }
  };

  return (
    <section className="daneen-pdp-grid">
      <div className="daneen-pdp-left">
        <div className="daneen-main-image">
          <span className="daneen-badge">BESTSELLER</span>
          <button className="daneen-heart" type="button" aria-label="Add to favourites">♡</button>
          <button className="daneen-arrow daneen-arrow-left" type="button" aria-label="Previous image" onClick={() => setGalleryIndex((i) => (i - 1 + gallery.length) % gallery.length)}>‹</button>
          <img src={mainImage} alt={`${product.name} in ${fabric.name}`} width="1100" height="820" />
          <button className="daneen-arrow daneen-arrow-right" type="button" aria-label="Next image" onClick={() => setGalleryIndex((i) => (i + 1) % gallery.length)}>›</button>
        </div>

        <div className="daneen-thumb-row">
          {gallery.slice(0, 4).map((image, index) => (
            <button key={`${image}-${index}`} type="button" className={galleryIndex === index ? "active" : ""} onClick={() => setGalleryIndex(index)}>
              <img src={image} alt={`${product.name} view ${index + 1}`} />
            </button>
          ))}
          <button type="button" className="daneen-360" aria-label="360 degree view"><span>↻</span><b>360°</b></button>
        </div>

        <div className="daneen-product-intro">
          <h1>{product.name}</h1>
          <div className="daneen-review-line"><span>★★★★★</span><b>4.9</b><small>(32)</small><a href="#reviews">Read reviews</a></div>
          <p>{product.tagline}. {product.intro[0]}</p>
        </div>

        <div className="daneen-feature-icons">
          <div><span>♢</span><p><b>10 Year Frame</b><small>Guarantee</small></p></div>
          <div><span>✦</span><p><b>Handcrafted</b><small>Made to order</small></p></div>
          <div><span>◉</span><p><b>Premium Quality</b><small>Materials</small></p></div>
          <div><span>£</span><p><b>Flexible Finance</b><small>Available</small></p></div>
        </div>

        <div className="daneen-left-accordions">
          <details><summary>Dimensions <span>+</span></summary><div>{product.sizes?.map((s) => <p key={s.seats}><b>{s.label}</b><span>{s.seats} seat configuration</span></p>) ?? <p>Made to order configuration</p>}</div></details>
          <details><summary>Product Details <span>+</span></summary><div>{product.details.map((d) => <p key={d.label}><b>{d.label}</b><span>{d.value}</span></p>)}</div></details>
          <details><summary>Delivery & Returns <span>+</span></summary><div><p>Your sofa is made to order. Delivery details and access will be confirmed before dispatch.</p></div></details>
          <details><summary>Care Guide <span>+</span></summary><div><p>Vacuum gently, rotate loose cushions regularly and keep upholstery away from prolonged direct sunlight.</p></div></details>
        </div>
      </div>

      <aside className="daneen-config-card">
        <div className="daneen-config-head">
          <small>Step 1 of 4</small>
          <h2>Create your {product.name.replace(/^The\s+/i, "")}</h2>
          <p>Choose your size, fabric and colour</p>
        </div>

        {product.sizes && (
          <div className="daneen-step">
            <h3>1. Choose your size</h3>
            <div className="daneen-size-options">
              {product.sizes.slice(0, 3).map((s) => (
                <button type="button" key={s.seats} className={size?.seats === s.seats ? "active" : ""} onClick={() => { setSeats(s.seats); setGalleryIndex(0); }}>
                  <b>{s.label}</b><small>{s.seats} Seater</small><span>From {product.priceFrom}</span>
                </button>
              ))}
            </div>
            <button className="daneen-text-button" type="button">▣ &nbsp; View dimensions</button>
          </div>
        )}

        <div className="daneen-step">
          <h3>{product.sizes ? "2" : "1"}. Choose your fabric</h3>
          <div className="daneen-fabric-tabs">
            {types.map((type) => <button key={type} type="button" className={activeType === type ? "active" : ""} onClick={() => chooseType(type)}>{type}</button>)}
          </div>
          <p className="daneen-showing">Showing {fabricsForType.length} {activeType} colour{fabricsForType.length === 1 ? "" : "s"}</p>
          <div className="daneen-fabric-tiles">
            {fabricsForType.map((f) => (
              <button key={f.code} type="button" className={f.code === fabricCode ? "active" : ""} title={f.name} aria-label={f.name} onClick={() => selectFabric(f.code)}>
                <span className="daneen-fabric-texture" style={{ background: f.hex }} />
                {f.code === fabricCode && <i>✓</i>}
              </button>
            ))}
          </div>
          <div className="daneen-selected-fabric"><span style={{ background: fabric.hex }} /><p><small>Selected fabric</small><b>{fabric.name}</b><em>{fabric.code}</em></p><button type="button">Change</button></div>
        </div>

        <div className="daneen-step">
          <h3>{product.sizes ? "3" : "2"}. Choose your colour</h3>
          <div className="daneen-colour-dots">
            {product.fabrics.map((f) => (
              <button key={f.code} type="button" className={f.code === fabricCode ? "active" : ""} style={{ background: f.hex }} aria-label={colourName(f.name)} title={colourName(f.name)} onClick={() => selectFabric(f.code)} />
            ))}
          </div>
          <p className="daneen-colour-name">{colourName(fabric.name)}</p>
        </div>

        <div className="daneen-price-box">
          <small>From</small><strong>{product.priceFrom}</strong><p>or spread the cost with flexible finance</p>
          <a href="#showrooms" className="daneen-main-cta">REQUEST A QUOTE <span>›</span></a>
          <button type="button" className="daneen-sample-cta">▱ &nbsp; Request a free fabric sample</button>
        </div>

        <div className="daneen-benefits">
          <p><span>▱</span>International delivery available</p>
          <p><span>◷</span>Made to order</p>
          <p><span>♢</span>Quality frame guarantee</p>
          <p><span>✦</span>Handcrafted finish</p>
        </div>

        <div className="daneen-support-actions"><a href="#showrooms">▣ &nbsp; Book a design appointment</a><a href="#showrooms">◌ &nbsp; Chat with our team</a></div>
      </aside>
    </section>
  );
}
