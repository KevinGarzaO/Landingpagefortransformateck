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

export const trackPageView = (eventId?: string, externalId?: string) => {
  if (!canUseFbq()) return;

  (window as any).fbq("track", "PageView", {
    external_id: externalId
  }, { eventID: eventId });
};

export const trackPageViewCapi = async () => {
  // Generate a unique event ID for Deduplication
  const eventId = `pageview-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const externalId = localStorage.getItem('fbp_external_id') || undefined;

  // 1. Client-side Pixel with external_id
  trackPageView(eventId, externalId);

  // 2. Server-side CAPI
  if (!externalId) return; // Skip CAPI if no external_id

  try {
    const fbp = getCookie('_fbp') || undefined;
    const fbc = getCookie('_fbc') || undefined;
    const url = window.location.href;

    const payload = JSON.stringify({
      externalId,
      eventId,
      fbp,
      fbc,
      url,
    });

    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon('/api/capi/pageview', blob);
    } else {
      fetch('/api/capi/pageview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      });
    }
  } catch (e) {
    console.error("CAPI PageView Error", e);
  }
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

export const trackContact = (eventId?: string, externalId?: string) => {
  if (!canUseFbq()) return;

  (window as any).fbq("track", "Contact", {
    value: 0.00,
    currency: "MXN",
    content_name: "Lead",
    external_id: externalId
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
  const externalId = localStorage.getItem('fbp_external_id') || undefined;

  // 1. Client-side Pixel with Event ID and external_id
  trackContact(eventId, externalId);

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


const getFbcValue = () => {
  if (typeof window === 'undefined') return undefined;
  
  // 1. Try to get from cookie first
  const cookieFbc = getCookie('_fbc');
  if (cookieFbc) return cookieFbc;

  // 2. If no cookie, try to get from URL query param 'fbclid'
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');
    
    if (fbclid) {
      // Format: fb.1.timestamp.fbclid
      // "fb" = Facebook
      // "1" = version
      // timestamp = creation time in ms
      return `fb.1.${Date.now()}.${fbclid}`;
    }
  } catch (e) {
    console.error('Error parsing fbclid:', e);
  }

  return undefined;
};

export const trackViewContentCapi = async (externalId: string) => {
  // Generate a unique event ID for Deduplication
  const eventId = `viewcontent-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Get cookies/URL params for enhanced matching
  const fbp = getCookie('_fbp') || undefined;
  const fbc = getFbcValue();

  // 1. Client-side Pixel with external_id (same value as CAPI for matching)
  if (canUseFbq()) {
    (window as any).fbq("track", "ViewContent", {
      external_id: externalId,
      currency: "MXN",
      value: 0.00
    }, { eventID: eventId });
  }

  // 2. Server-side CAPI
  try {
    const payload = JSON.stringify({
      externalId: externalId,
      url: window.location.href,
      eventId: eventId,
      fbp,
      fbc,
      currency: 'MXN',
      value: 0.00
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

