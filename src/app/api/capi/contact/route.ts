
import { NextRequest, NextResponse } from 'next/server';
import { sendCapiEvent } from '@/lib/capi';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  console.log('[CAPI Contact] Received request');
  
  try {
    // Handle both regular JSON and sendBeacon requests
    let body;
    
    try {
      body = await req.json();
      console.log('[CAPI Contact] Parsed body:', JSON.stringify(body));
    } catch (parseError) {
      console.error('[CAPI Contact] Failed to parse JSON:', parseError);
      return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
    }
    
    const { 
      name, 
      email, 
      phone, 
      message, 
      externalId, 
      eventId, 
      fbp, 
      fbc, 
      url,
      component,
      section,
      buttonId,
      entryTime,
      clickTime
    } = body;

    const ip = req.headers.get('x-forwarded-for') || (req as any).ip || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const finalEventId = eventId || `contact-${externalId}-${Date.now()}`;

    console.log('[CAPI Contact] Processing event:', finalEventId);

    // 1. Save to Firebase
    const leadData = {
      event_name: 'Contact',
      click_date: clickTime || new Date().toISOString(),
      entry_date: entryTime || null,
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
      component: component || null,
      section: section || null,
      button_id: buttonId || null,
      used: false,
    };
    
    try {
      console.log('[CAPI Contact] Saving to Firebase...');
      const docRef = await addDoc(collection(db, "capi_events"), leadData);
      console.log('[CAPI Contact] ✅ Firebase saved successfully:', docRef.id);
    } catch (dbError) {
      console.error('[CAPI Contact] ❌ Firebase error:', dbError);
      // Continue to CAPI even if Firebase fails
    }

    // 2. Send CAPI Event
    console.log('[CAPI Contact] Sending CAPI event...');
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
    console.log('[CAPI Contact] ✅ CAPI event sent');

    return NextResponse.json({ success: true, eventId: finalEventId });
  } catch (error) {
    console.error('[CAPI Contact] ❌ Unexpected error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
