/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        hipokratia: {
          900: '#0A3540', // azul petróleo profundo (headers, textos fuertes)
          800: '#0F4C5C', // azul petróleo base (marca primaria)
          700: '#15667A',
          600: '#1D82A0',
          100: '#E6F0F2', // fondo suave para secciones alternas
          50:  '#F7FAFB', // fondo base, casi blanco
        },
        salud: {
          700: '#215D33',
          600: '#2E7D32', // verde acento (CTAs, íconos destacados)
          400: '#4CA85C',
        },
      },
      fontFamily: {
        display: ['"Source Serif 4"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
