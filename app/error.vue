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

const bgNumber = computed(() => props.error?.statusCode)
const errorLabel = computed(() => `Fehler ${props.error?.statusCode}`)

const title = computed(() => is404.value ? 'Satzball vergeben.' : 'Doppelfehler.')
const description = computed(() => is404.value
  ? 'Die gesuchte Seite ist leider knapp im Seitenaus gelandet. Kehren wir zurück zum Spiel.'
  : 'Unser Aufschlag war ungültig. Ein unerwarteter Fehler ist aufgetreten. Zeit für den zweiten Versuch.')

const handleError = () => clearError({ redirect: '/' })

useHead({
  title: computed(() => `${props.error?.statusCode} - ${title.value} | TC Hardt`),
  htmlAttrs: { lang: 'de' }
})
</script>

<template>
  <div class="error-page-animated">
    <div class="net-overlay" />
    <div class="bg-404">
      {{ bgNumber }}
    </div>

    <svg style="width: 0; height: 0; position: absolute;">
      <defs>
        <filter
          id="felt-texture"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="3"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0"
            in="noise"
          />
          <feBlend
            in="SourceGraphic"
            mode="multiply"
          />
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
      <div class="error-label">
        {{ errorLabel }}
      </div>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <a
        href="#"
        class="btn"
        @click.prevent="handleError"
      >Zurück zum Clubhaus</a>
    </div>
  </div>
</template>

<style>
/* 
  Styles sind GLOBAL, aber durch .error-page-animated spezifisch gehalten.
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

/* 1. HINTERGRUND & 404 */
.error-page-animated .net-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.1;
  background-image: linear-gradient(var(--brand-light) 1px, transparent 1px),
    linear-gradient(90deg, var(--brand-light) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
}

.error-page-animated .bg-404 {
  position: absolute;
  bottom: -2vw;
  right: -2vw;
  font-size: 25vw;
  font-weight: 900;
  line-height: 1;
  color: var(--brand-dark);
  opacity: 0.04;
  user-select: none;
  z-index: 0;
}

/* 2. DIE BÜHNE FÜR DEN BALL */
.error-page-animated .ball-stage {
  position: relative;
  width: 100vw;
  height: 120px;
  margin-bottom: 1rem;
  z-index: 20;
  pointer-events: none;
}

.error-page-animated .ball-x {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80px;
  height: 80px;
  animation: moveX 5s cubic-bezier(0.1, 0.7, 0.3, 1) 1s both;
}

.error-page-animated .ball-y {
  width: 100%;
  height: 100%;
  animation: bounceY 5s linear 1s both;
}

.error-page-animated .ball-squash {
  width: 100%;
  height: 100%;
  transform-origin: bottom center;
  animation: squash 5s linear 1s both;
}

.error-page-animated .ball-spin {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  animation: roll 5s linear 1s both;
}

.error-page-animated .spinning-texture-layer {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(
    circle at 50% 50%,
    var(--ball-start) 0%,
    var(--ball-mid) 45%,
    var(--ball-end) 100%
  );
  filter: url(#felt-texture);
}

.error-page-animated .spinning-texture-layer::before,
.error-page-animated .spinning-texture-layer::after {
  content: "";
  position: absolute;
  border: 4px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  width: 55px;
  height: 55px;
}
.error-page-animated .spinning-texture-layer::before {
  top: -15px;
  left: -20px;
}
.error-page-animated .spinning-texture-layer::after {
  bottom: -15px;
  right: -20px;
}

.error-page-animated .static-lighting-layer {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  box-shadow: inset -8px -8px 15px rgba(0, 0, 0, 0.2),
    inset 5px 5px 15px rgba(255, 255, 255, 0.4);
  z-index: 2;
}

.error-page-animated .ball-shadow {
  position: absolute;
  bottom: -10px;
  left: 50%;
  width: 60px;
  height: 12px;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  filter: blur(4px);
  z-index: -1;
  animation: shadowBounce 5s linear 1s both;
}

/* --- PHYSIK-KEYFRAMES --- */

@keyframes moveX {
  0% {
    transform: translateX(-20vw);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    transform: translateX(110vw);
    opacity: 0;
  }
}

@keyframes bounceY {
  0% {
    transform: translateY(-25vh);
    animation-timing-function: ease-in;
  }
  15% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  28% {
    transform: translateY(-12vh);
    animation-timing-function: ease-in;
  }
  41% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  51% {
    transform: translateY(-6vh);
    animation-timing-function: ease-in;
  }
  61% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  68% {
    transform: translateY(-3vh);
    animation-timing-function: ease-in;
  }
  75% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  80% {
    transform: translateY(-1vh);
    animation-timing-function: ease-in;
  }
  85% {
    transform: translateY(0);
    animation-timing-function: linear;
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes squash {
  0%,
  13%,
  17%,
  39%,
  43%,
  59%,
  63%,
  73%,
  77%,
  83%,
  87%,
  100% {
    transform: scale(1, 1);
  }
  15% {
    transform: scale(1.2, 0.8);
  }
  41% {
    transform: scale(1.1, 0.9);
  }
  61% {
    transform: scale(1.05, 0.95);
  }
  75% {
    transform: scale(1.02, 0.98);
  }
  85% {
    transform: scale(1.01, 0.99);
  }
}

@keyframes roll {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(1080deg);
  }
}

@keyframes shadowBounce {
  0% {
    transform: translateX(-50%) scale(0.2);
    opacity: 0;
  }
  15% {
    transform: translateX(-50%) scale(1.2);
    opacity: 0.4;
  }
  28% {
    transform: translateX(-50%) scale(0.4);
    opacity: 0.1;
  }
  41% {
    transform: translateX(-50%) scale(1);
    opacity: 0.3;
  }
  51% {
    transform: translateX(-50%) scale(0.5);
    opacity: 0.1;
  }
  61% {
    transform: translateX(-50%) scale(0.9);
    opacity: 0.25;
  }
  68% {
    transform: translateX(-50%) scale(0.6);
    opacity: 0.15;
  }
  75% {
    transform: translateX(-50%) scale(0.8);
    opacity: 0.2;
  }
  80% {
    transform: translateX(-50%) scale(0.7);
    opacity: 0.15;
  }
  85%,
  100% {
    transform: translateX(-50%) scale(0.8);
    opacity: 0.2;
  }
}

/* --- 3. TEXT CONTENT --- */
.error-page-animated .container {
  position: relative;
  z-index: 30;
  text-align: center;
}

.error-page-animated .error-label {
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

.error-page-animated h1 {
  font-size: 3.5rem;
  margin: 0;
  font-weight: 900;
  letter-spacing: -2px;
}
.error-page-animated p {
  font-size: 1.2rem;
  opacity: 0.7;
  margin: 10px auto 40px auto;
  max-width: 450px;
  line-height: 1.6;
}

.error-page-animated .btn {
  display: inline-block;
  background-color: var(--brand-dark);
  color: var(--color-white);
  padding: 18px 45px;
  text-decoration: none;
  font-weight: 700;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  border: 2px solid var(--brand-dark);
}

.error-page-animated .btn:hover {
  background-color: transparent;
  color: var(--brand-dark);
  transform: translateY(-3px);
}
</style>
