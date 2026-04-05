import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Code2, Layers, Rocket, Sparkles, Users, Bot } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import BrandLogo from '../components/BrandLogo';
import { teamValues, whyUs } from '../data/content';

const team = [
  {
    name: 'Nowic Studio Team',
    role: 'Founders & Builders',
    bio: 'A tight-knit team of senior developers, designers, and AI specialists — obsessed with shipping products that actually work.',
    bg: 'from-mint/20 via-jade/10 to-emerald/15',
  },
];

const milestones = [
  { year: '2023', title: 'Studio Founded',      desc: 'Nowic Studio was born from a simple belief: great products deserve great execution.' },
  { year: '2024', title: '25+ Projects Shipped', desc: 'Expanded from websites to full-stack platforms, AI apps, and healthcare solutions.' },
  { year: '2025', title: 'AI-First Workflow',    desc: 'Integrated AI-powered development workflows for 3× faster product delivery.' },
  { year: '2026', title: '50+ Projects & Growing', desc: 'Serving founders, businesses, and enterprises across India and globally.' },
];

export default function About() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-24">
        <div
          className="pointer-events-none absolute inset-x-0 -top-20 h-64"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(52,232,161,0.18) 0%, transparent 70%)' }}
        />
        <div className="grid-dots pointer-events-none absolute inset-0 opacity-30" />

        <div className="container-shell relative">
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <ScrollReveal>
                <span className="eyebrow-pill">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#34e8a1' }} />
                  About Us
                </span>
                <h1 className="mt-6 font-display text-5xl font-extrabold leading-tight text-text sm:text-6xl">
                  We are builders{' '}
                  <span className="text-gradient">obsessed with outcomes</span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  Nowic Studio partners with founders and teams to design, build, and launch high-performance digital products — faster than you think is possible.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/contact" className="cta-btn">
                    <span>Work With Us</span>
                    <ArrowRight size={15} className="ml-2 relative z-10" />
                  </Link>
                  <Link to="/portfolio" className="outline-btn">View Our Work</Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Brand card */}
            <ScrollReveal delay={0.15}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="glass-card overflow-hidden p-8 text-center"
              >
                <div
                  className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-3xl"
                  style={{
                    background: 'linear-gradient(145deg, rgba(52,232,161,0.15), rgba(31,200,125,0.08))',
                    border: '1px solid rgba(52,232,161,0.25)',
                    boxShadow: '0 0 40px rgba(52,232,161,0.18)',
                  }}
                >
                  <BrandLogo variant="full" className="h-24 w-24" />
                </div>
                <p className="font-display text-2xl font-extrabold text-text">Nowic Studio</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.28em] text-muted">Vision to Version</p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { val: '50+',  label: 'Projects' },
                    { val: '98%',  label: 'Satisfaction' },
                    { val: '21d',  label: 'Avg Launch' },
                    { val: '3+',   label: 'Years Building' },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl p-3"
                      style={{ background: 'rgba(52,232,161,0.07)', border: '1px solid rgba(52,232,161,0.12)' }}
                    >
                      <p className="number-stat text-xl font-extrabold">{s.val}</p>
                      <p className="text-2xs uppercase tracking-widest text-muted">{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Value Prop ── */}
      <section className="relative py-24">
        <div className="section-divider absolute inset-x-0 top-0" />
        <div className="container-shell">
          <SectionHeading
            eyebrow="Our Philosophy"
            title="What makes us |different"
            description="We don't just write code — we engineer outcomes with speed, craft, and clarity."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {whyUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} delay={i * 0.07}>
                  <motion.div
                    whileHover={{ y: -6 }}
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
      </section>

      {/* ── Timeline ── */}
      <section className="relative py-24">
        <div className="section-divider absolute inset-x-0 top-0" />

        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(52,232,161,0.07), transparent 55%)' }}
        />

        <div className="container-shell relative">
          <SectionHeading
            eyebrow="Our Journey"
            title="The |Nowic Studio story"
            description="From a simple idea to a studio trusted by founders across industries."
          />

          <div className="relative mt-14 mx-auto max-w-3xl">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(52,232,161,0.35) 20%, rgba(52,232,161,0.35) 80%, transparent)' }}
            />

            <div className="space-y-10 pl-16">
              {milestones.map((m, i) => (
                <ScrollReveal key={m.year} delay={i * 0.1}>
                  <div className="relative">
                    {/* Dot */}
                    <div
                      className="absolute -left-16 flex h-12 w-12 items-center justify-center rounded-2xl font-display text-xs font-extrabold"
                      style={{
                        background: 'linear-gradient(135deg, rgba(52,232,161,0.2), rgba(31,200,125,0.12))',
                        border: '1px solid rgba(52,232,161,0.35)',
                        color: '#34e8a1',
                        boxShadow: '0 0 24px rgba(52,232,161,0.2)',
                      }}
                    >
                      {m.year.slice(2)}
                    </div>

                    <div className="neo-card p-6">
                      <span className="text-2xs font-bold uppercase tracking-[0.25em] text-mint">{m.year}</span>
                      <h3 className="mt-2 font-display text-xl font-bold text-text">{m.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{m.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="container-shell py-24">
        <ScrollReveal>
          <div
            className="relative overflow-hidden rounded-4xl p-10 sm:p-14"
            style={{
              background: 'linear-gradient(145deg, #0d2e1c 0%, #081f12 100%)',
              border: '1px solid rgba(52,232,161,0.18)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
            }}
          >
            <div className="pointer-events-none absolute inset-x-0 -top-16 h-40" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(52,232,161,0.15), transparent 60%)' }} />
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" />

            <div className="relative grid gap-10 lg:grid-cols-2">
              <div>
                <span className="eyebrow-pill">Our Values</span>
                <h2 className="mt-6 font-display text-3xl font-extrabold text-text sm:text-4xl">
                  Principles we build by
                </h2>
                <p className="mt-4 text-muted">
                  Every decision at Nowic Studio is guided by these core principles that keep us focused on what matters most.
                </p>
              </div>
              <ul className="space-y-4">
                {teamValues.map((v, i) => (
                  <motion.li
                    key={v}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-mint" />
                    <span className="text-sm font-medium text-text">{v}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
