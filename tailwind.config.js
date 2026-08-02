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
          900: '#182943', // azul marino profundo (símbolo del logo, headers, textos fuertes)
          800: '#1F3455',
          700: '#294570',
          600: '#355A8F',
          100: '#E7ECF3', // fondo suave para secciones alternas
          50:  '#F7F9FC', // fondo base, casi blanco
        },
        salud: {
          700: '#028089',
          600: '#02A5AC', // turquesa del logo (CTAs, acentos, links activos)
          400: '#4FC3C9',
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
