import { ArrowUpRight, Github } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import { portfolioItems } from '../data/content';

export default function Portfolio() {
  return (
    <section className="container-shell py-16">
      <SectionHeading
        eyebrow="Portfolio"
        title="Selected products from our studio"
        description="Solutions designed for conversion, usability, and long-term scale."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {portfolioItems.map((item, idx) => (
          <ScrollReveal key={item.title} delay={idx * 0.08}>
            <article className="glass-card overflow-hidden">
              <div className="h-44 bg-gradient-to-br from-cyan/20 via-transparent to-mint/20" />
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold text-text">{item.title}</h3>
                <p className="mt-2 text-sm text-text/70">{item.description}</p>
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
  );
}
