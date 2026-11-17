<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: true
  },
  text: {
    type: String,
    default: 'Ladevorgang...'
  },
  useRandomText: {
    type: Boolean,
    default: false
  },
  textDuration: {
    type: Number,
    default: 3000
  },
  ballColorStart: {
    type: String,
    default: '#a7d9f1'
  },
  ballColorMid: {
    type: String,
    default: '#7ac7ea'
  },
  ballColorEnd: {
    type: String,
    default: '#5aa9d4'
  },
  overlayClass: {
    type: String,
    default: ''
  }
})

const loadingTexts = [
  'Platzpflege läuft...',
  'Schläger wird frisch bespannt...',
  'Neue Bälle werden geöffnet...',
  'Sand wird noch kurz abgezogen...',
  'Wärme auf für den ersten Aufschlag...',
  'Spiel, Satz, Ladevorgang...',
  'Betrete den Court...',
  'Matchball wird vorbereitet...'
]

const displayedText = ref(props.text)
let intervalId = null

function setRandomText() {
  const currentText = displayedText.value
  let newText = currentText
  while (newText === currentText && loadingTexts.length > 1) {
    const randomIndex = Math.floor(Math.random() * loadingTexts.length)
    newText = loadingTexts[randomIndex]
  }
  displayedText.value = newText
}

watch(() => props.isLoading, (isLoading) => {
  if (isLoading && props.useRandomText) {
    setRandomText()
    if (import.meta.client) {
      intervalId = setInterval(setRandomText, props.textDuration)
    }
  } else {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
    if (!props.useRandomText) {
      displayedText.value = props.text
    }
  }
}, { immediate: true })

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

const textureStyle = computed(() => ({
  background: `radial-gradient(circle at 50% 50%, ${props.ballColorStart} 0%, ${props.ballColorMid} 45%, ${props.ballColorEnd} 100%)`
}))
</script>

<template>
  <Transition name="fade">
    <div v-if="isLoading" class="loading-layer">
      <div :class="['backdrop', overlayClass]" />

      <div class="content">
        <div class="loader-container">
          <div class="bounce-wrapper">
            <div class="ball-container">
              <div class="spinning-texture-layer" :style="textureStyle" />
              <div class="static-lighting-layer" />
            </div>
          </div>
          <div class="shadow" />
        </div>

        <div v-if="displayedText" class="loading-text">
          {{ displayedText }}
        </div>
      </div>

      <svg class="hidden-svg">
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
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.2 0"
              in="noise"
              result="coloredNoise"
            />
            <feBlend
              in="SourceGraphic"
              in2="coloredNoise"
              mode="multiply"
            />
          </filter>
        </defs>
      </svg>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.loading-layer {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.backdrop {
  position: absolute;
  inset: 0;
  background-color: rgb(15 23 48 / 0.9);
  backdrop-filter: blur(4px);
}

.content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-text {
  margin-top: var(--space-8);
  margin-bottom: var(--space-6);
  color: var(--color-white);
  font-size: 1.125rem;
  letter-spacing: 0.05em;
  font-weight: 400;
  filter: drop-shadow(0 4px 6px rgb(0 0 0 / 0.25));
}

.hidden-svg {
  width: 0;
  height: 0;
  position: absolute;
  z-index: -1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.loader-container {
  position: relative;
  width: 100px;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}

.bounce-wrapper {
  width: 80px;
  height: 80px;
  animation: bounce 1.2s infinite;
}

.ball-container {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.spinning-texture-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  filter: url(#felt-texture);
  animation: spin 1.5s linear infinite;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border: 4px solid rgba(230, 230, 230, 0.8);
    border-radius: 50%;
    width: 55px;
    height: 55px;
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.4), 0 0 2px rgba(0, 0, 0, 0.4);
    filter: blur(0.5px);
  }

  &::before { top: -15px; left: -20px; }
  &::after { bottom: -15px; right: -20px; }
}

.static-lighting-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow:
    inset -8px -8px 15px rgba(0, 0, 0, 0.6),
    inset 5px 5px 15px rgba(255, 255, 255, 0.6),
    inset 0 0 20px rgba(122, 199, 234, 0.5);
  pointer-events: none;
  z-index: 2;
}

.shadow {
  width: 60px;
  height: 12px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  position: absolute;
  bottom: -6px;
  filter: blur(4px);
  animation: shadowBounce 1.2s infinite;
  z-index: 0;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-160px) scaleY(1.05) scaleX(0.95);
    animation-timing-function: ease-in;
  }
  45% { transform: translateY(0px) scaleY(1) scaleX(1); }
  50% {
    transform: translateY(15px) scaleY(0.7) scaleX(1.25);
    animation-timing-function: ease-out;
  }
  55% {
    transform: translateY(0px) scaleY(1) scaleX(1);
    animation-timing-function: ease-out;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes shadowBounce {
  0%, 100% {
    transform: scale(0.4);
    opacity: 0.2;
    animation-timing-function: ease-in;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.9;
    animation-timing-function: ease-out;
  }
}
</style>
