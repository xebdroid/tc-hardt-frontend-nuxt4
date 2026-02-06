<script setup lang="ts">
import AppButton from '~/components/base/Button.vue'

const store = useConsentStore()

defineProps<{
  title?: string
  description?: string
  icon?: string
}>()
</script>

<template>
  <div class="w-full h-full relative">
    <ClientOnly>
      <slot v-if="store.isMapsAllowed" />

      <div
        v-else
        class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-gray-100 dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700"
      >
        <div class="relative z-10 max-w-md">
          <UIcon :name="icon || 'i-heroicons-lock-closed'" class="w-12 h-12 text-gray-400 mb-4 mx-auto" />

          <h3 class="text-lg font-bold text-brand-dark-900 dark:text-white mb-2">
            {{ title || 'Inhalt blockiert' }}
          </h3>

          <p class="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
            {{ description || 'Um diesen Inhalt zu sehen, musst du dem Laden von Google Maps zustimmen.' }}
          </p>

          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <AppButton
              label="Inhalt laden"
              variant="primary"
              icon="i-heroicons-check"
              @click="store.acceptAll"
            />
            <UButton
              variant="ghost"
              label="Einstellungen"
              size="xs"
              class="mt-2 sm:mt-0"
              @click="store.openModal"
            />
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
