"use client";

export function BlogCTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden border-t border-white/10">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          📬 Suscríbete al Newsletter
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Recibe contenido exclusivo sobre tecnología, IA y desarrollo
          directamente en tu correo.
        </p>
        <div className="flex justify-center">
          <iframe
            src="https://transformateck.substack.com/embed"
            width="480"
            height="320"
            style={{
              border: "1px solid #EEE",
              background: "white",
              borderRadius: "12px",
            }}
            frameBorder="0"
            scrolling="no"
            title="Suscríbete a Transformateck en Substack"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
