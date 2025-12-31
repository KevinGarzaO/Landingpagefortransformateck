export function Benefits() {
  const benefits = [
    {
      icon: "👥",
      title: "Equipo Multidisciplinario",
      description: "Accede a diseñadores, developers, copywriters y especialistas en marketing digital."
    },
    {
      icon: "⚡",
      title: "Entrega Rápida",
      description: "Procesos optimizados que nos permiten lanzar tu proyecto en tiempo récord."
    },
    {
      icon: "🎯",
      title: "Enfoque en Resultados",
      description: "No solo entregamos código bonito, creamos productos que convierten y venden."
    },
    {
      icon: "🔒",
      title: "Todo Incluido",
      description: "Hosting, dominio, SEO, responsive design. Una solución completa sin sorpresas."
    },
    {
      icon: "💎",
      title: "Calidad Premium",
      description: "Código limpio, diseño moderno y las mejores prácticas del mercado."
    },
    {
      icon: "🤝",
      title: "Acompañamiento Total",
      description: "Desde el brief inicial hasta el post-lanzamiento, estamos contigo en cada paso."
    }
  ];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm">
            💪 Ventajas Transformateck
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">
            <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Más que una Agencia,
            </span>
            <span className="block text-gray-900">Tu Equipo de Producto</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trabajamos como una extensión de tu negocio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl bg-gradient-to-br from-white to-purple-50 border-2 border-gray-100 hover:border-purple-300 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
              <h3 className="text-xl mb-3 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}