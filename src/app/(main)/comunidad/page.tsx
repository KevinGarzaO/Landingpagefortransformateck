import { LandingComunidad } from "@/legacy_app/pages/LandingComunidad";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comunidad de IA en Español | Transformateck",
  description:
    "Únete a la comunidad de IA más activa en español. +600 miembros, dinámicas semanales y encuentros los sábados. Aprende, construye y crece con Transformateck.",
  openGraph: {
    title: "Comunidad de IA en Español | Transformateck",
    description:
      "Únete a la comunidad de IA más activa en español. +600 miembros, dinámicas semanales y encuentros los sábados.",
  },
  alternates: {
    canonical: "https://transformateck.com/comunidad",
  },
};

export default function ComunidadPage() {
  return <LandingComunidad />;
}
