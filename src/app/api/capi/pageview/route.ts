
import { NextRequest, NextResponse } from 'next/server';
import { sendCapiEvent } from '@/lib/capi';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { externalId, url } = body;

    const ip = req.headers.get('x-forwarded-for') || (req as any).ip || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Unknown';

    // Fire and forget (don't block response) - or await if debugging
    await sendCapiEvent({
      eventName: 'PageView',
      eventId: `pageview-${externalId}-${Date.now()}`, // Unique ID for this pageview instance
      externalId: externalId,
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
