import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo_3.png";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { path: "/", label: "Inicio", icon: "🏠" },
    { path: "/landing-web", label: "Landing Web", icon: "🚀" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 group"
          >
            <img
              src={logo}
              alt="Transformateck"
              className="h-10 brightness-0 invert group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-white text-xl hidden md:block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Transformateck
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/50"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}

            <a
              href="https://wa.me/528118582060?text=Hola%20me%20interesa%20más%20información%20sobre%20los%20servicios"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border-2 border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400/10 transition-all duration-300"
            >
              Contacto
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-cyan-500/20 animate-in slide-in-from-top">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 mb-2 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}

            <a
              href="https://wa.me/528118582060?text=Hola%20me%20interesa%20más%20información%20sobre%20los%20servicios"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-4 py-3 border-2 border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400/10 transition-all duration-300"
            >
              Contacto
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
