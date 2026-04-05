import { motion } from 'framer-motion';
import { services } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';

export default function Services() {
  return (
    <section className="container-shell py-16">
      <SectionHeading
        eyebrow="Services"
        title="End-to-end product execution"
        description="Nowic Studio ships high-impact software with premium UI and practical business outcomes."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <ScrollReveal key={service.title} delay={idx * 0.08}>
              <motion.article whileHover={{ y: -6 }} className="glass-card p-7">
                <Icon className="text-mint" size={22} />
                <p className="mt-4 text-sm uppercase tracking-[0.18em] text-cyan/80">{service.title}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-text">{service.headline}</h3>
                <p className="mt-3 text-text/70">{service.description}</p>
              </motion.article>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
