import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Zap, MessageCircle } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import { brand } from '../data/content';

const contactInfo = [
  { icon: Mail,   label: 'Email',    value: brand.email,    href: `mailto:${brand.email}` },
  { icon: Phone,  label: 'Phone',    value: brand.phone,    href: `tel:${brand.phone}` },
  { icon: MapPin, label: 'Location', value: brand.location, href: '#' },
];

const promise = [
  { icon: Clock,         text: 'Response within 24 hours' },
  { icon: CheckCircle2,  text: 'Free project roadmap included' },
  { icon: Zap,           text: 'No-commitment discovery call' },
  { icon: MessageCircle, text: 'Direct access to founders' },
];

const projectTypes = ['MVP Development', 'Business Website', 'AI Web App', 'Admin Dashboard', 'SaaS Platform', 'API / Backend', 'Other'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' });
  const [sent, setSent] = useState(false);
  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <>
      {/* Hero */}
      <section className="relative py-20">
        <div
          className="pointer-events-none absolute inset-x-0 -top-20 h-60"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(52,217,154,0.06) 0%, transparent 70%)' }}
        />
        <div className="container-shell relative">
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something |great together"
            description="Share your idea and we'll get back with a clear plan — no fluff, no spam."
          />
        </div>
      </section>

      {/* Main */}
      <section className="container-shell pb-20">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">

          {/* Left */}
          <div className="space-y-4">
            <ScrollReveal>
              <div className="card p-6">
                <h3 className="font-display text-lg font-bold text-text">Get In Touch</h3>
                <p className="mt-1.5 text-sm text-sub">Reach out — we're happy to help.</p>
                <div className="mt-5 space-y-3">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-surface"
                    >
                      <div className="icon-box shrink-0 h-9 w-9">
                        <Icon size={15} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-muted">{label}</p>
                        <p className="text-sm font-medium text-text">{value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.06}>
              <div className="card p-6">
                <h3 className="font-display text-sm font-bold text-text">Our Promise</h3>
                <ul className="mt-4 space-y-2.5">
                  {promise.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-2.5 text-sm text-sub">
                      <Icon size={14} className="shrink-0 text-mint" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="rounded-xl bg-surface p-4 text-center" style={{ border: '1px solid #1e2028' }}>
                <p className="flex items-center justify-center gap-2 text-sm font-medium text-text">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-50" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint" />
                  </span>
                  Accepting new projects
                </p>
                <p className="mt-1 text-xs text-muted">Limited slots for Q2 2026</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Form */}
          <ScrollReveal delay={0.05}>
            <div className="card p-7">
              {!sent ? (
                <>
                  <h3 className="font-display text-xl font-bold text-text">Start a Project</h3>
                  <p className="mt-1.5 text-sm text-sub">We'll respond within 24 hours.</p>

                  <form onSubmit={handleSubmit} className="mt-6 grid gap-3.5" id="contact-form">
                    <div className="grid gap-3.5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium uppercase tracking-[0.15em] text-muted">Name *</label>
                        <input id="contact-name" name="name" required value={form.name} onChange={handleChange} placeholder="John Doe" className="field" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium uppercase tracking-[0.15em] text-muted">Email *</label>
                        <input id="contact-email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="john@company.com" className="field" />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium uppercase tracking-[0.15em] text-muted">Project Type</label>
                      <select id="contact-type" name="type" value={form.type} onChange={handleChange} className="field" style={{ cursor: 'pointer' }}>
                        <option value="" disabled>Select type...</option>
                        {projectTypes.map((pt) => (
                          <option key={pt} value={pt} style={{ background: '#0e0f14', color: '#f0f0f3' }}>{pt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium uppercase tracking-[0.15em] text-muted">Project Details *</label>
                      <textarea id="contact-message" name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Describe your idea, goals, and timeline..." className="field resize-none" />
                    </div>

                    <motion.button
                      type="submit"
                      id="contact-submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="cta-btn mt-1 w-fit"
                    >
                      Send Inquiry <Send size={14} className="ml-2" />
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-14 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-mint/10">
                    <CheckCircle2 size={32} className="text-mint" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-text">Sent! 🎉</h3>
                  <p className="mt-2 max-w-sm text-sm text-sub">
                    We'll review your project and get back within 24 hours.
                  </p>
                  <button
                    onClick={() => { setForm({ name: '', email: '', type: '', message: '' }); setSent(false); }}
                    className="outline-btn mt-6"
                  >
                    Send Another
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
