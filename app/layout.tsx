import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://sofas-by-daneen-fashion-recreation.ahmedfayyaz47.chatgpt.site";
const HERO_IMAGE = "/sofas-by-daneen-hero.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sofas By Daneen | Handcrafted Bespoke Furniture",
  description: "Discover handcrafted bespoke armchairs, benches and ottomans by Sofas By Daneen. Couture fabrics, made-to-measure design and British artisanal craftsmanship.",
  applicationName: "Sofas By Daneen",
  manifest: "/manifest.webmanifest",
  authors: [{ name: "Sofas By Daneen" }],
  creator: "Sofas By Daneen",
  publisher: "Sofas By Daneen",
  category: "Furniture",
  keywords: [
    "bespoke furniture",
    "handcrafted furniture",
    "British furniture design",
    "custom armchair",
    "designer bench",
    "luxury ottoman",
    "couture upholstery",
    "made to measure furniture",
  ],
  alternates: {
    canonical: "/",
    languages: { "en-GB": "/" },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "Sofas By Daneen",
    title: "Sofas By Daneen | Handcrafted Bespoke Furniture",
    description: "Bespoke couture furniture, handcrafted in the United Kingdom for distinctive interiors.",
    images: [{ url: HERO_IMAGE, width: 1200, height: 896, alt: "Sofas By Daneen summer sale living room with green sofa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sofas By Daneen | Handcrafted Bespoke Furniture",
    description: "Bespoke couture furniture, handcrafted in the United Kingdom for distinctive interiors.",
    images: [HERO_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6b1438",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://www.clovi-paris.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.clovi-paris.com" />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />
        <link
          rel="preload"
          href="https://cdn.shopify.com/s/files/1/0866/4114/8238/files/Graphik-Regular-Web.woff2?v=1730811463"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://cdn.shopify.com/s/files/1/0866/4114/8238/files/GraphikCondensed-Bold-Web.woff2?v=1730811437"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
