
'use client';

import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { usePathname } from 'next/navigation';

export const getExternalId = (): string => {
  if (typeof window === 'undefined') return '';
  
  let id = localStorage.getItem('fbp_external_id');
  
  if (!id) {
    // Check cookies as fallback or primary storage? Meta recommends cookies usually for server access, 
    // but for client-only generation, localStorage is fine if we send it in the body.
    // Let's also check cookie.
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

export default function CapiTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Generate/Get External ID
    const id = getExternalId();
    // setExternalId(id); // Removed unused state

    // 2. Trigger Server-side PageView
    const triggerPageView = async () => {
      try {
        await fetch('/api/capi/pageview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            externalId: id,
            url: window.location.href,
          }),
        });
      } catch (e) {
        console.error("Failed to trigger CAPI PageView", e);
      }
    };

    triggerPageView();
    
    // Note: We are triggering on 'pathname' change if we add it to dependency array, 
    // but Next.js app router handles navigation differently. 
    // For now, this mounts once on hard load? 
    // If it's in layout, it mounts once. We need to listen to pathname changes.
  }, [pathname]);

  return null; // Headless component
}
