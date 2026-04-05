import { brand } from '../data/content';

export default function BrandLogo({
  className = '',
  imgClassName = '',
  alt = 'Nowic Studio logo',
  variant = 'full'
}) {
  const baseImgClass =
    variant === 'icon'
      ? 'h-full w-full scale-[1.34] object-cover object-top'
      : 'h-full w-full object-contain';

  return (
    <span className={`inline-flex overflow-hidden ${className}`}>
      <img
        src={brand.logoPrimary}
        alt={alt}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = brand.logoFallback;
        }}
        className={`${baseImgClass} ${imgClassName}`.trim()}
      />
    </span>
  );
}
