"use client";

import { useMemo, useState } from "react";
import type { Product } from "../../lib/products";

type DetailTab = "description" | "dimensions" | "delivery" | "reviews";

const getMaterial = (name: string) => {
  const v = name.toLowerCase();
  if (v.includes("velvet")) return "Velvet";
  if (v.includes("bouclé") || v.includes("boucle")) return "Bouclé";
  if (v.includes("linen")) return "Linen";
  if (v.includes("chenille")) return "Chenille";
  if (v.includes("leather")) return "Leather";
  if (v.includes("woven")) return "Woven";
  return "Upholstery";
};

const colourName = (name: string) => name.replace(/\b(Velvet|Linen|Bouclé|Boucle|Chenille|Leather|Woven)\b/gi, "").trim();

export default function ProductGallery({ product, initialFabricCode }: { product: Product; initialFabricCode?: string }) {
  const initialFabric = product.fabrics.find((f) => f.code === initialFabricCode)
    ?? product.fabrics.find((f) => f.code === product.defaultFabricCode)
    ?? product.fabrics[0];

  const [fabricCode, setFabricCode] = useState(initialFabric.code);
  const [seat, setSeat] = useState<number | null>(product.sizes?.[0]?.seats ?? null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tab, setTab] = useState<DetailTab>("description");

  const fabric = useMemo(() => product.fabrics.find((f) => f.code === fabricCode) ?? product.fabrics[0], [product.fabrics, fabricCode]);
  const size = useMemo(() => product.sizes?.find((s) => s.seats === seat) ?? product.sizes?.[0] ?? null, [product.sizes, seat]);
  const material = getMaterial(fabric.name);
  const materialCount = new Set(product.fabrics.map((f) => getMaterial(f.name))).size;

  const front = product.sizes && size && fabric.code === product.defaultFabricCode ? size.studioFront : fabric.studioFront;
  const angle = product.sizes && size && fabric.code === product.defaultFabricCode ? size.studioAngle : fabric.studioAngle;
  const gallery = [front, angle, ...(fabric.lifestyle ?? [])].filter(Boolean);
  const image = gallery[Math.min(galleryIndex, gallery.length - 1)] ?? front;

  const chooseFabric = (code: string) => {
    setFabricCode(code);
    setGalleryIndex(0);
  };

  const nextImage = (direction: number) => setGalleryIndex((current) => (current + direction + gallery.length) % gallery.length);

  return <>
    <section className="dfs-pdp-shell">
      <div className="dfs-gallery-column">
        <div className="dfs-gallery-stage">
          <button type="button" className="dfs-gallery-arrow prev" aria-label="Previous image" onClick={() => nextImage(-1)}>‹</button>
          <img src={image} alt={`${product.name} in ${fabric.name}`} width="1100" height="780" loading="eager" />
          <button type="button" className="dfs-gallery-arrow next" aria-label="Next image" onClick={() => nextImage(1)}>›</button>
          <button type="button" className="dfs-zoom" aria-label="Zoom product image">⌕</button>
        </div>

        <div className="dfs-gallery-tools">
          <div className="dfs-thumbs">
            {gallery.slice(0, 3).map((src, index) => <button key={`${src}-${index}`} className={galleryIndex === index ? "active" : ""} onClick={() => setGalleryIndex(index)}><img src={src} alt={`View ${index + 1}`} /></button>)}
          </div>
          <div className="dfs-view-links"><button type="button">Product video</button><button type="button">360° spin</button><button type="button">Virtual view</button><button type="button">Share</button></div>
        </div>

        <div className="dfs-detail-tabs" role="tablist" aria-label="Product information">
          {(["description", "dimensions", "delivery", "reviews"] as DetailTab[]).map((item) => <button key={item} role="tab" aria-selected={tab === item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item[0].toUpperCase() + item.slice(1)}</button>)}
        </div>

        <div className="dfs-tab-panel">
          {tab === "description" && <div className="dfs-description"><h2>{product.name.replace(/^The\s+/i, "")}</h2>{product.intro.map((p, i) => <p key={i}>{p}</p>)}<h3>Key features</h3><ul><li>{product.silhouette}</li>{product.details.slice(0, 5).map((d) => <li key={d.label}><b>{d.label}:</b> {d.value}</li>)}</ul></div>}
          {tab === "dimensions" && <div className="dfs-dimensions"><div className="dfs-dimension-visual"><img src={angle} alt={`${product.name} dimensions reference`} /><span>Approx. configuration</span></div><div className="dfs-dimension-table"><div className="dfs-unit-switch"><button className="active">Inch</button><button>Cm</button></div>{product.sizes?.map((s, i) => <p key={s.seats}><span>{i + 1}</span><b>{s.label}</b><em>{s.seats} seats</em></p>) ?? <p><span>1</span><b>Configuration</b><em>{product.details.find((d) => d.label === "Configuration")?.value ?? "Made to order"}</em></p>}</div></div>}
          {tab === "delivery" && <div className="dfs-description"><h2>Delivery</h2><p>Your sofa is made to order. Access and delivery details are confirmed before dispatch.</p><p>{product.details.find((d) => d.label === "Lead time")?.value}</p></div>}
          {tab === "reviews" && <div className="dfs-description"><h2>Customer reviews</h2><p>★★★★★ 4.9 average rating</p><p>Review content will appear here when connected to your review provider.</p></div>}
        </div>
      </div>

      <aside className="dfs-buy-column">
        <div className="dfs-sale-banner">DANEEN COLLECTION</div>
        <div className="dfs-product-heading"><h1>{product.name.replace(/^The\s+/i, "")}</h1><p>{product.tagline}</p><div className="dfs-stars">★★★★★ <span>4.9 · 32 reviews</span></div></div>

        <button className="dfs-option-card" type="button" onClick={() => setDrawerOpen(true)}>
          <span className="dfs-option-swatch" style={{ background: fabric.hex }} />
          <span><b>Material:</b> {material}<br/><b>Colour:</b> {colourName(fabric.name)}<small>{materialCount} material{materialCount === 1 ? "" : "s"} and {product.fabrics.length} colours available</small></span>
          <strong>›</strong>
        </button>

        {product.sizes && <div className="dfs-size-block"><div className="dfs-size-title"><b>Size:</b><span>{size?.label}</span></div><div className="dfs-size-buttons">{product.sizes.map((s) => <button key={s.seats} className={size?.seats === s.seats ? "active" : ""} onClick={() => { setSeat(s.seats); setGalleryIndex(0); }}>{s.label}</button>)}</div></div>}

        <div className="dfs-option-card static"><span className="dfs-option-icon">≋</span><span><b>Seat padding:</b> Premium comfort<small>Supportive seat filling</small></span></div>
        <div className="dfs-option-card static"><span className="dfs-option-icon">▧</span><span><b>Feet:</b> Standard finish<small>Selected to suit this model</small></span></div>

        <div className="dfs-price-area"><small>From</small><strong>{product.priceFrom}</strong><p>Flexible finance options available</p></div>
        <div className="dfs-delivery-note">Handcrafted. Delivered to your home.</div>
        <a className="dfs-primary-action" href="#showrooms">REQUEST A QUOTE</a>
        <button className="dfs-secondary-action" type="button" onClick={() => setDrawerOpen(true)}>CHOOSE MATERIAL</button>
        <button className="dfs-shortlist" type="button">♡ &nbsp; Add to shortlist</button>
      </aside>
    </section>

    {drawerOpen && <div className="dfs-drawer-layer" role="dialog" aria-modal="true" aria-label="Choose your material">
      <button className="dfs-drawer-backdrop" aria-label="Close material selector" onClick={() => setDrawerOpen(false)} />
      <aside className="dfs-material-drawer">
        <div className="dfs-drawer-head"><div><h2>Choose your material</h2><p>{materialCount} material{materialCount === 1 ? "" : "s"} and {product.fabrics.length} colours available</p></div><button onClick={() => setDrawerOpen(false)} aria-label="Close">×</button></div>
        <div className="dfs-drawer-preview"><img src={fabric.studioAngle} alt={`${product.name} in ${fabric.name}`} /></div>
        <div className="dfs-drawer-copy"><h3>{material}</h3><p>Choose from the available upholstery options for this model. Select a colour below to preview it instantly on the sofa.</p><p><b>Selected colour:</b> {colourName(fabric.name)}</p></div>
        <div className="dfs-drawer-swatches">{product.fabrics.map((f) => <button key={f.code} type="button" className={f.code === fabric.code ? "active" : ""} aria-label={f.name} title={f.name} onClick={() => chooseFabric(f.code)}><span style={{ background: f.hex }} />{f.code === fabric.code && <i>✓</i>}</button>)}</div>
        <div className="dfs-drawer-selected"><span style={{ background: fabric.hex }} /><div><b>{fabric.name}</b><small>{fabric.code}</small></div></div>
        <div className="dfs-drawer-footer"><button type="button" onClick={() => setDrawerOpen(false)}>Confirm selection</button></div>
      </aside>
    </div>}
  </>;
}
