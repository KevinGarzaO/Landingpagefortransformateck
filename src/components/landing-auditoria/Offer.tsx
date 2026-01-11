import { motion } from "motion/react";
import { Check, Clock, FileText } from "lucide-react";

export const Offer = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-blue-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-blue-600 py-4 px-6 text-white text-center font-bold tracking-wider text-sm uppercase">
            Oferta por tiempo limitado
          </div>
          
          <div className="p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Auditoría de Landing Page
            </h2>
            <div className="inline-block bg-green-100 text-green-700 font-bold px-4 py-1 rounded-full text-lg mb-8">
              100% GRATIS
            </div>
            
            <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
              Obtén un diagnóstico profesional de tu sitio web sin costo alguno. Descubre qué está fallando y cómo arreglarlo.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10 text-left">
              <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl">
                <Clock className="text-blue-600 mb-3" size={32} />
                <h3 className="font-bold text-slate-900">Rápido</h3>
                <p className="text-sm text-slate-500 text-center">Entrega en 48–72 hrs</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl">
                <FileText className="text-blue-600 mb-3" size={32} />
                <h3 className="font-bold text-slate-900">Completo</h3>
                <p className="text-sm text-slate-500 text-center">Reporte detallado PDF</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl">
                <Check className="text-blue-600 mb-3" size={32} />
                <h3 className="font-bold text-slate-900">Accionable</h3>
                <p className="text-sm text-slate-500 text-center">Pasos claros a seguir</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
