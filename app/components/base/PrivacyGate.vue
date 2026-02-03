<script setup lang="ts">
import AppButton from '~/components/base/AppButton.vue'

const props = defineProps<{
  id: string // z.B. 'google-maps'
  title?: string
  description?: string
  icon?: string
}>()

// Hol dir alles aus einem Aufruf
const { cookiesEnabledIds, isModalActive, grant } = useCookieControl()

// Reaktiv prüfen, ob der Cookie erlaubt ist
// Wir nutzen computed, damit es sich sofort ändert, wenn man klickt
const isAllowed = computed(() => {
  return cookiesEnabledIds.value && cookiesEnabledIds.value.includes(props.id)
})

function allowService() {
  // 1. Dem Modul sagen: Erlaube diesen Dienst
  grant(props.id)

  // 2. Optional: Falls du debuggen musst, kannst du hier loggen
  // console.log('Granting:', props.id)
}
</script>

<template>
  <div class="w-full h-full relative">

    <ClientOnly>

      <div v-if="isAllowed" class="w-full h-full">
        <slot />
      </div>

      <div
        v-else
        class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-gray-100 dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700"
      >
        <div class="relative z-10 max-w-md">
          <UIcon :name="icon || 'i-heroicons-lock-closed'" class="w-12 h-12 text-gray-400 mb-4 mx-auto" />

          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {{ title || 'Inhalt blockiert' }}
          </h3>

          <p class="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
            {{ description || 'Um diesen Inhalt zu sehen, müssen Sie dem Laden externer Dienste zustimmen.' }}
          </p>

          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <AppButton
              label="Inhalt laden"
              variant="primary"
              icon="i-heroicons-check"
              @click="allowService"
            />
            <AppButton
              variant="ghost"
              label="Einstellungen öffnen"
              size="xs"
              class="mt-2 sm:mt-0"
              @click="isModalActive = true"
            />
          </div>
        </div>
      </div>

    </ClientOnly>
  </div>
</template>
