"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import type { MouseEvent, TouchEvent } from "react";
import { colorFamilyFromFabric } from "../lib/products";
import type { ColorFamily, Product, ProductType } from "../lib/products";

type SizeFilterKey = "1" | "2" | "3" | "4" | "chaise" | "modular";
type RawFilters = { type: string | null; color: string | null; seats: string | null };
type FilterState = { type: ProductType | null; color: ColorFamily | null; seats: SizeFilterKey | null };

const typeOptions: { key: ProductType; label: string }[] = [
  { key: "corner", label: "Corner sofas" },
  { key: "chaise", label: "Chaise sofas" },
  { key: "u-shape", label: "U-shape sofas" },
  { key: "modular", label: "Modular sofas" },
  { key: "chesterfield", label: "Chesterfield" },
];

const colorOptions: { key: ColorFamily; label: string; hex: string }[] = [
  { key: "ivory", label: "Ivory", hex: "#f2ede2" },
  { key: "beige", label: "Beige", hex: "#d9c7a8" },
  { key: "grey", label: "Grey", hex: "#5b6472" },
  { key: "green", label: "Green", hex: "#2f6f6a" },
  { key: "red", label: "Red", hex: "#8b1e1e" },
  { key: "brown", label: "Brown", hex: "#6b4a34" },
  { key: "blue", label: "Blue", hex: "#1f2a44" },
  { key: "black", label: "Black", hex: "#2b2b2d" },
];

const sizeOptions: { key: SizeFilterKey; label: string; icon: string }[] = [
  { key: "1", label: "Armchairs", icon: "1" },
  { key: "2", label: "2 seater sofas", icon: "2" },
  { key: "3", label: "3 seater sofas", icon: "3" },
  { key: "4", label: "4 seater sofas", icon: "4" },
  { key: "chaise", label: "Chaise", icon: "L" },
  { key: "modular", label: "Modular", icon: "+" },
];

const isProductType = (value: string | null): value is ProductType =>
  typeOptions.some((option) => option.key === value);

const isColorFamily = (value: string | null): value is ColorFamily =>
  colorOptions.some((option) => option.key === value);

const isSizeFilter = (value: string | null): value is SizeFilterKey =>
  sizeOptions.some((option) => option.key === value);

function parseFilters(filters: RawFilters): FilterState {
  return {
    type: isProductType(filters.type) ? filters.type : null,
    color: isColorFamily(filters.color) ? filters.color : null,
    seats: isSizeFilter(filters.seats) ? filters.seats : null,
  };
}

function matchesSize(product: Product, size: SizeFilterKey) {
  if (size === "chaise") return product.type === "chaise" || product.sizes?.some((option) => /chaise/i.test(option.label));
  if (size === "modular") return product.type === "modular";
  return product.seatOptions.includes(Number(size));
}

function ProductCard({ product, selectedColor }: { product: Product; selectedColor: ColorFamily | null }) {
  const initialFabric = product.fabrics.find((fabric) => fabric.code === product.defaultFabricCode) ?? product.fabrics[0];
  const colorMatchedFabric = selectedColor ? product.fabrics.find((fabric) => colorFamilyFromFabric(fabric) === selectedColor) : null;
  const [fabricCode, setFabricCode] = useState((colorMatchedFabric ?? initialFabric).code);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const didSwipeRef = useRef(false);

  const selectedFabric = product.fabrics.find((fabric) => fabric.code === fabricCode) ?? colorMatchedFabric ?? initialFabric;
  const selectedIndex = Math.max(product.fabrics.findIndex((fabric) => fabric.code === selectedFabric.code), 0);
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
        <Link href={`/products/${product.slug}`} className="product-image" aria-label={`View ${product.name}`} onClick={handleImageClick}>
          <img
            src={selectedFabric.studioFront}
            alt={`${product.name} in ${selectedFabric.name}`}
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
            className={fabric.code === selectedFabric.code ? "active" : ""}
            style={{ background: fabric.hex }}
            key={fabric.code}
            aria-label={`Show ${product.name} in ${fabric.name}`}
            aria-pressed={fabric.code === selectedFabric.code}
            onClick={() => setFabricCode(fabric.code)}
          />
        ))}
      </div>
      <h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
      <p>{product.priceFrom}</p>
    </article>
  );
}

