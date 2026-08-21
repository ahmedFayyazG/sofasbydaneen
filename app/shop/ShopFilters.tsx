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
type SortKey = "relevant" | "price-asc" | "price-desc";

const typeOptions: { key: ProductType; label: string }[] = [
  { key: "corner", label: "Corner sofas" }, { key: "chaise", label: "Chaise sofas" }, { key: "u-shape", label: "U-shape sofas" }, { key: "modular", label: "Modular sofas" }, { key: "chesterfield", label: "Chesterfield" },
];
const colorOptions: { key: ColorFamily; label: string; hex: string }[] = [
  { key: "ivory", label: "Ivory", hex: "#f2ede2" }, { key: "beige", label: "Beige", hex: "#d9c7a8" }, { key: "grey", label: "Grey", hex: "#5b6472" }, { key: "green", label: "Green", hex: "#2f6f6a" }, { key: "red", label: "Red", hex: "#8b1e1e" }, { key: "brown", label: "Brown", hex: "#6b4a34" }, { key: "blue", label: "Blue", hex: "#1f2a44" }, { key: "black", label: "Black", hex: "#2b2b2d" },
];
const sizeOptions: { key: SizeFilterKey; label: string }[] = [
  { key: "1", label: "Armchairs" }, { key: "2", label: "2 seater" }, { key: "3", label: "3 seater" }, { key: "4", label: "4 seater" }, { key: "chaise", label: "Chaise" }, { key: "modular", label: "Modular" },
];

const isProductType = (value: string | null): value is ProductType => typeOptions.some((option) => option.key === value);
const isColorFamily = (value: string | null): value is ColorFamily => colorOptions.some((option) => option.key === value);
const isSizeFilter = (value: string | null): value is SizeFilterKey => sizeOptions.some((option) => option.key === value);
function parseFilters(filters: RawFilters): FilterState { return { type: isProductType(filters.type) ? filters.type : null, color: isColorFamily(filters.color) ? filters.color : null, seats: isSizeFilter(filters.seats) ? filters.seats : null }; }
function matchesSize(product: Product, size: SizeFilterKey) { if (size === "chaise") return product.type === "chaise" || product.sizes?.some((option) => /chaise/i.test(option.label)); if (size === "modular") return product.type === "modular"; return product.seatOptions.includes(Number(size)); }

function ProductCard({ product, selectedColor }: { product: Product; selectedColor: ColorFamily | null }) {
  const initialFabric = product.fabrics.find((fabric) => fabric.code === product.defaultFabricCode) ?? product.fabrics[0];
  const colorMatchedFabric = selectedColor ? product.fabrics.find((fabric) => colorFamilyFromFabric(fabric) === selectedColor) : null;
  const [fabricCode, setFabricCode] = useState((colorMatchedFabric ?? initialFabric).code);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null); const didSwipeRef = useRef(false);
  const selectedFabric = product.fabrics.find((fabric) => fabric.code === fabricCode) ?? colorMatchedFabric ?? initialFabric;
  const selectedIndex = Math.max(product.fabrics.findIndex((fabric) => fabric.code === selectedFabric.code), 0);
  const showAdjacentFabric = (direction: -1 | 1) => { if (product.fabrics.length < 2) return; const next = product.fabrics[(selectedIndex + direction + product.fabrics.length) % product.fabrics.length]; if (next) setFabricCode(next.code); };
  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => { const touch = event.touches[0]; if (!touch) return; didSwipeRef.current = false; touchStartRef.current = { x: touch.clientX, y: touch.clientY }; };
  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => { const start = touchStartRef.current; const touch = event.changedTouches[0]; touchStartRef.current = null; if (!start || !touch || product.fabrics.length < 2) return; const dx = touch.clientX - start.x; const dy = touch.clientY - start.y; if (Math.abs(dx) < 42 || Math.abs(dx) < Math.abs(dy) * 1.2) return; didSwipeRef.current = true; showAdjacentFabric(dx < 0 ? 1 : -1); };
  const handleImageClick = (event: MouseEvent<HTMLAnchorElement>) => { if (!didSwipeRef.current) return; event.preventDefault(); didSwipeRef.current = false; };

  return <article className="shop-product-card">
    <div className="shop-card-image" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <button type="button" className="shop-card-heart" aria-label={`Save ${product.name}`}>♡</button>
      <Link href={`/products/${product.slug}?fabric=${selectedFabric.code}`} onClick={handleImageClick}><img src={selectedFabric.studioFront} alt={`${product.name} in ${selectedFabric.name}`} width="750" height="750" loading="lazy" /></Link>
      {product.fabrics.length > 1 && <><button type="button" className="shop-card-arrow prev" onClick={() => showAdjacentFabric(-1)} aria-label="Previous colour">‹</button><button type="button" className="shop-card-arrow next" onClick={() => showAdjacentFabric(1)} aria-label="Next colour">›</button></>}
    </div>
    <div className="shop-card-info">
      <h3><Link href={`/products/${product.slug}?fabric=${selectedFabric.code}`}>{product.name}</Link></h3>
      <p className="shop-card-fabric">{selectedFabric.name}</p>
      <div className="shop-card-bottom"><strong>From {product.priceFrom}</strong><span>{product.category}</span></div>
      <div className="shop-card-swatches">{product.fabrics.slice(0, 8).map((fabric) => <button key={fabric.code} type="button" style={{ background: fabric.hex }} className={fabric.code === selectedFabric.code ? "active" : ""} onClick={() => setFabricCode(fabric.code)} aria-label={fabric.name} />)}</div>
    </div>
  </article>;
}

