import { X, Check, X as XIcon, Sparkles, Monitor, Briefcase, PenTool, Search, Zap, Star, TrendingUp, Crown, ArrowRight, Lightbulb, FileEdit, LayoutList, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface CheckoutData {
  planName: string;
  price: string;
  features: string[];
  period?: 'once' | 'monthly' | 'weekly';
}

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToCheckout: (data: CheckoutData) => void;
}

export function PricingModal({ isOpen, onClose, onGoToCheckout }: PricingModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10002] flex items-center justify-center p-0 md:p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            // onClick={onClose} removed to prevent closing on backdrop click
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 0 }}
            className="relative w-full h-full md:h-[90vh] max-w-5xl bg-[#1A1A1A] md:rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-[#333]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-4 md:p-6 border-b border-[#333] bg-[#1A1A1A] z-10 sticky top-0">
               <div>
                  <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 flex items-center gap-2">
                    <Sparkles className="text-yellow-500 fill-yellow-500/20" />
                    Planes y Precios
                  </h2>
                  <p className="text-sm text-[#8E8EA0] hidden md:block">
                    <span className="text-[#D4D4D8] font-medium">Free:</span> detecta oportunidades. <span className="text-[#D4D4D8] font-medium ml-2">Full:</span> escala tu negocio.
                  </p>
               </div>
               <button 
                 onClick={onClose}
                 className="p-2 -mr-2 text-[#8E8EA0] hover:text-white hover:bg-[#333] rounded-full transition-colors"
               >
                 <X size={24} />
               </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent pb-24">
               
               {/* Main Offer - Full Plan */}
               <div className="bg-gradient-to-br from-purple-900/30 via-[#2A2A2A] to-[#2A2A2A] border border-purple-500/30 rounded-2xl p-6 md:p-8 relative overflow-hidden flex-shrink-0">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap size={120} className="text-purple-500" />
                  </div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
                    <div className="space-y-4 max-w-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider border border-purple-500/30">
                        Business AI Suite
                      </div>
                      <h3 className="text-3xl font-bold text-white">Plan Full Total</h3>
                      <p className="text-lg text-[#D4D4D8]">
                        Compite con agencias de contenido, no con otras IAs. Todo incluido.
                      </p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 text-sm text-[#A1A1AA]">
                        <li className="flex items-center gap-2"><Check size={16} className="text-green-400" /> Analizador Web ilimitado</li>
                        <li className="flex items-center gap-2"><Check size={16} className="text-green-400" /> Consultor de negocio sin límites</li>
                        <li className="flex items-center gap-2"><Check size={16} className="text-green-400 font-bold" /> Creador de Contenido: 30 posts / mes</li>
                        <li className="flex items-center gap-2"><Check size={16} className="text-green-400" /> Analizador SEO de Blog</li>
                        <li className="flex items-center gap-2"><Check size={16} className="text-green-400" /> Memoria del negocio</li>
                        <li className="flex items-center gap-2"><Check size={16} className="text-green-400" /> Historial y proyectos múltiples</li>
                      </ul>
                    </div>
                    
                    <div className="flex flex-col items-center gap-4 bg-[#111]/50 p-6 rounded-xl border border-purple-500/30 w-full md:w-auto min-w-[260px]">
                      <div className="text-center">
                        <div className="relative inline-block group mb-1">
                            <div className="text-sm text-[#8E8EA0] flex items-center justify-center gap-1.5 cursor-help transition-colors hover:text-[#D4D4D8]">
                               <span>Valor en mercado:</span>
                               <span className="line-through decoration-red-500/50 decoration-1 text-[#A1A1AA]">$148/mes</span>
                               <Info size={13} className="text-[#8E8EA0]" />
                            </div>

                            {/* Tooltip Desglose */}
                            <div className="absolute left-1/2 -translate-x-1/2 w-max bg-[#1A1A1A] border border-[#444] rounded-xl shadow-2xl p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] text-left pointer-events-none ring-1 ring-black/50 bottom-full mb-2 md:bottom-auto md:top-full md:mt-2 md:mb-0">
                               <div className="text-sm font-semibold text-white mb-3 text-center border-b border-[#333] pb-2 whitespace-nowrap">
                                 Costo estimado de herramientas similares:
                               </div>
                               <div className="space-y-2.5 text-xs">
                                 <div className="flex justify-between items-center text-[#A1A1AA]">
                                   <span className="flex items-center gap-2"><PenTool size={12}/> Redacción IA (ej. Jasper)</span>
                                   <span className="text-white font-mono">~$49</span>
                                 </div>
                                 <div className="flex justify-between items-center text-[#A1A1AA]">
                                   <span className="flex items-center gap-2"><Monitor size={12}/> Auditoría Web (ej. Ahrefs)</span>
                                   <span className="text-white font-mono">~$49</span>
                                 </div>
                                 <div className="flex justify-between items-center text-[#A1A1AA]">
                                   <span className="flex items-center gap-2"><Briefcase size={12}/> Consultor IA (ej. GPT Team)</span>
                                   <span className="text-white font-mono">~$25</span>
                                 </div>
                                 <div className="flex justify-between items-center text-[#A1A1AA]">
                                   <span className="flex items-center gap-2"><Search size={12}/> SEO Optimizador (ej. Surfer)</span>
                                   <span className="text-white font-mono">~$25</span>
                                 </div>
                                 <div className="border-t border-[#333] pt-2 mt-2 flex justify-between font-bold">
                                   <span className="text-emerald-400 text-sm">Total Mercado</span>
                                   <span className="text-emerald-400 text-base">$148 USD</span>
                                 </div>
                               </div>
                               {/* Flechita del tooltip */}
                               <div className="absolute left-1/2 -translate-x-1/2 border-8 border-transparent top-full border-t-[#444] border-b-transparent md:top-auto md:bottom-full md:border-b-[#444] md:border-t-transparent"></div>
                            </div>
                        </div>

                        <div className="text-4xl font-bold text-white">$29 USD <span className="text-lg font-normal text-[#8E8EA0]">/ mes</span></div>
                      </div>
                      <button 
                        onClick={() => onGoToCheckout({
                          planName: "Business AI Suite",
                          price: "$29.00",
                          period: 'monthly',
                          features: [
                            'Acceso total a todos los agentes',
                            'Análisis ilimitados',
                            'Consultor de negocio IA 24/7',
                            '30 posts de blog mensuales',
                            'Auditoría SEO avanzada',
                            'Historial y memoria de negocio'
                          ]
                        })}
                        className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 group"
                      >
                        Obtener Suite Completa
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
               </div>

               {/* Stacked Agents Layout */}
               <div className="flex flex-col gap-8">
                 
                 {/* Agent 1 */}
                 <PricingCard 
                   icon={Monitor}
                   color="blue"
                   title="Analizador Web / Landing"
                   description="Diagnóstico técnico y optimización de conversión."
                   individualPrices={["$1 USD por análisis"]}
                   ctaText="Analizar mi Web"
                   onAction={() => onGoToCheckout({
                     planName: "Analizador Web Full",
                     price: "$1.00",
                     period: 'once',
                     features: [
                       'Diagnóstico técnico profundo',
                       'Score de performance y SEO',
                       'Detección de errores de tracking',
                       'Recomendaciones de conversión',
                       'Comparativo antes/después'
                     ]
                   })}
                   features={[
                     { name: 'Análisis por día', free: '1', full: 'Ilimitados' },
                     { name: 'Score general', free: true, full: true },
                     { name: 'Performance, SEO, UX', free: 'Básico', full: 'Avanzado' },
                     { name: 'Tracking & data loss', free: 'Detecta', full: 'Explica + corrige' },
                     { name: 'Insights accionables', free: '3', full: 'Ilimitados' },
                     { name: 'Urgencia / conversión', free: 'Indicada', full: 'Estrategia completa' },
                     { name: 'Historial', free: false, full: true },
                     { name: 'Comparativo antes/después', free: false, full: true },
                     { name: 'Uso en múltiples landings', free: false, full: true },
                   ]}
                 />

                 {/* Agent 2 */}
                 <PricingCard 
                   icon={Briefcase}
                   color="amber"
                   title="Consultor de Negocio"
                   description="Tu core estratégico. Chat IA con memoria de negocio."
                   individualPrices={[
                     "$1 USD por día",
                     "$5 USD por semana",
                     "$15 USD por mes"
                   ]}
                   ctaText="Contratar Consultor"
                   onAction={() => onGoToCheckout({
                     planName: "Consultor de Negocio",
                     price: "$5.00",
                     period: 'weekly',
                     features: [
                       'Chat estratégico ilimitado',
                       'Memoria de contexto del negocio',
                       'Seguimiento de decisiones',
                       'Análisis de competidores',
                       'Plan de acción paso a paso'
                     ]
                   })}
                   features={[
                     { name: 'Acceso al chat', free: true, full: true },
                     { name: 'Preguntas por día', free: '4', full: 'Ilimitadas' },
                     { name: 'Profundidad estratégica', free: 'Media', full: 'Alta' },
                     { name: 'Memoria del negocio', free: false, full: true },
                     { name: 'Contexto web y análisis', free: false, full: true },
                     { name: 'Seguimiento de decisiones', free: false, full: true },
                     { name: 'Recomendaciones accionables', free: 'Parcial', full: 'Completas' },
                   ]}
                 />

                  {/* Agent 4 */}
                  <PricingCard 
                   icon={Search}
                   color="pink" 
                   title="Analizador SEO Blog"
                   description="Auditoría semántica y optimización de ranking."
                   individualPrices={[
                     "$1 USD por análisis",
                     "o incluido en Plan Full"
                   ]}
                   ctaText="Auditar mi Blog"
                   onAction={() => onGoToCheckout({
                     planName: "Auditoría SEO Blog",
                     price: "$1.00",
                     period: 'once',
                     features: [
                       'Análisis semántico profundo',
                       'Detección de canibalización',
                       'Optimización de intención de búsqueda',
                       'Estructura de enlazado interno',
                       'Recomendaciones de contenido faltante'
                     ]
                   })}
                   features={[
                     { name: 'Score SEO', free: true, full: true },
                     { name: 'Errores críticos', free: true, full: true },
                     { name: 'Recomendaciones', free: '3', full: 'Ilimitadas' },
                     { name: 'Keyword intent', free: false, full: true },
                     { name: 'Optimización semántica', free: false, full: true },
                   ]}
                 />

                 {/* Agent 3 (Content Creator) - Moved to bottom */}
                 <ContentPricingCard onAction={onGoToCheckout} />
               </div>
               
               <div className="text-center text-sm text-[#525252] pb-8">
                 Todos los precios están expresados en USD (Dólares Americanos).
               </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Special Card for Agent 3
function ContentPricingCard({ onAction }: { onAction: (data: CheckoutData) => void }) {
  return (
    <div className="bg-[#212121] border border-[#333] rounded-xl overflow-hidden flex flex-col">
      <div className="p-5 border-b border-[#333] bg-[#262626] flex-shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
            <PenTool size={20} />
          </div>
          <h3 className="font-bold text-lg text-[#ECECF1]">Creador / Redactor Blog</h3>
        </div>
        <p className="text-sm text-[#A1A1AA]">
          Plan por volumen. El Free te hace pensar, el Full te hace el trabajo.
        </p>
      </div>

      <div className="p-5 space-y-8 flex-1 bg-[#212121] flex flex-col">
        
        {/* Free Section */}
        <div className="bg-[#1A1A1A] border border-[#333] rounded-xl p-5 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-3">
               <span className="text-xs font-bold uppercase tracking-wider bg-[#333] text-[#ECECF1] px-2.5 py-1 rounded-md border border-[#424242]">Plan Free</span>
               <h4 className="font-semibold text-emerald-400">Descubrimiento</h4>
             </div>
             <div className="text-xs text-[#8E8EA0] italic hidden sm:block">"La IA te ayuda a estructurar, tú escribes"</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* What you get */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-[#8E8EA0] uppercase tracking-wider mb-2">Incluido Gratis</div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-emerald-500/10 rounded text-emerald-400 mt-0.5">
                  <Lightbulb size={14} />
                </div>
                <div>
                  <div className="text-sm font-medium text-[#ECECF1]">5 Ideas de Blog / día</div>
                  <div className="text-xs text-[#8E8EA0]">Lluvia de ideas basada en tendencias</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                 <div className="p-1.5 bg-emerald-500/10 rounded text-emerald-400 mt-0.5">
                  <LayoutList size={14} />
                </div>
                <div>
                  <div className="text-sm font-medium text-[#ECECF1]">1 Estructura (Outline) / día</div>
                  <div className="text-xs text-[#8E8EA0]">Esqueleto lógico del artículo</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                 <div className="p-1.5 bg-emerald-500/10 rounded text-emerald-400 mt-0.5">
                  <Search size={14} />
                </div>
                <div>
                  <div className="text-sm font-medium text-[#ECECF1]">Enfoque SEO Básico</div>
                  <div className="text-xs text-[#8E8EA0]">Keywords principales sugeridas</div>
                </div>
              </div>
            </div>

            {/* What you don't get */}
            <div className="space-y-3 opacity-60">
               <div className="text-xs font-semibold text-[#8E8EA0] uppercase tracking-wider mb-2">Limitaciones</div>
               <div className="flex items-center gap-2 text-sm text-[#8E8EA0]">
                 <XIcon size={14} className="text-red-500" />
                 <span>Generación de texto completo</span>
               </div>
               <div className="flex items-center gap-2 text-sm text-[#8E8EA0]">
                 <XIcon size={14} className="text-red-500" />
                 <span>Adaptación a tono de marca</span>
               </div>
               <div className="flex items-center gap-2 text-sm text-[#8E8EA0]">
                 <XIcon size={14} className="text-red-500" />
                 <span>Llamadas a la acción (CTA)</span>
               </div>
            </div>
          </div>
        </div>

        {/* Paid Plans Grid */}
        <div className="space-y-5 flex-1 flex flex-col">
          <div className="flex items-center gap-4">
             <div className="flex-grow border-t border-[#333]"></div>
             <h4 className="font-semibold text-white text-center text-sm uppercase tracking-wider text-[#8E8EA0]">Planes de Redacción Automática</h4>
             <div className="flex-grow border-t border-[#333]"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
             {/* Starter */}
             <div className="bg-[#1e293b]/40 border border-[#334155] rounded-xl p-5 flex flex-col items-center text-center hover:border-emerald-500/30 transition-colors h-full group">
                <div className="p-3 bg-[#334155] rounded-full mb-4 group-hover:bg-[#475569] transition-colors">
                  <Star size={20} className="text-emerald-200" />
                </div>
                <div className="text-emerald-400 font-bold text-2xl mb-1">$5 USD</div>
                <div className="text-xs text-[#94a3b8] mb-6 font-medium">/ mes</div>
                
                <div className="w-full space-y-3 mb-6">
                  <div className="font-bold text-white text-base border-b border-[#334155] pb-3">Starter Content</div>
                  <div className="text-sm text-[#ECECF1]">4 posts / mes</div>
                  <div className="text-xs text-[#94a3b8]">800-1k palabras</div>
                  <div className="text-xs text-[#94a3b8]">SEO Básico</div>
                </div>

                <button 
                  onClick={() => onAction({
                    planName: "Starter Content",
                    price: "$5.00",
                    period: 'monthly',
                    features: [
                      '4 posts de blog mensuales',
                      '800-1000 palabras por post',
                      'Optimización SEO básica',
                      'Generación de títulos y meta',
                      'Exportación a HTML/Markdown'
                    ]
                  })}
                  className="w-full py-2.5 bg-[#334155] hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-all mt-auto uppercase tracking-wide"
                >
                  Crear 4 Posts
                </button>
             </div>

             {/* Growth */}
             <div className="bg-[#1e293b]/60 border border-emerald-500/30 rounded-xl p-5 flex flex-col items-center text-center relative shadow-xl shadow-emerald-900/10 h-full scale-[1.02] border-t-4 border-t-emerald-500">
                <div className="absolute -top-3 bg-emerald-600 text-white text-[10px] px-3 py-1 rounded-full font-bold shadow-md">MÁS ELEGIDO</div>
                <div className="p-3 bg-[#334155] rounded-full mb-4 mt-2">
                  <TrendingUp size={20} className="text-emerald-400" />
                </div>
                <div className="text-emerald-400 font-bold text-2xl mb-1">$10 USD</div>
                <div className="text-xs text-[#94a3b8] mb-6 font-medium">/ mes</div>
                
                <div className="w-full space-y-3 mb-6">
                  <div className="font-bold text-white text-base border-b border-[#334155] pb-3">Growth Content</div>
                  <div className="text-sm font-bold text-emerald-200">12 posts / mes</div>
                  <div className="text-xs text-[#94a3b8]">1k-1.5k palabras</div>
                  <div className="text-xs text-[#94a3b8]">SEO Avanzado + CTA</div>
                </div>

                <button 
                  onClick={() => onAction({
                    planName: "Growth Content",
                    price: "$10.00",
                    period: 'monthly',
                    features: [
                      '12 posts de blog mensuales',
                      '1000-1500 palabras por post',
                      'SEO Avanzado + Keywords LSI',
                      'Generación de CTAs de conversión',
                      'Adaptación de tono de voz'
                    ]
                  })}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-emerald-900/20 mt-auto uppercase tracking-wide transform hover:-translate-y-0.5"
                >
                  Escalar (12 Posts)
                </button>
             </div>

             {/* Authority */}
             <div className="bg-[#1e293b]/40 border border-[#334155] rounded-xl p-5 flex flex-col items-center text-center hover:border-purple-500/30 transition-colors h-full group">
                <div className="p-3 bg-[#334155] rounded-full mb-4 group-hover:bg-[#475569] transition-colors">
                  <Crown size={20} className="text-purple-400" />
                </div>
                <div className="text-purple-400 font-bold text-2xl mb-1">$15 USD</div>
                <div className="text-xs text-[#94a3b8] mb-6 font-medium">/ mes</div>
                
                <div className="w-full space-y-3 mb-6">
                  <div className="font-bold text-white text-base border-b border-[#334155] pb-3">Authority</div>
                  <div className="text-sm font-semibold text-white">30 posts / mes</div>
                  <div className="text-xs text-[#94a3b8]">1.5k+ palabras</div>
                  <div className="text-xs text-[#94a3b8]">SEO Semántico + Clusters</div>
                </div>

                <button 
                  onClick={() => onAction({
                    planName: "Authority Content",
                    price: "$15.00",
                    period: 'monthly',
                    features: [
                      '30 posts de blog mensuales',
                      '1500+ palabras (Long form)',
                      'SEO Semántico y Topic Clusters',
                      'Estrategia de contenido completa',
                      'Soporte prioritario'
                    ]
                  })}
                  className="w-full py-2.5 bg-[#334155] hover:bg-purple-600 text-white text-xs font-bold rounded-lg transition-all mt-auto uppercase tracking-wide"
                >
                  Dominar (30 Posts)
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureRow({ label, value, check }: any) {
  return (
    <div className="flex items-center justify-between text-xs py-1">
      <span className="text-[#A1A1AA]">{label}</span>
      <span className={`font-medium ${check ? 'text-[#ECECF1]' : 'text-[#8E8EA0]'}`}>
        {value === false ? <XIcon size={14} className="text-red-500/50" /> : value}
      </span>
    </div>
  );
}

// Helper component for Standard Pricing Cards
function PricingCard({ icon: Icon, color, title, description, features, individualPrices, ctaText, onAction }: any) {
  
  const getColorClasses = (c: string) => {
    const map: any = {
      blue: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      amber: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      pink: 'text-pink-400 bg-pink-500/10 border-pink-500/30',
    };
    return map[c] || map.blue;
  };

  const getButtonColor = (c: string) => {
      const map: any = {
        blue: 'bg-blue-600 hover:bg-blue-700 shadow-blue-900/20',
        amber: 'bg-amber-600 hover:bg-amber-700 shadow-amber-900/20',
        emerald: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-900/20',
        pink: 'bg-pink-600 hover:bg-pink-700 shadow-pink-900/20',
      };
      return map[c] || map.blue;
  };

  const colors = getColorClasses(color);
  const buttonColors = getButtonColor(color);

  return (
    <div className="bg-[#212121] border border-[#333] rounded-xl overflow-hidden flex flex-col">
       <div className="p-5 border-b border-[#333] bg-[#262626] flex-shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${colors}`}>
              <Icon size={20} />
            </div>
            <h3 className="font-bold text-lg text-[#ECECF1]">{title}</h3>
          </div>
          <p className="text-sm text-[#A1A1AA]">{description}</p>
       </div>
       
       <div className="flex-1 p-0 overflow-auto">
         <table className="w-full text-left border-collapse">
           <thead>
             <tr className="border-b border-[#333]">
               <th className="py-3 px-5 text-xs font-semibold text-[#525252] uppercase tracking-wider w-1/2">Característica</th>
               <th className="py-3 px-2 text-xs font-semibold text-[#8E8EA0] uppercase tracking-wider w-1/4 text-center">Free</th>
               <th className="py-3 px-2 text-xs font-semibold text-[#ECECF1] uppercase tracking-wider w-1/4 text-center bg-[#2A2A2A]">Full</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-[#333]">
             {features.map((feature: any, idx: number) => (
               <tr key={idx} className="hover:bg-[#262626]/50 transition-colors">
                 <td className="py-3 px-5 text-sm text-[#D4D4D8]">{feature.name}</td>
                 <td className="py-3 px-2 text-sm text-center text-[#8E8EA0]">
                   {renderValue(feature.free)}
                 </td>
                 <td className="py-3 px-2 text-sm text-center font-medium text-white bg-[#2A2A2A]/50">
                   {renderValue(feature.full)}
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>

       <div className="p-4 border-t border-[#333] bg-[#262626] flex items-end justify-between gap-4 flex-shrink-0">
          <div className="text-xs text-[#8E8EA0] flex-1">
            <span className="block font-semibold text-[#D4D4D8] mb-1">Precio Individual Full:</span>
            <div className="space-y-1">
              {individualPrices.map((price: string, i: number) => (
                <div key={i} className="text-[#A1A1AA] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#424242]"></span>
                  {price}
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={onAction}
            className={`px-4 py-2 text-white text-xs font-bold rounded-lg transition-all shadow-lg ${buttonColors} whitespace-nowrap uppercase tracking-wide`}
          >
            {ctaText || 'Contratar'}
          </button>
       </div>
    </div>
  );
}

function renderValue(value: any) {
  if (value === true) return <Check size={16} className="mx-auto text-green-500" />;
  if (value === false) return <XIcon size={16} className="mx-auto text-red-500/50" />;
  return value;
}
