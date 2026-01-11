import { motion } from "motion/react";
import { AlertCircle } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative w-full bg-slate-900 text-white py-20 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full mb-6 border border-red-500/20">
              <AlertCircle size={16} />
              <span className="text-sm font-medium uppercase tracking-wide">
                ¿Tráfico sin ventas?
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Recibes visitas pero <span className="text-red-400">nadie te contacta</span>…
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              Tus anuncios llevan tráfico, pero los clientes no llegan. 
              <span className="block mt-2 text-white font-semibold">
                Obtén una auditoría gratuita de tu landing para empezar a convertir visitas en clientes.
              </span>
            </p>
          </motion.div>
        </div>

        {/* Image Visual */}
        <div className="flex-1 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1753955671120-736d3a2eded2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVzdHJhdGVkJTIwYnVzaW5lc3MlMjBtYW4lMjBjb21wdXRlciUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NjgxNDc1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
              alt="Frustrated business owner looking at analytics" 
              className="w-full h-auto object-cover min-h-[400px]"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-red-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-500/5 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2"></div>
    </section>
  );
};
