<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

// Loggt die Fehlerdetails immer in der Konsole, nicht auf der UI
if (import.meta.client) {
  console.error('Ein Fehler ist aufgetreten:', props.error)
}

const is404 = computed(() => props.error?.statusCode === 404)

const errorLabel = computed(() => `Fehler ${props.error?.statusCode}`)
const bgNumber = computed(() => props.error?.statusCode)

const title = computed(() => is404.value ? 'Satzball vergeben.' : 'Doppelfehler.')
const description = computed(() => is404.value
  ? 'Der Ball ist leider knapp im Seitenaus gelandet. Die gesuchte Seite konnten wir auf dem Platz nicht finden.'
  : 'Unser Aufschlag war nicht im Feld. Ein unerwarteter Fehler ist aufgetreten, aber wir holen uns den nächsten Punkt.')

const handleError = () => clearError({ redirect: '/' })

useHead({
  title: computed(() => `${props.error?.statusCode} - ${title.value} | TC Hardt`),
  htmlAttrs: { lang: 'de' }
})
</script>

<template>
  <div class="error-page-wrapper-fixed">
    <div class="net-background" />
    <div class="bg-number">
      {{ bgNumber }}
    </div>

    <div class="container">
      <div class="error-label">
        {{ errorLabel }}
      </div>
      <h1>{{ title }}</h1>
      <p>
        {{ description }}
      </p>
      
      <a href="#" class="btn" @click.prevent="handleError">Zurück zur Startseite</a>
    </div>
  </div>
</template>

<style>
/* 
  Diese Styles sind GLOBAL, aber durch den Wrapper .error-page-wrapper-fixed
  sehr spezifisch, um Konflikte zu vermeiden. Dieser Ansatz hat sich
  bei der Nuxt-Fehlerseite als am zuverlässigsten erwiesen.
*/
.error-page-wrapper-fixed {
  --white: #FFFDF7;
  --brand-dark: #1C3063;
  --brand-light: #7AC7EA;
  --highlight: #A3E635;

  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: var(--white);
  color: var(--brand-dark);
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}

.error-page-wrapper-fixed .net-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0.15;
    background-image: 
        linear-gradient(var(--brand-light) 1px, transparent 1px),
        linear-gradient(90deg, var(--brand-light) 1px, transparent 1px);
    background-size: 50px 50px;
}

.error-page-wrapper-fixed .container {
    position: relative;
    z-index: 10;
    text-align: center;
    padding: 40px;
    background: rgba(255, 253, 247, 0.8);
    backdrop-filter: blur(5px);
    border-radius: 12px;
}

.error-page-wrapper-fixed .error-label {
    display: inline-block;
    background-color: var(--highlight);
    color: var(--brand-dark);
    padding: 4px 12px;
    font-weight: 800;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 1.5rem;
    border-radius: 2px;
}

.error-page-wrapper-fixed h1 {
    font-size: 3.5rem;
    margin: 0 0 1rem 0;
    font-weight: 800;
    letter-spacing: -1.5px;
}

.error-page-wrapper-fixed p {
    font-size: 1.25rem;
    color: var(--brand-dark);
    opacity: 0.7;
    max-width: 450px;
    margin: 0 auto 2.5rem auto;
    line-height: 1.5;
}

.error-page-wrapper-fixed .btn {
    display: inline-block;
    background-color: var(--brand-dark);
    color: var(--white);
    padding: 18px 40px;
    text-decoration: none;
    font-weight: 700;
    border-radius: 8px;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 10px 20px rgba(28, 48, 99, 0.2);
}

.error-page-wrapper-fixed .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(28, 48, 99, 0.3);
}

.error-page-wrapper-fixed .bg-number {
    position: absolute;
    font-size: 25vw;
    font-weight: 900;
    color: var(--brand-dark);
    opacity: 0.03;
    z-index: 0;
    bottom: -5%;
    right: -2%;
    user-select: none;
}
</style>