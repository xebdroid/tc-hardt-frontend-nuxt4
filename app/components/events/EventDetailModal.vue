<script setup lang="ts">
import { computed } from 'vue'
import type { Event } from '~/types'
import { UModal, UButton, UIcon } from '#components'
import { useCalendar } from '~/composables/useCalendar'
import Button from '~/components/base/Button.vue'
import EventDate from '~/components/base/EventDate.vue'

const props = defineProps<{
  event: Event
}>()

const emit = defineEmits(['close'])

const isOpen = computed({
  get: () => true,
  set: (val) => {
    if (!val) emit('close')
  }
})

// Wir übergeben das reaktive props.event, falls useCalendar es braucht
const { calendarOptions } = useCalendar(props.event)

// Tracking
function trackCalendarClick(actionLabel?: string) {
  if (import.meta.client && (window as any)._paq) {
    const label = actionLabel || 'Unbekannt'
    (window as any)._paq.push(['trackEvent', 'Termine', 'Kalender Export (Modal)', `${props.event.title} (${label})`])
  }
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :ui="{
      content: 'sm:max-w-2xl w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden'
    }"
  >
    <template #content>
      <div class="flex flex-col relative max-h-[90vh] overflow-y-auto no-scrollbar">

        <UButton
          icon="i-heroicons-x-mark"
          variant="ghost"
          color="gray"
          class="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors"
          @click="isOpen = false"
        />

        <div class="p-6 sm:p-8 pt-14 sm:pt-14">
          <div class="flex flex-col sm:flex-row gap-6 items-start mb-8">
            <div v-if="event.image" class="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
              <img :src="event.image" :alt="event.title" class="w-full h-full object-cover" />
            </div>

            <div class="flex-1">
              <div class="mb-4 inline-block">
                <EventDate :date="new Date(event.date)" :date-end="event.dateEnd ? new Date(event.dateEnd) : undefined" variant="compact" />
              </div>
              <h2 class="text-2xl sm:text-3xl font-bold text-brand-dark-900 dark:text-white leading-tight">
                {{ event.title }}
              </h2>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-8 text-gray-700 dark:text-gray-300">
             <div v-if="event.time" class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-brand-light-50 dark:bg-gray-800 flex items-center justify-center text-brand-light-600 shrink-0">
                  <UIcon name="i-heroicons-clock" class="w-5 h-5" />
                </div>
                <span class="font-medium">{{ event.time }}</span>
             </div>
             <div v-if="event.location" class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-brand-light-50 dark:bg-gray-800 flex items-center justify-center text-brand-light-600 shrink-0">
                  <UIcon name="i-heroicons-map-pin" class="w-5 h-5" />
                </div>
                <span class="font-medium">{{ event.location }}</span>
             </div>
          </div>

          <div v-if="event.content" class="prose dark:prose-invert max-w-none text-base leading-relaxed mb-8" v-html="event.content" />
          <p v-else-if="event.description" class="text-base leading-relaxed mb-8 text-gray-700 dark:text-gray-300">
            {{ event.description }}
          </p>

          <div class="flex flex-wrap gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
             <Button
                v-for="(action, idx) in calendarOptions"
                :key="idx"
                v-bind="action"
                size="md"
                variant="outline"
                class="flex-1 sm:flex-none justify-center"
                @click="trackCalendarClick(action.label)"
              />
          </div>
        </div>

      </div>
    </template>
  </UModal>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
