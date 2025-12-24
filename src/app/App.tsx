import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { LandingWeb } from "./pages/LandingWeb";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { ScrollToTop } from "./components/ScrollToTop";
import { Footer } from "./components/Footer";
import { useState } from "react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "landing-web">(
    "home"
  );

  const handleNavigate = (page: "home" | "landing-web") => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      {currentPage === "home" && <Home onNavigate={handleNavigate} />}
      {currentPage === "landing-web" && <LandingWeb />}
      <Footer onNavigate={handleNavigate} />
      <WhatsAppButton currentPage={currentPage} />
      <ScrollToTop />
    </div>
  );
}
