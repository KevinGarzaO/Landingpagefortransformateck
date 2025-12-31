import { useEffect } from "react";
import logo from "../../assets/logo.png";
import { Helmet } from "react-helmet-async";

export function Home() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Transformateck | Home</title>
        <meta
          name="description"
          content="Transformateck - Somos una fábrica de productos digitales que utiliza IA para crear apps móviles, web, e-commerce y más en 48-72hrs."
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (Facebook, WhatsApp) */}
        <meta property="og:title" content="Transformateck" />
        <meta
          property="og:description"
          content="Transformateck - Somos una fábrica de productos digitales que utiliza IA para crear apps móviles, web, e-commerce y más en 48-72hrs."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://transformateck.com/assets/og-image-xbh9Qoxc.jpg"
        />
        <meta property="og:url" content="https://transformateck.com" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Transformateck" />
        <meta
          name="twitter:description"
          content="Transformateck - Somos una fábrica de productos digitales que utiliza IA para crear apps móviles, web, e-commerce y más en 48-72hrs."
        />
      </Helmet>
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
            <img
              src={logo}
              alt="Transformateck"
              className="h-32 md:h-40 mx-auto mb-8 brightness-0 invert animate-in fade-in zoom-in duration-700 hidden md:block"
            />
            <h2 className="text-5xl md:hidden bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-8 animate-in fade-in zoom-in duration-700">
              Transformateck
            </h2>

            <div className="mb-8 animate-in slide-in-from-bottom duration-700 delay-100">
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 rounded-full backdrop-blur-sm mb-6">
                <span className="text-cyan-400 text-sm md:text-base">
                  ⚡ FÁBRICA DE PRODUCTOS DIGITALES
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight animate-in slide-in-from-bottom duration-700 delay-200">
              <span className="text-white">Creamos El</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent font-bold">
                Futuro Digital
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed animate-in slide-in-from-bottom duration-700 delay-300">
              Transformamos ideas en productos digitales extraordinarios. Desde
              el concepto hasta el lanzamiento, nuestro equipo de expertos
              construye tu visión con tecnología de vanguardia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-in slide-in-from-bottom duration-700 delay-400">
              <button
                onClick={scrollToServices}
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  🚀 Ver Servicios
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>
              <a
                href="https://wa.me/528118582060?text=Hola%20me%20interesa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20servicios"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-xl hover:bg-cyan-400/10 backdrop-blur-sm transition-all duration-300"
              >
                💬 Hablar con Expertos
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto animate-in fade-in duration-700 delay-500">
              {[
                { number: "100+", label: "Proyectos Lanzados", icon: "🚀" },
                { number: "48hrs", label: "Entrega Rápida", icon: "⚡" },
                { number: "15+", label: "Profesionales", icon: "👥" },
                { number: "99%", label: "Satisfacción", icon: "⭐" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group"
                >
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section
          id="services"
          className="py-24 px-4 bg-gradient-to-b from-black via-slate-900 to-black relative overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
            <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
            <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-400 text-sm mb-6">
                💼 QUÉ HACEMOS
              </div>
              <h2 className="text-4xl md:text-6xl mb-6">
                <span className="text-white">Tu Equipo Completo de</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Producto Digital
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                No solo desarrollamos. Creamos, diseñamos, optimizamos y
                lanzamos productos que generan impacto real en tu negocio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "📱",
                  title: "Apps Mobile",
                  description:
                    "Aplicaciones móviles nativas para iOS y Android. Experiencias fluidas y de alto rendimiento.",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: "💻",
                  title: "Apps Web",
                  description:
                    "Aplicaciones web progresivas (PWA) modernas, rápidas y accesibles desde cualquier navegador.",
                  gradient: "from-blue-500 to-purple-500",
                },
                {
                  icon: "🚀",
                  title: "Landing Pages",
                  description:
                    "Páginas de aterrizaje optimizadas para conversión. De la idea al lanzamiento en 48-72hrs.",
                  gradient: "from-cyan-500 to-teal-500",
                },
                {
                  icon: "🛒",
                  title: "E-commerce",
                  description:
                    "Tiendas online completas con pasarelas de pago, inventario y gestión de ventas integrada.",
                  gradient: "from-orange-500 to-red-500",
                },
                {
                  icon: "⚙️",
                  title: "Sistemas Web",
                  description:
                    "Plataformas personalizadas, CRM, dashboards y herramientas internas para tu negocio.",
                  gradient: "from-indigo-500 to-purple-500",
                },
                {
                  icon: "🤖",
                  title: "Chatbot IA WhatsApp",
                  description:
                    "Automatización inteligente con IA para atención 24/7. Respuestas personalizadas y conversacionales.",
                  gradient: "from-green-500 to-emerald-500",
                },
                {
                  icon: "✍️",
                  title: "Copywriting para Blogs",
                  description:
                    "Contenido automatizado con agentes de IA. Artículos optimizados SEO que atraen, educan y convierten.",
                  gradient: "from-pink-500 to-rose-500",
                },
                {
                  icon: "📊",
                  title: "Marketing Ads",
                  description:
                    "Campañas automatizadas en Google, Meta y más. Estrategias basadas en datos para maximizar ROI.",
                  gradient: "from-yellow-500 to-orange-500",
                },
              ].map((service, i) => (
                <div
                  key={i}
                  className="group relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Gradient Overlay on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  <div className="relative z-10">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Corner Accent */}
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${service.gradient} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-300`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-24 px-4 bg-black relative overflow-hidden">
          {/* Animated Background Lines */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
              linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.3) 50%, transparent 100%)
            `,
                backgroundSize: "200% 100%",
                animation: "shimmer 3s infinite",
              }}
            ></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 text-sm mb-6">
                🔄 NUESTRO PROCESO
              </div>
              <h2 className="text-4xl md:text-6xl mb-6 text-white">
                De la Idea a la Realidad
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Un flujo de trabajo probado que garantiza éxito en cada proyecto
              </p>
            </div>

            <div className="relative">
              {/* Connecting Line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-20"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    step: "01",
                    title: "Consultoría",
                    desc: "Entendemos tu visión y objetivos",
                    icon: "💡",
                  },
                  {
                    step: "02",
                    title: "Diseño",
                    desc: "Creamos prototipos profesionales",
                    icon: "🎨",
                  },
                  {
                    step: "03",
                    title: "Desarrollo",
                    desc: "Construimos con tecnología de punta",
                    icon: "⚙️",
                  },
                  {
                    step: "04",
                    title: "Lanzamiento",
                    desc: "Ponemos tu producto en marcha",
                    icon: "🚀",
                  },
                ].map((phase, i) => (
                  <div key={i} className="relative">
                    {/* Number Badge */}
                    <div className="flex justify-center mb-6">
                      <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50">
                        <span className="text-white text-xl">{phase.step}</span>
                        {/* Pulse Effect */}
                        <div className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-20"></div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-5xl mb-4">{phase.icon}</div>
                      <h3 className="text-2xl text-white mb-2">
                        {phase.title}
                      </h3>
                      <p className="text-gray-400">{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
          {/* Animated Circles */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div
              className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-6xl text-white mb-6">
              ¿Listo Para Transformar
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Tu Idea en Realidad?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Únete a cientos de negocios que confiaron en nosotros para crear
              sus productos digitales
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToServices}
                className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
              >
                🚀 Explorar Servicios
              </button>
              <a
                href="https://wa.me/528118582060?text=Hola%20me%20interesa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20servicios"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 border-2 border-cyan-400 text-cyan-400 rounded-xl hover:bg-cyan-400/10 transition-all duration-300"
              >
                💬 Agendar Consultoría
              </a>
            </div>
          </div>
        </section>

        <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
      </div>
    </>
  );
}
