<script setup lang="ts">
import AppButton from '~/components/base/Button.vue'

const store = useConsentStore()
const route = useRoute()

// Lokaler State
const mapsSelected = ref(store.isMapsAllowed)

// --- LOGIK: Modal-Steuerung ---
const legalPages = ['impressum', 'datenschutz', 'imprint', 'privacy']

const isLegalPage = computed(() => {
  return legalPages.some(path => route.path.includes(path))
})

// Beim Start prüfen: Nur öffnen, wenn noch nicht entschieden UND keine Legal-Page
onMounted(() => {
  // Cookie direkt aus dem Browser lesen, um Hydration-Race-Conditions zu vermeiden
  const decidedCookie = document.cookie.split('; ').find(c => c.startsWith('cookie-decided='))
  const alreadyDecided = decidedCookie?.split('=')[1] === 'true'

  if (!alreadyDecided && !isLegalPage.value) {
    store.isModalOpen = true
  }
})

// Bei Navigation beobachten
watch(() => route.path, () => {
  if (isLegalPage.value) {
    store.isModalOpen = false
  } else if (!store.hasDecided) {
    // Zusätzlich den Browser-Cookie prüfen
    const decidedCookie = document.cookie.split('; ').find(c => c.startsWith('cookie-decided='))
    const alreadyDecided = decidedCookie?.split('=')[1] === 'true'
    if (!alreadyDecided) {
      store.isModalOpen = true
    }
  }
})

// State synchronisieren
watch(() => store.isModalOpen, (isOpen) => {
  if (isOpen) mapsSelected.value = store.isMapsAllowed
})

function handleSave() {
  store.saveSettings({ maps: mapsSelected.value })
}

// Helper für Links im Modal
function openLegalPage() {
  store.isModalOpen = false
}
</script>

<template>
  <UModal
    v-model:open="store.isModalOpen"
    :dismissible="store.isMapsAllowed"
    :transition="false"
    :ui="{
      overlay: 'z-[9999] bg-gray-950/80 backdrop-blur-sm transition-none duration-0',
      content: 'z-[9999] w-full sm:max-w-md transition-none duration-0 !bg-transparent !shadow-none !ring-0 !border-0'
    }"
  >
    <template #content>
      <div
        class="relative p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 outline-none"
        tabindex="-1"
        @vue:mounted="({ el }) => el.focus()"
      >

        <UButton
          icon="i-heroicons-x-mark"
          variant="ghost"
          color="gray"
          class="absolute top-3 right-3 z-10 focus:ring-0"
          tabindex="-1"
          aria-label="Ablehnen und Schließen"
          @click="store.declineAll"
        />

        <div class="text-center mb-6 mt-2">
          <h2 class="text-2xl font-bold text-brand-dark-900 dark:text-white mb-2">Datenschutz</h2>
          <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Wir verwenden Cookies und externe Dienste, um dir das beste Erlebnis zu bieten.
          </p>
        </div>

        <div class="space-y-3 mb-8">

          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 opacity-70">
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-check-circle" class="text-green-500 w-6 h-6" />
              <div class="text-left">
                <span class="block font-bold text-sm text-gray-900 dark:text-gray-200">Notwendig</span>
                <span class="text-xs text-gray-500 dark:text-gray-400">Grundfunktionen</span>
              </div>
            </div>
            <USwitch
              :default-value="true"
              disabled
              size="lg"
            />
          </div>

          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-map" class="text-brand-dark-900 dark:text-white w-6 h-6" />
              <div class="text-left">
                <span class="block font-bold text-sm text-gray-900 dark:text-gray-200">Google Maps</span>
                <span class="text-xs text-gray-500 dark:text-gray-400">Karten & Anfahrt</span>
              </div>
            </div>
            <USwitch v-model="mapsSelected" size="lg" />
          </div>

        </div>

        <div class="flex flex-col gap-3">
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

        <div class="mt-6 flex justify-center gap-4 text-xs text-gray-400">
          <NuxtLink
            :to="$localePath('imprint')"
            class="hover:underline hover:text-gray-600 dark:hover:text-gray-300"
            @click="openLegalPage"
          >
            Impressum
          </NuxtLink>
          <NuxtLink
            :to="$localePath('privacy')"
            class="hover:underline hover:text-gray-600 dark:hover:text-gray-300"
            @click="openLegalPage"
          >
            Datenschutz
          </NuxtLink>
        </div>

      </div>
    </template>
  </UModal>
</template>
