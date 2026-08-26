const items = [
  {
    icon: "britain",
    text: <>Many of our sofas<br />handmade in Britain</>,
  },
  {
    icon: "guarantee",
    text: <>Wooden framed sofas<br />include our 15 year<br />guarantee</>,
  },
  {
    icon: "apr",
    text: <>4 years interest free<br />credit, subject to status</>,
  },
  {
    icon: "handmade",
    text: <>Sofas are made by hand<br />and quality tested</>,
  },
  {
    icon: "award",
    text: <>Awarded the British<br />Standard Kitemark</>,
  },
] as const;

function TrustIcon({ type }: { type: (typeof items)[number]["icon"] }) {
  if (type === "apr") {
    return <div className="home-trust-apr"><strong>0</strong><span>%<small>APR</small></span></div>;
  }

  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  if (type === "britain") {
    return <svg viewBox="0 0 64 64" aria-hidden="true" {...common}><circle cx="32" cy="32" r="23"/><path d="M10 32h44M32 9v46M15 17l34 30M49 17L15 47M10 25h16V10M54 25H38V10M10 39h16v15M54 39H38v15"/></svg>;
  }
  if (type === "guarantee") {
    return <svg viewBox="0 0 72 64" aria-hidden="true" {...common}><path d="M5 43h42v10H5zM10 30h32c4 0 7 3 7 7v6H5v-6c0-4 2-7 5-7zM10 30v-9h14v9M27 30v-9h15v9"/><path d="M54 10l4 3 5-1 2 5 4 3-2 5 2 5-4 3-2 5-5-1-4 3-4-3-5 1-2-5-4-3 2-5-2-5 4-3 2-5 5 1z"/><text x="58" y="29" textAnchor="middle" fill="currentColor" stroke="none" fontSize="12" fontWeight="700">15</text></svg>;
  }
  if (type === "handmade") {
    return <svg viewBox="0 0 64 64" aria-hidden="true" {...common}><path d="M10 37l11 6 9-9-8-5-5 4-7-4-4 4zM29 34l8-9 8 5-7 8M37 25l6-8 8 5-6 8M44 18l4-7 8 5-5 7M22 43l5 6 8-4 8-8"/><path d="M8 36l-4 7 13 8 5-8M56 17l4 3-7 12-5-3"/></svg>;
  }
  return <svg viewBox="0 0 64 64" aria-hidden="true" {...common}><path d="M32 54C21 42 13 34 13 24c0-7 5-12 12-12 4 0 7 2 9 5 2-3 5-5 9-5 7 0 12 5 12 12 0 10-11 20-23 30z"/><path d="M18 26h29M26 13l8 13 8-13M25 26l9 25 9-25"/></svg>;
}

export default function HomeTrustPrefooter() {
  return (
    <section className="home-trust-prefooter" aria-label="Why choose Sofas By Daneen">
      <div className="home-trust-strip">
        <div className="home-trust-grid">
          {items.map((item) => (
            <article className="home-trust-item" key={item.icon}>
              <div className="home-trust-icon"><TrustIcon type={item.icon} /></div>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="home-trust-intro">
        <h2>Welcome to Sofas By Daneen – Your Sofa &amp; Furniture Experts</h2>
        <p>Looking back at years of making high quality, comfortable and stylish <strong>sofas</strong>, our focus remains on thoughtful design, dependable craftsmanship and furniture made for real homes. From carefully selected materials to considered finishing details, every Sofas By Daneen piece is created with comfort, quality and lasting style in mind.</p>
        <a href="#sur-mesure">Read more</a>
      </div>
      <style>{`
        .home-trust-prefooter{width:100%;color:#351052;background:#fff}
        .home-trust-strip{background:#f2f2f2;padding:42px 24px 44px}
        .home-trust-grid{width:min(1120px,100%);margin:0 auto;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:34px}
        .home-trust-item{text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;min-width:0}
        .home-trust-icon{height:62px;display:flex;align-items:center;justify-content:center;margin-bottom:10px;color:#351052}
        .home-trust-icon svg{width:58px;height:58px;display:block}
        .home-trust-item p{margin:0;font-size:15px;line-height:1.55;color:#351052}
        .home-trust-apr{display:flex;align-items:flex-start;line-height:1;color:#351052;height:60px}
        .home-trust-apr strong{font-size:58px;font-weight:400;letter-spacing:-4px}
        .home-trust-apr span{font-size:27px;margin:4px 0 0 5px;display:flex;flex-direction:column;align-items:flex-start}
        .home-trust-apr small{font-size:10px;margin-top:2px}
        .home-trust-intro{text-align:center;padding:38px 24px 34px;background:#fff}
        .home-trust-intro h2{font-family:Graphik,Arial,sans-serif;font-size:26px;line-height:1.25;font-weight:600;margin:0 auto 16px;color:#351052}
        .home-trust-intro p{max-width:820px;margin:0 auto;color:#5d5667;font-size:15px;line-height:1.65}
        .home-trust-intro strong{color:#351052}
        .home-trust-intro a{display:inline-block;margin-top:9px;font-size:14px;font-weight:700;color:#351052;text-decoration:none}
        @media(max-width:900px){.home-trust-grid{grid-template-columns:repeat(3,1fr);row-gap:36px}.home-trust-item:nth-child(4){grid-column:1/2}.home-trust-item:nth-child(5){grid-column:2/3}}
        @media(max-width:600px){.home-trust-strip{padding:34px 16px}.home-trust-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:32px 12px}.home-trust-item:nth-child(4){grid-column:auto}.home-trust-item:nth-child(5){grid-column:1/-1}.home-trust-item p{font-size:13px}.home-trust-intro{padding:32px 18px}.home-trust-intro h2{font-size:21px}.home-trust-intro p{font-size:14px}}
      `}</style>
    </section>
  );
}