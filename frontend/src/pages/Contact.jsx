import { Mail, Phone, MapPin, Send } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';

export default function Contact() {
  return (
    <section className="container-shell py-16">
      <SectionHeading
        eyebrow="Contact"
        title="Launch your project with Nowic Studio"
        description="Tell us your idea and we will share a practical roadmap with timeline and budget clarity."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <ScrollReveal className="glass-card p-6">
          <h3 className="font-display text-2xl font-semibold text-text">Contact Details</h3>
          <div className="mt-6 space-y-4 text-sm text-text/80">
            <p className="flex items-center gap-3"><Mail size={16} /> hello@nowicstudio.com</p>
            <p className="flex items-center gap-3"><Phone size={16} /> +91 00000 00000</p>
            <p className="flex items-center gap-3"><MapPin size={16} /> India</p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="neo-card p-6" delay={0.08}>
          <form className="grid gap-4">
            <input className="rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm outline-none focus:border-mint/70" placeholder="Your Name" />
            <input className="rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm outline-none focus:border-mint/70" placeholder="Email Address" />
            <input className="rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm outline-none focus:border-mint/70" placeholder="Project Type" />
            <textarea rows="5" className="rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm outline-none focus:border-mint/70" placeholder="Tell us what you want to build" />
            <button type="button" className="cta-btn mt-2 w-fit">
              Send Inquiry <Send size={15} className="ml-2" />
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