export default function ShopFilters({ products, initialFilters }: { products: Product[]; initialFilters: RawFilters }) {
  const router = useRouter(); const pathname = usePathname(); const searchParams = useSearchParams(); void initialFilters;
  const [filtersOpen, setFiltersOpen] = useState(false); const [sort, setSort] = useState<SortKey>("relevant");
  const urlFilters = useMemo(() => parseFilters({ type: searchParams.get("type"), color: searchParams.get("color"), seats: searchParams.get("seats") }), [searchParams]);
  const selectedType = urlFilters.type; const selectedColor = urlFilters.color; const selectedSize = urlFilters.seats; const hasFilters = Boolean(selectedType || selectedColor || selectedSize);
  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => (!selectedType || product.type === selectedType) && (!selectedColor || product.colorFamilies.includes(selectedColor)) && (!selectedSize || matchesSize(product, selectedSize)));
    if (sort === "price-asc") return [...result].sort((a, b) => a.priceFromValue - b.priceFromValue);
    if (sort === "price-desc") return [...result].sort((a, b) => b.priceFromValue - a.priceFromValue);
    return result;
  }, [products, selectedType, selectedColor, selectedSize, sort]);
  const setFilter = (key: "type" | "color" | "seats", value: string) => { const params = new URLSearchParams(searchParams.toString()); if (params.get(key) === value) params.delete(key); else params.set(key, value); router.replace(params.toString() ? `${pathname}?${params}` : pathname, { scroll: false }); };
  const clearFilters = () => router.replace(pathname, { scroll: false });

  return <div className="shop-page shop-collection-page">
    <div className="shop-toolbar">
      <div className="shop-toolbar-left"><button type="button" className="shop-filter-trigger" onClick={() => setFiltersOpen((open) => !open)}>Filter <span>{hasFilters ? "•" : "+"}</span></button><span className="shop-result-count">{filteredProducts.length} Result{filteredProducts.length === 1 ? "" : "s"}</span></div>
      <label className="shop-sort">Sort by <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)}><option value="relevant">Most relevant</option><option value="price-asc">Price low to high</option><option value="price-desc">Price high to low</option></select></label>
    </div>

    {filtersOpen && <section className="shop-filter-panel" aria-label="Filter sofas">
      <div><h3>Type</h3>{typeOptions.map((option) => <button key={option.key} className={selectedType === option.key ? "active" : ""} onClick={() => setFilter("type", option.key)}>{option.label}</button>)}</div>
      <div><h3>Colour</h3><div className="shop-filter-colours">{colorOptions.map((option) => <button key={option.key} className={selectedColor === option.key ? "active" : ""} onClick={() => setFilter("color", option.key)}><i style={{ background: option.hex }} />{option.label}</button>)}</div></div>
      <div><h3>Size</h3>{sizeOptions.map((option) => <button key={option.key} className={selectedSize === option.key ? "active" : ""} onClick={() => setFilter("seats", option.key)}>{option.label}</button>)}</div>
      {hasFilters && <button className="shop-clear-link" type="button" onClick={clearFilters}>Clear all</button>}
    </section>}

    {hasFilters && <div className="shop-active-filters">{selectedColor && <button onClick={() => setFilter("color", selectedColor)}>{colorOptions.find((item) => item.key === selectedColor)?.label} ×</button>}{selectedType && <button onClick={() => setFilter("type", selectedType)}>{typeOptions.find((item) => item.key === selectedType)?.label} ×</button>}{selectedSize && <button onClick={() => setFilter("seats", selectedSize)}>{sizeOptions.find((item) => item.key === selectedSize)?.label} ×</button>}</div>}

    <section className="shop-results" aria-label="Sofa results">
      {filteredProducts.length ? <div className="shop-product-grid">{filteredProducts.map((product) => <ProductCard product={product} selectedColor={selectedColor} key={`${product.slug}-${selectedColor ?? "all"}`} />)}</div> : <div className="shop-empty"><h3>No sofas match these filters</h3><p>Try removing one filter to see more of the collection.</p><button type="button" onClick={clearFilters}>Clear filters</button></div>}
    </section>
  </div>;
}
