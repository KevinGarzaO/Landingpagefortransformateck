'use client';

import { useEffect, Suspense } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/utils/metaPixel';

// Helper to get cookie value
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

export const getExternalId = (): string => {
  if (typeof window === 'undefined') return '';
  
  let id = localStorage.getItem('fbp_external_id');
  
  if (!id) {
    // Check cookies as fallback
    const match = document.cookie.match(/(^|;)\s*fbp_external_id\s*=\s*([^;]+)/);
    id = match ? match[2] : null;
  }

  if (!id) {
    id = uuidv4();
    localStorage.setItem('fbp_external_id', id);
    // Set cookie for 365 days
    document.cookie = `fbp_external_id=${id}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  }

  // Initialize entry time if not present
  if (typeof sessionStorage !== 'undefined' && !sessionStorage.getItem('entry_time')) {
    sessionStorage.setItem('entry_time', new Date().toISOString());
  }
  
  return id;
};

// Inner component 
function CapiTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. Generate/Get External ID
    const externalId = getExternalId();
    
    // Generate unique eventId for deduplication between Pixel and CAPI
    const pageViewEventId = `pageview-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Get cookies for enhanced matching
    const fbp = getCookie('_fbp') || undefined;
    
    // Improved FBC retrieval: Cookie -> URL param
    let fbc = getCookie('_fbc') || undefined;
    if (!fbc) {
        const fbclid = searchParams.get('fbclid');
        if (fbclid) {
            fbc = `fb.1.${Date.now()}.${fbclid}`;
        }
    }

    // 2. Client-side Pixel PageView with eventId for deduplication
    trackPageView(pageViewEventId, externalId);

    // 3. Server-side CAPI PageView
    const triggerPageView = async () => {
      try {
        await fetch('/api/capi/pageview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            externalId,
            eventId: pageViewEventId,
            fbp,
            fbc,
            url: window.location.href,
          }),
        });
      } catch (e) {
        console.error("Failed to trigger CAPI PageView", e);
      }
    };

    triggerPageView();
    
    // ViewContent is triggered separately in FinalCTA.tsx when user scrolls to CTA
    
  }, [pathname, searchParams]); // Added searchParams to dependency array

  return null;
}

// Main component wrapped in Suspense for future-proofing
export default function CapiTracker() {
  return (
    <Suspense fallback={null}>
      <CapiTrackerInner />
    </Suspense>
  );
}
