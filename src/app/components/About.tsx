export function About() {
  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-30"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block mb-4 px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm">
              ✨ Quiénes Somos
            </div>
            <h2 className="text-4xl md:text-5xl mb-6 text-gray-900">
              Tu Fábrica de
              <span className="block bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                Productos Digitales
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              En <strong className="text-gray-900">Transformateck</strong>, no solo creamos sitios web. 
              Somos una fábrica completa de productos digitales que te acompaña desde la 
              primera idea hasta el lanzamiento exitoso.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Nuestro equipo de profesionales especializados trabaja en cada detalle: 
              diseño, desarrollo, SEO, hosting y más. Todo lo que necesitas bajo un mismo techo.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-cyan-50 to-purple-50 rounded-lg">
                <div className="text-3xl flex-shrink-0">🎯</div>
                <div>
                  <h3 className="text-lg text-gray-900 mb-1">Enfoque 360°</h3>
                  <p className="text-gray-600 text-sm">Desde la estrategia hasta la ejecución técnica</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-cyan-50 rounded-lg">
                <div className="text-3xl flex-shrink-0">⚙️</div>
                <div>
                  <h3 className="text-lg text-gray-900 mb-1">Equipo Completo</h3>
                  <p className="text-gray-600 text-sm">Diseñadores, developers, copywriters y más</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-cyan-50 to-purple-50 rounded-lg">
                <div className="text-3xl flex-shrink-0">🚀</div>
                <div>
                  <h3 className="text-lg text-gray-900 mb-1">Resultados Reales</h3>
                  <p className="text-gray-600 text-sm">Productos que generan impacto y conversiones</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 p-8 rounded-2xl text-white transform hover:scale-105 transition-all duration-300">
                  <div className="text-5xl mb-3">🎨</div>
                  <h3 className="text-xl mb-2">Diseño</h3>
                  <p className="text-cyan-100 text-sm">UI/UX profesional y moderno</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-2xl text-white transform hover:scale-105 transition-all duration-300">
                  <div className="text-5xl mb-3">💻</div>
                  <h3 className="text-xl mb-2">Desarrollo</h3>
                  <p className="text-purple-100 text-sm">Código limpio y escalable</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-2xl text-white transform hover:scale-105 transition-all duration-300">
                  <div className="text-5xl mb-3">🚀</div>
                  <h3 className="text-xl mb-2">Lanzamiento</h3>
                  <p className="text-blue-100 text-sm">Deploy y puesta en marcha</p>
                </div>
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-8 rounded-2xl text-white transform hover:scale-105 transition-all duration-300">
                  <div className="text-5xl mb-3">📈</div>
                  <h3 className="text-xl mb-2">Crecimiento</h3>
                  <p className="text-pink-100 text-sm">Optimización continua</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
