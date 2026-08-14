"use client";

import { useMemo, useState } from "react";
import type { Product } from "../../lib/products";

export default function ProductGallery({ product, initialFabricCode }: { product: Product; initialFabricCode?: string }) {
  const initialFabric = product.fabrics.find((f) => f.code === initialFabricCode) ?? product.fabrics.find((f) => f.code === product.defaultFabricCode) ?? product.fabrics[0];
  const [fabricCode, setFabricCode] = useState(initialFabric.code);
  const [seats, setSeats] = useState<number | null>(product.sizes ? product.sizes[Math.min(2, product.sizes.length - 1)].seats : null);
  const [view, setView] = useState<"front" | "angle">("front");

  const fabric = useMemo(() => product.fabrics.find((f) => f.code === fabricCode) ?? product.fabrics[0], [product.fabrics, fabricCode]);
  const size = useMemo(() => (product.sizes ? product.sizes.find((s) => s.seats === seats) ?? product.sizes[0] : null), [product.sizes, seats]);

  // For products with size variants, the size images are photographed in the default fabric.
  // For fabric selection, studio shots are photographed at the reference seat count.
  const mainImage = product.sizes && size && fabricCode === product.defaultFabricCode
    ? (view === "front" ? size.studioFront : size.studioAngle)
    : (view === "front" ? fabric.studioFront : fabric.studioAngle);

  return (
    <div className="product-gallery">
      <div className="product-gallery-main">
        <img src={mainImage} alt={`${product.name} in ${fabric.name}${size ? `, ${size.label}` : ""}`} width="1000" height="1000" loading="eager" decoding="async" />
      </div>

      <div className="product-gallery-controls">
        <div className="view-toggle" role="group" aria-label="View angle">
          <button type="button" className={view === "front" ? "active" : ""} onClick={() => setView("front")}>Front</button>
          <button type="button" className={view === "angle" ? "active" : ""} onClick={() => setView("angle")}>Angle</button>
        </div>

        {product.sizes && (
          <div className="size-select" aria-label="Choose your size">
            <h3>Choose your size</h3>
            <div className="size-options">
              {product.sizes.map((s) => (
                <button
                  key={s.seats}
                  type="button"
                  className={seats === s.seats ? "size-pill active" : "size-pill"}
                  onClick={() => setSeats(s.seats)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="fabric-select" aria-label="Choose your fabric">
          <h3>Choose your fabric — {fabric.name}</h3>
          <div className="fabric-swatches">
            {product.fabrics.map((f) => (
              <button
                key={f.code}
                type="button"
                className={f.code === fabricCode ? "swatch active" : "swatch"}
                style={{ background: f.hex }}
                aria-label={f.name}
                aria-pressed={f.code === fabricCode}
                onClick={() => setFabricCode(f.code)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
