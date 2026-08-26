type BrandLogoVariant = "primary" | "reverse" | "stacked" | "mark" | "mark-reverse";

type BrandLogoProps = {
  variant?: BrandLogoVariant;
  className?: string;
};

export default function BrandLogo({ variant = "primary", className = "" }: BrandLogoProps) {
  const classes = ["brand-logo", `brand-logo--${variant}`, className].filter(Boolean).join(" ");

  if (variant === "mark" || variant === "mark-reverse") {
    return (
      <svg className={classes} viewBox="0 0 200 200" role="img" aria-label="Sofas By Daneen">
        <rect x="1" y="1" width="198" height="198" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <rect x="11" y="11" width="178" height="178" fill="none" stroke="currentColor" strokeWidth="0.6" opacity=".45" />
        <text className="brand-logo-mark-letters" x="100" y="122" textAnchor="middle" fontSize="66" letterSpacing="1" fill="currentColor">SBD</text>
        <path d="M62 140 H138" stroke="currentColor" strokeWidth="0.8" opacity=".4" />
        <text className="brand-logo-mark-name" x="100" y="160" textAnchor="middle" fontSize="9" letterSpacing="4" fill="currentColor" opacity=".7">SOFAS BY DANEEN</text>
      </svg>
    );
  }

  return (
    <span className={classes} role="img" aria-label="Sofas By Daneen">
      <span className="brand-logo-word">Sofas</span>
      <span className="brand-logo-by">by</span>
      <span className="brand-logo-word">Daneen</span>
    </span>
  );
}
