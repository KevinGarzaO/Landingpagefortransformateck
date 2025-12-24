import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { LandingWeb } from "./pages/LandingWeb";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { ScrollToTop } from "./components/ScrollToTop";
import { Footer } from "./components/Footer";

export default function App() {
  const location = useLocation();

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
