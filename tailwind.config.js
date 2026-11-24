/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        palletio: {
          accent: '#e5ff00',
          gold: '#ffcd4d',
          dark: '#121212',
          card: '#181818',
          text: '#ffffff',
          subtext: '#a0a0a0',
        }
      },
      transitionTimingFunction: {
        'palletio-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
      }
    },
  },
  plugins: [],
}
