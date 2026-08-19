"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { MouseEvent, TouchEvent } from "react";

type HomeProduct = {
  slug: string;
  name: string;
  price: string;
  image: string;
  fabrics: {
    code: string;
    name: string;
    hex: string;
    image: string;
  }[];
};

function HomeProductCard({ product }: { product: HomeProduct }) {
  const [fabricCode, setFabricCode] = useState(product.fabrics[0]?.code ?? "");
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const didSwipeRef = useRef(false);
  const selectedFabric = useMemo(
    () => product.fabrics.find((fabric) => fabric.code === fabricCode) ?? product.fabrics[0],
    [fabricCode, product.fabrics],
  );
  const image = selectedFabric?.image ?? product.image;
  const selectedIndex = Math.max(product.fabrics.findIndex((fabric) => fabric.code === selectedFabric?.code), 0);
  const hasMultipleImages = product.fabrics.length > 1;

  const showAdjacentFabric = (direction: -1 | 1) => {
    if (!hasMultipleImages) return;
    const nextIndex = (selectedIndex + direction + product.fabrics.length) % product.fabrics.length;
    const nextFabric = product.fabrics[nextIndex];
    if (nextFabric) setFabricCode(nextFabric.code);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    didSwipeRef.current = false;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    touchStartRef.current = null;
    if (!start || !touch || !hasMultipleImages) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;

    didSwipeRef.current = true;
    showAdjacentFabric(deltaX < 0 ? 1 : -1);
  };

  const handleImageClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!didSwipeRef.current) return;
    event.preventDefault();
    didSwipeRef.current = false;
  };

  return (
    <article>
      <div className="product-image-frame" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <span className="sale-sticker" aria-label="25% off">⌑ 25% OFF</span>
        <Link href={`/products/${product.slug}`} className="product-image" aria-label={`View ${product.name}`} onClick={handleImageClick}>
          <img
            src={image}
            alt={selectedFabric ? `${product.name} in ${selectedFabric.name}` : product.name}
            width="750"
            height="750"
            loading="lazy"
            decoding="async"
          />
        </Link>
        {hasMultipleImages && (
          <div className="product-image-controls" aria-label={`Browse ${product.name} colours`}>
            <button type="button" className="product-image-arrow prev" aria-label={`Previous ${product.name} image`} onClick={() => showAdjacentFabric(-1)}>‹</button>
            <button type="button" className="product-image-arrow next" aria-label={`Next ${product.name} image`} onClick={() => showAdjacentFabric(1)}>›</button>
          </div>
        )}
      </div>
      <div className="swatch-row" aria-label={`${product.fabrics.length} available colour${product.fabrics.length === 1 ? "" : "s"}`}>
        {product.fabrics.map((fabric) => (
          <button
            type="button"
            className={fabric.code === fabricCode ? "active" : ""}
            style={{ background: fabric.hex }}
            key={fabric.code}
            aria-label={`Show ${product.name} in ${fabric.name}`}
            aria-pressed={fabric.code === fabricCode}
            onClick={() => setFabricCode(fabric.code)}
          />
        ))}
      </div>
      <h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
      <p>{product.price}</p>
    </article>
  );
}

export default function HomeProductGrid({ products }: { products: HomeProduct[] }) {
  return (
    <section className="products-clone deferred-section" aria-label="Featured furniture">
      {products.map((product) => (
        <HomeProductCard product={product} key={product.slug} />
      ))}
    </section>
  );
}
