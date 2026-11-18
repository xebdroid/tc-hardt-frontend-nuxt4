<script setup lang="ts">
import BaseIcon from '~/components/base/Icon.vue'

const scrollY = ref(0)
const isVisible = computed(() => scrollY.value > 400)

function handleScroll() {
  scrollY.value = window.scrollY
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <ClientOnly>
    <div class="scroll-to-top">
      <Transition name="scroll-pop">
        <div v-if="isVisible" class="floating-anchor">
          <div class="glass-group">
            <div class="glow" />
            <div class="glass-ring">
              <button
                type="button"
                class="scroll-btn"
                aria-label="Nach oben scrollen"
                @click="scrollToTop"
              >
                <BaseIcon name="i-heroicons-arrow-up" class="icon" />
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <template #fallback>
      <div class="ssr-placeholder" />
    </template>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.scroll-to-top {
  display: none;

  @include up("sm") {
    display: block;
  }
}

.floating-anchor {
  position: fixed;
  bottom: var(--space-8);
  right: var(--space-8);
  z-index: var(--z-header);
  pointer-events: none;
}

.glass-group {
  position: relative;
  pointer-events: auto;
}

.glow {
  position: absolute;
  inset: -0.25rem;
  background-color: var(--color-gray-400);
  border-radius: var(--radius-full);
  filter: blur(8px);
  opacity: 0.1;
  transition: opacity 1000ms ease;

  .glass-group:hover & {
    opacity: 0.25;
  }
}

.glass-ring {
  position: relative;
  background-color: rgb(255 253 247 / 0.9);
  border: 1px solid var(--color-white);
  border-radius: var(--radius-full);
  padding: 0.25rem;
  box-shadow: var(--shadow-2xl);
  backdrop-filter: blur(12px);

  @include dark {
    background-color: rgb(15 23 42 / 0.9);
    border-color: var(--color-gray-800);
  }
}

.scroll-btn {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  border: 0;
  background-color: var(--color-brand-dark-900);
  color: var(--color-white);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: background-color var(--transition-fast), transform var(--transition-fast);

  &:hover {
    background-color: var(--color-brand-dark-800);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand-light-400);
    outline-offset: 2px;
  }
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
}

.ssr-placeholder {
  display: none;
  position: fixed;
  bottom: var(--space-8);
  right: var(--space-8);
  width: 3.5rem;
  height: 3.5rem;
  pointer-events: none;

  @include up("sm") {
    display: block;
  }
}

.scroll-pop-enter-active {
  transition: transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 700ms ease;
}

.scroll-pop-leave-active {
  transition: transform 300ms ease-in, opacity 300ms ease-in;
}

.scroll-pop-enter-from,
.scroll-pop-leave-to {
  transform: translateX(5rem) rotate(180deg);
  opacity: 0;
}
</style>
