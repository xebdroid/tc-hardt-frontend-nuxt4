import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  // Leer lassen, da Farben & Fonts jetzt in assets/css/main.css leben
  theme: {
    extend: {}
  },
  plugins: []
}
