"use client";

import Link from "next/link";
import { useState } from "react";

function HeaderIcon({ name }: { name: "search" | "heart" | "account" | "cart" }) {
  if (name === "search") {
    return <svg className="head-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="4.8" /><path d="m14.2 14.2 4.3 4.3" /></svg>;
  }
  if (name === "heart") {
    return <svg className="head-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19.3S5.2 15.2 3.5 10.6C2.3 7.4 4.2 4.8 7.1 4.8c1.8 0 3.3 1 4.1 2.4.8-1.4 2.3-2.4 4.1-2.4 2.9 0 4.8 2.6 3.6 5.8C17.2 15.2 12 19.3 12 19.3Z" /></svg>;
  }
  if (name === "account") {
    return <svg className="head-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7.5" r="3" /><path d="M6.5 18.5c.5-3.2 2.4-5.2 5.5-5.2s5 2 5.5 5.2" /></svg>;
  }
  return <svg className="head-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.5h11l-.7 10h-9.6l-.7-10Z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></svg>;
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <button
        className="mobile-menu"
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
      >
        {menuOpen ? "CLOSE" : "MENU"}
      </button>
      <Link
        className="brand"
        href="/"
        aria-label="Sofas By Daneen home"
        onClick={closeMenu}
        style={{
          display: "inline-flex",
          alignItems: "baseline",
          justifyContent: "flex-start",
          gap: "7px",
          width: "max-content",
          maxWidth: "290px",
          color: "#6b1438",
          lineHeight: 1,
          whiteSpace: "nowrap",
          textTransform: "none",
          textAlign: "left",
          letterSpacing: 0,
        }}
      >
        <span style={{ display: "inline-block", fontFamily: "Melodrama, serif", fontSize: "38px", fontWeight: 400, letterSpacing: "-1.2px", textTransform: "none" }}>Sofas</span>
        <span style={{ display: "inline-block", fontFamily: "Melodrama, serif", fontSize: "11px", fontWeight: 400, letterSpacing: "3px", textTransform: "uppercase", opacity: 0.58, margin: "0 2px" }}>BY</span>
        <span style={{ display: "inline-block", fontFamily: "Melodrama, serif", fontSize: "38px", fontWeight: 400, letterSpacing: "-1.2px", textTransform: "none" }}>Daneen</span>
      </Link>
      <nav
        id="primary-navigation"
        className={menuOpen ? "main-nav open" : "main-nav"}
        aria-label="Primary navigation"
      >
        <Link href="/shop" onClick={closeMenu}>Shop</Link>
        <Link href="/collections" onClick={closeMenu}>Our Collections <small aria-hidden="true">⌄</small></Link>
        <Link href="/#sur-mesure" onClick={closeMenu}>Bespoke by Sofas By Daneen</Link>
        <Link href="/inspiration" onClick={closeMenu}>Inspiration</Link>
        <Link href="/#professionals" onClick={closeMenu}>Professionals</Link>
        <Link href="/#atelier" onClick={closeMenu}>Craftsmanship</Link>
      </nav>
      <div className="header-tools" aria-label="Customer tools">
        <Link className="header-icon-link" href="/shop" aria-label="Search products"><HeaderIcon name="search" /></Link>
        <Link className="header-icon-link" href="/shop" aria-label="Wishlist"><HeaderIcon name="heart" /></Link>
        <Link className="header-icon-link" href="/" aria-label="Account"><HeaderIcon name="account" /></Link>
        <Link className="header-icon-link bag-icon" href="/shop" aria-label="Basket, 0 items"><HeaderIcon name="cart" /><b aria-hidden="true">0</b></Link>
      </div>
    </header>
  );
}
