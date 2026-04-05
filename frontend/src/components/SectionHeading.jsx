import ScrollReveal from './ScrollReveal';

export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  return (
    <ScrollReveal
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}
      delay={0.05}
    >
      {eyebrow && (
        <span className="eyebrow-pill mb-6 inline-flex">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: 'linear-gradient(135deg,#5fffc0,#34e8a1)' }}
          />
          {eyebrow}
        </span>
      )}

      <h2 className="font-display text-3xl font-extrabold leading-tight text-text sm:text-4xl lg:text-5xl">
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
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
