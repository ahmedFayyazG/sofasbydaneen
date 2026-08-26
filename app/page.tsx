import Link from "next/link";
import HomeProductGrid from "./components/HomeProductGrid";
import HomeTrustPrefooter from "./components/HomeTrustPrefooter";
import LazyVideo from "./components/LazyVideo";
import SiteHeader from "./components/SiteHeader";
import { products as catalog } from "./lib/products";

const CDN = "https://www.clovi-paris.com/cdn/shop/files/";
const SITE_URL = "https://sofas-by-daneen-fashion-recreation.ahmedfayyaz47.chatgpt.site";

const products = catalog.map((product) => ({
  slug: product.slug,
  name: product.name,
  category: product.category,
  tagline: product.tagline,
  price: product.priceFrom,
  priceValue: product.priceFromValue.toString(),
  image: product.heroImage,
  fabrics: product.fabrics.slice(0, 6).map((fabric) => ({
    code: fabric.code,
    name: fabric.name,
    hex: fabric.hex,
    image: fabric.studioFront,
  })),
}));

const SOFOLOGY_IMG = "https://images.sofology.co.uk/q_auto,f_auto,fl_lossy,dpr_1.0/Bloomreach/HOMEPAGE";
const sofaTypes = [
  ["Corner sofas", `${SOFOLOGY_IMG}/2025/sept/homepage-type-corner2-010925-desktop-min`],
  ["Fabric sofas", `${SOFOLOGY_IMG}/2025/sept/homepage-type-fabric-010925-desktop-min`],
  ["Leather sofas", `${SOFOLOGY_IMG}/2025/sept/homepage-type-leather-010925-desktop-min`],
  ["Recliner sofas", `${SOFOLOGY_IMG}/2025/sept/homepage-type-recliners-010925-desktop-min`],
  ["Sofa beds", `${SOFOLOGY_IMG}/2025/sept/homepage-type-sofabeds-010925-desktop-min`],
  ["Cinema sofas", `${SOFOLOGY_IMG}/2025/sept/homepage-type-cinema-010925-desktop-min`],
] as const;
const colourFamilies = ["white", "grey", "beige", "yellow", "teal", "rust", "green", "burgundy", "brown", "blue", "charcoal", "black"] as const;
const colourShopFilters: Record<(typeof colourFamilies)[number], string> = {
  white: "ivory",
  grey: "grey",
  beige: "beige",
  yellow: "brown",
  teal: "green",
  rust: "brown",
  green: "green",
  burgundy: "red",
  brown: "brown",
  blue: "blue",
  charcoal: "black",
  black: "black",
};
const sofaSizes = ["2seater", "3seater", "4seater", "chaise", "modular", "chairs"] as const;
const sizeLabels: Record<(typeof sofaSizes)[number], string> = {
  "2seater": "2 seater sofas",
  "3seater": "3 seater sofas",
  "4seater": "4 seater sofas",
  chaise: "Chaise",
  modular: "Modular",
  chairs: "Armchairs",
};
const sizeShopFilters: Record<(typeof sofaSizes)[number], string> = {
  "2seater": "2",
  "3seater": "3",
  "4seater": "4",
  chaise: "chaise",
  modular: "modular",
  chairs: "1",
};
const instagramReels = [
  {
    title: "Crafting Custom Comfort",
    embedUrl: "https://www.instagram.com/reel/DBG9yawIyWj/embed?utm_source=ig_embed&autoplay=1&mute=1",
    href: "https://www.instagram.com/reel/DBG9yawIyWj/",
  },
  {
    title: "Thank you for choosing us mate",
    embedUrl: "https://www.instagram.com/reel/DAx9FBwIp5q/embed?utm_source=ig_embed&autoplay=1&mute=1",
    href: "https://www.instagram.com/reel/DAx9FBwIp5q/",
  },
  {
    title: "Thank you @chris_noddy_connor",
    embedUrl: "https://www.instagram.com/reel/C_soONsosRW/embed?utm_source=ig_embed&autoplay=1&mute=1",
    href: "https://www.instagram.com/reel/C_soONsosRW/",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Sofas By Daneen",
      inLanguage: "en-GB",
    },
    {
      "@type": "FurnitureStore",
      "@id": `${SITE_URL}/#business`,
      name: "Sofas By Daneen",
      url: SITE_URL,
      description: "British house of handcrafted bespoke furniture and couture upholstery.",
      logo: `${SITE_URL}/favicon.svg`,
      image: `${SITE_URL}/sofas-by-daneen-hero.png`,
      priceRange: "£££",
    },
    {
      "@type": "ItemList",
      name: "Sofas By Daneen furniture collection",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          image: `${SITE_URL}${product.image}`,
          brand: { "@type": "Brand", name: "Sofas By Daneen" },
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: product.priceValue,
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/products/${product.slug}`,
          },
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div id="top">
        <div className="announce"><span aria-hidden="true">‹</span><p>Autumn promotional events and mid-season clearance sales across UK</p><span aria-hidden="true">›</span></div>
        <SiteHeader />
        <div className="promo-marquee" aria-label="Current offers">
          <div className="promo-marquee-track">
            {[0, 1].map((loop) => (
              <div className="promo-marquee-group" aria-hidden={loop === 1 ? "true" : undefined} key={loop}>
                <span>Free Delivery Across England &amp; Wales.</span>
                <a href="https://www.thehouseofbrands.co.uk/pages/contact-us">Summer Sale Is Live</a>
                <span>Spread the Cost with Flexible Finance Options</span>
                <span>25% Off Already Applied</span>
                <span>Showroom open 7 days a week</span>
              </div>
            ))}
          </div>
        </div>

        <main id="main-content">
          <section className="hero-clone" aria-label="Sofas By Daneen summer sale">
            <img
              className="hero-desktop-image"
              src="/sofas-by-daneen-hero.png"
              alt="Sofas By Daneen summer sale living room"
              width="1584"
              height="672"
              loading="eager"
              decoding="async"
            />
            <img
              className="hero-mobile-image"
              src="/sofas-by-daneen-mobile-hero.png"
              alt="Sofas By Daneen summer sale living room"
              width="928"
              height="1152"
              loading="eager"
              decoding="async"
            />
          </section>

          <section className="bespoke-heading" id="sur-mesure" aria-labelledby="bespoke-title">
            <h2 id="bespoke-title">YOUR INTERIOR DESERVES A<br />BESPOKE PIECE</h2>
          </section>

          <section className="bespoke-band" aria-label="How bespoke furniture is made">
            <div className="process-grid" aria-label="How bespoke furniture is made">
              <article>
                <div className="process-image-space">
                  <img className="model-step-image" src="/choose-model-sofa.png" alt="" width="1536" height="1024" loading="lazy" decoding="async" />
                </div>
                <h3>1 · I CHOOSE MY MODEL</h3>
                <p>Choose the silhouette that fits your space.</p>
              </article>
              <article>
                <div className="process-image-space">
                  <img className="fabric-step-image" src="/choose-fabric-sofa.png" alt="" width="256" height="256" loading="lazy" decoding="async" />
                </div>
                <h3>2 · I CHOOSE MY FABRIC</h3>
                <p>Select a couture fabric or request a sample.</p>
              </article>
              <article>
                <div className="process-image-space">
                  <img className="delivery-step-image" src="/delivery-worldwide-truck.png" alt="" width="1536" height="1024" loading="lazy" decoding="async" />
                </div>
                <h3>3 · DELIVERED WITH CARE WORLDWIDE</h3>
                <p>Handcrafted in the United Kingdom and delivered worldwide.</p>
              </article>
            </div>
          </section>

          <section className="sofa-finder deferred-section" aria-labelledby="shop-sofas-title">
            <h2 id="shop-sofas-title">Shop sofas</h2>
            <div className="sofa-type-grid">
              {sofaTypes.map(([name, image]) => (
                <Link className="sofa-type-card" href="/collections" key={name}>
                  <img src={image} alt={name} width="900" height="600" loading="lazy" decoding="async" />
                </Link>
              ))}
            </div>
          </section>

          <section className="colour-finder deferred-section" aria-labelledby="colour-title">
            <h2 id="colour-title">Got a colour in mind</h2>
            <div className="colour-grid">
              {colourFamilies.map((colour) => (
                <Link href={`/shop?color=${colourShopFilters[colour]}`} key={colour} aria-label={`Shop ${colour} sofas`}>
                  <img src={`${SOFOLOGY_IMG}/colorpicker/homepage-colour-${colour}-010925-desktop-min`} alt="" width="160" height="160" loading="lazy" decoding="async" />
                </Link>
              ))}
            </div>
          </section>

          <section className="size-finder deferred-section" aria-labelledby="size-title">
            <h2 id="size-title">Got a size in mind</h2>
            <div className="size-grid">
              {sofaSizes.map((size) => (
                <Link href={`/shop?seats=${sizeShopFilters[size]}`} key={size}>
                  <img src={`${SOFOLOGY_IMG}/2025/sept/homepage-size-${size}-010925-desktop-min`} alt="" width="400" height="180" loading="lazy" decoding="async" />
                  <h3>{sizeLabels[size]}</h3>
                </Link>
              ))}
            </div>
          </section>

          <section className="collection-heading deferred-section" id="collection" aria-labelledby="collection-title">
            <i aria-hidden="true"></i><h2 id="collection-title">OUR COLLECTIONS</h2>
          </section>

          <HomeProductGrid products={products} />
          <div className="products-clone-cta"><Link className="pill filled" href="/collections">VIEW ALL COLLECTIONS →</Link></div>

          <section className="couture-video deferred-section" aria-label="The soul of Sofas By Daneen">
            <LazyVideo
              src="/design-meets-couture.mp4"
              type="video/mp4"
              label="Sofas By Daneen couture furniture film"
            />
            <a href="#collection" className="video-button">DISCOVER THE SOUL OF SOFAS BY DANEEN &nbsp; →</a>
          </section>

          <section className="cushions-promo deferred-section" aria-labelledby="cushions-promo-title">
            <div className="cushions-promo-copy">
              <div>
                <h2 id="cushions-promo-title">Decorative Cushions</h2>
                <p>The perfect finishing touch for your sofa. Discover our collection of unique textures and shapes to complete your living room look.</p>
              </div>
              <Link className="cushions-promo-button" href="/shop">SHOP NOW</Link>
            </div>
            <div className="cushions-promo-image">
              <img src="/blue-chesterfield-sofa-room.jpg" alt="Blue Chesterfield sofa in a paneled room" width="1400" height="1000" loading="lazy" decoding="async" />
            </div>
          </section>

          <div className="cushions-trust-row" aria-label="Customer rating">
            <span>Our customers say</span>
            <strong>Excellent</strong>
            <span className="trust-stars" aria-label="5 out of 5 stars">★★★★★</span>
            <span>4.8 out of 5 based on <a href="#reviews-title">648 reviews</a></span>
            <strong className="trustpilot">★ Trustpilot</strong>
          </div>

          <section className="reviews-clone deferred-section" aria-labelledby="reviews-title">
            <h2 id="reviews-title">Let our clients speak for us</h2>
            <div className="review-score"><span role="img" aria-label="5 out of 5 stars">★★★★★</span><small>from 12 reviews</small></div>
            <div className="review-grid">
              <article><b role="img" aria-label="5 out of 5 stars">★★★★★</b><h3>I love it</h3><p>A superb, beautiful bench!<br />Excellent quality!<br />It transforms my entrance.</p><small>Anne Castel</small></article>
              <article><b role="img" aria-label="5 out of 5 stars">★★★★★</b><h3>Magnificent!</h3><p>The seat is beautiful and fits my interior perfectly. The fabric is genuinely exceptional quality 😍</p><small>Sarah</small></article>
              <article><b role="img" aria-label="5 out of 5 stars">★★★★★</b><h3>Original and so beautiful</h3><p>The fabric is simply gorgeous!<br />The autumnal colours work perfectly with the furniture.</p><small>Amandine Roquette</small></article>
            </div>
          </section>

          <section className="instagram-reels deferred-section" aria-labelledby="instagram-reels-title">
            <h2 id="instagram-reels-title">Watch our pieces come to life</h2>
            <div className="reel-carousel" aria-label="Instagram reels carousel">
              {instagramReels.map((reel, index) => (
                <article className="reel-card" key={reel.title}>
                  <div className="reel-embed-frame">
                    <iframe
                      src={reel.embedUrl}
                      title={`${reel.title} Instagram reel`}
                      loading="lazy"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <a className="reel-caption" href={reel.href} target="_blank" rel="noreferrer">{reel.title}</a>
                </article>
              ))}
            </div>
          </section>

          <section className="reassurance deferred-section" aria-label="Service commitments">
            <article><img src={`${CDN}Reassurance_-_icons_Plan_de_travail_1.png?crop=center&height=64&v=1729675736&width=64`} alt="" width="64" height="64" loading="lazy" decoding="async" /><h3>CLIENT SERVICE &amp; EASY RETURNS</h3><p>Enjoy 14 days to return your order<br />(excluding bespoke and international orders).</p></article>
            <article><img src={`${CDN}Reassurance_-_icons_Plan_de_travail_1.png?crop=center&height=64&v=1729675736&width=64`} alt="" width="64" height="64" loading="lazy" decoding="async" /><h3>FRENCH ARTISANAL PRODUCTION</h3><p>Bespoke personalisation service.<br />Quote within 48 hours, appointment on request.</p></article>
            <article><img src={`${CDN}Reassurance_-_icons_Plan_de_travail_1.png?crop=center&height=64&v=1729675736&width=64`} alt="" width="64" height="64" loading="lazy" decoding="async" /><h3>SECURE DELIVERY &amp; PAYMENT</h3><p>UK delivery service.<br />Pay in three instalments with Klarna.<br />Complimentary samples available.</p></article>
          </section>
        </main>

        <HomeTrustPrefooter />

        <div className="prefooter-mark deferred-section"><span aria-label="Sofas By Daneen monogram">SBD</span></div>

        <footer id="showrooms" className="deferred-section">
          <a className="footer-logo" href="#top" aria-label="Sofas By Daneen home">Sofas By Daneen</a>
          <div className="footer-news"><h2>Join our newsletter and receive a £15 gift voucher</h2><p>Your weekly dose of inspiration.<br />Discover our creations first and receive a £15 voucher for your next order over £150.</p><div className="newsletter-field"><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="Your email *" /><button type="button" aria-label="Subscribe to the newsletter">→</button></div></div>
          <div className="footer-columns"><div><h4>The House of Sofas By Daneen</h4><a href="#sur-mesure">The House</a><Link href="/collections">Lookbook</Link><Link href="/collections">Fabrics</Link><a href="#showrooms">Showrooms</a><a href="#atelier">The Sofas By Daneen Workshop</a><a href="#atelier">Reupholstery - Artisan Upholsterers</a></div><div><h4>Information &amp; Contact</h4><a href="#top">Search</a><a href="#showrooms">Find a showroom</a><a href="#showrooms">Catalogue</a><Link href="/collections">Leopard Ottoman</Link><Link href="/collections">Designer Benches</Link><Link href="/collections">Editorials</Link></div><div id="professionals"><h4>Legal Information</h4><a href="#showrooms">Legal notice</a><a href="#showrooms">Privacy policy</a><a href="#showrooms">Terms and conditions</a><a href="#showrooms">FAQ</a><a href="#showrooms">Make a return</a><a href="#showrooms">Contact us</a></div><div><h4>Follow Us</h4><a href="#showrooms">YouTube</a><a href="#showrooms">Pinterest</a><a href="#showrooms">Instagram</a><a href="#showrooms">LinkedIn</a><a href="#showrooms">Email</a></div></div>
          <div className="copyright"><span>LANGUAGE &nbsp; English</span><span>Copyright © 2026 Sofas By Daneen. Designed by BureauBarbara</span></div>
        </footer>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
