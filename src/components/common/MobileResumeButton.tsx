"use client";

import { Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileResumeButtonProps {
  url?: string;
}

export const MobileResumeButton = ({ url }: MobileResumeButtonProps) => {
  if (!url) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0, opacity: 0, y: 20 }}
        className="fixed top-[86vh] right-10 z-[999] md:hidden"
      >
        <div className="relative flex items-center justify-center">
          {/* Curved Rotating Text */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute h-28 w-28 pointer-events-none"
          >
            <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
              <path
                id="textPath"
                d="M 50, 50 m -37, 0 a 37, 37 0 1, 1 74, 0 a 37, 37 0 1, 1 -74, 0"
                fill="none"
              />
              <text className="fill-white/80 text-[7px] font-medium uppercase tracking-[0.3em]">
                <textPath href="#textPath" startOffset="0%">
                  Download Resume • Download Resume •
                </textPath>
              </text>
            </svg>
          </motion.div>

          <button
            onClick={() => window.open(url, "_blank")}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-110 active:scale-95 transition-transform z-10"
            aria-label="Download Resume"
          >
            <Download size={22} strokeWidth={2.5} />
            
            {/* Subtle pulse effect */}
            <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-20 pointer-events-none"></span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
