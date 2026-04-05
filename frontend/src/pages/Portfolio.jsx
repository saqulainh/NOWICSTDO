import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, Link as LinkIcon } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import { portfolioItems } from '../data/content';

const FILTERS = ['All', 'Full-Stack Platform', 'Business Website', 'AI Web Application', 'Healthcare Platform'];

export default function Portfolio() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? portfolioItems
    : portfolioItems.filter((p) => p.category === active);

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
            eyebrow="Portfolio"
            title="Selected products from |our studio"
            description="Real products. Real impact. Each built with precision, purpose, and premium quality."
          />
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <section className="container-shell pb-8">
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                id={`filter-${filter.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setActive(filter)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 ${
                  active === filter
                    ? 'text-[#030f09]'
                    : 'text-muted hover:text-mint'
                }`}
                style={
                  active === filter
                    ? {
                        background: 'linear-gradient(135deg, #34e8a1, #1fc87d)',
                        boxShadow: '0 4px 20px rgba(52,232,161,0.35)',
                      }
                    : {
                        background: 'rgba(52,232,161,0.07)',
                        border: '1px solid rgba(52,232,161,0.18)',
                      }
                }
              >
                {filter}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ── Grid ── */}
      <section className="container-shell pb-24">
        <motion.div
          layout
          className="grid gap-6 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -16 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card group overflow-hidden h-full"
                >
                  {/* Image / Preview area */}
                  <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${item.gradient}`}>
                    <div className="absolute inset-0 grid-lines opacity-60" />

                    {/* Central badge */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="rounded-2xl px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em]"
                        style={{
                          background: 'rgba(3,15,9,0.65)',
                          border: '1px solid rgba(52,232,161,0.25)',
                          color: '#34e8a1',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        {item.category}
                      </span>
                    </div>

                    {/* Featured badge */}
                    {item.featured && (
                      <div
                        className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          background: 'rgba(52,232,161,0.18)',
                          border: '1px solid rgba(52,232,161,0.3)',
                          color: '#5fffc0',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        ⭐ Featured
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: 'rgba(3,15,9,0.5)', backdropFilter: 'blur(6px)' }}
                    >
                      <a
                        href="#"
                        className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold"
                        style={{ background: 'linear-gradient(135deg,#34e8a1,#1fc87d)', color: '#030f09' }}
                      >
                        <LinkIcon size={13} /> Live Demo
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold"
                        style={{ background: 'rgba(52,232,161,0.15)', border: '1px solid rgba(52,232,161,0.35)', color: '#34e8a1' }}
                      >
                        <Github size={13} /> GitHub
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-text">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="tag-pill">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-muted">No projects in this category yet.</p>
        )}
      </section>

      {/* ── CTA ── */}
      <section className="container-shell pb-24">
        <ScrollReveal>
          <div
            className="relative overflow-hidden rounded-4xl p-10 text-center sm:p-14"
            style={{
              background: 'linear-gradient(145deg, #0d2e1c 0%, #081f12 100%)',
              border: '1px solid rgba(52,232,161,0.2)',
            }}
          >
            <div className="pointer-events-none absolute inset-x-0 -top-20 h-40" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(52,232,161,0.15), transparent 60%)' }} />
            <span className="eyebrow-pill">Your Project Next</span>
            <h3 className="mt-6 font-display text-3xl font-extrabold text-text sm:text-4xl">
              Want your product in <span className="text-gradient">our portfolio?</span>
            </h3>
            <p className="mx-auto mt-4 max-w-lg text-muted">
              Let's build something incredible together. Reach out and let's talk about your vision.
            </p>
            <a href="/contact" className="cta-btn mt-8 inline-flex px-8 py-4 text-base">
              <span>Start a Conversation</span>
              <ArrowUpRight size={16} className="ml-2 relative z-10" />
            </a>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
