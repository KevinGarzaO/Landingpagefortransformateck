import { ChatMessageMarkdown } from './ChatMessageMarkdown';
import { TypewriterText } from './TypewriterText';
import { MessageActions } from './MessageActions';
import { useEffect, useRef } from 'react';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatContainerProps {
  messages: Message[];
  isLoading?: boolean;
  loadingText?: string;
}

export function ChatContainer({ messages, isLoading, loadingText }: ChatContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom handler for typewriter effect
  const handleScrollToBottom = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'auto'
      });
    }
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    const container = containerRef.current;
    
    if (!container) return;

    // Función helper para scroll seguro
    const smoothScrollTo = (top: number) => {
      container.scrollTo({
        top,
        behavior: 'smooth'
      });
    };

    if (isLoading) {
      // Si está cargando, asegurar que vemos el indicador de carga al final
      // Usamos un pequeño timeout para asegurar que el DOM se actualizó
      setTimeout(() => {
        if (bottomRef.current) {
          // Calculamos la altura total para ir al fondo
          smoothScrollTo(container.scrollHeight);
        }
      }, 100);
      return;
    }

    if (lastMessage) {
      if (lastMessage.role === 'user') {
        // Scroll al fondo para el mensaje del usuario
        setTimeout(() => {
           smoothScrollTo(container.scrollHeight);
        }, 100);
      } else {
        // Scroll INTELIGENTE para la respuesta del asistente
        setTimeout(() => {
          const element = lastMessageRef.current;
          if (element) {
            // Posición del elemento
            const elementTop = element.offsetTop;
            // Altura del header + un poco de aire (aprox 100px)
            const offset = 100;
            // Posición final deseada
            const targetScroll = Math.max(0, elementTop - offset);
            
            smoothScrollTo(targetScroll);
          }
        }, 100);
      }
    }
  }, [messages, isLoading, loadingText]);

  return (
    <div ref={containerRef} className="h-full w-full overflow-y-auto pb-40 pt-0">
      <div className="flex flex-col w-full max-w-3xl mx-auto px-4 md:px-6 gap-6 pt-24 md:pt-32">
        {messages.map((msg, index) => {
          const isLast = index === messages.length - 1;
          return (
            <div 
              key={index}
              ref={isLast ? lastMessageRef : null} 
              className={`w-full flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300 scroll-mt-32 group`}
            >
              <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start w-full'} max-w-full`}>
                
                {/* Message Content */}
                <div 
                  className={`relative px-5 py-2.5 text-[16px] rounded-3xl min-w-0 break-words ${
                    msg.role === 'user' 
                      ? 'bg-[#2F2F2F] text-[#ECECF1] w-fit' 
                      : 'bg-transparent text-[#ECECF1] px-5 w-full text-left'
                  }`}
                >
                  {isLast && msg.role === 'assistant' && !isLoading ? (
                    <TypewriterText content={msg.content} onType={handleScrollToBottom} />
                  ) : (
                    <ChatMessageMarkdown content={msg.content} />
                  )}
                </div>

                {/* Action buttons for assistant messages */}
                {msg.role === 'assistant' && (
                  <div className="px-5">
                    <MessageActions content={msg.content} />
                  </div>
                )}

              </div>
            </div>
          );
        })}

        {isLoading && (
          <div 
            className="w-full flex justify-start animate-in fade-in duration-300"
          >
             <div className="flex flex-col items-start w-full max-w-full">
                <div className="relative px-5 py-2 text-[#ECECF1] w-full text-left">
                   <div className="flex items-center gap-3">
                     <div className="flex items-center gap-1.5 h-6">
                       <div className="w-2 h-2 bg-[#8E8EA0] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                       <div className="w-2 h-2 bg-[#8E8EA0] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                       <div className="w-2 h-2 bg-[#8E8EA0] rounded-full animate-bounce"></div>
                     </div>
                     {loadingText && (
                       <span className="text-sm text-[#A1A1AA] font-medium animate-pulse">
                         {loadingText}
                       </span>
                     )}
                   </div>
                </div>
             </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
