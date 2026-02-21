import { LandingWeb } from "@/legacy_app/pages/LandingWeb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landing Web",
  description: "Transformateck - La comunidad de IA más activa en español. Somos +600 miembros con dinámicas semanales y encuentros los sábados.",
  openGraph: {
    title: "Landing Web | Transformateck",
    description: "Transformateck - La comunidad de IA más activa en español. Somos +600 miembros con dinámicas semanales y encuentros los sábados.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LandingWebPage() {
  return <LandingWeb />;
}
