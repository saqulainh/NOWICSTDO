import { useEffect, useRef } from 'react';

/**
 * ParticleHero — canvas-based particle rain + spotlight beams.
 * Adapted for Nowic Studio mint-green dark theme.
 * Renders as an absolute-positioned background layer.
 */
export default function ParticleHero({ className = '' }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  const createParticle = (canvas) => {
    const particle = {
      x: 0,
      y: 0,
      speed: 0,
      opacity: 1,
      fadeDelay: 0,
      fadeStart: 0,
      fadingOut: false,
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() / 5 + 0.1;
        this.opacity = 1;
        this.fadeDelay = Math.random() * 600 + 100;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
      },
      update() {
        this.y -= this.speed;
        if (this.y < 0) this.reset();
        if (!this.fadingOut && Date.now() > this.fadeStart) this.fadingOut = true;
        if (this.fadingOut) {
          this.opacity -= 0.008;
          if (this.opacity <= 0) this.reset();
        }
      },
      draw(ctx) {
        // Mint / teal / cyan particles matching #34d99a palette
        const r = 52 + Math.floor(Math.random() * 40);
        const g = 200 + Math.floor(Math.random() * 55);
        const b = 154 + Math.floor(Math.random() * 80);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.7})`;
        ctx.fillRect(this.x, this.y, 0.5, Math.random() * 2 + 1);
      },
    };
    particle.reset();
    particle.y = Math.random() * canvas.height;
    return particle;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      const count = Math.floor((canvas.width * canvas.height) / 7000);
      particlesRef.current = [];
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(createParticle(canvas));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => { p.update(); p.draw(ctx); });
      animationRef.current = requestAnimationFrame(animate);
    };

    setSize();
    animate();
    window.addEventListener('resize', setSize);
    return () => {
      window.removeEventListener('resize', setSize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div
      className={`particle-hero-wrap pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
      style={{ zIndex: 0 }}
    >
      {/* Spotlight beams */}
      <div className="particle-spotlights">
        <div className="particle-beam particle-beam--left" />
        <div className="particle-beam particle-beam--right" />
        <div className="particle-beam particle-beam--center" />
      </div>

      {/* Accent grid lines */}
      <div className="particle-grid-lines">
        {[14, 22, 30, 40, 52].map((t) => (
          <div
            key={t}
            className="particle-hline"
            style={{ top: `${t}%` }}
          />
        ))}
        {[-18, -8, 8, 18].map((l, i) => (
          <div
            key={i}
            className="particle-vline"
            style={{ left: `calc(50% + ${l}%)` }}
          />
        ))}
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}
      />
    </div>
  );
}
