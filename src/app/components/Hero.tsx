import logo from "figma:asset/2be1a65f1862ac84feff290a749b430bc10b7440.png";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24 px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <img 
            src={logo} 
            alt="Transformateck" 
            className="h-20 md:h-28 mx-auto mb-8 brightness-0 invert hidden md:block"
          />
          <h2 className="text-4xl md:hidden bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-8">
            Transformateck
          </h2>
        </div>
        
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-300 text-sm">
            🚀 Fábrica de Productos Digitales
          </div>
          
          <h1 className="text-5xl md:text-7xl mb-6 text-white leading-tight">
            Transformamos Ideas en
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Productos Digitales
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            De la concepción al lanzamiento. Creamos, diseñamos y desarrollamos 
            tu presencia digital con un equipo completo de profesionales.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a 
              href="#pricing" 
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Ver Planes
            </a>
            <a 
              href="https://wa.me/528118582060?text=Hola%20me%20interesa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20servicios" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400/10 transition-all duration-300"
            >
              Hablar con el Equipo
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
            <div className="text-4xl mb-3">⚡</div>
            <div className="text-3xl text-cyan-400 mb-2">48hrs</div>
            <p className="text-gray-400 text-sm">Entrega Express</p>
          </div>
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300">
            <div className="text-4xl mb-3">👥</div>
            <div className="text-3xl text-purple-400 mb-2">Equipo Pro</div>
            <p className="text-gray-400 text-sm">Profesionales certificados</p>
          </div>
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
            <div className="text-4xl mb-3">🎨</div>
            <div className="text-3xl text-cyan-400 mb-2">100%</div>
            <p className="text-gray-400 text-sm">Diseño Custom</p>
          </div>
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300">
            <div className="text-4xl mb-3">💎</div>
            <div className="text-3xl text-purple-400 mb-2">Premium</div>
            <p className="text-gray-400 text-sm">Calidad garantizada</p>
          </div>
        </div>
      </div>
    </section>
  );
}