"use client";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { WhatsAppLink } from "../../components/WhatsAppLink";

// Update logo path
const logo = "/assets/logo_3.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    "Apps Mobile",
    "Apps Web",
    "Landing Pages",
    "E-commerce",
    "Sistemas Web",
    "Chatbot IA WhatsApp",
    "Copywriting",
    "Marketing Ads",
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "https://facebook.com" },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com" },
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
            <Link
              href="/"
              className="flex items-center gap-3 group mb-4"
            >
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
            <WhatsAppLink
              message="Hola me interesa más información sobre los servicios"
              className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
              component="Footer"
              section="CompanyInfo"
              buttonId="footer-company-contact"
            >
              💬 Contactar
            </WhatsAppLink>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-xl mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Servicios
            </h3>
            <ul className="space-y-2">
              {services.map((service, i) => (
                <li key={i}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white text-xl mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Síguenos
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
              <WhatsAppLink
                message="Hola me interesa más información de los servicios"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors duration-300"
                component="Footer"
                section="ContactInfo"
                buttonId="footer-phone-link"
              >
                <span>📱</span>
                <span>+52 81 1858 2060</span>
              </WhatsAppLink>
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
