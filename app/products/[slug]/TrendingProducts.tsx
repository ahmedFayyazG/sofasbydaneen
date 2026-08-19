"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type TrendingItem = {
  slug: string;
  name: string;
  category: string;
  image: string;
  price: string;
  fabric: string;
};

const STORAGE_KEY = "daneen-product-clicks-v1";

function readClicks(): Record<string, number> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}

export default function TrendingProducts({ currentSlug, items }: { currentSlug: string; items: TrendingItem[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [clicks, setClicks] = useState<Record<string, number>>({});

  useEffect(() => {
    const next = readClicks();
    next[currentSlug] = (next[currentSlug] || 0) + 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setClicks(next);
  }, [currentSlug]);

  const ranked = useMemo(() => [...items]
    .filter((item) => item.slug !== currentSlug)
    .sort((a, b) => (clicks[b.slug] || 0) - (clicks[a.slug] || 0)), [items, currentSlug, clicks]);

  const recordClick = (slug: string) => {
    const next = readClicks();
    next[slug] = (next[slug] || 0) + 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setClicks(next);
  };

  const scroll = (direction: number) => track.current?.scrollBy({ left: direction * Math.min(window.innerWidth * .78, 950), behavior: "smooth" });

  if (!ranked.length) return null;

  return <section className="daneen-trending" aria-labelledby="trending-title">
    <div className="daneen-trending-head"><p className="kicker">MOST VIEWED</p><h2 id="trending-title">Trending now</h2></div>
    <div className="daneen-trending-wrap">
      <button type="button" className="daneen-trending-arrow prev" aria-label="Previous products" onClick={() => scroll(-1)}>‹</button>
      <div className="daneen-trending-track" ref={track}>
        {ranked.map((item) => <Link key={item.slug} href={`/products/${item.slug}`} className="daneen-trending-card" onClick={() => recordClick(item.slug)}>
          <div className="daneen-trending-image"><img src={item.image} alt={item.name} loading="lazy" /><span>View sofa</span></div>
          <div className="daneen-trending-copy"><h3>{item.name}</h3><p>{item.fabric} · {item.category}</p><strong>From {item.price}</strong></div>
        </Link>)}
      </div>
      <button type="button" className="daneen-trending-arrow next" aria-label="Next products" onClick={() => scroll(1)}>›</button>
    </div>
  </section>;
}
