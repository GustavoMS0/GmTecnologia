/** @type {import('tailwindcss').Config} */
// Configuração do Tailwind CSS v3 (portada do antigo `tailwind.config` inline do Play CDN).
// Gerar o CSS de produção:  npx tailwindcss@3.4.17 -c tailwind.config.js -o assets/css/tailwind.css --minify
module.exports = {
  content: ['./index.html', './main.js'],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9', // Sky 500
        'primary-hover': '#38bdf8', // Sky 400
        secondary: '#1e293b', // Slate 800
        dark: '#0f172a', // Slate 900
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
