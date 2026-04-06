import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * MagnifierText — splits text into words and scales each word
 * based on mouse proximity. Inspired by magnifier.learnframer.site
 *
 * Props:
 *  - text: string
 *  - className: string (applied to the wrapper)
 *  - radius: number (px — how far the magnet reaches)
 *  - maxScale: number (peak scale multiplier)
 *  - highlightWords: string[] — words that get mint-green color when hovered
 */
export default function MagnifierText({
  text,
  className = '',
  radius = 120,
  maxScale = 1.9,
  highlightWords = [],
}) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
  const wordRefs = useRef([]);

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: -9999, y: -9999 });
  }, []);

  const words = text.split(' ');

  const getScale = (index) => {
    const el = wordRefs.current[index];
    if (!el) return 1;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = Math.sqrt(
      Math.pow(mousePos.x - cx, 2) + Math.pow(mousePos.y - cy, 2)
    );
    if (dist > radius) return 1;
    // ease-out curve
    const t = 1 - dist / radius;
    return 1 + (maxScale - 1) * Math.pow(t, 1.6);
  };

  return (
    <span
      ref={containerRef}
      className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {words.map((word, i) => {
        const isHighlight = highlightWords.some(
          (hw) => word.toLowerCase().replace(/[^a-z]/gi, '').includes(hw.toLowerCase())
        );
        return (
          <motion.span
            key={i}
            ref={(el) => (wordRefs.current[i] = el)}
            animate={{ scale: getScale(i) }}
            transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.5 }}
            style={{
              display: 'inline-block',
              transformOrigin: 'bottom center',
              cursor: 'default',
              willChange: 'transform',
            }}
            className={
              isHighlight
                ? 'text-gradient font-extrabold'
                : ''
            }
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}
