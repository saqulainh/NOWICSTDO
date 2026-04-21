import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ArrowRight, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import ScrollReveal from '../components/reveal/ScrollReveal';
import FloatingChips from '../components/hero/FloatingChips';
import HeroDecor from '../components/hero/HeroDecor';
import BrandTitle from '../components/common/BrandTitle';
import InteractiveCard from '../components/ui/InteractiveCard';
import Magnetic from '../components/ui/Magnetic';
import MaskText from '../components/reveal/MaskText';
import BoutiqueReveal from '../components/reveal/BoutiqueReveal';
import { useContent } from '../context/ContentContext';

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
  const { services, highlights, whyUs, portfolioItems } = useContent();

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden" style={{ minHeight: '700px' }}>
        {/* Spotlight beams + grid lines (local to Hero) */}
        <HeroDecor />

        {/* Floating tech chips */}
        <FloatingChips />

        <BoutiqueReveal delay={0.6} className="container-shell relative z-10 flex flex-col items-center justify-center text-center pt-28 pb-28 lg:pt-36 lg:pb-36">
          <div className="flex flex-col items-center">
            {/* Entry eyebrow */}
            <MaskText delay={0.1}>
              <p className="eyebrow">AI-Powered Software Agency</p>
            </MaskText>

            <BrandTitle className="mt-5 text-6xl sm:text-7xl lg:text-[88px]" />

            {/* Tagline — styled subtitle */}
            <MaskText delay={0.7} className="mt-6">
              <p className="flex items-center justify-center gap-2 text-base font-medium tracking-tight text-mint/90 sm:text-xl">
                <span className="h-px w-6 bg-mint/30" />
                From Vision to Version.
                <span className="h-px w-6 bg-mint/30" />
              </p>
            </MaskText>

            {/* Thin divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mt-5 h-px w-24"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(52,217,154,0.5), transparent)' }}
            />

            <MaskText delay={0.8} className="mt-8">
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-sub sm:text-lg md:text-xl">
                We build MVPs, <span className="font-bold text-text">AI web</span> apps, business <span className="font-bold text-text">websites</span> and dashboards <br className="hidden md:block" />
                — shipped in days, not months.
              </p>
            </MaskText>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Magnetic>
                <Link to="/contact" className="cta-btn">
                  Launch Your Project <ArrowRight size={15} className="ml-2" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link to="/portfolio" className="outline-btn">
                  View Our Work
                </Link>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="mt-8 flex flex-wrap justify-center gap-5"
            >
              {['30+ Projects', '98% Satisfaction', 'India Based'].map((b) => (
                <span key={b} className="flex items-center gap-2 text-xs text-muted">
                  <CheckCircle2 size={12} className="text-mint" />
                  {b}
                </span>
              ))}
            </motion.div>
          </div>
        </BoutiqueReveal>
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
                <InteractiveCard className="feature-card h-full">
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
                </InteractiveCard>
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
                    <InteractiveCard className="p-5 h-full">
                      <div className="icon-box mb-3">
                        <Icon size={16} />
                      </div>
                      <h3 className="font-display text-sm font-bold text-text">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-sub">{item.desc}</p>
                    </InteractiveCard>
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
              <InteractiveCard className="group overflow-hidden h-full p-0">
                {/* Preview area */}
                <div className="relative h-44 bg-surface/30 flex items-center justify-center border-b border-white/5">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="absolute right-3 top-3 rounded-full bg-mint/10 px-2.5 py-0.5 text-[10px] font-semibold text-mint">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-text">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sub">{item.description}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag bg-white/5">{tag}</span>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Magnetic strength={0.2}>
                      <a href="#" className="portfolio-btn text-xs">
                        Live Demo <ArrowUpRight size={12} className="ml-1" />
                      </a>
                    </Magnetic>
                    <Magnetic strength={0.2}>
                      <a href="#" className="portfolio-btn text-xs">
                        GitHub <Github size={12} className="ml-1" />
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </InteractiveCard>
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
