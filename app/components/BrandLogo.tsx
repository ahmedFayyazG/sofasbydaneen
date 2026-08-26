type BrandLogoVariant = "primary" | "reverse" | "stacked" | "mark" | "mark-reverse";

type BrandLogoProps = {
  variant?: BrandLogoVariant;
  className?: string;
};

const logoSrc: Record<BrandLogoVariant, string> = {
  primary: "/brand/sofas-by-daneen-primary.svg",
  reverse: "/brand/sofas-by-daneen-primary-reverse.svg",
  stacked: "/brand/sofas-by-daneen-stacked.svg",
  mark: "/brand/sofas-by-daneen-mark.svg",
  "mark-reverse": "/brand/sofas-by-daneen-mark-reverse.svg",
};

export default function BrandLogo({ variant = "primary", className = "" }: BrandLogoProps) {
  const compact = variant === "mark" || variant === "mark-reverse";
  const stacked = variant === "stacked";

  return (
    <img
      className={["brand-logo", `brand-logo--${variant}`, className].filter(Boolean).join(" ")}
      src={logoSrc[variant]}
      alt="Sofas By Daneen"
      width={compact ? 200 : stacked ? 360 : 760}
      height={compact ? 200 : stacked ? 300 : 140}
      style={{
        display: "block",
        width: compact ? "56px" : stacked ? "160px" : "210px",
        height: "auto",
        objectFit: "contain",
      }}
    />
  );
}
