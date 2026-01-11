
import { NextRequest, NextResponse } from 'next/server';
import { sendCapiEvent } from '@/lib/capi';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { externalId, url, eventId } = body;

    const ip = req.headers.get('x-forwarded-for') || (req as any).ip || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Unknown';

    await sendCapiEvent({
      eventName: 'ViewContent',
      eventId: eventId || `viewcontent-${externalId}-${Date.now()}`,
      externalId: externalId,
      sourceUrl: url,
      clientIp: ip,
      userAgent: userAgent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('CAPI ViewContent Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
