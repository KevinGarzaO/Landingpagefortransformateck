import { motion } from "motion/react";
import { CheckCircle2, Search, FileBarChart, Zap } from "lucide-react";

export const Benefits = () => {
  const benefits = [
    {
      icon: <Search className="text-blue-600" size={24} />,
      text: "Identificamos los errores críticos que hacen que tu landing no convierta."
    },
    {
      icon: <FileBarChart className="text-blue-600" size={24} />,
      text: "Recibes recomendaciones claras, directas y 100% accionables."
    },
    {
      icon: <Zap className="text-blue-600" size={24} />,
      text: "Estrategias probadas para generar clientes reales desde anuncios y WhatsApp."
    },
    {
      icon: <CheckCircle2 className="text-blue-600" size={24} />,
      text: "Sin tecnicismos complicados, hablamos tu idioma de negocios."
    }
  ];

  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        <motion.div 
          className="flex-1 order-2 md:order-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-100/50 rounded-2xl transform -rotate-2"></div>
            <img 
              src="https://images.unsplash.com/photo-1730382624709-81e52dd294d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN1Y2Nlc3MlMjBncm93dGglMjBncmFwaHxlbnwxfHx8fDE3NjgxNDc1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
              alt="Growth chart showing success" 
              className="relative rounded-xl shadow-xl w-full h-auto object-cover"
            />
          </div>
        </motion.div>

        <div className="flex-1 order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Deja de adivinar y empieza a convertir
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Con nuestra auditoría, transformamos la incertidumbre en un plan de acción claro. No más &quot;creo que funciona&quot;, pasemos a &quot;sé que funciona&quot;.
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="bg-blue-50 p-3 rounded-lg flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <p className="text-slate-700 font-medium pt-1">
                    {benefit.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
