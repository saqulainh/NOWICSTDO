import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Preloader — A high-end minimal loading screen.
 * Displays during the initial splash or page transitions.
 */
export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial delay for that "Senior UI" premium splash feel
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const initialPath = `M0 0 L${window.innerWidth} 0 L${window.innerWidth} ${window.innerHeight} L0 ${window.innerHeight} Z`;
  const targetPath = `M0 0 L${window.innerWidth} 0 Q${window.innerWidth / 2} 0 0 0 Z`;

  const curveVars = {
    initial: {
      d: initialPath
    },
    exit: {
      d: targetPath,
      transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] }
    }
  };

  return (
    <AnimatePresence>
      {loading && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {/* Minimal Content Layer */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', transition: { duration: 0.6 } }}
            className="fixed inset-0 z-10 flex items-center justify-center"
          >
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-4 text-center"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl font-black text-white tracking-tight">NOWIC</span>
                  <span className="font-display text-4xl font-light text-mint/70 tracking-tight">STUDIO</span>
                </div>
                <div className="h-[2px] w-32 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="h-full w-full bg-mint"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* LIQUID WAVE LAYER */}
          <svg className="absolute inset-0 h-full w-full fill-[#050806]">
            <motion.path
              variants={curveVars}
              initial="initial"
              exit="exit"
            />
          </svg>
        </div>
      )}
    </AnimatePresence>
  );
}
