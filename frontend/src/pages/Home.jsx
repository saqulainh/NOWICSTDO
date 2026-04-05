import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, CheckCircle2, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import BrandLogo from '../components/BrandLogo';
import { services, stats, portfolioItems, highlights, whyUs } from '../data/content';

/* ── Animated counter hook ── */
function useCountUp(target, duration = 1.6) {
  const nodeRef = useRef(null);
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const isNumeric = /^\d+/.test(String(target));
    if (!isNumeric) { node.textContent = target; return; }

    const num = parseFloat(target);
    const suffix = String(target).replace(/[\d.]/g, '');
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = (Math.round(eased * num * 10) / 10) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return nodeRef;
}

/* ── Floating orb ── */
function Orb({ size, color, top, left, delay = 0 }) {
  return (
    <motion.div
      className="orb"
      style={{ width: size, height: size, background: color, top, left }}
      animate={{ y: [0, -20, 0], scale: [1, 1.06, 1] }}
      transition={{ duration: 8 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/* ── Highlight Stat Card ── */
function HighlightCard({ item, index }) {
  const ref = useCountUp(item.value);
  const Icon = item.icon;

  return (
    <ScrollReveal delay={index * 0.09}>
      <div className="glass-card p-6 text-center">
        <span className="icon-badge mx-auto mb-4 inline-flex">
          <Icon size={20} />
        </span>
        <p ref={ref} className="number-stat text-3xl font-extrabold">{item.value}</p>
        <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted">{item.label}</p>
      </div>
    </ScrollReveal>
  );
}

/* ── Tilt card wrapper ── */
function TiltCard({ children, className = '' }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 400, damping: 30 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 400, damping: 30 });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      className={className}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      {/* ══════════════════════════
          HERO SECTION
      ══════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Radial hero glow */}
        <div
          className="pointer-events-none absolute inset-x-0 -top-32 h-[600px]"
          style={{
            background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(52,232,161,0.2) 0%, transparent 65%)',
          }}
        />

        {/* Animated orbs */}
        <Orb size="480px" color="rgba(52,232,161,0.07)" top="-80px"  left="-120px" delay={0}   />
        <Orb size="360px" color="rgba(31,200,125,0.06)"  top="100px" left="65%"    delay={2.5} />
        <Orb size="220px" color="rgba(95,255,192,0.05)"  top="400px" left="10%"    delay={4}   />

        {/* Grid dots background */}
        <div className="grid-dots pointer-events-none absolute inset-0 opacity-40" />

        <div className="container-shell relative z-10 flex min-h-screen items-center pt-10 pb-24">
          <div className="grid w-full items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">

            {/* ── Left: Copy ── */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="eyebrow-pill">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: '#34e8a1' }} />
                  AI-Powered Software Agency
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08 }}
                className="mt-7 font-display text-5xl font-extrabold leading-[1.01] tracking-tight text-text sm:text-6xl lg:text-7xl"
              >
                From{' '}
                <span className="text-gradient">Vision</span>
                <br />
                to{' '}
                <span
                  className="relative inline-block"
                  style={{
                    textShadow: '0 0 40px rgba(52,232,161,0.35)',
                  }}
                >
                  Version.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
              >
                We build <strong className="font-semibold text-text">MVPs, AI web apps, business websites</strong>{' '}
                and <strong className="font-semibold text-text">dashboards</strong> that scale — shipped in days,
                not months.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.28 }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <Link to="/contact" className="cta-btn">
                  <span>Launch Your Project</span>
                  <ArrowRight size={16} className="ml-2 relative z-10" />
                </Link>
                <Link
                  to="/portfolio"
                  className="outline-btn"
                >
                  View Our Work
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-10 flex flex-wrap items-center gap-5"
              >
                {['30+ Projects', '98% Satisfaction', 'India Based'].map((badge) => (
                  <span key={badge} className="flex items-center gap-2 text-xs text-muted">
                    <CheckCircle2 size={13} className="text-mint" />
                    {badge}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Hero Visual ── */}
            <TiltCard className="perspective-1000">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Main card */}
                <div
                  className="relative overflow-hidden rounded-4xl p-6"
                  style={{
                    background: 'linear-gradient(145deg, rgba(13,46,28,0.8) 0%, rgba(8,31,18,0.65) 100%)',
                    border: '1px solid rgba(52,232,161,0.2)',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(52,232,161,0.12)',
                    backdropFilter: 'blur(24px)',
                  }}
                >
                  {/* Glow lines */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(52,232,161,0.6), transparent)' }} />
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-px" style={{ background: 'linear-gradient(180deg, transparent, rgba(52,232,161,0.25), transparent)' }} />

                  {/* Logo center */}
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl" style={{ background: 'rgba(52,232,161,0.08)', border: '1px solid rgba(52,232,161,0.2)' }}>
                    <BrandLogo variant="full" className="h-20 w-20" />
                  </div>

                  {/* Sprint cards */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label: 'Sprint 01', val: 'UI + API', color: 'rgba(52,232,161,0.15)' },
                      { label: 'Sprint 02', val: 'AI Layer', color: 'rgba(31,200,125,0.12)' },
                      { label: 'Sprint 03', val: 'Launch 🚀', color: 'rgba(14,165,96,0.15)' },
                    ].map((c, i) => (
                      <motion.div
                        key={c.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                        className="rounded-2xl p-3 text-center"
                        style={{ background: c.color, border: '1px solid rgba(52,232,161,0.15)' }}
                      >
                        <p className="text-[10px] uppercase tracking-[0.2em] text-mint">{c.label}</p>
                        <p className="mt-1 text-xs font-semibold text-text">{c.val}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Score bar */}
                  <div className="rounded-2xl p-4" style={{ background: 'rgba(52,232,161,0.07)', border: '1px solid rgba(52,232,161,0.15)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-muted">Execution Score</p>
                      <p className="font-display text-2xl font-extrabold text-gradient">98%</p>
                    </div>
                    <div className="progress-track">
                      <motion.div
                        className="progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: '98%' }}
                        transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  {/* Live indicator */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-muted">
                      <span className="h-2 w-2 animate-ping rounded-full" style={{ background: '#34e8a1' }} />
                      <span className="h-2 w-2 absolute rounded-full" style={{ background: '#34e8a1' }} />
                      Live Dashboard
                    </span>
                    <span className="gradient-badge">Active</span>
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -right-4 -top-4 rounded-2xl px-4 py-2.5 text-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(52,232,161,0.2), rgba(31,200,125,0.15))',
                    border: '1px solid rgba(52,232,161,0.35)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 8px 32px rgba(52,232,161,0.2)',
                  }}
                >
                  <p className="text-[10px] uppercase tracking-widest text-mint">Shipped</p>
                  <p className="font-display text-xl font-bold text-text">50+</p>
                </motion.div>
              </motion.div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          HIGHLIGHTS STATS BAR
      ══════════════════════════ */}
      <section className="relative py-16">
        <div className="section-divider absolute inset-x-0 top-0" />
        <div className="container-shell">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {highlights.map((item, i) => (
              <HighlightCard key={item.label} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          SERVICES SECTION
      ══════════════════════════ */}
      <section className="container-shell py-24">
        <SectionHeading
          eyebrow="Core Services"
          title="Built for speed.|Crafted for growth."
          description="Every deliverable we ship is engineered for momentum, market-fit, and long-term scale."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.slice(0, 6).map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.title} delay={index * 0.07}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                  className="service-card group"
                >
                  {/* Icon */}
                  <span className="icon-badge">
                    <Icon size={22} />
                  </span>

                  {/* Content */}
                  <p className="mt-5 text-2xs font-bold uppercase tracking-[0.25em] text-mint">
                    {service.title}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-text">{service.headline}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>

                  {/* Feature list */}
                  <ul className="mt-5 space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-muted">
                        <CheckCircle2 size={12} className="shrink-0 text-mint" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Hover arrow */}
                  <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-mint opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Learn more <ArrowUpRight size={13} />
                  </div>
                </motion.article>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════
          WHY US SECTION
      ══════════════════════════ */}
      <section className="relative py-24">
        <div className="section-divider absolute inset-x-0 top-0" />

        {/* Background accent */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(52,232,161,0.07) 0%, transparent 60%)',
          }}
        />

        <div className="container-shell relative">
          <div className="grid items-start gap-16 lg:grid-cols-[420px_1fr]">
            {/* Sticky left */}
            <ScrollReveal className="lg:sticky lg:top-28 lg:h-fit">
              <span className="eyebrow-pill">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#34e8a1' }} />
                Why Choose Us
              </span>
              <h2 className="mt-6 font-display text-4xl font-extrabold leading-tight text-text sm:text-5xl">
                Premium build quality with{' '}
                <span className="text-gradient">startup velocity</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                We combine senior engineering discipline with AI-powered speed to deliver products that look amazing and perform at scale.
              </p>
              <Link to="/services" className="cta-btn mt-8 inline-flex">
                <span>Explore Services</span>
                <ArrowRight size={15} className="ml-2 relative z-10" />
              </Link>
            </ScrollReveal>

            {/* Grid of reason cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {whyUs.map((item, i) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={item.title} delay={i * 0.07}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.25 }}
                      className="neo-card p-6"
                    >
                      <span className="icon-badge inline-flex">
                        <Icon size={18} />
                      </span>
                      <h3 className="mt-4 font-display text-lg font-bold text-text">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          FEATURED PORTFOLIO
      ══════════════════════════ */}
      <section className="container-shell py-24">
        <SectionHeading
          eyebrow="Featured Work"
          title="Portfolio that proves |capability"
          description="Each product we build balances visual polish, business outcomes, and scalable engineering."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-2">
          {portfolioItems.slice(0, 4).map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="glass-card group overflow-hidden"
              >
                {/* Card image area */}
                <div
                  className={`relative h-44 overflow-hidden bg-gradient-to-br ${item.gradient}`}
                >
                  <div className="absolute inset-0 grid-lines opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="gradient-badge">{item.category}</span>
                  </div>
                  {item.featured && (
                    <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest" style={{ background: 'rgba(52,232,161,0.18)', border: '1px solid rgba(52,232,161,0.3)', color: '#34e8a1' }}>
                      ⭐ Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-text">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag-pill">{tag}</span>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <a href="#" className="outline-btn flex-1 text-xs py-2">
                      Live Demo <ArrowUpRight size={13} className="ml-1" />
                    </a>
                    <a href="#" className="outline-btn flex-1 text-xs py-2">
                      GitHub <Github size={13} className="ml-1" />
                    </a>
                  </div>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-10 text-center" delay={0.2}>
          <Link to="/portfolio" className="outline-btn">
            View All Projects <ArrowRight size={15} className="ml-2" />
          </Link>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════
          BRAND STATEMENT
      ══════════════════════════ */}
      <section className="container-shell py-8">
        <ScrollReveal>
          <div
            className="relative overflow-hidden rounded-4xl p-10 text-center sm:p-14"
            style={{
              background: 'linear-gradient(145deg, rgba(13,46,28,0.7) 0%, rgba(8,31,18,0.5) 100%)',
              border: '1px solid rgba(52,232,161,0.2)',
              boxShadow: '0 0 80px rgba(52,232,161,0.1)',
            }}
          >
            <div className="pointer-events-none absolute inset-x-0 -top-24 h-48" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(52,232,161,0.18) 0%, transparent 60%)' }} />
            <div className="grid-dots pointer-events-none absolute inset-0 opacity-30" />
            <p className="relative font-display text-2xl font-extrabold leading-snug text-text sm:text-3xl lg:text-4xl">
              We are Nowic Studio.{' '}
              <span className="text-gradient">We build tech that works.</span>{' '}
              For founders, creators, and businesses who need results — not excuses.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════
          CTA SECTION
      ══════════════════════════ */}
      <section className="container-shell py-24">
        <ScrollReveal>
          <div
            className="relative overflow-hidden rounded-4xl p-10 sm:p-16"
            style={{
              background: 'linear-gradient(135deg, #0d2e1c 0%, #081f12 60%, #031810 100%)',
              border: '1px solid rgba(52,232,161,0.22)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(52,232,161,0.08)',
            }}
          >
            {/* Radial glow */}
            <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(52,232,161,0.14) 0%, transparent 60%)' }} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(52,232,161,0.45), transparent)' }} />

            <div className="relative text-center">
              <span className="eyebrow-pill">Let's Build Together</span>
              <h3 className="mt-6 font-display text-4xl font-extrabold text-text sm:text-5xl">
                Ready to Build Something{' '}
                <span className="text-gradient">Powerful?</span>
              </h3>
              <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
                Let's turn your vision into a real product. Share your idea and we'll respond within 24 hours with a roadmap.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link to="/contact" className="cta-btn px-8 py-4 text-base">
                  <span>Book a Free Discovery Call</span>
                  <ArrowRight size={18} className="ml-2 relative z-10" />
                </Link>
                <Link to="/portfolio" className="outline-btn px-8 py-4 text-base">
                  See Our Work
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
