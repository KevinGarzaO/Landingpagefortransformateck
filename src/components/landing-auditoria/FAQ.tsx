import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-10">
          Preguntas Frecuentes
        </h2>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="bg-white px-6 rounded-xl border border-slate-200">
            <AccordionTrigger className="text-lg font-medium text-slate-800 hover:text-blue-600 hover:no-underline">
              ¿Es realmente gratis?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 pb-4">
              Sí, totalmente gratis y sin compromiso. Queremos demostrarte nuestro valor antes de que decidas trabajar con nosotros.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="bg-white px-6 rounded-xl border border-slate-200">
            <AccordionTrigger className="text-lg font-medium text-slate-800 hover:text-blue-600 hover:no-underline">
              ¿Cuánto tarda la entrega?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 pb-4">
              Normalmente entregamos el reporte completo en un plazo de 48 a 72 horas hábiles después de recibir tu solicitud.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="bg-white px-6 rounded-xl border border-slate-200">
            <AccordionTrigger className="text-lg font-medium text-slate-800 hover:text-blue-600 hover:no-underline">
              ¿Qué recibo exactamente?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 pb-4">
              Recibirás un video corto explicativo o un documento PDF con un análisis de los puntos críticos de tu web y una lista de acciones recomendadas para mejorar la conversión.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};
