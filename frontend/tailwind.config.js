/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* === Off Road Green Background === */
        bg: '#09110c',      // very dark green/black
        panel: '#101e16',   // dark green card bg
        surface: '#182c20', // lighter hover green
        elevated: '#203a29',
        border: '#233d2d',  // subtle green border

        /* === Muted Light Green Accent === */
        mint: '#bddfbc',    // Primary requested color
        jade: '#a7cfaa',    // slightly darker variation
        emerald: '#8cb88f', // even darker
        glow: '#bddfbc',

        /* === Neutral text === */
        text: '#f0f0f3',
        sub: '#b0b3c0',
        muted: '#7a8580',   // slightly green-tinted grey

        /* === Extra accent === */
        accent2: '#bddfbc', 
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0,0,0,0.4)',
        'card': '0 1px 0 rgba(255,255,255,0.04) inset, 0 12px 40px rgba(0,0,0,0.3)',
        'elevated': '0 1px 0 rgba(255,255,255,0.05) inset, 0 20px 60px rgba(0,0,0,0.4)',
        'btn': '0 2px 12px rgba(52,217,154,0.3), 0 1px 0 rgba(255,255,255,0.12) inset',
        'btn-hover': '0 4px 24px rgba(52,217,154,0.45), 0 1px 0 rgba(255,255,255,0.15) inset',
        'glow': '0 0 40px rgba(52,217,154,0.15)',
        'ring': '0 0 0 1px rgba(52,217,154,0.25)',
      },
      backgroundImage: {
        mesh: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(52,217,154,0.08) 0%, transparent 60%), linear-gradient(170deg, #060608 0%, #0a0b10 50%, #060608 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease both',
        'fade-in': 'fade-in 0.5s ease both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
};
