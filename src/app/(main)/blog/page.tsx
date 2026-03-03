import { Blog } from "@/legacy_app/pages/Blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos, tutoriales y recursos sobre IA y tecnología por la comunidad de IA más activa en español. Somos +600 aprendiendo juntos.",
  openGraph: {
    title: "Blog | Transformateck",
    description: "Artículos, tutoriales y recursos sobre IA y tecnología por la comunidad de IA más activa en español. Somos +600 aprendiendo juntos.",
    url: "https://transformateck.com/blog",
  },
  alternates: {
    canonical: "https://transformateck.com/blog",
  },
};

export default function BlogPage() {
  return <Blog />;
}
