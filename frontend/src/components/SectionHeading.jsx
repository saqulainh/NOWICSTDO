import ScrollReveal from './ScrollReveal';

export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  return (
    <ScrollReveal
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}
      delay={0.05}
    >
      {eyebrow && (
        <p className="eyebrow mb-4">{eyebrow}</p>
      )}

      <h2 className="font-display text-3xl font-bold leading-tight text-text sm:text-4xl">
        {typeof title === 'string'
          ? title.split('|').map((part, i) =>
              i % 2 === 1
                ? <span key={i} className="text-gradient">{part}</span>
                : <span key={i}>{part}</span>
            )
          : title
        }
      </h2>

      {description && (
        <p className="mt-4 text-base leading-relaxed text-sub">
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
