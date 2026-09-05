// Thin client for Shopify's Storefront API.
//
// This talks to the *Storefront* API (public, read-only, product/catalog data),
// not the Admin API. Configure it with two environment variables:
//
//   SHOPIFY_STORE_DOMAIN            e.g. "sofasbydaneen.myshopify.com"
//   SHOPIFY_STOREFRONT_ACCESS_TOKEN a Storefront API token (see README section
//                                   "Connecting to Shopify" for how to create one)
//
// Everything the site shows — price, images, description, stock, sales — is
// then whatever is set on the product in Shopify admin. No product content
// should be hardcoded in this app anymore.

const API_VERSION = "2025-10";

const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export const isShopifyConfigured = Boolean(STORE_DOMAIN && STOREFRONT_TOKEN);

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!STORE_DOMAIN || !STOREFRONT_TOKEN) {
    throw new Error(
      "Shopify is not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN to connect this site to your store.",
    );
  }

  const endpoint = `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    // Revalidate periodically so price/stock/description changes made in
    // Shopify admin show up without a redeploy.
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify Storefront API request failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;

  if (json.errors?.length) {
    throw new Error(`Shopify Storefront API error: ${json.errors.map((e) => e.message).join("; ")}`);
  }

  if (!json.data) {
    throw new Error("Shopify Storefront API returned no data.");
  }

  return json.data;
}

const PRODUCT_FIELDS = /* GraphQL */ `
  id
  handle
  title
  description
  descriptionHtml
  productType
  tags
  availableForSale
  totalInventory
  featuredImage {
    url
    altText
  }
  images(first: 12) {
    edges {
      node {
        url
        altText
      }
    }
  }
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  compareAtPriceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  options {
    name
    values
  }
  variants(first: 25) {
    edges {
      node {
        id
        title
        sku
        availableForSale
        quantityAvailable
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        image {
          url
          altText
        }
      }
    }
  }
  fabricRanges: metafield(namespace: "custom", key: "available_fabrics") {
    references(first: 10) {
      edges {
        node {
          ... on Metaobject {
            handle
            name: field(key: "name") {
              value
            }
            swatches: field(key: "swatches") {
              references(first: 30) {
                edges {
                  node {
                    ... on MediaImage {
                      image {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export type ShopifyMoney = { amount: string; currencyCode: string };

export type ShopifyVariant = {
  id: string;
  title: string;
  sku: string | null;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  selectedOptions: { name: string; value: string }[];
  image: { url: string; altText: string | null } | null;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  totalInventory: number | null;
  featuredImage: { url: string; altText: string | null } | null;
  images: { edges: { node: { url: string; altText: string | null } }[] };
  priceRange: { minVariantPrice: ShopifyMoney };
  compareAtPriceRange: { minVariantPrice: ShopifyMoney } | null;
  options: { name: string; values: string[] }[];
  variants: { edges: { node: ShopifyVariant }[] };
  fabricRanges: {
    references: {
      edges: {
        node: {
          handle: string;
          name: { value: string } | null;
          swatches: {
            references: {
              edges: { node: { image: { url: string; altText: string | null } | null } }[];
            } | null;
          } | null;
        };
      }[];
    } | null;
  } | null;
};

export async function fetchAllShopifyProducts(): Promise<ShopifyProduct[]> {
  const query = /* GraphQL */ `
    query AllProducts($cursor: String) {
      products(first: 100, after: $cursor) {
        edges {
          cursor
          node {
            ${PRODUCT_FIELDS}
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  `;

  const products: ShopifyProduct[] = [];
  let cursor: string | undefined;

  while (true) {
    const data = await shopifyFetch<{
      products: { edges: { cursor: string; node: ShopifyProduct }[]; pageInfo: { hasNextPage: boolean } };
    }>(query, { cursor });

    for (const edge of data.products.edges) products.push(edge.node);

    if (!data.products.pageInfo.hasNextPage) break;
    cursor = data.products.edges.at(-1)?.cursor;
    if (!cursor) break;
  }

  return products;
}

export async function fetchShopifyProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const query = /* GraphQL */ `
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        ${PRODUCT_FIELDS}
      }
    }
  `;

  const data = await shopifyFetch<{ productByHandle: ShopifyProduct | null }>(query, { handle });
  return data.productByHandle;
}
