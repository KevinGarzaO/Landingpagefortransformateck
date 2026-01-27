import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, MessageSquare, X, History, LogOut, Sparkles, User, Monitor, Briefcase, PenTool, Search, Download } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: { email: string; initials: string; color: string; plan?: 'free' | 'pro' } | null;
  onNewChat: () => void;
  onLogout?: () => void;
  onOpenAuth?: () => void;
  onOpenPricing?: () => void;
}

export function Sidebar({ isOpen, onClose, user, onNewChat, onLogout, onOpenAuth, onOpenPricing }: SidebarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isInstallable, promptInstall } = usePWAInstall();

  // Datos simulados de historial
  const history = user 
    ? [
        { id: 1, title: 'Análisis de apple.com', date: 'Hoy', agent: 'WEB_ANALYZER' },
        { id: 2, title: 'Estrategia de monetización', date: 'Ayer', agent: 'BUSINESS_CONSULTANT' },
        { id: 3, title: 'Ideas para blog tech', date: 'Hace 3 días', agent: 'CONTENT_CREATOR' },
        { id: 4, title: 'Auditoría SEO local', date: 'Hace 1 semana', agent: 'SEO_ANALYZER' },
        { id: 5, title: 'Debug de performance', date: 'Hace 1 semana', agent: 'WEB_ANALYZER' },
        { id: 6, title: 'Revisión de accesibilidad', date: 'Hace 2 semanas', agent: 'WEB_ANALYZER' },
        { id: 7, title: 'Plan de negocio SaaS', date: 'Hace 2 semanas', agent: 'BUSINESS_CONSULTANT' },
        { id: 8, title: 'Análisis SEO Google', date: 'Hace 3 semanas', agent: 'SEO_ANALYZER' },
        { id: 9, title: 'Copy para landing page', date: 'Hace 1 mes', agent: 'CONTENT_CREATOR' },
        { id: 10, title: 'Auditoría de seguridad', date: 'Hace 1 mes', agent: 'WEB_ANALYZER' },
        { id: 11, title: 'Optimización CSS', date: 'Hace 2 meses', agent: 'WEB_ANALYZER' },
        { id: 12, title: 'Revisión React 19', date: 'Hace 2 meses', agent: 'WEB_ANALYZER' },
      ]
    : [
        { id: 101, title: 'Análisis de sitio ejemplo', date: 'Reciente', agent: 'WEB_ANALYZER' },
        { id: 102, title: 'Prueba de velocidad', date: 'Hace un momento', agent: 'WEB_ANALYZER' },
        { id: 103, title: 'Demo de auditoría', date: 'Ayer', agent: 'WEB_ANALYZER' },
      ];

  const getAgentIcon = (agent: string) => {
    switch (agent) {
      case 'WEB_ANALYZER': return { icon: Monitor, color: 'text-blue-400' };
      case 'BUSINESS_CONSULTANT': return { icon: Briefcase, color: 'text-amber-400' };
      case 'CONTENT_CREATOR': return { icon: PenTool, color: 'text-emerald-400' };
      case 'SEO_ANALYZER': return { icon: Search, color: 'text-purple-400' };
      default: return { icon: MessageSquare, color: 'text-[#8E8EA0]' };
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[10000] md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.div 
        className={`fixed top-0 left-0 h-full bg-[#171717] border-r border-[#2F2F2F] z-[10001] w-[260px] flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={() => setShowUserMenu(false)}
      >
        {/* Header - New Chat Button */}
        <div className="p-3 mb-2 flex-shrink-0">
          <button 
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 768) onClose();
            }}
            className="flex items-center gap-3 w-full px-3 py-3 rounded-lg border border-[#424242]/50 hover:bg-[#2F2F2F] text-white transition-colors text-sm text-left group"
          >
            <Plus size={16} className="text-[#ECECF1] group-hover:text-white" />
            <span className="font-medium">Nuevo análisis</span>
            <span className="ml-auto md:hidden">
                <X size={16} onClick={(e) => { e.stopPropagation(); onClose(); }} />
            </span>
          </button>
        </div>

        {/* Scrollable Content - History */}
        <div className="flex-1 overflow-y-auto px-3 py-2">
          <div className="text-xs font-semibold text-[#8E8EA0] px-3 mb-3 uppercase tracking-wider">
            Historial
          </div>
          
          <div className="space-y-2">
            {history.map((item) => {
              const { icon: Icon, color } = getAgentIcon(item.agent);
              return (
                <button 
                  key={item.id}
                  className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-[#2F2F2F] text-[#ECECF1] text-sm text-left transition-colors truncate group"
                >
                  <Icon size={16} className={`flex-shrink-0 ${color} opacity-80 group-hover:opacity-100`} />
                  <div className="flex flex-col overflow-hidden">
                    <span className="truncate">{item.title}</span>
                    <span className="text-[10px] text-[#8E8EA0]">{item.date}</span>
                  </div>
                </button>
              );
            })}
            
            {!user && (
              <div className="mt-6 px-3 py-4 bg-[#2F2F2F]/50 rounded-xl border border-[#424242]/30">
                <p className="text-xs text-[#ECECF1] mb-3">
                  Inicia sesión para guardar tu historial de análisis completo.
                </p>
                <div className="flex flex-col gap-2">
                    <div className="text-xs text-[#8E8EA0] flex items-center gap-1 mb-1">
                      <History size={12} />
                      <span>Historial limitado</span>
                    </div>
                    <button 
                      onClick={onOpenAuth}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors shadow-sm"
                    >
                      Crear cuenta gratuita
                    </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer - User / Settings */}
        <div className="p-3 border-t border-[#2F2F2F] flex-shrink-0 relative">
           <AnimatePresence>
             {showUserMenu && user && (
               <motion.div
                 initial={{ opacity: 0, y: 10, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, y: 10, scale: 0.95 }}
                 transition={{ duration: 0.1 }}
                 className="absolute bottom-full left-3 right-3 mb-2 bg-[#2F2F2F] rounded-lg border border-[#424242] shadow-xl overflow-hidden"
                 onClick={(e) => e.stopPropagation()}
               >
                 <div className="p-3 border-b border-[#424242] mb-1">
                   <p className="text-sm font-medium text-white truncate">{user.email}</p>
                   <p className="text-xs text-[#8E8EA0]">{user.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}</p>
                 </div>
                 <button 
                   onClick={() => {
                     setShowUserMenu(false);
                     // Small delay to allow menu close animation
                     setTimeout(() => onLogout?.(), 100);
                   }}
                   className="w-full text-left px-3 py-2.5 text-sm text-[#ef4444] hover:bg-[#383838] transition-colors flex items-center gap-2"
                 >
                   <LogOut size={16} />
                   Cerrar sesión
                 </button>
                 {isInstallable && (
                    <button 
                      onClick={() => {
                        setShowUserMenu(false);
                        promptInstall();
                      }}
                      className="w-full text-left px-3 py-2.5 text-sm text-[#ECECF1] hover:bg-[#383838] transition-colors flex items-center gap-2 border-t border-[#424242]"
                    >
                      <Download size={16} className="text-blue-400" />
                      Instalar App
                    </button>
                 )}
               </motion.div>
             )}
           </AnimatePresence>

           {user ? (
             <div className="flex flex-col gap-2">
               {user.plan === 'free' && (
                 <button 
                   onClick={onOpenPricing}
                   className="flex items-center justify-center gap-2 w-full text-xs font-medium bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white transition-all px-3 py-2 rounded-lg shadow-lg shadow-amber-900/20 mb-1"
                 >
                    <Sparkles size={14} className="text-white" />
                    <span>Obtener Plus</span>
                 </button>
               )}
               <div 
                 onClick={(e) => {
                   e.stopPropagation();
                   setShowUserMenu(!showUserMenu);
                 }}
                 className={`flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#2F2F2F] cursor-pointer transition-colors ${showUserMenu ? 'bg-[#2F2F2F]' : ''}`}
               >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${user.color} text-white`}>
                     {user.initials}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                     <span className="text-sm text-[#ECECF1] font-medium truncate">{user.email}</span>
                     <span className="text-xs text-[#8E8EA0]">{user.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}</span>
                  </div>
               </div>
             </div>
           ) : (
             <button 
               onClick={onOpenAuth}
               className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-[#2F2F2F] text-[#ECECF1] text-sm transition-colors"
             >
                <User size={18} />
                <span>Iniciar sesión</span>
             </button>
           )}
        </div>
      </motion.div>
    </>
  );
}
