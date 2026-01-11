"use client";

import { Hero } from "@/components/landing-auditoria/Hero";
import { Problem } from "@/components/landing-auditoria/Problem";
import { Benefits } from "@/components/landing-auditoria/Benefits";
import { SocialProof } from "@/components/landing-auditoria/SocialProof";
import { Offer } from "@/components/landing-auditoria/Offer";
import { FinalCTA } from "@/components/landing-auditoria/FinalCTA";
import { FAQ } from "@/components/landing-auditoria/FAQ";
import { ScrollIndicator } from "@/components/landing-auditoria/ScrollIndicator";

export default function LandingOptimizadaPage() {
  return (
    <main className="min-h-screen font-sans bg-white selection:bg-blue-100 selection:text-blue-900">
      <Hero />
      <ScrollIndicator bgColor="bg-slate-900" color="light" />
      
      <Problem />
      <ScrollIndicator bgColor="bg-slate-50" color="dark" />
      
      <Benefits />
      <ScrollIndicator bgColor="bg-white" color="dark" />
      
      <SocialProof />
      <ScrollIndicator bgColor="bg-slate-900" color="light" />
      
      <Offer />
      {/* Offer ends in white due to gradient to-white */}
      <ScrollIndicator bgColor="bg-white" color="dark" />
      
      <FinalCTA />
      {/* Scroll indicator removed here to keep focus on the CTA */}
      
      <FAQ />
      
      <footer className="bg-slate-900 text-slate-500 py-8 text-center text-sm border-t border-slate-800">
        <p>© {new Date().getFullYear()} Tu Agencia de Conversión. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
