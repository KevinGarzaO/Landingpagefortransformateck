"use client";

import { useEffect, useState } from "react";
import { getBlogPosts, type BlogPost } from "@/lib/firestore";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


export function Home() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const result = await getBlogPosts(30);
        setBlogPosts(result.posts);
      } catch (err) {
        console.error("Error loading posts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Helper function to get category color gradient (copied from Blog.tsx)
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
    <>
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
          {/* Futuristic Grid Background */}
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

          {/* Animated Orbs */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div
              className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          {/* Geometric Shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-cyan-500/30 rotate-45 animate-spin"
              style={{ animationDuration: "20s" }}
            ></div>
            <div
              className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 border-purple-500/30 rotate-12 animate-spin"
              style={{ animationDuration: "15s" }}
            ></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-8 animate-in fade-in zoom-in duration-700">
              Kevin Garza
            </h2>

            <div className="mb-8 animate-in slide-in-from-bottom duration-700 delay-100">
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 rounded-full backdrop-blur-sm mb-6">
                <span className="text-cyan-400 text-sm md:text-base">
                  👨‍💻 DESARROLLADOR & EMPRENDEDOR
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight animate-in slide-in-from-bottom duration-700 delay-200">
              <span className="text-white">Construyendo el</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent font-bold">
                Futuro con Tecnología e IA
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed animate-in slide-in-from-bottom duration-700 delay-300">
              Ayudo a emprendedores y empresas a escalar sus negocios mediante
              desarrollo de software, automatización e inteligencia artificial
              aplicada.
            </p>

            {/* Personal Brand Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto animate-in fade-in duration-700 delay-400">
              {[
                { label: "Desarrollo Web & Apps", icon: "🛠️" },
                { label: "IA Aplicada", icon: "🤖" },
                { label: "Contenido & Estrategia", icon: "📣" },
                { label: "Emprendimiento Digital", icon: "🚀" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="text-sm md:text-base text-gray-300 font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Kevin Garza */}
        <section className="py-24 px-4 bg-black relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/3">
                <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                  {/* Placeholder for Kevin's photo - User needs to upload to public/assets/kevin-profile.jpg */}
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/babelink-ia.firebasestorage.app/o/all%2FKevinGarza.png?alt=media&token=6f54050d-2d2a-4c16-82a2-140f72a6fdcc"
                    alt="Kevin Garza"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/400x400?text=Kevin+Garza";
                    }}
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <h3 className="text-2xl font-bold text-white">
                      Kevin Garza
                    </h3>
                    <p className="text-cyan-400">
                      Desarrollador & Emprendedor
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm mb-6">
                  👋 SOBRE MÍ
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Creador de{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                    Transformateck
                  </span>
                </h2>
                <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                  <p>
                    ¡Hola! Soy Kevin Garza, un desarrollador apasionado por la
                    tecnología, la inteligencia artificial y la construcción de
                    productos digitales que generan impacto real. Mi enfoque
                    está en crear soluciones prácticas, útiles y escalables.
                  </p>
                  <p>
                    Combino desarrollo web y móvil con estrategias de negocio
                    centradas en el crecimiento orgánico, el contenido creativo
                    y la productividad potenciada por IA.
                  </p>
                  <blockquote className="border-l-4 border-purple-500 pl-6 text-xl text-gray-300 italic my-8">
                    "Mi filosofía es simple: crear herramientas y experiencias
                    que conecten a las personas con el futuro de la tecnología,
                    enfocado en la aplicabilidad real y en ayudar a otros a
                    crecer con menos barreras de entrada."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transformateck Vision */}
        <section className="py-24 px-4 bg-slate-900/50 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              🌐 Transformateck — El punto de encuentro entre tecnología e IA
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Transformateck es mi proyecto principal, un espacio digital
              diseñado para compartir conocimientos, recursos y estrategias
              sobre tecnología, desarrollo y la implementación estratégica de la
              inteligencia artificial.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                {
                  icon: "🎓",
                  text: "Enseña tecnologías modernas aplicadas a problemas reales.",
                },
                {
                  icon: "🤖",
                  text: "Explica cómo usar IA para mejorar procesos, productos y servicios.",
                },
                {
                  icon: "🚀",
                  text: "Ayuda a emprendedores a integrar herramientas tecnológicas sin frustraciones.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-white/5 border border-white/10 rounded-xl"
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <p className="text-gray-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roles & Projects */}
        <section className="py-24 px-4 bg-black relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                💼 Mis Roles y Proyectos
              </h2>
              <p className="text-gray-400">
                Áreas donde genero valor y disrupción
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="group p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-black border border-white/10 hover:border-cyan-500/50 transition-all">
                <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  🛠️
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  1. Desarrollo Web y Apps
                </h3>
                <p className="text-gray-400 mb-6">
                  Lidero la construcción de plataformas modernas usando Next.js,
                  TypeScript y PWA.
                </p>
                <ul className="space-y-3 text-sm text-gray-500">
                  <li className="flex gap-2">
                    <span className="text-cyan-500">✓</span> Plataformas de
                    contenido y comunidad
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-500">✓</span> Apps móviles
                    híbridas de alto engagement
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-500">✓</span> Integración de
                    notificaciones y automatización
                  </li>
                </ul>
              </div>

              {/* Card 2 */}
              <div className="group p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-black border border-white/10 hover:border-purple-500/50 transition-all">
                <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  🤖
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  2. IA Aplicada
                </h3>
                <p className="text-gray-400 mb-6">
                  La IA como herramienta estratégica, no solo como moda.
                </p>
                <ul className="space-y-3 text-sm text-gray-500">
                  <li className="flex gap-2">
                    <span className="text-purple-500">✓</span> Aumento de
                    eficiencia y automatización
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-500">✓</span> Generación de
                    contenido inteligente
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-500">✓</span> Estrategias de
                    integración sin costos elevados
                  </li>
                </ul>
              </div>

              {/* Card 3 */}
              <div className="group p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-black border border-white/10 hover:border-pink-500/50 transition-all">
                <div className="w-14 h-14 bg-pink-500/20 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  📣
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  3. Contenido y Estrategia
                </h3>
                <p className="text-gray-400 mb-6">
                  Creo contenido diario en redes sociales para democratizar la
                  tecnología.
                </p>
                <ul className="space-y-3 text-sm text-gray-500">
                  <li className="flex gap-2">
                    <span className="text-pink-500">✓</span> YouTube Shorts,
                    Instagram, TikTok
                  </li>
                  <li className="flex gap-2">
                    <span className="text-pink-500">✓</span> Influencers
                    virtuales basados en IA
                  </li>
                  <li className="flex gap-2">
                    <span className="text-pink-500">✓</span> Estrategias
                    basadas en métricas
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Objectives & Future */}
        <section className="py-24 px-4 bg-gradient-to-b from-black to-slate-900 relative">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-cyan-500/20">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                🎯 Objetivos y Visión
              </h2>
              <div className="space-y-6 text-gray-300">
                <p>
                  Mi visión es reducir la brecha entre quienes quieren aprender
                  tecnología e IA y quienes no tienen recursos. Quiero crear
                  productos digitales que empoderen a los usuarios a construir
                  sus propios caminos.
                </p>
                <div className="h-px bg-white/10 my-8"></div>
                <h3 className="text-xl font-bold text-white mb-4">
                  🔥 ¿Qué sigue?
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">➤</span>
                    <span>
                      Expandir la presencia de Transformateck con contenido
                      estratégico de valor.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">➤</span>
                    <span>
                      Fortalecer nuestra autoridad digital para escalar el
                      impacto.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">➤</span>
                    <span>
                      Lanzar nuevas guías, cursos y herramientas que ayuden a
                      otros a crecer con tecnología e IA.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </section>



        {/* Blog Posts Grid - Added to Home */}
        <section className="py-24 px-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 text-sm mb-6">
                📝 NUESTRO BLOG
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Últimas{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Publicaciones
                </span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Artículos recientes sobre tecnología, IA y desarrollo.
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-400">Cargando posts...</p>
              </div>
            )}

            {/* Posts Grid */}
            {!loading && blogPosts.length > 0 && (
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
            
            <div className="text-center mt-12">
               <Link 
                href="/blog"
                className="inline-block px-8 py-3 bg-white/5 border border-white/20 rounded-full text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300"
               >
                 Ver todos los artículos
               </Link>
            </div>
          </div>
        </section>

        {/* Substack Subscription CTA */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              📬 Suscríbete al Newsletter
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Recibe contenido exclusivo sobre tecnología, IA y desarrollo directamente en tu correo.
            </p>
            <div className="flex justify-center">
              <iframe
                src="https://transformateck.substack.com/embed"
                width="480"
                height="320"
                style={{ border: "1px solid #EEE", background: "white", borderRadius: "12px" }}
                frameBorder="0"
                scrolling="no"
                title="Suscríbete a Transformateck en Substack"
              ></iframe>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
