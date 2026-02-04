<script setup lang="ts">
import AppButton from '~/components/base/AppButton.vue'

const store = useConsentStore()

// Lokaler State
const mapsSelected = ref(store.isMapsAllowed)

watch(() => store.isModalOpen, (isOpen) => {
  if (isOpen) {
    mapsSelected.value = store.isMapsAllowed
  }
})

function handleSave() {
  store.saveSettings({ maps: mapsSelected.value })
}
</script>

<template>
  <UModal
    v-model:open="store.isModalOpen"
    :dismissible="store.isMapsAllowed"
    :ui="{
      overlay: 'z-[9999] bg-gray-950/75 backdrop-blur-sm',
      content: 'z-[9999] w-full sm:max-w-md'
    }"
  >
    <template #content>

      <div class="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">

        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-brand-dark-900 dark:text-white mb-2">Datenschutz</h2>
          <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Wir verwenden Cookies und externe Dienste (Google Maps), um dir das beste Erlebnis zu bieten.
          </p>
        </div>

        <div class="space-y-3 mb-8">

          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 opacity-70">
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-check-circle" class="text-green-500 w-6 h-6" />
              <div class="text-left">
                <span class="block font-bold text-sm text-gray-900 dark:text-gray-200">Notwendig</span>
                <span class="text-xs text-gray-500 dark:text-gray-400">Grundfunktionen der Seite</span>
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
                <span class="text-xs text-gray-500 dark:text-gray-400">Interaktive Karten anzeigen</span>
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

        <div class="mt-6 text-center">
          <button
            class="text-xs text-gray-400 hover:text-brand-dark-900 dark:hover:text-white transition-colors underline"
            @click="store.declineAll"
          >
            Nur essenzielle Cookies nutzen
          </button>
        </div>

      </div>

    </template>
  </UModal>
</template>
