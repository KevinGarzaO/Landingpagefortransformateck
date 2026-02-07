"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getBlogPosts, type BlogPost } from "@/lib/firestore";
import { Timestamp } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [lastVisible, setLastVisible] = useState<any>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const result = await getBlogPosts(12);
        setBlogPosts(result.posts);
        setHasMore(result.hasMore);
        setLastVisible(result.lastVisible);
      } catch (err) {
        console.error("Error loading posts:", err);
        setError("Error al cargar los posts. Por favor intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const loadMorePosts = async () => {
    if (!hasMore || loadingMore) return;

    try {
      setLoadingMore(true);
      const result = await getBlogPosts(12, lastVisible);
      setBlogPosts((prev) => [...prev, ...result.posts]);
      setHasMore(result.hasMore);
      setLastVisible(result.lastVisible);
    } catch (err) {
      console.error("Error loading more posts:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Helper function to get category color gradient
  const getCategoryGradient = (type: string) => {
    const gradients: Record<string, string> = {
      tecnologia: "from-cyan-500 to-blue-500",
      desarrollo: "from-purple-500 to-pink-500",
      marketing: "from-orange-500 to-red-500",
      ia: "from-green-500 to-emerald-500",
      seo: "from-indigo-500 to-purple-500",
      diseño: "from-pink-500 to-rose-500",
    };
    return gradients[type?.toLowerCase()] || "from-cyan-500 to-purple-500";
  };

  return (
    <div className="pt-20 min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-black via-slate-900 to-black">
        {/* Background Effects */}
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

        {/* Animated Orbs Removed */}

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 text-sm mb-6">
            📝 NUESTRO BLOG
          </div>
          <h1 className="text-5xl md:text-7xl mb-6">
            <span className="text-white">Conocimiento</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Digital
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Artículos, tutoriales y recursos sobre desarrollo web, IA y
            tecnología
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400">Cargando posts...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-6xl mb-4">⚠️</div>
              <p className="text-red-400 text-center">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && blogPosts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-400 text-center">
                No hay posts disponibles en este momento.
              </p>
            </div>
          )}

          {/* Posts Grid */}
          {!loading && !error && blogPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => {
                const gradient = getCategoryGradient(post.type);
                // Calculate read time from markdown content (approx 200 words per minute)
                const wordCount =
                  post.markdownContent?.split(/\s+/).length || 0;
                const readTime = Math.ceil(wordCount / 200);

                return (
                  <article
                    key={post.id}
                    className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <Link href={`/blog/${post.slug}`} className="block h-full">
                      {/* Gradient Overlay on Hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
                      ></div>

                      {/* Image */}
                      <div className="relative h-48 bg-gray-900 border-b border-white/10 flex items-center justify-center overflow-hidden">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 pointer-events-none`}
                        ></div>
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover relative z-10 group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <Image
                            src="/assets/logo.png"
                            alt={post.title}
                            width={80}
                            height={80}
                            className="brightness-0 invert relative z-10 group-hover:scale-110 transition-transform duration-500"
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 relative z-10">
                        {/* Category & Read Time */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-white/10 text-cyan-400 text-xs rounded-full capitalize border border-white/5">
                            {post.type || "General"}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {readTime} min
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl text-white font-medium mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <div className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.excerpt || ""}
                          </ReactMarkdown>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <span className="text-gray-500 text-xs">
                            {(() => {
                              const dateToDisplay =
                                post.date instanceof Timestamp
                                  ? post.date.toDate()
                                  : new Date(post.date);
                              return dateToDisplay.toLocaleString("es-MX", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              });
                            })()}
                          </span>
                          <span className="text-cyan-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                            Leer artículo
                            <svg
                              className="w-4 h-4 ml-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}

          {/* Load More Button */}
          {!loading && !error && hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={loadMorePosts}
                disabled={loadingMore}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loadingMore ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Cargando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    📚 Cargar Más Posts
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated Circles */}
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
