export function Upsells() {
  const upsells = [
    {
      icon: "📝",
      title: "Formulario de Contacto",
      price: "$500",
      period: "MXN",
      description: "Captura leads directamente desde tu landing. Integración con email y CRM.",
      features: ["Diseño personalizado", "Validación de campos", "Notificaciones email"]
    },
    {
      icon: "🌐",
      title: "Hosting Renovación",
      price: "$1,200",
      period: "MXN/año",
      description: "Mantén tu sitio online con servidores optimizados un año más.",
      features: ["99.9% uptime", "SSL incluido", "Backups automáticos"]
    },
    {
      icon: "📄",
      title: "Página Adicional",
      price: "$1,990",
      period: "MXN",
      description: "Expande tu sitio con páginas extras: servicios, about, blog, etc.",
      features: ["Hasta 5 secciones", "Diseño coherente", "Totalmente responsive"]
    },
    {
      icon: "🔄",
      title: "Cambios Extra",
      price: "$300",
      period: "MXN/ronda",
      description: "Rondas adicionales de ajustes después de la entrega oficial.",
      features: ["Cambios ilimitados por ronda", "48hrs de respuesta", "Soporte dedicado"]
    },
    {
      icon: "➕",
      title: "Sección Extra",
      price: "$300",
      period: "MXN",
      description: "Añade una sección adicional a tu landing con diseño personalizado.",
      features: ["Diseño personalizado", "100% responsive", "Integración perfecta"]
    },
    {
      icon: "📧",
      title: "Correos Corporativos",
      price: "$100",
      period: "MXN/mes/usuario",
      description: "Gestión de correos electrónicos corporativos con tu dominio .com.",
      features: ["Plan básico: $100/mes/usuario", "Plan standard: $200/mes/usuario", "Requiere dominio propio"]
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-black via-slate-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-purple-500/50 rounded-full text-purple-400 text-sm">
            🎁 EXTRAS & ADD-ONS
          </div>
          <h2 className="text-4xl md:text-6xl mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Potencia Tu Producto
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Servicios complementarios para llevar tu landing al siguiente nivel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upsells.map((upsell, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl border-2 border-white/10 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 bg-white/5 backdrop-blur-sm transform hover:scale-105 group"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">{upsell.icon}</div>
              <h3 className="text-xl mb-2 text-white">{upsell.title}</h3>
              <div className="mb-1">
                <span className="text-3xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {upsell.price}
                </span>
              </div>
              <div className="text-sm text-gray-400 mb-4">{upsell.period} + IVA</div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">{upsell.description}</p>
              <ul className="space-y-2">
                {upsell.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-cyan-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://wa.me/528118582060?text=Hola%20me%20interesa%20el%20servicio%20de%20la%20landing%20web"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
          >
            💬 Consultar Servicios Adicionales
          </a>
        </div>
      </div>
    </section>
  );
}