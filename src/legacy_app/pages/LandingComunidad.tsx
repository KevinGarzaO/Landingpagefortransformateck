"use client";
const logo = "/assets/logo.png";
import Link from "next/link";
import { WhatsAppLink } from "../../components/WhatsAppLink";

export function LandingComunidad() {
  return (
    <>
      <div className="pt-20">
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
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
            />
          </div>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse" />
            <div
              className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse"
              style={{ animationDelay: "2s" }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
            <img
              src={logo}
              alt="Transformateck"
              className="h-24 md:h-32 mx-auto mb-8 brightness-0 invert animate-in fade-in zoom-in duration-700 hidden md:block"
            />
            <h2 className="text-5xl md:hidden bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-8 animate-in fade-in duration-700">
              Transformateck
            </h2>

            <div className="mb-6 animate-in slide-in-from-bottom duration-700 delay-100">
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 rounded-full backdrop-blur-sm">
                <span className="text-cyan-400 text-sm md:text-base">
                  🤖 COMUNIDAD DE IA EN ESPAÑOL
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight animate-in slide-in-from-bottom duration-700 delay-200">
              <span className="text-white">La Comunidad de IA</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                más Activa en Español
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed animate-in slide-in-from-bottom duration-700 delay-300">
              +600 miembros aprendiendo, construyendo y creciendo juntos.
              Dinámicas semanales y encuentros los sábados para mantenerte al
              frente de la revolución de la inteligencia artificial.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-in slide-in-from-bottom duration-700 delay-400">
              <WhatsAppLink
                message="Hola, quiero unirme a la comunidad de IA de Transformateck"
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
                component="LandingComunidad"
                section="Hero"
                buttonId="comunidad-hero-join"
              >
                🚀 Unirme Ahora
              </WhatsAppLink>
              <a
                href="#que-obtienes"
                className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-xl hover:bg-cyan-400/10 backdrop-blur-sm transition-all duration-300"
              >
                Ver Beneficios
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto animate-in fade-in duration-700 delay-500">
              {[
                { number: "+600", label: "Miembros Activos", icon: "👥" },
                { number: "Semanal", label: "Dinámicas", icon: "🔄" },
                { number: "Sábados", label: "Encuentros", icon: "📅" },
                { number: "100%", label: "En Español", icon: "🇲🇽" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group"
                >
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Qué obtienes */}
        <section
          id="que-obtienes"
          className="py-24 px-4 bg-gradient-to-b from-black via-slate-900 to-black relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent" />
            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-400 text-sm mb-6">
                🎁 QUÉ OBTIENES
              </div>
              <h2 className="text-4xl md:text-6xl mb-6">
                <span className="text-white">Todo lo que Necesitas</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  para Dominar la IA
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Al unirte a Transformateck accedes a una comunidad que te
                impulsa a aprender y aplicar IA en tu vida y negocio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "🔄",
                  title: "Dinámicas Semanales",
                  description:
                    "Cada semana un reto o actividad práctica con IA para que no te quedes atrás. Aprende haciendo, no solo leyendo.",
                  gradient: "from-cyan-500 to-teal-500",
                },
                {
                  icon: "📅",
                  title: "Encuentros los Sábados",
                  description:
                    "Sesiones en vivo cada sábado. Comparte avances, haz preguntas y conéctate con otros miembros de la comunidad.",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: "🤖",
                  title: "Herramientas y Recursos",
                  description:
                    "Acceso a los mejores prompts, tutoriales, templates y herramientas de IA curadas por el equipo de Transformateck.",
                  gradient: "from-blue-500 to-purple-500",
                },
                {
                  icon: "👥",
                  title: "Red de +600 Personas",
                  description:
                    "Conecta con emprendedores, freelancers y profesionales que están usando IA para transformar su trabajo.",
                  gradient: "from-orange-500 to-red-500",
                },
                {
                  icon: "💡",
                  title: "Casos de Uso Reales",
                  description:
                    "Aprende con ejemplos de la vida real. Casos de negocios, automatizaciones y proyectos que funcionan hoy.",
                  gradient: "from-yellow-500 to-orange-500",
                },
                {
                  icon: "🚀",
                  title: "Lanza tu Proyecto",
                  description:
                    "Desde la idea hasta el lanzamiento. La comunidad te apoya y el equipo de Transformateck puede construirlo por ti.",
                  gradient: "from-green-500 to-emerald-500",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  <div className="relative z-10">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${item.gradient} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-300`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="py-24 px-4 bg-black relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 text-sm mb-6">
                🔄 CÓMO FUNCIONA
              </div>
              <h2 className="text-4xl md:text-6xl mb-6 text-white">
                Tu Semana en la Comunidad
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Una rutina diseñada para que aprendas IA de forma consistente y
                práctica
              </p>
            </div>

            <div className="relative">
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-20" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    step: "01",
                    title: "Recibe el Reto",
                    desc: "Cada semana un nuevo reto de IA llega a tu feed",
                    icon: "📬",
                  },
                  {
                    step: "02",
                    title: "Aprende y Aplica",
                    desc: "Usa las herramientas y recursos compartidos en la comunidad",
                    icon: "🛠️",
                  },
                  {
                    step: "03",
                    title: "Comparte tu Avance",
                    desc: "Muestra lo que construiste y recibe feedback real",
                    icon: "📣",
                  },
                  {
                    step: "04",
                    title: "Encuentro Semanal",
                    desc: "Conéctate en vivo los sábados con toda la comunidad",
                    icon: "🎯",
                  },
                ].map((phase, i) => (
                  <div key={i} className="relative">
                    <div className="flex justify-center mb-6">
                      <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50">
                        <span className="text-white text-xl">{phase.step}</span>
                        <div className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-20" />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl mb-4">{phase.icon}</div>
                      <h3 className="text-2xl text-white mb-2">{phase.title}</h3>
                      <p className="text-gray-400">{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Para quién es */}
        <section className="py-24 px-4 bg-gradient-to-b from-black via-slate-900 to-black relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-400 text-sm mb-6">
                🎯 PARA QUIÉN ES
              </div>
              <h2 className="text-4xl md:text-6xl mb-6">
                <span className="text-white">Esta Comunidad es</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Para Ti Si...
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: "💼",
                  title: "Eres Emprendedor",
                  description:
                    "Quieres usar IA para automatizar procesos, crear productos digitales o escalar tu negocio más rápido.",
                },
                {
                  icon: "🧑‍💻",
                  title: "Eres Freelancer o Creativo",
                  description:
                    "Buscas diferenciarte con IA, entregar mejores resultados a tus clientes y aumentar tus ingresos.",
                },
                {
                  icon: "📚",
                  title: "Estás Aprendiendo IA",
                  description:
                    "Quieres un espacio en español donde aprender sin perderte, con gente que ya está en el camino.",
                },
                {
                  icon: "🌎",
                  title: "Quieres Crecer tu Red",
                  description:
                    "Buscas conectar con personas que entienden el impacto de la IA y están construyendo el futuro.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-6 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="text-5xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="text-xl text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quién lidera */}
        <section className="py-24 px-4 bg-black relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-10" />

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 text-sm mb-6">
                👤 QUIÉN LIDERA
              </div>
              <h2 className="text-4xl md:text-5xl text-white mb-4">
                La Mente Detrás de
                <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Transformateck
                </span>
              </h2>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-purple-500/10 rounded-3xl border border-white/10 p-10 md:p-16">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-6xl flex-shrink-0 shadow-xl shadow-cyan-500/30">
                  👨‍💻
                </div>
                <div>
                  <h3 className="text-3xl text-white mb-2">Kevin Garza</h3>
                  <p className="text-cyan-400 mb-4 text-lg">
                    Fundador de Transformateck
                  </p>
                  <p className="text-gray-400 leading-relaxed text-lg mb-6">
                    Construyendo la comunidad de IA más activa en español.
                    Emprendedor digital, entusiasta de la tecnología y convencido
                    de que la IA es la herramienta más poderosa de esta
                    generación — disponible para todos los que hablan español.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Inteligencia Artificial",
                      "Productos Digitales",
                      "Comunidad",
                      "Automatización",
                    ].map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-1.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse" />
            <div
              className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <img
              src={logo}
              alt="Transformateck"
              className="h-16 md:h-24 mx-auto mb-8 brightness-0 invert"
            />
            <div className="inline-block mb-6 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-300 text-sm">
              🤖 Únete Ahora
            </div>

            <h2 className="text-4xl md:text-6xl text-white mb-6 leading-tight">
              Sé Parte de la Comunidad
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                que Está Cambiando el Juego
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              +600 miembros ya están aprendiendo y construyendo con IA.
              Dinámicas semanales y encuentros los sábados. Si conoces a alguien
              que deba estar aquí, comparte esta página.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <WhatsAppLink
                message="Hola, quiero unirme a la comunidad de IA de Transformateck"
                className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 text-lg"
                component="LandingComunidad"
                section="CTA"
                buttonId="comunidad-cta-join"
              >
                💬 Quiero Unirme
              </WhatsAppLink>
              <Link
                href="/"
                className="px-10 py-5 border-2 border-cyan-400 text-cyan-400 rounded-xl hover:bg-cyan-400/10 transition-all duration-300 text-lg"
              >
                Ver Servicios
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10">
              <div className="text-center">
                <div className="text-4xl mb-3">👥</div>
                <div className="text-3xl text-cyan-400 mb-2">+600</div>
                <p className="text-gray-400">Miembros activos</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🔄</div>
                <div className="text-3xl text-purple-400 mb-2">Semanal</div>
                <p className="text-gray-400">Dinámicas y retos</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">📅</div>
                <div className="text-3xl text-cyan-400 mb-2">Sábados</div>
                <p className="text-gray-400">Encuentros en vivo</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
