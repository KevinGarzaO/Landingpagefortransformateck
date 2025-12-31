import { PaymentPage } from "@/legacy_app/pages/Payments";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transformateck | Paga seguro",
  description: "Transformateck - Paga de forma segura y rápida tus proyectos de landings profesionales optimizadas para conversión.",
  openGraph: {
    title: "Transformateck",
    description: "Transformateck - Paga de forma segura y rápida tus proyectos de landings profesionales optimizadas para conversión.",
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

export default function PaymentsPage() {
  return <PaymentPage />;
}
