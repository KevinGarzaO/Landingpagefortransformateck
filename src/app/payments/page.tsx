import { PaymentPage } from "@/legacy_app/pages/Payments";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transformateck | Paga seguro",
  description: "Transformateck - Paga de forma segura y rápida tus proyectos de landings profesionales optimizadas para conversión.",
  openGraph: {
    title: "Transformateck | Paga seguro",
    description: "Transformateck - Paga de forma segura y rápida tus proyectos de landings profesionales optimizadas para conversión.",
  },
};

export default function PaymentsPage() {
  return <PaymentPage />;
}
