
import { createHash } from 'crypto';

const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || process.env.META_WA_VERIFY_TOKEN; // Fallback if user insists on using that one, though unlikely correct.

if (!PIXEL_ID) {
  console.warn("Meta Pixel ID is missing in environment variables.");
}

if (!ACCESS_TOKEN) {
  console.warn("Meta Access Token is missing in environment variables.");
}

export const hashData = (data: string): string => {
  if (!data) return '';
  return createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
};

type CapiEventData = {
  eventName: string;
  eventId?: string; // Dedup ID
  externalId?: string;
  fbp?: string;
  fbc?: string;
  sourceUrl: string;
  clientIp: string;
  userAgent: string;
  emails?: string[];
  phones?: string[];
  customData?: Record<string, any>;
};

export const sendCapiEvent = async (event: CapiEventData) => {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error("Skipping CAPI event: Missing credentials.");
    return;
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);

  const userData: any = {
    client_ip_address: event.clientIp,
    client_user_agent: event.userAgent,
    external_id: event.externalId ? [event.externalId] : undefined,
    fbp: event.fbp,
    fbc: event.fbc,
  };

  if (event.emails && event.emails.length > 0) {
    userData.em = event.emails.map(hashData);
  }

  if (event.phones && event.phones.length > 0) {
    userData.ph = event.phones.map(hashData);
  }

  const payload = {
    data: [
      {
        event_name: event.eventName,
        event_time: currentTimestamp,
        event_source_url: event.sourceUrl,
        action_source: "website",
        user_data: userData,
        custom_data: event.customData,
        event_id: event.eventId, // Critical for deduplication if Pixel also fires with same ID
      },
    ],
    access_token: ACCESS_TOKEN,
  };

  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/${PIXEL_ID}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Meta CAPI Error:", result);
    } else {
      console.log(`Meta CAPI Success (${event.eventName}):`, result);
    }
  } catch (error) {
    console.error("Meta CAPI Network Error:", error);
  }
};
