import { useState, useEffect, useRef } from 'react';
import { ChatMessageMarkdown } from './ChatMessageMarkdown';

interface TypewriterTextProps {
  content: string;
  speed?: number;
  onComplete?: () => void;
  onType?: () => void;
}

export function TypewriterText({ content, speed = 30, onComplete, onType }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset when content changes significantly (e.g. completely new message)
  // or if we want to support streaming, we'd adjust this logic. 
  // For now, assuming static final content passed in blocks.
  useEffect(() => {
    // If we receive the same content prefix, we might be 'streaming'
    // But for this simplified simulation, let's restart if content length changes significantly downwards,
    // or just continue if it grows.
    
    // For this specific 'static' simulation where we get the full text at once:
    indexRef.current = 0;
    setDisplayedText("");
    
    const animate = () => {
      if (indexRef.current < content.length) {
        setDisplayedText((prev) => prev + content.charAt(indexRef.current));
        indexRef.current++;
        if (onType) onType();
        timeoutRef.current = setTimeout(animate, 10);
      } else {
        if (onComplete) onComplete();
      }
    };

    timeoutRef.current = setTimeout(animate, speed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [content, speed, onComplete]);

  return <ChatMessageMarkdown content={displayedText} />;
}
