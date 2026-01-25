"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeroHeadline } from '@/components/chatgpt-landing/HeroHeadline';
import { UrlInput } from '@/components/chatgpt-landing/UrlInput';
import { ChatContainer, Message } from '@/components/chatgpt-landing/ChatContainer';
import { Header } from '@/components/chatgpt-landing/Header';
import { AuthModal } from '@/components/chatgpt-landing/AuthModal';
import { ConfirmationModal } from '@/components/chatgpt-landing/ConfirmationModal';
import { Sidebar } from '@/components/chatgpt-landing/Sidebar';
import { AgentSelector, AgentType, agents, defaultTexts } from '@/components/chatgpt-landing/AgentSelector';
import { PaymentPage } from '@/components/chatgpt-landing/PaymentPage';
import { PricingModal } from '@/components/chatgpt-landing/PricingModal';
import { Inter } from 'next/font/google';
import '@/styles/babelink-theme.css';

const inter = Inter({ subsets: ['latin'] });

export interface CheckoutData {
  planName: string;
  price: string;
  features: string[];
  period?: 'once' | 'monthly' | 'weekly';
}

export default function ChatGPTLandingPage() {
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isPaymentPageOpen, setIsPaymentPageOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; initials: string; color: string; plan: 'free' | 'pro' } | null>(null);
  const [hasAccount, setHasAccount] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    planName: "Análisis Full",
    price: "$1.00",
    period: 'once',
    features: ['Auditoría profunda', 'Insights accionables', 'Recomendaciones personalizadas']
  });
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    try {
      // Sidebar starts open ONLY if user is logged in AND on desktop
      const token = localStorage.getItem('user_token');
      return !!token && window.innerWidth >= 768;
    } catch {
      return false;
    }
  });

  // Derived state for agent texts
  const activeAgentData = selectedAgent ? agents.find(a => a.id === selectedAgent) : null;
  const currentTexts = activeAgentData ? activeAgentData.texts : defaultTexts;

  useEffect(() => {
    const token = localStorage.getItem('user_token');
    const email = localStorage.getItem('user_email');
    const savedHasAccount = localStorage.getItem('has_account');
    
    if (token && email) {
      setUser({
        email,
        initials: email.substring(0, 2).toUpperCase(),
        color: 'bg-purple-600',
        plan: 'free'
      });
    }

    if (savedHasAccount) {
      setHasAccount(true);
    }
  }, []);

  const handleLoginSuccess = (email: string) => {
    setUser({
      email,
      initials: email.substring(0, 2).toUpperCase(),
      color: 'bg-purple-600',
      plan: 'free'
    });
    setHasAccount(true);
    localStorage.setItem('has_account', 'true');
  };

  const handleLogoutRequest = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    setUser(null);
    setSelectedAgent(null);
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_email');
  };

  const handleNewChat = () => {
    setStarted(false);
    setMessages([]);
    setIsLoading(false);
    setLoadingStatus("");
    setSelectedAgent(null);
  };

  const handleStart = async (text: string) => {
    setIsLoading(true);
    setLoadingStatus("Iniciando análisis...");
    
    // Add user message immediately
    if (!started) {
      setStarted(true);
      setMessages([{ role: 'user', content: `Analiza esta web: ${text}` }]);
    } else {
      setMessages(prev => [...prev, { role: 'user', content: text }]);
    }
    
    try {
      // Update loading status periodically
      const statusInterval = setInterval(() => {
        setLoadingStatus(prev => {
          if (prev === "Iniciando análisis...") return "Escaneando estructura HTML y CSS...";
          if (prev === "Escaneando estructura HTML y CSS...") return "Evaluando métricas de rendimiento...";
          if (prev === "Evaluando métricas de rendimiento...") return "Generando reporte final...";
          return prev;
        });
      }, 2000);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/landing-analysis-expert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: text,
          type: 'free'
        }),
      });

      clearInterval(statusInterval);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      
      setIsLoading(false);
      setLoadingStatus("");
      
      // Extract score and format response
      let analysisContent = data.content || data.message || data.analysis || '';
      
      // Try to get score from data.score
      let score = data.score || 0;
      
      // If score is 0, try to find the JSON block at the end of content and parse the score from it
      if (score === 0) {
        const jsonMatch = analysisContent.match(/```json\s*(\{[\s\S]*?\})\s*```/i) || 
                          analysisContent.match(/(\{[\s\S]*?"score"[\s\S]*?\})\s*$/);
        if (jsonMatch) {
          try {
            const parsedJson = JSON.parse(jsonMatch[1]);
            if (parsedJson.score) {
              score = parsedJson.score;
            }
          } catch (e) {
            console.error("Error parsing embedded JSON score", e);
          }
        }
      }

      // If still 0, try to extract from text patterns
      if (score === 0) {
        const scoreMatch = analysisContent.match(/score[^0-9]*(\d+)\/100/i) || 
                          analysisContent.match(/(\d+)\/100/);
        if (scoreMatch) {
          score = parseInt(scoreMatch[1], 10);
        }
      }
      
      // Remove JSON block from the end of the content if present
      analysisContent = analysisContent.replace(/\n*```json[\s\S]*?```\s*$/gi, '');
      analysisContent = analysisContent.replace(/\n*\{"status"[\s\S]*?\}\s*$/gi, '');
      
      // Clean up bold markers and extra spaces
      analysisContent = analysisContent.replace(/\*\*\s*\*\*/g, '');
      analysisContent = analysisContent.replace(/\s{2,}/g, ' ');
      
      // Ensure specific spacing for the numbered list items to ensure they break lines
      // Adds a double newline before any "Number. Emoji" pattern
      analysisContent = analysisContent.replace(/([^\n])\s+(\d+\.\s+[\uD800-\uDBFF][\uDC00-\uDFFF])/g, '$1\n\n$2');
      analysisContent = analysisContent.replace(/([^\n])\s+(\d+\.\s+)/g, '$1\n\n$2');
      
      // Determine traffic light color based on score
      let scoreColor = '';
      let scoreEmoji = '';
      if (score >= 80) {
        scoreColor = '🟢';
        scoreEmoji = '✨';
      } else if (score >= 50) {
        scoreColor = '🟡';
        scoreEmoji = '⚡';
      } else {
        scoreColor = '🔴';
        scoreEmoji = '⚠️';
      }
      
      // Format the response with score at the top
      const responseContent = `# ${scoreColor} Score: ${score}/100 ${scoreEmoji}\n\n${analysisContent.trim()}`;
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: responseContent
      }]);
    } catch (error) {
      console.error('Analysis error:', error);
      setIsLoading(false);
      setLoadingStatus("");
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `❌ **Error al analizar**\n\nNo se pudo completar el análisis de "${text}". Por favor, verifica que la URL sea válida e inténtalo de nuevo.\n\n_Detalle: ${error instanceof Error ? error.message : 'Error desconocido'}_`
      }]);
    }
  };

  return (
    <div className={`babelink-theme bg-[#212121] h-[100dvh] text-[#ECECF1] overflow-hidden relative flex flex-col supports-[height:100dvh]:h-[100dvh] ${inter.className}`}>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        user={user}
        onNewChat={handleNewChat}
        onLogout={handleLogoutRequest}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenPricing={() => setIsPricingModalOpen(true)}
      />

      <div className={`flex-1 flex flex-col h-full transition-all duration-300 ${isSidebarOpen ? 'md:pl-[260px]' : 'md:pl-0'}`}>
        <Header 
          started={started} 
          onOpenAuth={() => setIsAuthModalOpen(true)} 
          user={user} 
          onLogout={handleLogoutRequest}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          onOpenPricing={() => setIsPricingModalOpen(true)}
        />
        
        {/* Background/Layout Container */}
        <div className="flex-1 relative w-full h-full max-w-full mx-auto flex flex-col">
          
          {/* Hero Headline - Centered */}
          <AnimatePresence>
            {!started && (
              <motion.div 
                className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 ${user ? 'pb-80 md:pb-64' : 'pb-40'}`}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.4 } }}
              >
                <HeroHeadline text={currentTexts.headline} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Area */}
          {started && (
            <div className="flex-1 w-full h-full animate-in fade-in duration-500">
              <ChatContainer messages={messages} isLoading={isLoading} loadingText={loadingStatus} />
            </div>
          )}

          {/* Floating/Fixed Input */}
          <motion.div 
            layout
            initial={false}
            className={`z-20 left-0 right-0 mx-auto ${
              started 
                ? `fixed bottom-0 w-full bg-gradient-to-t from-[#212121] via-[#212121] to-transparent pb-6 pt-2 px-4 ${isSidebarOpen ? 'md:w-[calc(100%-260px)] md:left-[260px]' : 'md:w-full md:left-0'}` 
                : 'absolute top-1/2 -translate-y-1/2 w-full px-4'
            }`}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <motion.div layout className={`mx-auto ${started ? 'w-full max-w-3xl' : 'w-full max-w-2xl'}`}>
               
               {/* Save Conversation Prompt - Only show if NOT logged in AND hasn't created account yet */}
               <AnimatePresence>
                 {started && !user && !hasAccount && (
                   <motion.div
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 10 }}
                     className="mb-4 text-center"
                   >
                     <button 
                       onClick={() => setIsAuthModalOpen(true)}
                       className="group relative inline-flex items-center gap-2 px-4 py-2 bg-[#2A2A2A] hover:bg-[#333] border border-blue-500/30 hover:border-blue-400/50 rounded-full transition-all duration-300 shadow-[0_0_15px_-3px_rgba(59,130,246,0.15)] hover:shadow-[0_0_20px_-3px_rgba(59,130,246,0.3)]"
                     >
                       <span className="flex h-2 w-2 relative">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                       </span>
                       <span className="text-sm text-blue-100/90 font-medium">
                         ¿Quieres guardar esta charla?
                       </span>
                       <span className="text-xs font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:brightness-110 transition-all">
                         Crear cuenta →
                       </span>
                     </button>
                   </motion.div>
                 )}
               </AnimatePresence>

               {/* Agent Selector - Only show if logged in and not started */}
               <AnimatePresence>
                 {!started && user && (
                   <motion.div
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                   >
                     <AgentSelector 
                       selectedAgent={selectedAgent} 
                       onSelect={setSelectedAgent} 
                     />
                   </motion.div>
                 )}
               </AnimatePresence>

               <UrlInput 
                 onSubmit={handleStart} 
                 isFooter={started} 
                 isLoading={isLoading} 
                 selectedAgent={selectedAgent}
                 onSelectAgent={user ? setSelectedAgent : undefined}
                 placeholder={currentTexts.placeholder}
               />
               
               <AnimatePresence>
                 {!started && (
                   <motion.div
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 5 }}
                     transition={{ duration: 0.3 }}
                     className="mt-4 text-center"
                   >
                      <span className="text-[#D4D4D4] text-sm font-medium">
                        <AnimatePresence mode="wait">
                          <motion.span
                             key={currentTexts.subHeadline}
                             initial={{ opacity: 0, y: 5 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -5 }}
                             transition={{ duration: 0.2 }}
                             className="block"
                          >
                             {currentTexts.subHeadline}
                          </motion.span>
                        </AnimatePresence>
                      </span>
                   </motion.div>
                 )}
               </AnimatePresence>
            </motion.div>
          </motion.div>

        </div>

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
          onLoginSuccess={handleLoginSuccess}
        />

        <ConfirmationModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={confirmLogout}
          title="¿Cerrar sesión?"
          message="¿Estás seguro que deseas cerrar sesión en babelink?"
          confirmText="Cerrar sesión"
        />

        <PricingModal 
          isOpen={isPricingModalOpen}
          onClose={() => setIsPricingModalOpen(false)}
          onGoToCheckout={(data) => {
            setCheckoutData(data);
            setIsPricingModalOpen(false);
            setIsPaymentPageOpen(true);
          }}
        />

        <AnimatePresence>
          {isPaymentPageOpen && (
             <PaymentPage 
               onBack={() => {
                 setIsPaymentPageOpen(false);
                 setIsPricingModalOpen(true);
               }} 
               planName={checkoutData.planName}
               price={checkoutData.price}
               features={checkoutData.features}
               period={checkoutData.period}
             />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
