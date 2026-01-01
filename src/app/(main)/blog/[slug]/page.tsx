"use client";
import { useEffect, useState, use } from "react";
import { getBlogPostBySlug, type BlogPost } from "@/lib/firestore";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const data = await getBlogPostBySlug(slug);
        if (!data) {
          router.push("/blog");
          return;
        }
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) return null;

  const dateToDisplay = post.date instanceof Timestamp 
    ? post.date.toDate() 
    : new Date(post.date);

  const formattedDate = dateToDisplay.toLocaleString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Header */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <Link 
            href="/blog"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al Blog
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full capitalize border border-cyan-500/30">
              {post.type || 'General'}
            </span>
            <span className="text-gray-500 text-sm">{formattedDate}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 py-6 border-y border-white/10">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-cyan-500 to-purple-500 p-0.5">
              <img 
                src={post.authorImg || "/assets/logo.png"} 
                alt={post.authorName} 
                className="w-full h-full object-cover rounded-full bg-black"
              />
            </div>
            <div>
              <p className="text-white font-medium">{post.authorName || "Equipo Transformateck"}</p>
              <p className="text-gray-500 text-sm">Escrito por Transformateck</p>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 px-4">
        <article className="max-w-4xl mx-auto">
          {post.image && (
            <div className="rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-cyan-500/10 border border-white/10">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-auto object-cover max-h-[600px]"
              />
            </div>
          )}

          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="prose prose-invert prose-cyan max-w-none">
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {post?.markdownContent ?? ""}
  </ReactMarkdown>
</div>
          </div>
        </article>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-t from-slate-900 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Te gustó este artículo?</h2>
          <p className="text-gray-400 mb-10 text-lg">Hablemos sobre cómo la tecnología puede transformar tu negocio.</p>
          <a
            href={`https://wa.me/528118582060?text=Hola%20le%C3%AD%20su%20art%C3%ADculo%20sobre%20${encodeURIComponent(post.title)}%20y%20me%20gustar%C3%ADa%20saber%20m%C3%A1s`}
            className="inline-block px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
          >
            💬 Contactar Ahora
          </a>
        </div>
      </section>
    </div>
  );
}
