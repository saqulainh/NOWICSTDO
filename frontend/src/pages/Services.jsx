import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import { services, faqs } from '../data/content';
import { useState } from 'react';

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
      className="neo-card overflow-hidden"
    >
      <button
        type="button"
        id={`faq-${index}`}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
      >
        <span className="font-display text-base font-semibold text-text">{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-xl font-light text-mint"
        >
          +
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-6 text-sm leading-relaxed text-muted">{item.a}</p>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-24">
        <div
          className="pointer-events-none absolute inset-x-0 -top-20 h-64"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(52,232,161,0.18) 0%, transparent 70%)' }}
        />
        <div className="grid-dots pointer-events-none absolute inset-0 opacity-30" />

        <div className="container-shell relative text-center">
          <SectionHeading
            eyebrow="Services"
            title="End-to-end product |execution"
            description="From idea to launch — we handle strategy, design, development, and delivery so you can focus on growth."
          />
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="container-shell pb-24">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.title} delay={idx * 0.07}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                  className="glass-card group h-full p-7"
                >
                  {/* Icon */}
                  <span className="icon-badge">
                    <Icon size={22} />
                  </span>

                  <p className="mt-5 text-2xs font-bold uppercase tracking-[0.25em] text-mint">
                    {service.title}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-text">{service.headline}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>

                  {/* Feature bullets */}
                  <ul className="mt-6 space-y-2.5">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-muted">
                        <CheckCircle2 size={14} className="shrink-0 text-mint" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Hover CTA */}
                  <Link
                    to="/contact"
                    className="mt-7 flex items-center gap-1.5 text-xs font-semibold text-mint opacity-0 transition-all duration-300 group-hover:opacity-100"
                  >
                    Start This Project <ArrowRight size={13} />
                  </Link>
                </motion.article>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ── Process Section ── */}
      <section className="relative py-24">
        <div className="section-divider absolute inset-x-0 top-0" />
        <div className="container-shell">
          <SectionHeading
            eyebrow="Our Process"
            title="How we go from idea to |launch"
            description="A clear, repeatable framework that delivers results every single time."
          />

          <div className="mt-14 grid gap-0 md:grid-cols-4">
            {[
              { step: '01', title: 'Discovery',    desc: 'We understand your goals, users, and constraints in a focused call.' },
              { step: '02', title: 'Architecture', desc: 'We design the system, tech stack, and project roadmap with timelines.' },
              { step: '03', title: 'Build',        desc: 'We sprint through development with daily updates and weekly demos.' },
              { step: '04', title: 'Launch',       desc: 'We deploy, test, and hand over with full documentation and support.' },
            ].map((p, i) => (
              <ScrollReveal key={p.step} delay={i * 0.1}>
                <div className="relative p-6">
                  {/* Connector line */}
                  {i < 3 && (
                    <div
                      className="absolute right-0 top-10 z-10 hidden h-px w-1/2 md:block"
                      style={{ background: 'linear-gradient(90deg, rgba(52,232,161,0.4), transparent)' }}
                    />
                  )}

                  <span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl font-display text-lg font-extrabold"
                    style={{
                      background: 'linear-gradient(135deg, rgba(52,232,161,0.2), rgba(31,200,125,0.12))',
                      border: '1px solid rgba(52,232,161,0.3)',
                      color: '#34e8a1',
                    }}
                  >
                    {p.step}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-text">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="container-shell py-24">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked |questions"
          description="Everything you need to know before we start building together."
        />
        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((item, i) => (
            <FAQItem key={item.q} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="container-shell pb-24">
        <ScrollReveal>
          <div
            className="relative overflow-hidden rounded-4xl p-10 text-center sm:p-14"
            style={{
              background: 'linear-gradient(145deg, #0d2e1c 0%, #081f12 100%)',
              border: '1px solid rgba(52,232,161,0.2)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.4), 0 0 60px rgba(52,232,161,0.1)',
            }}
          >
            <div className="pointer-events-none absolute inset-x-0 -bottom-12 h-48" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(52,232,161,0.15), transparent 60%)' }} />
            <span className="eyebrow-pill">Let's Build</span>
            <h3 className="mt-6 font-display text-3xl font-extrabold text-text sm:text-4xl">
              Ready to kick off your project?
            </h3>
            <p className="mx-auto mt-4 max-w-lg text-muted">
              Tell us your idea and we'll come back with a clear plan, timeline, and budget estimate — no fluff.
            </p>
            <Link to="/contact" className="cta-btn mt-8 inline-flex px-8 py-4 text-base">
              <span>Book a Free Discovery Call</span>
              <ArrowRight size={16} className="ml-2 relative z-10" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
