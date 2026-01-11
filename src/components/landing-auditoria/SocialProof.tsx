import { motion } from "motion/react";
import { Star, Briefcase, ShoppingBag, Building2, Zap, Activity } from "lucide-react";

export const SocialProof = () => {
  const testimonials = [
    {
      text: "Llevábamos meses invirtiendo en Facebook Ads sin resultados. La auditoría nos mostró que nuestro botón de WhatsApp no funcionaba en móviles. Corregirlo triplicó nuestros contactos en 24 horas.",
      name: "Sofía Martínez",
      role: "Fundadora, Clínica Dental Sonrisas",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&w=150&q=80",
      stars: 5
    },
    {
      text: "Pensaba que mi landing era perfecta, pero nadie compraba. El reporte me abrió los ojos sobre la falta de prueba social y la redacción confusa. Ahora cerramos 4 de cada 10 visitas.",
      name: "Javier Torres",
      role: "Director de Marketing, E-commerce Nova",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&w=150&q=80",
      stars: 5
    },
    {
      text: "Increíble valor para ser gratuito. Me señalaron errores de carga que me estaban costando miles de dólares. Implementé los cambios y mi tasa de rebote bajó del 80% al 35%.",
      name: "Andrés López",
      role: "Consultor Inmobiliario Independiente",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&w=150&q=80",
      stars: 5
    }
  ];

  const brands = [
    { name: "Consultora Apex", icon: <Briefcase size={24} /> },
    { name: "Tienda Nova", icon: <ShoppingBag size={24} /> },
    { name: "Grupo H&M", icon: <Building2 size={24} /> },
    { name: "TechSolutions", icon: <Zap size={24} /> },
    { name: "SaludVital", icon: <Activity size={24} /> },
    // Duplicate for infinite scroll
    { name: "Consultora Apex", icon: <Briefcase size={24} /> },
    { name: "Tienda Nova", icon: <ShoppingBag size={24} /> },
    { name: "Grupo H&M", icon: <Building2 size={24} /> },
    { name: "TechSolutions", icon: <Zap size={24} /> },
    { name: "SaludVital", icon: <Activity size={24} /> }
  ];

  const portfolioImages = [
    "https://images.unsplash.com/photo-1735470569705-ace3b58456f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    "https://images.unsplash.com/photo-1638228233642-10afb6b6509f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    "https://images.unsplash.com/photo-1642132652806-8aa09801c2ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    "https://images.unsplash.com/photo-1736325263301-488931888151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    "https://images.unsplash.com/photo-1592323401640-9c24ed330baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
  ];

  return (
    <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-400 font-semibold tracking-wider uppercase text-sm mb-2 block">
            Casos de Éxito
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            Empresas que ya convirtieron su tráfico en ventas
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/30 transition-colors text-left flex flex-col h-full shadow-lg"
            >
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(item.stars)].map((_, idx) => (
                  <Star key={idx} size={18} fill="currentColor" />
                ))}
              </div>
              
              <div className="flex-grow">
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  &quot;{item.text}&quot;
                </p>
              </div>

              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-700/50">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-600"
                />
                <div>
                  <div className="font-bold text-white">{item.name}</div>
                  <div className="text-xs text-blue-300 font-medium uppercase tracking-wide">{item.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Portfolio Marquee */}
        <motion.div 
          className="mb-20 overflow-hidden relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-slate-900 to-transparent z-10"></div>
          
          <motion.div 
            className="flex gap-6 whitespace-nowrap"
            animate={{ x: [-1000, 0] }} // Opposite direction to brands
            transition={{ 
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {[...portfolioImages, ...portfolioImages, ...portfolioImages].map((src, idx) => (
              <div key={idx} className="w-64 h-40 flex-shrink-0 rounded-lg overflow-hidden border border-slate-700 hover:border-blue-400 transition-colors duration-300 group relative">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={src} 
                  alt="Landing Page Example" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="border-t border-slate-800 pt-12 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-slate-500 text-sm mb-8 uppercase tracking-widest font-medium">
            Confían en nosotros
          </p>
          
          <div className="relative flex overflow-hidden">
             {/* Gradient masks for smooth fade edges */}
            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-slate-900 to-transparent z-10"></div>
            
            <motion.div 
              className="flex gap-16 whitespace-nowrap"
              animate={{ x: [0, -1000] }}
              transition={{ 
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {[...brands, ...brands].map((brand, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xl font-bold text-slate-300 opacity-60 hover:opacity-100 transition-opacity">
                  {brand.icon}
                  <span>{brand.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
