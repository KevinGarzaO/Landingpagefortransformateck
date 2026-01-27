import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

interface ChatMessageMarkdownProps {
  content: string;
}

export function ChatMessageMarkdown({ content }: ChatMessageMarkdownProps) {
  const validContent = typeof content === 'string' ? content : '';
  
  // Fix specific issue where "score de" is followed by a newline and the number
  // "score de \n 100" -> "score de 100" (handles multiple newlines/spaces)
  let fixedContent = validContent.replace(/(score de)[\s\n]+(\d+)/gi, '$1 $2');

  // Fix markdown headers that are missing spaces after # (e.g., "#Título" -> "# Título")
  fixedContent = fixedContent.replace(/^(#{1,6})([^#\s])/gm, '$1 $2');
  
  // Ensure "Number. Emoji" patterns are treated as H3 headers with proper spacing
  // Matches: "1. 🎯" or "## 1. 🎯" -> "\n\n### 1. 🎯"
  // We strip existing hashes first to avoid #### 1. 🎯
  // Updated to match ANY non-whitespace character after "Number. ", catching all emojis (⚡, ✨, etc.)
  fixedContent = fixedContent.replace(/(\n|^)\s*#{0,6}\s*(\d+\.\s+\S)/g, '\n\n### $2');
  
  // Clean up any weird trailing hashes that might have been left over if the backend format was messy
  fixedContent = fixedContent.replace(/\s*##\s*$/gm, '');

  // Ensure "CONCLUSIÓN FINAL" is on its own line
  // Handles "## CONCLUSIÓN FINAL" or just "CONCLUSIÓN FINAL"
  fixedContent = fixedContent.replace(/([^\n])\s*#{0,6}\s*(CONCLUSIÓN FINAL:?)/g, '$1\n\n**CONCLUSIÓN FINAL:**');
  
  // Clean up any potential triple newlines to just double
  fixedContent = fixedContent.replace(/\n{3,}/g, '\n\n');

  return (
    <div className="text-[#ECECF1] text-[16px] leading-[1.6] font-['Inter'] font-normal break-words w-full">
      <ReactMarkdown
        remarkPlugins={[remarkBreaks]}
        components={{
          h1: ({...props}) => <h1 className="text-2xl font-semibold mb-4 mt-6 first:mt-0" {...props} />,
          h2: ({...props}) => <h2 className="text-xl font-semibold mb-3 mt-5 first:mt-0" {...props} />,
          h3: ({...props}) => <h3 className="text-xl font-semibold mb-2 mt-4 first:mt-0 text-white" {...props} />,
          p: ({...props}) => <p className="mb-4 last:mb-0" {...props} />,
          ul: ({...props}) => <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />,
          ol: ({...props}) => <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />,
          li: ({...props}) => <li className="pl-1" {...props} />,
          strong: ({...props}) => <strong className="font-bold text-white" {...props} />,
          a: ({...props}) => <a className="text-[#19C37D] hover:underline" {...props} />,
          blockquote: ({...props}) => <blockquote className="border-l-4 border-[#565869] pl-4 italic mb-4" {...props} />,
          
          pre: ({...props}) => (
            <div className="bg-black rounded-md mb-4 border border-[#565869] overflow-hidden my-4 w-full">
              <div className="bg-[#343541] px-4 py-2 text-xs text-[#B4B4C0] border-b border-[#565869] font-sans flex items-center justify-between">
                 <span>code</span>
              </div>
              <div className="p-4 overflow-x-auto bg-black">
                 <pre className="font-mono text-sm text-[#ECECF1] m-0" {...props} />
              </div>
            </div>
          ),
          
          code: ({ inline, className, children, ...props }: any) => {
             if (inline) {
               return (
                 <code className="bg-[#40414F] px-1.5 py-0.5 rounded text-sm font-mono text-[#ECECF1]" {...props}>
                   {children}
                 </code>
               );
             }
             return (
               <code className={`font-mono ${className || ''}`} {...props}>
                 {children}
               </code>
             );
          }
        }}
      >
        {fixedContent}
      </ReactMarkdown>
    </div>
  );
}
