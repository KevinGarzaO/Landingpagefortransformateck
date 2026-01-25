'use client';

import { useState } from 'react';
import { Copy, ThumbsUp, ThumbsDown, Check } from 'lucide-react';

interface MessageActionsProps {
  content: string;
}

export function MessageActions({ content }: MessageActionsProps) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const handleCopy = async () => {
    try {
      // Remove markdown formatting for plain text copy
      const plainText = content
        .replace(/#{1,6}\s/g, '')
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/`{3}[\s\S]*?`{3}/g, '')
        .replace(/`/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
      
      await navigator.clipboard.writeText(plainText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleFeedback = (type: 'up' | 'down') => {
    setFeedback(prev => prev === type ? null : type);
    // TODO: Send feedback to backend if needed
  };

  return (
    <div className="flex items-center gap-1 mt-3 relative">
      <button
        onClick={handleCopy}
        className="p-1.5 rounded-lg hover:bg-[#3F3F3F] text-gray-400 hover:text-gray-200 transition-colors"
        title="Copiar"
      >
        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
      </button>
      
      {/* Toast notification */}
      {copied && (
        <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-[#3F3F3F] text-green-400 text-xs px-2 py-1 rounded-md animate-in fade-in slide-in-from-left-2 duration-200">
          ✓ Mensaje copiado
        </span>
      )}
      
      <button
        onClick={() => handleFeedback('up')}
        className={`p-1.5 rounded-lg hover:bg-[#3F3F3F] transition-colors ${
          feedback === 'up' ? 'text-green-400' : 'text-gray-400 hover:text-gray-200'
        }`}
        title="Me gusta"
      >
        <ThumbsUp size={16} />
      </button>
      
      <button
        onClick={() => handleFeedback('down')}
        className={`p-1.5 rounded-lg hover:bg-[#3F3F3F] transition-colors ${
          feedback === 'down' ? 'text-red-400' : 'text-gray-400 hover:text-gray-200'
        }`}
        title="No me gusta"
      >
        <ThumbsDown size={16} />
      </button>
    </div>
  );
}
