import { Home } from "../../../Home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio",
  description: "Transformateck - La comunidad de IA más activa en español. Somos +600 miembros con dinámicas semanales y encuentros los sábados. Únete y crece con nosotros.",
  openGraph: {
    title: "Inicio | Transformateck",
    description: "Transformateck - La comunidad de IA más activa en español. Somos +600 miembros con dinámicas semanales y encuentros los sábados. Únete y crece con nosotros.",
  },
};

export default function HomePage() {
  return <Home />;
}
