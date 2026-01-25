import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Shield, Check, ArrowLeft, CreditCard } from 'lucide-react';
const logo = '/assets/babelink/3997d30ae8e2a01fe56c79d2019a0ee841ec5ee8.png';

interface PaymentPageProps {
  onBack: () => void;
  planName?: string;
  price?: string;
  features?: string[];
  period?: 'once' | 'monthly' | 'weekly';
}

export function PaymentPage({ 
  onBack, 
  planName = "Análisis Full", 
  price = "$1.00", 
  period = 'once',
  features = [
    'Auditoría profunda de tu web',
    'Recomendaciones accionables de conversión',
    'Chat consultor basado en tu análisis',
    'Insights de UX, copy y tracking',
    'Acceso inmediato'
  ]
}: PaymentPageProps) {
  // Simple form state simulation
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Consultant specific state logic
  const isConsultant = planName === "Consultor de Negocio";
  const [consultantPeriod, setConsultantPeriod] = useState<'once' | 'weekly' | 'monthly'>(
     isConsultant ? (period as any) || 'weekly' : 'once'
  );

  const getCurrentPrice = () => {
    if (!isConsultant) return price;
    if (consultantPeriod === 'once') return "$1.00";
    if (consultantPeriod === 'weekly') return "$5.00";
    if (consultantPeriod === 'monthly') return "$15.00";
    return price;
  };

  const activePrice = getCurrentPrice();
  const activePeriod = isConsultant ? consultantPeriod : period;

  const billingText = activePeriod === 'once' 
    ? "Pago único · Sin cargos recurrentes"
    : activePeriod === 'weekly'
      ? "Suscripción semanal · Cancela cuando quieras"
      : "Suscripción mensual · Cancela cuando quieras";

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Pago simulado exitoso');
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[20000] bg-[#0F0F0F] text-[#ECECF1] font-['Inter'] overflow-y-auto flex flex-col items-center min-h-screen"
    >
       {/* 1. Header Mínimo */}
       <header className="w-full max-w-lg px-6 py-6 flex flex-col items-center gap-4 relative">
          {/* Explicit Back Button Row */}
          <div className="w-full flex items-center justify-between mb-2">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-[#A1A1AA] hover:text-white transition-colors group text-sm font-medium"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Volver
            </button>
            
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded-full border border-[#10B981]/20">
              <Lock size={12} />
              <span>Pago seguro</span>
            </div>
          </div>

          <div className="flex items-center justify-center mb-2 select-none">
             <img src={logo} alt="Babelink" className="h-10 w-auto object-contain" />
          </div>

          <p className="text-[#A1A1AA] text-sm animate-pulse text-center">
            Estás a un paso de completar tu análisis.
          </p>
       </header>

       <main className="w-full max-w-[480px] p-6 flex flex-col gap-6 pb-20">
          
          {/* 2. Confirmación del producto */}
          <div className="bg-[#1A1A1A] rounded-xl border border-[#333] p-6 shadow-sm">
             <div className="mb-4">
               <h2 className="text-xl font-bold text-white mb-1">{planName} desbloqueado</h2>
               <p className="text-sm text-[#A1A1AA]">Auditoría estratégica + consultor IA</p>
             </div>
             
             <ul className="space-y-3">
               {features.map((item, i) => (
                 <li key={i} className="flex items-start gap-3 text-sm text-[#D4D4D8]">
                    <div className="mt-0.5 min-w-[16px]">
                      <Check size={16} className="text-blue-500" />
                    </div>
                    <span>{item}</span>
                 </li>
               ))}
             </ul>
          </div>

          {/* 2.5 Consultant Period Selector */}
          {isConsultant && (
            <div className="bg-[#1A1A1A] rounded-xl border border-[#333] p-1 shadow-sm flex items-center justify-between relative z-10">
               {[
                 { id: 'once', label: '1 Día', price: '$1' },
                 { id: 'weekly', label: 'Semanal', price: '$5' },
                 { id: 'monthly', label: 'Mensual', price: '$15' }
               ].map((opt) => (
                 <button
                   key={opt.id}
                   onClick={() => setConsultantPeriod(opt.id as any)}
                   className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all text-center flex flex-col items-center gap-0.5 ${
                     consultantPeriod === opt.id 
                       ? 'bg-[#333] text-white shadow-sm ring-1 ring-white/10' 
                       : 'text-[#8E8EA0] hover:text-[#D4D4D8] hover:bg-[#222]'
                   }`}
                 >
                   <span>{opt.label}</span>
                   <span className={`text-[10px] ${consultantPeriod === opt.id ? 'text-emerald-400' : 'text-[#525252]'}`}>{opt.price}</span>
                 </button>
               ))}
            </div>
          )}

          {/* 3. Resumen de pago */}
          <div className="flex items-center justify-between bg-[#1A1A1A] rounded-xl border border-[#333] p-5">
             <div className="flex flex-col">
               <span className="text-3xl font-bold text-white tracking-tight">{activePrice} <span className="text-lg font-normal text-[#A1A1AA]">USD</span></span>
               <span className="text-xs text-[#8E8EA0] mt-1">{billingText}</span>
             </div>
             <div className="h-10 w-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 border border-blue-500/20">
               <Shield size={20} />
             </div>
          </div>

          {/* 4. Formulario de pago */}
          <div className="space-y-4">
             <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#A1A1AA] uppercase tracking-wider ml-1">Correo electrónico</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg px-4 py-3 text-white placeholder-[#525252] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
             </div>

             <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#A1A1AA] uppercase tracking-wider ml-1">Información de tarjeta</label>
                <div className="bg-[#1A1A1A] border border-[#333] rounded-lg overflow-hidden transition-all focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                   <div className="px-4 py-3 border-b border-[#333] flex items-center gap-3">
                      <CreditCard size={18} className="text-[#8E8EA0]" />
                      <input 
                        type="text" 
                        placeholder="Número de tarjeta" 
                        className="bg-transparent text-white placeholder-[#525252] focus:outline-none w-full"
                      />
                   </div>
                   <div className="flex divide-x divide-[#333]">
                      <input 
                        type="text" 
                        placeholder="MM / AA" 
                        className="bg-transparent text-white placeholder-[#525252] focus:outline-none w-1/2 px-4 py-3"
                      />
                      <input 
                        type="text" 
                        placeholder="CVC" 
                        className="bg-transparent text-white placeholder-[#525252] focus:outline-none w-1/2 px-4 py-3"
                      />
                   </div>
                </div>
             </div>
          </div>

          {/* 5. Elementos de confianza */}
          <div className="space-y-6 mt-2">
             <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-[#737373] font-medium">
                <div className="flex items-center gap-1.5">
                   <Lock size={12} className="text-[#10B981]" /> Procesado de forma segura
                </div>
                <div className="flex items-center gap-1.5">
                   <Shield size={12} className="text-[#10B981]" /> No almacenamos datos
                </div>
                <div className="flex items-center gap-1.5">
                   <Check size={12} className="text-[#10B981]" /> Cancelación inmediata
                </div>
             </div>

             {/* 6. CTA Principal */}
             <div className="space-y-3">
                <button 
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-4 rounded-xl shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                >
                  {isProcessing ? 'Procesando...' : `Pagar ${activePrice} y desbloquear ahora`}
                </button>
                <p className="text-center text-xs text-[#737373]">
                  Acceso inmediato después del pago
                </p>
             </div>

             {/* Logos */}
             <div className="flex items-center justify-center gap-4 opacity-40 grayscale">
                 <span className="font-bold italic font-serif text-white">stripe</span>
                 <span className="font-bold tracking-wider text-white">VISA</span>
                 <div className="flex gap-0.5">
                    <div className="w-4 h-4 rounded-full bg-white opacity-80"></div>
                    <div className="w-4 h-4 rounded-full bg-white opacity-80 -ml-2"></div>
                 </div>
                 <span className="font-bold italic text-white">PayPal</span>
             </div>
          </div>

          {/* 7. Reaseguro emocional */}
          <div className="text-center space-y-1 pt-6 border-t border-[#272727]">
             <p className="text-xs text-[#525252]">Creado para founders, marketers y negocios reales.</p>
             <p className="text-xs text-[#525252]">Diseñado para ayudarte a tomar mejores decisiones, no solo ver métricas.</p>
          </div>

          {/* 8. Footer */}
          <footer className="text-center text-[10px] text-[#404040] flex items-center justify-center gap-4 mt-4">
             <a href="#" className="hover:text-[#737373] transition-colors">Privacidad</a>
             <span>·</span>
             <a href="#" className="hover:text-[#737373] transition-colors">Términos</a>
             <span>·</span>
             <a href="#" className="hover:text-[#737373] transition-colors">Soporte</a>
             <span className="ml-2 opacity-50"><img src={logo} alt="Babelink" className="h-3 w-auto inline-block grayscale brightness-50" /></span>
          </footer>

       </main>
    </motion.div>
  );
}
