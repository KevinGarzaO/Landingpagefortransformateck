import { LandingWeb } from "@/legacy_app/pages/LandingWeb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landing Web",
  description: "Transformateck - Creamos landings profesionales optimizadas para conversión. Diseño premium, hosting incluido y entrega express en 48-72hrs.",
  openGraph: {
    title: "Landing Web | Transformateck",
    description: "Transformateck - Creamos landings profesionales optimizadas para conversión. Diseño premium, hosting incluido y entrega express en 48-72hrs.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LandingWebPage() {
  return <LandingWeb />;
}
