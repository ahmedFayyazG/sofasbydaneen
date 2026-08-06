"use client";

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
      <a className="brand" href="#top" aria-label="Sofas By Daneen home">
        <span>Sofas By Daneen</span>
      </a>
      <nav
        id="primary-navigation"
        className={menuOpen ? "main-nav open" : "main-nav"}
        aria-label="Primary navigation"
      >
        <a href="#collection" onClick={closeMenu}>Our Creations <small aria-hidden="true">⌄</small></a>
        <a href="#sur-mesure" onClick={closeMenu}>Bespoke by Sofas By Daneen</a>
        <a href="#professionals" onClick={closeMenu}>Professionals</a>
        <a href="#showrooms" onClick={closeMenu}>Showrooms</a>
        <a href="#atelier" onClick={closeMenu}>Craftsmanship</a>
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
