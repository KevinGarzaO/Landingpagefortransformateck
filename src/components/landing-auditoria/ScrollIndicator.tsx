import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

interface ScrollIndicatorProps {
  bgColor: string;
  color?: "light" | "dark";
}

export const ScrollIndicator = ({ bgColor, color = "dark" }: ScrollIndicatorProps) => {
  return (
    <div className={`w-full flex justify-center pb-6 ${bgColor}`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 0.2, duration: 0.5 },
          y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="cursor-pointer p-2 rounded-full hover:bg-slate-800/5 transition-colors"
      >
        <ChevronDown 
          className={color === "light" ? "text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" : "text-blue-600 drop-shadow-sm"} 
          size={40} 
          strokeWidth={2.5}
        />
      </motion.div>
    </div>
  );
};
