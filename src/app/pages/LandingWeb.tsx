import { Pricing } from "../components/Pricing";
import { Upsells } from "../components/Upsells";
import { Helmet } from "react-helmet-async";

export function LandingWeb() {
  return (
    <>
      <Helmet>
        <title>Transformateck | Landing pages</title>
        <meta
          name="description"
          content="Transformateck - Creamos landings profesionales optimizadas para conversión. Diseño premium, hosting incluido y entrega express en 48-72hrs."
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (Facebook, WhatsApp) */}
        <meta property="og:title" content="Transformateck" />
        <meta
          property="og:description"
          content="Transformateck - Creamos landings profesionales optimizadas para conversión. Diseño premium, hosting incluido y entrega express en 48-72hrs."
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
          content="Transformateck - Creamos landings profesionales optimizadas para conversión. Diseño premium, hosting incluido y entrega express en 48-72hrs."
        />
      </Helmet>
      <div className="pt-20 bg-black">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Futuristic Grid */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
              linear-gradient(to right, rgba(6, 182, 212, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6, 182, 212, 0.2) 1px, transparent 1px)
            `,
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>

          {/* Animated Orbs */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div
              className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 rounded-full backdrop-blur-sm mb-8">
              <span className="text-cyan-400 text-sm">
                🚀 LANDING WEB PROFESIONAL
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl mb-8 leading-tight">
              <span className="text-white">Tu Presencia Digital</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent font-bold">
                En Tiempo Récord
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Landing pages optimizadas para conversión. Diseño profesional,
              hosting incluido y entrega express. Todo lo que necesitas para
              vender online.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {[
                {
                  icon: "⚡",
                  label: "Entrega 48-72hrs",
                  color: "from-cyan-400 to-cyan-600",
                },
                {
                  icon: "🎨",
                  label: "Diseño Premium",
                  color: "from-purple-400 to-purple-600",
                },
                {
                  icon: "📱",
                  label: "100% Responsive",
                  color: "from-blue-400 to-blue-600",
                },
                {
                  icon: "🔒",
                  label: "Hosting Incluido",
                  color: "from-pink-400 to-pink-600",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 group"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div
                    className={`text-lg bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                  >
                    {feature.label}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#pricing"
              className="inline-block px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Ver Planes y Precios
            </a>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-24 px-4 bg-gradient-to-b from-black via-slate-900 to-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-400 text-sm mb-6">
                ✨ QUÉ INCLUYE
              </div>
              <h2 className="text-4xl md:text-6xl mb-6">
                <span className="text-white">Todo Lo Que Necesitas</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  En Un Solo Paquete
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "🎨",
                  title: "Diseño Personalizado",
                  description:
                    "Plantillas base adaptadas 100% a tu marca, colores y logo",
                  gradient: "from-cyan-500 to-blue-500",
                },
                {
                  icon: "📱",
                  title: "Responsive Design",
                  description:
                    "Perfecto en móviles, tablets y desktop sin excepciones",
                  gradient: "from-blue-500 to-purple-500",
                },
                {
                  icon: "🚀",
                  title: "SEO Optimizado",
                  description:
                    "Configuración básica para que Google te encuentre fácilmente",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: "🌐",
                  title: "Dominio .com",
                  description:
                    "Tu propio dominio profesional incluido en planes Growth y Brand",
                  gradient: "from-pink-500 to-red-500",
                },
                {
                  icon: "⚙️",
                  title: "Hosting Premium",
                  description:
                    "Servidores optimizados sin preocupaciones técnicas por 1 año",
                  gradient: "from-orange-500 to-yellow-500",
                },
                {
                  icon: "💬",
                  title: "Botón WhatsApp",
                  description:
                    "Conexión directa con tus clientes integrada en todos los planes",
                  gradient: "from-green-500 to-teal-500",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  <div className="relative z-10">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <Pricing />

        {/* Upsells Section */}
        <Upsells />

        {/* Final CTA */}
        <section className="py-24 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div
              className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-6xl text-white mb-6">
              ¿Listo Para Lanzar
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Tu Landing Web?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Únete a cientos de negocios que ya están generando ventas con
              nuestras landings profesionales
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/528118582060?text=Hola%20me%20interesa%20el%20servicio%20de%20la%20landing%20web"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 text-lg"
              >
                💬 Comenzar Mi Proyecto
              </a>
              <a
                href="#pricing"
                className="px-10 py-5 border-2 border-cyan-400 text-cyan-400 rounded-xl hover:bg-cyan-400/10 transition-all duration-300 text-lg"
              >
                Ver Planes Nuevamente
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
