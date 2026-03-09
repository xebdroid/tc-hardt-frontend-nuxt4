<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  statusCode: {
    type: Number,
    required: true
  }
})

const is404 = computed(() => props.statusCode === 404)
const is403 = computed(() => props.statusCode === 403)

const bgNumber = computed(() => props.statusCode)
const errorLabel = computed(() => `Fehler ${props.statusCode}`)

const title = computed(() => {
  if (is404.value) return 'Satzball vergeben.'
  if (is403.value) return 'Zutritt verweigert.'
  return 'Doppelfehler.'
})

const description = computed(() => {
  if (is404.value) {
    return 'Die gesuchte Seite ist leider knapp im Seitenaus gelandet. Kehren wir zurück zum Spiel.'
  }
  if (is403.value) {
    return 'Dieser Bereich ist nur für Platzwarte oder befugte Spieler reserviert.'
  }
  return 'Unser Aufschlag war ungültig. Ein unerwarteter Fehler ist aufgetreten. Zeit für den zweiten Versuch.'
})

// Head-Tags für SEO
useHead({
  title: computed(() => `${props.statusCode} - ${title.value} | TC Hardt`),
  htmlAttrs: { lang: 'de' }
})
</script>

<template>
  <div class="error-page-animated">
    <div class="net-overlay" />
    <div class="bg-404">{{ bgNumber }}</div>

    <svg style="width: 0; height: 0; position: absolute;">
      <defs>
        <filter id="felt-texture" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" result="noise" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0" in="noise" />
          <feBlend in="SourceGraphic" mode="multiply" />
        </filter>
      </defs>
    </svg>

    <div class="ball-stage">
      <div class="ball-x">
        <div class="ball-shadow" />
        <div class="ball-y">
          <div class="ball-squash">
            <div class="ball-spin">
              <div class="spinning-texture-layer" />
              <div class="static-lighting-layer" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="error-label">{{ errorLabel }}</div>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <a href="/" class="btn">Zurück zum Clubhaus</a>
    </div>
  </div>
</template>

<style>
/* Füge HIER exakt dein langes CSS aus deiner alten error.vue ein.
  Lass es genau so wie es war, damit die Animation und das TC Hardt Styling perfekt greifen.
*/
.error-page-animated {
  --color-white: #FFFDF7;
  --brand-dark: #1C3063;
  --brand-light: #7AC7EA;
  --highlight: #A3E635;
  --ball-start: #b2e3f7;
  --ball-mid: #7ac7ea;
  --ball-end: #4a9dbf;

  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, sans-serif;
  background-color: var(--color-white);
  color: var(--brand-dark);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
/* ... restliches CSS ... */
</style>
