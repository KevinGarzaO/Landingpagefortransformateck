"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

export const ScrollToTop = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  // 1. Reset scroll on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 2. Show button on scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 right-6 z-40 p-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-110 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Volver arriba"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};
