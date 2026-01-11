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

const getCookie = (name: string) => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

const getEntryTime = () => {
  if (typeof sessionStorage === 'undefined') return null;
  return sessionStorage.getItem('entry_time');
};

export const trackContact = (eventId?: string) => {
  if (!canUseFbq()) return;

  (window as any).fbq("track", "Contact", {
    value: 0.00,
    currency: "MXN",
    content_name: "Lead"
  }, { eventID: eventId });
};

// Helper to check if gtag is available
const canUseGtag = () =>
  typeof window !== "undefined" && typeof (window as any).gtag === "function";

export const trackContactCapi = async (data: { 
  message?: string, 
  phone?: string, 
  email?: string, 
  name?: string,
  component?: string,
  section?: string,
  id?: string
} = {}) => {
  // Generate a unique event ID for Deduplication
  const eventId = `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // 1. Client-side Pixel with Event ID
  trackContact(eventId);

  // 2. Google Analytics Event
  if (canUseGtag()) {
    (window as any).gtag('event', 'generate_lead', {
      event_category: 'engagement',
      event_label: 'whatsapp_contact',
      method: 'WhatsApp',
      currency: 'MXN',
      value: 0,
      content_name: 'Lead',
      page_location: window.location.href,
      page_title: document.title,
      event_id: eventId,
    });
  }

  // 3. Server-side CAPI - Use sendBeacon for reliability during page navigation
  try {
    const externalId = localStorage.getItem('fbp_external_id');
    const fbp = getCookie('_fbp') || undefined;
    const fbc = getCookie('_fbc') || undefined;
    const url = window.location.href;
    
    const payload = JSON.stringify({
      externalId,
      eventId,
      fbp,
      fbc,
      url,
      message: data.message,
      phone: data.phone,
      email: data.email,
      name: data.name,
      component: data.component,
      section: data.section,
      buttonId: data.id,
      clickTime: new Date().toISOString(),
      entryTime: getEntryTime(),
    });

    // sendBeacon is designed to survive page navigation/closure
    // Works on all modern browsers including iOS Safari, Android Chrome, etc.
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      const sent = navigator.sendBeacon('/api/capi/contact', blob);
      
      // Fallback to fetch if sendBeacon fails (e.g., payload too large)
      if (!sent) {
        fetch('/api/capi/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        });
      }
    } else {
      // Fallback for older browsers without sendBeacon
      fetch('/api/capi/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      });
    }
  } catch (e) {
    console.error("CAPI Contact Error", e);
  }
};

export const trackViewContentCapi = async (externalId: string) => {
  // Generate a unique event ID for Deduplication
  const eventId = `viewcontent-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // 1. Client-side Pixel
  if (canUseFbq()) {
    (window as any).fbq("track", "ViewContent", {}, { eventID: eventId });
  }

  // 2. Server-side CAPI
  try {
    const payload = JSON.stringify({
      externalId: externalId,
      url: window.location.href,
      eventId: eventId
    });

    if (navigator.sendBeacon) {
       const blob = new Blob([payload], { type: 'application/json' });
       navigator.sendBeacon('/api/capi/viewcontent', blob);
    } else {
       await fetch('/api/capi/viewcontent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      });
    }
  } catch (e) {
    console.error("Failed to trigger CAPI ViewContent", e);
  }
};
