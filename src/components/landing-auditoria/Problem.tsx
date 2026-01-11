import { motion } from "motion/react";
import { TrendingDown, Users, MessageSquareOff } from "lucide-react";

export const Problem = () => {
  const problems = [
    {
      icon: <TrendingDown size={32} />,
      title: "Competencia feroz",
      text: "Tu competencia sí convierte y tú te quedas atrás viendo cómo se llevan a tus clientes."
    },
    {
      icon: <Users size={32} />,
      title: "Visitantes fantasmas",
      text: "Tus anuncios llevan gente a tu web, pero se van sin dejar rastro ni comprar nada."
    },
    {
      icon: <MessageSquareOff size={32} />,
      title: "Silencio en WhatsApp",
      text: "Esperas mensajes de clientes interesados, pero tu celular no suena en todo el día."
    }
  ];

  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            ¿Te suena familiar esta situación?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Has invertido tiempo y dinero en atraer tráfico, pero tu página web parece un colador por donde se escapan las ventas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 text-center md:text-left">
                {item.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-center md:text-left">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
