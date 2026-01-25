import { useState } from 'react';
import { User, Sparkles, PanelLeft, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
const logo = '/assets/babelink/3997d30ae8e2a01fe56c79d2019a0ee841ec5ee8.png';

interface HeaderProps {
  started?: boolean;
  onOpenAuth: () => void;
  user?: { initials: string; color: string; email?: string; plan?: 'free' | 'pro' } | null;
  onLogout?: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  onOpenPricing: () => void;
}

export function Header({ started, onOpenAuth, user, onLogout, onToggleSidebar, isSidebarOpen, onOpenPricing }: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header 
      className={`fixed top-0 left-0 w-full p-3 md:p-4 flex justify-between items-center z-[9999] transition-all duration-300 ${
        isSidebarOpen ? 'md:left-[260px] md:w-[calc(100%-260px)]' : 'md:left-0 md:w-full'
      } ${
        started ? 'bg-[#212121] border-b border-[#2F2F2F] shadow-md' : 'bg-transparent border-b border-transparent'
      }`}
    >
       <div className="flex items-center gap-3 pl-2">
         <button 
           onClick={onToggleSidebar}
           className="p-2 hover:bg-[#2F2F2F] rounded-md text-[#ECECF1] transition-colors"
           aria-label="Toggle sidebar"
         >
           <PanelLeft size={20} />
         </button>
         <div className="flex items-center gap-2 cursor-pointer select-none">
           <img src={logo} alt="Babelink" className="h-8 w-auto object-contain" />
         </div>
       </div>
       <div className="flex items-center gap-3 pr-2">
         {user && user.plan === 'free' && (
           <button 
             onClick={onOpenPricing}
             className="flex items-center gap-2 text-sm font-medium bg-transparent hover:bg-[#2F2F2F] text-[#ECECF1] transition-colors px-3 py-2 rounded-full border border-[#424242]/50 cursor-pointer"
           >
              <Sparkles size={16} className="text-yellow-400" />
              <span className="hidden md:inline">Obtener Plus</span>
              <span className="md:hidden">Plus</span>
           </button>
         )}
         
         <div className="relative">
           {showMenu && (
             <div className="fixed inset-0 z-[9998]" onClick={() => setShowMenu(false)} />
           )}
           
           <button 
             onClick={user ? () => setShowMenu(!showMenu) : onOpenAuth}
             className="w-9 h-9 flex items-center justify-center hover:bg-[#2F2F2F] rounded-full transition-colors text-[#ECECF1] cursor-pointer overflow-hidden relative z-[9999]" 
             aria-label="Cuenta"
           >
              {user ? (
                 <div className={`w-full h-full flex items-center justify-center text-xs font-bold ${user.color} text-white`}>
                   {user.initials}
                 </div>
              ) : (
                 <User size={20} />
              )}
           </button>

           <AnimatePresence>
             {showMenu && user && (
               <motion.div
                 initial={{ opacity: 0, y: 10, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, y: 10, scale: 0.95 }}
                 transition={{ duration: 0.1 }}
                 className="absolute top-full right-0 mt-2 w-64 bg-[#2F2F2F] rounded-lg border border-[#424242] shadow-xl overflow-hidden z-[10000]"
               >
                 <div className="p-3 border-b border-[#424242] mb-1">
                   <p className="text-sm font-medium text-white truncate">{user.email || 'Usuario'}</p>
                   <p className="text-xs text-[#8E8EA0]">{user.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}</p>
                 </div>
                 <button 
                   onClick={() => {
                     setShowMenu(false);
                     setTimeout(() => onLogout?.(), 100);
                   }}
                   className="w-full text-left px-3 py-2.5 text-sm text-[#ef4444] hover:bg-[#383838] transition-colors flex items-center gap-2"
                 >
                   <LogOut size={16} />
                   Cerrar sesión
                 </button>
               </motion.div>
             )}
           </AnimatePresence>
         </div>
       </div>
    </header>
  );
}
