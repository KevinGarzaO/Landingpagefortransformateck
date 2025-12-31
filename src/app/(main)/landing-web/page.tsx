import { LandingWeb } from "@/legacy_app/pages/LandingWeb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transformateck | Landing pages",
  description: "Transformateck - Creamos landings profesionales optimizadas para conversión. Diseño premium, hosting incluido y entrega express en 48-72hrs.",
  openGraph: {
    title: "Transformateck",
    description: "Transformateck - Creamos landings profesionales optimizadas para conversión. Diseño premium, hosting incluido y entrega express en 48-72hrs.",
    url: "https://transformateck.com",
    siteName: "Transformateck",
    images: [
      {
        url: "https://transformateck.com/assets/og-image-xbh9Qoxc.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_MX",
    type: "website",
  },
};

export default function LandingWebPage() {
  return <LandingWeb />;
}
