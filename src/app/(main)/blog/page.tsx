import { Blog } from "@/legacy_app/pages/Blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos, tutoriales y recursos sobre desarrollo web, IA y tecnología. Conocimiento digital de Transformateck.",
  openGraph: {
    title: "Blog | Transformateck",
    description: "Artículos, tutoriales y recursos sobre desarrollo web, IA y tecnología. Conocimiento digital de Transformateck.",
  },
};

export default function BlogPage() {
  return <Blog />;
}
