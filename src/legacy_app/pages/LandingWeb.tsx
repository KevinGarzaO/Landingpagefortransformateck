"use client";
// import { Pricing } from "../components/Pricing";
// import { Upsells } from "../components/Upsells";

import { WhatsApp, ExpandMore, Link as LinkIcon, Business, AdsClick } from "@mui/icons-material";
import { trackContact } from "../../utils/metaPixel";
import { useState } from "react";

export function LandingWeb() {
  const whatsappBaseUrl = "https://wa.me/528118582060";

  const handleWhatsappClick = (message: string) => {
    trackContact();
    const link = `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
    window.open(link, "_blank");
  };

  const FAItem = ({ q, a }: { q: string; a: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div 
        className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="p-6 flex items-center justify-between">
          <h3 className="text-xl text-cyan-400 font-bold flex items-center gap-3">
             <span className="text-2xl">❓</span> {q}
          </h3>
          <ExpandMore className={`text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
          <p className="text-gray-300 text-lg leading-relaxed px-6 pb-6 pt-0 border-t border-white/5 mt-2">
            {a}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="pt-20 bg-black font-sans text-gray-100">
        {/* 1️⃣ HERO — Dolor + beneficio + CTA principal */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black">
          {/* Futuristic Grid */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
              linear-gradient(to right, rgba(56, 189, 248, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(56, 189, 248, 0.1) 1px, transparent 1px)
            `,
                backgroundSize: "60px 60px",
              }}
            ></div>
          </div>

          {/* Animated Orbs - Stronger Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>
            <div
              className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
            <div className="inline-block px-8 py-3 bg-red-500/10 border border-red-500/40 rounded-full backdrop-blur-md mb-10 shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-[bounce_2s_infinite]">
              <span className="text-red-400 text-sm md:text-base font-bold uppercase tracking-widest flex items-center gap-2 justify-center text-center">
                🚨 ¿Tu landing recibe visitas… pero no clientes?
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight font-extrabold tracking-tight">
              <span className="text-white drop-shadow-xl">Te hago una auditoría</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
                Gratuita de tu Landing
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Te digo <span className="text-white font-medium">exactamente</span> qué está fallando y cómo <span className="text-cyan-400 font-medium">convertir más visitantes en clientes</span>.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-14 text-gray-300 font-medium">
              <div className="flex items-center justify-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                <span className="text-cyan-400 text-xl">✔️</span>
                <span>Sin costo</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                <span className="text-cyan-400 text-xl">✔️</span>
                <span>Sin compromiso</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                <span className="text-cyan-400 text-xl">✔️</span>
                <span>Recomendaciones accionables</span>
              </div>
            </div>

            <button
              onClick={() => handleWhatsappClick("Quiero mi auditoría gratuita por WhatsApp")}
              className="group relative inline-flex items-center justify-center gap-3 px-8 md:px-10 py-5 md:py-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] transition-all duration-300 transform hover:-translate-y-1 font-black tracking-wide text-xl md:text-2xl border-2 border-green-400/50 overflow-hidden text-center w-full md:w-auto"
            >
              <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 -skew-x-12"></div>
              <WhatsApp className="text-3xl md:text-4xl shrink-0" />
              <span>Quiero mi auditoría gratuita por WhatsApp</span>
            </button>
          </div>
        </section>

        {/* 2️⃣ RAZONES PARA CONFIAR */}
        <section className="py-28 px-4 bg-black relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl mb-6 text-white font-bold tracking-tight">
                ¿Qué obtienes con esta{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  auditoría gratuita?
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {[
                {
                  icon: "🔍",
                  text: "Detectamos por qué tu landing no convierte",
                  gradient: "from-cyan-500 to-blue-600",
                },
                {
                  icon: "⚠️",
                  text: "Identificamos errores de copy, estructura y CTA",
                  gradient: "from-blue-600 to-purple-600",
                },
                {
                  icon: "🚀",
                  text: "Te decimos qué cambiar para generar más contactos",
                  gradient: "from-purple-600 to-pink-600",
                },
                {
                  icon: "💰",
                  text: "Ideas claras para vender más sin gastar más en anuncios",
                  gradient: "from-pink-600 to-red-600",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group relative p-8 md:p-10 bg-[#0f0f0f] rounded-3xl border border-white/5 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.15)] overflow-hidden flex items-stretch"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10 text-center md:text-left w-full">
                    <div className="text-5xl p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-inner shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex items-center">
                      <h3 className="text-xl md:text-2xl text-gray-100 font-semibold leading-snug">
                        {item.text}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <p className="text-2xl md:text-3xl text-cyan-400 font-bold mb-10 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)] px-4">
                No es teoría. Es diagnóstico real aplicado a tu negocio.
              </p>
              <button
                onClick={() => handleWhatsappClick("Solicitar auditoría gratuita ahora")}
                className="group inline-flex items-center justify-center gap-3 px-8 md:px-10 py-5 md:py-6 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white rounded-xl transition-all duration-300 font-bold text-xl md:text-2xl hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] w-full md:w-auto"
              >
                <WhatsApp className="text-3xl md:text-4xl shrink-0" />
                <span>Solicitar auditoría gratuita ahora</span>
              </button>
            </div>
          </div>
        </section>

        {/* 3️⃣ PRUEBA SOCIAL */}
        <section className="py-28 px-4 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#000000] relative">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl text-white mb-16 font-bold">
              Lo que normalmente encontramos en las landings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
               {[
                 "Mensajes poco claros",
                 "CTA débiles o mal ubicados",
                 "Landing lenta o confusa",
                 "WhatsApp mal integrado",
                 "Promesa que no conecta"
               ].map((mistake, i) => (
                 <div key={i} className="flex items-center gap-4 p-6 bg-red-950/20 border border-red-500/20 rounded-2xl text-red-200 hover:bg-red-950/30 transition-colors">
                   <span className="text-xl shrink-0">❌</span>
                   <span className="font-medium text-lg text-left">{mistake}</span>
                 </div>
               ))}
               <div className="flex items-center gap-4 p-6 bg-green-950/20 border border-green-500/30 rounded-2xl text-green-300 md:col-span-1 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                 <span className="text-xl shrink-0">✅</span>
                 <span className="font-bold text-lg">¡Tiene solución!</span>
               </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 p-10 rounded-3xl mb-16 backdrop-blur-sm shadow-2xl">
               <p className="text-2xl md:text-3xl text-gray-100 italic font-medium leading-relaxed">
                 "💡 La mayoría de las landings <span className="text-green-400">sí pueden convertir</span>, solo necesitan los ajustes correctos."
               </p>
            </div>

            <button
               onClick={() => handleWhatsappClick("Revisar mi landing gratis")}
               className="group inline-flex items-center justify-center gap-3 px-8 md:px-10 py-5 md:py-6 bg-white text-gray-900 hover:bg-gray-100 rounded-xl border-2 border-white/50 transition-all duration-300 font-bold text-xl md:text-2xl shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 w-full md:w-auto"
             >
               <WhatsApp className="text-3xl md:text-4xl text-[#25D366] shrink-0" />
               <span>Revisar mi landing gratis</span>
             </button>
          </div>
        </section>

        {/* 4️⃣ PLANES RESUMIDOS */}
        <section className="py-28 px-4 bg-black relative">
           {/* Background Mesh */}
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px]"></div>

          <div className="max-w-7xl mx-auto relative z-10">
             <div className="text-center mb-20">
               <h2 className="text-4xl md:text-6xl text-white font-bold mb-6">
                 Después de la auditoría, tú decides
               </h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
               <div className="p-8 bg-[#0a0a0a] rounded-3xl border border-cyan-500/30 relative hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                 <div className="absolute -top-5 left-8 bg-cyan-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-cyan-900/50">PASO 1</div>
                 <h3 className="text-3xl text-cyan-400 font-bold mb-4 mt-4">🧪 Auditoría</h3>
                 <p className="text-gray-400 text-lg">Te llevas el diagnóstico completo <span className="text-white font-medium">sin costo alguno</span>.</p>
               </div>

                <div className="p-8 bg-[#0a0a0a] rounded-3xl border border-purple-500/30 relative hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                 <div className="absolute -top-5 left-8 bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-purple-900/50">PASO 2</div>
                 <h3 className="text-3xl text-purple-400 font-bold mb-4 mt-4">⚡ Optimización</h3>
                 <p className="text-gray-400 text-lg">Ajustamos lo que no funciona en tu landing actual para <span className="text-white font-medium">vender más</span>.</p>
               </div>

                <div className="p-8 bg-[#0a0a0a] rounded-3xl border border-pink-500/30 relative hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                 <div className="absolute -top-5 left-8 bg-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-pink-900/50">PASO 3</div>
                 <h3 className="text-3xl text-pink-400 font-bold mb-4 mt-4">🚀 Landing Nueva</h3>
                 <p className="text-gray-400 text-lg">Lista en <span className="text-white font-medium">48–72 hrs</span> lista para tus campañas de anuncios.</p>
               </div>
             </div>

             <div className="text-center">
                <p className="text-gray-400 mb-10 text-lg">👉 La auditoría no te obliga a contratar nada.</p>
                <button
                  onClick={() => handleWhatsappClick("Quiero empezar con la auditoría gratis")}
                  className="group inline-flex items-center justify-center gap-3 px-8 md:px-12 py-5 md:py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:shadow-[0_0_40px_rgba(192,38,211,0.5)] transition-all duration-300 transform hover:scale-105 font-bold text-xl md:text-2xl border-2 border-purple-400/50 w-full md:w-auto text-center"
                >
                  <WhatsApp className="text-3xl md:text-4xl shrink-0" />
                  <span>Quiero empezar con la auditoría gratis</span>
                </button>
             </div>
          </div>
        </section>

        {/* 5️⃣ CTA FINAL CON URGENCIA */}
        <section className="py-28 px-4 bg-gradient-to-br from-slate-900 via-[#0c1f2e] to-slate-900 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-cyan-500 rounded-full blur-[150px] opacity-10 animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-[600px] h-[600px] bg-purple-500 rounded-full blur-[150px] opacity-10 animate-pulse"></div>
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
             <h2 className="text-5xl md:text-7xl text-white mb-10 font-bold tracking-tight">
               Agenda tu auditoría gratuita hoy
             </h2>
             
             <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 mb-16 max-w-3xl mx-auto shadow-2xl">
               <p className="text-2xl text-white mb-8 font-semibold">Solo necesito:</p>
               <div className="flex flex-col md:flex-row justify-center gap-8 text-left">
                 <div className="flex items-center gap-4 text-gray-300 text-lg">
                   <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold shrink-0">
                     <LinkIcon />
                   </div>
                   Tu link
                 </div>
                 <div className="flex items-center gap-4 text-gray-300 text-lg">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold shrink-0">
                      <Business />
                    </div>
                   Tu negocio
                 </div>
                 <div className="flex items-center gap-4 text-gray-300 text-lg">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold shrink-0">
                      <AdsClick />
                    </div>
                   Tu objetivo
                 </div>
               </div>
             </div>

             <div className="mb-12">
               <div className="inline-flex items-center gap-3 px-6 py-3 bg-yellow-500/10 border border-yellow-500/30 rounded-full animate-pulse">
                 <span className="text-yellow-400 text-xl">📅</span>
                 <p className="text-yellow-400 font-bold text-lg">
                   Cupos limitados por día.
                 </p>
               </div>
             </div>

             <button
               onClick={() => handleWhatsappClick("Quiero pedir mi auditoría gratis")}
               className="group inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 md:px-12 py-5 md:py-7 bg-gradient-to-r from-[#25D366] to-emerald-600 text-white rounded-2xl hover:shadow-[0_0_50px_rgba(37,211,102,0.5)] transition-all duration-300 transform hover:scale-105 font-black text-2xl md:text-3xl border-2 border-white/20 shadow-xl text-center"
             >
               <WhatsApp className="text-4xl md:text-5xl shrink-0" />
               <span>🔥 Pedir mi auditoría gratis</span>
             </button>
          </div>
        </section>

        {/* 6️⃣ FAQ BREVE */}
        <section className="py-24 px-4 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl text-white text-center mb-16 font-bold">
              Preguntas Frecuentes
            </h2>

            <div className="grid gap-4">
              {[
                { q: "¿De verdad es gratis?", a: "Sí, 100% gratis. La auditoría no tiene costo ni compromiso de compra." },
                { q: "¿Cuánto tarda?", a: "Te damos feedback claro y un video de diagnóstico en menos de 24 hrs." },
                { q: "¿Y si no tengo landing?", a: "También te decimos qué estructura deberías tener y por qué." },
                { q: "¿Me van a vender algo?", a: "Solo si tú quieres. Primero te damos valor real y tú decides si trabajamos juntos." }
              ].map((faq, i) => (
                <FAItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>

            <div className="mt-20 text-center">
              <button
                onClick={() => handleWhatsappClick("Solicitar auditoría gratuita por WhatsApp")}
                className="group inline-flex items-center justify-center gap-3 px-8 md:px-12 py-5 md:py-6 bg-white/5 text-white border-2 border-white/20 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/50 rounded-2xl transition-all duration-300 font-bold text-xl md:text-2xl shadow-lg w-full md:w-auto"
              >
                <WhatsApp className="text-3xl md:text-4xl shrink-0" />
                <span>Solicitar auditoría gratuita por WhatsApp</span>
              </button>
            </div>
          </div>
        </section>

        {/* Hidden Sections (Preserved but not visible) */}
        <div style={{ display: 'none' }}>
        {/*
          <Pricing />
          <Upsells />
        */}
        </div>
      </div>
    </>
  );
}
