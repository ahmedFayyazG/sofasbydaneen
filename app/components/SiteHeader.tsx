"use client";

import Link from "next/link";
import type React from "react";
import { useState } from "react";

const Icon = ({ children }: { children: React.ReactNode }) => (
  <span className="head-icon" aria-hidden="true">{children}</span>
);

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
        <button type="button" aria-label="Search"><Icon>⌕</Icon></button>
        <button type="button" aria-label="Wishlist"><Icon>♡</Icon></button>
        <button type="button" aria-label="Account"><Icon>♙</Icon></button>
        <button type="button" aria-label="Basket, 0 items" className="bag-icon">▢<b aria-hidden="true">0</b></button>
      </div>
    </header>
  );
}
