"use client";
// Update logo path to public asset
const logo = "/assets/logo.png";
import { WhatsAppLink } from "../../components/WhatsAppLink";

export function CTA() {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <img
          src={logo}
          alt="Transformateck"
          className="h-16 md:h-24 mx-auto mb-8 brightness-0 invert"
        />

        <div className="inline-block mb-6 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-300 text-sm">
          🚀 Lanza Tu Proyecto Hoy
        </div>

        <h2 className="text-4xl md:text-6xl text-white mb-6 leading-tight">
          Convierte Tu Idea en Realidad
          <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Con un Equipo Profesional
          </span>
        </h2>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Únete a cientos de emprendedores y negocios que ya transformaron su
          presencia digital con Transformateck. No es solo un sitio web, es tu
          fábrica de crecimiento.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <WhatsAppLink
            message="Hola me interesa más información sobre los servicios"
            className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 text-lg"
            component="CTA"
            section="Main"
            buttonId="cta-section-talk-team"
          >
            💬 Hablar con el Equipo
          </WhatsAppLink>
          <a
            href="#pricing"
            className="px-10 py-5 border-2 border-cyan-400 text-cyan-400 rounded-xl hover:bg-cyan-400/10 transition-all duration-300 text-lg"
          >
            Ver Planes y Precios
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <div className="text-3xl text-cyan-400 mb-2">48-72hrs</div>
            <p className="text-gray-400">Tu landing lista en tiempo récord</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">👥</div>
            <div className="text-3xl text-purple-400 mb-2">Equipo Pro</div>
            <p className="text-gray-400">
              Diseñadores y developers certificados
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">💎</div>
            <div className="text-3xl text-cyan-400 mb-2">100% Premium</div>
            <p className="text-gray-400">Calidad profesional garantizada</p>
          </div>
        </div>
      </div>
    </section>
  );
}
