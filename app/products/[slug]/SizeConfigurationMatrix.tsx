import type { Product } from "../../lib/products";
import "./size-configuration.css";

const columns = [
  { name: "4 Seater Sofa", key: "four" },
  { name: "2.5 Seater Sofa", key: "twohalf" },
  { name: "Chair", key: "chair" },
  { name: "Storage Footstool", key: "footstool" },
  { name: "Corner Sofa LHF", key: "lhf" },
  { name: "Corner Sofa RHF", key: "rhf" },
] as const;

const rows = [
  { code: "A", label: "Total Height", values: ["87 cm", "87 cm", "87 cm", "38 cm", "87 cm", "87 cm"] },
  { code: "B", label: "Arm Height", values: ["70 cm", "70 cm", "70 cm", "", "70 cm", "70 cm"] },
  { code: "C", label: "Seat Height", values: ["46 cm", "46 cm", "46 cm", "38 cm", "46 cm", "46 cm"] },
  { code: "D", label: "Depth", values: ["102 cm", "102 cm", "97 cm", "51 cm", "207/102 cm", "207/102 cm"] },
  { code: "E", label: "Width", values: ["212 cm", "182 cm", "94 cm", "65 cm", "264 cm", "264 cm"] },
  { code: "F", label: "Seat Depth", values: ["68 cm", "68 cm", "68 cm", "", "68 cm", "68 cm"] },
  { code: "G", label: "Access Height", values: ["66 cm", "66 cm", "66 cm", "", "66 cm", "66 cm"] },
  { code: "H", label: "Length", values: ["", "", "", "", "207 cm", "207 cm"] },
] as const;

export default function SizeConfigurationMatrix({ product }: { product: Product }) {
  const productSizes = product.sizes ?? [];
  const fallback = product.heroImage;
  const images = [
    productSizes.find((s) => s.seats === 4)?.studioFront ?? productSizes.at(-1)?.studioFront ?? fallback,
    productSizes.find((s) => s.seats === 2)?.studioFront ?? productSizes[1]?.studioFront ?? fallback,
    productSizes.find((s) => s.seats === 1)?.studioFront ?? fallback,
    fallback,
    productSizes.at(-1)?.studioAngle ?? fallback,
    productSizes.at(-1)?.studioAngle ?? fallback,
  ];

  return (
    <section className="sas-dimensions" aria-labelledby="sas-dimensions-title">
      <h2 id="sas-dimensions-title">Dimensions</h2>
      <div className="sas-dimensions-grid">
        <div className="sas-drawing">
          <img src="/product-dimensions/wadenhoe-dimension-guide.svg" alt={`${product.name} dimension measurement guide`} />
          <a href="#product-details">Download product details &amp; dimensions</a>
        </div>
        <div className="sas-table-scroll">
          <table className="sas-dimension-table">
            <thead>
              <tr>
                <th className="sas-row-label" aria-hidden="true" />
                {columns.map((column, index) => (
                  <th key={column.key}>
                    <img src={images[index]} alt="" />
                    <span>{column.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.code}>
                  <th><span>({row.code})</span> {row.label}</th>
                  {row.values.map((value, index) => <td key={`${row.code}-${columns[index].key}`}>{value || "\u00a0"}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
