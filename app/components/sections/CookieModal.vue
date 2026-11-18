<script setup lang="ts">
import AppButton from '~/components/base/Button.vue'
import BaseIcon from '~/components/base/Icon.vue'
import BaseSwitch from '~/components/base/Switch.vue'

const store = useConsentStore()
const route = useRoute()

const mapsSelected = ref(store.isMapsAllowed)
const analyticsSelected = ref(store.isAnalyticsAllowed)
const modalCardRef = ref<HTMLElement | null>(null)

const legalPages = ['impressum', 'datenschutz', 'imprint', 'privacy']

const isLegalPage = computed(() => {
  return legalPages.some(path => route.path.includes(path))
})

const isDismissible = computed(() => {
  return store.isMapsAllowed && store.isAnalyticsAllowed
})

function hasConsentCookie(): boolean {
  return document.cookie.split(';').some(c => c.trim().startsWith('cookie-decided=') && c.includes('true'))
}

onMounted(() => {
  if (!hasConsentCookie() && !isLegalPage.value) {
    store.isModalOpen = true
  }
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

watch(() => route.path, () => {
  if (isLegalPage.value) {
    store.isModalOpen = false
  } else if (!hasConsentCookie()) {
    store.isModalOpen = true
  }
})

watch(() => store.isModalOpen, (isOpen) => {
  if (isOpen) {
    mapsSelected.value = store.isMapsAllowed
    analyticsSelected.value = store.isAnalyticsAllowed
    nextTick(() => {
      modalCardRef.value?.focus()
    })
  }
})

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && store.isModalOpen && isDismissible.value) {
    store.isModalOpen = false
  }
}

function handleBackdropClick() {
  if (isDismissible.value) {
    store.isModalOpen = false
  }
}

function handleSave() {
  store.saveSettings({
    maps: mapsSelected.value,
    analytics: analyticsSelected.value
  })
}

function openLegalPage() {
  store.isModalOpen = false
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="store.isModalOpen"
      class="cookie-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-modal-title"
    >
      <div class="overlay" @click="handleBackdropClick" />

      <div class="dialog-wrapper">
        <div
          ref="modalCardRef"
          class="card"
          tabindex="-1"
        >
          <AppButton
            icon="i-heroicons-x-mark"
            variant="ghost"
            class="close-btn"
            tabindex="-1"
            aria-label="Ablehnen und Schließen"
            @click="store.declineAll"
          />

          <div class="header">
            <h2 id="cookie-modal-title" class="title">Datenschutz</h2>
            <p class="subtitle">
              Wir verwenden Cookies und externe Dienste, um dir das beste Erlebnis zu bieten.
            </p>
          </div>

          <div class="options">
            <div class="option-row is-readonly">
              <div class="option-info">
                <BaseIcon name="i-heroicons-check-circle" class="option-icon is-success" />
                <div class="option-text">
                  <span class="option-title">Notwendig</span>
                  <span class="option-desc">Grundfunktionen</span>
                </div>
              </div>
              <BaseSwitch
                :default-value="true"
                disabled
                size="lg"
                aria-label="Notwendige Cookies"
              />
            </div>

            <div class="option-row">
              <div class="option-info">
                <BaseIcon name="i-heroicons-chart-bar" class="option-icon" />
                <div class="option-text">
                  <span class="option-title">Statistiken</span>
                  <span class="option-desc">Anonymes Tracking zur Verbesserung</span>
                </div>
              </div>
              <BaseSwitch
                v-model="analyticsSelected"
                size="lg"
                aria-label="Statistiken erlauben"
              />
            </div>

            <div class="option-row">
              <div class="option-info">
                <BaseIcon name="i-heroicons-map" class="option-icon" />
                <div class="option-text">
                  <span class="option-title">Google Maps</span>
                  <span class="option-desc">Karten & Anfahrt</span>
                </div>
              </div>
              <BaseSwitch
                v-model="mapsSelected"
                size="lg"
                aria-label="Google Maps erlauben"
              />
            </div>
          </div>

          <div class="actions">
            <AppButton
              label="Alles akzeptieren"
              variant="primary"
              block
              size="lg"
              @click="store.acceptAll"
            />
            <AppButton
              label="Auswahl speichern"
              variant="outline"
              block
              size="lg"
              @click="handleSave"
            />
          </div>

          <div class="legal-links">
            <NuxtLink
              :to="$localePath('imprint')"
              class="legal-link"
              @click="openLegalPage"
            >
              Impressum
            </NuxtLink>
            <NuxtLink
              :to="$localePath('privacy')"
              class="legal-link"
              @click="openLegalPage"
            >
              Datenschutz
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.cookie-modal {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
}

.overlay {
  position: fixed;
  inset: 0;
  background-color: rgb(2 6 23 / 0.8);
  backdrop-filter: blur(4px);
}

.dialog-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;

  @include up("sm") {
    max-width: 28rem; /* sm:max-w-md */
  }
}

.card {
  position: relative;
  padding: var(--space-6);
  background-color: var(--color-pure-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--color-gray-200);
  outline: none;

  @include dark {
    background-color: var(--color-gray-900);
    border-color: var(--color-gray-800);
  }
}

.close-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 10;
}

.header {
  text-align: center;
  margin-top: var(--space-2);
  margin-bottom: var(--space-6);
}

.title {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  color: var(--color-brand-dark-900);
  margin-bottom: var(--space-2);

  @include dark {
    color: var(--color-white);
  }
}

.subtitle {
  font-size: 0.875rem;
  line-height: 1.625;
  color: var(--color-gray-600);

  @include dark {
    color: var(--color-gray-300);
  }
}

.options {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
}

.option-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3);
  background-color: var(--color-gray-50);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-gray-100);

  @include dark {
    background-color: rgb(30 41 59 / 0.5);
    border-color: var(--color-gray-800);
  }

  &.is-readonly {
    opacity: 0.7;
  }
}

.option-info {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.option-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-brand-dark-900);

  @include dark {
    color: var(--color-white);
  }

  &.is-success {
    color: var(--color-success-500);
  }
}

.option-text {
  text-align: left;
}

.option-title {
  display: block;
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--color-gray-900);

  @include dark {
    color: var(--color-gray-200);
  }
}

.option-desc {
  font-size: 0.75rem;
  line-height: 1rem;
  color: var(--color-gray-500);

  @include dark {
    color: var(--color-gray-400);
  }
}

.actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.legal-links {
  margin-top: var(--space-6);
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  font-size: 0.75rem;
  line-height: 1rem;
  color: var(--color-gray-400);
}

.legal-link {
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: var(--color-gray-600);

    @include dark {
      color: var(--color-gray-300);
    }
  }
}
</style>
