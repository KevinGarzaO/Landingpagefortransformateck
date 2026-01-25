import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, Plus, Check } from 'lucide-react';
import { useState, FormEvent, useRef, useEffect, KeyboardEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { agents, AgentType } from './AgentSelector';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  layoutId?: string;
  isFooter?: boolean;
  isLoading?: boolean;
  selectedAgent?: AgentType | null;
  onSelectAgent?: (agent: AgentType) => void;
  placeholder?: string;
}

export function UrlInput({ onSubmit, layoutId, isFooter, isLoading, selectedAgent, onSelectAgent, placeholder = "Ingresa tu URL aqui" }: UrlInputProps) {
  const [value, setValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Get active agent details
  const activeAgent = selectedAgent ? agents.find(a => a.id === selectedAgent) : null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e?: FormEvent | KeyboardEvent) => {
    if (e) e.preventDefault();
    if (value.trim() && !isLoading) {
      onSubmit(value);
      setValue("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div 
      layoutId={layoutId}
      className="w-full mx-auto relative z-30"
    >
      <form 
        onSubmit={handleSubmit}
        className={`relative flex items-end shadow-sm rounded-[26px] bg-[#2F2F2F] transition-colors duration-200 focus-within:bg-[#2F2F2F] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''} px-2 min-h-[52px] py-2`}
      >
        {/* Agent Menu Button & Popover */}
        {onSelectAgent && (
          <div className="relative flex items-center justify-center shrink-0 mr-1 mb-0.5" ref={menuRef}>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-full transition-all duration-200 
                ${activeAgent 
                  ? `${activeAgent.colors.active} text-white shadow-lg` 
                  : `hover:bg-[#3F3F3F] ${isMenuOpen ? 'bg-[#3F3F3F] text-white' : 'text-gray-400'}`
                }`}
              title={activeAgent ? `Agente: ${activeAgent.label}` : "Seleccionar Agente"}
            >
              {activeAgent ? (
                <activeAgent.icon size={20} />
              ) : (
                <Plus size={20} />
              )}
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute bottom-full left-0 mb-3 w-60 bg-[#1A1A1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl py-1"
                >
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Seleccionar Agente
                  </div>
                  {agents.map((agent) => {
                    const isSelected = selectedAgent === agent.id;
                    const Icon = agent.icon;
                    return (
                      <button
                        key={agent.id}
                        type="button"
                        onClick={() => {
                          onSelectAgent(agent.id);
                          setIsMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors hover:bg-white/5 relative
                          ${isSelected ? 'text-white bg-white/5' : 'text-gray-400 hover:text-gray-200'}
                        `}
                      >
                        <div className={`p-1.5 rounded-lg ${isSelected ? agent.colors.active.split(' ')[0] : 'bg-[#2A2A2A]'}`}>
                          <Icon size={14} className={isSelected ? 'text-white' : agent.colors.icon.replace('text-', 'text-')} />
                        </div>
                        <span className="flex-1 text-left">{agent.label}</span>
                        {isSelected && <Check size={14} className="text-white" />}
                        
                        {/* Active indicator bar */}
                        {isSelected && (
                          <div className={`absolute left-0 top-0 bottom-0 w-1 ${agent.colors.active.split(' ')[0]}`} />
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <TextareaAutosize
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isLoading ? "Analizando..." : placeholder}
          disabled={isLoading}
          minRows={1}
          maxRows={8}
          className={`
             flex-1 bg-transparentQX border-none outline-none text-[#ECECF1] placeholder-[#8E8EA0] text-[16px] font-['Inter'] font-normal min-w-0 resize-none py-2.5 leading-relaxed bg-transparent
             ${!onSelectAgent ? 'pl-3' : ''}
          `}
        />
        
        <div className="shrink-0 ml-1 mb-0.5">
          <button 
            type="submit"
            className={`p-1.5 rounded-full transition-all duration-200 flex items-center justify-center ${
              value.trim() && !isLoading
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-[#676767] text-[#2F2F2F] cursor-default opacity-50'
            }`}
            disabled={!value.trim() || isLoading}
          >
            <ArrowUp size={20} strokeWidth={2.5} />
          </button>
        </div>
      </form>
      {!isFooter && (
        <div className="mt-4 text-center">
        </div>
      )}
    </motion.div>
  );
}
