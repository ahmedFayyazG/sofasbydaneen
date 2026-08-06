import LazyVideo from "./components/LazyVideo";
import SiteHeader from "./components/SiteHeader";

const CDN = "https://www.clovi-paris.com/cdn/shop/files/";
const SITE_URL = "https://sofas-by-daneen-fashion-recreation.ahmedfayyaz47.chatgpt.site";

const products = [
  {
    name: "The Colette - Bespoke Armchair",
    price: "€2.590,00",
    priceValue: "2590.00",
    image: `${CDN}Design_sans_titre_-_2026-06-09T223919.772.png?v=1781037584`,
    colors: ["#b55273"],
  },
  {
    name: "The Claudel - Designer Ottoman",
    price: "€790,00",
    priceValue: "790.00",
    image: `${CDN}CLAUDEL_VELOURSMILLERAIESNUAGE_f5af7109-ad68-4f70-ad2d-4496385a0ec5.jpg?v=1769592818`,
    colors: ["#d9e2df", "#e9dfd1", "#a87955", "#caa179", "#7b3b34", "#9b5e3d", "#efe5cf"],
  },
  {
    name: "The Gainsbourg - Nobilis Fawn",
    price: "€2.580,00",
    priceValue: "2580.00",
    image: `${CDN}Design_sans_titre_45.jpg?v=1776282343`,
    colors: ["#a8784f"],
  },
  {
    name: "The Pompidou - Vegan Leather",
    price: "€1.780,00",
    priceValue: "1780.00",
    image: `${CDN}Cuir_graine_modele_8.png?v=1781259329`,
    colors: ["#2c2928"],
  },
];

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
      description: "French house of handcrafted bespoke furniture and couture upholstery.",
      logo: `${SITE_URL}/favicon.svg`,
      image: `${SITE_URL}/sofas-by-daneen-hero.png`,
      priceRange: "€€€",
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
          image: `${product.image}&width=750`,
          brand: { "@type": "Brand", name: "Sofas By Daneen" },
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: product.priceValue,
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/#collection`,
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
        <div className="announce"><span aria-hidden="true">‹</span><p>International delivery.</p><span aria-hidden="true">›</span></div>
        <SiteHeader />

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
            <p className="kicker">COUTURE FURNITURE HOUSE</p>
            <h2 id="bespoke-title">YOUR INTERIOR DESERVES A<br />BESPOKE PIECE</h2>
            <p className="soft-copy"><em>Choose your model, choose your fabric.<br />We craft the rest by hand in our workshops in France.</em></p>
            <i className="tiny-rule" aria-hidden="true"></i>
          </section>

          <section className="process-grid" aria-label="How bespoke furniture is made">
            <article>
              <div className="process-image-space">
                <img className="model-step-image" src="/choose-model-sofa.png" alt="" width="1536" height="1024" loading="lazy" decoding="async" />
              </div>
              <h3>1 · I CHOOSE MY MODEL</h3>
              <p>Armchair, bench or ottoman—each silhouette is designed to bring character to your space.</p>
            </article>
            <article>
              <div className="process-image-space">
                <img className="fabric-step-image" src="/choose-fabric-sofa.png" alt="" width="256" height="256" loading="lazy" decoding="async" />
              </div>
              <h3>2 · I CHOOSE MY FABRIC</h3>
              <p>Our couture collection or the designer of your choice: Lelièvre, Pierre Frey… Complimentary sample.</p>
            </article>
            <article>
              <div className="process-image-space">
                <img className="delivery-step-image" src="/delivery-worldwide-truck.png" alt="" width="1536" height="1024" loading="lazy" decoding="async" />
              </div>
              <h3>3 · DELIVERED WITH CARE WORLDWIDE</h3>
              <p>Handcrafted in France and delivered with all the care your piece deserves. International delivery.</p>
            </article>
          </section>

          <section className="appointment-clone" aria-label="Bespoke consultation">
            <p><em>15 minutes to imagine your piece together</em></p>
            <div><a className="pill filled" href="#showrooms">BOOK AN APPOINTMENT →</a><a className="pill" href="#showrooms">COMPLIMENTARY SAMPLE →</a></div>
            <div className="promises"><span>• &nbsp; MADE IN FRANCE</span><span>• &nbsp; ARTISANAL BESPOKE</span><span>• &nbsp; INTERNATIONAL DELIVERY</span></div>
          </section>

          <section className="collection-heading deferred-section" id="collection" aria-labelledby="collection-title">
            <i aria-hidden="true"></i><h2 id="collection-title">OUR COLLECTIONS</h2>
            <p>Handcrafted by our French carpenters and upholsterers.<br /><strong>Each piece begins with a pencil sketch.</strong><br />We unite <strong>design</strong> and <strong>couture</strong> to create collections that are<br /><strong>distinctive</strong>, elegant and free—like poetry.</p>
          </section>

          <section className="products-clone deferred-section" aria-label="Featured furniture">
            {products.map((product) => (
              <article key={product.name}>
                <a href="#collection" className="product-image" aria-label={`View ${product.name}`}>
                  <img
                    src={`${product.image}&width=750`}
                    srcSet={`${product.image}&width=375 375w, ${product.image}&width=550 550w, ${product.image}&width=750 750w`}
                    sizes="(max-width: 540px) 100vw, (max-width: 900px) 50vw, 25vw"
                    alt={product.name}
                    width="750"
                    height="750"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <div className="swatch-row" aria-label={`${product.colors.length} available colour${product.colors.length === 1 ? "" : "s"}`}>{product.colors.map((color, index) => <span style={{ background: color }} key={`${color}-${index}`} aria-hidden="true"></span>)}</div>
                <h3>{product.name}</h3><p>{product.price}</p>
              </article>
            ))}
          </section>
          <div className="pagination" aria-hidden="true"><b></b><span></span></div>

          <section className="couture-video deferred-section" aria-label="The soul of Sofas By Daneen">
            <LazyVideo
              src="https://www.clovi-paris.com/cdn/shop/videos/c/vp/25be61db40a84accb971898ec2e650de/25be61db40a84accb971898ec2e650de.HD-1080p-7.2Mbps-44808719.mp4?v=0"
              type="video/mp4"
              poster="https://www.clovi-paris.com/cdn/shop/files/preview_images/0eccb956855e4d8980e92c8b40dbb930.thumbnail.0000000000_1080x.jpg?v=1774014735"
              label="Sofas By Daneen couture furniture film"
            />
            <a href="#collection" className="video-button">DISCOVER THE SOUL OF SOFAS BY DANEEN &nbsp; →</a>
          </section>

          <section className="couture-copy deferred-section" aria-labelledby="couture-title">
            <h2 id="couture-title">DESIGN MEETS COUTURE</h2>
            <p>The art of upholstery lies in a delicate balance<br />between artisanal excellence and the poetry of gesture.<br /><strong>Velvets, jacquards and natural linens…<br />fabrics that bring an extra soul to your interior.</strong><br />Sourced from the finest mills with artisanal expertise,<br />our fabrics celebrate material and texture.</p>
            <p>A deep desire to bring <strong>beautiful fabrics of the past</strong> back into the light<br />and warm interiors with a soul that is both <strong>poetic and sensual.</strong></p>
            <a className="pill" href="#showrooms">COMPLIMENTARY SAMPLES</a>
          </section>

          <section className="atelier-clone deferred-section" id="atelier" aria-labelledby="atelier-title">
            <div className="atelier-photo">
              <LazyVideo src="https://cdn.shopify.com/videos/c/o/v/3bfbf39d29994058b6e380aed8530e61.mov" label="Upholsterer working in the Sofas By Daneen workshop" />
            </div>
            <div className="atelier-content">
              <span className="atelier-tag">LILLE WORKSHOP · CONTEMPORARY ARTISAN</span>
              <h2 id="atelier-title">HANDMADE<br />IN LILLE</h2><i aria-hidden="true"></i>
              <p>Every Sofas By Daneen piece is born in our northern French workshop. Our upholsterers craft each one by hand, with the same care for a unique commission as for a professional series.</p>
              <div className="atelier-points"><div><b aria-hidden="true">✂</b><p><strong>ARTISANAL BESPOKE</strong><span>Every dimension, fabric and finish is tailored to your space and your wishes.</span></p></div><div><b aria-hidden="true">🏅</b><p><strong>QUALITY &amp; DURABILITY</strong><span>Materials selected to last. Certified fabrics, robust structures and refined finishes.</span></p></div><div><b aria-hidden="true">📍</b><p><strong>LOCAL CRAFT &amp; GUARANTEE</strong><span>Made in France and guaranteed by our artisans. One contact from design to delivery.</span></p></div></div>
              <a className="pill" href="#atelier">DISCOVER OUR WORKSHOP →</a>
            </div>
          </section>

          <section className="featured-product deferred-section" aria-label="Featured Pompidou bench">
            <div className="featured-room"><img src={`${CDN}Design_sans_titre_36.jpg?v=1762263387&width=1080`} alt="Bespoke Sofas By Daneen bench in a contemporary room" width="1080" height="1350" loading="lazy" decoding="async" /></div>
            <a className="featured-card" href="#collection">
              <img src={`${CDN}POMPIDOU_VELOURSCHENILLECOGNAC_89f7c88a-8a16-4ab9-a378-4d7d7385c999.jpg?v=1769592861&width=750`} alt="The Pompidou in cognac striped chenille" width="750" height="750" loading="lazy" decoding="async" />
              <small>Cognac striped chenille</small>
              <h3>The Pompidou - Designer Bench - Cognac Striped Chenille</h3>
              <p>€1.480,00</p>
            </a>
          </section>

          <section className="reviews-clone deferred-section" aria-labelledby="reviews-title">
            <h2 id="reviews-title">Let our clients speak for us</h2>
            <div className="review-score"><span role="img" aria-label="5 out of 5 stars">★★★★★</span><small>from 12 reviews &nbsp; ✅</small></div>
            <div className="review-grid">
              <article><b role="img" aria-label="5 out of 5 stars">★★★★★</b><h3>I love it</h3><p>A superb, beautiful bench!<br />Excellent quality!<br />It transforms my entrance.</p><small>Anne Castel</small></article>
              <article><b role="img" aria-label="5 out of 5 stars">★★★★★</b><h3>Magnificent!</h3><p>The seat is beautiful and fits my interior perfectly. The fabric is genuinely exceptional quality 😍</p><small>Sarah</small></article>
              <article><b role="img" aria-label="5 out of 5 stars">★★★★★</b><h3>Original and so beautiful</h3><p>The fabric is simply gorgeous!<br />The autumnal colours work perfectly with the furniture.</p><small>Amandine Roquette</small></article>
            </div>
          </section>

          <section className="reassurance deferred-section" aria-label="Service commitments">
            <article><img src={`${CDN}Reassurance_-_icons_Plan_de_travail_1.png?crop=center&height=64&v=1729675736&width=64`} alt="" width="64" height="64" loading="lazy" decoding="async" /><h3>CLIENT SERVICE &amp; EASY RETURNS</h3><p>Enjoy 14 days to return your order<br />(excluding bespoke and international orders).</p></article>
            <article><img src={`${CDN}Reassurance_-_icons_Plan_de_travail_1.png?crop=center&height=64&v=1729675736&width=64`} alt="" width="64" height="64" loading="lazy" decoding="async" /><h3>FRENCH ARTISANAL PRODUCTION</h3><p>Bespoke personalisation service.<br />Quote within 48 hours, appointment on request.</p></article>
            <article><img src={`${CDN}Reassurance_-_icons_Plan_de_travail_1.png?crop=center&height=64&v=1729675736&width=64`} alt="" width="64" height="64" loading="lazy" decoding="async" /><h3>SECURE DELIVERY &amp; PAYMENT</h3><p>International delivery service.<br />Pay in three instalments with Klarna.<br />Complimentary samples available.</p></article>
          </section>
        </main>

        <div className="prefooter-mark deferred-section"><span aria-label="Sofas By Daneen monogram">SBD</span></div>

        <footer id="showrooms" className="deferred-section">
          <a className="footer-logo" href="#top" aria-label="Sofas By Daneen home">Sofas By Daneen</a>
          <div className="footer-news"><h2>Join our newsletter and receive a €15 gift voucher</h2><p>Your weekly dose of inspiration.<br />Discover our creations first and receive a €15 voucher for your next order over €150.</p><div className="newsletter-field"><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="Your email *" /><button type="button" aria-label="Subscribe to the newsletter">→</button></div></div>
          <div className="footer-columns"><div><h4>The House of Sofas By Daneen</h4><a href="#sur-mesure">The House</a><a href="#collection">Lookbook</a><a href="#collection">Fabrics</a><a href="#showrooms">Showrooms</a><a href="#atelier">The Sofas By Daneen Workshop</a><a href="#atelier">Reupholstery - Artisan Upholsterers</a></div><div><h4>Information &amp; Contact</h4><a href="#top">Search</a><a href="#showrooms">Find a showroom</a><a href="#showrooms">Catalogue</a><a href="#collection">Leopard Ottoman</a><a href="#collection">Designer Benches</a><a href="#collection">Editorials</a></div><div id="professionals"><h4>Legal Information</h4><a href="#showrooms">Legal notice</a><a href="#showrooms">Privacy policy</a><a href="#showrooms">Terms and conditions</a><a href="#showrooms">FAQ</a><a href="#showrooms">Make a return</a><a href="#showrooms">Contact us</a></div><div><h4>Follow Us</h4><a href="#showrooms">YouTube</a><a href="#showrooms">Pinterest</a><a href="#showrooms">Instagram</a><a href="#showrooms">LinkedIn</a><a href="#showrooms">Email</a></div></div>
          <div className="copyright"><span>LANGUAGE &nbsp; English</span><span>Copyright © 2026 Sofas By Daneen. Designed by BureauBarbara</span></div>
        </footer>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
