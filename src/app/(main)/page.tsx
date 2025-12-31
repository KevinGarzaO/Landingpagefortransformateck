import { Home } from "../../../Home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transformateck | Home",
  description: "Transformateck - Somos una fábrica de productos digitales que utiliza IA para crear apps móviles, web, e-commerce y más en 48-72hrs.",
  openGraph: {
    title: "Transformateck",
    description: "Transformateck - Somos una fábrica de productos digitales que utiliza IA para crear apps móviles, web, e-commerce y más en 48-72hrs.",
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

export default function HomePage() {
  return <Home />;
}
