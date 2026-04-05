import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ArrowRight, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import BrandLogo from '../components/BrandLogo';
import { services, highlights, whyUs, portfolioItems } from '../data/content';

/* ── Counter hook ── */
function useCountUp(target, duration = 1.4) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const isNum = /^\d+/.test(String(target));
    if (!isNum) { node.textContent = target; return; }
    const num = parseFloat(target);
    const suffix = String(target).replace(/[\d.]/g, '');
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      const e = 1 - Math.pow(1 - p, 3);
      node.textContent = Math.round(e * num) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return ref;
}

function StatCard({ item, index }) {
  const ref = useCountUp(item.value);
  const Icon = item.icon;
  return (
    <ScrollReveal delay={index * 0.08}>
      <div className="card p-6 text-center">
        <div className="icon-box mx-auto mb-3">
          <Icon size={18} />
        </div>
        <p ref={ref} className="number-stat text-2xl">{item.value}</p>
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-muted">{item.label}</p>
      </div>
    </ScrollReveal>
  );
}

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        {/* Subtle top glow — only accent */}
        <div
          className="pointer-events-none absolute inset-x-0 -top-40 h-[500px]"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(52,217,154,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="container-shell relative pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">

            {/* Left copy */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="eyebrow"
              >
                AI-Powered Software Agency
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.06 }}
                className="mt-5 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-text sm:text-6xl lg:text-[68px]"
              >
                From{' '}
                <span className="text-gradient">Vision</span>
                <br />
                to Version.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.14 }}
                className="mt-6 max-w-lg text-lg leading-relaxed text-sub"
              >
                We build <strong className="font-semibold text-text">MVPs, AI web apps, business websites</strong>{' '}
                and <strong className="font-semibold text-text">dashboards</strong> — shipped in days, not months.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.22 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Link to="/contact" className="cta-btn">
                  Launch Your Project <ArrowRight size={15} className="ml-2" />
                </Link>
                <Link to="/portfolio" className="outline-btn">
                  View Our Work
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-wrap gap-5"
              >
                {['30+ Projects', '98% Satisfaction', 'India Based'].map((b) => (
                  <span key={b} className="flex items-center gap-2 text-xs text-muted">
                    <CheckCircle2 size={12} className="text-mint" />
                    {b}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right — Dashboard preview card */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="card overflow-hidden p-5">
                {/* Logo */}
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface">
                    <BrandLogo variant="full" className="h-10 w-10" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">Project Dashboard</p>
                    <p className="text-xs text-muted">Live Preview</p>
                  </div>
                </div>

                {/* Sprint row */}
                <div className="grid grid-cols-3 gap-2.5 mb-4">
                  {[
                    { label: 'Sprint 01', val: 'UI + API' },
                    { label: 'Sprint 02', val: 'AI Layer' },
                    { label: 'Sprint 03', val: 'Launch 🚀' },
                  ].map((c, i) => (
                    <motion.div
                      key={c.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.08 }}
                      className="rounded-xl bg-surface p-3 text-center"
                    >
                      <p className="text-[10px] uppercase tracking-widest text-muted">{c.label}</p>
                      <p className="mt-0.5 text-xs font-semibold text-text">{c.val}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Score */}
                <div className="rounded-xl bg-surface p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-muted">Execution Score</p>
                    <p className="font-display text-xl font-bold text-gradient">98%</p>
                  </div>
                  <div className="progress-track">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: '98%' }}
                      transition={{ delay: 0.7, duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="mt-3 flex items-center justify-between px-1">
                  <span className="flex items-center gap-2 text-xs text-muted">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                    </span>
                    Active Project
                  </span>
                  <span className="text-xs font-medium text-mint">Online</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="py-12">
        <div className="container-shell">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {highlights.map((item, i) => (
              <StatCard key={item.label} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="container-shell py-20">
        <SectionHeading
          eyebrow="Services"
          title="Built for speed. |Crafted for growth."
          description="Every product we ship is engineered for momentum, market-fit, and long-term scale."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.slice(0, 6).map((service, i) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.title} delay={i * 0.06}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="feature-card group h-full"
                >
                  <div className="icon-box mb-4">
                    <Icon size={18} />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-mint">
                    {service.title}
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-bold text-text">{service.headline}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sub">{service.description}</p>

                  <ul className="mt-4 space-y-1.5">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-muted">
                        <CheckCircle2 size={11} className="text-mint shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ═══ WHY US ═══ */}
      <section className="py-20">
        <div className="container-shell">
          <div className="grid gap-16 lg:grid-cols-[380px_1fr]">
            {/* Left sticky */}
            <ScrollReveal className="lg:sticky lg:top-24 lg:h-fit">
              <p className="eyebrow">Why Choose Us</p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-text sm:text-4xl">
                Premium quality with{' '}
                <span className="text-gradient">startup speed</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-sub">
                Senior engineering discipline combined with AI-powered speed — products that look amazing and scale effortlessly.
              </p>
              <Link to="/services" className="cta-btn mt-6 inline-flex">
                Explore Services <ArrowRight size={15} className="ml-2" />
              </Link>
            </ScrollReveal>

            {/* Cards grid */}
            <div className="grid gap-3 sm:grid-cols-2">
              {whyUs.map((item, i) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={item.title} delay={i * 0.06}>
                    <div className="card p-5 h-full">
                      <div className="icon-box mb-3">
                        <Icon size={16} />
                      </div>
                      <h3 className="font-display text-sm font-bold text-text">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-sub">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED WORK ═══ */}
      <section className="container-shell py-20">
        <SectionHeading
          eyebrow="Portfolio"
          title="Work that proves |capability"
          description="Real products. Real impact. Each built with precision and purpose."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {portfolioItems.slice(0, 4).map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.07}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="card group overflow-hidden h-full"
              >
                {/* Preview area */}
                <div className="relative h-40 bg-surface flex items-center justify-center">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="absolute right-3 top-3 rounded-full bg-mint/10 px-2.5 py-0.5 text-[10px] font-semibold text-mint">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-text">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sub">{item.description}</p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <a href="#" className="portfolio-btn flex-1 text-xs">
                      Live Demo <ArrowUpRight size={12} className="ml-1" />
                    </a>
                    <a href="#" className="portfolio-btn flex-1 text-xs">
                      GitHub <Github size={12} className="ml-1" />
                    </a>
                  </div>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-8 text-center" delay={0.15}>
          <Link to="/portfolio" className="outline-btn">
            View All Projects <ArrowRight size={14} className="ml-2" />
          </Link>
        </ScrollReveal>
      </section>

      {/* ═══ BRAND STATEMENT ═══ */}
      <section className="container-shell py-8">
        <ScrollReveal>
          <div className="rounded-2xl border border-subtle bg-panel p-10 text-center sm:p-14">
            <p className="mx-auto max-w-3xl font-display text-2xl font-bold leading-snug text-text sm:text-3xl">
              We are Nowic Studio.{' '}
              <span className="text-gradient">We build tech that works.</span>{' '}
              For founders, creators, and businesses who need results — not excuses.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="container-shell py-20">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-2xl bg-panel p-10 text-center sm:p-16"
            style={{ border: '1px solid #1e2028' }}
          >
            {/* Subtle green glow at bottom */}
            <div
              className="pointer-events-none absolute inset-x-0 -bottom-20 h-40"
              style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(52,217,154,0.08), transparent 65%)' }}
            />

            <div className="relative">
              <p className="eyebrow">Let's Build</p>
              <h3 className="mt-4 font-display text-3xl font-bold text-text sm:text-4xl">
                Ready to build something{' '}
                <span className="text-gradient">powerful?</span>
              </h3>
              <p className="mx-auto mt-4 max-w-lg text-sub">
                Share your idea and we'll respond within 24 hours with a clear roadmap, timeline, and budget.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to="/contact" className="cta-btn px-8 py-3.5">
                  Book a Free Discovery Call <ArrowRight size={15} className="ml-2" />
                </Link>
                <Link to="/portfolio" className="outline-btn">See Our Work</Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
