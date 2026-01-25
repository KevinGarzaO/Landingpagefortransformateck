import { motion, AnimatePresence } from 'motion/react';

interface HeroHeadlineProps {
  text?: string;
}

export function HeroHeadline({ text = "Analizamos tu web con IA" }: HeroHeadlineProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40px]">
      <AnimatePresence mode="wait">
        <motion.h1 
          key={text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-[#ECECF1] text-[24px] md:text-[32px] font-semibold leading-tight text-center font-['Inter'] mb-8"
        >
          {text}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
