
import { NextRequest, NextResponse } from 'next/server';
import { sendCapiEvent, getClientIp } from '@/lib/capi';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { externalId, url, eventId, fbp, fbc, currency, value } = body;

    const ip = getClientIp(req);
    const userAgent = req.headers.get('user-agent') || 'Unknown';

    await sendCapiEvent({
      eventName: 'ViewContent',
      eventId: eventId || `viewcontent-${externalId}-${Date.now()}`,
      externalId: externalId,
      fbp,
      fbc,
      sourceUrl: url,
      clientIp: ip,
      userAgent: userAgent,
      customData: {
        currency: currency || 'MXN',
        value: value !== undefined ? value : 0.00
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('CAPI ViewContent Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
