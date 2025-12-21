import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        tennis: {
          50: '#f4faff',
          100: '#eef8ff',
          200: '#dceeff',
          300: '#b4ddf8',
          400: '#7ac7ea', // Dein Hellblau (als Basis für Hover/Light)
          500: '#7ac7ea', // Dein Hellblau (Hauptfarbe für Buttons!)
          600: '#4fa3d6',
          700: '#3282b8',
          800: '#1c3063', // Dein Dunkelblau
          900: '#1c3063', // Dein Dunkelblau (verstärkt)
          950: '#122045'
        }
      }
    }
  }
}
