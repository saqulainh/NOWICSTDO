import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Magnetic — Adds a subtle attraction force to elements as the cursor approaches.
 * A staple micro-interaction for high-end boutique agency sites.
 */
export default function Magnetic({ children, strength = 0.25 }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance and offset
    const x = (clientX - centerX) * strength;
    const y = (clientY - centerY) * strength;
    
    setPos({ x, y });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  const { x, y } = pos;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
