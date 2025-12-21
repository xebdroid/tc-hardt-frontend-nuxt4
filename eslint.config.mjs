// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Dein benutzerdefinierter Block:
  {
    files: ['**/*.vue'],
    rules: {
      // 1. Die Regel für Attribute (ab 3 Attributen wird umgebrochen)
      'vue/max-attributes-per-line': ['error', {
        'singleline': { 'max': 2 },
        'multiline': { 'max': 1 }
      }],

      // 2. Das schließende ">" in eine neue Zeile (sieht sauberer aus)
      'vue/html-closing-bracket-newline': ['error', {
        'singleline': 'never',
        'multiline': 'always'
      }],

      // 3. Optional: Einrückung festzurren (2 Leerzeichen)
      'vue/html-indent': ['error', 2],
    }
  }
)
