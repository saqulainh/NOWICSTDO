/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#041517',
        panel: '#0b2326',
        mint: '#56e5c0',
        cyan: '#62dfff',
        emerald: '#1eb38f',
        text: '#e8f8f4'
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(95,240,205,0.2), 0 20px 60px rgba(0,0,0,0.35)',
        neo: '12px 12px 32px #041113, -10px -10px 28px #11373b'
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at 20% 20%, rgba(88,214,255,0.22), transparent 35%), radial-gradient(circle at 80% 0%, rgba(95,240,205,0.28), transparent 35%), linear-gradient(170deg, #06181a 0%, #082024 45%, #0a151a 100%)'
      }
    }
  },
  plugins: []
};
