
import { createHash } from 'crypto';
import { NextRequest } from 'next/server';

const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_META_ACCESS_TOKEN

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

/**
 * Extract client IP from request, prioritizing IPv6 over IPv4.
 * Meta recommends using IPv6 when available for better event matching.
 */
export const getClientIp = (req: NextRequest): string => {
  // x-forwarded-for can contain multiple IPs: "client, proxy1, proxy2"
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const cfConnectingIp = req.headers.get('cf-connecting-ip'); // Cloudflare
  const cfConnectingIpv6 = req.headers.get('cf-connecting-ipv6'); // Cloudflare IPv6
  
  // Prioritize Cloudflare IPv6 if available
  if (cfConnectingIpv6) {
    return cfConnectingIpv6.trim();
  }
  
  // Helper to check if IP is IPv6
  const isIPv6 = (ip: string): boolean => {
    return ip.includes(':') && !ip.startsWith('::ffff:');
  };
  
  // Helper to extract clean IP
  const cleanIp = (ip: string): string => {
    // Remove port if present (for IPv4)
    if (ip.includes(':') && !ip.includes('::')) {
      return ip.split(':')[0];
    }
    return ip.trim();
  };
  
  // Parse x-forwarded-for and find IPv6 if present
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map(ip => ip.trim());
    
    // First, try to find an IPv6 address
    const ipv6 = ips.find(ip => isIPv6(ip));
    if (ipv6) {
      return ipv6;
    }
    
    // Otherwise, return the first (client) IP
    if (ips.length > 0 && ips[0]) {
      return cleanIp(ips[0]);
    }
  }
  
  // Check Cloudflare connecting IP
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }
  
  // Check x-real-ip
  if (realIp) {
    return realIp.trim();
  }
  
  // Fallback to Next.js ip property or localhost
  return (req as any).ip || '127.0.0.1';
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
