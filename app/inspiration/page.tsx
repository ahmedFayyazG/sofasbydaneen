import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import "./inspiration.css";

const images = {
  slateLifestyle: "/products/chaise-sofa/01-slate-grey-velvet/lifestyle/daneen-chaise-sofa-slate-grey-velvet-lifestyle-01.jpg",
  slateLifestyleAlt: "/products/chaise-sofa/01-slate-grey-velvet/lifestyle/daneen-chaise-sofa-slate-grey-velvet-lifestyle-02.jpg",
  slateStudio: "/products/chaise-sofa/01-slate-grey-velvet/studio/daneen-chaise-sofa-slate-grey-velvet-studio-01.jpg",
  oatmealStudio: "/products/chaise-sofa/03-oatmeal-linen/studio/daneen-chaise-sofa-oatmeal-linen-studio-01.jpg",
  modularBeige: "/products/modular-corner-sofa/lifestyle/beige/daneen-modular-corner-sofa-lifestyle-beige-wide.jpg",
  modularBeigeAlt: "/products/modular-corner-sofa/lifestyle/beige/daneen-modular-corner-sofa-lifestyle-beige-three-quarter.jpg",
};

const stories = [
  { eyebrow: "Seasonal edit", title: "The Art of Living Well", copy: "Soft silhouettes, tactile fabrics and considered colour palettes for rooms designed around everyday comfort.", image: images.slateLifestyle, href: "/shop" },
  { eyebrow: "Most loved", title: "The Daneen Bestsellers", copy: "Discover the shapes our customers return to: generous corners, elegant chaise sofas and beautifully balanced modular seating.", image: images.modularBeige, href: "/shop" },
  { eyebrow: "Style edit", title: "Quiet Luxury", copy: "Warm neutrals, deep textures and sculptural forms create an interior that feels calm, confident and collected.", image: images.oatmealStudio, href: "/shop?color=ivory" },
];

const guides = [
  { title: "Find your perfect sofa", copy: "Start with the way you live, then choose the silhouette, size and upholstery that belongs in your room.", href: "/shop" },
  { title: "A guide to fabrics", copy: "From relaxed linen to plush velvet and tactile bouclé, explore how each upholstery changes the mood of a sofa.", href: "/shop" },
  { title: "Planning your space", copy: "Measure with confidence and understand how chaise, corner and modular configurations work in different rooms.", href: "/collections" },
];

export default function InspirationPage() {
  return <div className="inspiration-page">
    <div className="announce"><span>‹</span><p>Autumn promotional events and mid-season clearance sales across UK</p><span>›</span></div>
    <SiteHeader />
    <main>
      <section className="insp-intro">
        <p className="insp-kicker">SOFAS BY DANEEN</p>
        <h1>Inspiration</h1>
        <p>Ideas, considered interiors and practical guidance to help you create a living space that feels unmistakably yours.</p>
      </section>

      <section className="insp-hero">
        <div className="insp-hero-image"><img src={stories[0].image} alt="Daneen sofa in a calm interior" /></div>
        <div className="insp-hero-copy"><span>{stories[0].eyebrow}</span><h2>{stories[0].title}</h2><p>{stories[0].copy}</p><Link href={stories[0].href}>Discover the edit</Link></div>
      </section>

      <section className="insp-section">
        <div className="insp-heading"><p>Curated for you</p><h2>Discover your look</h2></div>
        <div className="insp-grid">
          {stories.slice(1).map((story) => <article className="insp-card" key={story.title}>
            <Link href={story.href} className="insp-card-image"><img src={story.image} alt={story.title} /></Link>
            <div><span>{story.eyebrow}</span><h3>{story.title}</h3><p>{story.copy}</p><Link href={story.href}>Explore</Link></div>
          </article>)}
        </div>
      </section>

      <section className="insp-fabric">
        <div><p className="insp-kicker">MATERIAL MATTERS</p><h2>Find the fabric that feels right</h2><p>Colour is only half the story. Texture, softness and durability all shape how your sofa looks and lives in your home.</p><Link href="/shop">Explore fabrics</Link></div>
        <img src={images.slateLifestyleAlt} alt="Close view of the Slate Grey Velvet sofa" />
      </section>

      <section className="insp-guides">
        <div className="insp-heading"><p>Help choosing</p><h2>Get the details right</h2></div>
        <div className="insp-guide-grid">{guides.map((guide, i) => <Link href={guide.href} className="insp-guide" key={guide.title}><span>0{i+1}</span><h3>{guide.title}</h3><p>{guide.copy}</p><b>Read more →</b></Link>)}</div>
      </section>

      <section className="insp-realhomes">
        <div className="insp-realhomes-copy"><p className="insp-kicker">REAL HOMES</p><h2>Made for the way you live</h2><p>From quiet reading corners to open-plan family rooms, see how considered seating can anchor the whole space.</p><Link href="/shop">Shop the collection</Link></div>
        <div className="insp-realhomes-images"><img src={images.modularBeigeAlt} alt="Beige modular corner sofa"/><img src={images.slateStudio} alt="Slate grey chaise sofa"/></div>
      </section>
    </main>
  </div>;
}
