<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 font-sans">

    <div class="max-w-7xl mx-auto mb-12">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">TC Hardt Design System</h1>
      <p class="text-gray-500">
        Live-Werte aus der <code>main.css</code>. Änderungen dort werden hier automatisch reflektiert.
      </p>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">

      <div
        v-for="palette in palettes"
        :key="palette.key"
        class="space-y-4"
      >
        <div class="flex items-center gap-3 mb-2">
          <div
            class="w-12 h-12 rounded-xl shadow-lg ring-1 ring-gray-900/10"
            :style="{ backgroundColor: `var(--color-${palette.key}-${palette.base})` }"
          />
          <div>
            <h2 class="font-bold text-gray-900 dark:text-white">{{ palette.label }}</h2>
            <p class="text-xs text-gray-500">Variable: --color-{{ palette.key }}-*</p>
          </div>
        </div>

        <div class="flex flex-col rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
          <div
            v-for="step in steps"
            :key="step"
            class="h-10 px-4 flex items-center justify-between text-xs font-mono transition-all hover:scale-105 hover:shadow-md hover:z-10 origin-left"
            :style="{
              backgroundColor: `var(--color-${palette.key}-${step})`,
              color: getContrastColor(resolvedColors[`${palette.key}-${step}`])
            }"
          >
            <span class="font-bold">{{ step }}</span>
            <span class="opacity-80 uppercase">{{ resolvedColors[`${palette.key}-${step}`] || 'loading...' }}</span>
          </div>
        </div>
      </div>

    </div>

    <div class="max-w-7xl mx-auto">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">UI Komponenten Check</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-heroicons-sun" class="w-6 h-6 text-brand-dark-500" />
            <h3 class="font-bold text-lg text-gray-900">Light Mode Context</h3>
          </div>
          <div class="space-y-6">
            <div class="flex flex-wrap gap-4 items-center">
              <button class="px-5 py-2.5 rounded-lg font-bold bg-brand-dark-800 text-white hover:bg-brand-dark-900 transition shadow-lg shadow-brand-dark-900/20">
                Primary (Navy)
              </button>
              <button class="px-5 py-2.5 rounded-lg font-bold bg-accent-500 text-white hover:bg-accent-600 transition shadow-lg shadow-accent-500/30">
                Action (Orange)
              </button>
            </div>
            <div class="flex gap-3">
              <span class="px-2.5 py-1 rounded-md text-xs font-bold bg-highlight-100 text-highlight-800 border border-highlight-200">Neu</span>
              <span class="px-2.5 py-1 rounded-md text-xs font-bold bg-brand-dark-50 text-brand-dark-700 border border-brand-dark-100">Info</span>
            </div>
          </div>
        </div>

        <div class="bg-brand-dark-950 p-8 rounded-2xl shadow-xl border border-brand-dark-900">
          <div class="flex items-center gap-2 mb-6">
            <UIcon name="i-heroicons-moon" class="w-6 h-6 text-brand-light-400" />
            <h3 class="font-bold text-lg text-white">Dark Mode Context</h3>
          </div>
          <div class="space-y-6">
            <div class="flex flex-wrap gap-4 items-center">
              <button class="px-5 py-2.5 rounded-lg font-bold bg-brand-dark-600 text-white hover:bg-brand-dark-500 transition border border-brand-dark-500">
                Primary (Light Navy)
              </button>
              <button class="px-5 py-2.5 rounded-lg font-bold bg-accent-500 text-white hover:bg-accent-400 transition shadow-lg shadow-accent-500/20">
                Action (Orange)
              </button>
            </div>
            <div class="flex gap-3">
              <span class="px-2.5 py-1 rounded-md text-xs font-bold bg-highlight-900/30 text-highlight-300 border border-highlight-800">Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'

// 1. Konfiguration: Welche Paletten gibt es?
const palettes = [
  { key: 'brand-dark', label: 'Brand Dark (Navy)', base: '800' },
  { key: 'brand-light', label: 'Brand Light (Sky)', base: '400' },
  { key: 'highlight', label: 'Highlight (Lime)', base: '400' },
  { key: 'accent', label: 'Accent (Orange)', base: '500' }
]

const steps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']

// 2. State für die ausgelesenen Hex-Werte
const resolvedColors = reactive({})

// 3. Helper: RGB String zu Hex konvertieren (Browser geben oft "rgb(r, g, b)" zurück)
const rgbToHex = (rgbStr) => {
  if (!rgbStr) return null
  // Falls es schon Hex ist
  if (rgbStr.startsWith('#')) return rgbStr

  const rgb = rgbStr.match(/\d+/g)
  if (!rgb) return null

  return "#" +
    ("0" + parseInt(rgb[0], 10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2)
}

// 4. Farben auslesen wenn Komponente gemountet ist (Browser Access nötig)
onMounted(() => {
  const styles = getComputedStyle(document.documentElement)

  palettes.forEach(palette => {
    steps.forEach(step => {
      // Wir bauen den Variablennamen: z.B. --color-brand-dark-500
      const varName = `--color-${palette.key}-${step}`
      const value = styles.getPropertyValue(varName).trim()

      // Speichern (konvertiert zu Hex für die Anzeige und Kontrast-Berechnung)
      resolvedColors[`${palette.key}-${step}`] = rgbToHex(value) || value
    })
  })
})

// 5. Kontrast Berechnung für Textfarbe (Schwarz/Weiß)
function getContrastColor(hex) {
  if (!hex || !hex.startsWith('#')) return 'black' // Fallback

  const r = parseInt(hex.substr(1, 2), 16)
  const g = parseInt(hex.substr(3, 2), 16)
  const b = parseInt(hex.substr(5, 2), 16)

  // YIQ Formel für Helligkeit
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return (yiq >= 128) ? 'black' : 'white'
}
</script>
