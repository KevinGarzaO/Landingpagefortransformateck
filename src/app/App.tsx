import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { LandingWeb } from "./pages/LandingWeb";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { ScrollToTop } from "./components/ScrollToTop";
import { Footer } from "./components/Footer";

export default function App() {
  const location = useLocation();

  // 🔥 Facebook Pixel – PageView por cambio de ruta
  useEffect(() => {
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing-web" element={<LandingWeb />} />
      </Routes>

      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
}
