import { Monitor, Briefcase, PenTool, Search } from 'lucide-react';
import { motion } from 'motion/react';

export type AgentType = 'WEB_ANALYZER' | 'BUSINESS_CONSULTANT' | 'CONTENT_CREATOR' | 'SEO_ANALYZER';

interface AgentSelectorProps {
  selectedAgent: AgentType | null;
  onSelect: (agent: AgentType) => void;
}

export const defaultTexts = {
  headline: "Analizamos tu web con IA",
  subHeadline: "Análisis técnico, SEO, UX, seguridad y oportunidades de crecimiento",
  placeholder: "Ingresa tu URL para comenzar"
};

export const agents = [
  {
    id: 'WEB_ANALYZER' as AgentType,
    label: 'Analizador Web',
    icon: Monitor,
    texts: {
      headline: "Analizamos tu web con IA",
      subHeadline: "Análisis técnico, SEO, UX, seguridad y oportunidades de crecimiento",
      placeholder: "Ingresa tu URL para comenzar"
    },
    colors: {
      active: 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20',
      inactive: 'bg-[#2A2A2A] border-white/10 text-gray-400 hover:bg-[#333] hover:border-blue-500/30 hover:text-blue-400',
      icon: 'text-blue-400'
    }
  },
  {
    id: 'BUSINESS_CONSULTANT' as AgentType,
    label: 'Consultor Negocio',
    icon: Briefcase,
    texts: {
      headline: "Evaluamos tu modelo de negocio digital",
      subHeadline: "Modelos de monetización, análisis de mercado y optimización de conversión",
      placeholder: "¿Qué desafío de negocio quieres resolver hoy?"
    },
    colors: {
      active: 'bg-amber-600 border-amber-500 text-white shadow-lg shadow-amber-500/20',
      inactive: 'bg-[#2A2A2A] border-white/10 text-gray-400 hover:bg-[#333] hover:border-amber-500/30 hover:text-amber-400',
      icon: 'text-amber-400'
    }
  },
  {
    id: 'CONTENT_CREATOR' as AgentType,
    label: 'Creador Contenido',
    icon: PenTool,
    texts: {
      headline: "Diseñamos tu estrategia de contenidos",
      subHeadline: "Estrategia de contenidos, tono de voz y copys persuasivos",
      placeholder: "¿Sobre qué tema o idea quieres generar contenido?"
    },
    colors: {
      active: 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/20',
      inactive: 'bg-[#2A2A2A] border-white/10 text-gray-400 hover:bg-[#333] hover:border-emerald-500/30 hover:text-emerald-400',
      icon: 'text-emerald-400'
    }
  },
  {
    id: 'SEO_ANALYZER' as AgentType,
    label: 'Analizador SEO',
    icon: Search,
    texts: {
      headline: "Auditamos tu posicionamiento SEO",
      subHeadline: "Auditoría SEO, palabras clave, backlinks y visibilidad orgánica",
      placeholder: "Ingresa tu URL para auditar tu post"
    },
    colors: {
      active: 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20',
      inactive: 'bg-[#2A2A2A] border-white/10 text-gray-400 hover:bg-[#333] hover:border-purple-500/30 hover:text-purple-400',
      icon: 'text-purple-400'
    }
  }
];

export function AgentSelector({ selectedAgent, onSelect }: AgentSelectorProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 w-full px-2">
      {agents.map((agent) => {
        const isSelected = selectedAgent === agent.id;
        const Icon = agent.icon;
        
        return (
          <motion.button
            key={agent.id}
            onClick={() => onSelect(agent.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            layout
            className={`
              relative flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full border text-xs sm:text-sm font-medium transition-all duration-200
              ${isSelected 
                ? `${agent.colors.active} border-transparent` 
                : `${agent.colors.inactive}`
              }
            `}
          >
            <Icon 
              size={16} 
              className={`
                transition-colors duration-200 flex-shrink-0
                ${isSelected ? 'text-white' : agent.colors.icon}
              `} 
            />
            <span className="whitespace-nowrap">{agent.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
