export function Pricing() {
  const plans = [
    {
      name: "Landing Start",
      price: "$999.99",
      period: "MXN",
      popular: false,
      badge: "Para Emprendedores",
      description: "Perfecto para validar tu idea rápidamente",
      features: [
        { text: "1 página profesional", included: true },
        { text: "Hasta 5 secciones estratégicas", included: true },
        { text: "Diseño base personalizado", included: true },
        { text: "Tu branding aplicado (logo + colores)", included: true },
        { text: "Adaptación básica a tu marca", included: true },
        { text: "100% Responsive", included: true },
        { text: "Traes tu copy", included: true },
        { text: "SEO básico configurado", included: true },
        { text: "Botón WhatsApp integrado", included: true },
        { text: "1 ronda de cambios incluida", included: true },
        { text: "⚡ Entrega: 48-72 hrs", included: true, highlight: true },
        { text: "Dominio .com", included: false },
        { text: "Hosting incluido", included: false }
      ]
    },
    {
      name: "Landing Growth",
      price: "$2,999",
      period: "MXN",
      popular: true,
      badge: "Más Elegido",
      description: "La opción ideal para negocios en crecimiento",
      features: [
        { text: "2 páginas profesionales", included: true },
        { text: "Hasta 5 secciones por página", included: true },
        { text: "Diseño profesional customizado", included: true },
        { text: "Branding completo integrado", included: true },
        { text: "Adaptación media a tu marca", included: true },
        { text: "100% Responsive + Testing", included: true },
        { text: "Traes tu copy", included: true },
        { text: "SEO básico optimizado", included: true },
        { text: "✅ Dominio .com incluido ($300)", included: true, highlight: true },
        { text: "✅ Hosting centralizado 1 año", included: true, highlight: true },
        { text: "Botón WhatsApp integrado", included: true },
        { text: "2 rondas de cambios incluidas", included: true },
        { text: "⚡ Entrega: 4-6 días", included: true, highlight: true }
      ]
    },
    {
      name: "Landing Brand",
      price: "$3,999",
      period: "MXN",
      popular: false,
      badge: "Premium",
      description: "Presencia digital completa y profesional",
      features: [
        { text: "3 páginas profesionales", included: true },
        { text: "Hasta 5 secciones por página", included: true },
        { text: "Diseño premium a medida", included: true },
        { text: "Branding 100% personalizado", included: true },
        { text: "✨ Adaptación completa a tu marca", included: true, highlight: true },
        { text: "100% Responsive + QA completo", included: true },
        { text: "Traes tu copy", included: true },
        { text: "SEO básico + metadata optimizada", included: true },
        { text: "✅ Dominio .com incluido ($300)", included: true, highlight: true },
        { text: "✅ Hosting premium 1 año", included: true, highlight: true },
        { text: "Botón WhatsApp integrado", included: true },
        { text: "✨ 3 rondas de cambios incluidas", included: true, highlight: true },
        { text: "⚡ Entrega: 6-8 días", included: true, highlight: true }
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 px-4 bg-black relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 rounded-full text-cyan-400 text-sm">
            💰 PLANES & PRECIOS
          </div>
          <h2 className="text-4xl md:text-6xl mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Invierte en Tu Futuro Digital
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Planes transparentes sin costos ocultos. Elige el que mejor se adapte a tu etapa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600 text-white shadow-2xl shadow-cyan-500/50 transform scale-105 border-4 border-yellow-400' 
                  : 'bg-white/5 backdrop-blur-sm border-2 border-white/10 hover:border-cyan-500/50 hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-6 py-2 rounded-full text-sm shadow-lg animate-pulse">
                  ⭐ {plan.badge}
                </div>
              )}
              
              {!plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 border border-purple-500/50 text-purple-300 px-4 py-1 rounded-full text-xs backdrop-blur-sm">
                  {plan.badge}
                </div>
              )}
              
              <div className="text-center mb-6 mt-4">
                <h3 className="text-3xl mb-2 text-white">
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.popular ? 'text-cyan-100' : 'text-gray-400'}`}>
                  {plan.description}
                </p>
                <div className="mb-1">
                  <span className={`text-5xl md:text-6xl ${plan.popular ? 'text-white' : 'bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'}`}>{plan.price}</span>
                </div>
                <div className={`text-sm ${plan.popular ? 'text-cyan-200' : 'text-gray-400'}`}>
                  {plan.period} + IVA • Pago único
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <span className={`text-xl flex-shrink-0 ${
                      feature.included 
                        ? (plan.popular ? 'text-yellow-300' : 'text-cyan-400')
                        : (plan.popular ? 'text-cyan-300/50' : 'text-gray-600')
                    }`}>
                      {feature.included ? '✓' : '✗'}
                    </span>
                    <span className={`text-sm ${
                      plan.popular 
                        ? (feature.highlight ? 'text-yellow-300' : 'text-white')
                        : (feature.highlight ? 'text-cyan-300' : 'text-gray-300')
                    }`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/528118582060?text=Hola%20me%20interesa%20el%20servicio%20de%20la%20landing%20web"
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-white text-purple-700 hover:bg-gray-100 shadow-xl'
                    : 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:shadow-xl hover:shadow-cyan-500/50'
                }`}
              >
                🚀 Contratar Ahora
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 border-2 border-purple-500/30 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <h3 className="text-xl text-white mb-2">Sobre el Hosting Centralizado</h3>
              <p className="text-gray-300 leading-relaxed">
                Tu web estará alojada en nuestros servidores optimizados, sin preocupaciones técnicas ni configuraciones complicadas. 
                Incluye <strong className="text-cyan-400">1 año completo</strong>. La renovación anual se cotiza aparte. 
                Si en el futuro deseas migrar, es totalmente posible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}