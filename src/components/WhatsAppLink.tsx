"use client";

import { trackContactCapi } from "../utils/metaPixel";
import { ReactNode } from "react";

interface WhatsAppLinkProps {
  message?: string;
  className?: string;
  children: ReactNode;
}

export function WhatsAppLink({ 
  message = "Quiero mi auditoría gratuita por WhatsApp", 
  className = "", 
  children 
}: WhatsAppLinkProps) {
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("[WhatsAppClick] Click initiated");
    console.log(`[WhatsAppClick] Message: "${message}"`);
    
    try {
      console.log("[WhatsAppClick] Triggering CAPI event...");
      trackContactCapi({ message });
      console.log("[WhatsAppClick] CAPI event triggered");
    } catch (error) {
      console.error("[WhatsAppClick] Error tracking CAPI event:", error);
    }

    const url = `https://wa.me/528118582060?text=${encodeURIComponent(message)}`;
    console.log(`[WhatsAppClick] Redirecting to: ${url}`);
    
    if (typeof window !== "undefined") {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      aria-label="Contactar por WhatsApp"
    >
      {children}
    </button>
  );
}
