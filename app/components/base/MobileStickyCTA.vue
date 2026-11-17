<script setup lang="ts">
import Button from '~/components/base/Button.vue'
import BaseIcon from '~/components/base/Icon.vue'

const props = defineProps<{
  isMenuOpen: boolean
}>()

const localePath = useLocalePath()
const route = useRoute()

const scrollY = ref(0)
const isMounted = ref(false)
const isScrollVisible = computed(() => scrollY.value > 400)

function handleScroll() {
  scrollY.value = window.scrollY
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(() => route.fullPath, () => {
  scrollY.value = 0
}, { immediate: true })

onMounted(() => {
  isMounted.value = true
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const pagesWithLargeHero = ['index', 'jubilee']

const hasHero = computed(() => {
  const currentName = route.name?.toString() || ''
  return pagesWithLargeHero.some(p => currentName.includes(p))
})

const blacklistedPages = ['membership', 'imprint', 'privacy']
const isBlacklisted = computed(() => {
  const currentName = route.name?.toString() || ''
  return blacklistedPages.some(page => currentName.includes(page))
})

const showCta = computed(() => {
  if (!isMounted.value || props.isMenuOpen || isBlacklisted.value) return false
  if (hasHero.value && scrollY.value <= 200) return false
  return true
})

const showBackToTop = computed(() => {
  if (!isMounted.value || props.isMenuOpen) return false
  return isScrollVisible.value
})
</script>

<template>
  <div class="mobile-sticky-cta">
    <div class="bar-anchor">
      <div class="bar-inner">
        <!-- 1. Haupt CTA: Mitglied werden -->
        <div class="cta-slot">
          <div
            class="cta-slider"
            :class="{ 'is-visible': showCta }"
          >
            <div class="cta-glow" />
            <div class="glass-pill">
              <Button
                :to="localePath('membership')"
                :label="$t('nav.buttons.membership')"
                variant="primary"
                block
                size="lg"
                class="cta-btn"
                icon="i-heroicons-user-plus"
              />
            </div>
          </div>
        </div>

        <!-- 2. Dynamischer Spacer -->
        <div
          class="spacer"
          :class="{ 'is-expanded': !showCta && !props.isMenuOpen }"
        />

        <!-- 3. Back to Top Wrapper -->
        <div
          class="top-slot"
          :class="{ 'is-visible': showBackToTop }"
        >
          <div
            class="top-rotator"
            :class="{ 'is-visible': showBackToTop }"
          >
            <div class="top-group">
              <div class="top-glow" />
              <div class="glass-pill">
                <button
                  type="button"
                  class="top-btn"
                  aria-label="Nach oben scrollen"
                  @click="scrollToTop"
                >
                  <BaseIcon name="i-heroicons-arrow-up" class="top-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mobile-sticky-cta {
  @include up("sm") {
    display: none;
  }
}

.bar-anchor {
  position: fixed;
  bottom: var(--space-6);
  left: 0;
  right: 0;
  z-index: var(--z-sticky);
  padding-inline: var(--space-4);
  pointer-events: none;
}

.bar-inner {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  max-width: 28rem;
  margin-inline: auto;
  overflow: visible;
}

.cta-slot {
  position: relative;
  flex: 1;
}

.cta-slider {
  position: relative;
  transform: translateX(-100%);
  opacity: 0;
  pointer-events: none;
  transition:
    transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 700ms ease;

  &.is-visible {
    transform: translateX(0);
    opacity: 1;
  }
}

.cta-glow {
  position: absolute;
  inset: -0.25rem;
  background-image: linear-gradient(to right, var(--color-brand-dark-600), var(--color-brand-dark-400));
  border-radius: var(--radius-full);
  filter: blur(8px);
  opacity: 0.2;
  transition: opacity 1000ms ease;
}

.glass-pill {
  position: relative;
  background-color: rgb(255 253 247 / 0.9);
  border: 1px solid var(--color-white);
  border-radius: var(--radius-full);
  padding: 0.25rem;
  box-shadow: var(--shadow-xl);
  backdrop-filter: blur(12px);
  pointer-events: auto;

  @include dark {
    background-color: rgb(15 23 42 / 0.9);
    border-color: var(--color-gray-800);
  }
}

.cta-btn {
  border-radius: var(--radius-full);
  padding-block: 0.75rem;
}

.spacer {
  width: 0;
  transition: all 700ms cubic-bezier(0.34, 1.56, 0.64, 1);

  &.is-expanded {
    flex: 1;
  }
}

.top-slot {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: visible;
  width: 0;
  margin-left: 0;
  opacity: 0;
  pointer-events: none;
  transition: all 700ms cubic-bezier(0.34, 1.56, 0.64, 1);

  &.is-visible {
    width: 3rem;
    margin-left: var(--space-3);
    opacity: 1;
  }
}

.top-rotator {
  flex-shrink: 0;
  transform: translateX(5rem) rotate(180deg);
  transition: transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1);

  &.is-visible {
    transform: translateX(0) rotate(0deg);
  }
}

.top-group {
  position: relative;
}

.top-glow {
  position: absolute;
  inset: -0.25rem;
  background-color: var(--color-gray-400);
  border-radius: var(--radius-full);
  filter: blur(8px);
  opacity: 0.1;
}

.top-btn {
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
}

.top-icon {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
