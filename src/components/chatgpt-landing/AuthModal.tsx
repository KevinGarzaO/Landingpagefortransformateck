import { X, Github, Mail, History, Sparkles, Zap, FileText, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

export function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de login
    localStorage.setItem('user_token', 'simulated_token');
    localStorage.setItem('user_email', email);
    onLoginSuccess(email);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // onClick={onClose} removed to prevent closing on backdrop click
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#2F2F2F] border border-[#424242] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header - Fixed */}
            <div className="flex flex-col p-6 border-b border-[#424242] gap-1 flex-shrink-0 bg-[#2F2F2F] z-10">
               <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    {mode === 'signup' ? 'Únete a babelink' : 'Bienvenido de nuevo'}
                  </h2>
                  <button 
                    onClick={onClose}
                    className="p-2 -mr-2 text-[#8E8EA0] hover:text-[#ECECF1] hover:bg-[#424242] rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
               </div>
               <p className="text-[#A1A1AA] text-sm">
                 {mode === 'signup' 
                   ? 'Crea tu cuenta para desbloquear todo el potencial.' 
                   : 'Ingresa a tu cuenta para continuar.'}
               </p>
            </div>

            {/* Body - Scrollable */}
            <div className="p-6 space-y-6 overflow-y-auto">
              
              {/* Benefits (Only show on Signup) */}
              {mode === 'signup' && (
                <div className="bg-[#212121] rounded-xl p-4 border border-[#424242]/50 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-[#ECECF1]">
                    <div className="p-1.5 bg-blue-500/10 rounded-full text-blue-400">
                      <History size={16} />
                    </div>
                    <span>Accede a tu historial</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#ECECF1]">
                     <div className="p-1.5 bg-purple-500/10 rounded-full text-purple-400">
                      <Sparkles size={16} />
                    </div>
                    <span>Desbloquea otros agentes</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#ECECF1]">
                     <div className="p-1.5 bg-green-500/10 rounded-full text-green-400">
                      <FileText size={16} />
                    </div>
                    <span>Exporta tus análisis</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#ECECF1]">
                     <div className="p-1.5 bg-orange-500/10 rounded-full text-orange-400">
                      <TrendingUp size={16} />
                    </div>
                    <span>Monitoriza tu rendimiento</span>
                  </div>
                </div>
              )}

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => {
                    localStorage.setItem('user_token', 'google_token');
                    localStorage.setItem('user_email', 'google@example.com');
                    onLoginSuccess('google@example.com');
                    onClose();
                  }}
                  className="flex items-center justify-center gap-2 p-2.5 bg-[#424242] hover:bg-[#525252] text-[#ECECF1] rounded-lg border border-[#565656] transition-colors font-medium text-sm cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </button>
                <button 
                  onClick={() => {
                    localStorage.setItem('user_token', 'github_token');
                    localStorage.setItem('user_email', 'github@example.com');
                    onLoginSuccess('github@example.com');
                    onClose();
                  }}
                  className="flex items-center justify-center gap-2 p-2.5 bg-[#424242] hover:bg-[#525252] text-[#ECECF1] rounded-lg border border-[#565656] transition-colors font-medium text-sm cursor-pointer"
                >
                  <Github size={20} />
                  GitHub
                </button>
              </div>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-[#424242]"></div>
                <span className="flex-shrink-0 mx-4 text-[#8E8EA0] text-xs uppercase">O con email</span>
                <div className="flex-grow border-t border-[#424242]"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[#ECECF1]">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8EA0]" size={18} />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#212121] border border-[#424242] text-[#ECECF1] rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-[#ECECF1] focus:ring-1 focus:ring-[#ECECF1] transition-all"
                      placeholder="nombre@ejemplo.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[#ECECF1]">Contraseña</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#212121] border border-[#424242] text-[#ECECF1] rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#ECECF1] focus:ring-1 focus:ring-[#ECECF1] transition-all"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#ECECF1] hover:bg-white text-black font-semibold py-2.5 rounded-lg transition-colors mt-2"
                >
                  {mode === 'signup' ? 'Crear cuenta' : 'Iniciar sesión'}
                </button>
              </form>

              <div className="text-center text-sm text-[#8E8EA0] mt-4">
                {mode === 'signup' ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
                <button 
                  onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
                  className="ml-1 text-[#ECECF1] hover:underline font-medium"
                >
                  {mode === 'signup' ? 'Inicia sesión' : 'Regístrate'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
