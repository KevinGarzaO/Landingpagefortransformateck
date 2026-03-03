import { Home } from "../../../Home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transformateck | Comunidad de IA en Español",
  description: "Transformateck - La comunidad de IA más activa en español. Somos +600 miembros con dinámicas semanales y encuentros los sábados. Únete y crece con nosotros.",
  openGraph: {
    title: "Transformateck | Comunidad de IA en Español",
    description: "Transformateck - La comunidad de IA más activa en español. Somos +600 miembros con dinámicas semanales y encuentros los sábados. Únete y crece con nosotros.",
  },
  alternates: {
    canonical: "https://transformateck.com",
  },
};


export default function HomePage() {
  return <Home />;
}
