/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* === Core Palette (logo-matched) === */
        bg:       '#030f09',        /* near-black deep forest */
        panel:    '#081f12',        /* dark jade panel */
        surface:  '#0d2e1c',        /* elevated surface */
        border:   '#1a4a2b',        /* subtle border green */
        mint:     '#34e8a1',        /* electric mint (primary accent) */
        jade:     '#1fc87d',        /* jade green (secondary accent) */
        glow:     '#5fffc0',        /* luminous highlight */
        emerald:  '#0ea560',        /* deep emerald */
        text:     '#e2f5ec',        /* warm off-white */
        muted:    '#7db89a',        /* muted green-tinted text */
      },
      fontFamily: {
        display: ['"Clash Display"', 'Sora', 'sans-serif'],
        body:    ['"Cabinet Grotesk"', '"Space Grotesk"', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        'glow-sm':  '0 0 16px rgba(52,232,161,0.18)',
        'glow-md':  '0 0 40px rgba(52,232,161,0.22), 0 0 0 1px rgba(52,232,161,0.12)',
        'glow-lg':  '0 0 80px rgba(52,232,161,0.25), 0 4px 120px rgba(0,0,0,0.55)',
        'card':     'inset 0 1px 0 rgba(52,232,161,0.08), 0 20px 60px rgba(0,0,0,0.45)',
        'neo':      '8px 8px 24px #020d08, -6px -6px 20px #0e2516',
        'btn':      '0 4px 24px rgba(52,232,161,0.35), 0 1px 0 rgba(255,255,255,0.1) inset',
        'inner-glow': 'inset 0 0 32px rgba(52,232,161,0.06)',
      },
      backgroundImage: {
        /* Animated mesh matching logo bg */
        mesh: [
          'radial-gradient(circle at 15% 15%, rgba(52,232,161,0.14) 0%, transparent 40%)',
          'radial-gradient(circle at 85% 5%,  rgba(31,200,125,0.18) 0%, transparent 38%)',
          'radial-gradient(circle at 50% 85%, rgba(95,255,192,0.08) 0%, transparent 35%)',
          'linear-gradient(155deg, #030f09 0%, #071a0f 40%, #04120a 70%, #020c07 100%)',
        ].join(', '),
        'hero-radial': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(52,232,161,0.22) 0%, transparent 60%)',
        'card-shine': 'linear-gradient(105deg, transparent 40%, rgba(52,232,161,0.07) 50%, transparent 60%)',
        'btn-primary': 'linear-gradient(135deg, #34e8a1 0%, #1fc87d 50%, #0ea560 100%)',
        'btn-hover':   'linear-gradient(135deg, #5fffc0 0%, #34e8a1 50%, #1fc87d 100%)',
        'section-sep': 'linear-gradient(90deg, transparent, rgba(52,232,161,0.2), transparent)',
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'float-slow':  'float 9s ease-in-out infinite',
        'pulse-glow':  'pulse-glow 3s ease-in-out infinite',
        'shimmer':     'shimmer 2s linear infinite',
        'slide-up':    'slide-up 0.7s ease both',
        'spin-slow':   'spin 18s linear infinite',
        'orb-drift':   'orb-drift 15s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'border-spin': 'border-spin 4s linear infinite',
        'fade-in':     'fade-in 0.5s ease both',
        'count-up':    'count-up 1s ease both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', boxShadow: '0 0 20px rgba(52,232,161,0.2)' },
          '50%':      { opacity: '1',   boxShadow: '0 0 50px rgba(52,232,161,0.45)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'orb-drift': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%':      { transform: 'translate(30px, -20px) scale(1.05)' },
          '66%':      { transform: 'translate(-20px, 15px) scale(0.96)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        'border-spin': {
          '100%': { '--angle': '360deg' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'count-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
