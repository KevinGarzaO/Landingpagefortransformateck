// src/utils/metaPixel.ts
type MetaItem = {
  name: string;
  price: number;
};

const canUseFbq = () =>
  typeof window !== "undefined" && typeof (window as any).fbq === "function";

/* ---------- INITIATE CHECKOUT ---------- */
export const trackInitiateCheckout = (amount: number, items: MetaItem[]) => {
  if (!canUseFbq()) return;

  (window as any).fbq("track", "InitiateCheckout", {
    value: Number(amount.toFixed(2)),
    currency: "MXN",
    contents: items.map((item) => ({
      id: item.name,
      quantity: 1,
      item_price: Number(item.price.toFixed(2)),
    })),
    num_items: items.length,
    content_type: "product",
  });
};

/* ---------- PURCHASE ---------- */
export const trackPurchase = (amount: number, items: MetaItem[]) => {
  if (!canUseFbq()) return;

  (window as any).fbq("track", "Purchase", {
    value: Number(amount.toFixed(2)),
    currency: "MXN",
    contents: items.map((item) => ({
      id: item.name,
      quantity: 1,
      item_price: Number(item.price.toFixed(2)),
    })),
    num_items: items.length,
    content_type: "product",
  });
};

export const trackPageView = () => {
  if (!canUseFbq()) return;

  (window as any).fbq("track", "PageView");
};

export const trackContact = () => {
  if (!canUseFbq()) return;

  (window as any).fbq("track", "Contact");
};
