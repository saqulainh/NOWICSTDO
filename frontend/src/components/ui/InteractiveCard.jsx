import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * InteractiveCard — A high-end 3D tilt card with a dynamic light-sweep shimmer.
 * Perfectly calibrated for the 'Obsidian Forest' premium aesthetic.
 */
export default function InteractiveCard({ 
  children, 
  className = '', 
  containerClassName = '' 
}) {
  const cardRef = useRef(null);
  
  // Motion values for rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Map values to degrees (subtle 8deg tilt)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  // Light sweep position
  const [lightPos, setLightPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate normalized rotation [-0.5 to 0.5]
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);

    // Update light sweep position
    setLightPos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className={`perspective-[1000px] ${containerClassName}`}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`card group/inter relative cursor-pointer overflow-hidden transition-all duration-300 ${className}`}
      >
        {/* The Light Sweep Shimmer — Subtle and premium */}
        <div 
          className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover/inter:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 180px at ${lightPos.x}% ${lightPos.y}%, rgba(189, 223, 188, 0.08), transparent 80%)`
          }}
        />

        {/* Content wrapper with inverse z to pop */}
        <div style={{ transform: "translateZ(20px)" }} className="relative z-20 h-full">
          {children}
        </div>

        {/* Inner Border Glow */}
        <div className="pointer-events-none absolute inset-0 rounded-inherit border border-mint/5 group-hover/inter:border-mint/15 transition-colors duration-500" />
      </motion.div>
    </div>
  );
}
