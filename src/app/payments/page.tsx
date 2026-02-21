import { PaymentPage } from "@/legacy_app/pages/Payments";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paga Seguro",
  description: "Transformateck - La comunidad de IA más activa en español. Somos +600 miembros construyendo juntos.",
  openGraph: {
    title: "Paga Seguro | Transformateck",
    description: "Transformateck - La comunidad de IA más activa en español. Somos +600 miembros construyendo juntos.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function PaymentsPage() {
  return <PaymentPage />;
}
