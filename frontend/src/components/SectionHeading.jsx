import ScrollReveal from './ScrollReveal';

export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <ScrollReveal className="mx-auto max-w-3xl text-center" delay={0.05}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-cyan/80">{eyebrow}</p>
      <h2 className="font-display text-3xl font-bold leading-tight text-text sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base text-text/70">{description}</p> : null}
    </ScrollReveal>
  );
}
