import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for smooth tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for the "aura" lag
  const springX = useSpring(mouseX, { stiffness: 300, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 28, mass: 0.5 });

  useEffect(() => {
    const manageMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const manageMouseLeave = () => setIsVisible(false);
    const manageMouseEnter = () => setIsVisible(true);

    const checkHoverState = (e) => {
      // Check if we are hovering an interactive element
      const target = e.target;
      const isInteractive = target.closest('a') || target.closest('button') || target.closest('.magnetic-zone');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', manageMouseMove);
    window.addEventListener('mouseover', checkHoverState);
    document.body.addEventListener('mouseleave', manageMouseLeave);
    document.body.addEventListener('mouseenter', manageMouseEnter);

    return () => {
      window.removeEventListener('mousemove', manageMouseMove);
      window.removeEventListener('mouseover', checkHoverState);
      document.body.removeEventListener('mouseleave', manageMouseLeave);
      document.body.removeEventListener('mouseenter', manageMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <>
      {/* Outer Aura */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000] rounded-full border border-mint/40 mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0
        }}
        animate={{
          width: isHovering ? 64 : 32,
          height: isHovering ? 64 : 32,
          backgroundColor: isHovering ? 'rgba(52,217,154,0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(52,217,154,0.8)' : 'rgba(189,223,188,0.4)'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10001] h-1.5 w-1.5 rounded-full bg-mint mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0
        }}
        animate={{
          scale: isHovering ? 0 : 1
        }}
      />
    </>
  );
}
