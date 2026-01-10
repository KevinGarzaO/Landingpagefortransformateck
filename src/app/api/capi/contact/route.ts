
import { NextRequest, NextResponse } from 'next/server';
import { sendCapiEvent } from '@/lib/capi';
import { db } from '@/lib/firebase'; // Correct path from src/lib/firebase.ts
import { collection, addDoc } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, externalId, eventId, fbp, fbc, url } = body;

    const ip = req.headers.get('x-forwarded-for') || (req as any).ip || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    // Use the eventId sent from client to ensure deduplication
    const finalEventId = eventId || `contact-${externalId}-${Date.now()}`;

    // 1. Save to Firebase (Server-side to ensure reliability)
    const leadData = {
      event_name: 'Contact', // Explicitly saving event name
      click_date: new Date().toISOString(), // User explicitly asked for click date
      name: name || null,
      email: email || null,
      phone: phone || null,
      message: message || null,
      external_id: externalId || null,
      event_id: finalEventId,
      fbp: fbp || null,
      fbc: fbc || null,
      created_at: new Date().toISOString(),
      source: 'web_contact_capi',
      ip_address: ip,
      user_agent: userAgent,
      url: url || null,
      used: false, // Para rastrear si el evento ya fue utilizado
    };
    
    try {
        // Save to 'capi_events' collection as requested
        await addDoc(collection(db, "capi_events"), leadData);
    } catch (dbError) {
        console.error("Error saving to Firebase in API:", dbError);
        // We log but don't stop the flow so CAPI still fires
    }

    // 2. Send CAPI Event
    await sendCapiEvent({
      eventName: 'Contact',
      eventId: finalEventId,
      externalId: externalId,
      fbp,
      fbc,
      sourceUrl: url,
      clientIp: ip,
      userAgent: userAgent,
      emails: email ? [email] : [],
      phones: phone ? [phone] : [],
      customData: {
        value: 0.00,
        currency: 'MXN',
        content_name: 'Lead',
      },
    });

    return NextResponse.json({ success: true, eventId });
  } catch (error) {
    console.error('CAPI Contact Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
