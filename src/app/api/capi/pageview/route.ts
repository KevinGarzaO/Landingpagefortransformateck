
import { NextRequest, NextResponse } from 'next/server';
import { sendCapiEvent, getClientIp } from '@/lib/capi';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { externalId, eventId, fbp, fbc, url } = body;

    const ip = getClientIp(req);
    const userAgent = req.headers.get('user-agent') || 'Unknown';

    // Use eventId from client for deduplication, or generate one
    const finalEventId = eventId || `pageview-${externalId}-${Date.now()}`;

    await sendCapiEvent({
      eventName: 'PageView',
      eventId: finalEventId,
      externalId: externalId,
      fbp,
      fbc,
      sourceUrl: url,
      clientIp: ip,
      userAgent: userAgent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('CAPI PageView Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

