import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import { services, stats, portfolioItems } from '../data/content';

const floatingCards = [
  { title: 'Sprint 01', value: 'MVP UI + API', pos: 'left-0 top-4' },
  { title: 'Sprint 02', value: 'AI Workflows', pos: 'right-2 top-20' },
  { title: 'Sprint 03', value: 'Launch Ready', pos: 'left-12 bottom-3' }
];

export default function Home() {
  return (
    <>
      <section className="container-shell pt-14 sm:pt-18">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <ScrollReveal>
              <p className="mb-6 inline-flex rounded-full border border-mint/40 bg-mint/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-mint">
                AI Startup Studio
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <h1 className="font-display text-4xl font-extrabold leading-[1.02] text-text sm:text-5xl lg:text-7xl">
                From Idea to Impact - Fast.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-text/75 sm:text-lg">
                MVP development, AI web apps, business websites, and custom dashboards - delivered in days,
                not months.
              </p>
            </ScrollReveal>

            <ScrollReveal className="mt-8 flex flex-wrap gap-3" delay={0.24}>
              <Link to="/contact" className="cta-btn">
                Launch Your Project
              </Link>
              <Link to="/portfolio" className="outline-btn">
                View Portfolio
              </Link>
            </ScrollReveal>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative h-[340px] rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f3035] via-[#0a2124] to-[#09181b] p-5 shadow-glow"
          >
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_10%_20%,rgba(95,240,205,0.18),transparent_45%),radial-gradient(circle_at_70%_10%,rgba(88,214,255,0.18),transparent_40%)]" />
            <div className="relative h-full rounded-2xl border border-white/10 bg-black/15 p-4 backdrop-blur-md">
              {floatingCards.map((card, idx) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + idx * 0.12, duration: 0.45 }}
                  className={`glass-card absolute w-40 p-3 ${card.pos}`}
                >
                  <p className="text-[11px] uppercase tracking-[0.2em] text-cyan/85">{card.title}</p>
                  <p className="mt-1 text-sm font-semibold text-text">{card.value}</p>
                </motion.article>
              ))}
              <div className="absolute inset-x-5 bottom-5 glass-card p-4">
                <p className="text-sm text-text/70">Execution Score</p>
                <p className="mt-1 font-display text-3xl font-bold text-mint">98%</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container-shell mt-24">
        <SectionHeading
          eyebrow="Core Services"
          title="Built for speed. Crafted for growth."
          description="From concept to deployment, every deliverable is engineered for momentum."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.title} delay={index * 0.06}>
                <motion.article
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                  className="glass-card h-full rounded-2xl p-6"
                >
                  <span className="inline-flex rounded-xl border border-mint/35 bg-mint/10 p-2 text-mint">
                    <Icon size={20} />
                  </span>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-cyan/80">{service.title}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-text">{service.headline}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text/70">{service.description}</p>
                </motion.article>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <section className="container-shell mt-24">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Premium build quality with startup velocity"
          description="Focused execution, AI-assisted development, and architectural clarity from day one."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="neo-card p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-cyan/80">Studio Method</p>
              <p className="mt-3 font-display text-2xl font-semibold text-text">Sidebar + Content Flow</p>
              <p className="mt-3 text-sm text-text/70">
                Strategy in the left rail. Tangible metrics on the right. A clean, minimal narrative that reveals
                with scroll.
              </p>
            </div>
          </aside>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <ScrollReveal key={stat.label} delay={index * 0.06}>
                  <article className="glass-card p-5">
                    <Icon size={20} className="text-mint" />
                    <p className="mt-4 text-xs uppercase tracking-[0.18em] text-cyan/80">{stat.label}</p>
                    <p className="mt-2 font-display text-xl font-semibold text-text">{stat.value}</p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-shell mt-24">
        <SectionHeading
          eyebrow="Featured Work"
          title="Portfolio that proves capability"
          description="Each product balances visual polish, business goals, and scalable engineering."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.08}>
              <article className="glass-card overflow-hidden rounded-2xl">
                <div className="h-44 bg-gradient-to-br from-cyan/20 via-transparent to-mint/20" />
                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold text-text">{item.title}</h3>
                  <p className="mt-2 text-sm text-text/70">{item.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs text-text/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-3">
                    <a className="outline-btn flex-1" href="#">
                      Live Demo <ArrowUpRight size={15} className="ml-2" />
                    </a>
                    <a className="outline-btn flex-1" href="#">
                      GitHub <Github size={15} className="ml-2" />
                    </a>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="container-shell mt-24">
        <ScrollReveal className="glass-card p-8 text-center sm:p-12">
          <p className="font-display text-2xl font-semibold leading-snug text-text sm:text-3xl">
            We are Nowic Studio. We build tech that works. For founders, creators, and businesses who need
            results, not excuses. Fast deployment. Premium quality. Zero fluff.
          </p>
        </ScrollReveal>
      </section>

      <section className="container-shell mt-24 pb-8">
        <ScrollReveal className="neo-card overflow-hidden p-8 text-center sm:p-12">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan/80">Let&apos;s Build</p>
          <h3 className="mt-4 font-display text-3xl font-bold text-text sm:text-4xl">
            Ready to Build Something Powerful?
          </h3>
          <Link to="/contact" className="cta-btn mt-8">
            Book a Free Demo
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
