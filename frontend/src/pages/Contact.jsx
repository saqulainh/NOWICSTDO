import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle, Clock, Zap } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import { brand } from '../data/content';

const contactInfo = [
  { icon: Mail,    label: 'Email',    value: brand.email,    href: `mailto:${brand.email}` },
  { icon: Phone,   label: 'Phone',    value: brand.phone,    href: `tel:${brand.phone}` },
  { icon: MapPin,  label: 'Location', value: brand.location, href: '#' },
];

const promise = [
  { icon: Clock,          text: 'Response within 24 hours' },
  { icon: CheckCircle2,   text: 'Free project roadmap included' },
  { icon: Zap,            text: 'No-commitment discovery call' },
  { icon: MessageCircle,  text: 'Direct access to the team founders' },
];

const projectTypes = [
  'MVP Development',
  'Business Website',
  'AI Web App',
  'Admin Dashboard',
  'SaaS Platform',
  'API / Backend',
  'Other',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

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
            eyebrow="Contact"
            title="Let's build something |great together"
            description="Share your idea and we'll get back with a clear plan, timeline, and budget — no fluff, no spam."
          />
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="container-shell pb-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">

          {/* ── Left: Info Card ── */}
          <div className="space-y-5">
            {/* Contact info */}
            <ScrollReveal>
              <div className="glass-card p-7">
                <h3 className="font-display text-xl font-bold text-text">Get In Touch</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Ready to start? Have a question? Just reach out — we don't bite.
                </p>

                <div className="mt-6 space-y-4">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="group flex items-center gap-4 rounded-2xl p-3.5 transition-all duration-200 hover:bg-mint/5"
                    >
                      <span className="icon-badge shrink-0">
                        <Icon size={16} />
                      </span>
                      <div>
                        <p className="text-2xs uppercase tracking-[0.2em] text-muted">{label}</p>
                        <p className="mt-0.5 text-sm font-medium text-text group-hover:text-mint transition-colors">
                          {value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Promise card */}
            <ScrollReveal delay={0.1}>
              <div className="neo-card p-7">
                <h3 className="font-display text-lg font-bold text-text">Our Promise</h3>
                <ul className="mt-5 space-y-3">
                  {promise.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3 text-sm text-muted">
                      <Icon size={15} className="shrink-0 text-mint" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Availability badge */}
            <ScrollReveal delay={0.15}>
              <div
                className="rounded-3xl p-5 text-center"
                style={{
                  background: 'linear-gradient(145deg, rgba(52,232,161,0.12), rgba(31,200,125,0.07))',
                  border: '1px solid rgba(52,232,161,0.22)',
                }}
              >
                <span className="flex items-center justify-center gap-2 text-sm font-semibold text-text">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: '#34e8a1' }} />
                    <span className="relative inline-flex h-3 w-3 rounded-full" style={{ background: '#34e8a1' }} />
                  </span>
                  Currently accepting new projects
                </span>
                <p className="mt-1.5 text-xs text-muted">Limited slots available for Q2 2026</p>
              </div>
            </ScrollReveal>
          </div>

          {/* ── Right: Form ── */}
          <ScrollReveal delay={0.08}>
            <div className="glass-card p-8">
              {!sent ? (
                <>
                  <h3 className="font-display text-2xl font-bold text-text">Start a Project</h3>
                  <p className="mt-2 text-sm text-muted">Fill in the details below and we'll respond within 24 hours.</p>

                  <form onSubmit={handleSubmit} className="mt-7 grid gap-4" id="contact-form">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-[0.2em] text-muted">
                          Your Name *
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="field"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-[0.2em] text-muted">
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          className="field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-[0.2em] text-muted">
                        Project Type
                      </label>
                      <select
                        id="contact-type"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="field appearance-none"
                        style={{ cursor: 'pointer' }}
                      >
                        <option value="" disabled>Select a project type...</option>
                        {projectTypes.map((pt) => (
                          <option key={pt} value={pt} style={{ background: '#0d2e1c', color: '#e2f5ec' }}>
                            {pt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-[0.2em] text-muted">
                        Tell Us About Your Project *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Describe your idea, goals, timeline, and any specific requirements..."
                        className="field resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      id="contact-submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="cta-btn mt-2 w-fit px-8 py-4 text-base"
                    >
                      <span>Send Inquiry</span>
                      <Send size={16} className="ml-2 relative z-10" />
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                    className="flex h-20 w-20 items-center justify-center rounded-3xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(52,232,161,0.2), rgba(31,200,125,0.12))',
                      border: '1px solid rgba(52,232,161,0.35)',
                      boxShadow: '0 0 40px rgba(52,232,161,0.25)',
                    }}
                  >
                    <CheckCircle2 size={36} className="text-mint" />
                  </motion.div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-text">Message Sent! 🎉</h3>
                  <p className="mt-3 max-w-sm text-sm text-muted">
                    Thanks for reaching out! We'll review your project details and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setForm({ name: '', email: '', type: '', message: '' }); setSent(false); }}
                    className="outline-btn mt-8"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