export default function ShopFilters({ products, initialFilters }: { products: Product[]; initialFilters: RawFilters }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  void initialFilters;

  const urlFilters = useMemo(() => parseFilters({
    type: searchParams.get("type"),
    color: searchParams.get("color"),
    seats: searchParams.get("seats"),
  }), [searchParams]);

  const selectedType = urlFilters.type;
  const selectedColor = urlFilters.color;
  const selectedSize = urlFilters.seats;
  const hasFilters = Boolean(selectedType || selectedColor || selectedSize);

  const typeImages = useMemo(() => {
    return Object.fromEntries(typeOptions.map((option) => {
      const product = products.find((item) => item.type === option.key);
      return [option.key, product?.heroImage ?? products[0]?.heroImage ?? ""];
    })) as Record<ProductType, string>;
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedType && product.type !== selectedType) return false;
      if (selectedColor && !product.colorFamilies.includes(selectedColor)) return false;
      if (selectedSize && !matchesSize(product, selectedSize)) return false;
      return true;
    });
  }, [products, selectedType, selectedColor, selectedSize]);

  const setFilter = (key: "type" | "color" | "seats", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const clearFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="shop-page">
      <section className="shop-filter-section" aria-labelledby="shop-by-type-title">
        <div className="shop-filter-heading">
          <h2 id="shop-by-type-title">Shop by type</h2>
          {hasFilters && <button type="button" className="shop-clear" onClick={clearFilters}>Clear filters</button>}
        </div>
        <div className="shop-type-grid">
          {typeOptions.map((option) => (
            <button
              type="button"
              className={selectedType === option.key ? "shop-type-tile active" : "shop-type-tile"}
              aria-pressed={selectedType === option.key}
              key={option.key}
              onClick={() => setFilter("type", option.key)}
            >
              <img src={typeImages[option.key]} alt="" width="320" height="220" loading="lazy" decoding="async" />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="shop-filter-section" aria-labelledby="shop-colour-title">
        <h2 id="shop-colour-title">Got a colour in mind</h2>
        <div className="shop-colour-row">
          {colorOptions.map((option) => (
            <button
              type="button"
              className={selectedColor === option.key ? "shop-colour active" : "shop-colour"}
              style={{ background: option.hex }}
              aria-label={option.label}
              aria-pressed={selectedColor === option.key}
              key={option.key}
              onClick={() => setFilter("color", option.key)}
            />
          ))}
        </div>
      </section>

      <section className="shop-filter-section" aria-labelledby="shop-size-title">
        <h2 id="shop-size-title">Got a size in mind</h2>
        <div className="shop-size-row">
          {sizeOptions.map((option) => (
            <button
              type="button"
              className={selectedSize === option.key ? "shop-size active" : "shop-size"}
              aria-pressed={selectedSize === option.key}
              key={option.key}
              onClick={() => setFilter("seats", option.key)}
            >
              <span aria-hidden="true">{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <section className="shop-results" aria-labelledby="shop-results-title">
        <div className="shop-results-heading">
          <h2 id="shop-results-title">{filteredProducts.length} matching sofa{filteredProducts.length === 1 ? "" : "s"}</h2>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-clone shop-products">
            {filteredProducts.map((product) => (
              <ProductCard product={product} selectedColor={selectedColor} key={`${product.slug}-${selectedColor ?? "all"}`} />
            ))}
          </div>
        ) : (
          <div className="shop-empty">
            <h3>No sofas match these filters</h3>
            <p>Try removing one filter or return to the full collection.</p>
            <button type="button" className="pill filled" onClick={clearFilters}>CLEAR FILTERS</button>
          </div>
        )}
      </section>
    </div>
  );
}
