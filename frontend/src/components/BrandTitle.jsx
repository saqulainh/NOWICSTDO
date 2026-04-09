import { motion } from 'framer-motion';

/**
 * BrandTitle — Modern Figma / 21dev style agency typography
 * Uses strict geometric sans-serif (Outfit) with high contrast weights.
 */
export default function BrandTitle({ className = '' }) {
  // Staggered reveal for letters
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  };

  const letterVars = {
    hidden: { opacity: 0, y: 40, rotateX: -90 },
    show: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  const nowic = "NOWIC".split('');
  const studio = "STUDIO".split('');

  return (
    <motion.div 
      className={`flex items-baseline gap-2 md:gap-4 ${className}`}
      variants={containerVars}
      initial="hidden"
      animate="show"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* NOWIC: Bold, tight letter spacing */}
      <div className="flex font-black tracking-tighter text-[3.5rem] sm:text-[5rem] md:text-[6.5rem] leading-[0.85] text-white">
        {nowic.map((char, i) => (
          <motion.span key={`n-${i}`} variants={letterVars} className="inline-block transform-gpu origin-bottom">
            {char}
          </motion.span>
        ))}
      </div>

      {/* STUDIO: Light/Thin, slightly looser spacing, premium gradient */}
      <div className="flex font-light tracking-wide text-[3.5rem] sm:text-[5rem] md:text-[6.5rem] leading-[0.85] text-transparent bg-clip-text bg-gradient-to-br from-[#bddfbc] via-[#a7cfaa] to-[#8cb88f]">
        {studio.map((char, i) => (
          <motion.span key={`s-${i}`} variants={letterVars} className="inline-block transform-gpu origin-bottom">
            {char}
          </motion.span>
        ))}
      </div>

      {/* Premium accent dot with glow */}
      <motion.div
        className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-[#bddfbc] relative"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5, type: 'spring', stiffness: 200, damping: 12 }}
      >
        <motion.div 
          className="absolute inset-0 rounded-full bg-[#bddfbc] blur-md opacity-60"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}
