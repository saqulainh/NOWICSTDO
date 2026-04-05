import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';

export default function About() {
  return (
    <section className="container-shell py-16">
      <SectionHeading
        eyebrow="About"
        title="We are builders obsessed with outcomes"
        description="Nowic Studio partners with founders and teams to design, build, and launch high-performance digital products."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <ScrollReveal className="glass-card p-7">
          <h3 className="font-display text-2xl font-semibold text-text">Our Value Prop</h3>
          <p className="mt-4 leading-relaxed text-text/75">
            We are Nowic Studio. We build tech that works. For founders, creators, and businesses who need
            results, not excuses. Fast deployment. Premium quality. Zero fluff.
          </p>
        </ScrollReveal>

        <ScrollReveal className="neo-card p-7" delay={0.1}>
          <h3 className="font-display text-2xl font-semibold text-text">What Makes Us Different</h3>
          <ul className="mt-4 space-y-3 text-text/75">
            <li>Execution-first process with tight product sprints</li>
            <li>High-end UI/UX quality from day one</li>
            <li>Scalable architecture and maintainable codebase</li>
            <li>Transparent collaboration with weekly progress demos</li>
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
