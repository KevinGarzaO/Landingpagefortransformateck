import { Home } from "../../../Home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transformateck | Home",
  description: "Transformateck - Somos una fábrica de productos digitales que utiliza IA para crear apps móviles, web, e-commerce y más en 48-72hrs.",
  openGraph: {
    title: "Transformateck | Home",
    description: "Transformateck - Somos una fábrica de productos digitales que utiliza IA para crear apps móviles, web, e-commerce y más en 48-72hrs.",
  },
};

export default function HomePage() {
  return <Home />;
}
