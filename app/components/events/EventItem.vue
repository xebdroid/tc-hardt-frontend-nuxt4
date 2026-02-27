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
  }
})

const { calendarOptions } = useCalendar(props.event)

const hasOptionalContent = computed(() => {
  return !props.isPast && (props.event.description || props.event.time || props.event.location)
})

const cardClasses = computed(() => [
  'w-full',
  'border',
  'rounded-xl',
  'transition-all',
  'duration-300',
  'bg-white dark:bg-gray-800/50',
  'group', // Add group for data-state styling
  props.isPast
    ? 'opacity-70'
    : 'hover:scale-[1.02] hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600',
  'data-[state=open]:border-accent-500 dark:data-[state=open]:border-accent-400'
])

</script>

<template>
  <UCollapsible :class="cardClasses" :disabled="!hasOptionalContent">
    <!-- Main Item Layout (The Trigger) -->
    <div class="p-4 grid grid-cols-[1fr_auto] items-start gap-4 md:grid-cols-[auto_1fr_auto] md:items-center">
      <!-- Date & Image Block (Desktop) -->
      <div class="hidden md:flex items-center gap-6 col-start-1">
        <div class="w-44 flex-shrink-0">
          <EventDate :date="event.date" :date-end="event.dateEnd" />
        </div>
        <img
          :src="event.image || 'https://placehold.co/400x300/e2e8f0/1e293b?text=Event'"
          :alt="event.title"
          class="w-24 h-20 object-cover rounded-lg"
        >
      </div>

      <!-- Image (Mobile) -->
      <img
        :src="event.image || 'https://placehold.co/400x300/e2e8f0/1e293b?text=Event'"
        :alt="event.title"
        class="block md:hidden w-full h-40 object-cover rounded-lg col-span-2"
      >

      <!-- Date (Mobile) -->
      <div class="block md:hidden col-span-2">
        <EventDate :date="event.date" :date-end="event.dateEnd" />
      </div>

      <!-- Title -->
      <div class="col-start-1 md:col-start-2">
        <h3 class="text-lg font-bold text-brand-dark-900 dark:text-white">
          {{ event.title }}
        </h3>
      </div>

      <!-- Buttons Block -->
      <div class="col-start-2 md:col-start-3 flex items-center justify-end gap-2">
        <UDropdownMenu
          v-if="!isPast"
          :items="[calendarOptions]"
          :popper="{ placement: 'bottom-end' }"
        >
          <Button
            icon="i-heroicons-calendar-days"
            size="sm"
            variant="ghost"
            @click.stop
          />
        </UDropdownMenu>

        <div v-if="hasOptionalContent" class="w-6 h-6">
          <UIcon
            name="i-heroicons-chevron-down"
            class="w-full h-full text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        </div>
      </div>
    </div>

    <!-- Collapsible Content -->
    <template #content>
      <div class="px-4 pb-4">
        <div class="md:pl-[22rem]"> <!-- Indent content to align with title on desktop -->
          <p v-if="event.description" class="text-gray-600 dark:text-gray-300 mb-2">
            {{ event.description }}
          </p>
          <div class="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <div v-if="event.time" class="flex items-center">
              <UIcon name="i-heroicons-clock" class="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{{ event.time }}</span>
            </div>
            <div v-if="event.location" class="flex items-center">
              <UIcon name="i-heroicons-map-pin" class="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{{ event.location }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UCollapsible>
</template>
