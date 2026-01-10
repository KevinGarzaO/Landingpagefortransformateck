"use client";

import { WhatsAppLink } from "../../../../components/WhatsAppLink";

export function BlogCTA() {

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden border-t border-white/10">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl text-white mb-6">
          ¿Tienes un Proyecto en Mente?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Hablemos sobre cómo podemos ayudarte a hacerlo realidad
        </p>
        <WhatsAppLink
          message="Hola me interesa más información sobre los servicios"
          className="inline-block px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
        >
          💬 Contactar Ahora
        </WhatsAppLink>
      </div>
    </section>
  );
}
