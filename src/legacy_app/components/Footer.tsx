"use client";
import Link from "next/link";
import { Linkedin, Newspaper } from "lucide-react";

// Custom X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Update logo path
const logo = "/assets/logo_3.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/rusogarzao/",
    },
    {
      name: "X",
      icon: XIcon,
      url: "https://x.com/kgarzaortiz",
    },
    {
      name: "Substack",
      icon: Newspaper,
      url: "https://substack.com/@kevingarza",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-black to-black border-t border-cyan-500/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-3 group mb-4">
              <img
                src={logo}
                alt="Transformateck"
                className="h-10 brightness-0 invert group-hover:scale-110 transition-transform duration-300"
              />
              <span className="text-white text-xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Transformateck
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Fábrica de productos digitales. Transformamos ideas en realidad
              con tecnología de vanguardia.
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white text-xl mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Sígueme en redes sociales
            </h3>
            <div className="space-y-3 mb-6">
              {socialLinks.map((social, i) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-all duration-300 group"
                  >
                    <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{social.name}</span>
                  </a>
                );
              })}
            </div>
            <div className="text-gray-500 text-sm space-y-2">
              <a
                href="mailto:kevin.garza@transformateck.com"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors duration-300"
              >
                <span>📧</span>
                <span>kevin.garza@transformateck.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cyan-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} Transformateck. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-gray-500 hover:text-cyan-400 transition-colors"
              >
                Privacidad
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-cyan-400 transition-colors"
              >
                Términos
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-cyan-400 transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-50"></div>
    </footer>
  );
}
