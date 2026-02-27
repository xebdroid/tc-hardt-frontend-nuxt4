<script setup lang="ts">
import { computed } from 'vue'
import type { Event } from '~/types'
import { useCalendar } from '~/composables/useCalendar'
import Button from '~/components/base/Button.vue'
import EventDate from '~/components/base/EventDate.vue'

const props = defineProps({
  event: {
    type: Object as () => Event,
    required: true
  },
  isPast: {
    type: Boolean,
    default: false
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const { calendarOptions } = useCalendar(props.event)

const hasOptionalContent = computed(() => {
  return !props.isPast && (props.event.content || props.event.description || props.event.time || props.event.location)
})

const emit = defineEmits(['toggle'])

const cardClasses = computed(() => [
  'w-full',
  'border',
  'border-gray-200 dark:border-gray-700',
  'rounded-xl',
  'transition-all',
  'duration-300',
  'bg-white dark:bg-gray-900',
  'overflow-hidden', // Ensure rounded corners clip children
  props.isPast
    ? 'opacity-70'
    : 'hover:scale-[1.02] hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600',
])
</script>

<template>
  <div :class="cardClasses">
    <div class="flex flex-col md:flex-row items-stretch h-full">

      <!-- Sidebar (Desktop) / Header (Mobile) - Gray Background -->
      <div class="bg-gray-50 dark:bg-white/5 flex-shrink-0 md:w-80 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700 flex flex-col">
        <div
          class="flex flex-row items-center justify-between p-3 md:p-4 gap-4"
        >
          <!-- Date -->
          <div :class="[!event.dateEnd ? 'md:flex-1 md:flex md:justify-center' : '']">
            <EventDate :date="new Date(event.date)" :date-end="event.dateEnd ? new Date(event.dateEnd) : undefined" />
          </div>

          <!-- Image -->
          <img
            :src="event.image || 'https://placehold.co/400x300/e2e8f0/1e293b?text=Event'"
            :alt="event.title"
            class="w-16 h-16 md:w-16 md:h-16 object-cover rounded-lg shadow-sm flex-none"
          >
        </div>
      </div>

      <!-- Content Side (Collapsible) -->
      <UCollapsible
        class="flex-1 flex flex-col group min-w-0 justify-center group-data-[state=open]:justify-start"
        :disabled="!hasOptionalContent"
        :open="isOpen"
      >
        <!-- Header Row (Title + Toggle) -->
        <div class="p-3 md:p-4 flex justify-between items-center gap-4 cursor-pointer min-h-[5.5rem] md:min-h-24" @click="emit('toggle')">
          <h3 class="text-xl font-bold text-brand-dark-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
            {{ event.title }}
          </h3>

          <div v-if="hasOptionalContent" class="flex-shrink-0 mt-1">
            <UIcon
              name="i-heroicons-chevron-down"
              class="w-6 h-6 text-gray-400 transition-transform duration-300 group-data-[state=open]:rotate-180"
            />
          </div>
        </div>

        <!-- Collapsible Content -->
        <template #content>
          <div class="px-3 pb-3 md:px-4 md:pb-4 text-gray-600 dark:text-gray-300 space-y-4">
            <!-- Rich Text Content -->
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-if="event.content" class="prose dark:prose-invert max-w-none text-sm" v-html="event.content" />
            <p v-else-if="event.description" class="text-sm">
              {{ event.description }}
            </p>

            <!-- Meta Info -->
            <div class="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4">
              <div v-if="event.time" class="flex items-center">
                <UIcon name="i-heroicons-clock" class="w-4 h-4 mr-2 text-accent-500" />
                <span>{{ event.time }}</span>
              </div>
              <div v-if="event.location" class="flex items-center">
                <UIcon name="i-heroicons-map-pin" class="w-4 h-4 mr-2 text-accent-500" />
                <span>{{ event.location }}</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div v-if="!isPast && calendarOptions?.length" class="flex flex-wrap gap-3 pt-2">
              <Button
                v-for="(action, idx) in calendarOptions"
                :key="idx"
                v-bind="action"
                size="md"
                variant="outline"
                class="flex-1 sm:flex-none justify-center"
              />
            </div>
          </div>
        </template>
      </UCollapsible>
    </div>
  </div>
</template>
