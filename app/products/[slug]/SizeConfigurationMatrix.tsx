import type { Product } from "../../lib/products";
import "./size-configuration.css";

const dimensionLabels = [
  ["A", "Total Height"],
  ["B", "Arm Height"],
  ["C", "Seat Height"],
  ["D", "Depth"],
  ["E", "Width"],
  ["F", "Seat Depth"],
  ["G", "Access Height"],
  ["H", "Length"],
] as const;

function productDetail(product: Product, label: string) {
  return product.details.find((detail) => detail.label.toLowerCase() === label.toLowerCase())?.value;
}

export default function SizeConfigurationMatrix({ product }: { product: Product }) {
  const sizes = product.sizes?.length
    ? product.sizes
    : [{ seats: product.seatOptions?.[0] ?? 3, label: productDetail(product, "Configuration") ?? "Standard", studioFront: product.heroImage, studioAngle: product.heroImage }];

  return (
    <section className="daneen-dimensions" aria-labelledby="daneen-dimensions-title">
      <div className="daneen-dimensions-heading">
        <p>SIZE GUIDE</p>
        <h2 id="daneen-dimensions-title">Dimensions</h2>
      </div>

      <div className="daneen-dimensions-layout">
        <div className="daneen-dimension-illustration">
          <img src={sizes[0]?.studioAngle || product.heroImage} alt={`${product.name} size guide`} />
          <span className="measure measure-a">A</span>
          <span className="measure measure-c">C</span>
          <span className="measure measure-d">D</span>
          <span className="measure measure-e">E</span>
          <span className="measure measure-h">H</span>
          <p>Illustration shown as a configuration guide. Final measurements are confirmed for your selected model.</p>
        </div>

        <div className="daneen-dimension-table-wrap">
          <table className="daneen-dimension-table">
            <thead>
              <tr>
                <th aria-label="Measurement" />
                {sizes.map((size) => (
                  <th key={size.seats}>
                    <img src={size.studioFront} alt="" />
                    <strong>{size.label}</strong>
                    <span>{size.seats} seat{size.seats === 1 ? "" : "s"}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dimensionLabels.map(([letter, label]) => (
                <tr key={letter}>
                  <th><span>({letter})</span> {label}</th>
                  {sizes.map((size) => <td key={`${letter}-${size.seats}`}>—</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="daneen-dimension-note">Exact centimetre measurements will be shown here once the production specifications for each configuration are entered.</p>
        </div>
      </div>
    </section>
  );
}
