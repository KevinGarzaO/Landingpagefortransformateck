import { LandingWeb } from "@/legacy_app/pages/LandingWeb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transformateck | Landing pages",
  description: "Transformateck - Creamos landings profesionales optimizadas para conversión. Diseño premium, hosting incluido y entrega express en 48-72hrs.",
  openGraph: {
    title: "Transformateck | Landing pages",
    description: "Transformateck - Creamos landings profesionales optimizadas para conversión. Diseño premium, hosting incluido y entrega express en 48-72hrs.",
  },
};

export default function LandingWebPage() {
  return <LandingWeb />;
}
