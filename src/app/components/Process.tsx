export function Process() {
  const steps = [
    {
      number: "01",
      title: "Consultoría Inicial",
      description: "Analizamos tu idea, objetivos y necesidades específicas para definir la mejor estrategia.",
      icon: "💡"
    },
    {
      number: "02",
      title: "Diseño & Prototipo",
      description: "Nuestro equipo de diseño crea mockups profesionales adaptados a tu marca.",
      icon: "🎨"
    },
    {
      number: "03",
      title: "Desarrollo",
      description: "Transformamos el diseño en código con las mejores prácticas y tecnologías actuales.",
      icon: "⚙️"
    },
    {
      number: "04",
      title: "Testing & QA",
      description: "Revisamos cada detalle para garantizar calidad, velocidad y compatibilidad.",
      icon: "✅"
    },
    {
      number: "05",
      title: "Lanzamiento",
      description: "Ponemos tu producto en marcha con hosting optimizado y dominio configurado.",
      icon: "🚀"
    },
    {
      number: "06",
      title: "Soporte",
      description: "Te acompañamos después del launch con cambios incluidos y soporte técnico.",
      icon: "🤝"
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-40 left-20 w-64 h-64 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-300 text-sm">
            🔄 Nuestro Proceso
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            De la Idea al Lanzamiento
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Un proceso probado que garantiza resultados excepcionales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-sm shadow-lg">
                {step.number}
              </div>
              
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              
              <h3 className="text-2xl text-white mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
